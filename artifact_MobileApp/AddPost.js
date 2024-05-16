import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Picker, Image } from 'react-native';
// import * as ImagePicker from 'react-native-image-picker';
const AddPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [label, setLabel] = useState('');

  const handlePublish = () => {
    // Handle publishing logic here
    console.log('Post published:', { title, description, image, label });
    // You can send the data to your backend or wherever needed
  };
    // const handleChooseImage = () => {
    //     const options = {
    //       title: 'Select Image',
    //       storageOptions: {
    //         skipBackup: true,
    //         path: 'images',
    //       },
    //     };
      
    //     ImagePicker.launchImageLibrary(options, (response) => {
    //       if (response.didCancel) {
    //         console.log('User cancelled image picker');
    //       } else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //       } else if (response.customButton) {
    //         console.log('User tapped custom button: ', response.customButton);
    //       } else {
    //         const source = { uri: response.uri };
    //         setImage(source);
    //       }
    //     });
    //   };
      
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
       {/* <Button title="Choose Image" onPress={handleChooseImage} />
      {image && <Image source={image} style={{ width: 200, height: 200 }} />} */}
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
