import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Comment = ({ userName, text, likes }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.commentDetails}>
        {/* User Name */}
        <Text style={styles.userName}>{userName}</Text>

        {/* Comment Text */}
        <Text style={styles.commentText}>{text}</Text>
      </View>

      {/* Like Button */}
      <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
        <Ionicons name={liked ? 'heart' : 'heart-outline'} size={20} color={liked ? '#6247aa' : 'black'} />
        <Text style={styles.likeButtonText}>{likes}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the start (top left)
    marginBottom: 10,
    borderWidth: 1, // Add border
    borderColor: '#ccc', // Border color
    borderRadius: 5, // Border radius
    padding: 10, // Padding inside the comment
    width: '100%', // Make the comment box occupy full width
    backgroundColor: '#fff',
  },
  commentDetails: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 16,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute', // Position the like button absolutely
    justifyContent: 'flex-end', // Align the content to the end (right)
    top: '50%', // Align to the middle vertically
    right: 10, // Margin from the right border
    transform: [{ translateY: -10 }], // Adjust vertically to center
  },
  likeButtonText: {
    marginLeft: 5, // Margin from the like button
  }  
});

export default Comment;
