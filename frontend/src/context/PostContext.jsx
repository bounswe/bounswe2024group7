import { createContext, useEffect, useState } from "react";
import apiInstance from "../instance/apiInstance";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
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
        fetchNextForYouPage: () => {},
        hasMoreForYou: false,
        isLoadingForYou: false,
        explorePosts: [],
        fetchNextExplorePage: () => {},
        hasMoreExplore: false,
        isLoadingExplore: false,
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
        queryKey: ['recommended-programs'],
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
        queryKey: ['explore-programs'],
        queryFn: async () => {
            const response = await apiInstance().get('/api/training-programs/explore')
            return response.data
        },
        refetchOnWindowFocus: false
    })

    const {
        data: forYouPostsData,
        fetchNextPage: fetchNextForYouPage,
        hasNextPage: hasMoreForYou,
        isFetchingNextPage: isLoadingForYou,
    } = useInfiniteQuery({
        queryKey: ['forYouPosts'],
        queryFn: async ({ pageParam = 0 }) => {
            const response = await apiInstance(sessionToken).get(`/api/posts/for-you?page=${pageParam}&size=10`);
            return response.data;
        },
        getNextPageParam: (lastPage) =>
            lastPage.currentPage + 1 < lastPage.totalPages ? lastPage.currentPage + 1 : undefined,
    }
    );

    // Infinite Query for "Explore" posts
    const {
        data: explorePostsData,
        fetchNextPage: fetchNextExplorePage,
        hasNextPage: hasMoreExplore,
        isFetchingNextPage: isLoadingExplore,
    } = useInfiniteQuery({
        queryKey: ['explorePosts'],
        queryFn: async ({ pageParam = 0 }) => {
            const response = await apiInstance().get(`/api/posts/explore?page=${pageParam}&size=10`);
            return response.data;
        },
        getNextPageParam: (lastPage) =>
            lastPage.currentPage + 1 < lastPage.totalPages ? lastPage.currentPage + 1 : undefined,
    }
    );

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
        if (recommendedProgramsData && !recommendedProgramsIsLoading) {
            setRecommendedPrograms(
                recommendedProgramsData?.programs || []
            )
        }
    }, [recommendedProgramsData, recommendedProgramsIsLoading])

    useEffect(() => {
        if (exploreProgramsData && !exploreProgramsIsLoading) {
            setExplorePrograms(
                exploreProgramsData?.programs || []
            )
        }
    }, [exploreProgramsData, exploreProgramsIsLoading])

    useEffect(() => {
        if (forYouPostsData && !isLoadingForYou) {
            setForYouPosts(
                forYouPostsData?.pages?.flatMap((page) => page.posts) || []
            )
        }
    }, [forYouPostsData, isLoadingForYou])

    useEffect(() => {
        if (explorePostsData && !isLoadingExplore) {
            setExplorePosts(
                explorePostsData?.pages?.flatMap((page) => page.posts) || []
            )
        }
    }, [explorePostsData, forYouPostsData, isLoadingExplore])

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
            fetchNextForYouPage,
            hasMoreForYou,
            isLoadingForYou,
            explorePosts,
            fetchNextExplorePage,
            hasMoreExplore,
            isLoadingExplore,
        }}>
            {children}
        </PostContext.Provider>
    )
}