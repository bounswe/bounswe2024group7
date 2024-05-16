import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Comment from './Comment';
import Label from './Label';
import { useRoute } from '@react-navigation/native';
const PostViewPage = ({post}) => {


  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  /*const route = useRoute();
  const {post} = route.params;*/

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Post Image */}
      <Image source={{ uri: post?.imageURL }} style={styles.image} />
      
      {/* Post Title */}
      {/* <Text style={styles.title}>{post_obj && post_obj.title}</Text> */}
      <Text style={styles.title}>{post?.title}</Text>
      {/* Post Description */}
      <Text style={styles.description}>{post?.creator}</Text>
      {/* Labels */}
      {/* <View style={styles.labelsContainer}>
      {postData.materials.map((material, index) => (
        <Label className="material:" value={material}/>
      ))}
      </View> */}
      <View style={styles.labelsContainer}>
      <Label style = {styles.label} className="material:" value={post?.material}/>
      <Label style = {styles.label} className="genre:" value={post?.genre}/>
      </View>
      
      
      {/* Like Button, Bookmark Button, and Comments */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLike}>
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={24} color={liked ? '#6247aa' : 'black'} />
          {/* <Text style={styles.buttonText}>{postData.likes} Likes</Text> */}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleBookmark}>
          <Ionicons name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={24} color={bookmarked ? '#6247aa' : 'black'} />
          <Text style={styles.buttonText}>Bookmark</Text>
        </TouchableOpacity>
        
        {/* <Text style={styles.commentsTitle}>Comments:</Text> */}
      </View>
      
      {/* Comments
      <View style={styles.commentsContainer}>
        {postData.comments.map(comment => (
          <View key={comment.id} style={styles.commentContainer}>
            <Comment userName={comment.user} text={comment.text} likes={comment.likes} />
          </View>
        ))}
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      margin: 30
    },
    image: {
      width: '100%',
      height: 300,
      borderRadius: 10,
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      marginBottom: 10,
    },
    labelsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
    },
    label: {
      margin: 5
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
    },
    commentsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 10,
    },
    buttonGroup: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
    },
    buttonText: {
      marginLeft: 5,
      fontSize: 16,
    },
    commentsContainer: {
      marginBottom: 10,
    },
    commentContainer: {
      flexDirection: 'row',
      marginBottom: 5,
      width: '100%', // Make the comment box occupy full width
    },
    commentUser: {
      fontWeight: 'bold',
    },
    commentText: {
      marginLeft: 5,
    },
  });
  


export default PostViewPage;