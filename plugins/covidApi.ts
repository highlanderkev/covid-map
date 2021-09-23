import axios, { AxiosError, AxiosResponse } from 'axios'
import {
  UNStatsCovidDataAttributes,
  UNStatsCountryCovidData,
  UNStatsCovidData,
  CountryCovidStatistics,
} from '@/models/covidData';

interface UNStatsApiResponse {
  status?: number | string | null;
  statusText?: string | null;
  request?: any | null;
  headers?: any | null;
  config?: any | null;
  data?: UNStatsCovidData | any | null;
}

const unStatsapi = axios.create({
  baseURL: 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/'
})

// const covid19api = axios.create({
//   baseURL: 'https://api.covid19api.com/'
// })

class CovidAPI {
  private errorHandler(error: AxiosError) {
    // eslint-disable-next-line no-console
    const logger = console.error || console.log;
    if (error.response) {
      logger(error.response.data);
      logger(error.response.status);
      logger(error.response.headers);
    } else if (error.request) {
      logger(error.request);
    } else {
      logger('Error', error.message);
    }
    logger(error.config);
  }

  private mapUNStatsCovidDataAtrributesToCovidStatistics(attributes: UNStatsCovidDataAttributes): CountryCovidStatistics {
    return {
      active: attributes.Active || undefined,
      confirmed: attributes.Confirmed || undefined,
      coordinates: {
        latitude: attributes.Lat || undefined,
        longitude: attributes.Long_ || undefined,
      },
      country: attributes.Country_Region || undefined,
      countryCode: attributes.ISO3 || undefined,
      dateUpdated: attributes.Last_Update || undefined,
      deaths: attributes.Deaths || undefined,
      hospitalized: attributes.People_Hospitalized || undefined,
      incidentRate: attributes.Incident_Rate || undefined,
      mortalityRate: attributes.Mortality_Rate || undefined,
      tested: attributes.People_Tested || undefined,
      recovered: attributes.Recovered || undefined,
    }
  }

  private mapUNStatsCovidDataToCovidStatistics(covidData: UNStatsCovidData): CountryCovidStatistics {
    const attributes: UNStatsCovidDataAttributes = covidData?.features && covidData?.features[0] && covidData?.features[0]?.attributes ? covidData?.features[0]?.attributes : {}
    return this.mapUNStatsCovidDataAtrributesToCovidStatistics(attributes)
  }

  private mapUNStatsCovidDataToArrayOfCountryCovidStatistics(covidData: UNStatsCovidData): Array<CountryCovidStatistics> {
    const data = covidData?.features?.map((data: UNStatsCountryCovidData) => {
      return this.mapUNStatsCovidDataAtrributesToCovidStatistics(data?.attributes as UNStatsCovidDataAttributes) || {}
    })
    return data || []
  }

  public async getUNStatsCovidDataForCountry(country: string): Promise<void | CountryCovidStatistics> {
    const response = await unStatsapi.request<any, AxiosResponse<UNStatsApiResponse>>({
      url: '/query',
      method: 'get',
      params: {
        where: `Country_Region like '${country}'`,
        outFields: '*',
        f: 'json'
      }
    }).catch(this.errorHandler);
    if(response && response?.status && response?.status === 200 && response.data) {
      return this.mapUNStatsCovidDataToCovidStatistics(response.data as UNStatsCovidData)
    } else {
      // eslint-disable-next-line no-console
      console.log(`Response Failed: ${response}`)
    }
  }

  public async getAllUNStatsCovidData(): Promise<void | Array<CountryCovidStatistics>> {
    const response = await unStatsapi.request<any, AxiosResponse<UNStatsApiResponse>>({
      url: '/query',
      method: 'get',
      params: {
        where: `1=1`,
        outFields: '*',
        f: 'json'
      }
    }).catch(this.errorHandler);
    if(response && response?.status && response?.status === 200 && response.data) {
      return this.mapUNStatsCovidDataToArrayOfCountryCovidStatistics(response.data as UNStatsCovidData)
    } else {
      // eslint-disable-next-line no-console
      console.log(`Response Failed: ${response}`)
    }
  }
}
export default new CovidAPI()
