import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Picker, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [label, setLabel] = useState('');
  const navigation = useNavigation();
  const handlePublish = () => {
    console.log('Post published:', { title, description, image, label, imageUrl });
    navigation.navigate('Home');
    // Handle publishing logic here
    // You can send the data to your backend or wherever needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titlecreate}>Create Post:</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Description"
        multiline={true}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <Picker
        selectedValue={label}
        style={styles.input}
        onValueChange={(itemValue) => setLabel(itemValue)}
      >
        <Picker.Item label="Select a label" value="" />
        <Picker.Item label="Material: Oil" value="Material: Oil" />
        <Picker.Item label="Material: Canvas" value="Material: Canvas" />
        <Picker.Item label="Material: Wood" value="Material: Wood" />
        <Picker.Item label="Material: Acrylic" value="Material: Acrylic" />
        <Picker.Item label="Material: Watercolor" value="Material: Watercolor" />
        <Picker.Item label="Material: Ink" value="Material: Ink" />
        <Picker.Item label="Material: Pastel" value="Material: Pastel" />
        <Picker.Item label="Material: Charcoal" value="Material: Charcoal" />
        <Picker.Item label="Material: Clay" value="Material: Clay" />
      </Picker>
      <Button title="Publish" onPress={handlePublish} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  titlecreate: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default AddPost;