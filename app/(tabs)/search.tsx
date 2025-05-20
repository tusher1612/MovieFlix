import { Text, View, Image, ActivityIndicator, FlatList,ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { images } from "@/lib/constants/images";
import { icons } from "@/lib/constants/icons";
import SearchBar from "@/lib/components/SearchBar";
import useFetch from "@/lib/custom-hooks/useFetch";
import MovieApi from "@/lib/api/movieList";
import MovieCard from "@/lib/components/MovieCard";
import { useState,useEffect,useCallback } from "react";
import { appWriteServices } from "@/lib/services/appwrite";



const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMovies = useCallback(() => {
    return MovieApi.getAllMovies({ query: searchQuery });
  }, [searchQuery]);



  const {
    data: movies = [],
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => MovieApi.getAllMovies({ query: searchQuery }), false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);

  
  };
  useEffect(() => {
    const timeoutId = setTimeout(async() => {
      if (searchQuery.trim()) {
        loadMovies();
     

      } else {
        reset();
      }
    }, 800); 
  
    return () => clearTimeout(timeoutId); // cleanup previous timeout
  }, [searchQuery]);
 

useEffect(()=>{
   if (movies?.length! > 0 && movies?.[0]) {
          appWriteServices.UpdateSearchTerm(searchQuery, movies[0]);
        }
},[movies])


  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        className="px-5"
        data={movies as Movie[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard{...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
           
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;