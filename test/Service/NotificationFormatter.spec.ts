import {NotificationFormatter} from "../../src/lib/Service/NotificationFormatter";

describe('Module: Notification', () => {
    describe('Class: NotificationFormatter', () => {

        describe('After Instantiation', () => {
            let subject: NotificationFormatter;

            beforeEach(() => {
                subject = new NotificationFormatter();
            });

            describe('Method: Get Message Html', () => {
                it('should return the body if it is a string', () => {
                    expect(subject.getMessageHtml(<any>'hello!')).toEqual('hello!');
                });
                it('should return the html if the body is an object', () => {
                    expect(subject.getMessageHtml({
                        text: 'hello!'
                    })).toEqual('<div>hello!</div>');
                });
                it('should return an empty string if the null or an invalid object is provided', () => {
                    expect(subject.getMessageHtml(null)).toEqual('');
                    expect(subject.getMessageHtml(<any>{})).toEqual('');
                })
            });

            describe('Method: Get Html From Object', () => {
                it('should return the body text in a div', () => {

                    expect(subject.getHtmlFromObject({
                        text: 'test content'
                    })).toEqual(
                        '<div>test content</div>'
                    );
                });
                it('should return the body text AND a link if a link is provided', () => {

                    expect(subject.getHtmlFromObject({
                        text: 'test content',
                        link: {
                            text: 'works',
                            href: '/test'
                        }
                    })).toEqual(
                        '<div>test content</div><div><a href="/test" >works</a></div>'
                    );
                });
            });

            describe('Method: Get Link', () => {
                it('should return html with the link details', () => {
                    expect(subject.getLink({text: 'works', href: '/test'})).toEqual(
                        '<div><a href="/test" >works</a></div>'
                    );
                });
            });

            describe('Method: Get Download String', () => {
                it('should return "download" if it is a download link', () => {
                    expect(subject.getDownloadString(<any>{href: 'is-download.csv'})).toEqual('download');
                });
                it('should return "" if it is not a download link', () => {
                    expect(subject.getDownloadString(<any>{href: 'is-not-download'})).toEqual('');
                });
            });

            describe('Method: Is Download Link', () => {
                it('should return true if the link has the appropriate extension', () => {
                    expect(subject.isDownloadLink('this-should-work.csv')).toBeTruthy('csv');
                    expect(subject.isDownloadLink('this-should-work.txt')).toBeTruthy('txt');
                });
                it('should return false if the extension is not at the end', () => {

                    expect(subject.isDownloadLink('this-should-work.csv.bak')).toBeFalsy('csv');
                    expect(subject.isDownloadLink('this-should-work.txt.bak')).toBeFalsy('txt');
                });

                it('should return false if the extension is not anywhere', () => {
                    expect(subject.isDownloadLink('this-should-work.bak')).toBeFalsy();
                });
            });

            describe('Method: Has Link', () => {
                it('should return true if the proper structure is provided', () => {
                    expect(subject.hasLink({
                        link: {
                            href: 'provided'
                        }
                    })).toBeTruthy();
                });
                it('should return false if the href is empty', () => {

                    expect(subject.hasLink({
                        link: {
                            href: ''
                        }
                    })).toBeFalsy();
                });

                it('should return false if the structure is wrong', () => {
                    expect(subject.hasLink({
                        link: {}
                    })).toBeFalsy();
                });
            });
        });
    });
});
