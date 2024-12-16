
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { userName, userSessionToken } from '../user.js';
import { useQuery } from "@tanstack/react-query"
import apiInstance from '../Api';
const JoinedProgramCard = ({ trainerUsername, trackingId, title, description, programId, weeks, level, joined, date, participants, navigation }) => {

    const sessionToken = useSelector(userSessionToken)
    const [completion,setCompletion] = useState({});
    const [rating,setRating] = useState(0);
    const username = useSelector(userName)
    console.log(username);
    const {
      data: ratingData,
      isFetching: ratingIsFetching,
      isLoading: ratingIsLoading,
  } = useQuery({
      queryKey: [`training-program-rating-${programId}`],
      queryFn: async () => {
          const response = await apiInstance().get(`api/training-programs/${programId}`)
  
          return response.data
      },
      refetchOnWindowFocus:true,
      refetchInterval:60000,
  })
  
  useEffect(() => {
      if (ratingData && !ratingIsFetching) {
          setRating(ratingData.rating)
      }
  }, [ratingData, ratingIsFetching])
    const {
          data: completionData,
          isFetching: programsIsFetching,
          isLoading: programsIsLoading,
        } = useQuery({
          queryKey: [`completion-rate-${trackingId}`],
          queryFn: async () => {
              try {
                  const response = await apiInstance(sessionToken).get(`api/training-programs/${trackingId}/completion-rates`);
                  console.log("Completion rate response:")
                  console.log(response.data);
                  //response.data.weeks.forEach((workout)=>console.log(workout.workoutExercises));
                  return response.data
              } catch (error) {
                  console.log(e);
                  return {}
              }
          },
          refetchOnWindowFocus: true,
        })
        useEffect(() => {
          if (completionData && !programsIsFetching) {
              setCompletion(completionData)
              console.log(completion)
          }
        }, [completionData, programsIsFetching])

  return (
    <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('JoinedProgramDetail', { trainerUsername, trackingId, completion, title, description, programId, weeks, rating, level, date, participants, navigation })}
        >
      <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { username: trainerUsername })}>
        <Text style={styles.owner}>{trainerUsername}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.description}>Week count: {weeks.length}</Text>
      <Text style={styles.description}>Participant count: {participants.length}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3, // Adds shadow on Android
  },
  owner: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#007bff', // Link color
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  location: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  muscle_type: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  follow: {
    fontSize: 12,
    color: '#888',
  }

});

export default JoinedProgramCard;
