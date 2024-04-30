import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity  } from 'react-native';
import { useAuth } from './AuthContext';
// import SearchBar from './SearchBar'; 

const Home = ({ navigation }) => {
  const { isLoggedIn, logout } = useAuth();


  return (
    
    <View style={styles.container}>
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
        onPress={() => navigation.navigate('SearchBar')}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {isLoggedIn && (
      <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          logout();
          navigation.navigate('Login')
        }}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      </>
    )}
   
    </View>
  );
};
const styles = StyleSheet.create({
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
