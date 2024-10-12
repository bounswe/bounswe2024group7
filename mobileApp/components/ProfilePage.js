import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PostCard from './PostCard';
import { useNavigation } from '@react-navigation/native';
import apiInstance from './Api';
import { useAuth } from './AuthContext';

const ProfilePage = () => {
  const navigation = useNavigation();
  const { user, password } = useAuth();
  const posts = [{title:'Initial post', description: 'What is the maximum weight you lifted in powerlifting?', owner: 'mertcengiz', labels: 'exercise type: powerlifting, entry type: question', comments: 'I started with 30 and now Im lifting 80 kgs consistently, My max is 110', likeCount: 12, uriList: ''}]
  
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://commons.wikimedia.org/wiki/File:Puffed_up_(7453723786).jpg' }}
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>{user}</Text>
      <Text style={styles.profileUsername}>@{user}</Text>
      <View style={styles.badgesContainer}>
        <Text style={styles.badge}>Posts: 0</Text>
        <Text style={styles.badge}>Followers: 0</Text>
      </View>
      <Text style={styles.mypost}>User posts:</Text>
      <View style={styles.postCardsContainer}>
      {posts.map((post, index) => (
        <View style={styles.row}>
    
          <PostCard
            title={post.title}
            owner={post.owner}
            description={post.description}
            CommentContainer = {<CommentContainer commentList={post.comments} />}
            labels={post.labels}
            likeCount={post.likeCount}
            uriList = {post.uriList}
            navigation={navigation} 
          />
        </View>
      ))}
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
  },
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  mypost: {
    fontSize: 16,
    color: 'gray',
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 16,
  },
  badge: {
    // backgroundColor: 'purple',
    color: 'gray',
    padding: 8,
    margin: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
  },
  iconButton: {
    backgroundColor: 'purple',
    borderRadius: 8,
    padding: 12,
    margin: 8,
  },
  postCardsContainer: {
    marginTop: 20,
  },
  row: {
    marginBottom: 10,
  },
});

export default ProfilePage;