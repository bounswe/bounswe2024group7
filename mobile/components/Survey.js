import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker

const Survey = ({ route }) => {
    const {username,  navigation} = route.params;

    const goHome = () => navigation.navigate('Home');

    const [level, setLevel] = useState('Beginner'); // Default Level
    const [goals, setGoals] = useState([]); // Default No Goals
    const goalOptions = [
        { label: 'Pilates', value: 'pilates' },
        { label: 'Cycling', value: 'cycling' },
        { label: 'Yoga', value: 'yoga' },
        { label: 'Cardio', value: 'cardio' },
        { label: 'Strength Training', value: 'strength_training' },
      ];

    const handleGoalSelection = (goal) => {
        if (goals.includes(goal)) {
          // Goal is already selected, remove it
          setGoals(goals.filter((selectedGoal) => selectedGoal !== goal));
        } else {
          // Goal is not selected, add it
          setGoals([...goals, goal]);
        }
      };
    /*const deliverDatabase = async (username, fitnessGoals, fitnessLevel) => {
        try{
            const response = await apiInstance().post(
                "api/surveys",
                {
                    username,
                    fitnessGoals,
                    fitnessLevel
                }
            )

            if (response.status === 201) {
            
                    const data = response.data
            

                    goHome();
                }
        }
        catch (e) {
              console.log(e);
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Survey Completion Error',
                text2: 'There is an error in your survey. Please try again.',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            });
        }
    }*/

    const deliverDatabase = (username, goals, level) => {
            console.log(goals);
            console.log(level);
            goHome();
        }


    return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}> Before Facting Fitness... </Text>    
            <View style={styles.exerciseContainer}>

                        <Text style={styles.fitnessGoal}> Select Your Fitness Goals</Text>
                        <View style={styles.optionsContainer}>

                        {goalOptions.map((option) => (
                                  <TouchableOpacity
                                    key={option.value}
                                    style={[
                                      styles.goalOption,
                                      goals.includes(option.value) && styles.selectedGoalOption,
                                    ]}
                                    onPress={() => handleGoalSelection(option.value)}
                                  >
                                    <Text
                                      style={[
                                        styles.goalOptionText,
                                        goals.includes(option.value) && styles.selectedGoalOptionText,
                                      ]}
                                    >
                                      {option.label}
                                    </Text>
                                  </TouchableOpacity>
                                ))}
                        </View>
                        <Text style={styles.fitnessLevel}> Select Your Fitness Level</Text>
                        <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={level}
                            onValueChange={(itemValue) => setLevel(itemValue)}
                            style={styles.picker} >
                            <Picker.Item label="Intermediate" value="Intermediate" />
                            <Picker.Item label="Beginner" value="Beginner" />
                            <Picker.Item label="Professional" value="Professional" />
                        </Picker>
                        </View>

                    </View>
            <TouchableOpacity
                  style={styles.button}
                  onPress={() => deliverDatabase(username, goals, level)}
                >
                  <Text style={styles.buttonText}>Start The Journey</Text>
            </TouchableOpacity>
        </ScrollView>
      );

}


const styles = StyleSheet.create({
goalOption: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedGoalOption: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  goalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedGoalOptionText: {
    color: '#fff',
  },
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    exerciseNameContainer: {
      flex: 1,
    },
    pickerContainer: {
          alignItems: "center",
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
      padding: 16,
      marginBottom: 8,
      borderRadius: 8,
      flex:1
    },
    optionsContainer: {
          padding: 10,
          flexDirection:'column',
          justifyContent:'space-between',
          marginBottom: 20
        },
    exerciseTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    fitnessGoal: {
      fontSize: 17,
      fontWeight: 'bold',
      marginBottom: 8,
      flex: 0.8, // Set equal flex for alignment
      textAlign: 'center',
    },
    fitnessLevel: {
      fontSize: 17,
      fontWeight: 'bold',
      marginBottom: 8,
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
    picker: {
        width: '80%',
        height: 50,
        marginTop: 10,
        marginLeft:10,
        backgroundColor: '#F8F8F8',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    button: {
    backgroundColor: '#6366F1',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
  });

export default Survey;