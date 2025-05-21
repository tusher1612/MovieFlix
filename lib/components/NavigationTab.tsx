import { Text, View, ImageBackground, Image } from 'react-native'
import React from 'react'
import { images } from '@/lib/constants/images'
import { icons } from '@/lib/constants/icons'

interface Props {
  focused: boolean
  navTitle: string
  icon: number 
}

const NavigationTab = ({ focused, navTitle, icon }: Props) => {

  if (focused) {
    return (
      <View >
        <ImageBackground
          source={images.highlight}
          className="flex flex-row justify-center items-center w-full min-w-[112px] min-h-16 mt-4 rounded-full overflow-hidden"
        >
          <Image source={icon} tintColor="#151312" className={navTitle==='News' ?"w-6 h-6":"w-5 h-5"} />
          <Text className="text-secondary text-base font-semibold ml-2">{navTitle}</Text>
        </ImageBackground>
      </View>
    )
  }

  return (
    <View className="justify-center items-center mt-4 rounded-full">
      <Image source={icon} className="size-5" tintColor="#A8B5DB" />
    </View>
  )
}

export default NavigationTab
