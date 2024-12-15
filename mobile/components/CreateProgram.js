import React, { useState, useEffect} from 'react';
import { ScrollView,StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, FlatList, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Using Picker for the dropdown
import apiInstance from "../Api";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from 'react-redux';
import { userSessionToken } from '../user.js';
import Toast from 'react-native-toast-message';
import SpinboxInput from "./common/SpinboxInput";

const CreateProgram = ({ darkMode }) => {
  const styles = darkMode ? darkStyles : lightStyles;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [weeks, setWeeks] = useState([]);
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(null);
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState('');
  const [type, setType] = useState('BODY_BUILDING');
  const [level, setLevel] = useState('BEGINNER');
  const [interval, setInterval] = useState(0);

  const [reps, setReps] = useState('');

  const SpinBoxComponent = () => {

    return (
      <View>
        <SpinboxInput onChange={setInterval} />
      </View>
    );
  };
  const [exerciseOptions, setExerciseOptions] = useState([])

        const {
            data: exercisesData,
            isFetching: exercisesIsFetching,
            isLoading: exercisesIsLoading,
        } = useQuery({
            queryKey: ['exercises'],
            queryFn: async () => {
                const response = await apiInstance(sessionToken).get('api/exercises')

                return response.data
            },
            refetchOnWindowFocus: false,
        })

        useEffect(() => {
            if (exercisesData && !exercisesIsFetching) {
                setExerciseOptions(exercisesData)
            }
        }, [exercisesData, exercisesIsFetching])

  const sessionToken = useSelector(userSessionToken)

  /*const exerciseOptions = [
    { id: 1, name: 'push-up' },
    { id: 2, name: 'pull-up' },
  ];*/
  const types = [
      { id: 0, label: 'Body Building', value:'BODY_BUILDING' }

    ];
    const levels = [
        { id: 0, label: 'Beginner', value:'BEGINNER' },
        { id: 1, label: 'Intermediate', value:'INTERMEDIATE' },
        { id: 2, label: 'Professional', value:'PROFESSIONAL' }
      ];

  // Add Week
  const addWeek = () => {
    setWeeks([...weeks, { workouts: [] }]);
  };

  // Remove Week
  const removeWeek = (index) => {
    setWeeks(weeks.filter((_, i) => i !== index));
  };

  // Add Workout
  const addWorkout = (weekIndex) => {
    setWeeks((prevWeeks) =>
        prevWeeks.map((week, i) =>
          i === weekIndex
            ? {
                ...week,
                workouts: [...week.workouts, { name: '', exercises: [] }],
              }
            : week
        )
      );
  };

  // Remove Workout
  const removeWorkout = (weekIndex, workoutIndex) => {
    const updatedWeeks = [...weeks];
    updatedWeeks[weekIndex].workouts = updatedWeeks[weekIndex].workouts.filter(
      (_, i) => i !== workoutIndex
    );
    setWeeks(updatedWeeks);
  };

  const clearFields = () => {
            setTitle('');
            setDescription('');
            setWeeks([]);
            setType('');
            setSelectedExercise('');
            setSets('');
            setReps('');
        };

    const handleProgramCreation = async () => {
      /*const newProgram = { title, description, labels, exercises };
      console.log('Creating program:', newProgram);*/
      console.log(title);
      console.log(description);
      console.log(type);
      console.log(level);
      console.log(interval);
      weeks.forEach((week)=>{
        console.log("Week "+weeks.indexOf(week));
        console.log("Workout count: "+week.workouts.length);
        week.workouts.forEach((workout)=>{
            console.log("Workout "+week.workouts.indexOf(workout));
            console.log("Workout name: "+workout.name);
            console.log("Exercise count: "+workout.exercises.length);
            workout.exercises.forEach((exercise)=>{
                console.log("Exercise "+exercise.exerciseId);
                console.log("Sets: "+exercise.sets);
                console.log("Reps: "+exercise.repetitions);

            });
        });
      });

      if (!title || !description || weeks.length === 0 || weeks.some((item)=>{return item.workouts.length==0||item.workouts.some((workout)=>{return workout.name.length == 0 || workout.exercises.length==0})})) {
                      Toast.show({
                                type: 'error',
                                position: 'bottom',
                                text1: 'Create Program Error',
                                text2: 'Fill all the fields to create a program.',
                                visibilityTime: 2000,
                                autoHide: true,
                                topOffset: 30,
                                bottomOffset: 40
                              });
                      return;
                  }

                  const response = await apiInstance(sessionToken).post('api/training-programs', {
                      title,
                      description,
                      type,
                      level,
                      interval,
                      weeks
                  });

                  if (response.status === 201) {
                      Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Program Created',
                    text2: 'Successfully created the program.',
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40
                                                  });
                  clearFields();
    }
                 else{
                     Toast.show({
                       type: 'error',
                       position: 'bottom',
                       text1: 'Create Program Error',
                       text2: 'There was an error while creating the program. Please try again.',
                       visibilityTime: 2000,
                       autoHide: true,
                       topOffset: 30,
                       bottomOffset: 40
                    });
                                         return;

                 }
    };
  const handleWorkoutNameChange = (weekIndex, workoutIndex, newName) => {
    setWeeks((prevWeeks) =>
      prevWeeks.map((week, i) =>
        i === weekIndex
          ? {
              ...week,
              workouts: week.workouts.map((workout, j) =>
                j === workoutIndex ? { ...workout, name: newName } : workout
              ),
            }
          : week
      )
    );
  };
  // Add Exercise
  const addExercise = () => {
    if (selectedExercise && sets && reps) {
      const updatedWeeks = [...weeks];
      const selectedExerciseId = exerciseOptions.find((element)=>element.name===selectedExercise).id;
      updatedWeeks[selectedWeekIndex].workouts[selectedWorkoutIndex].exercises.push({
        exerciseId: selectedExerciseId,
        sets,
        repetitions:reps,
      });
      setWeeks(updatedWeeks);
      setSelectedExercise('');
      setSets('');
      setReps('');
      setExerciseModalVisible(false);
    }
  };

  // Remove Exercise
  const removeExercise = (weekIndex, workoutIndex, exerciseIndex) => {
    const updatedWeeks = [...weeks];
    updatedWeeks[weekIndex].workouts[workoutIndex].exercises = updatedWeeks[
      weekIndex
    ].workouts[workoutIndex].exercises.filter((_, i) => i !== exerciseIndex);
    setWeeks(updatedWeeks);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create New Program</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Picker style={styles.picker}
                    selectedValue={type}
                    onValueChange={(value) => setType(value)}
                  >
                    {types.map((item) => (
                      <Picker.Item label={item.label} value={item.value} key={item.id} />
                    ))}
                  </Picker>

      <Picker style={styles.picker}
                          selectedValue={level}
                          onValueChange={(value) => setLevel(value)}
                        >
                          {levels.map((item) => (
                            <Picker.Item label={item.label} value={item.value} key={item.id} />
                          ))}
                        </Picker>
      <View style={styles.spinBoxContainer}>
      <Text style={styles.sectionTitle}> Select Interval </Text>
      <SpinBoxComponent/>

      </View>

      <FlatList
        data={weeks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item: week, index: weekIndex }) => (
          <View style={styles.weekContainer}>
            <Text style={styles.sectionTitle}>Week {weekIndex + 1}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addWorkout(weekIndex)}
            >
              <Text style={styles.addButtonText}>Add Workout</Text>
            </TouchableOpacity>

            <FlatList
              data={week.workouts}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item: workout, index: workoutIndex }) => (
                <View style={styles.workoutContainer}>
                  <Text style={styles.sectionTitle}>
                    Workout {workoutIndex + 1}
                  </Text>
                  <TextInput
                        style={styles.input}
                        placeholder="Workout Name"
                        placeholderTextColor={styles.placeholderColor}
                        value={workout.name}
                        onChangeText={(text) => handleWorkoutNameChange(weekIndex, workoutIndex, text)}
                      />

                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                      setSelectedWeekIndex(weekIndex);
                      setSelectedWorkoutIndex(workoutIndex);
                      setExerciseModalVisible(true);
                    }}
                  >
                    <Text style={styles.addButtonText}>Add Exercise</Text>
                  </TouchableOpacity>

                  <FlatList
                    data={workout.exercises}
                    keyExtractor={(_, i) => i.toString()}
                    renderItem={({ item: exercise, index: exerciseIndex }) => (
                      <View style={styles.exerciseItem}>
                        <Text>
                          {exerciseOptions.find((i)=>i.id===exercise.exerciseId).name} - {exercise.repetitions} reps x {exercise.sets}{' '}
                          sets
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            removeExercise(
                              weekIndex,
                              workoutIndex,
                              exerciseIndex
                            )
                          }
                        >
                          <Text style={styles.removeLabel}>✕</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                  <TouchableOpacity
                    onPress={() => removeWorkout(weekIndex, workoutIndex)}
                  >
                    <Text style={styles.removeLabel}>Remove Workout</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity onPress={() => removeWeek(weekIndex)}>
              <Text style={styles.removeLabel}>Remove Week</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.addWeekButtonContainer}>
      <TouchableOpacity style={styles.addWeekButton} onPress={addWeek}>
        <Text style={styles.addButtonText}>Add Week</Text>
      </TouchableOpacity>
      </View>

      <Modal
        visible={exerciseModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setExerciseModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Exercise</Text>

            <Picker style={styles.picker}
              selectedValue={selectedExercise}
              onValueChange={(value) => setSelectedExercise(value)}
            >
              <Picker.Item label="Select..." value="" />
              {exerciseOptions.map((exercise) => (
                <Picker.Item label={exercise.name} value={exercise.name} key={exercise.id} />
              ))}
            </Picker>

            <TextInput
              style={styles.input}
              placeholder="Sets"
              keyboardType="numeric"
              value={sets}
              onChangeText={setSets}
            />

            <TextInput
              style={styles.input}
              placeholder="Reps"
              keyboardType="numeric"
              value={reps}
              onChangeText={setReps}
            />


            <View style={styles.modalButtons}>
                          <Pressable style={styles.addButton} onPress={addExercise}>
                            <Text style={styles.addButtonText}>Add</Text>
                          </Pressable>

                          <Pressable style={styles.cancelButton} onPress={() => setExerciseModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                          </Pressable>
                        </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.postButton} onPress={handleProgramCreation}>
              <Text style={styles.postButtonText}>Create Program</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const lightStyles = StyleSheet.create({
  container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        flex: 1,
      },

      container: {
              padding: 10,
              flex: 1,
            },
      title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
      },
      input: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      },
      descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
      },

  addButton: {
        marginLeft: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#007bff',
        borderRadius: 10,
        elevation: 3,
      },
      addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      addWeekButton: {
              marginLeft: 10,
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: '#007bff',
              borderRadius: 10,
              alignItems: 'center',
              width:100,
              elevation: 3,
            },
            addWeekButtonContainer: {
              alignItems: 'center',
            },
      postButton: {
            backgroundColor: '#007bff',
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 20,
            shadowColor: '#007bff',
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5,
          },
          postButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
          },
  weekContainer: { marginBottom: 20 },
  workoutContainer: { marginBottom: 15 },
  sectionTitle: { fontSize: 18 },
   exerciseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      exerciseInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginRight: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      },
      exerciseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
      },
      exerciseItemText: {
        fontSize: 14,
        color: '#333',
      },
  removeLabel: { color: 'red' },
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      width: '90%',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
    },
     placeholderColor: 'gray',
    picker: {
      width: '100%',
      height: 50,
      backgroundColor: '#f0f0f0',
      marginBottom: 15,
      borderRadius: 5,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    cancelButton: {
        backgroundColor: '#ff3b30',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
      },
      cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
});

export default CreateProgram;
