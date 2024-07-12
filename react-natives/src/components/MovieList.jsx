import React from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function MovieList({ title, data, handleClick }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback key={index} onPress={() => handleClick(item)}>
        <View style={{ margin: 5 }}>
          <Image
            source={{
              uri: item.Poster,
            }}
            style={{
              width: width * 0.3,
              height: height * 0.2,
              borderRadius: 10,
            }}
            resizeMode="cover"
          />
          <View className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 rounded-lg p-2">
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              {item.Title.length > 12 ? item.Title.slice(0, 12) + '...' : item.Title}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ marginLeft: 10, marginBottom: 10 }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          {title}
        </Text>
      </View>
     {data.length > 0 ? <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      /> :<View><Text>Movie not found</Text></View>}
    </View>
  );
}
