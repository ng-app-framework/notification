import {Observable}                     from "rxjs/Observable";
import {ParsedNotificationStructure}    from "../Structure/ParsedNotificationStructure";
import {MarkNotificationAsReadEndpoint} from "../Endpoint/MarkNotificationAsReadEndpoint";
import {NotificationsEndpoint}          from "../Endpoint/NotificationsEndpoint";
import {Injectable}                     from "@angular/core";

@Injectable()
export class NotificationApi {


    constructor(
        private getUnreadEndpoint: NotificationsEndpoint,
        private markReadEndpoint: MarkNotificationAsReadEndpoint
    ) {

    }

    getUnread(): Observable<ParsedNotificationStructure> {
        return this.getUnreadEndpoint.get();
    }

    markAsRead(id: number): Observable<any> {
        return this.markReadEndpoint.post(id);
    }
}
