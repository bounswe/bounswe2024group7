import { StatusBar } from 'react-native'; // Changed from 'expo-status-bar'
import apiInstance from './Api'; 
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from './AuthContext';


const Signup = ({ navigation })=>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  
  const goHome = () => navigation.navigate('Home');
  
  const goLogin = () => navigation.navigate('Login');

  const checkDatabase = async (username, email, password) => {
    console.log({username, email, password});
    goHome();
    /*try {
        const response = await apiInstance().post(
            "signup",
            {
                username,
                email,
                password
            }
        )

        // successful login
        if (response.status === 201) {
            // login(response.data)
            login({
              username,
              password
            })
            goHome()
        }
    } catch (e) {
        console.log(e)
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Login Error',
          text2: 'There was an error while logging in. Please try again.',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40
        });
    }*/
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Sign Up to Fitness Fact</Text>
      <TextInput
        style={styles.input}
        placeholder='Create Username'
        onChangeText={(val) => setUsername(val)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter Your Email'
        onChangeText={(val) => setEmail(val)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder='Create Password'
        onChangeText={(val) => setPassword(val)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => checkDatabase(username, email, password)}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => goLogin()} 
      >
        <Text style={styles.buttonText}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
}

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

export default Signup;