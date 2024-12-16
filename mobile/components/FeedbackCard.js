import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FeedbackCard = ({ trainingProgram, bodyPart, weekNumber, workoutNumber, exerciseNumber, feedbackText, navigation }) => {
  return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('FeedbackDetail', { trainingProgram, bodyPart, weekNumber, workoutNumber, exerciseNumber, feedbackText, navigation })}
        >
      
      {/* Feedback Program, Body Part, and Week Number */}
      <View style={styles.content}>
        <Text style={styles.description}>{trainingProgram}</Text>
        <Text style={styles.description}>{bodyPart}</Text>
        <Text style={styles.description}>{weekNumber}</Text>

        {/* Feedback Engagement (Workout, Exercise) */}
        <View style={styles.engagement}>
          <Text style={styles.engagementText}>Workout {workoutNumber}</Text>
          <Text style={styles.engagementText}>Exercise {exerciseNumber}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ownerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  ownerName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  engagement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  engagementText: {
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 4,
  },
});

export default FeedbackCard;
