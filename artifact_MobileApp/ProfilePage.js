import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostCard from './PostCard';
import { useNavigation } from '@react-navigation/native';
const ProfilePage = () => {
  const navigation = useNavigation();
  const paintings = [
    {
      title: "Mona Lisa",
      imageURL: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
      genre: "portrait",
      material: "Oil",
      creator: "Leonardo da Vinci"
    },
    // {
    //   title: "The Starry Night",
    //   imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    //   genre: "landscape",
    //   material: "Oil",
    //   creator: "Vincent van Gogh"
    // },
    // {
    //   title: "The Persistence of Memory",
    //   imageURL: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/The_Persistence_of_Memory.jpg/1024px-The_Persistence_of_Memory.jpg",
    //   genre: "surrealism",
    //   material: "Oil",
    //   creator: "Salvador Dalí"
    // },
    // {
    //   title: "The Birth of Venus",
    //   imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1024px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    //   genre: "mythological",
    //   material: "Tempera on canvas",
    //   creator: "Sandro Botticelli"
    // }
  ];
  
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://source.unsplash.com/random/300x300' }}
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>John Doe</Text>
      <Text style={styles.profileUsername}>@johndoe</Text>
      <View style={styles.badgesContainer}>
        <Text style={styles.badge}>Posts: 100</Text>
        <Text style={styles.badge}>Followers: 500</Text>
      </View>
      <View style={styles.buttonsContainer}>
     
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('AddPost')}>
          <Text style={styles.buttonText}> Create Post</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.postCardsContainer}>
      {paintings.map((painting, index) => (
        <View style={styles.row}>
        {/* <TouchableOpacity style={styles.row} onPress={navigation.navigate('PostViewPage', {post:{imageURL: painting.imageURL,title: painting.title,material:painting.material,genre:painting.genre,creator:painting.creator}})}> */}
          <PostCard
            title={painting.title}
            imageURL={painting.imageURL}
            genre={painting.genre}
            material={painting.material}
            creator={painting.creator}
          />
        {/* </TouchableOpacity> */}
        </View>
      ))}
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
  },
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 16,
  },
  badge: {
    // backgroundColor: 'purple',
    color: 'gray',
    padding: 8,
    margin: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
  },
  iconButton: {
    backgroundColor: 'purple',
    borderRadius: 8,
    padding: 12,
    margin: 8,
  },
  postCardsContainer: {
    marginTop: 20,
  },
  row: {
    marginBottom: 10,
  },
});

export default ProfilePage;