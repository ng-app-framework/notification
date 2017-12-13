import {MarkNotificationAsReadEndpoint} from "../Endpoint/MarkNotificationAsReadEndpoint";
import {NotificationsEndpoint} from "../Endpoint/NotificationsEndpoint";
import {Injectable} from "@angular/core";

@Injectable()
export class NotificationApi {


    constructor(private getUnreadEndpoint: NotificationsEndpoint,
                private markReadEndpoint: MarkNotificationAsReadEndpoint) {

    }

    getUnread() {
        return this.getUnreadEndpoint.get();
    }

    markAsRead(id:number) {
        return this.markReadEndpoint.post(id);
    }
}
