import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image
} from 'react-native';

const WorkoutDetails = ({ route }) => {
  const { weeks } = route.params;

  const renderExercise = ({ item }) => {
    const { exercise, repetitions, sets } = item;
    return (
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Image source={{ uri: exercise.gifUrl }} style={styles.exerciseImage} />
        <Text style={styles.exerciseInfo}>Body Part: {exercise.bodyPart}</Text>
        <Text style={styles.exerciseInfo}>Target Muscle: {exercise.targetMuscle}</Text>
        <Text style={styles.exerciseInfo}>Equipment: {exercise.equipment}</Text>
        <Text style={styles.exerciseInfo}>Repetitions: {repetitions}</Text>
        <Text style={styles.exerciseInfo}>Sets: {sets}</Text>
        <Text style={styles.instructionsHeader}>Instructions:</Text>
        {exercise.instructions.map((instruction, index) => (
          <Text key={index} style={styles.instruction}>
            - {instruction}
          </Text>
        ))}
      </View>
    );
  };

  const renderWorkout = ({ item }) => {
    return (
      <View style={styles.workoutContainer}>
        <Text style={styles.workoutTitle}>{item.name}</Text>
        <FlatList
          data={item.workoutExercises}
          renderItem={renderExercise}
          keyExtractor={(exercise) => exercise.id.toString()}
        />
      </View>
    );
  };

  const renderWeek = ({ item }) => {
    return (
      <View style={styles.weekContainer}>
        <Text style={styles.weekTitle}>Week {item.weekNumber}</Text>
        <FlatList
          data={item.workouts}
          renderItem={renderWorkout}
          keyExtractor={(workout) => workout.id.toString()}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={weeks}
        renderItem={renderWeek}
        keyExtractor={(week) => week.id.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  weekContainer: {
    marginBottom: 16,
  },
  weekTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  workoutContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  exerciseContainer: {
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  exerciseImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  exerciseInfo: {
    fontSize: 14,
    marginBottom: 4,
  },
  instructionsHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  instruction: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default WorkoutDetails;
