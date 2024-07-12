import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import MovieContext from '../../MovieContext'; // Adjust the path as necessary
import { getMovieDetails } from '../../utils/moviesapi'; // Adjust the path as necessary

export default function MovieScreen() {
  const { selectedMovie } = useContext(MovieContext);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (selectedMovie && selectedMovie.imdbID) {
        const details = await getMovieDetails(selectedMovie.imdbID);
        setMovieDetails(details);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [selectedMovie]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {movieDetails ? (
        <>
          <Image
            source={{ uri: movieDetails.Poster }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>{movieDetails.Title}</Text>
          <Text style={styles.year}>Year: {movieDetails.Year}</Text>
          <Text style={styles.plot}>{movieDetails.Plot}</Text>
        </>
      ) : (
        <Text>Movie details not found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 300,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  year: {
    fontSize: 16,
  },
  plot: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
});
