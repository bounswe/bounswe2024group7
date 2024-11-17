import React from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, SafeAreaProvider } from 'react-native';
import { LazyImage } from 'react-native-lazy-image-loader';
import Label from './Label';
import SearchBar from './SearchBar';
import { ScrollView } from 'react-native-gesture-handler';

// TODO: Change the Search Results with the results coming from the backend.

const SearchResult = ({ title, image, creator, genre, material }) => {

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

  // TODO: Does <SearchBar setResults={setSearchResults} /> necessary?
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.searchBarContainer}>
                    <SearchBar setResults={setSearchResults} /> 
                </View>

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
                        <Label title="Creator" value={creator} />
                        <Label title="Genre" value={genre} />
                        <Label title="Material" value={material} />
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
            </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
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
