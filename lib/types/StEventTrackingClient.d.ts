import { IAnalyticsData } from "./domain/IAnalyticsData";
declare const _default: {
    new (key: string): {
        localUserId: string;
        localUserCookieKey: string;
        globalEventProperties: {
            [prop: string]: any;
        };
        cachedEvents: IAnalyticsData[];
        isPageLoaded: boolean;
        trackingServerBaseUrl: string;
        key: string;
        waitForLoad(): void;
        startProcessingCachedEvents(): void;
        /***
         * request new user id from server
         */
        generateUserId(): Promise<string>;
        setUser(userId: string): any;
        /***
         * get local user id if exists else create new
         */
        getUserId(): Promise<void>;
        /***
         * save local user id cookie to browser
         * @param userId
         */
        saveLocalUserIdCookieToBrowser(userId: string): void;
        /***
         * assign global properties to be send in each event request
         * @param properties
         */
        setGlobalProps(properties: {
            [prop: string]: any;
        }): void;
        /***
         * send event to server
         * @param eventName
         * @param eventData
         */
        sendEvent(eventName: string, eventData: {
            [prop: string]: any;
        }): Promise<void>;
        canSendEventToServer(): boolean;
        processCachedEvents(): Promise<void>;
        processPageLoad(): Promise<void>;
        sendEventToServer(event: IAnalyticsData): Promise<void>;
    };
};
export = _default;
