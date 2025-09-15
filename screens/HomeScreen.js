
import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Animated,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  Easing,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import SearchBar from '../components/SearchBar';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [country, setCountry] = useState('');
  const [material, setMaterial] = useState('');

  const slideAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: showFilters ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [showFilters]);

  const filterHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 302],
  });

  const onSearch = () => {
    navigation.navigate('Results', { query, yearFrom, yearTo, country, material });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
           <ImageBackground
   source={require('../assets/main_picture.png')}
   style={styles.background}
   imageStyle={{
    resizeMode: 'cover',            
    transform: [{ scale: 1 }],    
   }}
 >
            <LinearGradient
              colors={['rgba(0,0,0,0.8)', 'transparent']}
              style={styles.gradient}
            />
            <BlurView intensity={100} tint="dark" style={styles.blur} />

            <View style={styles.container}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.topLogo}
                resizeMode="contain"
              />

              <View style={styles.center}>
                <Text style={styles.title}>
                  WELCOME TO THE{"\n"}ART INSTITUTE OF CHICAGO
                </Text>

                <View style={styles.searchRow}>
                  <View style={styles.searchContainer}>
                    <SearchBar query={query} setQuery={setQuery} />
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowFilters(!showFilters)}
                    style={styles.filterIconWrapper}
                  >
                    <Image
                      source={require('../assets/filter-icon.png')}
                      style={styles.filterIcon}
                    />
                  </TouchableOpacity>
                </View>

                <Animated.View style={[styles.filters, { height: filterHeight }]}>              
                  {showFilters && (
                    <View style={styles.filterContent}>
                      <Text style={styles.filterLabel}>Year from</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="1880"
                        keyboardType="numeric"
                        value={yearFrom}
                        onChangeText={setYearFrom}
                      />

                      <Text style={styles.filterLabel}>Year to</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="1890"
                        keyboardType="numeric"
                        value={yearTo}
                        onChangeText={setYearTo}
                      />

                      <Text style={styles.filterLabel}>Country</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="France"
                        value={country}
                        onChangeText={setCountry}
                      />

                      <Text style={styles.filterLabel}>Material</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Oil on canvas"
                        value={material}
                        onChangeText={setMaterial}
                      />
                    </View>
                  )}
                </Animated.View>

                <TouchableOpacity style={[styles.button, { marginTop: showFilters ? 10 : 20 }]} onPress={onSearch}>
                  <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  blur: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
  },
  safe: { flex: 1, backgroundColor: '#000' },
  background: { flex: 1 },
  gradient: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: '30%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  topLogo: {
    width: 200,
    height: 60,
    marginBottom: 10,
  },
  center: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  searchRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 2,
  },
  searchContainer: {
    flex: 1,
  },
  filterIconWrapper: {
    marginLeft: 10,
    backgroundColor: '#b70335',
    borderRadius: 16,
    padding: 4,
  },
  filterIcon: {
    width: 32,
    height: 32,
  },
  filters: {
    overflow: 'hidden',
    width: '100%',
    borderRadius: 8,
  },
  filterContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  filterLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    color: '#b70335',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
