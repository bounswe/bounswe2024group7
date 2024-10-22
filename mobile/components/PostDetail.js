import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PostDetail = ({ route }) => {
  const { title, description, owner, labels, likeCount } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {/* Owner and Like Count in a horizontal layout */}
      <View style={styles.headerContainer}>
        <Text style={styles.owner}>Posted by: {owner}</Text>
        <Text style={styles.likeCount}>Likes: {likeCount}</Text>
      </View>

      <Text style={styles.description}>{description}</Text>
      <Text style={styles.labels}>Tags: {labels.join(', ')}</Text>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  owner: {
    fontSize: 16,
    color: '#555',
  },
  likeCount: {
    fontSize: 16,
    color: '#888',
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
});

export default PostDetail;
