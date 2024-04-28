import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Login from './Login'; // Import LoginScreen component from log.js
import Signup from './Signup'; 
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} /> 
        <Stack.Screen name="Signup" component={Signup} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
