import { createContext, useEffect, useState } from "react";
import apiInstance from "../instance/apiInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { userProfile, userPassword, userSessionToken } from "../context/user";

export const AppContext = createContext(
    {
        exercises: [],
        isLoadingExercises: false,
        isFetchingExercises: false,
    }
)

export const AppContextProvider = ({ children }) => {
    const [exercises, setExercises] = useState([])

    const {
        data: exercisesData,
        isFetching: exercisesIsFetching,
        isLoading: exercisesIsLoading,
    } = useQuery({
        queryKey: ['exercises'],
        queryFn: async () => {
            const response = await apiInstance().get('/api/exercises')

            return response.data
        },
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (exercisesData && !exercisesIsFetching) {
            setExercises(exercisesData)
        }
    }, [exercisesData, exercisesIsFetching])

    return (
        <AppContext.Provider value={{
            exercises,
            isLoadingExercises: exercisesIsLoading,
            isFetchingExercises: exercisesIsFetching,
        }}>
            {children}
        </AppContext.Provider>
    )
}