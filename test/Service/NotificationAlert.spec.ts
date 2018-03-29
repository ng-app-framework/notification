import {AlertProxyMock} from "@ng-app-framework/alert";
import {NotificationAlert} from "../../src/lib/Service/NotificationAlert";
import {Observable} from 'rxjs/Rx';
import {EventEmitter} from "@angular/core";
import {NotificationTypes} from "../../src/lib/Service/NotificationTypes";

describe('Module: Notification', () => {
    describe('Class: NotificationAlert', () => {

        describe('After Instantiation', () => {
            let subject: NotificationAlert;
            let stopListening  = new EventEmitter();
            let alertProxyMock = new AlertProxyMock();
            let apiMock        = <any>{
                getUnread : () => {
                    return Observable.from([]);
                },
                markAsRead: (id: number) => {
                    return Observable.empty();
                }
            };
            beforeEach(() => {
                stopListening.emit();
                alertProxyMock = new AlertProxyMock();
                apiMock        = <any>{
                    getUnread : () => {
                        return Observable.from([]);
                    },
                    markAsRead: (id: number) => {
                        return Observable.empty();
                    }
                };
                subject        = new NotificationAlert(
                    alertProxyMock,
                    <any>{
                        getMessageHtml: (body: any) => {
                            return '';
                        }
                    },
                    apiMock
                );
            });

            describe('Method: Notify', () => {
                it('should call an alert of the type', (done) => {
                    let notification = {
                        id               : 1,
                        notificationLevel: 'Success',
                        title            : 'content',
                        body             : {text: 'content'}
                    };
                    alertProxyMock.onCall.takeUntil(stopListening).first().subscribe(called => {
                        expect(called.method).toEqual(NotificationTypes.Success);
                        done();
                    });
                    expect(() => {
                        subject.notify(<any>notification, true);
                    }).not.toThrow();
                });

                it('should do nothing if a type is not valid', () => {

                    let notification = {
                        id               : 1,
                        notificationLevel: 'DoesNotExist',
                        title            : '',
                        body             : {text: 'content'}
                    };
                    expect(() => {
                        subject.notify(<any>notification, true);
                    }).toThrow();
                })
            });

            describe('Method: Get Notification Config', () => {
                let config: any = {};

                beforeEach(() => {
                    config = subject.getNotificationConfig();
                });
                it('html should be enabled', () => {
                    expect(config.enableHtml).toBeTruthy();
                });
                it('should not have a timeout', () => {
                    expect(config.timeOut).toEqual(0);
                });
                it('should not dismiss on tap', () => {
                    expect(config.tapToDismiss).toBeFalsy();
                });
                it('should include a close button', () => {
                    expect(config.closeButton).toBeTruthy();
                })
            });

            describe('Method: Mark As Read On Close', () => {
                it('should mark a notification as read when it disappears', () => {
                    let event                      = new EventEmitter<any>();
                    let called                     = false;
                    subject.markNotificationAsRead = () => {
                        called = true;
                    };
                    subject.markAsReadOnClose(<any>{onHidden: event}, <any>{id: 1});
                    event.emit();
                    expect(called).toBeTruthy();
                })
            });


            describe('Method: Mark Notification As Read', () => {
                it('should report an error if one is thrown', (done) => {
                    apiMock.markAsRead = () => {
                        return Observable.throw(new Error("Something went wrong!"));
                    };
                    alertProxyMock.onCall.takeUntil(stopListening).first().subscribe((called) => {
                        expect(called.method).toEqual(NotificationTypes.Error);
                        done();
                    });
                    subject.markNotificationAsRead(<any>{id: 1});
                })
            });

            describe('Method: Report Error', () => {
                it('should send an error message to the alert proxy', (done) => {
                    alertProxyMock.onCall.takeUntil(stopListening).first().subscribe((called: { method: string, message: string }) => {
                        expect(called.method).toEqual(NotificationTypes.Error);
                        expect(called.message).toEqual(subject.errorMessage);
                        done();
                    });
                    subject.reportError('');
                })
            });
        });

    });
});
