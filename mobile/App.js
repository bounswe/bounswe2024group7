import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { AuthProvider, useAuth } from './AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';
import ProfilePage from './components/ProfilePage';



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
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ProfilePage" component={ProfilePage} /> 
            <Stack.Screen name="Feed" component={Feed} />  
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;
