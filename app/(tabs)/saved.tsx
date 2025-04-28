import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function Saved() {
 
  return (
    <View
    className="flex-1 justify-center items-center"
    >
      <Text className="text-2xl font-bold text-secondary">Saved </Text>
    </View>
  )
}