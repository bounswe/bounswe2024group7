import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';

const ExerciseDetail = ({ route }) => {
  const {programId,weekId,weekNumber,workoutId,workoutNumber,exerciseNumber,exerciseId,exercise,sets,repetitions} =route.params;

  // Initialize state for the repetition inputs
  const [repInputs, setRepInputs] = useState(Array(sets).fill(''));
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to handle changes in input
  const handleInputChange = (value, index) => {
    var numbers = "0123456789";
    if(value.length>0&&numbers.indexOf(value[value.length-1]) == -1 ) {
        return;
    }
    //value = value.replace(/[^0-9]/g, '')
    const updatedInputs = [...repInputs];
    updatedInputs[index] = value;
    setRepInputs(updatedInputs);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if(repInputs.some((rep)=>{return rep.length==0})){
        ToastAndroid.show('Please fill all set fields!', ToastAndroid.SHORT);
        return;
        }
    setIsSubmitted(true);
    ToastAndroid.show('Successfully submitted!', ToastAndroid.SHORT);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Session {exerciseNumber}: {exercise.name}</Text>

      {/* Display GIF (Placeholder Image) */}
      <View style={styles.gifContainer}>
        <Text>[GIF Placeholder]</Text>
        <Text style={styles.gifUrl}>{exercise.gifUrl}</Text>
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>Body Part: {exercise.bodyPart.toUpperCase()}</Text>
          <Text style={styles.badge}>Target Muscle: {exercise.targetMuscle.toUpperCase()}</Text>
          <Text style={styles.badge}>Equipment: {exercise.equipment.toUpperCase()}</Text>
        </View>

        <Text style={styles.sectionTitle}>Instructions:</Text>
        <View style={styles.instructionsContainer}>
          {exercise.instructions.map((instruction, idx) => (
            <Text key={idx} style={styles.instruction}>
              • {instruction}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Secondary Muscles:</Text>
        <View style={styles.secondaryMusclesContainer}>
          {exercise.secondaryMuscles.map((muscle, idx) => (
            <Text key={idx} style={styles.secondaryMuscleBadge}>
              {muscle.toUpperCase()}
            </Text>
          ))}
        </View>
      </View>

      {/* Repetition Inputs */}
      <Text style={styles.sectionTitle}>Enter Reps for Each Set:</Text>
      <View style={styles.inputsContainer}>
        {Array.from({ length: sets }).map((_, index) => (
          <TextInput
            key={index}
            style={[styles.repInput, isSubmitted && styles.disabledInput]}
            value={repInputs[index]}
            onChangeText={(value) => handleInputChange(value, index)}
            placeholder={`Set ${index + 1}`}
            keyboardType="numeric"
            maxLength = {2}
            editable={!isSubmitted} // Disable inputs after submission
          />
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          isSubmitted && styles.disabledButton,
        ]}
        onPress={handleSubmit}
        disabled={isSubmitted} // Disable button after submission
      >
        <Text style={styles.submitButtonText}>
          {isSubmitted ? 'Submitted' : 'Submit Progress'}
        </Text>
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
  gifContainer: {
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 8,
  },
  gifUrl: {
    fontSize: 12,
    color: 'gray',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#e0f7fa',
    color: '#00796b',
    padding: 6,
    borderRadius: 4,
    margin: 4,
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  instructionsContainer: {
    paddingHorizontal: 8,
  },
  instruction: {
    fontSize: 14,
    marginBottom: 4,
  },
  secondaryMusclesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  secondaryMuscleBadge: {
    backgroundColor: '#fce4ec',
    color: '#880e4f',
    padding: 6,
    borderRadius: 4,
    margin: 4,
    fontSize: 12,
  },
  inputsContainer: {
    marginVertical: 16,
  },
  repInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    marginBottom: 8,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#aaa',
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExerciseDetail;
