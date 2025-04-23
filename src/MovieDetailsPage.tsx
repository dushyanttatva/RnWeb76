import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, ScrollView, Pressable, Dimensions, TouchableOpacity } from 'react-native';
// import { Link, useParams } from 'react-router-dom';

import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from './App';

type MovieDetailsPageNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetails'>;

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  Actors: string;
};

const MovieDetailsPage = () => {
  const navigation = useNavigation<MovieDetailsPageNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'MovieDetails'>>();
  const { id } = route.params;
  // const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=b8ed02cb`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        // if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        //   document.title = data?.Title || 'Movie Details';
        // }
      });
  }, [id]);

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  }

  if (!movie) {
    return (
      <View style={styles.loadingWrapper}>
        <Text style={styles.loadingText}>Fetching movie details...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Movie Details</Text>
      <View style={styles.card}>
        <Image source={{ uri: movie.Poster }} style={styles.poster} />
        <View style={styles.details}>
          <Text style={styles.title}>{movie.Title}</Text>
          <Text style={styles.year}>{movie.Year}</Text>
          <Text style={styles.sectionTitle}>Plot</Text>
          <Text style={styles.description}>{movie.Plot}</Text>
          <Text style={styles.sectionTitle}>Actors</Text>
          <Text style={styles.description}>{movie.Actors}</Text>

          <View style={styles.linkWrapper}>
            <TouchableOpacity onPress={goBack}>
              <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
                <Text style={styles.buttonText}>← Back to Movies</Text>
              </Pressable>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDetailsPage;

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#1F1F1F',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
    backgroundColor: '#1F1F1F',
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
  },
  header: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
    maxWidth: 900,
    width: screenWidth > 920 ? 900 : '100%',
  },
  poster: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
  },
  details: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  year: {
    fontSize: 18,
    color: '#999',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 12,
  },
  linkWrapper: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  button: {
    backgroundColor: '#0051a8',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonPressed: {
    backgroundColor: '#003e85',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
