import axios, { AxiosError, AxiosResponse } from 'axios'
import { CovidData } from '@/models/covidData';

const api = axios.create({
  baseURL: 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/'
})

interface ApiResponse {
  status?: number | string | null;
  statusText?: string | null;
  request?: any | null;
  headers?: any | null;
  config?: any | null;
  data?: CovidData | any | null;
}

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

  public async getCovidDataForCountry(country: string): Promise<void | CovidData> {
    const response = await api.request<any, AxiosResponse<ApiResponse>>({
      url: '/query',
      method: 'get',
      params: {
        where: `Country_Region like '${country}'`,
        outFields: '*',
        f: 'json'
      }
    }).catch(this.errorHandler);
    if(response && response?.status && response?.status === 200 && response.data) {
      return response.data as CovidData
    } else {
      // eslint-disable-next-line no-console
      console.log(`Response Failed: ${response}`)
    }
  }

  public async getAllCovidData(): Promise<void | CovidData> {
    const response = await api.request<any, AxiosResponse<ApiResponse>>({
      url: '/query',
      method: 'get',
      params: {
        where: `1=1`,
        outFields: '*',
        f: 'json'
      }
    }).catch(this.errorHandler);
    if(response && response?.status && response?.status === 200 && response.data) {
      return response.data as CovidData
    } else {
      // eslint-disable-next-line no-console
      console.log(`Response Failed: ${response}`)
    }
  }
}
export default new CovidAPI()
