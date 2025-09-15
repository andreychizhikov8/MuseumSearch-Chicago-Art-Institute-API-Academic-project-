import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ImageViewer({ route }) {
  const { uri } = route.params;
  return (
    <View style={viewerStyles.wrapper}>
      <ScrollView
        style={viewerStyles.scroll}
        maximumZoomScale={3}
        minimumZoomScale={1}
        contentContainerStyle={viewerStyles.container}
      >
        <Image
          source={{ uri }}
          style={viewerStyles.image}
          resizeMode="contain"
        />
      </ScrollView>
    </View>
  );
}

const viewerStyles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#000' },
  scroll: { flex: 1 },
  container: { justifyContent: 'center', alignItems: 'center' },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});