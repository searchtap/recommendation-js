export interface ISearchResponse {
  uniqueId: string,
  query: ISearchRequest;
  results: any[];
  responseTime: number;
  totalHits: number;

  [props: string]: any
}

export interface ISearchRequest {
  query: string;
  fields: string[];
  textFacets: string[];
  highlightFields: string[];
  searchFields: string[];
  filter: string;
  sort: string[];
  skip: number;
  count: number;
  collection: string;
  facetCount: number;
  groupBy?: string;
  groupCount: number;
  typoTolerance: number;

  [props: string]: any
}