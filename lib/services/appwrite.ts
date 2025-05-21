import { Alert } from 'react-native';


//track the searches made by the user

import {Client,Databases, ID, Query,Account} from 'react-native-appwrite'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';


const DATABASE_ID=process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID=process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const SAVED_MOVIES_COLLECTION_ID=process.env.EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_COLLECTION_ID!;
const FAVORITE_MOVIE_COLLECTION_ID=process.env.EXPO_PUBLIC_APPWRITE_SAVED_FAVORITE_MOVIES_COLLECTION_ID!;
const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)


const database= new Databases(client);
const account = new Account(client);



//user Registration
const registerUser=async(email:string, password:string, name:string)=> {
  try {

    const response =    await database.createDocument(DATABASE_ID, SAVED_MOVIES_COLLECTION_ID, ID.unique(), {

      name:name ,
        email: email,
        password:password
      });

    console.log("Registration successful:", JSON.stringify(response,null,2));
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}

//user login
const loginUser = async (email: string, password: string) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, SAVED_MOVIES_COLLECTION_ID);

    const matchedUser = result.documents.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      console.log("Login successful:", JSON.stringify(matchedUser, null, 2));
      
      return matchedUser;
    } else {
      throw new Error("Invalid email or password.");
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};




//favorite movies 
const saveFavoriteMovie = async ( movie: MovieDetails,userId:string) => {
  try {
      const result = await database.listDocuments(DATABASE_ID, FAVORITE_MOVIE_COLLECTION_ID, [
      Query.equal('userId', userId),
      Query.equal('movie_id',movie.id)
    ]);
    if (!result){
   Alert.alert(
  "Already Added",
  "This movie is already in your favorites list.",
  [{ text: "OK", style: "default" }]
);
console.log("saveFavoriteMovie:",result)
    }
    else {
            await database.createDocument(DATABASE_ID, FAVORITE_MOVIE_COLLECTION_ID, ID.unique(), {
        title: movie.title,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
         movie_id: movie.id,
         userId:userId
      });

router.replace(`/movie/${movie.id}`)
    }
    }
   catch (error) {

Alert.alert(
  "Error",
  `${error}`,
  [
    {
      text: "OK",
      style: "destructive",
    },
  ]
);



    throw new Error('Something went wrong while  saving the movie.');
  }
};


//find specific movie exist or not
const findMovie = async (movieId: number): Promise<FavoriteMovie[]| undefined> => {
  try {
    const userId = await AsyncStorage.getItem('userId');

    if (!userId) {
      console.warn("No userId found in AsyncStorage.");
      return []; 
    }

    const result = await database.listDocuments(
      DATABASE_ID,
      FAVORITE_MOVIE_COLLECTION_ID,
      [
        Query.equal('userId', userId),
        Query.equal('movie_id', movieId),
      ]
    );

    console.log("Result:", JSON.stringify(result.documents, null, 2));
    console.log("Movie found");
    return result.documents as unknown as FavoriteMovie[]
  } catch (error) {
    Alert.alert(
      "Error",
      "Something went wrong while checking your favorites.",
      [
        {
          text: "OK",
          style: "destructive",
        },
      ]
    );
    
    console.error("findMovie error:", error); 
    return []; // Return an empty array on error to maintain consistency
  }
};


//get all favorite movie 
const getAllFavoriteMovie = async (): Promise<FavoriteMovie[]| undefined> => {
  try {
    const userId = await AsyncStorage.getItem('userId');

    if (!userId) {
      console.warn("No userId found in AsyncStorage.");
      return []; 
    }

    const result = await database.listDocuments(
      DATABASE_ID,
      FAVORITE_MOVIE_COLLECTION_ID,
      [
        Query.equal('userId', userId)
      ]
    );
    console.log("Favorite Movie list");
    console.log("Result:", JSON.stringify(result.documents, null, 2));

    return result.documents as unknown as FavoriteMovie[]
  } catch (error) {
    Alert.alert(
      "Error",
      "Something went wrong while checking your favorites.",
      [
        {
          text: "OK",
          style: "destructive",
        },
      ]
    );
    
    console.error("findMovie error:", error); 
    return []; 
  }
};






//Delete favorite movie
const deleteFavoriteMovie = async (movieId: number,screenFlag?:string): Promise<void> => {
  try {
    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      console.warn("No userId found in AsyncStorage.");
      return;
    }

    // First, find the document(s) matching the criteria
    const result = await database.listDocuments(
      DATABASE_ID,
      FAVORITE_MOVIE_COLLECTION_ID,
      [
        Query.equal("userId", userId),
        Query.equal("movie_id", movieId),
      ]
    );

    // If one or more matching documents found, delete them
    if (result.documents.length > 0) {
      for (const doc of result.documents) {
        await database.deleteDocument(
          DATABASE_ID,
          FAVORITE_MOVIE_COLLECTION_ID,
          doc.$id
        );
        console.log(`Deleted document with ID: ${doc.$id}`);
        if(screenFlag==='profile')
        {
      router.replace(`/profile`)
        }
        else {
      router.replace(`/movie/${movieId}`)
        }
  
      }
      Alert.alert("Success", "Movie removed from favorites.");
    } else {
      Alert.alert("Info", "Movie not found in favorites.");
    }
  } catch (error) {
    console.error("deleteFavoriteMovie error:", error);
    Alert.alert(
      "Error",
      "Something went wrong while removing the movie from favorites.",
      [{ text: "OK", style: "destructive" }]
    );
  }
};






// it updates the search term for the trending movie 
 const UpdateSearchTerm = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', query)
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
        searchCount: existingMovie.searchCount + 1
      });

    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        searchCount: 1,
        movie_id: movie.id,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      });

    }
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong while updating or adding the movie.');
  }
};

 const getAllTrendingMovies = async():Promise <TrendingMovie[] | undefined >=> {
try {
  const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('searchCount')
    ]);

  return   result.documents as unknown as TrendingMovie[]
}

catch (error) {
    console.error(error);
    throw new Error('Something went wrong while updating or adding the movie.');

}
}



export const  appWriteServices={
  loginUser,
  registerUser,
  UpdateSearchTerm,
   getAllTrendingMovies,
saveFavoriteMovie,
findMovie,
getAllFavoriteMovie,
deleteFavoriteMovie
}


