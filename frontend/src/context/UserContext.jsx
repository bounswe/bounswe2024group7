import { createContext, useEffect, useState } from "react";
import apiInstance from "../instance/apiInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { userSessionToken, userName, userProfile } from "../context/user";

export const UserContext = createContext({
    user: {},
    followers: [],
    following: [],
    posts: [],
    programs: [],
    joinedPrograms: [],
    exerciseProgress: {},
})

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [posts, setPosts] = useState([])
    const [programs, setPrograms] = useState([])
    const [joinedPrograms, setJoinedPrograms] = useState([])
    const [exerciseProgress, setExerciseProgress] = useState({})

    const sessionToken = useSelector(userSessionToken)
    const username = useSelector(userName)

    const {
        data: profileData,
        isFetching: profileIsFetching,
        isLoading: profileIsLoading,
    } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await apiInstance(sessionToken).get(`api/user/${username}`);
            return response.data;
        },
        refetchOnWindowFocus: false,
    });

    // New query for joined programs
    const {
        data: joinedProgramsData,
        isFetching: joinedProgramsIsFetching,
        isLoading: joinedProgramsIsLoading,
    } = useQuery({
        queryKey: ['joinedPrograms'],
        queryFn: async () => {
            try {
                const response = await apiInstance(sessionToken).get(`api/training-programs/joined/${username}`);

                // Process the response to include exercise progress
                const programsWithProgress = response.data.map(program => ({
                    ...program,
                    exercises: program.exercises.map(exercise => ({
                        ...exercise,
                        completed: exercise.completed || false
                    }))
                }));

                // Build exercise progress map
                const progressMap = {};
                programsWithProgress.forEach(program => {
                    progressMap[program.id] = program.exercises.reduce((acc, exercise) => {
                        acc[exercise.id] = exercise.completed;
                        return acc;
                    }, {});
                });

                setExerciseProgress(progressMap);
                return programsWithProgress;
            } catch (error) {
                console.error('Error fetching joined programs:', error);
                return [];
            }
        },
        refetchOnWindowFocus: false,
    });

    const {
        data: followersData,
        isFetching: followersIsFetching,
        isLoading: followersIsLoading,
    } = useQuery({
        queryKey: ['followers'],
        queryFn: async () => {
            try {
                const response = await apiInstance(sessionToken).get(`api/user/${username}/followers`)

                return response.data
            } catch (error) {
                return []
            }
        },
        refetchOnWindowFocus: false,
    })

    const {
        data: followingData,
        isFetching: followingIsFetching,
        isLoading: followingIsLoading,
    } = useQuery({
        queryKey: ['following'],
        queryFn: async () => {
            try {
                const response = await apiInstance(sessionToken).get(`api/user/${username}/following`)

                return response.data
            } catch (error) {
                return []
            }
        },
        refetchOnWindowFocus: false,
    })

    // Get user posts
    const {
        data: postsData,
        isFetching: postsIsFetching,
        isLoading: postsIsLoading,
    } = useQuery({
        queryKey: ['userPosts'],
        queryFn: async () => {
            try {
                const response = await apiInstance(sessionToken).get(`api/posts/user/${username}`)

                return response.data
            } catch (error) {
                return []
            }
        },
        refetchOnWindowFocus: false,
    })

    // Get user programs
    const {
        data: programsData,
        isFetching: programsIsFetching,
        isLoading: programsIsLoading,
    } = useQuery({
        queryKey: ['programs'],
        queryFn: async () => {
            try {
                const response = await apiInstance(sessionToken).get(`api/training-programs/trainer/${username}`)

                return response.data
            } catch (error) {
                return []
            }
        },
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (followersData && !followersIsFetching) {
            setFollowers(followersData)
        }
    }, [followersData, followersIsFetching])

    useEffect(() => {
        if (followingData && !followingIsFetching) {
            setFollowing(followingData)
        }
    }, [followingData, followingIsFetching])

    useEffect(() => {
        if (postsData && !postsIsFetching) {
            setPosts(postsData)
        }
    }, [postsData, postsIsFetching])

    useEffect(() => {
        if (programsData && !programsIsFetching) {
            setPrograms(programsData)
        }
    }, [programsData, programsIsFetching])

    useEffect(() => {
        if (profileData && !profileIsFetching) {
            setUser(profileData)
        }
    }, [profileData, profileIsFetching])

    // New useEffect for joined programs
    useEffect(() => {
        if (joinedProgramsData && !joinedProgramsIsFetching) {
            setJoinedPrograms(joinedProgramsData);
        }
    }, [joinedProgramsData, joinedProgramsIsFetching]);

    // Function to update exercise completion status
    const updateExerciseCompletion = async (programId, exerciseId, completed) => {
        try {
            // Update the backend
            await apiInstance(sessionToken).put(`api/training-programs/${programId}/exercises/${exerciseId}`, {
                completed
            });

            // Update local state
            setExerciseProgress(prev => ({
                ...prev,
                [programId]: {
                    ...prev[programId],
                    [exerciseId]: completed
                }
            }));
        } catch (error) {
            console.error('Error updating exercise completion:', error);
        }
    };
    // Function to submit exercise completed sets
    const completeExerciseSets = async (programId, workoutExerciseId, completedSetsArray) => {
        try {
            // API call to complete the exercise sets
            const response = await apiInstance(sessionToken).post(
                `api/training-programs/${programId}/workout-exercises/${workoutExerciseId}/complete`,
                completedSetsArray
            );

            // Update local state with the response if necessary
            const updatedProgram = response.data;

            // Update the progress map for the completed sets
            setExerciseProgress((prev) => {
                const updatedProgress = { ...prev };
                if (!updatedProgress[programId]) {
                    updatedProgress[programId] = {};
                }
                updatedProgress[programId][workoutExerciseId] = true;

                return updatedProgress;
            });

            return updatedProgram;
        } catch (error) {
            console.error('Error completing exercise sets:', error);
            throw error;
        }
    };

    return (
        <UserContext.Provider value={{
            user,
            followers,
            following,
            posts,
            programs,
            joinedPrograms,
            exerciseProgress,
            // updateExerciseCompletion,
            completeExerciseSets
        }}>
            {children}
        </UserContext.Provider>
    )
}