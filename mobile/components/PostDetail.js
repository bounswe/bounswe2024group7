import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import { useSelector } from 'react-redux';
import { userName, userProfile, userSessionToken } from '../user.js';
import { useQuery } from "@tanstack/react-query"
import apiInstance from '../Api';
import ProgramCard from './ProgramCard';

import Toast from 'react-native-toast-message';

const PostDetail = ({route}) => {
  // Post data
  const { program_id,tags, description, owner, post_id, date, likeCount, liked, commentList, navigation} = route.params;
  const [likes, setLikes] = useState(likeCount);
  /*const [comments, setComments] = useState([
    { id: '1', user: 'jshine1337', text: 'Nope, that’s not a concept...' },
    { id: '2', user: 'sqlpro23', text: 'You could try batching your statements!' },
  ]);*/
 console.log("Program id is: "+program_id);

  const [comments, setComments] = useState(commentList)
  const [newComment, setNewComment] = useState('');
  // Initiate Program With Default Values
  const [program, setProgram] = useState({"title":"", "description":"",
      "trainerUsername":"",
      "weeks":[],
      "participants" : [],
      "date" : "00/00/0000",
      "level": 0,
      "rating" : 0,
      "navigation": {navigation},
      "programId": 0,
      "type": "BEGINNER",
      "interval": 0});
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(liked);
  const username = useSelector(userName);
  const sessionToken = useSelector(userSessionToken);
  console.log(sessionToken);
  const profile = useSelector(userProfile);
  const handleLike = () => {
  isLiked?setLikes(likes-1):setLikes(likes + 1);
  setIsLiked(!isLiked);
  }

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: String(comments.length + 1), user: 'You', text: newComment }]);
      setNewComment('');
    }
  };

  const {
          data: programData,
          isFetching: programsIsFetching,
          isLoading: programsIsLoading,
      } = useQuery({
          queryKey: ['training-program'],
          queryFn: async () => {
              const response = await apiInstance().get(`api/training-programs/${program_id}`)
              console.log(response.data);
              return response.data
          },
          refetchOnWindowFocus:false,
      })



      useEffect(() => {
          if (programData && !programsIsFetching) {
              setProgram(programData)
              console.log(programData);

          }
      }, [programData, programsIsFetching])

  /*const {
        data: ownFollowingData,
        isFetching: ownFollowingIsFetching,
        isLoading: ownFollowingIsLoading,
      } = useQuery({
        queryKey: ['ownfollowing'],
        queryFn: async () => {
            try {
                const response = await apiInstance(sessionToken).get(`api/user/${ownUsername}/following`)

                return response.data
            } catch (error) {
                return []
            }
        },
        refetchOnWindowFocus: false
      })
      useEffect(() => {
        if (ownFollowingData && !ownFollowingIsFetching) {
          ownFollowingData.includes(username)?setIsFollowing(true):setIsFollowing(false);
        }


      }, [ownFollowingData, ownFollowingIsFetching]);*/

 const handleLikeToggle = async() => {
       const response = await apiInstance(sessionToken).post(`api/posts/${post_id}/like`, {

         })
           console.log(response)

         if (response.status === 200) {

           Toast.show({
             type: 'success',
             position: 'bottom',
             text1: 'Post Liked',
             text2: 'Post liked successfully.',
             visibilityTime: 3000,
             autoHide: true,
             topOffset: 30,
             bottomOffset: 40
           });
           //goHome();

           //Cookies.set("username", username)
       } else {
         Toast.show({
           type: 'error',
           position: 'bottom',
           text1: 'Like Error',
           text2: 'There was an error liking the post. Please try again.',
           visibilityTime: 2000,
           autoHide: true,
           topOffset: 30,
           bottomOffset: 40
         });
       }
       setIsLiked(true);
       setLikes(likes+1);

     };
     const handleUnlikeToggle = async() => {
            const response = await apiInstance(sessionToken).delete(`api/posts/${post_id}/like`, {

              })
                console.log(response)

              if (response.status === 200) {

                Toast.show({
                  type: 'success',
                  position: 'bottom',
                  text1: 'Post Unliked',
                  text2: 'Post Unliked successfully.',
                  visibilityTime: 3000,
                  autoHide: true,
                  topOffset: 30,
                  bottomOffset: 40
                });
                //goHome();

                //Cookies.set("username", username)
            } else {
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Unlike Error',
                text2: 'There was an error unliking the post. Please try again.',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
              });
            }
            setIsLiked(false);
            setLikes(likes-1);

          };
          const handleBookmarkToggle = async() => {
                 const response = await apiInstance(sessionToken).post(`api/posts/${post_id}/bookmark`, {

                   })
                     console.log(response)

                   if (response.status === 200) {

                     Toast.show({
                       type: 'success',
                       position: 'bottom',
                       text1: 'Post Bookmarked',
                       text2: 'Post bookmarked successfully.',
                       visibilityTime: 3000,
                       autoHide: true,
                       topOffset: 30,
                       bottomOffset: 40
                     });
                     //goHome();

                     //Cookies.set("username", username)
                 } else {
                   Toast.show({
                     type: 'error',
                     position: 'bottom',
                     text1: 'Bookmark Error',
                     text2: 'There was an error bookmarking the post. Please try again.',
                     visibilityTime: 2000,
                     autoHide: true,
                     topOffset: 30,
                     bottomOffset: 40
                   });
                 }
                 setIsBookmarked(true);

               };
               const handleUnbookmarkToggle = async() => {
                      const response = await apiInstance(sessionToken).delete(`api/posts/${post_id}/bookmark`, {

                        })
                          console.log(response)

                        if (response.status === 200) {

                          Toast.show({
                            type: 'success',
                            position: 'bottom',
                            text1: 'Post Unbookmarked',
                            text2: 'Post Unbookmarked successfully.',
                            visibilityTime: 3000,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 40
                          });
                          //goHome();

                          //Cookies.set("username", username)
                      } else {
                        Toast.show({
                          type: 'error',
                          position: 'bottom',
                          text1: 'Unbookmark Error',
                          text2: 'There was an error unbookmarking the post. Please try again.',
                          visibilityTime: 2000,
                          autoHide: true,
                          topOffset: 30,
                          bottomOffset: 40
                        });
                      }
                      setIsBookmarked(false);

                    };



  return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Post Header */}
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
          <Text style={styles.date}>Posted in {date}</Text>
          </View>
          <View style={styles.ownerContainer}>
                      <Text style={styles.owner}>{owner}</Text>
          </View>
          <View style={styles.tagContainer}>
            {tags.filter(tag => typeof tag === 'string' && tag).map((tag, index) => (

                <Text style={styles.tag}>{tag}</Text>

            ))}
          </View>

          <Text style={styles.postDescription}>
            {description}
          </Text>
        </View>

        <ProgramCard title={program.title} description={program.description}
      trainerUsername={program.trainer}
      weeks={program.weeks}
      participants = {program.participants}
      date = {program.createdAt}
      level = {program.level}
      rating = {program.rating}
      navigation = {navigation}
      programId = {program.id}
      type = {program.type}
      interval = {program.interval}/>

        <View style={styles.interactionContainer}>
          <TouchableOpacity style={styles.interactionButton} onPress={isLiked?handleUnlikeToggle:handleLikeToggle}>
            <Icon name="heart" size={20} color="#FF4500" />
            <Text style={styles.interactionText}>{likes} Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interactionButton}>
            <Icon name="chatbubble-ellipses" size={20} color="#1E90FF" />
            <Text style={styles.interactionText}>{comments.length} Comments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.interactionButton}
            onPress={() => {isBookmarked?handleUnbookmarkToggle:handleBookmarkToggle}}
          >
            <Icon name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={20} color="#FFD700" />
            <Text style={styles.interactionText}>Bookmark</Text>
          </TouchableOpacity>
        </View>

        {/*<View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comments</Text>
          <FlatList
            data={comments}
            nestedScrollEnable
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentItem}>
                <Text style={styles.commentUser}>{item.user}</Text>
                <Text style={styles.commentText}>{item.text}</Text>
              </View>
            )}
          />
        </View>

        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit}>
            <Icon name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>*/}
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F8FA',
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  date: {
      fontSize: 14,
      color: '#999',
    },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  ownerContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
postHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight:20,
      marginBottom: 10,
    },
  tag: {
    backgroundColor: '#E0E0E0',
    color: '#333333',
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  badgeContainer: {
      fontSize: 14,
      backgroundColor: 'purple'
    },
  owner: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#1E90FF',
      marginBottom: 4,
    },
  postDescription: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  interactionButton: {
    alignItems: 'center',
  },
  interactionText: {
    fontSize: 12,
    color: '#333333',
    marginTop: 4,
  },
  commentsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  commentItem: {
    marginBottom: 15,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#555555',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  commentInput: {
    flex: 1,
    fontSize: 14,
    padding: 10,
    color: '#333333',
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
});

export default PostDetail;
