import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { LazyImage } from 'react-native-lazy-image-loader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SearchBar from './SearchBar';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SearchResults = ({ navigation }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchResults) {
      console.log('Search results are null');
      return;
    }
    console.log('Search results have changed:', searchResults);
  }, [searchResults]);

  const renderItem = ({ item }) => (
    <View style={styles.gridItem}>
      <LazyImage
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBar setResults={setSearchResults} setLoading={setLoading} loading={loading} />
        </View>
        {searchResults ? (
          <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={styles.grid}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              Use the search bar to find results.
            </Text>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBarContainer: {
    marginBottom: 10,
  },
  grid: {
    justifyContent: 'space-between',
  },
  gridItem: {
    width: SCREEN_WIDTH / 3 - 16, // Dynamic width for 3 items per row with spacing
    margin: 8,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 100,
  },
  itemText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
});

export default SearchResults;
