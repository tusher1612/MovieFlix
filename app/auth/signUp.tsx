import { View, Text ,Image, TextInput,TouchableOpacity,Alert} from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams,useRouter } from 'expo-router'
import { images } from "@/lib/constants/images";
import { appWriteServices } from '@/lib/services/appwrite';
import { v4 as uuidv4 } from 'uuid';
export default function SignUp() {
 const router = useRouter();
 const [name,setName]=useState('');
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');

 const handleRegister = async () => {
    try {
      await appWriteServices.registerUser(email, password, name);
     Alert.alert(
  "Registration Successful",
  "Your account has been created successfully.",
  [{ text: "OK", style: "default" }]
);
router.replace('/auth/signIn')
    } catch (e) {
  Alert.alert(
  "Registration Failed",
  "We were unable to create your account. Please try again later.",
  [{ text: "OK", style: "default" }]
);

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
        Sing Up
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
        onPress={handleRegister}
      >
   
        <Text className="text-white font-semibold text-base">Sing{''} Up</Text>
      </TouchableOpacity>

     <Text className='text-white mt-2 p-4' onPress={()=>router.push('/auth/signIn')}>
        Already have an account ? {' '}
        <Text  className='text-accent' >
          SignIn
        </Text>
      </Text>



    </View>
  </View>
    </View>
  )
}