import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { AuthProvider, useAuth } from './AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';
import ProfilePage from './components/ProfilePage';
import PostDetail from './components/PostDetail';
import ProgramDetail from './components/ProgramDetail';
import DietDetail from './components/DietDetail';
import UserProfile from './components/UserProfile';
import Label from './components/Label';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';
import ProgressTracker from './components/ProgressTracker';
import WorkoutDetails from './components/WorkoutDetails';
import JoinedWorkout from './components/JoinedWorkout';
import JoinedWeek from './components/JoinedWeek';
import JoinedExercise from './components/JoinedExercise';
import JoinedProgramDetail from './components/JoinedProgramDetail';
import JoinedProgramCard from './components/JoinedProgramCard';
import Survey from './components/Survey';
import FeedbackCard from './components/FeedbackCard';
import FeedbackDetail from './components/FeedbackDetail';
import CreateFeedback from './components/CreateFeedback';
import SearchPage from './components/SearchPage';

import { Provider as ReduxProvider } from 'react-redux';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import store from './store.js';
import { enableScreens } from 'react-native-screens';

enableScreens();

const queryClient = new QueryClient();
const Stack = createStackNavigator();

const HeaderRight = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <View style={styles.headerRight}>
        <Text>{user}</Text>
      </View>
    );
  }
  return null;
};

const App = () => {
  return (
    <>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{
                    headerRight: () => <HeaderRight />,
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
                <Stack.Screen name="ProgressTracker" component={ProgressTracker} />
                <Stack.Screen name="WorkoutDetails" component={WorkoutDetails} />
                <Stack.Screen name="JoinedWeek" component={JoinedWeek} />
                <Stack.Screen name="JoinedWorkout" component={JoinedWorkout} />
                <Stack.Screen name="Survey" component={Survey} />
                <Stack.Screen name="JoinedExercise" component={JoinedExercise} />
                <Stack.Screen name="JoinedProgramDetail" component={JoinedProgramDetail} />
                <Stack.Screen name="JoinedProgramCard" component={JoinedProgramCard} />
                <Stack.Screen name="CreateFeedback" component={CreateFeedback} />
                <Stack.Screen name="FeedbackCard" component={FeedbackCard} />
                <Stack.Screen name="FeedbackDetail" component={FeedbackDetail} />
                <Stack.Screen name="SearchPage" component={SearchPage} />
              </Stack.Navigator>
            </NavigationContainer>
          </AuthProvider>
        </QueryClientProvider>
      </ReduxProvider>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 10,
  },
});

export default App;
