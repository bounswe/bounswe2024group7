import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

const CreateProgram = ({ darkMode, setSelectedPage }) => {
  const styles = darkMode ? darkStyles : lightStyles;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [labels, setLabels] = useState([]);
  const [labelText, setLabelText] = useState('');
  const [exercises, setExercises] = useState([]);
  const [exercise, setExercise] = useState({ name: '', repetitions: '', sets: '' });

  const handleProgramCreation = () => {
    const newProgram = { title, description, labels, exercises };
    console.log('Creating program:', newProgram);
    // Add your logic to handle program submission
  };

  const addLabel = () => {
    if (labelText.trim()) {
      setLabels([...labels, labelText.trim()]);
      setLabelText('');
    }
  };

  const removeLabel = (index) => {
    setLabels(labels.filter((_, i) => i !== index));
  };

  const addExercise = () => {
    if (exercise.name.trim() && exercise.repetitions && exercise.sets) {
      setExercises([...exercises, exercise]);
      setExercise({ name: '', repetitions: '', sets: '' });
    }
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Create New Program</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor={styles.placeholderColor}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        placeholderTextColor={styles.placeholderColor}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.labelContainer}>
        <TextInput
          style={styles.labelInput}
          placeholder="Add Label"
          placeholderTextColor={styles.placeholderColor}
          value={labelText}
          onChangeText={setLabelText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addLabel}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={labels}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.labelItem}>
            <Text style={styles.labelItemText}>{item}</Text>
            <TouchableOpacity onPress={() => removeLabel(index)}>
              <Text style={styles.removeLabel}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.sectionTitle}>Exercises</Text>

      <View style={styles.exerciseContainer}>
        <TextInput
          style={styles.exerciseInput}
          placeholder="Exercise Name"
          placeholderTextColor={styles.placeholderColor}
          value={exercise.name}
          onChangeText={(text) => setExercise({ ...exercise, name: text })}
        />
        <TextInput
          style={styles.exerciseInput}
          placeholder="Repetitions"
          placeholderTextColor={styles.placeholderColor}
          keyboardType="numeric"
          value={exercise.repetitions}
          onChangeText={(text) => setExercise({ ...exercise, repetitions: text })}
        />
        <TextInput
          style={styles.exerciseInput}
          placeholder="Sets"
          placeholderTextColor={styles.placeholderColor}
          keyboardType="numeric"
          value={exercise.sets}
          onChangeText={(text) => setExercise({ ...exercise, sets: text })}
        />
        <TouchableOpacity style={styles.addButton} onPress={addExercise}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseItemText}>
              {item.name} - {item.repetitions} reps x {item.sets} sets
            </Text>
            <TouchableOpacity onPress={() => removeExercise(index)}>
              <Text style={styles.removeLabel}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.postButton} onPress={handleProgramCreation}>
        <Text style={styles.postButtonText}>Create Program</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

// Reusing similar styles from CreatePost component with additional styling for exercises
const lightStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
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
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
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
  labelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 5,
  },
  labelItemText: {
    fontSize: 14,
    color: '#333',
  },
  removeLabel: {
    color: '#ff3b30',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
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
  placeholderColor: 'gray',
});

const darkStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  input: {
    height: 50,
    backgroundColor: '#333333',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    color: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#333333',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
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
    color: '#ffffff',
    fontWeight: 'bold',
  },
  labelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#555555',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 5,
  },
  labelItemText: {
    fontSize: 14,
    color: '#ffffff',
  },
  removeLabel: {
    color: '#ff3b30',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#ffffff',
  },
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#333333',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#ffffff',
    marginRight: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '#555555',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  exerciseItemText: {
    fontSize: 14,
    color: '#ffffff',
  },
  postButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#007bff',
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
  },
  postButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeholderColor: '#aaaaaa',
});

// Define darkStyles similarly as lightStyles with color changes for dark mode

export default CreateProgram;
