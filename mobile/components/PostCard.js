import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PostCard = ({ owner, title, description, labels, likeCount, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PostDetail', { title, description, owner, labels, likeCount })}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.owner}>Posted by: {owner}</Text>
      <Text style={styles.likeCount}>Likes: {likeCount}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3, // Adds shadow on Android
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  owner: {
    fontSize: 12,
    color: '#555',
  },
  likeCount: {
    fontSize: 12,
    color: '#888',
  },
});

export default PostCard;
