

//track the searches made by the user

import {Client,Databases, ID, Query} from 'react-native-appwrite'



const DATABASE_ID=process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID=process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)


const database= new Databases(client);


export const  UpdateSearchTerm=async (query:string, movie:Movie)=> {


    try {
        const result=await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.equal('searchTerm',query)
        ])
      if(result.documents.length >0){
        const existingMovie=result.documents[0];
        const updateData=await database.updateDocument(DATABASE_ID,COLLECTION_ID,existingMovie.$id,
        {
            searchCount:existingMovie.searchCount+1
            
        }
        )

      }
    
      else {
    const newData=   await database.createDocument(DATABASE_ID,COLLECTION_ID,ID.unique(),{
            searchTerm:query,
            searchCount:1,
            movie_id:movie.id,
            title:movie.title,
            poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`
             
        })
   
    
      }
    }
    catch (error){
        console.log(error);
        throw error;
    }

}





