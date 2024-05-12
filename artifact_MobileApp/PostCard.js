import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Label from './Label';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
const PostCard = ({post_obj}) => {
  const navigation = useNavigation(); // Get navigation object

  // Dummy data for the postcard
//   const postCardData = {
//     imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWRpa_xrwaPLKt_LADjacrbdsaEBIhgpi88Llcm3nyw&s',
//     message: 'Hello from a dummy postcard!',
//     sender: 'John Doe',
//     receiver: 'Jane Smith'
//   };

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('PostViewPage', { post_obj: post_obj })}>
      <Image source={{ uri: post_obj.image.url }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{post_obj.title}</Text>
        <Text style={styles.ownerText}>By: {post_obj.profile.username}</Text>
        
        {/* <View style={styles.labelsContainer}>
            {post_obj.labels.material.map((material, index) => (
                <Label className="material:" value={material}/>
            ))}
      </View> */}
        {/* <View>
        {post_obj.labels.material.map((material_value, index) => (
        <Label className="material:" value={material_value}/>
        ))}
        </View> */}
        {/* <View>
        {post_obj.labels.type.map((type_value, index) => (
        <Label className="type:" value={type_value}/>
        ))}
        </View> */}
        {/* <View>
        {post_obj.labels.genre.map((genre_value, index) => (
        <Label className="genre:" value={genre_value}/>
        ))}
        </View>  */}
        {/* {post_obj.labels.is_own_artwork && (
            <Label className="my_artwork" value=""/>
      )} */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    labelsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    },
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
    width: 100, 
    height: 100, 
    borderRadius: 10,
    marginRight: 10, 
  },
  textContainer: {
    flex: 1, 
  },
  titleText: {
    fontSize: 16,
    marginBottom: 5,
  },
  ownerText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  LabelsText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default PostCard;
