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
import FeedbackCard from './FeedbackCard.js';

const FeedbackDetail = ({route}) => {
  // Feedback data
  const { trainingProgram, bodyPart, weekNumber, workoutNumber, exerciseNumber, feedbackText, navigation} = route.params;

    const [feedback, setFeedback] = useState({"trainingProgram":"",
        "bodyPart":[],
        "weekNumber" : 0,
        "workoutNumber" : 0,
        "exerciseNumber": 0,
        "feedbackText" : ""});

  const sessionToken = useSelector(userSessionToken);
  console.log(sessionToken);
  const profile = useSelector(userProfile);
  const handleLike = () => {
  isLiked?setLikes(likes-1):setLikes(likes + 1);
  setIsLiked(!isLiked);
  }

  const {
          data: feedbackData,
          isFetching: feedbackIsFetching,
          isLoading: feedbackIsLoading,
      } = useQuery({
          queryKey: ['feedback'],
          queryFn: async () => {
              const response = await apiInstance().get(`api/feedback/${id}`)
              console.log(response.data);
              return response.data
          },
          refetchOnWindowFocus:false,
      })



      useEffect(() => {
          if (feedbackData && !feedbackIsFetching) {
              setProgram(feedbackData)
              console.log(feedbackData);

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

  return (
      {/*<ScrollView contentContainerStyle={styles.container}>

        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
          <Text style={styles.date}>Program {trainingProgram}</Text>
          </View>
          <View style={styles.ownerContainer}>
                      <Text style={styles.owner}>{bodyPart}</Text>
          </View>
          <View style={styles.tagContainer}>
          <Text style={styles.date}>Week {weekNumber}</Text>
          <Text style={styles.date}>Workout {workoutNumber}</Text>
          <Text style={styles.date}>Exercise {exerciseNumber}</Text>
          <Text style={styles.date}>Feedback: {feedbackText}</Text>
          </View>

          <Text style={styles.postDescription}>
            {description}
          </Text>
        </View>

        <FeedbackCard trainingProgram={feedback.trainingProgram} bodyPart={feedback.bodyPart}
            weekNumber={feedback.weekNumber}
            workoutNumber={feedback.workoutNumber}
            exerciseNumber = {feedback.exerciseNumber}
            feedbackText = {feedback.feedbackText}
            navigation = {navigation}/>

      </ScrollView>*/}
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

export default FeedbackDetail;
