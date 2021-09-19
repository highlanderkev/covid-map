import { Loader } from '@googlemaps/js-api-loader'

const apiKey: string = process.env.GOOGLE_MAPS_API_KEY || ''

const googleMapsLoader = new Loader({
  apiKey,
  version: 'weekly'
})
export default googleMapsLoader;
