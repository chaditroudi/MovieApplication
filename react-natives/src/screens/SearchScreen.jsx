import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image, TextInput, TouchableOpacity, View } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { debounce } from "lodash";
import { searchMovies } from "../../utils/moviesapi";
import React, { useCallback, useState } from "react";

var { width, height } = Dimensions.get("window");

export default function SearchScreen() {

    const navigation = useNavigation();

    const [loading,setLoading] = useState(false);

    const [results,setResults] = useState([]);


    const handleSearch = (search) => {
        if (search && search.length > 2) {
          setLoading(true);
          searchMovies({
            query: search,
            include_adult: false,
            language: "en-US",
            page: "1",
          }).then((data) => {
            console.log("We got our search results");
            setLoading(false);
            if (data && data.results) {
              setResults(data.results);
            }
          });
        }
      };
      const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    return(
        <View className="flex-1 relative">
             <Image
        source={require("../../assets/images/homescreen1.png")}
        style={{
          width: width,
          height: height,
        }}
        className="absolute"
      />
        <View className="mx-4 mb-3 mt-12 flex-row p-2 justify-between items-center bg-white rounded-lg">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search for your Favorite movies"
          placeholderTextColor={"gray"}
          className="pb-1 pl-6 flex-1 font-medium text-black tracking-wider"
        />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

        </View>
    )
}