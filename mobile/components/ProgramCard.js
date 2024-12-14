import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { userName, userSessionToken } from '../user.js';
import { useQuery } from "@tanstack/react-query"
import apiInstance from '../Api';
const ProgramCard = ({ trainerUsername, title, description, programId, weeks, rating, level, joined, date, participants, navigation }) => {

    const [isJoined, setIsJoined] = useState(false);
    const sessionToken = useSelector(userSessionToken)
    const username = useSelector(userName)
    console.log(username);
    const {
            data: joinedData,
            isFetching: programsIsFetching,
            isLoading: programsIsLoading,
        } = useQuery({
            queryKey: ['joined-training-program'],
            queryFn: async () => {
                const response = await apiInstance().get(`api/training-programs/joined/${username}`)
                console.log(response);
                return response.data
            },
            refetchInterval:60000,
        })
        useEffect(() => {
            if (joinedData && !programsIsFetching) {
                setIsJoined(joinedData.some((program)=>{return program.id == programId}))
            }
        }, [joinedData, programsIsFetching])
  return (
    <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ProgramDetail', { trainerUsername, joined:isJoined, title, description, programId, weeks, rating, level, date, participants, navigation })}
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

export default ProgramCard;
