import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Comment from './Comment';
import Label from './Label';
const PostViewPage = ({post_obj}) => {
  const postData = {
    id: 1,
    title: 'Beautiful Painting',
    imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWRpa_xrwaPLKt_LADjacrbdsaEBIhgpi88Llcm3nyw&s',
    description: 'Lorem ipsum dolor sit aa turpis.',
    likes: 20,
    comments: [
      { id: 1, text: 'Nice painting!', user: 'User1', likes: 19 },
      { id: 2, text: 'I love it!', user: 'User2', likes: 88 },
      // Add more comments as needed
    ],
    materials: ['Oil', 'Canvas'],
    genre: ['Landscape'],
  };

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Post Image */}
      <Image source={{ uri: postData.imageUri }} style={styles.image} />
      
      {/* Post Title */}
      {/* <Text style={styles.title}>{post_obj && post_obj.title}</Text> */}
      <Text style={styles.title}>{postData.title}</Text>
      {/* Labels */}
      <View style={styles.labelsContainer}>
      {postData.materials.map((material, index) => (
        <Label className="material:" value={material}/>
      ))}
      </View>

      {/* Post Description */}
      <Text style={styles.description}>{postData.description}</Text>
      
      {/* Like Button, Bookmark Button, and Comments */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLike}>
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={24} color={liked ? '#6247aa' : 'black'} />
          <Text style={styles.buttonText}>{postData.likes} Likes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleBookmark}>
          <Ionicons name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={24} color={bookmarked ? '#6247aa' : 'black'} />
          <Text style={styles.buttonText}>Bookmark</Text>
        </TouchableOpacity>
        
        {/* <Text style={styles.commentsTitle}>Comments:</Text> */}
      </View>
      
      {/* Comments */}
      <View style={styles.commentsContainer}>
        {postData.comments.map(comment => (
          <View key={comment.id} style={styles.commentContainer}>
            <Comment userName={comment.user} text={comment.text} likes={comment.likes} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    image: {
      width: '100%',
      height: 300,
      borderRadius: 10,
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      marginBottom: 10,
    },
    labelsContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    label: {
      marginRight: 10,
      fontSize: 16,
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    commentsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 10,
    },
    buttonGroup: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
    },
    buttonText: {
      marginLeft: 5,
      fontSize: 16,
    },
    commentsContainer: {
      marginBottom: 10,
    },
    commentContainer: {
      flexDirection: 'row',
      marginBottom: 5,
      width: '100%', // Make the comment box occupy full width
    },
    commentUser: {
      fontWeight: 'bold',
    },
    commentText: {
      marginLeft: 5,
    },
  });
  


export default PostViewPage;