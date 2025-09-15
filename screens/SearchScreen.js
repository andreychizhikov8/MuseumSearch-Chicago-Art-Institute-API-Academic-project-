

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function ResultsScreen({ route, navigation }) {
  const { query, yearFrom, yearTo, viewAll } = route.params || {};
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const fields = 'id,title,image_id,date_start,artist_title';
        let url;
        if (viewAll) {
  
          url = `https://api.artic.edu/api/v1/artworks?fields=${fields}&limit=20000`;
        } else {
          const params = new URLSearchParams({ q: query, fields });
          url = `https://api.artic.edu/api/v1/artworks/search?${params.toString()}`;
        }
        const resp = await fetch(url);
        const json = await resp.json();
        let items = json.data || [];

        
        if (!viewAll) {
          items = items.filter(item => {
            const year = item.date_start || 0;
            return (
              (!yearFrom || year >= yearFrom) &&
              (!yearTo   || year <= yearTo)
            );
          });
        }

        setData(items);
      } catch (e) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [query, yearFrom, yearTo, viewAll]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => {}}>
      {item.image_id && (
        <Image
          source={{ uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/200,/0/default.jpg` }}
          style={styles.thumb}
        />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.artist_title || 'Unknown Artist'}</Text>
        <Text style={styles.year}>{item.date_start}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;
  if (error)   return <Text style={styles.error}>{error}</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: '#000'
  },
  card: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#222',
    borderRadius: 6,
    overflow: 'hidden'
  },
  thumb: {
    width: 100,
    height: 100
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4
  },
  year: {
    color: '#999',
    fontSize: 12,
    marginTop: 2
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20
  }
});
