import { View, Text,Image,TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/lib/constants/icons'

interface Props {
    onPress?:()=>void,
    placeholder:string,
    value?:string,
    onChangeText?:(text:string)=>void
    

}

const SearchBar = ({onPress,placeholder,onChangeText,value}:Props) => {
  return (
    <View className='flex-row items-center  bg-dark-200 rounded-full  px-5 py-4'>
  <Image source={icons.search} className='size-5' resizeMode='contain' tintColor='#ab8bff'  />
  <TextInput placeholder={placeholder} onPress={onPress} value={value}  onChangeText={onChangeText}   className='flex-1 ml-2 text-white' placeholderTextColor='#a8b5db'/>
    </View>
  )
}

export default SearchBar