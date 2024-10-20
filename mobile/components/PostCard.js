import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const PostCard = ({ urilist, title, description, CommentContainer, likecount, labels, owner, navigation }) => {
  return (
    <View style={styles.container}>
      {/*<TouchableOpacity
        onPress={() =>
          navigation.navigate('PostViewPage', {
            post: { urilist, title, description, CommentContainer, likecount, labels, owner } 
          }) 
        }>
        <Image source={{ uri: "https://images.pexels.com/photos/1978505/pexels-photo-1978505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.infoText}>Description: {description}</Text>
          {urilist.map((uri, index) => (
        <Text style={styles.infoText}>Uri: {uri}</Text>
      ))}
          <Text style={styles.infoText}>Owner: {owner}</Text>
          <Text style={styles.infoText}>Like Count: {likecount}</Text>
          {labels.map((label, index) => (
        <Text style={styles.infoText}>{label}</Text>
      ))}

        </View>
      </TouchableOpacity>*/}
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
    flexDirection: 'column'
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
