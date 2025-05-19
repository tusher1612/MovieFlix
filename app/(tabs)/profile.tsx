import { View, Text ,Image, TextInput,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams,useRouter } from 'expo-router'
import { images } from "@/lib/constants/images";

export default function Profile() {
 const router = useRouter();
 const [name,setName]=useState('');
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
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
    <View className="bg-navigation_primary w-96 h-auto items-center  rounded-xl pb-4">
      <Text
        className="text-2xl font-bold text-white mt-4"
        onPress={() => router.push('/auth/signIn')}
      >
        SignIn
      </Text>

<TextInput 
className='border-none border-b-2 border-accent w-80 mt-10 p-4 text-white  rounded-lg'
placeholder='Name'
onChangeText={setName}
value={name}
/>
<TextInput 
className='border-none border-b-2 border-accent w-80 mt-10 p-4 text-white  rounded-lg'
placeholder='Email'
autoCapitalize="none"
keyboardType="email-address"
onChangeText={setEmail}
value={email}
/>
<TextInput 
className='border-none border-b-2 border-accent w-80 mt-10 p-4 text-white  rounded-lg'
placeholder='Password'
secureTextEntry

onChangeText={setPassword}
value={password}
/>

      <TouchableOpacity
        className="bg-accent rounded-lg  flex flex-row items-center justify-center w-80 h-14  mt-10"
        onPress={router.back}
      >
   
        <Text className="text-white font-semibold text-base">Sing In</Text>
      </TouchableOpacity>



    </View>
  </View>
    </View>
  )
}