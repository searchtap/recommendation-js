/***
 * Analytics Data send via API
 */
export interface ITrackingData {
  eventName: string;
  meta: any;
  timeStamp: number;
  recommendationId: string;
  recommendationGroup: string;
  userId?: string;
}