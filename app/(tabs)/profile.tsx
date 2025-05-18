import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function Profile() {

  return (
    <View
    className="h-screen bg-primary flex-1 justify-center items-center"
    >
      <Text className="text-2xl font-bold text-white">Profile </Text>
    </View>
  )
}