import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { userSessionToken } from '../user.js';
import { useQuery } from "@tanstack/react-query"
import Toast from 'react-native-toast-message';
import apiInstance from '../Api';

const Survey = ({ route }) => {
  const { navigation } = route.params;
  const sessionToken = useSelector(userSessionToken);
  console.log(sessionToken);
  const goHome = () => navigation.navigate('Home');

  const [level, setLevel] = useState('Beginner');
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  var goalOptions = [
    "ABS",
    "ARMS",
    "BACK",
    "BOOTCAMP",
    "CARDIO",
    "CHEST",
    "DIET",
    "ENDURANCE",
    "FITNESS",
    "STRETCHING",
    "TRAINING",
    "YOGA"
  ];
  
  var goalOptions = goalOptions.map((option) => option.toLowerCase())

  const handleGoalSelection = (goal) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter((selectedGoal) => selectedGoal !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  const deliverDatabase = async (fitnessGoals, fitnessLevel) => {
    console.log(fitnessGoals);
    console.log(fitnessLevel);
    try {
      const response = await apiInstance(sessionToken).post("api/surveys", {
        fitnessGoals,
        fitnessLevel
      });

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Survey Sent',
          text2: 'Your survey has been sent successfully.',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40
        });
        goHome();
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Survey Error',
        text2: 'Network error.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40
      });    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Before Facting Fitness...</Text>

      <View style={styles.equalHeightContainer}>
        {/* Fitness Goals */}
        <View style={styles.halfContainer}>
          <Text style={styles.fitnessGoal}>Select Your Fitness Goals</Text>
          <ScrollView>
            <View style={styles.optionsContainer}>
              {goalOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.goalOption,
                    goals.includes(option) && styles.selectedGoalOption,
                  ]}
                  onPress={() => handleGoalSelection(option)}
                >
                  <Text
                    style={[
                      styles.goalOptionText,
                      goals.includes(option) && styles.selectedGoalOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Fitness Level */}
        <View style={styles.halfContainer}>
          <Text style={styles.fitnessLevel}>Select Your Fitness Level</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={level}
              onValueChange={(itemValue) => setLevel(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Beginner" value="Beginner" />
              <Picker.Item label="Intermediate" value="Intermediate" />
              <Picker.Item label="Professional" value="Professional" />
            </Picker>
          </View>
        </View>
      </View>

      {/* Add Goals Modal */}
      {/*<Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Goals</Text>
          <ScrollView>
            <View style={styles.modalContent}>
              {goalOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.goalOption,
                    goals.includes(option) && styles.selectedGoalOption,
                  ]}
                  onPress={() => handleGoalSelection(option)}
                >
                  <Text
                    style={[
                      styles.goalOptionText,
                      goals.includes(option) && styles.selectedGoalOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>*/}

      {/* Add Goals Button */}
      {/*<TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Add Goals</Text>
      </TouchableOpacity>*/}

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => deliverDatabase(goals, level)}
      >
        <Text style={styles.buttonText}>Start The Journey</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  equalHeightContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  halfContainer: {
    flex: 1,
    margin: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  fitnessGoal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fitnessLevel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  pickerContainer: {
    alignItems: 'center',
  },
  picker: {
    width: '80%',
    height: 50,
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
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalContent: {
    flexDirection: 'column',
  },
});

export default Survey;
