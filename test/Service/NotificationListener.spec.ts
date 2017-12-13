import {NotificationListener} from "../../src/lib/Service/NotificationListener";
import {Observable} from "rxjs/Rx";
import {ParsedNotificationStructure} from "../../src/lib/Structure/ParsedNotificationStructure";

describe('Module: Notification', () => {
    describe('Class: NotificationListener', () => {

        describe('After Instantiation', () => {
            let subject: NotificationListener;

            beforeEach(() => {
                subject = new NotificationListener(
                    <any>{
                        notify: () => {

                        }
                    },
                    <any>{
                        getUnread: () => {

                        }
                    }
                );
            });
            afterEach(() => {
                subject.stopListening.emit();
            });

            describe('Method: Get Notifications', () => {

                it('should get unread messages from the endpoint', () => {
                    let calledApi         = false;
                    subject.api.getUnread = () => {
                        calledApi = true;
                        return Observable.from([]);
                    };
                    subject.getNotifications();
                    expect(calledApi).toBeTruthy();
                });

                it('should call the endpoint again after the endpoint is called', () => {
                    let called                    = false;
                    subject.api.getUnread         = () => {
                        return Observable.from([]);
                    };
                    subject.getNotificationsLater = () => {
                        called = true;
                    };
                    subject.getNotifications();
                    expect(called).toBeTruthy();
                });
                it('should wait for the listener to be enabled', () => {
                    let called                    = false;
                    let calledApi                 = false;
                    subject.api.getUnread         = () => {
                        calledApi = true;
                        return Observable.empty();
                    };
                    subject.getNotificationsLater = () => {
                        called = true;
                    };
                    subject.enabled               = () => false;
                    subject.getNotifications();
                    expect(called).toBeTruthy('getLater');
                    expect(calledApi).toBeFalsy('calledApi');
                });

                it('should still try again after an error', () => {
                    let called                    = false;
                    subject.getUnread$            = () => {
                        return Observable.throw(new Error("Error!"));
                    };
                    subject.getNotificationsLater = () => {
                        called = true;
                    };
                    subject.getNotifications();
                    expect(called).toBeTruthy();
                });
            });
            describe('Method: Get Unread', () => {
                it('should send an alert to post the notification to the UI', (done) => {
                    let called            = false;
                    subject.api.getUnread = (): Observable<ParsedNotificationStructure> => {
                        return Observable.from([<any>{notificationLevel: 'Success'}]);
                    };
                    subject.alert.notify  = () => {
                        called = true;
                    };
                    subject.getUnread$().subscribe({
                        complete: () => {
                            expect(called).toBeTruthy();
                            done();
                        }
                    });
                });
            });
            describe('Method: Get Notifications Later', () => {
                it('should wait and execute the getNotifications method', (done) => {
                    let called                     = false;
                    subject.getNotifications       = () => {
                        called = true;
                    };
                    subject.intervalInMilliseconds = 10;
                    subject.getNotificationsLater();
                    expect(called).toBeFalsy();
                    Observable.interval(subject.intervalInMilliseconds).first().subscribe({
                        complete: () => {
                            expect(called).toBeTruthy();
                            done();
                        }
                    })
                })
            });
        });

    });
});
