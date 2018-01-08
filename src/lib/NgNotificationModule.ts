import {NgModule}                       from '@angular/core';
import {NgAlertModule}                  from "@ng-app-framework/alert";
import {NgOAuthModule}                  from "@ng-app-framework/oauth";
import {NgSafeModule}                   from "@ng-app-framework/safe";
import {NotificationsEndpoint}          from "./Endpoint/NotificationsEndpoint";
import {NotificationListener}           from "./Service/NotificationListener";
import {MarkNotificationAsReadEndpoint} from "./Endpoint/MarkNotificationAsReadEndpoint";
import {NotificationApi}                from "./Service/NotificationApi";
import {NotificationAlert}              from "./Service/NotificationAlert";
import {NotificationFormatter}          from "./Service/NotificationFormatter";
import {NgCoreModule}                   from '@ng-app-framework/core';

@NgModule({
    declarations: [],
    imports     : [
        NgCoreModule,
        NgSafeModule,
        NgAlertModule,
        NgOAuthModule
    ],
    exports     : [],
    providers   : [
        NotificationListener,
        NotificationApi,
        NotificationAlert,
        NotificationFormatter,
        NotificationsEndpoint,
        MarkNotificationAsReadEndpoint
    ]
})
export class NgNotificationModule {

}

