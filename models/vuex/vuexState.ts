import { CountryCovidStatistics } from '@/models/covidData';

export interface VuexState {
  selectedCountry: string;
  covidData: Array<CountryCovidStatistics>;
  selectedCovidData: CountryCovidStatistics;
}
