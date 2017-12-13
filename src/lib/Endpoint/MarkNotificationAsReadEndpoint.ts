import {Injectable} from "@angular/core";
import {Endpoint} from "@ng-app-framework/api";
import {OAuthEndpointCaller} from "@ng-app-framework/oauth";

@Injectable()
export class MarkNotificationAsReadEndpoint extends Endpoint {

    path: string = 'api/notification/read';

    constructor(public caller: OAuthEndpointCaller) {
        super(caller);
    }

    post(id: number) {
        return this.request('post', {notificationIds: [id]});
    }
}
