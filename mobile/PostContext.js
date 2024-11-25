import React, { createContext, useContext, useState } from 'react';

const PostContext = createContext(null);

export const PostProvider = ({ result }) => {
  const [postState, setPostState] = useState({
    title: null, 
    description: null,
    owner: null,
    date: null,
    likeCount: null,
    commentCount: null
  });

  // Function to create a post and store that post
  const createPost = (userData) => {
    setPostState({title: userData.title, description: userData.description, owner: userData.owner, date: userData.date, likeCount: userData.likeCount, commentCount: userData.commentCount});
  };

  // Function to display any selected post
  const displayPost = () => {
    setPostState({ title: title, description: description, owner: owner, date: date, likeCount: likeCount, commentCount: commentCount});
  };

  return (
    <PostContext.Provider value={{ ...postState, createPost, displayPost }}>
      {result}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
