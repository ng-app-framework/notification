import {Injectable} from "@angular/core";

import {Endpoint, EndpointDocumentation} from "@ng-app-framework/api";

import {OAuthEndpointCaller} from "@ng-app-framework/oauth";
import {Observable}          from "rxjs/Observable";

@Injectable()
export class MarkNotificationAsReadEndpoint extends Endpoint {

    module = 'Notification';

    path: string = 'notification/read';

    documentation: EndpointDocumentation[] = [
        {
            method   : 'post',
            name     : 'post',
            arguments: [
                {
                    name    : 'id',
                    type    : 'number',
                    required: true
                }
            ],
            request  : {notificationIds: "number[]"}
        }
    ];

    constructor(public caller: OAuthEndpointCaller) {
        super(caller);
    }

    post(id: number): Observable<any> {
        return this.request('post', {notificationIds: [id]});
    }
}
