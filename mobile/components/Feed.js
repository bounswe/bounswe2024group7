import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import PostCard from './PostCard';
import DietCard from './DietCard';
import ProgramCard from './ProgramCard';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { userPassword, userProfile, userSessionToken } from '../user.js';
import { useQuery } from "@tanstack/react-query"
import apiInstance from '../Api';



const FeedPage = ({ darkMode }) => {
  const styles = darkMode ? darkStyles : lightStyles;
  const navigation = useNavigation();
  const [posts, setPosts] = useState([])
  const [programs, setPrograms] = useState([])


    const profile = useSelector(userProfile)
    const password = useSelector(userPassword)
    const sessionToken = useSelector(userSessionToken)


    const {
        data: postsData,
        isFetching: postsIsFetching,
        isLoading: postsIsLoading,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
          try{
            const response = await apiInstance().get('api/posts/random')

            return response.data
          }
            catch (error) {
              console.error('Error fetching posts:', error);
              throw error; // Re-throw the error to trigger error handling in useQuery
            }
        },
        refetchOnWindowFocus:false,
        refetchInterval:60000,
    })

    const {
        data: programsData,
        isFetching: programsIsFetching,
        isLoading: programsIsLoading,
    } = useQuery({
        queryKey: ['training-programs'],
        queryFn: async () => {
            const response = await apiInstance().get('api/training-programs')

            return response.data
        },
        refetchOnWindowFocus:false,
        refetchInterval:60000,
    })

    useEffect(() => {
        if (postsData && !postsIsFetching) {
            setPosts(postsData)
            console.log(posts);
        }
    }, [postsData, postsIsFetching])

    useEffect(() => {
        if (programsData && !programsIsFetching) {
            setPrograms(programsData)
            console.log(programs);

        }
    }, [programsData, programsIsFetching])
  // Mock data for forum posts and programs
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

  /*const programs = [
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

  ];*/

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

  const [selectedTab, setSelectedTab] = useState('forum'); // To track the selected tab

  // Function to render posts or programs based on the selected tab
  const renderContent = () => {
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
          showsVerticalScrollIndicator={false}
        />
      );*/
      return(
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            post_id={item.id}
            title={item.title}
            owner={item.username}
            description={item.content}
            labels={item.tags}
            liked={item.liked}
            likeCount={item.likeCount}
            commentList={forumPosts[0].commentList}
            date={item.createdAt}
            navigation={navigation}
          />
        )}
        style={styles.postList}
        showsVerticalScrollIndicator={false}
      />

    );} else if (selectedTab === 'training') {
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
              participants = {item.participants}
              date = {item.createdAt}
              navigation = {navigation}

            />
          )}
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
      {/* Tabs for Forum Posts and Programs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'forum' && styles.activeTab]}
          onPress={() => setSelectedTab('forum')}
        >
          <Text style={[styles.tabText, selectedTab === 'forum' && styles.activeTabText]}>Forum Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'training' && styles.activeTab]}
          onPress={() => setSelectedTab('training')}
        >
          <Text style={[styles.tabText, selectedTab === 'training' && styles.activeTabText]}>Training</Text>
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
