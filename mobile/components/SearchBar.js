import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import search icon from react-native-vector-icons
import apiInstance from '../Api';

function SearchBar({ screen, setResults, setLoading, loading }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (val) => {
    if (!val.trim()) {
      Toast.show({
        type: 'info',
        position: 'bottom',
        text1: 'Empty Search Query',
        text2: 'Please enter a search term.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return;
    }

    /*try {
      setLoading(true);
      const response = await apiInstance().post('search', {
        query: val,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        setResults(data);
        setSearchQuery('');
      }
    } catch (e) {
      console.error(e);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Search Error',
        text2: 'There was an error while searching. Please try again.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } finally {
      setLoading(false);

  };*/
  };

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
