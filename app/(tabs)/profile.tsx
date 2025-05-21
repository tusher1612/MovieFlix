import { View, Text ,Image, TextInput,TouchableOpacity,FlatList, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { images } from "@/lib/constants/images";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons } from '@/lib/constants/icons';
import useFetch from '@/lib/custom-hooks/useFetch';
import { appWriteServices } from '@/lib/services/appwrite';
import MovieCard from '@/lib/components/MovieCard';
import ProfileMovieCard from '@/lib/components/ProfileMovieCard';


export default function Profile() {
const router=useRouter();
const [userName,setUserName]=useState<string | null>('');
const {data:favoriteMovie,loading}=useFetch(()=>appWriteServices.getAllFavoriteMovie())

useEffect(() => {
  const fetchUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const userName=await AsyncStorage.getItem('userName')
      setUserName(userName)
      console.log("UserId:",userId)
      console.log("UserName:",userName)
      if (userId) {
        console.log("User is logged in:", userId);
     
      } else {
        console.log("No user found.");
          
        router.replace('/auth/signIn');
      }
    } catch (error) {
      console.error("Failed to get userId:", error);
    }
  };

  fetchUserId();
}, []);


const handleLogOut = async ()=>{
  await AsyncStorage.removeItem('userId')
  router.replace('/auth/signIn'); 
}

  return (
    <View
    className="h-screen bg-primary "
    >

      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
  {loading &&
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />}

 <View className=' p-6'>


  <View className='text-white  font-bold text-xl flex-row  items-center justify-between h-52'>


 
   <Text className='font-bold  text-white text-lg'>Welcome  <Text className='text-accent'>{userName}</Text></Text>
  <TouchableOpacity onPress={handleLogOut}>
<Image source={icons.logout}  />
  </TouchableOpacity>
 </View>

  <View className='w-full '>

<Text className="text-lg text-white font-bold mb-3">Favorite Movies</Text>
        <FlatList
                data={favoriteMovie}
                horizontal
                    showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <ProfileMovieCard {...item} />}
                keyExtractor={(item) => item.movie_id.toString()}
                contentContainerStyle={{
                    gap: 26,
                  }}
                className="mb-4 mt-3"
                         ItemSeparatorComponent={() => <View className="w-4" />}
               
              />

  </View>
  </View>






    </View>
  )
}