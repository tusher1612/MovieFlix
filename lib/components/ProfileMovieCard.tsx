import { Link, useRouter } from "expo-router";
import { Text, Image, TouchableOpacity, View, Pressable } from "react-native";
import { icons } from "../constants/icons";
import { appWriteServices } from "../services/appwrite";



const ProfileMovieCard = ({
  movie_id,
  poster_path,
  title,
 
}: FavoriteMovie) => {
    const router=useRouter();
    const handleMovieRemove=()=>{
    appWriteServices.deleteFavoriteMovie(Number(movie_id),"profile");
    }
  return (
    
    <Link href={`/movie/${movie_id}`} asChild>
        <TouchableOpacity className="w-32 relative pl-5">
        <View className="absolute w-full">
       <Pressable onPress={handleMovieRemove}>
        <Text className="text-red-500 text-lg font-bold">-</Text>

       </Pressable>

        </View>
        <Image
            source={{
                uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
            }}
             className="w-32 h-48 rounded-lg"
            resizeMode="cover"
            />

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

       

      
      </TouchableOpacity>
    </Link>
  );
};

export default ProfileMovieCard