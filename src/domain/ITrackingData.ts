/***
 * Analytics Data send via API
 */
export interface ITrackingData {
  eventName: string;
  meta: any;
  timeStamp: number;
  userId?: string;
}