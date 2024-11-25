import { createContext, useEffect, useState } from "react";
import apiInstance from "../instance/apiInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { userProfile, userPassword, userSessionToken } from "../context/user";

export const PostContext = createContext({
    posts: [],
    isLoadingPosts: false,
    isFetchingPosts: false,
    programs: [],
    isLoadingPrograms: false,
    isFetchingPrograms: false,
    bookmarkedPosts: [],
    isLoadingBookmarks: false,
    isFetchingBookmarks: false,
})

export const PhaseContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [programs, setPrograms] = useState([])
    const [bookmarkedPosts, setBookmarkedPosts] = useState([])
    const profile = useSelector(userProfile)
    const password = useSelector(userPassword)
    const sessionToken = useSelector(userSessionToken)

    const {
        data: postsData,
        isFetching: postsIsFetching,
        isLoading: postsIsLoading,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await apiInstance().get('/api/posts/random')
            return response.data
        },
        refetchOnWindowFocus: false,
    })

    const {
        data: bookmarkedData,
        isFetching: bookmarksIsFetching,
        isLoading: bookmarksIsLoading,
    } = useQuery({
        queryKey: ['bookmarkedPosts'],
        queryFn: async () => {
            const response = await apiInstance().get('/api/posts/bookmarked')
            return response.data
        },
        refetchOnWindowFocus: false,
    })

    const {
        data: programsData,
        isFetching: programsIsFetching,
        isLoading: programsIsLoading,
    } = useQuery({
        queryKey: ['training-programs'],
        queryFn: async () => {
            const response = await apiInstance().get('/api/training-programs')
            return response.data
        },
        refetchOnWindowFocus: false,
    })

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
        if (bookmarkedData && !bookmarksIsFetching) {
            setBookmarkedPosts(bookmarkedData)
        }
    }, [bookmarkedData, bookmarksIsFetching])

    return (
        <PostContext.Provider value={{
            posts,
            isLoadingPosts: postsIsLoading,
            isFetchingPosts: postsIsFetching,
            programs,
            isLoadingPrograms: programsIsLoading,
            isFetchingPrograms: programsIsFetching,
            bookmarkedPosts,
            isLoadingBookmarks: bookmarksIsLoading,
            isFetchingBookmarks: bookmarksIsFetching,
        }}>
            {children}
        </PostContext.Provider>
    )
}