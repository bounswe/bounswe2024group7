import apiInstance from '../Api';
import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { StyleSheet, Text, View, TextInput, TouchableOpacity  } from 'react-native';
import { useAuth } from '../AuthContext';
import { useDispatch } from "react-redux";
import { userActions } from '../user.js'
//import Cookies from "js-cookie"
import { useQuery } from "@tanstack/react-query"

const Login = ({ navigation })=>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const { login } = useAuth();
  const dispatch = useDispatch();
  const [sessionToken, setSessionToken] = useState(null);
  const {
    data: profileData,
    isFetching: profileIsFetching,
    isLoading: profileIsLoading,
} = useQuery({
    queryKey: ['profile', sessionToken],
    queryFn: async () => {
        const response = await apiInstance(sessionToken).get(`api/user/${username}`);

        return response.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!sessionToken,
});


useEffect(() => {
  if (profileData && !profileIsFetching) {
      const sanitizedProfile = JSON.parse(JSON.stringify(profileData)); // Deep clone to remove non-serializable values

      dispatch(
          userActions.saveProfile({
              profile: sanitizedProfile,
          })
      );

      goHome();
  }
}, [profileData, profileIsFetching, dispatch]);
  const goHome = () => navigation.navigate('Home');
  //const goHome = () => navigation.navigate('NewPostDetail');

  const goSignup = () => navigation.navigate('Register');

  const checkDatabase = async (username, password) => {
    try {
      const response = await apiInstance().post(
          "auth/login",
          {
              username,
              password
          }
      )
      console.log("Login response: "+response)
      if (response.status === 200) {

          const token = response.data.sessionToken;
          console.log(token);
          setSessionToken(token);

          dispatch(
              userActions.login({
                  userName: username,
                  password,
                  sessionToken: token,
              })
          );

          //Cookies.set("username", username)
      } else {
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
  }
    //goHome();   // TODO: Open the comment after connecting the database.

     /*try {
        const response = await apiInstance().post(
            "login",
            {
                username,
                password
            }
        )

        // successful login
        if (response.status === 200) {
            login({
              username,
              password
            });
            goHome();
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
    } */
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Welcome Again</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter Username'
        onChangeText={(val) => setUsername(val)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter Password'
        onChangeText={(val) => setPassword(val)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => checkDatabase(username, password)} 
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => goSignup()} 
      >
        <Text style={styles.buttonText}>Don't have an account?</Text>
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

export default Login;