import { View, Text,FlatList ,ScrollView,ActivityIndicator} from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFetch from "@/lib/custom-hooks/useFetch";
import MovieApi from '@/lib/api/movieList'
import TrendingCard from "@/lib/components/TrendingCard";
import NewsCard from '@/lib/components/NewsCard';
import { SafeAreaView } from 'react-native-safe-area-context';
export default   function News() {

  const {
    data:movieNews,
    loading: movieNewsLoader,
    error: movieNewsError,
  } = useFetch(() => MovieApi.gelAllMovieNews());



  return (
       
    <View
    className="flex-1 bg-primary p-4 "
    >
    <Text className="text-xl text-white font-bold mb-3 mt-20 ml-6">Trending <Text className='text-accent'>News</Text></Text>
   
   

    {movieNewsLoader && (
            
   <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
  
            )}
  {movieNews && (
        <FlatList
            
                  className="mb-4 mt-3"
                  data={movieNews}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <NewsCard news={item} index={index} />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
  )}


    </View>

  )
}