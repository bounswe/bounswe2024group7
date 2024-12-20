import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PostCard from './PostCard'; // Import your PostCard component
import ProgramCard from './ProgramCard'; // Import your ProgramCard component
import DietCard from './DietCard';
import { useSelector } from 'react-redux';
import { userName, userProfile, userSessionToken } from '../user.js';
import { useQuery } from "@tanstack/react-query"
import apiInstance from '../Api';
import Toast from 'react-native-toast-message';


const UserProfile = ({ route}) => {
  const sessionToken = useSelector(userSessionToken);
  //console.log(sessionToken);
  const navigation = useNavigation();
  const { username } = route.params; // Get username from route params

  // Static mock data for the user's profile
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

    const fetchJoinedPrograms = async (userJoinedData) => {
      const programArr = [];

      console.log(userJoinedData);

      for (const item of userJoinedData) {
        try {
          const response = await apiInstance().get(`api/training-programs/${item.id}`);
          if (response.status === 200) {
            const currentProgram = response.data;
            programArr.push(currentProgram);
          }
        } catch (e) {
          console.log(e);
        }
      }

      setPrograms(programArr);
      return programArr;
    };


    const {
                data: userJoinedData,
                isFetching: programsIsFetching,
                isLoading: programsIsLoading,
            } = useQuery({
                queryKey: ['user-joined-training-program'],
                queryFn: async () => {
                    const response = await apiInstance().get(`api/training-programs/joined/${username}`)
                    console.log(response);
                    return response.data
                },
                refetchInterval:30000,
            })
            useEffect(() => {
                if(userJoinedData && !programsIsFetching){
                    programArr = fetchJoinedPrograms(userJoinedData);
                    setPrograms(programArr);
                }
            }, [userJoinedData, programsIsFetching])


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
  const ownUsername = useSelector(userName);
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([]);
  const [programs, setPrograms] = useState([]);

  const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('forum'); // To track the selected tab


const {
    data: profileData,
    isFetching: profileIsFetching,
    isLoading: profileIsLoading,
} = useQuery({
    queryKey: ['user',sessionToken],
    queryFn: async () => {
      try{
        const response = await apiInstance(sessionToken).get(`api/user/${username}`);
        console.log("User response data: "+response.data)
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
  refetchInterval:1000
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

useEffect(() => {
  if (profileData && !profileIsFetching) {
    const sanitizedProfile = JSON.parse(JSON.stringify(profileData)); // Deep clone to remove non-serializable values
    setUser(sanitizedProfile);
    //console.log(user);

  }
}, [profileData, profileIsFetching])
useEffect(() => {
  if (postsData && !postsIsFetching) setPosts(postsData);
  //console.log(posts);

}, [postsData, postsIsFetching]);
useEffect(() => {
  if (followersData && !followersIsFetching) setFollowers(followersData);
  //console.log(followers);
}, [followersData, followersIsFetching, isFollowing]);

useEffect(() => {
  if (followingData && !followingIsFetching) setFollowing(followingData);
  //console.log(following);

}, [followingData, followingIsFetching]);
  /*const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };*/

  const {
      data: ownFollowingData,
      isFetching: ownFollowingIsFetching,
      isLoading: ownFollowingIsLoading,
    } = useQuery({
      queryKey: ['ownfollowing'],
      queryFn: async () => {
          try {
              const response = await apiInstance(sessionToken).get(`api/user/${ownUsername}/following`)

              return response.data
          } catch (error) {
              return []
          }
      },
      refetchOnWindowFocus: false
    })
    useEffect(() => {
      if (ownFollowingData && !ownFollowingIsFetching) {
        ownFollowingData.includes(username)?setIsFollowing(true):setIsFollowing(false);
      }


    }, [ownFollowingData, ownFollowingIsFetching]);



  const handleFollowToggle = async() => {
      const response = await apiInstance(sessionToken).post(`api/user/${username}/follow`, {

        })
          console.log('Follow response : '+response)

        if (response.status === 200) {

          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'User Followed',
            text2: 'User followed successfully.',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40
          });
          //goHome();

          //Cookies.set("username", username)
      } else {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Follow Error',
          text2: 'There was an error following the user. Please try again.',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40
        });
      }
      setIsFollowing(true);

    };

    const handleUnfollowToggle = async() => {
        const response = await apiInstance(sessionToken).delete(`api/user/${username}/follow`, {

          })
            console.log(response)

          if (response.status === 200) {

            Toast.show({
              type: 'success',
              position: 'bottom',
              text1: 'User Unfollowed',
              text2: 'User unfollowed successfully.',
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40
            });
            //goHome();

            //Cookies.set("username", username)
        } else {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Unfollow Error',
            text2: 'There was an error unfollowing the user. Please try again.',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40
          });
        }
        setIsFollowing(false);

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
            description={item.content}
                        owner={item.username}
                        tags={item.tags}
                        liked={item.liked}
                        likeCount={item.likeCount}
                        imageUrl = {item.imageUrl}
                        commentList={forumPosts[0].commentList}
                        date={item.createdAt}
                        navigation={navigation}
                        post_id={item.id}
                        program_id={item.trainingProgram.id}
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
                                            trainerUsername={item.trainer}
                                            weeks={item.weeks}
                                            participants = {item.participants}
                                            date = {item.createdAt}
                                            level = {item.level}
                                            type = {item.type}
                                            interval = {item.interval}
                                            rating = {item.rating}
                                            navigation = {navigation}
                                            programId = {item.id}
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
            source={{ uri: 'https://example.com/push-up.gif' }} // Mock profile image
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
          <TouchableOpacity style={styles.followButton} onPress={isFollowing?handleUnfollowToggle:handleFollowToggle}>
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
