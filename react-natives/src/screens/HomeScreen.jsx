import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../../utils/moviesapi';
import Loading from '../components/Loading';
import MovieList from '../components/MovieList';
import MovieContext from '../../MovieContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const { setSelectedMovie } = useContext(MovieContext);
  const [movies, setMovies] = useState([]);

  const { isLoading, refetch } = useQuery({
    queryKey: ['searchMovies', searchQuery],
    queryFn: () => searchMovies(searchQuery),
    onSuccess: (data) => {
      setMovies(data.Search || []);
    },
    onError: (error) => {
      console.log('Error fetching Movies', error);
    },
  });
  


  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    navigation.navigate('Movie');
  };

  return (
    <View className="flex-1 bg-black">
      <Image
        source={require('../../assets/images/homescreen2.png')}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        resizeMode="cover"
      />
      <StatusBar style="light" />
      <View className="mt-16">
        <View className="flex-row justify-between items-center mx-4 mb-4">
          <View className="border-2 border-white rounded-full overflow-hidden">
            <Image
              source={require('../../assets/images/avatar.png')}
              style={{
                width: 45,
                height: 45,
              }}
              resizeMode="cover"
            />
          </View>

          <View className="flex-row space-x-4">
            <BellIcon size={30} strokeWidth={2} color="white" />
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </View>

      
        {isLoading ? (
          <Loading />
        ) : (
             <MovieList title="Movies" data={movies} handleClick={handleMovieClick} />
            )}
           
          
         
      </View>
    </View>
  );
}
