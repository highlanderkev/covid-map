import { Loader } from '@googlemaps/js-api-loader'

let googleMapsLoader: Loader | null = null

export const getGoogleMapsLoader = (apiKey: string): Loader => {
  if (!googleMapsLoader) {
    googleMapsLoader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places'],
    })
  }
  return googleMapsLoader
}
