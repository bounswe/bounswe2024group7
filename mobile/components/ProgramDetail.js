import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

const ProgramDetail = ({ route }) => {
  const { trainerUsername, title, description, exercises, date, participants, navigation  } = route.params;
  /*const {title, description, trainerUsername, exercises} = {
    title: "Full Body Workout",
    description: "This is a comprehensive program targeting all major muscle groups.",
    trainerUsername: "fitness_guru_123",
    exercises: [
      { exercise:{
        name: "Push-Up",
        gifUrl: "https://example.com/push-up.gif",
        bodyPart: "Chest",
        target: "Pectorals",
        equipment: "None",
        secondaryMuscles: "Triceps, Shoulders",
        instructions: "Keep your body straight and lower yourself until your chest is just above the floor.",
      },
      reps:10,
      sets:3
      },
      {
      exercise:{
        name: "Squat",
        gifUrl: "https://example.com/squat.gif",
        bodyPart: "Legs",
        target: "Quadriceps",
        equipment: "None",
        secondaryMuscles: "Glutes, Hamstrings",
        instructions: "Keep your back straight, bend your knees, and lower your hips.",
      },reps:8,
              sets:4
          }
    ],
  }*/
  console.log(participants);
  const [expandedExercise, setExpandedExercise] = useState(null);

  const toggleExerciseDetails = (index) => {
    setExpandedExercise(expandedExercise === index ? null : index);
  };
  const renderParticipant = ({ item, index }) => {
    return(
      <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { username: item })}>
                    <Text style={styles.owner}>{item}</Text>
                  </TouchableOpacity>
    );
  }

  const renderExercise = ({ item, index }) => {
    const isExpanded = expandedExercise === index;

    return (
      <View style={styles.exerciseContainer}>
        {/* Exercise Title */}
        <TouchableOpacity
          style={styles.exerciseHeader}
          onPress={() => toggleExerciseDetails(index)}
        >
          <Text style={styles.exerciseTitle}>{item.exercise.name}</Text>
          <Text style={styles.exerciseTitle}>{item.reps} reps</Text>
          <Text style={styles.exerciseTitle}>{item.sets} sets</Text>
          <Text style={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {/* Exercise Details */}
        {isExpanded && (
          <View style={styles.exerciseDetails}>
            <Image
              source={{ uri: item.exercise.gifUrl }}
              style={styles.exerciseImage}
              resizeMode="contain"
            />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Body Part:</Text> {item.exercise.bodyPart}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Target Muscle:</Text>{' '}
              {item.exercise.target}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Equipment:</Text> {item.exercise.equipment}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Secondary Muscles:</Text>{' '}
              {item.exercise.secondaryMuscles || 'None'}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Instructions:</Text>{' '}
              {item.exercise.instructions || 'No instructions available.'}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.postContainer}>
      {/* Participant Info */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.owner}>{trainerUsername}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    <View style={styles.participantsContainer}>
      <Text style={styles.participantListTitle}>Participants:</Text>
      <FlatList
        data={participants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderParticipant}
        contentContainerStyle={styles.participantsList}
      />
      </View>

      {/* Exercises List */}
      <View style={styles.exercisesContainer}>
      <Text style={styles.exerciseListTitle}>Exercises:</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderExercise}
        contentContainerStyle={styles.exerciseList}
      />
      </View>

      {/* Join Program Button */}

      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join Program</Text>
      </TouchableOpacity>


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
  title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333333',
    },
   owner: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1E90FF',
        marginBottom: 4,
      },
    description: {
      fontSize: 14,
      color: '#555555',
      lineHeight: 20,
    },
  exerciseListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  exerciseList: {
    paddingBottom: 20,
  },
  exercisesContainer:{
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: 15,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      marginBottom: 20
    },
      participantListTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
      },
      participantsList: {
        paddingBottom: 20,
      },
      participantsContainer:{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 15,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 5,
          marginBottom: 20
        },
  exerciseContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },

  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  expandIcon: {
    fontSize: 18,
    color: '#555',
  },
  exerciseDetails: {
    marginTop: 10,
  },
  exerciseImage: {
    width: '100%',
    height: Dimensions.get('window').width * 0.5,
    borderRadius: 10,
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  joinButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProgramDetail;
