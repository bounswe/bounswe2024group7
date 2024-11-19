import React from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, SafeAreaProvider } from 'react-native';
import { LazyImage } from 'react-native-lazy-image-loader';
import Label from './Label';
import { ScrollView } from 'react-native-gesture-handler';

// TODO: Change the Search Results with the results coming from the backend.

const SearchResult = ({ title, image, creator, type }) => {


  // TODO: Does <SearchBar setResults={setSearchResults} /> necessary?
  return (
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.title}>{title}</Text>
                    </View>

                    <View style={styles.cardBody}>
                        <LazyImage
                        source={image}
                        style={styles.image}
                        />
                        <View style={styles.infoContainer}>
                        <Label title="Owner" value={creator} />
                        <Label title="Type" value={type} />
                    </View>
                </View>

                <View style={styles.cardFooter}>
                    <Button
                    title="More Details"
                    color="#6B46C1" // Purple colour that our Website has
                    onPress={() => {
                        // TODO: Add the navigation to the detailed page
                    }}
                    />
                </View>
                </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6B46C1', // Purple colour that our Website has
    marginBottom: 16,
    overflow: 'hidden',
    minWidth: '100%',
  },
  cardHeader: {
    padding: 16,
    backgroundColor: '#F7F7F7', // Light background for header
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardBody: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    maxHeight: 350,
    width: 120,
    borderRadius: 10,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  cardFooter: {
    padding: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default SearchResult;
