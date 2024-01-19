import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  ImageBackgroundBase,
} from "react-native";
import React, { useCallback, useState } from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { searchMovies } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(false);
  let movieName = "Ant-Man and the wasp: Quantumania";
  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        console.log("got movie: ", data);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextBebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleTextBebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="p-3 pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>
      {/* search results */}

      {loading ? (
        <Loading />
      ) : (
        <View>
          {results.length > 0 ? (
            <ScrollView
              showVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              className="space-y-3"
            >
              <Text className="text-white font-semibold ml-1">
                Results ({results.length})
              </Text>
              <View className="flex-row justify-between flex-wrap">
                {results.map((item, index) => {
                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => navigation.push("Movie", item)}
                    >
                      <View className="space-y-2 mb-4">
                        <Image
                          className="rounded-3xl"
                          source={require("../assets/images/moviePoster1.jpg")}
                          style={{ width: width * 0.44, height: height * 0.3 }}
                        />
                        <Text className="text-neutral-300 ml-1">
                          {movieName.length > 22
                            ? movieName.slice(0, 22) + "..."
                            : movieName}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <View className="flex-row justify-center">
              <Image
                source={require("../assets/images/movieTime.jpeg")}
                className="h-96 w-96"
              />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
