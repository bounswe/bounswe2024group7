import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userName, userProfile, userSessionToken } from '../context/user.js';
import apiInstance from "../instance/apiInstance.js";
import { userActions } from '../context/user.js';
import { UserContext } from '../context/UserContext.jsx';
import Icon from 'react-native-vector-icons/Ionicons';
import CreatePostModal from './CreatePostModal.component';
import CreateProgramModal from './CreateProgramModal.component';
import SearchBar from './searchBar.component';
import SearchResults from './searchResults.component';

export default function NewHome() {
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const username = useSelector(userName);
  const profile = useSelector(userProfile);
  const sessionToken = useSelector(userSessionToken);
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogOut = async () => {
    try {
      const response = await apiInstance(sessionToken).post(`auth/logout?sessionToken=${sessionToken}`);
      if (response.status === 200) {
        dispatch(userActions.logout());
        Alert.alert("Logged out successfully");
      }
    } catch (e) {
      Alert.alert("Error while logging out. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: isOpen ? '#ddd' : '#fff' }}>
      {/*<CreatePostModal visible={isOpen} onClose={() => setIsOpen(false)} />
      <CreateProgramModal visible={isOpen} onClose={() => setIsOpen(false)} />*/}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name={isOpen ? "close" : "menu"} size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Fitness Fact</Text>

        {username ? (
          <TouchableOpacity onPress={handleLogOut}>
            <Image
              style={{ width: 30, height: 30, borderRadius: 15 }}
              source={{ uri: profile && profile.profile_picture ? profile.profile_picture.url : undefined }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigate(loginPath)}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'purple' }}>Sign In</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView>
        <DesktopNav />

        {searchResults && <SearchResults data={searchResults} loading={loading} />}
      </ScrollView>

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: 'purple',
          padding: 10,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          if (username) {
            setIsOpen(true);
          } else {
            Alert.alert("You need to be logged in to create a new post.");
            navigate(loginPath);
          }
        }}>
        <Icon name="add" size={20} color="white" />
        <Text style={{ color: 'white', marginLeft: 5 }}>Create New Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const DesktopNav = () => {
  const NAV_ITEMS = [
    // Define your navigation items here
  ];

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
      {NAV_ITEMS.map((navItem) => (
        <TouchableOpacity key={navItem.label} onPress={() => navigate(navItem.href)}>
          <Text style={{ fontSize: 16, color: 'gray', fontWeight: '500' }}>{navItem.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
