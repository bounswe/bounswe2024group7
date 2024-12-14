import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

const ProgramDetail = ({ route }) => {
  const {
    trainerUsername,
    title,
    description,
    programId,
    weeks,
    rating,
    level,
    date,
    participants,
    navigation
  } = route.params;
  const {expandedState,setExpandedState} = useState(0);
  const renderWeek = ({ item, index }) => {
    const workoutCount = item.workouts.length;
    return (
      <View style={styles.weekContainer}>
        <Text style={styles.weekTitle}>Week {index + 1}</Text>
        <Text style={styles.workoutCount}>{workoutCount} Workouts</Text>

      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.level}>Level: {level}</Text>
        <Text style={styles.type}>Type: BODY_BUILDING</Text>
        <Text style={styles.trainer}>Trainer: {trainerUsername}</Text>
        <Text style={styles.date}>Created @ {date}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.rating}>Rating: {rating}/5 (0 ratings)</Text>

      <FlatList
        data={weeks}
        renderItem={renderWeek}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity style={styles.commitButton}>
        <Text style={styles.commitButtonText}>Join Program</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.detailButton} onPress = {()=>navigation.navigate("WorkoutDetails",{weeks,navigation})}>
        <Text style={styles.detailButtonText}>Show Detailed Description</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  level: {
    fontSize: 14,
    color: 'orange',
  },
  type: {
    fontSize: 14,
    color: 'blue',
  },
  trainer: {
    fontSize: 14,
    color: 'red',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
  },
  rating: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  weekContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weekTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutCount: {
    fontSize: 14,
    color: 'gray',
  },
  startButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  completionText: {
    fontSize: 14,
    color: 'green',
  },
  commitButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  commitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailButton: {
    backgroundColor: 'gray',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  detailButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProgramDetail;
