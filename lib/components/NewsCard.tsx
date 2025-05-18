// components/NewsCard.tsx
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { images } from "@/lib/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";

interface NewsCardProps {
  index: number;
  news: {
    id: number;
    author:string;
    headline: string;
    abstract:string;
    article_uri: string;
    date: string;
    section: string;
    pfd_uri: string;
  };
}

const NewsCard = ({ index, news }: NewsCardProps) => {
  const { headline,abstract, article_uri, pfd_uri ,author,date,section} = news;
const formattedDate = new Date(date).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short", 
  day: "numeric",
});
  const openPDF = () => {
    if (article_uri) {
      Linking.openURL(article_uri);
    }
  };

  return (
    <View className="bg-navigation_primary rounded-2xl">  
     
    <TouchableOpacity
      className="w-full relative p-5"
      onPress={openPDF}
      activeOpacity={0.8}
    >
    



      <Text
        className="text-md font-bold mt-2 text-light-200 "
    
      >
        {headline}
      </Text>
      <Text  className="text-sm font-normal mt-2 text-light-200  ">{abstract}</Text>
        <Text  className="text-sm font-bold mt-2 text-light-200  ">Author:  <Text className="font-light ">{author} </Text></Text>
     <View className="flex-row  items-center  justify-between">
<Text  className="text-sm font-bold mt-2 text-light-100">{section}</Text>
<Text  className="text-sm font-bold mt-2 text-light-200">{formattedDate}</Text>
      </View>
     
    </TouchableOpacity>
    </View>
  );
};

export default NewsCard;