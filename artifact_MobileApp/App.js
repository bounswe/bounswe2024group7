import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { AuthProvider, useAuth } from './AuthContext';
import Home from './Home';
import Login from './Login'; // Import LoginScreen component from log.js
import Signup from './Signup'; 
import SearchPage from './SearchPage'; 
import ProfilePage from './ProfilePage'; 
import PostViewPage from './PostViewPage'; 
import Feed from './Feed';
import AddPost from './AddPost';


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
                      <Text style={{ marginRight: 10 }}>{user}</Text>
                    )
                  }
                }
              }}
            />
            <Stack.Screen name="Login" component={Login} /> 
            <Stack.Screen name="Signup" component={Signup} /> 
            <Stack.Screen name="SearchPage" component={SearchPage} /> 
            <Stack.Screen name="ProfilePage" component={ProfilePage} /> 
            <Stack.Screen name="Feed" component={Feed} /> 
            <Stack.Screen name="AddPost" component={AddPost} /> 
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;
