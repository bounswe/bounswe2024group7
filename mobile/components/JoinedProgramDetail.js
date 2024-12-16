import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useSelector } from 'react-redux';
import { userName,userSessionToken } from '../user.js';
import { useQuery } from "@tanstack/react-query";
import apiInstance from '../Api';
import Toast from 'react-native-toast-message'

//POST /api/training-programs/{trainingProgramId}/rate?userId={userId}&rating={rating}




const JoinedProgramDetail = ({ route }) => {
  const {
    trainerUsername,
    completion,
    trackingId,
    title,
    description,
    programId,
    weeks,
    rating,
    level,
    date,
    participants,
    navigation,
  } = route.params;



  const [userRating, setUserRating] = useState(rating || 0);
  const [isRated, setIsRated] = useState(false);
  const sessionToken = useSelector(userSessionToken);
  const username = useSelector(userName);


  const handleRating = async (rt) => {
    setUserRating(rt);
    try {
      console.log("Rating is: "+rt);
      const response = await apiInstance(sessionToken).post(`api/training-programs/${programId}/rate?rating=${rt}`, {
        
      });
      console.log("Rating response is:");
      console.log(response);

      if (Math.floor(response.status/100) == 2) {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Program Rated',
          text2: 'Your rating has been sent successfully.',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40
        });
      }
    } catch (e) {
      //console.log(e)
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Rating Error',
        text2: 'Network error.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40
      });    }
  };

  const renderWeek = ({ item, index }) => {
    const workoutCount = item.workouts.length;
    return (
      <View style={styles.weekContainer}>
        <Text style={styles.weekTitle}>Week {index + 1}</Text>
        <Text style={styles.workoutCount}>{workoutCount} Workouts</Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            navigation.navigate("JoinedWeek", {
              programId,
              trackingId,
              programTitle: title,
              weekId: item.id,
              weekNumber: item.weekNumber,
              workouts: item.workouts,
              navigation: navigation,
            });
          }}
        >
          <Text style={styles.startButtonText}>Start Workout</Text>
        </TouchableOpacity>
        <Text style={styles.completionText}>
          %{Object.keys(completion).length > 0 ? completion[`${item.id}`] : 0}
        </Text>
      </View>
    );
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => {
            handleRating(i);
            setIsRated(true);
          }}
        >
          <Text style={i <= userRating ? styles.filledStar : styles.emptyStar}>★</Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.level}>Level: {level}</Text>
        <Text style={styles.type}>Type: BODY_BUILDING</Text>
        <Text style={styles.trainer}>Trainer: {trainerUsername}</Text>
        <Text style={styles.date}>Created @ {date}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>{isRated ? "Your Rating" : "Average Rating"}</Text>
        <View style={styles.starsContainer}>{renderStars()}</View>
        {/*<Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={5}
          step={1}
          value={userRating}
          onValueChange={(value) => {
            handleRating(value);
            setIsRated(true);
          }}
        />*/}
        <Text style={styles.sliderValue}>{userRating} / 5</Text>
      </View>

      <FlatList
        data={weeks}
        renderItem={renderWeek}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity style={styles.commitButton}>
        <Text style={styles.commitButtonText}>Commit to Program</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.detailButton}
        onPress={() =>
          navigation.navigate("WorkoutDetails", { weeks, navigation })
        }
      >
        <Text style={styles.detailButtonText}>Show Detailed Description</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  level: {
    fontSize: 14,
    color: 'orange',
  },
  type: {
    fontSize: 14,
    color: 'blue',
  },
  trainer: {
    fontSize: 14,
    color: 'red',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
  },
  ratingContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  ratingLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  filledStar: {
    fontSize: 24,
    color: 'gold',
    marginHorizontal: 4,
  },
  emptyStar: {
    fontSize: 24,
    color: 'gray',
    marginHorizontal: 4,
  },
  slider: {
    width: '80%',
    height: 40,
  },
  sliderValue: {
    fontSize: 16,
    marginTop: 8,
  },
  weekContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weekTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutCount: {
    fontSize: 14,
    color: 'gray',
  },
  startButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  completionText: {
    fontSize: 14,
    color: 'green',
  },
  commitButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  commitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailButton: {
    backgroundColor: 'gray',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  detailButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default JoinedProgramDetail;
