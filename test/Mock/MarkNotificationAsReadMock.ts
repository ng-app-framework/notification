import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

@Injectable()
export class MarkNotificationAsReadMock {

    post(id: number) {
        return Observable.from([{}]);
    }
}
