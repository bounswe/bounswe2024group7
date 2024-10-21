import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import PostCard from './PostCard';
import ProgramCard from './ProgramCard';

const ProfilePage = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  // Mock data for posts
  const forumPosts = [
    { id: 1, title: 'Forum Post 1', description: 'Discuss your workout routine.', owner: 'john_doe', labels: ['forum', 'discussion'], likeCount: 20 },
    { id: 2, title: 'Forum Post 2', description: 'Best diet for muscle gain?', owner: 'john_doe', labels: ['forum', 'diet'], likeCount: 15 },
  ];

  const programs = [
    { id: 1, title: 'Powerlifting Program', description: 'A 12-week strength program for powerlifting.', owner: 'john_doe', followCount: 100, location: 'outdoor', muscle_list: ['chest','shoulder'], weeklySchedule: {
                                                                                                                                                                                                                          Monday: ['Push-ups', 'Squats', 'Plank'],
                                                                                                                                                                                                                          Tuesday: ['Pull-ups', 'Leg Press', 'Deadlift'],
                                                                                                                                                                                                                          Wednesday: ['Rest Day'],
                                                                                                                                                                                                                          Thursday: ['Bench Press', 'Rows', 'Bicep Curls'],
                                                                                                                                                                                                                          Friday: ['Overhead Press', 'Lunges', 'Lat Pulldown'],
                                                                                                                                                                                                                          Saturday: ['Cardio', 'Abs Workout'],
                                                                                                                                                                                                                          Sunday: ['Rest Day']
                                                                                                                                                                                                                        } },
    { id: 2, title: 'Hypertrophy Program', description: 'Gain muscle with this 6-week hypertrophy program.', owner: 'john_doe', followCount: 85, location: 'gym',muscle_list: ['leg'], weeklySchedule: {
                                                                                                                                                                                                                                                                                                                                                                                                               Monday: ['Push-ups', 'Squats', 'Plank'],
                                                                                                                                                                                                                                                                                                                                                                                                               Tuesday: ['Pull-ups', 'Lunges', 'Deadlift'],
                                                                                                                                                                                                                                                                                                                                                                                                               Wednesday: ['Rest Day'],
                                                                                                                                                                                                                                                                                                                                                                                                               Thursday: ['Bench Press', 'Rows', 'Bicep Curls'],
                                                                                                                                                                                                                                                                                                                                                                                                               Friday: ['Overhead Press', 'Leg Press', 'Lat Pulldown'],
                                                                                                                                                                                                                                                                                                                                                                                                               Saturday: ['Cardio', 'Abs Workout'],
                                                                                                                                                                                                                                                                                                                                                                                                               Sunday: ['Rest Day']
                                                                                                                                                                                                                                                                                                                                                                                                             } },
  ];

  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('forum'); // To track the selected tab

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const renderPosts = () => {
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
          style={styles.postList}
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
              owner={item.owner}
              description={item.description}
              followCount={item.followCount}
              location={item.location}
              muscle_list={item.muscle_list}
              weeklySchedule = {item.weeklySchedule}
              navigation={navigation}
            />
          )}
          style={styles.postList}
          showsVerticalScrollIndicator={false}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Mock profile image
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user}</Text>
        <Text style={styles.profileUsername}>@{user}</Text>
        <View style={styles.badgesContainer}>
          <View style={styles.statContainer}>
            <Text style={styles.statNumber}>150</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.statNumber}>200</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.followButton} onPress={handleFollowToggle}>
          <Text style={styles.followButtonText}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>

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
        {renderPosts()}
      </View>
    </View>
  );
};

// Define styles for the profile page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  statContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
  followButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  followButtonText: {
    color: 'white',
    fontSize: 16,
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
  postList: {
    marginTop: 10,
  },
});

export default ProfilePage;
