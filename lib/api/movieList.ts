



import { TMDB_CONFIG } from "../constants/tmd-config";





const getAllMovies=async({query}:{query:string}):Promise<Movie[]>=>{

   const endpoint=query ?   `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`:`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
   const response=await fetch(endpoint,{
    method:'GET',
    headers:TMDB_CONFIG.headers
   })

   if(!response.ok){
    throw console.error( "Failed to fetch  movies",response.statusText);
   }
const data = await response.json();


return data.results;

}

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

//news api 

const gelAllMovieNews=async():Promise<TrendingMovieArticle[]>=>{
  const response= await fetch(`${TMDB_CONFIG.NEWS_KEY}`)
  const newsData= await response.json()

return newsData.news
 
}








const MovieApi={
    getAllMovies,
    fetchMovieDetails,
    gelAllMovieNews
}


export default MovieApi;
