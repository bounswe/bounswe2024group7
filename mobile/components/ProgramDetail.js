import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ProgramDetail = ({ route }) => {
  const { title, description, owner, followCount, location, muscle_list } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.owner}>Trainer: {owner}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.location}>Location: {location}</Text>
      <Text style={styles.muscleList}>Targeted Muscles: {muscle_list.join(', ')}</Text>
      <Text style={styles.followCount}>Followers: {followCount}</Text>
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
  location: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  muscleList: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  followCount: {
    fontSize: 14,
    color: '#888',
  },
});

export default ProgramDetail;
