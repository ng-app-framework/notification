import {EventEmitter, Injectable}    from "@angular/core";
import {ParsedNotificationStructure} from "../Structure/ParsedNotificationStructure";
import {NotificationAlert}           from "./NotificationAlert";
import {NotificationApi}             from "./NotificationApi";
import {Observable}                  from 'rxjs/Observable';

@Injectable()
export class NotificationListener {

    stopListening = new EventEmitter<any>();

    onNotification = new EventEmitter<ParsedNotificationStructure>();

    intervalInMilliseconds = 10000;

    enabled = () => {
        return true;
    };

    constructor(
        public alert: NotificationAlert,
        public api: NotificationApi
    ) {
        this.onNotification.subscribe((notification) => this.alert.notify(notification));
    }

    getNotifications() {
        Observable.interval(this.intervalInMilliseconds)
                  .takeUntil(this.stopListening)
                  .flatMap(() => this.getUnread$())
                  .catch((err, caught) => caught)
                  .subscribe();
    }


    getUnread$() {
        if (!this.enabled()) {
            return Observable.empty();
        }
        return this.api.getUnread()
                   .do((notification: ParsedNotificationStructure) => this.onNotification.emit(notification));
    }
}
