import React from 'react';
import apiInstance from './Api'; 
import Toast from 'react-native-toast-message';
import { View, Image, Text, StyleSheet } from 'react-native';
import PostViewPage from './PostViewPage';
import { useNavigation } from '@react-navigation/native';
const PostCard = ({imageURL,title,material,genre,creator}) => {
  /* Actual data for the postcard
  const [imageURL, setImageURL] = useState('');
  const [name, setMName] = useState('');
  const [material, setMaterial] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');

  const checkDatabase = async (name) => {
    try {
      const response = await apiInstance().post(
        "search",
            {
                imageURL,
                name,
                material,
                genre,
                author
            }
      )
    }
    catch (e) {
      console.log(e)
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Search Error',
        text2: 'This painting does not exist. Please try again.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40
      });
    }
  }*/

  // Dummy data for the postcard
  // const postCardData = {
  //   imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWRpa_xrwaPLKt_LADjacrbdsaEBIhgpi88Llcm3nyw&s',
  //   message: 'Hello from a dummy postcard!',
  //   sender: 'John Doe',
  //   receiver: 'Jane Smith'
  // };

  const navigation = useNavigation();
  return (
    <View style={styles.container} onPress={navigation.navigate('PostViewPage', { imageURL: imageURL,title: title,material:material,genre:genre,creator:creator})}>
      <Image source={{ uri: imageURL }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.infoText}>Creator: {creator}</Text>
        <Text style={styles.infoText}>Genre: {genre}</Text>
        <Text style={styles.infoText}>Material: {material}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100, // Adjust the width of the image
    height: 100, // Adjust the height of the image
    borderRadius: 10,
    marginRight: 10, // Margin added to separate the image from text
  },
  textContainer: {
    flex: 1, // Flex 1 to allow the text container to expand
  },
  titleText: {
    fontSize: 16,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    fontStyle: 'italic',
  }
});

export default PostCard;
