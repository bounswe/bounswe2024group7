import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, TouchableOpacity  } from 'react-native';
import Toast from 'react-native-toast-message';
import { AuthProvider, useAuth } from './AuthContext';
import Home from './Home';
import Login from './Login'; // Import LoginScreen component from log.js
import Signup from './Signup'; 
import SearchPage from './SearchPage'; 
import ProfilePage from './ProfilePage'; 
import PostViewPage from './PostViewPage'; 


const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Home" 
              component={Home}
              options={{
                headerRight: () => {
                  const { user } = useAuth();
                  if (user) {
                    return (
                      <TouchableOpacity
                      style={styles.button}
                      onPress={() => navigation.navigate("Signup")}>
                      <Text style={styles.buttonText}>{user}</Text>
                      </TouchableOpacity>
                    )
                  }
                }
              }}
            />
            <Stack.Screen name="Login" component={Login} /> 
            <Stack.Screen name="Signup" component={Signup} /> 
            <Stack.Screen name="SearchPage" component={SearchPage} /> 
            <Stack.Screen name="PostViewPage" component={PostViewPage} />
            <Stack.Screen name="ProfilePage" component={ProfilePage} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
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
    width: '50%',
    height: 25,
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

export default App;
