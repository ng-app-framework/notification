import {Component, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {MarkNotificationAsReadMock} from "../../test/Mock/MarkNotificationAsReadMock";
import {NotificationsMock} from "../../test/Mock/NotificationsMock";
import {NotificationsEndpoint} from "../lib/Endpoint/NotificationsEndpoint";
import {NgNotificationModule} from "../lib/NgNotificationModule";
import {NotificationListener} from "../lib/Service/NotificationListener";
import {MarkNotificationAsReadEndpoint} from "src/lib/Endpoint/MarkNotificationAsReadEndpoint";

@Component({
    selector: 'app',
    template: `
        <p>You should receive a notification shortly.</p>
    `
})
export class AppComponent {

    constructor(public listener: NotificationListener) {

    }

    ngOnInit() {
        this.listener.getNotifications();
    }
}

@NgModule({
    declarations: [AppComponent],
    imports     : [
        BrowserModule,
        CommonModule,
        NgNotificationModule
    ],
    exports     : [AppComponent],
    providers   : [
        MarkNotificationAsReadMock,
        NotificationsMock,
        {
            provide    : NotificationsEndpoint,
            useExisting: NotificationsMock
        },
        {
            provide    : MarkNotificationAsReadEndpoint,
            useExisting: MarkNotificationAsReadMock
        }
    ],
    bootstrap   : [AppComponent]

})
export class AppModule {

}
