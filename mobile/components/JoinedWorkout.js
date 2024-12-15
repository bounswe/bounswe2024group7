import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

const JoinedWorkout = ({ route }) => {
  const {programId,weekId,weekNumber,workoutId,name,workoutNumber,workoutExercises, navigation} = route.params;
  console.log("Response for JoinedWorkout:");
  console.log(workoutExercises);
  const {expandedState,setExpandedState} = useState(0);
  const renderExercise = ({ item, index, navigation }) => {
    
    return (
      <View style={styles.exerciseContainer}>
       <View style={styles.exerciseNameContainer}>
        <Text style={styles.exerciseTitle}>Session {index + 1}</Text>
        <Text style={styles.exerciseName}>{item.exercise.name}</Text>

        </View>
        <Text style={styles.setCount}>{item.sets} Sets</Text>

        <Text style={styles.repCount}>{item.repetitions} Reps</Text>

        <TouchableOpacity style={styles.startButton} onPress={()=>navigation.navigate('JoinedExercise',{programId,weekId,weekNumber,workoutId,workoutNumber,exerciseNumber:item.exerciseNumber,exerciseId:item.id,exercise:item.exercise,sets:item.sets,repetitions:item.repetitions})}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
        <Text style={styles.completionText}>%{ (100 *( item.completedSets?(item.completedSets.reduce((accumulator, currentValue) => accumulator + currentValue, 0))/((item.sets) * (item.repetitions)):0))}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{name}</Text>

      <FlatList
        data={workoutExercises}
        renderItem={(props) => renderExercise({ ...props, navigation })}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity style={styles.commitButton}>
        <Text style={styles.commitButtonText}>Commit to Program</Text>
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
  exerciseNameContainer: {
    flex: 1,
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
  exerciseContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly', // Ensure equal spacing between items
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  setCount: {
    fontSize: 14,
    color: 'gray',
    flex: 0.8, // Set equal flex for alignment
    textAlign: 'center',
  },
  repCount: {
    fontSize: 14,
    color: 'gray',
    flex: 0.8, // Set equal flex for alignment
    textAlign: 'center',
  },
  exerciseName: {
    fontSize: 13,
    color: 'gray',
  },
  startButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    flex: 0.9, // Equalize space allocation
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  completionText: {
    fontSize: 14,
    color: 'green',
    flex: 0.4, // Equal flex
    textAlign: 'center',
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

export default JoinedWorkout;
