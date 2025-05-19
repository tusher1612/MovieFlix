import { View, Text ,Image, TextInput,TouchableOpacity, Linking} from 'react-native'
import React, { useState } from 'react'
import { Link, useLocalSearchParams,useRouter } from 'expo-router'
import { images } from "@/lib/constants/images";



export default function Profile() {
 const router = useRouter();
 const [name,setName]=useState('');
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');

const [loggedIn,setLoggedIn]=useState(false);
// if(!loggedIn) {
//   router.push('/auth/signIn')

// }

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
 <Text className='font-bold text-x text-white text-lg'>Welcome  <Text className='text-accent'>Tusher</Text></Text>
 <Link href={'/auth/signIn'}><Text className='text-white'>SingIn </Text> </Link>
  </View>
    </View>
  )
}