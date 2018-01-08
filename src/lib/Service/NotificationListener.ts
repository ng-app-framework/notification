import {EventEmitter, Injectable} from "@angular/core";
import {ParsedNotificationStructure} from "../Structure/ParsedNotificationStructure";
import {NotificationAlert} from "./NotificationAlert";
import {NotificationApi} from "./NotificationApi";
import {Observable} from 'rxjs/Observable';
import {UnsubscribeAll} from "@ng-app-framework/core";

@Injectable()
export class NotificationListener {

    stopListening = new EventEmitter<any>();

    intervalInMilliseconds = 10000;

    enabled = () => {
        return true;
    };

    constructor(public alert: NotificationAlert,
                public api: NotificationApi) {

    }

    getNotifications() {
        this.getUnread$()
            .catch(err => Observable.empty())
            .finally(() => this.getNotificationsLater())
            .subscribe();
    }


    getUnread$() {
        if (!this.enabled()) {
            return Observable.empty();
        }
        return this.api.getUnread()
            .catch(err => Observable.empty())
            .do((notification:ParsedNotificationStructure) => this.alert.notify(notification));
    }

    getNotificationsLater() {
        Observable.interval(this.intervalInMilliseconds)
            .first()
            .takeUntil(UnsubscribeAll.merge(this.stopListening))
            .subscribe(() => this.getNotifications());
    }
}
