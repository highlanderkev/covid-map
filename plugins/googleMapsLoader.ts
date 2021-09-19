import { Loader } from '@googlemaps/js-api-loader'

const googleMapsLoader = new Loader({
  apiKey: process.env.GOOGLE_MAPS_API_KEY as string,
  version: 'weekly',
  libraries: ["places"]
})
export default googleMapsLoader;
