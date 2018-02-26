import {EventEmitter, Injectable}    from "@angular/core";
import {ParsedNotificationStructure} from "../Structure/ParsedNotificationStructure";
import {NotificationAlert}           from "./NotificationAlert";
import {NotificationApi}             from "./NotificationApi";
import {Observable}                  from 'rxjs/Observable';

@Injectable()
export class NotificationListener {

    stopListening = new EventEmitter<any>();

    intervalInMilliseconds = 10000;

    enabled = () => {
        return true;
    };

    constructor(
        public alert: NotificationAlert,
        public api: NotificationApi
    ) {

    }

    getNotifications() {
        Observable.interval(this.intervalInMilliseconds)
                  .takeUntil(this.stopListening)
                  .flatMap(() => this.getUnread$())
                  .subscribe();
    }


    getUnread$() {
        if (!this.enabled()) {
            return Observable.empty();
        }
        return this.api.getUnread()
                   .catch(err => Observable.empty())
                   .do((notification: ParsedNotificationStructure) => this.alert.notify(notification));
    }
}
