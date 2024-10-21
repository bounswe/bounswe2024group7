import { createContext, useEffect, useState } from "react";
import apiInstance from "../instance/apiInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { userProfile, userPassword, userSessionToken } from "../context/user";

export const PostContext = createContext(
    {
        posts: [],
        labels: [],
        bookmarkedPosts: [],
        isLoadingPosts: false,
        isFetchingPosts: false,
        isLoadingLabels: false,
        isFetchingLabels: false,
        isLoadingBookmarkedPosts: false,
        isFetchingBookmarkedPosts: false,
    }
)

export const PhaseContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [labels, setLabels] = useState([])
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
        data: labelsData,
        isFetching: labelsIsFetching,
        isLoading: labelsIsLoading,
    } = useQuery({
        queryKey: ['labels'],
        queryFn: async () => {
            const response = await apiInstance(
                sessionToken
            ).get('/labels')

            const labels = response.data.map(label => ({
                value: label.id,
                label: label.value,
            }))

            return labels
        },
        refetchOnWindowFocus: false,
    })

    const {
        data: bookmarkedPostsData,
        isFetching: bookmarkedPostsIsFetching,
        isLoading: bookmarkedPostsIsLoading,
    } = useQuery({
        queryKey: ['bookmarkedPosts'],
        queryFn: async () => {
            const response = await apiInstance(
                sessionToken
            ).get(`/bookmarks/${profile.id}`)

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
        if (labelsData && !labelsIsFetching) {
            setLabels(labelsData)
        }
    }, [labelsData, labelsIsFetching])

    useEffect(() => {
        if (bookmarkedPostsData && !bookmarkedPostsIsFetching) {
            setBookmarkedPosts(bookmarkedPostsData);

            if (bookmarkedPostsData && postsData) {
                // Create a new array to avoid mutating state directly
                const updatedPosts = posts.map(post => {
                    const isBookmarked = bookmarkedPostsData.some(bookmarkedPost => bookmarkedPost.id === post.id);
                    return {
                        ...post,
                        isBookmarked: isBookmarked,
                    };
                });

                setPosts(updatedPosts);
            }
        }
    }, [bookmarkedPostsData, bookmarkedPostsIsFetching]);

    return (
        <PostContext.Provider value={{
            posts: posts,
            labels: labels,
            bookmarkedPosts: bookmarkedPosts,
            isLoadingPosts: postsIsLoading,
            isFetchingPosts: postsIsFetching,
            isLoadingLabels: labelsIsLoading,
            isFetchingLabels: labelsIsFetching,
            isLoadingBookmarkedPosts: bookmarkedPostsIsLoading,
            isFetchingBookmarkedPosts: bookmarkedPostsIsFetching,
        }}>
            {children}
        </PostContext.Provider>
    )
}