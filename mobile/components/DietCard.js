import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DietCard = ({ owner, title, description, followCount, category, nutrition_list, weeklySchedule, navigation }) => {
  return (
    <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('DietDetail', { title, description, owner, followCount, category, nutrition_list, weeklySchedule })}
        >
      <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { username: owner })}>
        <Text style={styles.owner}>{owner}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.location}>Category: {category}</Text>
      <Text style={styles.nutrition_type}>Targeted Nutritions: {nutrition_list.join(', ')}</Text>
      <Text style={styles.follow}>Followers: {followCount}</Text>
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
  location: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  nutrition_type: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  follow: {
    fontSize: 12,
    color: '#888',
  },
});

export default DietCard;
