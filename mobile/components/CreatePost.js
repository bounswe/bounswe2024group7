import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

const CreatePost = ({darkMode}) => {
  const styles = darkMode? darkStyles : lightStyles;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [labels, setLabels] = useState([]);
  const [labelText, setLabelText] = useState(''); // Single label input

  const handlePost = () => {
    // Handle post creation logic here, including sending data to the server
    const newPost = {
      title,
      description,
      labels,
    };
    console.log('Creating post:', newPost);
    // ... your logic to send the data to the server
  };

  const addLabel = () => {
    if (labelText.trim()) {
      setLabels([...labels, labelText.trim()]); // Add new label to labels array
      setLabelText(''); // Clear label input after adding
    }
  };

  const removeLabel = (index) => {
    setLabels(labels.filter((_, i) => i !== index)); // Remove label by index
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor={'white'}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        placeholderTextColor={'white'}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.labelContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add Label"
          placeholderTextColor={'white'}
          value={labelText}
          onChangeText={setLabelText}
        />
        <Button title="Add Label" onPress={addLabel} />
      </View>

      <FlatList
        data={labels}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.labelItem}>
            <Text style={styles.labelItemText}>{item}</Text>
            <TouchableOpacity onPress={() => removeLabel(index)}>
              <Text style={styles.removeLabel}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Button title="Post" onPress={handlePost} />
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  labelItemText: {
    fontSize: 14,
    fontWeight:'bold',
    fontFamily: 'sans-serif'
  },
  removeLabel: {
    color: 'red',
    marginLeft: 10,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'white',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    color: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    placeholderTextColor: 'white'
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
    borderColor: '#ddd',
    color: 'white',
    placeholderTextColor: 'white'
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    color:'white'
  },
  labelItemText: {
    fontSize: 14,
    color:'white',
    fontFamily: 'sans-serif',
    fontWeight:'bold'
  },
  removeLabel: {
    color: 'red',
    marginLeft: 10,
  },
});

export default CreatePost;
