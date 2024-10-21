import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const ProgramDetail = ({ route }) => {
  const { title, description, owner, followCount, location, muscle_list, weeklySchedule } = route.params;

  // Mock data for daily exercises
  /*const weeklySchedule = {
    Monday: ['Push-ups', 'Squats', 'Plank'],
    Tuesday: ['Pull-ups', 'Lunges', 'Deadlift'],
    Wednesday: ['Rest Day'],
    Thursday: ['Bench Press', 'Rows', 'Bicep Curls'],
    Friday: ['Overhead Press', 'Leg Press', 'Lat Pulldown'],
    Saturday: ['Cardio', 'Abs Workout'],
    Sunday: ['Rest Day']
  };*/

  // Render exercises for each day
  const renderExercises = (day) => (
    <View style={styles.dayContainer}>
      {weeklySchedule[day].map((exercise, index) => (
        <Text key={index} style={styles.exerciseText}>{exercise}</Text>
      ))}
    </View>
  );

  // Scene map for tabs
  const renderScene = SceneMap({
    Monday: () => renderExercises('Monday'),
    Tuesday: () => renderExercises('Tuesday'),
    Wednesday: () => renderExercises('Wednesday'),
    Thursday: () => renderExercises('Thursday'),
    Friday: () => renderExercises('Friday'),
    Saturday: () => renderExercises('Saturday'),
    Sunday: () => renderExercises('Sunday'),
  });

  // State for tab view index and routes
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Monday', title: 'Mo' },
    { key: 'Tuesday', title: 'Tue' },
    { key: 'Wednesday', title: 'We' },
    { key: 'Thursday', title: 'Th' },
    { key: 'Friday', title: 'Fri' },
    { key: 'Saturday', title: 'Sa' },
    { key: 'Sunday', title: 'Su' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.owner}>Trainer: {owner}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.location}>Location: {location}</Text>
      <Text style={styles.muscleList}>Targeted Muscles: {muscle_list.join(', ')}</Text>
      <Text style={styles.followCount}>Followers: {followCount}</Text>

      {/* Weekly Schedule Tabs */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={(props) => {
            const { key, ...rest } = props; // Destructure key and rest of props
            return <TabBar key={key} {...rest} style={styles.tabBar} indicatorStyle={styles.indicator} />;
          }}
      />
    </View>
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
  tabBar: {
    backgroundColor: '#007bff',
  },
  indicator: {
    backgroundColor: 'white',
  },
  dayContainer: {
    padding: 16,
  },
  exerciseText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
});

export default ProgramDetail;
