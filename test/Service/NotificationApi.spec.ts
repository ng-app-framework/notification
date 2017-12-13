import {NotificationApi} from "../../src/lib/Service/NotificationApi";
import {NotificationsEndpoint} from "../../src/lib/Endpoint/NotificationsEndpoint";
import {MarkNotificationAsReadEndpoint} from "../../src/lib/Endpoint/MarkNotificationAsReadEndpoint";
import {EndpointCallerMock} from "@ng-app-framework/api";

describe('Module: Notification', () => {
    describe('Class: NotificationApi', () => {

        describe('After Instantiation', () => {
            let subject: NotificationApi;

            let markNotificationCallerMock = new EndpointCallerMock();
            let notificationsCallerMock    = new EndpointCallerMock();

            beforeEach(() => {
                subject                                 = new NotificationApi(
                    new NotificationsEndpoint(<any>notificationsCallerMock),
                    new MarkNotificationAsReadEndpoint(<any>markNotificationCallerMock)
                );
                notificationsCallerMock.mockResponse    = [
                    {
                        body             : '{"text":"works!"}',
                        id               : 1,
                        notificationLevel: 'success',
                        title            : ''
                    },
                    {
                        body             : '{"text":"works 2!"}',
                        id               : 2,
                        notificationLevel: 'success',
                        title            : ''
                    }
                ];
                markNotificationCallerMock.mockResponse = 'wha?';
            });

            describe('Method: Get Unread', () => {
                it('should return a list of notifications', (done) => {
                    let expectedProgression = [
                        {text: 'works!'},
                        {text: 'works 2!'}
                    ];
                    let actualProgression   = [];
                    subject.getUnread().subscribe({
                        next    : notification => {
                            actualProgression.push(notification.body);
                        },
                        complete: () => {
                            expect(actualProgression).toEqual(expectedProgression);
                            done();
                        }
                    })
                });
            });
            describe('Method: Mark As Read', () => {
                it('should return a response for the mark endpoint', (done) => {
                    subject.markAsRead(1).subscribe(response => {
                        expect(response).toEqual('wha?');
                        done();
                    });
                })
            });
        });

    });
});
