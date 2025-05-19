import { View, Text,Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { images } from "@/lib/constants/images";
export default function signIn() {

  return (
    <View
    className="h-screen bg-primary flex-1 "
    >
   <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <View className='h-auto w-98 bg-navigation_primary '> 

      <Text className="text-2xl font-bold text-white">SingIn </Text>

      </View>

    </View>
  )
}