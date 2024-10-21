import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../AuthContext';
import ProfilePage from './ProfilePage';
import Feed from './Feed';
import CreatePost from './CreatePost';
const ProfilePageContainer = () => (
  <View style={styles.page}>
    <ProfilePage />
  </View>
);

const FeedPageContainer = () => (
  <View style={styles.page}>
    <Feed />
  </View>
);

const Home = ({ navigation }) => {
  // const { isLoggedIn, logout } = useAuth();   // TODO: Uncomment this line after connecting with the DB
  const isLoggedIn = true;  // TODO: Comment this line after connecting with the DB
  const [selectedTab, setSelectedTab] = useState('Feed');

  return (
    <View style={styles.appContainer}>
      {!isLoggedIn && (
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Fitness Fact !!</Text>
          {/* Removed fragment <>...</> */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
      {isLoggedIn && (
           <View style={styles.appContainer}>
             <TabList selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
             <View style={styles.content}>
               {selectedTab === 'Profile' && <ProfilePageContainer />}
               {selectedTab === 'Feed' && <FeedPageContainer />}
               {selectedTab === 'CreatePost' && <CreatePost />}
             </View>
           </View>
         )}
    </View>
  );
};

const TabList = ({ selectedTab, setSelectedTab }) => (
     <View style={styles.tabList}>
       <TabItem
         label="Feed"
         isSelected={selectedTab === 'Feed'}
         onPress={() => setSelectedTab('Feed')}
       />
       <TabItem
         label="CreatePost" // Add CreatePost tab
         isSelected={selectedTab === 'CreatePost'}
         onPress={() => setSelectedTab('CreatePost')}
       />
       <TabItem
         label="Profile"
         isSelected={selectedTab === 'Profile'}
         onPress={() => setSelectedTab('Profile')}
       />
     </View>
   );

const TabItem = ({ label, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.tabItem, isSelected && styles.selectedTabItem]}
    onPress={onPress}
  >
    <Text style={[styles.tabItemText, isSelected && styles.selectedTabItemText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabList: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    justifyContent: 'flex-start',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTabItem: {
    backgroundColor: '#007bff',
  },
  tabItemText: {
    fontSize: 16,
  },
  selectedTabItemText: {
    color: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3C3633',
    fontFamily: 'Cursive ',
  },
  button: {
    backgroundColor: '#3C3633',
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Home;
