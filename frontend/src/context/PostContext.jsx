import { createContext } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { artifactLabels, userProfile } from "../redux/selectors";
import axios from "axios";
import apiInstance from "../instance/apiInstance";
import { useQuery } from "@tanstack/react-query";

export const PostContext = createContext(
    {
        posts: [],
        labels: [],
    }
)

export const PhaseContextProvider = ({ children }) => {

    const {
        data: postsData,
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await apiInstance.get('/posts')
            return response.data
        },
        refetchOnWindowFocus: false,
    })

    const {
        data: labelsData,
    } = useQuery({
        queryKey: ['labels'],
        queryFn: async () => {
            const response = await apiInstance.get('/labels')
            return response.data
        },
        refetchOnWindowFocus: false,
    })

    return (
        <PostContext.Provider value={{
            posts: postsData,
            labels: labelsData,
            isLoading,
            isError,
            error,
            refetch
        }}>
            {children}
        </PostContext.Provider>
    )
}