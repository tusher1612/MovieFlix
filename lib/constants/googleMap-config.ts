export const OpenStreetMapServices={
    BASE_URL:'https://overpass-api.de/api',
     GOOGLE_MAP_API_KEY: process.env.EXPO_PUBLIC_GOOGLEMAPS_API_KEY,
   
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_GOOGLEMAPS_API_KEY}`
      }
    }