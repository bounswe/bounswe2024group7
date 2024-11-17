import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import apiInstance from './Api'; 

function SearchBar({ screen, setSearchResults, setLoading, loading }) {
    const dispatch = useDispatch();
    
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async (val) => {
        try {
            const response = await apiInstance().post("search", {
                query: val
            })
    
            if (response.status === 200) {
    
                const data = await response.data
    
                console.log(data)
                setResults(data)
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

    const flexStyleObject = screen === 'mobile' ? { flexDirection: 'row' } : { flexDirection: 'column' };

    return (
        <View style={[styles.searchContainer, flexStyleObject]}>
            <View style={styles.inputGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Discover the world of fitness..."
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                />
                <TouchableOpacity
                    style={[styles.searchButton, { opacity: loading || !searchQuery ? 0.5 : 1 }]}
                    onPress={handleSearch}
                    disabled={loading || !searchQuery}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="purple" />
                    ) : (
                        <Text style={styles.searchButtonText}>Search</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%', 
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingLeft: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    searchButton: {
        backgroundColor: 'purple',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default SearchBar;
