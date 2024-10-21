import { createContext, useEffect, useState } from "react";
import apiInstance from "../instance/apiInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { userSessionToken, userName } from "../context/user";

export const UserContext = createContext({
    user: {},
    followers: [],
    following: [],
})

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])

    const sessionToken = useSelector(userSessionToken)
    const username = useSelector(userName)

    const {
        data: followersData,
        isFetching: followersIsFetching,
        isLoading: followersIsLoading,
    } = useQuery({
        queryKey: ['followers'],
        queryFn: async () => {
            const response = await apiInstance(sessionToken).get(`/user/${username}/followers`)

            return response.data
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
            const response = await apiInstance(sessionToken).get(`/user/${username}/following`)

            return response.data
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

    return (
        <UserContext.Provider value={{
            user,
            followers,
            following,
        }}>
            {children}
        </UserContext.Provider>
    )
}