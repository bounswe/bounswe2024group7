// SearchBar.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (val) => {
    console.log({val}); 
    //link to wikiData API here ...
    setSearchText('');
    
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Discover the world of art..."
        onChangeText={(val) => setSearchText(val)}
        value={searchText}
      />
      <TouchableOpacity style={styles.button} onPress={()=>handleSearch(searchText)}>
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  button: {
    backgroundColor: '#3C3633',
    height: 40,
    paddingHorizontal: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;
