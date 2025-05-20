import { View, Text ,Image, TextInput,TouchableOpacity, Linking} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams,useRouter } from 'expo-router'
import { images } from "@/lib/constants/images";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons } from '@/lib/constants/icons';


export default function Profile() {
const router=useRouter();
const [userName,setUserName]=useState<string | null>('');
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


 <View className='text-white mt-5 font-bold text-xl flex-row  items-center justify-between h-52 p-6'>
   <Text className='font-bold text-x text-white text-lg'>Welcome  <Text className='text-accent'>{userName}</Text></Text>
  <TouchableOpacity onPress={handleLogOut}>
<Image source={icons.logout}  />
  </TouchableOpacity>
  </View>






    </View>
  )
}