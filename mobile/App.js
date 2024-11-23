import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { AuthProvider, useAuth } from './AuthContext';
import { PostProvider, usePost } from './PostContext';          // TODO: Where to use it?
import { SearchProvider, useSearch } from './SearchContext';    // TODO: Where to use it?
import { ProgramProvider, useProgram } from './ProgramContext'; // TODO: Where to use it?
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';
import ProfilePage from './components/ProfilePage';
import PostDetail from './components/PostDetail'; // Import PostDetail
import ProgramDetail from './components/ProgramDetail'; // Import ProgramDetail
import DietDetail from './components/DietDetail';
import UserProfile from './components/UserProfile';
import Label from './components/Label';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';
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
                    );
                  }
                },
              }}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ProfilePage" component={ProfilePage} />
            <Stack.Screen name="Feed" component={Feed} />
            <Stack.Screen name="PostDetail" component={PostDetail} />
            <Stack.Screen name="ProgramDetail" component={ProgramDetail} />
            <Stack.Screen name="DietDetail" component={DietDetail} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="Label" component={Label} />
            <Stack.Screen name="SearchBar" component={SearchBar} />
            <Stack.Screen name="SearchResult" component={SearchResult} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
      <Toast />
    </>
  );
};

export default App;
