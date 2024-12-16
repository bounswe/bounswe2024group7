import { createContext, useEffect, useState } from "react";
import apiInstance from "../instance/apiInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { userProfile, userPassword, userSessionToken } from "../context/user";

export const PostContext = createContext(
    {
        posts: [],
        isLoadingPosts: false,
        isFetchingPosts: false,
        programs: [],
        isLoadingPrograms: false,
        isFetchingPrograms: false,
        tags: [],
        isLoadingTags: false,
        isFetchingTags: false,
        bookmarkedPosts: [],
        isLoadingBookmarks: false,
        isFetchingBookmarks: false,
        recommendedPrograms: [],
        explorePrograms: [],
        forYouPosts: [],
        explorePosts: [],
    }
)

export const PhaseContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [programs, setPrograms] = useState([])
    const [bookmarkedPosts, setBookmarkedPosts] = useState([])
    const [tags, setTags] = useState([])
    const [recommendedPrograms, setRecommendedPrograms] = useState([])
    const [explorePrograms, setExplorePrograms] = useState([])
    const [forYouPosts, setForYouPosts] = useState([])
    const [explorePosts, setExplorePosts] = useState([])

    const sessionToken = useSelector(userSessionToken)

    const {
        data: postsData,
        isFetching: postsIsFetching,
        isLoading: postsIsLoading,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            let response;

            if (sessionToken) {
                response = await apiInstance(sessionToken).get('/api/posts')
            } else {
                response = await apiInstance().get('/api/posts')
            }

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
            const response = await apiInstance(sessionToken).get('/api/posts/bookmarked')
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

    const {
        data: tagsData,
        isFetching: tagsIsFetching,
        isLoading: tagsIsLoading
    } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const response = await apiInstance().get("/api/tags")

            return response.data
        },
        refetchOnWindowFocus: false
    })

    const {
        data: recommendedProgramsData,
        isFetching: recommendedProgramsIsFetching,
        isLoading: recommendedProgramsIsLoading,
    } = useQuery({
        queryKey: ['training-programs'],
        queryFn: async () => {
            const response = await apiInstance(sessionToken).get('/api/training-programs/recommended')
            return response.data
        },
        refetchOnWindowFocus: false,
        enabled: !!sessionToken
    })

    const {
        data: exploreProgramsData,
        isFetching: exploreProgramsIsFetching,
        isLoading: exploreProgramsIsLoading,
    } = useQuery({
        queryKey: ['training-programs'],
        queryFn: async () => {
            const response = await apiInstance().get('/api/training-programs/explore')
            return response.data
        },
        refetchOnWindowFocus: false
    })

    const {
        data: forYouPostsData,
        isFetching: forYouPostsIsFetching,
        isLoading: forYouPostsIsLoading,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await apiInstance(sessionToken).get('/api/posts/for-you')
            return response.data
        },
        refetchOnWindowFocus: false,
        enabled: !!sessionToken
    })

    const {
        data: explorePostsData,
        isFetching: explorePostsIsFetching,
        isLoading: explorePostsIsLoading,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await apiInstance().get('/api/posts/explore')
            return response.data
        },
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        if (postsData && !postsIsFetching) {
            // Order posts by createdAt date
            setPosts(postsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
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

    useEffect(() => {
        if (tagsData && !tagsIsFetching) {
            setTags(tagsData)
        }
    }, [tagsData, tagsIsFetching])

    useEffect(() => {
        if (recommendedProgramsData && !recommendedProgramsIsFetching) {
            setRecommendedPrograms(recommendedProgramsData)
        }
    }, [recommendedProgramsData, recommendedProgramsIsFetching])

    useEffect(() => {
        if (exploreProgramsData && !exploreProgramsIsFetching && recommendedProgramsData) {
            // Map through the data and set the state. Explore programs are not user-specific not should not include recommendations
            const explorePrograms = exploreProgramsData.filter(program => !recommendedProgramsData.some(recommendedProgram => recommendedProgram.id === program.id))

            setExplorePrograms(explorePrograms)
        }
    }, [exploreProgramsData, exploreProgramsIsFetching, recommendedProgramsData])

    useEffect(() => {
        if (forYouPostsData && !forYouPostsIsFetching) {
            setForYouPosts(forYouPostsData)
        }
    }, [forYouPostsData, forYouPostsIsFetching])

    useEffect(() => {
        if (explorePostsData && !explorePostsIsFetching && forYouPostsData) {
            const explorePosts = explorePostsData.filter(post => !forYouPostsData.some(forYouPost => forYouPost.id === post.id))

            setExplorePosts(explorePosts)
        }
    }, [explorePostsData, explorePostsIsFetching, forYouPostsData])

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
            tags: tags,
            isLoadingTags: tagsIsLoading,
            isFetchingTags: tagsIsFetching,
            recommendedPrograms,
            explorePrograms,
            forYouPosts,
            explorePosts,
        }}>
            {children}
        </PostContext.Provider>
    )
}