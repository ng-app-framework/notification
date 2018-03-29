import {NotificationListener}        from "../../src/lib/Service/NotificationListener";
import {Observable}                  from "rxjs/Rx";
import {NotificationBody}            from "../../src/lib/Structure/NotificationBody";
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
                subject.intervalInMilliseconds = 10;
            });
            afterEach(() => {
                subject.stopListening.emit();
            });

            describe('Method: Get Notifications', () => {

                it('should get unread messages from the endpoint', (done) => {
                    let calledApi         = false;
                    subject.api.getUnread = () => {
                        calledApi = true;

                        return Observable.from([<ParsedNotificationStructure>{
                            body             : {},
                            id               : 1,
                            notificationLevel: 'success',
                            title            : 'something'
                        }]);
                    };
                    subject.onNotification.takeUntil(subject.stopListening).subscribe(() => {
                        expect(calledApi).toBeTruthy();
                        done();
                    });
                    subject.getUnread$().subscribe();
                });

                it('should call the endpoint again after the endpoint is called', (done) => {
                    let called            = 0;
                    subject.api.getUnread = () => {
                        called++;
                        if (called === 2) {
                            done();
                        }
                        return Observable.from([]);
                    };
                    subject.getNotifications();
                });
                it('should wait for the listener to be enabled', () => {
                    let calledApi         = false;
                    subject.api.getUnread = () => {
                        calledApi = true;
                        return Observable.empty();
                    };
                    subject.enabled       = () => false;
                    subject.getNotifications();
                    expect(calledApi).toBeFalsy('calledApi');
                });

                it('should still try again after an error', (done) => {
                    let called         = 0;
                    subject.getUnread$ = () => {
                        called++;
                        if (called === 2) {
                            done();
                        }
                        return Observable.throw(new Error("Error!"));
                    };
                    subject.getNotifications();
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
                    subject.getUnread$             = () => {
                        called = true;
                        return Observable.from([]);
                    };
                    expect(called).toBeFalsy();
                    subject.getNotifications();
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
