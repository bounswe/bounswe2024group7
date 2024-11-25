import React, { useState, useContext, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import PostCard from './PostCard';
import ProgramCard from './ProgramCard';
import DietCard from './DietCard';
import { UserContext } from "../UserContext";
import { useSelector } from 'react-redux';
import { userName, userProfile, userSessionToken } from '../user.js';
import { useQuery } from "@tanstack/react-query"
import apiInstance from '../Api';

const ProfilePage = ({ darkMode }) => {
  const username = useSelector(userName);
  const sessionToken = useSelector(userSessionToken);
  console.log(sessionToken);
  const profile = useSelector(userProfile);
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);

  const [following, setFollowing] = useState([]);

  
  //const [programs, setPrograms] = useState([])
  //const { user, followers, following, posts } = useContext(UserContext);
  const {
    data: profileData,
    isFetching: profileIsFetching,
    isLoading: profileIsLoading,
} = useQuery({
    queryKey: ['user',sessionToken],
    queryFn: async () => {
      try{
        const response = await apiInstance(sessionToken).get(`api/user/${username}`);

        return response.data;
      }catch (error) {
        console.error('Error fetching posts:', error);
        throw error; // Re-throw the error to trigger error handling in useQuery
      }

    },
    refetchOnWindowFocus: false,
    refetchInterval:60000
});

const {
  data: postsData,
  isFetching: postsIsFetching,
  isLoading: postsIsLoading,
} = useQuery({
  queryKey: ['posts',sessionToken],
  queryFn: async () => {
    try{
      const response = await apiInstance(sessionToken).get(`api/posts/user/${username}`);

      return response.data;
    }catch (error) {
      console.error('Error fetching posts:', error);
      throw error; // Re-throw the error to trigger error handling in useQuery
    }

  },
  refetchOnWindowFocus: false,
  refetchInterval:60000
});
const {
  data: followersData,
  isFetching: followersIsFetching,
  isLoading: followersIsLoading,
} = useQuery({
  queryKey: ['followers'],
  queryFn: async () => {
      try {
          const response = await apiInstance(sessionToken).get(`api/user/${username}/followers`)

          return response.data
      } catch (error) {
          return []
      }
  },
  refetchOnWindowFocus: false,
  refetchInterval:60000
})

const {
  data: followingData,
  isFetching: followingIsFetching,
  isLoading: followingIsLoading,
} = useQuery({
  queryKey: ['following'],
  queryFn: async () => {
      try {
          const response = await apiInstance(sessionToken).get(`api/user/${username}/following`)

          return response.data
      } catch (error) {
          return []
      }
  },
  refetchOnWindowFocus: false,
  refetchInterval:60000
})
/*const {
  data: programsData,
  isFetching: programsIsFetching,
  isLoading: programsIsLoading,
} = useQuery({
  queryKey: ['programs'],
  queryFn: async () => {
      try {
          const response = await apiInstance(token).get(`api/training-programs/trainer/${username}`)

          return response.data
      } catch (error) {
          return []
      }
  },
  refetchOnWindowFocus: false,
})*/
/*useEffect(() => {
  if (programsData && !programsIsFetching) {
      setPrograms(programsData)
  }
}, [programsData, programsIsFetching])*/

useEffect(() => {
  if (profileData && !profileIsFetching) {
    const sanitizedProfile = JSON.parse(JSON.stringify(profileData)); // Deep clone to remove non-serializable values
    setUser(sanitizedProfile);
    console.log(user);

  }
}, [profileData, profileIsFetching])
useEffect(() => {
  if (postsData && !postsIsFetching) setPosts(postsData);
  console.log(posts);

}, [postsData, postsIsFetching]);
useEffect(() => {
  if (followersData && !followersIsFetching) setFollowers(followersData);
  console.log(followers);
}, [followersData, followersIsFetching]);

useEffect(() => {
  if (followingData && !followingIsFetching) setFollowing(followingData);
  console.log(following);

}, [followingData, followingIsFetching]);


  console.log(username);
  console.log(profile);
  
  

  const styles = darkMode ? darkStyles : lightStyles;
  const navigation = useNavigation();
  //const { user } = useAuth();

  // Mock data for posts
  const forumPosts = [
    { id: 1, title: 'Forum Post 1', description: 'Discuss your workout routine.', owner: 'john_doe', date: '14.11.2024',commentList: [
                                                                                                                                          { id: '1', user: 'jshine1337', text: 'Nope, that’s not a concept...' },
                                                                                                                                          { id: '2', user: 'sqlpro23', text: 'You could try batching your statements!' },
                                                                                                                                        ], labels: ['forum', 'discussion'], likeCount: 20 },
    { id: 2, title: 'Forum Post 2', description: 'Best diet for muscle gain?', owner: 'jane_doe', labels: ['forum', 'diet'], date: '13.11.2024',commentList: [
                                                                                                                                                                  { id: '1', user: 'jshine1337', text: 'Nope, that’s not a concept...' },
                                                                                                                                                                  { id: '2', user: 'sqlpro23', text: 'You could try batching your statements!' },
                                                                                                                                                                ], likeCount: 15 },
  ];

  const programs = [
      { id: 1, title: "Full Body Workout",
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
                   ]},
       { id: 2, title: "Full Body Workout",
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
                    ]}

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
      /*return (
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
              commentList={item.commentList}
              date={item.date}
              navigation={navigation}
            />
          )}
          style={styles.postList}
          showsVerticalScrollIndicator={false}
        />
      );*/
      return(<FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            title={item.title}
            owner={item.username}
            description={item.content}
            labels={item.tags}
            likeCount={item.likeCount}
            commentList={forumPosts[0].commentList}
            date={item.createdAt}
            navigation={navigation}
          />
        )}
        style={styles.postList}
        showsVerticalScrollIndicator={false}
      />);
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
                participants= {item.participants}
                date = {item.createdAt}
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
            <Text style={styles.statNumber}>{followers.length}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.statNumber}>{following.length}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
        {/*<TouchableOpacity style={styles.followButton} onPress={handleFollowToggle}>
          <Text style={styles.followButtonText}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>*/}
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
          <Text style={[styles.tabText, selectedTab === 'programs' && styles.activeTabText]}>Training</Text>
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

// Define styles for the profile page
const lightStyles = StyleSheet.create({
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

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#111827',
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
    color: '#F9FAFB',
    fontFamily: 'sans-serif',
  },
  profileUsername: {
    fontSize: 16,
    color: '#F9FAFB',
    fontFamily: 'sans-serif',
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
    color: '#F9FAFB',
    fontFamily: 'sans-serif',
  },
  statLabel: {
    fontSize: 14,
    color: '#F9FAFB',
    fontFamily: 'sans-serif',
  },
  followButton: {
    backgroundColor: '#6366F1',
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
    borderBottomColor: '#444',
  },
  tabItem: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FBBF24',
  },
  tabText: {
    fontSize: 16,
    color: '#A0AEC0',
    fontFamily: 'sans-serif',
  },
  activeTabText: {
    color: '#FBBF24',
    fontFamily: 'sans-serif',
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
