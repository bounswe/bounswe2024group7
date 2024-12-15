import React, {  useState, useRef } from 'react';
import {Dimensions, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { LineChart, BarChart, PieChart, ProgressChart, StackedBarChart } from "react-native-chart-kit";

const ProgressTracker = ({username}) => {
  const currentDayIndex = 2; // Let's assume today is Monday (index 2)
  const [selectedDay, setSelectedDay] = useState(currentDayIndex); // Default to today

  const days = [
    { name: 'Sat', id: 0 },
    { name: 'Sun', id: 1 },
    { name: 'Mon', id: 2 },
    { name: 'Tues', id: 3 },
    { name: 'Wed', id: 4 },
    { name: 'Thurs', id: 5 },
    { name: 'Fri', id: 6 },
  ];

  // Example progress for each day (in percentages)
  const progressData = [30, 50, 80, 40, 60, 70, 90];

  const ProgressGraph = ({progress}) => {
    const [graphWidth, setGraphWidth] = useState(0);
      const parentViewRef = useRef(null);

      const handleParentLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setGraphWidth(width); // 80% of parent width
      };

      return (
        <View ref={parentViewRef} onLayout={handleParentLayout} style={styles.parentContainer}>
          <LineChart
            data={{
              labels: ["Sat", "Sun", "Mon", "Tues", "Wes", "Thurs", "Fri"],
              datasets: [{ data: progressData }]}}
            width={0.9*Dimensions.get('window').width} // Use the calculated width
            height={200}
            yAxisLabel="%"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 6
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
      );
  }

  const ProgressCircle = ({ progress }) => {
    const radius = 50;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (progress / 100) * circumference;

    return (
      <Svg height="120" width="120" style={styles.progressCircle}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#9b5de5" />
            <Stop offset="100%" stopColor="#00f5d4" />
          </LinearGradient>
        </Defs>
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
        />
      </Svg>
    );
  };

  const DayItem = ({ day, isSelected, progress, onPress }) => {
    const stars = Math.round(progress / 20); // Convert progress to stars (1 star = 20%)
    return (
      <TouchableOpacity onPress={onPress} style={styles.dayContainer}>
        <Text style={[styles.dayText, isSelected && styles.selectedDay]}>{day.name}</Text>
        <View style={styles.starsContainer}>
          {Array.from({ length: 5 }, (_, i) => (
            <Text key={i} style={[styles.star, i < stars && styles.filledStar]}>★</Text>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  const getProgressTitle = () => {
    if (selectedDay === currentDayIndex) {
      return 'Progress Today';
    } else {
      return `Progress on ${days[selectedDay].name}`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>

      <View style={styles.card}>
        <ProgressCircle progress={progressData[selectedDay]} />
        <View style={styles.progressContent}>
          <Text style={styles.progressTitle}>{getProgressTitle()}</Text>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue!</Text>
          </TouchableOpacity>
        </View>
      </View>


      <FlatList
        data={days}
        horizontal
        renderItem={({ item }) => (
          <DayItem
            day={item}
            isSelected={item.id === selectedDay}
            progress={progressData[item.id]}
            onPress={() => setSelectedDay(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.daysList}
      />
      <View style = {styles.graphCard}>
           <Text style={styles.progressTitle}>Weekly Progress</Text>
            <ProgressGraph progress={progressData[selectedDay]} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 30,
  },
  graphCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  progressCircle: {
    marginBottom: 20,
  },
  progressContent: {
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  continueButton: {
    backgroundColor: '#9b5de5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  daysList: {
    marginTop: 20,
    justifyContent: 'center',
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  dayText: {
    fontSize: 14,
    color: '#C0C0C0',
    textAlign: 'center',
  },
  selectedDay: {
    color: '#9b5de5',
    fontWeight: 'bold',
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  star: {
    fontSize: 12,
    color: '#E0E0E0',
    marginHorizontal: 1,
  },
  filledStar: {
    color: '#FFD700', // Gold color for filled stars
  },
  createPostButton: {
    backgroundColor: '#9b5de5',
    position: 'absolute',
    bottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  createPostText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProgressTracker;
