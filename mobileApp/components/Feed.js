import React, { useState } from 'react';
import { FlatList ,View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from './AuthContext';
import PostCard from './PostCard';
import apiInstance from './Api';
import { useEffect } from 'react';

const Feed = () => {
    
    const { user, password } = useAuth();

    const mock_posts = [
        {
            "urilist": "https://upload.wikimedia.org/wikipedia/commons/2/29/US_Navy_070504-N-0995C-072_Chief_Mineman_Kevin_Sperling_appears_as_the_guest_body_builder_at_an_Armed_Forces_body_building_competition_held_at_Sharkey%27s_Theatre_at_Naval_Station_Pearl_Harbor.jpg",
            "title": "Look At What I Have Become",
            "description": "I just encountered a program, and within a few weeks, I feel much strong. This forum is awesome",
            "likeCount": "10769",
            "owner": "John",
            "labels": ["Powerlifting", "Cardio", "Upper Body Muscles"],
            "CommentContainer": ""
        },
        {
            "urilist": "https://images.pexels.com/photos/1978505/pexels-photo-1978505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "title": "UNBELIEVABLE PROGRESS With Me",
            "description": "Look at Matt! It is so suprizing how he built his muscles that fast. FASCINATING",
            "likeCount": "8792",
            "owner": "Sarah",
            "labels": ["Body Building", "Powerlifting"],
            "CommentContainer": ""
        },
        {
           "urilist": "https://images.pexels.com/photos/6388391/pexels-photo-6388391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "title": "Strength Training Advice",
            "description": "My leg strength is lagging behind my upper body, so I want to strength it. Where can I start, guys???",
            "likeCount": "256",
            "owner": "Oliver",
            "labels": ["Strength Training", "Leg Muscles"],
            "CommentContainer": ""
        },
        {
            "urilist": "https://images.pexels.com/photos/68468/pexels-photo-68468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "title": "My Monday Morning Yoga Exercise",
            "description": "I have just finished my yoga exercise and feel sooooo good! Next? Of course coffee :))",
            "likeCount": "5",
            "owner": "Emma",
            "labels": ["Yoga", "Relaxing Exercises"],
            "CommentContainer": ""
        }
    ];
    return (
        <FlatList
        data={mock_posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
        <View style={styles.postcontainer}>
          <PostCard
            post={{
              urilist: item.urilist,
              title: item.title,
              description: item.description,
              likeCount: item.likeCount,
              owner: item.updated_at,
              labels: item.labels,
              CommentContainer: item.CommentContainer,
            }}
          />
        </View>
        )}
        contentContainerStyle={styles.container}
        numColumns={4} // Adjust the number of columns as needed
        />
    );

    
}

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