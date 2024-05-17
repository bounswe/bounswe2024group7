import { createContext, useEffect, useState } from "react";
import apiInstance from "../instance/apiInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { userProfile, userPassword } from "../context/user";

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

    const {
        data: postsData,
        isFetching: postsIsFetching,
        isLoading: postsIsLoading,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await apiInstance().get('/posts')

            if (!profile || !password) {
                const emptyLikesAndComments = await Promise.all(response.data.map(async (post) => {
                    return {
                        ...post,
                        likes: [],
                        comments: [],
                    }
                }
                ))

                return emptyLikesAndComments
            }


            // Get the like_count and comments for each post
            const data = await Promise.all(response.data.map(async (post) => {
                const likesResponse = await apiInstance(
                    profile.username,
                    password
                ).get(`/posts/${post.id}/likes`)
                const commentsResponse = await apiInstance(
                    profile.username,
                    password
                ).get(`/posts/${post.id}/comments`)

                const likes = likesResponse.data
                const comments = commentsResponse.data

                return {
                    ...post,
                    likes: likes,
                    comments: comments,
                }
            }))

            return data
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
                profile.username,
                password
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
                profile.username,
                password
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