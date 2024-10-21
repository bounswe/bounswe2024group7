import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PostCard = ({ title, owner, description, labels, likeCount, navigation }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { username: owner })}>
        <Text style={styles.owner}>{owner}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.labels}>{labels.join(', ')}</Text>
      <Text style={styles.likeCount}>Likes: {likeCount}</Text>
    </View>
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
  owner: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#007bff', // Link color
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
  labels: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  likeCount: {
    fontSize: 12,
    color: '#888',
  },
});

export default PostCard;
