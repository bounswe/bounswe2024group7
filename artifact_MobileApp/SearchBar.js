import React, { useState } from 'react';
import apiInstance from './Api'; 
import Toast from 'react-native-toast-message';
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = async (val) => {
    try {
        const response = await apiInstance().post("search", {
            query: val
        })

        if (response.status === 200) {

            const data = await response.data

            console.log(data)

            setSearchText("")
        }
    } catch (e) {
        console.log(e)
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Search Error',
          text2: 'There was an error while searching. Please try again.',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40
        });
    }
    
  };


  return (
     <View style={styles.searchBarContainer}>
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
  searchBarContainer: {
    flexDirection: 'row',
    flex: 1,
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