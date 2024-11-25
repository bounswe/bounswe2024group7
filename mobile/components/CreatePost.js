import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import Toast from 'react-native-toast-message';
import apiInstance from '../Api'
import {
  userProfile,
  userPassword,
  userSessionToken
} from '../user'

const CreatePost = ({ darkMode, setSelectedPage }) => {
  const styles = darkMode ? darkStyles : lightStyles;
  const [title, setTitle] = useState('');
  const [post, setPost] = useState({});
  const [description, setDescription] = useState('');
  const [labels, setLabels] = useState([]);
  const [image, setImage] = useState('')
  const [labelText, setLabelText] = useState('');
  const profile = useSelector(userProfile)
  const password = useSelector(userPassword)
  const sessionToken = useSelector(userSessionToken)

  const goHome = () => navigation.navigate('Home');
  const goFeed = () => setSelectedPage('Feed');
  const handlePost = async () => {
    /*const newPost = { title, description, labels };
    console.log('Creating post:', newPost);*/
    if (labels.length === 0) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Create Error',
        text2: 'No labels selected',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40
      });
        return
    }

    if (!profile) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Create Error',
        text2: 'Not logged in',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40
      });
        return
    }

    console.log(post)

    // First create image model and get the image id
    if (post.image) {
        const imageResponse = await apiInstance(
            profile.username,
            password
        ).post('/images', {
            url: post.image,
        })

        post.image = imageResponse.data.id

        console.log(post)
    } else {
        delete post.image
    }
    console.log(post)
    const response = await apiInstance(sessionToken).post(`api/posts`, {
      ...post,
      username: profile.username,
  })
    console.log(post)
    console.log(response)

  if (response.status === 200) {

    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Post Created',
      text2: 'Your post has been created successfully.',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40
    });
    //goHome();
    goFeed();

    //Cookies.set("username", username)
} else {
  Toast.show({
    type: 'error',
    position: 'bottom',
    text1: 'Login Error',
    text2: 'There was an error creating post. Please try again.',
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40
  });
}


    // Add your logic to handle post submission
  };

  /*const createPostMutation = useMutation(
    {
        mutationFn: async (post) => {
            if (labels.length === 0) {
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Create Error',
                text2: 'No labels selected',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
              });
                return
            }

            if (!profile) {
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Create Error',
                text2: 'Not logged in',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
              });
                return
            }

            console.log(post)

            // First create image model and get the image id
            if (post.image) {
                const imageResponse = await apiInstance(
                    profile.username,
                    password
                ).post('/images', {
                    url: post.image,
                })

                post.image = imageResponse.data.id

                console.log(post)
            } else {
                delete post.image
            }
            console.log(post)

            const response = await apiInstance().post(`api/posts/user/${profile.username}`, {
                ...post,
                username: profile.username,
            })
            console.log(post)

            Toast.show({
              type: 'success',
              position: 'bottom',
              text1: 'Post Created',
              text2: 'Your post has been created successfully.',
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40
            });
            return response.data
        },
        onError: (error) => {
            toast({
                title: 'An error occurred.',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(
                {
                    queryKey: ['posts']
                }
            )
            goHome();
        }

    }
)*/

  const addLabel = () => {
    if (labelText.trim()) {
      setLabels([...labels, labelText.trim()]);
      setLabelText('');
    }
  };

  const removeLabel = (index) => {
    setLabels(labels.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Post</Text>

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

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Image"
        placeholderTextColor={styles.placeholderColor}
        value={image}
        onChangeText={setImage}
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

      <TouchableOpacity style={styles.postButton} onPress={() => {
                            /*createPostMutation.mutate({
                                title: title,
                                content: description,
                                image: image,
                                labels: labels,
                            })*/
                           setPost({
                            title: title,
                            content: description,
                            image: image,
                            tags: labels
                        });
                           handlePost();
                        }}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

// Light Mode Styles
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

// Dark Mode Styles
const darkStyles = StyleSheet.create({
  ...lightStyles,
  container: {
    ...lightStyles.container,
    backgroundColor: '#121212',
  },
  title: {
    ...lightStyles.title,
    color: '#fff',
  },
  input: {
    ...lightStyles.input,
    backgroundColor: '#1e1e1e',
    color: '#fff',
  },
  descriptionInput: {
    ...lightStyles.descriptionInput,
    backgroundColor: '#1e1e1e',
    color: '#fff',
  },
  labelInput: {
    ...lightStyles.labelInput,
    backgroundColor: '#1e1e1e',
    color: '#fff',
  },
  addButton: {
    ...lightStyles.addButton,
    backgroundColor: '#ff4081',
  },
  addButtonText: {
    ...lightStyles.addButtonText,
    color: '#fff',
  },
  labelItem: {
    ...lightStyles.labelItem,
    backgroundColor: '#333',
  },
  labelItemText: {
    ...lightStyles.labelItemText,
    color: '#fff',
  },
  postButton: {
    ...lightStyles.postButton,
    backgroundColor: '#ff4081',
    shadowColor: '#ff4081',
  },
  postButtonText: {
    ...lightStyles.postButtonText,
    color: '#fff',
  },
  placeholderColor: 'lightgray',
});

export default CreatePost;
