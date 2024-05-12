import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const PostCard = () => {
  // Dummy data for the postcard
  const postCardData = {
    imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWRpa_xrwaPLKt_LADjacrbdsaEBIhgpi88Llcm3nyw&s',
    message: 'Hello from a dummy postcard!',
    sender: 'John Doe',
    receiver: 'Jane Smith'
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: postCardData.imageUri }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.messageText}>{postCardData.message}</Text>
        <Text style={styles.senderText}>From: {postCardData.sender}</Text>
        <Text style={styles.receiverText}>To: {postCardData.receiver}</Text>
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
    margin: 10,
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
  messageText: {
    fontSize: 16,
    marginBottom: 5,
  },
  senderText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  receiverText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default PostCard;
