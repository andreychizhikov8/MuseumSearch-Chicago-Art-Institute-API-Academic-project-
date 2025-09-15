

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Pressable
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function DetailScreen({ route, navigation }) {
  const { id, image_id } = route.params;
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const fields = 'id,title,image_id,date_start,artist_title,place_of_origin,medium_display,dimensions,thumbnail,credit_line';
        const url = `https://api.artic.edu/api/v1/artworks/${id}?fields=${fields}`;
        const resp = await fetch(url);
        const json = await resp.json();
        setArtwork(json.data);
      } catch (e) {
        setError('Failed to load artwork details');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;
  if (!artwork) return null;

  const imgUri = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
  const origin = artwork.place_of_origin || 'Unknown';

  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.container}>
      {}
      <Pressable onPress={() => navigation.navigate('ImageViewer', { uri: imgUri })}>
        <Image source={{ uri: imgUri }} style={styles.image} resizeMode="contain" />
      </Pressable>
      <View style={styles.info}>
        <Text style={styles.title}>{artwork.title}</Text>
        <Text style={styles.artist}>{artwork.artist_title || 'Unknown Artist'}</Text>
        <Text style={styles.meta}>{artwork.date_start}</Text>
        <Text style={styles.meta}>{origin}</Text>
        <Text style={styles.meta}>{artwork.medium_display}</Text>
        <Text style={styles.meta}>{artwork.dimensions}</Text>
        {artwork.credit_line && (
          <Text style={styles.credit}>{artwork.credit_line}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    padding: 20,
    alignItems: 'center'
  },
  image: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_WIDTH - 40,
    marginBottom: 20
  },
  info: {
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  artist: {
    fontSize: 16,
    marginBottom: 8
  },
  meta: {
    fontSize: 14,
    marginBottom: 4
  },
  credit: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#b70335',
    marginTop: 8
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20
  }
});

