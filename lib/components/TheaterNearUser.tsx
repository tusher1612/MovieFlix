import { View, Text,FlatList } from 'react-native'
import React from 'react'
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { GOOGLE_MAP_SERVICES } from '../api/googleMap';
import TheaterCard from './TheaterCard';



const TheaterNearUser = () => {
//fetching user's current location
const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
const [errorMsg, setErrorMsg] = useState('');
const [theaterList, setTheaterList] = useState<OSMElement[]>([]);

useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
   const theaterList=await GOOGLE_MAP_SERVICES.fetchNearbyTheaters(location.coords.latitude, location.coords.longitude);
   if (theaterList){
   setTheaterList(theaterList)
   }

  })();
}, []);

  return (
    <View className=' mt-4'>
      <Text className='text-lg text-white font-bold mb-3'>Nearby Theaters</Text>
      {
        theaterList && (
     <FlatList
                data={theaterList}
                horizontal
                showsHorizontalScrollIndicator={false}
            
                renderItem={({ item }) => <TheaterCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    gap: 26,
                  }}
                className="mb-4 mt-3"
                         ItemSeparatorComponent={() => <View className="w-4" />}
               
              />
        )
      }
     
    </View>
  )
}

export default TheaterNearUser