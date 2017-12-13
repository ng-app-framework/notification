import {NotificationBody} from "./NotificationBody";

export interface ParsedNotificationStructure {
    body: NotificationBody;
    id: number;
    notificationLevel: string;
    title: string;
}
