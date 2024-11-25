import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import apiInstance from "./Api";
import { userSessionToken, userName } from "./user";

// Create UserContext
export const UserContext = createContext({
  user: {},
  followers: [],
  following: [],
  posts: [],
  programs: []
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);
  const [programs, setPrograms] = useState([]);

  const sessionToken = useSelector(userSessionToken) || ""; // Fallback to empty string
  const username = useSelector(userName) || ""; // Fallback to empty string

  const isQueryEnabled = !!sessionToken && !!username; // Guard condition for queries

  // Fetch user profile
  const { data: profileData, isFetching: profileIsFetching } = useQuery(
    ["user", sessionToken, username],
    async () => {
      const response = await apiInstance(sessionToken).get(`api/user/${username}`);
      return response.data;
    },
    { refetchOnWindowFocus: false, enabled: isQueryEnabled }
  );

  // Fetch followers
  const { data: followersData, isFetching: followersIsFetching } = useQuery(
    ["followers", sessionToken, username],
    async () => {
      const response = await apiInstance(sessionToken).get(`api/user/${username}/followers`);
      return response.data;
    },
    { refetchOnWindowFocus: false, enabled: isQueryEnabled }
  );

  // Fetch following
  const { data: followingData, isFetching: followingIsFetching } = useQuery(
    ["following", sessionToken, username],
    async () => {
      const response = await apiInstance(sessionToken).get(`api/user/${username}/following`);
      return response.data;
    },
    { refetchOnWindowFocus: false, enabled: isQueryEnabled }
  );

  // Fetch user posts
  const { data: postsData, isFetching: postsIsFetching } = useQuery(
    ["posts", sessionToken, username],
    async () => {
      const response = await apiInstance(sessionToken).get(`api/posts/user/${username}`);
      return response.data;
    },
    { refetchOnWindowFocus: false, enabled: isQueryEnabled }
  );

  // Fetch user programs
  const { data: programsData, isFetching: programsIsFetching } = useQuery(
    ["programs", sessionToken, username],
    async () => {
      const response = await apiInstance(sessionToken).get(`api/training-programs/trainer/${username}`);
      return response.data;
    },
    { refetchOnWindowFocus: false, enabled: isQueryEnabled }
  );

  // Update state with fetched data
  useEffect(() => {
    if (profileData && !profileIsFetching) setUser(profileData);
  }, [profileData, profileIsFetching]);

  useEffect(() => {
    if (followersData && !followersIsFetching) setFollowers(followersData);
  }, [followersData, followersIsFetching]);

  useEffect(() => {
    if (followingData && !followingIsFetching) setFollowing(followingData);
  }, [followingData, followingIsFetching]);

  useEffect(() => {
    if (postsData && !postsIsFetching) setPosts(postsData);
  }, [postsData, postsIsFetching]);

  useEffect(() => {
    if (programsData && !programsIsFetching) setPrograms(programsData);
  }, [programsData, programsIsFetching]);

  return (
    <UserContext.Provider
      value={{
        user,
        followers,
        following,
        posts,
        programs
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
