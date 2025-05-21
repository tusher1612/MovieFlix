// components/NewsCard.tsx
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { images } from "@/lib/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";









const TheaterCard = ({ tags }: OSMElement) => {
console.log("Tags:",tags)


  return (
    <View className="bg-navigation_primary rounded-2xl">  
     
    <View
className="w-full  p-5">
    
{['name', 'address'].map((key) => {
  const value = tags[key];
  return value ? (
    <Text key={key} className="text-base font-bold mt-2 text-light-200 p-2">
   {value}
    </Text>
  ) : null;
})}
     
    </View>
    </View>
  );
};

export default TheaterCard;