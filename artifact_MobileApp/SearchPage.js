import React, { useState } from 'react';
import apiInstance from './Api'; 
import Toast from 'react-native-toast-message';
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostCard from './PostCard';
import SearchBar from './SearchBar';
const SearchPage = () => {
return (
    <View style={styles.container}>
     <View style={styles.searchBarContainer}>
         <SearchBar/>
      </View>
      {/* Ensure ScrollView has a height to allow scrolling */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.postCardContainer}>
          {/* Render more PostCards */}
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 20,
      },
  searchBarContainer: {
    flexDirection: 'row',
    marginBottom:10,
  },
  postCardContainer: {
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