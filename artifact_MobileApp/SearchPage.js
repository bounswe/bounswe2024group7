import React, { useState, useEffect } from 'react';
import apiInstance from './Api'; 
import Toast from 'react-native-toast-message';
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostCard from './PostCard';
import SearchBar from './SearchBar';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    try {
      if (!searchResults) {
        console.log("Search results are null");
        return;
      }

      console.log("Search results have changed:", searchResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, [searchResults]); 

  // Function to group search results into rows of three columns
  const groupIntoRows = (data,rowLength) => {
    const rows = [];
    for (let i = 0; i < data.length; i += rowLength) {
      const row = data.slice(i, i + rowLength);
      rows.push(row);
    }
    return rows;
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
    <ScrollView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar setResults={setSearchResults} />
      </View>
        {/* Render PostCards in grid layout */}
        <View style={styles.postCardsContainer}>
          {searchResults && searchResults.painting_results && searchResults.painting_results.length > 0 ? (
            groupIntoRows(searchResults.painting_results,3).map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((result, columnIndex) => (
                  <View key={`${rowIndex}-${columnIndex}`} style={styles.col}>
                    <PostCard
                      title={result["itemLabel"]["value"]}
                      imageURL={result["image"]["value"]}
                      genre={result["genreLabel"]["value"]}
                      material={result["materialLabel"]["value"]}
                      creator={result["creatorLabel"]["value"]}
                    />
                  </View>
                ))}
              </View>
            ))
          ) : (
            <View />
          )}
          
        </View>
      </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  col: {
    flex: 1,
    margin: 5,
  },
  safeAreaContainer:{
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  postCardsContainer: {
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default SearchPage;
