import { createContext, useEffect, useState } from "react";
import apiInstance from "../instance/apiInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { userSessionToken } from "../context/user";

// Create initial context with default values
export const AppContext = createContext({
  exercises: [],
  isLoadingExercises: false,
  isFetchingExercises: false,
  error: null
});

export const AppContextProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);
  
  // Get session token from Redux
  const sessionToken = useSelector(userSessionToken);
  
  // Fetch exercises using React Query
  const {
    data: exercisesData,
    isFetching: exercisesIsFetching,
    isLoading: exercisesIsLoading,
    error: exercisesError
  } = useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      try {
        // Pass sessionToken to apiInstance
        const response = await apiInstance(sessionToken).get('/api/exercises');
        console.log('Exercises API Response:', response.data);
        
        // Validate response data structure
        if (!Array.isArray(response.data)) {
          throw new Error('Expected exercises data to be an array');
        }
        
        return response.data;
      } catch (error) {
        console.error('Error fetching exercises:', error);
        throw error;
      }
    },
    // Only run query if we have a session token
    enabled: !!sessionToken,
    refetchOnWindowFocus: false,
  });

  // Update exercises state when data changes
  useEffect(() => {
    if (exercisesData && !exercisesIsFetching) {
      console.log('Setting exercises:', exercisesData);
      setExercises(exercisesData);
    }
  }, [exercisesData, exercisesIsFetching]);

  // Prepare context value
  const contextValue = {
    exercises,
    isLoadingExercises: exercisesIsLoading,
    isFetchingExercises: exercisesIsFetching,
    error: exercisesError
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}