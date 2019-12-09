/***
 * Analytics Data send via API
 */
export interface ITrackingData {
  eventName: string;
  eventData: any;
  timeStamp: number;
  meta?: any;
  userId?: string;
}