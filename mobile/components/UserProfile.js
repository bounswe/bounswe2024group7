import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PostCard from './PostCard'; // Import your PostCard component
import ProgramCard from './ProgramCard'; // Import your ProgramCard component
import DietCard from './DietCard';

const UserProfile = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params; // Get username from route params

  // Static mock data for the user's profile
  const forumPosts = [
    { id: 1, title: 'Forum Post 1', description: 'Discuss your workout routine.', owner: username, labels: ['forum', 'discussion'], likeCount: 20 },
    { id: 2, title: 'Forum Post 2', description: 'Best diet for muscle gain?', owner: username, labels: ['forum', 'diet'], likeCount: 15 },
  ];

  const programs = [
      { id: 1, title: 'Full Body Program', description: 'A 12-week strength program for powerlifting.', trainerUsername: 'trainer_john', exercises: ['Bicep Curls', 'Deadlift']},
       { id: 2, title: 'Leg Program', description: 'An 8-week strength program for leg.', trainerUsername: 'trainer_john', exercises: ['Bicep Curls', 'Deadlift']},

    ];
const diet_programs = [
        { id: 1, title: 'Gluten-free Diet Program', description: 'A protein based gluten-free diet.', owner: 'dietician_john', followCount: 100, category: 'gluten-free', nutrition_list: ['180 g fat', '300 g protein'], weeklySchedule: {
      Monday: ['Egg', 'Squats', 'Turkey', 'Orange'],
      Tuesday: ['Avocado Toast', 'Grilled Chicken', 'Deadlift', 'Kefir'],
      Wednesday: ['Pancakes', 'Meatballs', 'Beef Steak', 'Pineapple'],
      Thursday: ['Olive', 'Rice', 'Manti', 'Turkish Yoghurt'],
      Friday: ['Kashar Cheese', 'Broccoli', 'Lentil', 'Apple'],
      Saturday: ['Cottage Cheese', 'Pasta', 'Falafel', 'Banana'],
      Sunday: ['Cucumber', 'Tuna Salad', 'Mushroom', 'Ayran']
    }},
        { id: 2, title: 'My Diet Program', description: 'Vitamin rich diet program.', owner: 'dietician_jane', followCount: 85, category: 'vitamin-rich', nutrition_list: ['120g protein', '200g fat', '230g carbonhydrate'], weeklySchedule: {
          Monday: ['Egg', 'Squats', 'Turkey', 'Orange'],
              Tuesday: ['Avocado Toast', 'Grilled Chicken', 'Deadlift', 'Kefir'],
              Wednesday: ['Pancakes', 'Meatballs', 'Beef Steak', 'Pineapple'],
              Thursday: ['Olive', 'Rice', 'Manti', 'Turkish Yoghurt'],
              Friday: ['Kashar Cheese', 'Broccoli', 'Lentil', 'Apple'],
              Saturday: ['Cottage Cheese', 'Pasta', 'Falafel', 'Banana'],
              Sunday: ['Cucumber', 'Tuna Salad', 'Mushroom', 'Ayran']
            }},
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
              commentCount={item.commentCount}
              date={item.date}
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
                            description={item.description}
                            trainerUsername={item.trainerUsername}
                            exercises={item.exercises}
                            navigation = {navigation}
            />
          )}
          style={styles.postList}
          showsVerticalScrollIndicator={false}
        />
      );
    }
    else if (selectedTab === 'diet') {
                  return (
                    <FlatList
                      data={diet_programs}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <DietCard
                          title={item.title}
                          description={item.description}
                          owner={item.owner}
                          followCount={item.followCount}
                          category={item.category}
                          nutrition_list={item.nutrition_list}
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
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Mock profile image
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{username}</Text>
        <Text style={styles.profileUsername}>@{username}</Text>
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
        <TouchableOpacity
                          style={[styles.tabItem, selectedTab === 'diet' && styles.activeTab]}
                          onPress={() => setSelectedTab('diet')}
                        >
                          <Text style={[styles.tabText, selectedTab === 'diet' && styles.activeTabText]}>Diet</Text>
                        </TouchableOpacity>
      </View>

      {/* Display content based on selected tab */}
      <View style={styles.contentContainer}>
        {renderPosts()}
      </View>
    </View>
  );
};

// Define styles for the user profile
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

export default UserProfile;
