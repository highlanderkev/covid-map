export interface UNStatsCovidDataAttributes {
  [index: string]: number | string | null | undefined;
  Active?: number | null;
  Confirmed?: number | null;
  'Country_Region'?: string | null;
  Deaths?: number | null;
  ISO3?: string | null;
  'Incident_Rate'?: number | null;
  'Last_Update'?: number | null;
  Lat?: number | null;
  'Long_'?: number | null;
  'Mortality_Rate'?: number | null;
  OBJECTID?: number | null;
  'People_Hospitalized'?: number | null;
  'People_Tested'?: number | null;
  Recovered?: number | null;
  UID?: number | null;
}

export interface UNStatsCountryCovidData {
  attributes?: UNStatsCovidDataAttributes | null;
  geometry?: {
    x: number;
    y: number;
  }
}

export interface UNStatsCovidData {
  features?: Array<UNStatsCountryCovidData> | null;
  fields?: Array<any> | null;
  geometryType?: string | null;
  globalIdFieldName?: string | null;
  objectIdFieldName?: string | null;
  spatialReference?: any | null;
  uniqueIdField?: any | null;
}

export interface GeoCoordinates {
  [index: number]: number;
  latitude?: number;
  longitude?: number;
}

export interface CountryCovidStatistics {
  [index: string]: number | string | GeoCoordinates | null | undefined;
  active?: number;
  confirmed?: number;
  confirmedDaily?: number;
  coordinates?: GeoCoordinates;
  country?: string;
  countryCode?: string;
  date?: string;
  dateUpdated?: string | number;
  deaths?: number;
  deathsDaily?: number;
  hospitalized?: number;
  incidentRate?: number;
  mortalityRate?: number;
  tested?: number;
  recovered?: number;
  recoveredDaily?: number;
}
