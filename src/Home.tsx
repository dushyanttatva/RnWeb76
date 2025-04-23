import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import { Link } from 'react-router-dom';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from './App';

const API_KEY = 'b8ed02cb';
const rnDimensions = Dimensions.get('window');

const posterWidth = rnDimensions.width - 40;
const posterHeight = posterWidth * (2 / 3);

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  Actors: string;
};

function Home() {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('code');

  const { width } = useWindowDimensions();

  let cardWidth = width - 40;
  let numColumns = 1;

  if (width > 900) {
    numColumns = 3;
    cardWidth = width / 3 - 20;
  } else if (width > 600) {
    numColumns = 2;
    cardWidth = width / 2 - 20;
  }

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      });
  }, [query]);

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  //     if (query.trim().length > 0) {
  //       document.title = movies.length === 0 ? 'No results found' : `Searching for '${query}'`;
  //     } else {
  //       document.title = 'Movie Finder';
  //     }
  //   }
  // }, [query, movies]);

  const openMovieDetails = (movie: Movie) => {
    console.log("debug > id", movie.imdbID);
    navigation.navigate('MovieDetails', { id: movie.imdbID })
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.header}>🎬 Movie Finder</Text>
        <TextInput
          placeholder={'Search movies...'}
          style={styles.input}
          value={query}
          onChangeText={setQuery}
        />
        <FlatList
          data={movies}
          keyExtractor={(item) => item.imdbID}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => openMovieDetails(item)}
              style={[styles.card, { width: cardWidth }]}
            >
              <Image source={{ uri: item.Poster }} style={styles.poster} />
              <Text style={styles.title}>{item.Title}</Text>
              <Text style={styles.year}>{item.Year} {item.imdbID}</Text>
            </TouchableOpacity>
          )}
          numColumns={numColumns}
          columnWrapperStyle={numColumns > 1 ? styles.column : undefined}
        />
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    backgroundColor: '#1F1F1F',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  inner: {
    paddingHorizontal: 16,
    flex: 1,
    maxWidth: '100%',
    alignSelf: 'center',
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
  input: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 24,
    fontSize: 18,
    backgroundColor: '#2D2D2D',
    color: '#fff',
    shadowColor: '#444',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  list: {
    paddingBottom: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  column: {
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 12,
    marginBottom: 20,
    padding: 16,
    paddingTop: Platform.OS === 'web' ? 16 : 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    overflow: 'hidden',
    // transition: 'transform 0.2s ease-in-out',
  },
  poster: {
    width: Platform.OS === 'web' ? '100%' : posterWidth,
    height: Platform.OS === 'web' ? 320 : posterHeight,
    resizeMode: Platform.OS === 'web' ? 'cover' : 'cover',
    borderRadius: 10,
    marginBottom: 14,
    // transition: 'transform 0.3s ease-in-out',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 6,
  },
  year: {
    fontSize: 14,
    color: '#bbb',
  },
  modalContent: {
    backgroundColor: '#2D2D2D',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    maxWidth: 600,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 15,
  },
  modalPoster: {
    width: 220,
    height: 330,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
    borderColor: '#fff',
    borderWidth: 3,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
    color: '#fff',
    textAlign: 'center',
  },
  modalYear: {
    fontSize: 20,
    color: '#bbb',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    // transition: 'background-color 0.3s ease-in-out',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
