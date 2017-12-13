import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {ParsedNotificationStructure} from "../../src/lib/Structure/ParsedNotificationStructure";

@Injectable()
export class NotificationsMock {

    constructor() {
    }

    get(): Observable<ParsedNotificationStructure> {
        return Observable.from([
            <ParsedNotificationStructure>{
                id   : 1,
                title: 'Example Title',
                notificationLevel: 'Success',
                body : {
                    text: 'Example Notification Body'
                }
            }
        ])
    }
}
