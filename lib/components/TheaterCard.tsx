import MapView, { Marker } from 'react-native-maps';
import { View, Text, Dimensions } from 'react-native';



const TheaterCard = ({ lat,lon ,tags}: OSMElement) => {

  return (

<View className="bg-navigation_primary rounded-2xl mb-4">

{lat && lon && (
 <MapView
          style={{ width: Dimensions.get('window').width - 40, height: 200, marginBottom: 10,paddingBottom:20 }}
          initialRegion={{
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude: lat, longitude: lon }}
            title={tags.name || 'No name'}
            description={tags.address || ''}
          />
        </MapView>
)

}

    </View>
  );
};

export default TheaterCard;
