import {Injectable}                  from "@angular/core";
import {AlertProxy}                  from "@ng-app-framework/alert";
import {ActiveToast}                 from "../Structure/ActiveToast";
import {ParsedNotificationStructure} from "../Structure/ParsedNotificationStructure";
import {NotificationFormatter}       from "./NotificationFormatter";
import {NotificationApi}             from "./NotificationApi";
import {NotificationTypes}           from "./NotificationTypes";
import {UnsubscribeAll, Value}       from "@ng-app-framework/core";

@Injectable()
export class NotificationAlert {

    public errorMessage = 'Unable to mark notification as read at this time.';

    constructor(
        protected alertProxy: AlertProxy,
        protected formatter: NotificationFormatter,
        protected api: NotificationApi
    ) {

    }

    notify(notification: ParsedNotificationStructure, throwOnFailure:boolean = false) {
        if (notification.hasOwnProperty('notificationLevel')) {
            if (Value.isProvided(NotificationTypes[notification.notificationLevel])) {
                setTimeout(() => {
                    let alert = this.alertProxy[NotificationTypes[notification.notificationLevel]](
                        this.formatter.getMessageHtml(notification.body),
                        notification.title,
                        this.getNotificationConfig()
                    );
                    this.markAsReadOnClose(alert, notification);
                })
                return;
            }
            console.error(`The notification level '${notification.notificationLevel}' is not defined`);
            if (throwOnFailure) {
                throw `The notification level '${notification.notificationLevel}' is not defined`;
            }
        }
    }

    getNotificationConfig() {
        return {
            timeOut     : 0,
            enableHtml  : true,
            tapToDismiss: false,
            closeButton : true
        };
    }

    markAsReadOnClose(alert: ActiveToast, notification: ParsedNotificationStructure) {
        if (alert) {
            alert.onHidden.takeUntil(UnsubscribeAll)
                 .subscribe(() => this.markNotificationAsRead(notification));
        }
    }

    markNotificationAsRead(notification: ParsedNotificationStructure) {
        this.api.markAsRead(notification.id).subscribe({
            error: (error) => {
                this.reportError(error);
            }
        });
    }


    reportError(error) {
        this.alertProxy.error(this.errorMessage);
    }
}
