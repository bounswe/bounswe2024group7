import React, { useState } from 'react';
import { FlatList ,View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import FeedPost from './FeedPost';
import { useAuth } from './AuthContext';
import apiInstance from './Api';
import { useEffect } from 'react';

const Feed = () => {
    const [paintings, setPaintings] = useState([]);

    const { user, password } = useAuth();

    /* const paintings = [
         {
             "imageURL": "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQsu7yYuRPXNK9eHHSFD2tUYO4stQDb1Ez8vjqGERfs9xqYLLnY_y6lQkPFZa-44cqn",
             "title": "Mona Lisa",
            "material": "Oil on poplar",
            "genre": "Portrait",
            "creator": "Leonardo da Vinci"
        }
        
        
    ];*/

    useEffect(() => {
        const fetchPaintings = async () => {
          const response = await apiInstance().get(`/posts`, {
            headers: {
              Authorization: `Basic ${btoa(`${user}:${password}`)}`
            },
          });
    
          console.log('Posts:', response.data);
    
         setPaintings(response.data);
    
        };
    
        fetchPaintings();
      }, []);

    return (
        <FlatList
      data={paintings}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.postcontainer}>
          <FeedPost
            post={{
              imageURL: item.image.url,
              title: item.title,
              material: item.material,
              genre: item.genre,
              creator: item.updated_at,
            }}
          />
        </View>
      )}
      contentContainerStyle={styles.container}
      numColumns={4} // Adjust the number of columns as needed
    />
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: 'white',
      },
      postcontainer: {
        flex: 1,
        alignItems: 'center',
        margin: 5, // Add margin between grid items
      }
});

export default Feed;