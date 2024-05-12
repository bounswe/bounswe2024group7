import React, { useState } from 'react';
import apiInstance from './Api'; 
import Toast from 'react-native-toast-message';
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostCard from './PostCard';
import SearchBar from './SearchBar';
const SearchPage = () => {
    const mimickedData = [
        {
          postId: 1,
          created_at: "12/5/1999",
          updated_at: "8/11/1999",
          likes: 88,
          bookmarked: true,
          profile: {
            username: "Leonardo_da_Vinci",
            profile_picture: "https://example.com/leonardo_profile.jpg"
          },
          title: "Mona Lisa",
          content: "This is a portrait painting by Leonardo da Vinci.",
          image: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWRpa_xrwaPLKt_LADjacrbdsaEBIhgpi88Llcm3nyw&s'
          },
          comments: [
            {
              commentId: 1,
              profile: {
                username: "Art_Lover_123",
                profile_picture: "https://example.com/profile1.jpg"
              },
              content: "One of the most iconic artworks of all time!"
            },
            {
              commentId: 2,
              profile: {
                username: "Art_Critic_456",
                profile_picture: "https://example.com/profile2.jpg"
              },
              content: "The enigmatic smile of Mona Lisa is mesmerizing."
            }
          ],
          labels: [
            {
              material: ["Canvas","Oil"],
              type: ["Frame","Wood"],
              genre: ["Portrait"],
              is_own_artwork: false
            }
          ]
        },
        {
          postId: 2,
          created_at: "3/15/2005",
          updated_at: "7/20/2005",
          likes: 42,
        bookmarked:true,
          profile: {
            username: "Vincent_van_Gogh",
            profile_picture: "https://example.com/van_gogh_profile.jpg"
          },
          title: "Starry Night",
          content: "This is a landscape painting by Vincent van Gogh.",
          image: {
            url: "https://media.timeout.com/images/103166735/750/562/image.jpg"
          },
          comments: [
            {
              commentId: 3,
              profile: {
                username: "Art_Enthusiast_789",
                profile_picture: "https://example.com/profile3.jpg"
              },
              content: "The swirling sky in Starry Night is breathtaking!"
            }
          ],
          labels: [
            {
              material: ["Oil"],
              type: ["Canvas"],
              genre: ["Post-Impressionism"],
              is_own_artwork: true
            }
          ]
        }
      ];
      

      
return (
    <View style={styles.container}>
     <View style={styles.searchBarContainer}>
         <SearchBar/>
      </View>
      {/* Ensure ScrollView has a height to allow scrolling */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.postCardContainer}>
        {mimickedData.map((post, index) => (

        <PostCard post_obj={post}/>

            ))}
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