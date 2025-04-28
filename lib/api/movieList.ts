

import { TMDB_CONFIG } from "../constants/tmd-config";





const getAllMovies=async({query}:{query:string}):Promise<Movie[]>=>{
    console.log("Query triggered ",query)
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


const MovieApi={
    getAllMovies,
}


export default MovieApi;
