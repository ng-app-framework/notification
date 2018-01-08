import {ToastRef} from "ngx-toastr";
import {Observable} from "rxjs/Observable";


export interface ActiveToast {
    toastId: number; // Your Toast ID. Use this to close it individually
    message: string; // the message of your toast. Stored for prevent duplicate reasons
    portal?: any; // a reference to the component see portal.ts
    toastRef?: ToastRef<any>;  // a reference to your toast
    onShown?: Observable<any>; // triggered when toast is active
    onHidden?: Observable<any>; // triggered when toast is destroyed
    onTap?: Observable<any>; // triggered on click
    onAction?: Observable<any>; // available for your use in custom toast
}
