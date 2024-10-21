import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import PostCard from './PostCard';

const ProfilePage = () => {
  const navigation = useNavigation();
  //const { user } = useAuth();
  const user = "first";
  // Mock data for posts
  const forumPosts = [
    { id: 1, title: 'Forum Post 1', description: 'Discuss your workout routine.', owner: 'john_doe', labels: ['forum', 'discussion'], likeCount: 20 },
    { id: 2, title: 'Forum Post 2', description: 'Best diet for muscle gain?', owner: 'john_doe', labels: ['forum', 'diet'], likeCount: 15 },
  ];

  const programs = [
    { id: 1, title: 'Powerlifting Program', description: 'A 12-week strength program for powerlifting.', owner: 'john_doe', likeCount: 100 },
    { id: 2, title: 'Hypertrophy Program', description: 'Gain muscle with this 6-week hypertrophy program.', owner: 'john_doe', likeCount: 85 },
  ];

  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
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

      {/* User posts */}
      <Text style={styles.sectionTitle}>Forum Posts</Text>
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

      <Text style={styles.sectionTitle}>Programs</Text>
      <FlatList
        data={programs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            title={item.title}
            owner={item.owner}
            description={item.description}
            likeCount={item.likeCount}
            navigation={navigation}
          />
        )}
        style={styles.postList}
        showsVerticalScrollIndicator={false}
      />
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  postList: {
    marginBottom: 20,
  },
});

export default ProfilePage;
