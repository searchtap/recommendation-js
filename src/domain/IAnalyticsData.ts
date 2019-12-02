/***
 * Analytics Data send via API
 */
export interface IAnalyticsData {
  eventName: string;
  eventData: any;
  timeStamp: number;
}