import { StatusBar } from 'react-native'; // Changed from 'expo-status-bar'
import apiInstance from '../Api';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import { useAuth } from '../AuthContext';
import { useDispatch } from "react-redux";
import { userActions, userProfile } from '../user.js'
//import Cookies from "js-cookie"

const Signup = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('TRAINEE'); // Default role
  //const { login } = useAuth();
  const dispatch = useDispatch();

  const goHome = () => navigation.navigate('Home');

  const goLogin = () => navigation.navigate('Login');

  const goSurvey = () => navigation.navigate('Survey',{username, navigation});

  const checkDatabase = async (fullName, username, email, password, role) => {
    console.log({ fullName, username, email, password, role });
    //goHome();
    /*try {
      const response = await apiInstance().post("register", { fullName, username, email, password, role });

      // Successful login
      if (response.status === 201) {
        login({ username, password });
        goHome();
      }
    }*/try {
      const response = await apiInstance().post(
        "auth/register",
        {
            username,
            fullName,
            email,
            password,
            role
        }
    )

    if (response.status === 201) {

        const token = response.data

        dispatch(
            userActions.login({
                userName: username,
                password: password,
                sessionToken: token
            })
        )

        //Cookies.set("username", username)

        // goHome();
        goSurvey();
    }
} catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Register Error',
        text2: 'There was an error while registering. Please try again.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up to Fitness Fact</Text>
      <TextInput
        style={styles.input}
        placeholder='Create Full Name'
        onChangeText={(val) => setFullName(val)}
        value={fullName}
      />
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
      <Picker
        selectedValue={role}
        onValueChange={(itemValue) => setRole(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Trainee" value="TRAINEE" />
        <Picker.Item label="Trainer" value="TRAINER" />
        <Picker.Item label="Dietician" value="DIETICIAN" />
      </Picker>
      <TouchableOpacity
        style={styles.button}
        onPress={() => checkDatabase(fullName, username, email, password, role)}
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
  picker: {
    width: '80%',
    height: 50,
    marginTop: 10,
    backgroundColor: '#F8F8F8',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
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
