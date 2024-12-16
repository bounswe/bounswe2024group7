import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import search icon from react-native-vector-icons
import apiInstance from '../Api';
import { useSelector } from "react-redux";
import { userSessionToken } from "../user";

function SearchBar({ searchResults, screen, setResults, setLoading, loading }) {
  const [searchQuery, setSearchQuery] = useState('');
const titleString = (str) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
}
  const sessionToken = useSelector(userSessionToken);

  const handleSearch = async () => {
           setLoading(true);
           console.log(searchQuery);
           try {
               if (!searchQuery) {
                   setLoading(false);
                   return;
               }

               const response = await apiInstance(sessionToken).get(`/api/search`, {
                   params: {
                       q: titleString(searchQuery)
                   }
               });

               if (response.status === 200) {
                   const data = response.data;
                   setResults(data);
                   setSearchQuery("");
                   Toast.show({
                                   type: 'success',
                                   position: 'bottom',
                                   text1: 'Search successfully done',
                                   visibilityTime: 2000,
                                   autoHide: true,
                                   topOffset: 30,
                                   bottomOffset: 40
                               });
               }

               setLoading(false);
           } catch (e) {
               console.log(e);
               Toast.show({
                               type: 'error',
                               position: 'bottom',
                               text1: 'Search Error',
                               text2: 'There is an error searching. Please try again.',
                               visibilityTime: 2000,
                               autoHide: true,
                               topOffset: 30,
                               bottomOffset: 40
                           });
               setLoading(false);
           }
       };
    useEffect(() => {
      if (!searchResults) {
        console.log('Search results are null');
        return;
      }
      console.log('Search results have changed:', searchResults);
    }, [searchResults]);



  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search here..."
        placeholderTextColor="#A9A9A9"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSearch(searchQuery)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Icon name="search" size={20} color="#FFFFFF" /> // Search icon
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
    padding: 6,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginLeft: 8,
    backgroundColor: '#6B46C1', // Purple button to match your website
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;
