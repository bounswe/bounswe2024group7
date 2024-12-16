import { createContext, useEffect, useState } from "react";
import apiInstance from "../instance/apiInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { userSessionToken } from "../context/user";

export const FeedbackContext = createContext({
    feedbacks: [],
    isLoadingFeedbacks: false,
    isFetchingFeedbacks: false,
    trainingProgramFeedbacks: [],
    isLoadingTrainingProgramFeedbacks: false,
    isFetchingTrainingProgramFeedbacks: false,
    userFeedbacks: [],
    isLoadingUserFeedbacks: false,
    isFetchingUserFeedbacks: false
});

export const FeedbackContextProvider = ({ children }) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [trainingProgramFeedbacks, setTrainingProgramFeedbacks] = useState([]);
    const [userFeedbacks, setUserFeedbacks] = useState([]);
    const sessionToken = useSelector(userSessionToken);

    const {
        data: feedbacksData,
        isFetching: feedbacksIsFetching,
        isLoading: feedbacksIsLoading,
    } = useQuery({
        queryKey: ['feedbacks'],
        queryFn: async () => {
            let response;
            if (sessionToken) {
                response = await apiInstance(sessionToken).get('/api/feedback');
            } else {
                response = await apiInstance().get('/api/feedback');
            }
            return response.data;
        },
        refetchOnWindowFocus: false,
    });

    const {
        data: trainingProgramFeedbacksData,
        isFetching: trainingProgramFeedbacksIsFetching,
        isLoading: trainingProgramFeedbacksIsLoading,
    } = useQuery({
        queryKey: ['training-program-feedbacks'],
        queryFn: async () => {
            const response = await apiInstance(sessionToken).get('/api/feedback/training-program');
            return response.data;
        },
        enabled: !!sessionToken,
        refetchOnWindowFocus: false,
    });

    const {
        data: userFeedbacksData,
        isFetching: userFeedbacksIsFetching,
        isLoading: userFeedbacksIsLoading,
    } = useQuery({
        queryKey: ['user-feedbacks'],
        queryFn: async () => {
            const response = await apiInstance(sessionToken).get('/api/feedback/user');
            return response.data;
        },
        enabled: !!sessionToken,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (feedbacksData && !feedbacksIsFetching) {
            setFeedbacks(feedbacksData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        }
    }, [feedbacksData, feedbacksIsFetching]);

    useEffect(() => {
        if (trainingProgramFeedbacksData && !trainingProgramFeedbacksIsFetching) {
            setTrainingProgramFeedbacks(trainingProgramFeedbacksData);
        }
    }, [trainingProgramFeedbacksData, trainingProgramFeedbacksIsFetching]);

    useEffect(() => {
        if (userFeedbacksData && !userFeedbacksIsFetching) {
            setUserFeedbacks(userFeedbacksData);
        }
    }, [userFeedbacksData, userFeedbacksIsFetching]);

    return (
        <FeedbackContext.Provider value={{
            feedbacks,
            isLoadingFeedbacks: feedbacksIsLoading,
            isFetchingFeedbacks: feedbacksIsFetching,
            trainingProgramFeedbacks,
            isLoadingTrainingProgramFeedbacks: trainingProgramFeedbacksIsLoading,
            isFetchingTrainingProgramFeedbacks: trainingProgramFeedbacksIsFetching,
            userFeedbacks,
            isLoadingUserFeedbacks: userFeedbacksIsLoading,
            isFetchingUserFeedbacks: userFeedbacksIsFetching
        }}>
            {children}
        </FeedbackContext.Provider>
    );
};