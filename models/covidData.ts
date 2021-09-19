export interface CovidDataAttributes {
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

export interface CountryCovidData {
  attributes?: CovidDataAttributes | null;
  geometry?: {
    x: number;
    y: number;
  }
}

export interface CovidData {
  features?: Array<CountryCovidData> | null;
  fields?: Array<any> | null;
  geometryType?: string | null;
  globalIdFieldName?: string | null;
  objectIdFieldName?: string | null;
  spatialReference?: any | null;
  uniqueIdField?: any | null;
}
