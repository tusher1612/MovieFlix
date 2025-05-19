import { View, Text ,Image, TextInput,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { Link, useLocalSearchParams,useRouter } from 'expo-router'
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
<Text className='text-white'>Profile</Text>



<Link href={'/auth/signIn'} className='mt-10'>
<Text className='text-white '>SingIn</Text>

</Link>

<Link href={'/auth/signUp'} className='mt-10'>
<Text className='text-white '>SingUp</Text>

</Link>
  </View>
    </View>
  )
}