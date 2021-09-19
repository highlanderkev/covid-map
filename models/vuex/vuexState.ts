import { CovidData, CountryCovidData } from '@/models/covidData';

export interface VuexState {
  selectedCountry: string;
  covidData: CovidData;
  selectedCovidData: CountryCovidData;
}
