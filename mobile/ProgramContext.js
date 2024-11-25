import React, { createContext, useContext, useState } from 'react';

const ProgramContext = createContext(null);

export const ProgramProvider = ({ result }) => {
  const [programState, setProgramState] = useState({
    title: null, 
    description: null,
    labels: null,
    exercises: null
  });

  // Function to create a post and store that post
  const createProgram = (userData) => {
    setProgramState({title: userData.title, description: userData.description, labels: userData.labels, exercises: userData.exercises});
  };

  // Function to display any selected post
  const displayProgram = () => {
    setProgramState({ title: title, description: description, labels: labels, exercises: exercises });
  };

  return (
    <ProgramContext.Provider value={{ ...programState, createProgram, displayProgram }}>
      {result}
    </ProgramContext.Provider>
  );
};

export const useProgram = () => useContext(ProgramContext);
