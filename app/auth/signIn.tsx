import { View, Text ,Image, TextInput,TouchableOpacity,Alert} from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams,useRouter } from 'expo-router'
import { images } from "@/lib/constants/images";
import { appWriteServices } from '@/lib/services/appwrite';

export default function SingIn() {
 const router = useRouter();
 const [name,setName]=useState('');
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');

  const handleLogin = async () => {
    try {
      await appWriteServices.loginUser(email, password);
      Alert.alert("Success", "Logged in successfully");
      router.push('/profile')
    } catch (e) {
      Alert.alert("Log in failed");
    }
  };




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
        Sign In
      </Text>


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
        onPress={handleLogin}
      >
   
        <Text className="text-white font-semibold text-base">Sign{''} In</Text>
      </TouchableOpacity>

     <Text className='text-white mt-2 p-4' onPress={()=>router.push('/auth/signUp')}>
        Don't have an account yet ? {' '}
        <Text  className='text-accent' >
          SignUp
        </Text>
      </Text>



    </View>
  </View>
    </View>
  )
}