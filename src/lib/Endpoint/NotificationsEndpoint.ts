import {Injectable}                      from "@angular/core";
import {
    NotificationStructure
}                                        from "../Structure/NotificationStructure";
import {Observable}                      from "rxjs/Observable";
import {ParsedNotificationStructure}     from "../Structure/ParsedNotificationStructure";
import {Value}                           from "@ng-app-framework/core";
import {Name}                            from "@ng-app-framework/validation";
import {Endpoint, EndpointDocumentation} from "@ng-app-framework/api";
import {OAuthEndpointCaller}             from "@ng-app-framework/oauth";

@Injectable()
@Name('NotificationsEndpoint')
export class NotificationsEndpoint extends Endpoint {

    module = 'Notification';

    path: string = 'notification/unread';

    documentation: EndpointDocumentation[] = [
        {
            method   : 'get',
            name     : 'get',
            arguments: []
        }
    ];

    constructor(public caller: OAuthEndpointCaller) {
        super(caller);
    }

    get(): Observable<ParsedNotificationStructure> {
        return this.request('get')
                   .map(response => this.transformResponse(response))
                   .flatMap((notifications: any[]) => {
                       return Observable.from(notifications);
                   }).map((notification) => {
                let body = {};
                try {
                    body              = JSON.parse(notification.body);
                    notification.body = body;
                } catch (e) {
                }
                return <any> notification;
            });
    }

    transformResponse(response: { data: NotificationStructure[] }): any {
        return Value.coalesce(response.data, response);
    }
}
