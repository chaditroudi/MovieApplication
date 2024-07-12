import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";

var { width, height } = Dimensions.get("window");

export default function MovieCard({ item, handleClick }) {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Movie", { movie: item.name })}
    >
      <View style={{ margin: 5 }}>
        <Image
          source={{
            uri: item.Poster,
          }}
          style={{
            width: width * 0.8,
            height: height * 0.25,
          }}
          resizeMode="cover"
          className="rounded-3xl"
        />
        <View className="absolute bottom-5 left-5 right-5 bg-black bg-opacity-50 rounded-lg p-5">
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            {item.Title}
          </Text>
          <Text style={{ color: "white", fontSize: 14 }}>{item.Year}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
