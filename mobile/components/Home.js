import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Switch } from 'react-native';
import { useAuth } from '../AuthContext';
import { useUser } from '../UserContext';
import { useSelector } from "react-redux";
import ProfilePage from './ProfilePage';
import Feed from './Feed';
import CreatePost from './CreatePost';
import CreateProgram from './CreateProgram';
import Create from './Create';
import SearchResults from './SearchResults';
import { isLoggedIn } from '../user';




const Home = ({ navigation }) => {
  //const { isLoggedIn, logout } = useAuth();
  const {logout} = useAuth();
  //const {isLoggedIn} = useUser();
  const LoggedIn = useSelector(isLoggedIn);
  //const isLoggedIn = true;
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('Feed');
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const currentStyles = darkMode ? darkStyles : lightStyles;

  const ProfilePageContainer = () => (
    <View style={currentStyles.page}>
      <ProfilePage darkMode={darkMode}/>
    </View>
  );

  const FeedPageContainer = () => (
    <View style={currentStyles.page}>
      <Feed darkMode={darkMode}/>
    </View>
  );

  const SearchPageContainer = () => (
      <View style={currentStyles.page}>
        <SearchResults/>
      </View>
    );

  // Apply styles based on dark mode

  return (
    <View style={currentStyles.appContainer}>
      {!LoggedIn && (
        <View style={currentStyles.container}>
          <Text style={currentStyles.title}>Welcome to Fitness Fact !!</Text>
          <TouchableOpacity
            style={currentStyles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={currentStyles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={currentStyles.buttonSecondary}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={currentStyles.buttonTextSecondary}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}

      {LoggedIn && (
        <View style={currentStyles.appContainer}>
          {/* Header with Profile Picture and Dark Mode Toggle */}
          <View style={currentStyles.header}>
            <TouchableOpacity
              style={currentStyles.profilePictureContainer}
              onPress={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <Image
                source={{ uri: 'https://via.placeholder.com/50' }} // Replace with user's profile picture URL
                style={currentStyles.profilePicture}
              />
            </TouchableOpacity>

            {/* Dark Mode Toggle Switch */}
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              thumbColor={darkMode ? '#FBBF24' : '#4F46E5'}
              trackColor={{ false: '#E5E7EB', true: '#374151' }}
              style={currentStyles.darkModeSwitch}
            />

            {/* Dropdown Menu */}
            {isProfileMenuOpen && (
              <View style={currentStyles.profileMenu}>
                <TouchableOpacity
                  style={currentStyles.profileMenuItem}
                  onPress={() => {
                    setSelectedPage('Profile');
                    setIsProfileMenuOpen(false);
                  }}
                >
                  <Text style={currentStyles.profileMenuItemText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={currentStyles.profileMenuItem}
                  onPress={() => {
                    setSelectedPage('Feed');
                    setIsProfileMenuOpen(false);
                  }}
                >
                  <Text style={currentStyles.profileMenuItemText}>Feed</Text>
                </TouchableOpacity>
                <TouchableOpacity

                                  style={currentStyles.profileMenuItem}
                                  onPress={() => {
                                    setSelectedPage('Search');
                                    setIsProfileMenuOpen(false);
                                  }}
                                >
                <Text style={currentStyles.profileMenuItemText}>Search</Text>
                                </TouchableOpacity>
                <TouchableOpacity

                  style={currentStyles.profileMenuItem}
                  onPress={logout}
                >
                  <Text style={currentStyles.profileMenuItemText}>Logout</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Main Content */}
          <View style={currentStyles.content}>
            {selectedPage === 'Profile' && <ProfilePageContainer />}
            {selectedPage === 'Feed' && <FeedPageContainer />}
            {selectedPage === 'Search' && <SearchPageContainer />}

            {selectedPage === 'Create' && <Create darkMode={darkMode} />}
          </View>

          {/* Floating "Create" Button */}
          {selectedPage !== 'Create' && (
            <TouchableOpacity
              style={currentStyles.createPostButton}
              onPress={() => setSelectedPage('Create')}
            >
              <Text style={currentStyles.createPostButtonText}>+</Text>
            </TouchableOpacity>
          )}

          {/* Display CreatePost component if selected */}
          {/*selectedPage === 'CreatePost' && <CreatePost darkMode = {darkMode}/>*/
          //selectedPage === 'CreatePost' && <CreateProgram darkMode = {darkMode}/>
          }
        </View>
      )}
    </View>
  );
};

// Light mode styles
const lightStyles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
    color: '#111827',
    fontFamily: 'sans-serif',
  },
  button: {
    backgroundColor: '#4F46E5',
    width: '80%',
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  buttonSecondary: {
    backgroundColor: '#E5E7EB',
    width: '80%',
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },

  buttonSecondary: {
    backgroundColor: '#E5E7EB',
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
  buttonTextSecondary: {
    color: '#374151',
    fontSize: 18,
  },
  header: {
    position: 'absolute',
    top: 40,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  darkModeSwitch: {
    marginLeft: 15,
  },
  profilePictureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileMenu: {
    position: 'absolute',
    top: 60,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 10,
  },
  profileMenuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  profileMenuItemText: {
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
    marginTop: 80,
  },
  createPostButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#4F46E5',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  createPostButtonText: {
    fontSize: 28,
    color: '#fff',
    lineHeight: 28,
  },
});

// Dark mode styles
const darkStyles = StyleSheet.create({
page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#111827',
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
    color: '#F9FAFB',
    fontFamily: 'sans-serif',
  },
  button: {
    backgroundColor: '#6366F1',
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  buttonSecondary: {
    backgroundColor: '#374151',
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
  buttonTextSecondary: {
    color: '#D1D5DB',
    fontSize: 18,
  },
  header: {
    position: 'absolute',
    top: 40,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  darkModeSwitch: {
    marginLeft: 15,
  },
  profilePictureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileMenu: {
    position: 'absolute',
    top: 60,
    right: 0,
    backgroundColor: '#374151',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 10,
  },
  profileMenuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  profileMenuItemText: {
    fontSize: 16,
    color: '#F9FAFB',
  },
  content: {
    flex: 1,
    marginTop: 80,
  },
  createPostButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#6366F1',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  createPostButtonText: {
    fontSize: 28,
    color: '#fff',
    lineHeight: 28,
  },
});

export default Home;
