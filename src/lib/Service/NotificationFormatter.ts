import {NotificationBody} from "../Structure/NotificationBody";
import {Injectable} from "@angular/core";
import {StringValue, Value} from "@ng-app-framework/core";

@Injectable()
export class NotificationFormatter {
    getMessageHtml(body: NotificationBody) {
        if (Value.isString(body)) {
            return body;
        }
        if (Value.isProvided(body) && Value.isProvided(body.text)) {
            return this.getHtmlFromObject(body);
        }
        return '';
    }

    getHtmlFromObject(body) {
        let html = `<div>${body.text}</div>`;
        if (this.hasLink(body)) {
            html += this.getLink(body.link);
        }
        return html;
    }

    getLink(link: { href: string, text: string }) {
        return `<div><a href="${link.href}" ${this.getDownloadString(link)}>${link.text}</a></div>`;
    }

    getDownloadString(link: { href: string; text: string }) {
        if (this.isDownloadLink(link.href)) {
            return 'download';
        }
        return ''
    }

    isDownloadLink(link: string) {
        return link.indexOf('.csv') === link.length - 4 || link.indexOf('.txt') === link.length - 4;
    }

    hasLink(body) {
        return Value.isNotNull(body.link) && StringValue.isPopulated(body.link['href']);
    }
}
