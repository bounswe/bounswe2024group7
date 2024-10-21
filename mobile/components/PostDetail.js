import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PostDetail = ({ route }) => {
  const { title, description, owner, labels, likeCount } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.owner}>Posted by: {owner}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.labels}>Tags: {labels.join(', ')}</Text>
      <Text style={styles.likeCount}>Likes: {likeCount}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  owner: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  labels: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  likeCount: {
    fontSize: 14,
    color: '#888',
  },
});

export default PostDetail;
