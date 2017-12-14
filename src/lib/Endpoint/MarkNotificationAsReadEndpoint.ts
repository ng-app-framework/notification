import {Injectable} from "@angular/core";
import {Endpoint} from "@ng-app-framework/api";
import {OAuthEndpointCaller} from "@ng-app-framework/oauth";
import {Observable} from "rxjs/Rx";

@Injectable()
export class MarkNotificationAsReadEndpoint extends Endpoint {

    path: string = 'api/notification/read';

    constructor(public caller: OAuthEndpointCaller) {
        super(caller);
    }

    post(id: number): Observable<any> {
        return this.request('post', {notificationIds: [id]});
    }
}
