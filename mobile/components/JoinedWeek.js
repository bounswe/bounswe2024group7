import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

const JoinedWeek = ({ route }) => {
  const {programId,programTitle,weekId,weekNumber,workouts,navigation} = route.params;
  console.log("Response for JoinedWeek:");
  console.log(workouts);
  const {expandedState,setExpandedState} = useState(0);
  const calculateProgress = ({workoutExercises}) => {
    var completedReps = 0;
    var totalReps=0;
    workoutExercises.forEach((exercise)=>{completedReps+= (exercise.completedSets?exercise.completedSets.reduce((accumulator, currentValue) => accumulator + currentValue, 0):0) })
    workoutExercises.forEach((exercise)=>{totalReps+= exercise.sets*exercise.repetitions })
    return Math.round(100*completedReps/totalReps,2);
  }
  const renderWorkout = ({ item, index, navigation }) => {
    return (
      <View style={styles.exerciseContainer}>
       <View style={styles.exerciseNameContainer}>
        <Text style={styles.exerciseTitle}>{item.name}</Text>
        <Text style={styles.exerciseName}>{item.workoutExercises.length}</Text>

        </View>

        <TouchableOpacity style={styles.startButton} onPress = {()=>{navigation.navigate("JoinedWorkout",{programId,weekId,weekNumber,workoutId:item.id,name:item.name,workoutNumber:item.workoutNumber,workoutExercises:item.workoutExercises, navigation})}}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
        <Text style={styles.completionText}>%{calculateProgress({workoutExercises:item.workoutExercises})}</Text>

      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{programTitle} | Week{weekNumber}</Text>

      <FlatList
        data={workouts}
        renderItem={(props) => renderWorkout({ ...props, navigation })}
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
      flex: 0.9,
      padding: 10
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
    justifyContent: 'space-between',
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  setCount: {
    fontSize: 14,
    color: 'gray',
  },
  repCount: {
      fontSize: 14,
      color: 'gray',
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
    flex:0.8
  },
  startButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  completionText: {
    fontSize: 14,
    color: 'green',
    flex:0.6,
    padding: 10,

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

export default JoinedWeek;
