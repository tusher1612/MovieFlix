export const TMDB_CONFIG={
    BASE_URL:'https://api.themoviedb.org/3',
      API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
      NEWS_KEY:process.env.EXPO_PUBLIC_MOVIE_NEWS_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
      }
    }