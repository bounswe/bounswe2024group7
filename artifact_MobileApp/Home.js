import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity  } from 'react-native';
import { useAuth } from './AuthContext';
import Feed from './Feed';
import SearchPage from './SearchPage';
import ProfilePage from './ProfilePage';

// import SearchBar from './SearchBar'; 
const FeedPageContainer = () => (
  <View style={styles.page}>
    <Feed/>
  </View>
);

const SearchPageContainer = () => (
  <View style={styles.page}>
    <SearchPage/>
  </View>
);

const ProfilePageContainer = () => (
  <View style={styles.page}>
    <ProfilePage/>
  </View>
);
const Home = ({ navigation }) => {
  const { isLoggedIn, logout } = useAuth();
  // const isLoggedIn = true; 
  const [selectedTab, setSelectedTab] = useState('Feed');

  return (
    <><>
      {/*<><View style={styles.container}>
      <Text style={styles.title}> Welcome to Artifact !!</Text>

      {!isLoggedIn && (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Go to Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>Go to SignUp</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SearchPage')}>
        <Text style={styles.buttonText}>Continue as a Guest</Text>
      </TouchableOpacity>
      {isLoggedIn && (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              logout();
              navigation.navigate('Login');
            } }>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('ProfilePage');
            } }>
            <Text style={styles.buttonText}>Profile Page</Text>
          </TouchableOpacity>
        </>
      )}
    </View>*/}</>
      {!isLoggedIn && (
        <View style={styles.container}>
        <Text style={styles.title}> Welcome to Artifact !!</Text>
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Go to Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>Go to SignUp</Text>
          </TouchableOpacity>
        </>
        </View>
      )}
      {isLoggedIn&&(
        <View style={styles.appContainer}>
          <View style={styles.content}>
        {selectedTab === 'Feed' && <FeedPageContainer />}
        {selectedTab === 'Search' && <SearchPageContainer />}
        {selectedTab === 'Profile' && <ProfilePageContainer />}
        </View>
        <TabList selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </View>
      )

      }</>
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
      label="Search"
      isSelected={selectedTab === 'Search'}
      onPress={() => setSelectedTab('Search')}
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
    input: {
      width: '80%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 10,
      paddingHorizontal: 10,
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
