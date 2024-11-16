import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import PostCard from './PostCard';
import ProgramCard from './ProgramCard';
import { useNavigation } from '@react-navigation/native';

const FeedPage = ({ darkMode }) => {
  const styles = darkMode ? darkStyles : lightStyles;
  const navigation = useNavigation();

  // Mock data for forum posts and programs
  const forumPosts = [
    { id: 1, title: 'Forum Post 1', description: 'Discuss your workout routine.', owner: 'john_doe', date: '14.11.2024',commentCount: 2, labels: ['forum', 'discussion'], likeCount: 20 },
    { id: 2, title: 'Forum Post 2', description: 'Best diet for muscle gain?', owner: 'jane_doe', labels: ['forum', 'diet'], date: '13.11.2024',commentCount: 1, likeCount: 15 },
  ];

  const programs = [
    { id: 1, title: 'Powerlifting Program', description: 'A 12-week strength program for powerlifting.', owner: 'trainer_john', followCount: 100, location: 'Gym A', muscle_list: ['Legs', 'Back'], weeklySchedule: {
      Monday: ['Push-ups', 'Squats', 'Plank'],
      Tuesday: ['Pull-ups', 'Lunges', 'Deadlift'],
      Wednesday: ['Rest Day'],
      Thursday: ['Bench Press', 'Rows', 'Bicep Curls'],
      Friday: ['Overhead Press', 'Leg Press', 'Lat Pulldown'],
      Saturday: ['Cardio', 'Abs Workout'],
      Sunday: ['Rest Day']
    }},
    { id: 2, title: 'Hypertrophy Program', description: 'Gain muscle with this 6-week hypertrophy program.', owner: 'trainer_jane', followCount: 85, location: 'Gym B', muscle_list: ['Arms', 'Chest'], weeklySchedule: {
      Monday: ['Push-ups', 'Squats', 'Plank'],
      Tuesday: ['Pull-ups', 'Lunges', 'Deadlift'],
      Wednesday: ['Rest Day'],
      Thursday: ['Bench Press', 'Rows', 'Bicep Curls'],
      Friday: ['Overhead Press', 'Leg Press', 'Lat Pulldown'],
      Saturday: ['Cardio', 'Abs Workout'],
      Sunday: ['Rest Day']
    }},
  ];

  const [selectedTab, setSelectedTab] = useState('forum'); // To track the selected tab

  // Function to render posts or programs based on the selected tab
  const renderContent = () => {
    if (selectedTab === 'forum') {
      return (
        <FlatList
          data={forumPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PostCard
              title={item.title}
              owner={item.owner}
              description={item.description}
              labels={item.labels}
              likeCount={item.likeCount}
              navigation={navigation}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      );
    } else if (selectedTab === 'programs') {
      return (
        <FlatList
          data={programs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProgramCard
              title={item.title}
              description={item.description}
              owner={item.owner}
              followCount={item.followCount}
              location={item.location}
              muscle_list={item.muscle_list}
              weeklySchedule={item.weeklySchedule}
              navigation={navigation}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Tabs for Forum Posts and Programs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'forum' && styles.activeTab]}
          onPress={() => setSelectedTab('forum')}
        >
          <Text style={[styles.tabText, selectedTab === 'forum' && styles.activeTabText]}>Forum Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'programs' && styles.activeTab]}
          onPress={() => setSelectedTab('programs')}
        >
          <Text style={[styles.tabText, selectedTab === 'programs' && styles.activeTabText]}>Programs</Text>
        </TouchableOpacity>
      </View>

      {/* Display content based on selected tab */}
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </View>
  );
};

// Define styles for the feed page
const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabItem: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    color: 'gray',
  },
  activeTabText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#111827', // Dark background color
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444', // Darker border color
  },
  tabItem: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FBBF24', // Accent color for active tab
  },
  tabText: {
    fontSize: 16,
    color: '#A0AEC0', // Lighter text color
  },
  activeTabText: {
    color: '#FBBF24', // Accent color for active tab text
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
});

export default FeedPage;
