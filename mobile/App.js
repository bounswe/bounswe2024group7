import React from 'react';
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
import { enableScreens } from 'react-native-screens';

enableScreens();

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
      {/* Toast component should be rendered directly */}
      <Toast />
    </>
  );
};

export default App;
