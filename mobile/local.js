import AsyncStorage from '@react-native-async-storage/async-storage';

// Load state function
export const loadState = async (name) => {
  try {
    const serializedState = await AsyncStorage.getItem(name);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Error loading state:", e);
    return undefined;
  }
};

// Save state function
export const saveState = async (name, state) => {
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem(name, serializedState);
  } catch (e) {
    console.error("Error saving state:", e);
    // Handle the error if needed
  }
};
