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
})

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [posts, setPosts] = useState([])
    const [programs, setPrograms] = useState([])
    const [joinedPrograms, setJoinedPrograms] = useState([])

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
        queryKey: ['posts'],
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

    // Get joined programs
    const {
        data: joinedProgramsData,
        isFetching: joinedProgramsIsFetching,
        isLoading: joinedProgramsIsLoading,
    } = useQuery({
        queryKey: ['joinedPrograms'],
        queryFn: async () => {
            try {
                const response = await apiInstance(sessionToken).get(`api/training-programs/joined/${username}`)

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

    useEffect(() => {
        if (joinedProgramsData && !joinedProgramsIsFetching) {
            setJoinedPrograms(joinedProgramsData)
        }
    }, [joinedProgramsData, joinedProgramsIsFetching])

    return (
        <UserContext.Provider value={{
            user,
            followers,
            following,
            posts,
            programs,
            joinedPrograms,
        }}>
            {children}
        </UserContext.Provider>
    )
}