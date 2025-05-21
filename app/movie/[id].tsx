import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/lib/constants/icons";
import useFetch from "@/lib/custom-hooks/useFetch";
import MovieApi from "@/lib/api/movieList";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appWriteServices } from "@/lib/services/appwrite";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
 const [userId,setUserId]=useState<string | null>('');
 const [movieId,setMovieId]=useState();
  const { data: movie, loading } = useFetch(() =>
    MovieApi.fetchMovieDetails(id as string)
  );
 
const{data:favoriteMovies,loading:favoriteLoading}=useFetch(()=>appWriteServices.findMovie(Number(id)));


//adding movie with userId
const handleMovieAdd=async()=>{
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log("UserId:",userId)
      if (userId) {
        console.log("User is logged in:", userId);
     if (movie !== null) {
       appWriteServices.saveFavoriteMovie(movie,userId)
        }
     
      } else {
        console.log("No user found.");
          
        router.replace('/auth/signIn');
      }
    } catch (error) {
      console.error("Failed to get userId:", error);
    }

}

//

const handleMovieRemove=()=>{
appWriteServices.deleteFavoriteMovie(Number(id));

}


  if (loading || favoriteLoading)
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );



  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          <TouchableOpacity className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center">
            <Image
              source={icons.play}
              className="w-6 h-7 ml-1"
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center  justify-between w-full">
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>

           </View>

              {
              (favoriteMovies &&  favoriteMovies?.length >0)  ? (<TouchableOpacity onPress={handleMovieRemove} activeOpacity={0.4}>
                <Text className="text-accent  font-bold text-4xl p-2 " >-</Text>
              </TouchableOpacity> ) : (<TouchableOpacity onPress={handleMovieAdd} activeOpacity={0.4}>
                <Text className="text-accent  font-bold text-4xl p-2" >+</Text>
              </TouchableOpacity>)
              }

          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" • ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;