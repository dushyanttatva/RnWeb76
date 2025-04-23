import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as React from 'react';
import { Platform } from 'react-native';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import MovieDetailsPage from './MovieDetailsPage';

export type RootStackParamList = {
  Home: undefined;
  MovieDetails: { id: string };
};

const Stack = createStackNavigator<RootStackParamList>();
// const Stack = Platform.OS === 'web' ? createStackNavigator<RootStackParamList>() : createNativeStackNavigator<RootStackParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['http://localhost:8080', 'https://yourdomain.com'],
  config: {
    screens: {
      Home: '',
      MovieDetails: 'movie/:id',
    },
  },
};

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="MovieDetails" component={MovieDetailsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App;
