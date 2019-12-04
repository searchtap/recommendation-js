import * as cookies from "browser-cookies";
import {JSONHelper} from "./util/JSONHelper";
import {IAnalyticsData} from "./domain/IAnalyticsData";
import * as logger from "./util/Logger";
import Events from "./domain/Events";

const nanoid = require('nanoid')

export = class StRecommendationTracker {
  private localUserId: string;
  private localUserCookieKey = "uId";
  private globalEventProperties: { [prop: string]: any };
  private cachedEvents: IAnalyticsData[] = [];
  private isPageLoaded: boolean = false;
  private trackingServerBaseUrl: string = process.env.ST_TRACKING_SERVER;

  constructor(private apiKey: string, private trackAutoEvent: boolean = true) {
    this.getUserId();
    this.waitForLoad();
  }


  private async waitForLoad() {
    this.isPageLoaded = true;
    if (this.trackAutoEvent)
      await this.processPageLoad();
    this.startProcessingCachedEvents();

  }

  private startProcessingCachedEvents() {
    if (this.canSendEventToServer()) {
      this.processCachedEvents();
    }
  }


  /***
   * request new user id from server
   */
  private async generateUserId(): Promise<string | null> {
    return nanoid();

  }


  public setUser(userId: string) {
    this.localUserId = userId;
    this.saveLocalUserIdCookieToBrowser(this.localUserId);

    return this;
  }

  /***
   * get local user id if exists else create new
   */
  private async getUserId() {

    if (!this.localUserId) {
      this.localUserId = cookies.get(this.localUserCookieKey);
      if (!this.localUserId) {
        let userId = await this.generateUserId();
        if (userId) {
          this.localUserId = userId;
          this.saveLocalUserIdCookieToBrowser(this.localUserId);
        }
      } else {
        //re-initialize cookie
        this.saveLocalUserIdCookieToBrowser(this.localUserId);
      }
    }
  }

  /***
   * save local user id cookie to browser
   * @param userId
   */
  private saveLocalUserIdCookieToBrowser(userId: string) {
    cookies.set(this.localUserCookieKey, userId, {
      path: "/",
      expires: 367 * 2
    });
    this.startProcessingCachedEvents();
  }


  /***
   * assign global properties to be send in each event request
   * @param properties
   */
  public setGlobalProps(properties: { [prop: string]: any }) {
    if (!JSONHelper.isValidJson(properties))
      logger.error("Invalid data provided for global Event properties");
    this.globalEventProperties = properties;
  }

  /***
   * send event to server
   * @param eventName
   * @param eventData
   */
  public async track(eventName: string, eventData: { [prop: string]: any }) {
    let analyticsData: IAnalyticsData = {
      eventName: eventName,
      eventData: eventData,
      timeStamp: new Date().valueOf()
    };
    //give preference to event properties upon global event properties
    analyticsData.eventData = Object.assign({}, this.globalEventProperties, analyticsData.eventData);
    if (this.canSendEventToServer())
      await this.sendEventToServer(analyticsData);
    else {
      this.cachedEvents.push(analyticsData);
    }

  }

  private canSendEventToServer(): boolean {
    return this.isPageLoaded;
  }


  private async processCachedEvents() {
    while (this.cachedEvents.length) {
      await this.sendEventToServer(this.cachedEvents.shift())
    }
  }

  private processPageLoad() {
    return this.track(Events.pageLoad, {
      title: document.title,
      href: window.location.href,
      origin: window.location.origin,
      pathname: window.location.pathname
    });
  }

  private async sendEventToServer(event: IAnalyticsData) {
    const img = document.createElement('img');
    img.src = `${this.trackingServerBaseUrl}/e?key=${this.apiKey}&${this.localUserCookieKey}=${this.localUserId}&data=${encodeURIComponent(JSON.stringify(event))}`;
    img.style.display = 'none';
    document.body.appendChild(img);
  }

}
