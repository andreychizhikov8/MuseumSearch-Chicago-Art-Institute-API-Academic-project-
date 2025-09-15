
import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen    from './screens/HomeScreen';
import ResultsScreen from './screens/ResultsScreen';
import DetailScreen  from './screens/DetailScreen';
import ImageViewer   from './screens/ImageViewer';

const Stack = createNativeStackNavigator();


const logoBlack = require('./assets/logo_black.png');

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{
            title: 'All results',
            headerRight: () => (
              <Image
                source={logoBlack}
                style={{ width: 32, height: 32, marginRight: 10 }}
                resizeMode="contain"
              />
            ),
          }}
        />

        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            title: 'About the Artwork',
            headerRight: () => (
              <Image
                source={logoBlack}
                style={{ width: 32, height: 32, marginRight: 10 }}
                resizeMode="contain"
              />
            ),
          }}
        />

        <Stack.Screen
          name="ImageViewer"
          component={ImageViewer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
