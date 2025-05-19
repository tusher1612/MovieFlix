import { View, Text ,Image, TextInput,TouchableOpacity, Linking} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams,useRouter } from 'expo-router'
import { images } from "@/lib/constants/images";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Profile() {
const router=useRouter();
 const { name } = useLocalSearchParams();
const [userId,setUserId]=useState('')
useEffect(() => {
  const fetchUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log("UserId:",userId)
      if (userId) {
        setUserId(userId)
        console.log("User is logged in:", userId);
      } else {
        console.log("No user found.");
      }
    } catch (error) {
      console.error("Failed to get userId:", error);
    }
  };

  fetchUserId();
}, []);



  return (
    <View
    className="h-screen bg-primary "
    >

      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
<View className="flex-1 items-center justify-center">
 <Text className='font-bold text-x text-white text-lg'>Welcome  <Text className='text-accent'>{name}</Text></Text>
 <Link href={'/auth/signIn'}><Text className='text-white'>SingIn </Text> </Link>
  </View>
    </View>
  )
}