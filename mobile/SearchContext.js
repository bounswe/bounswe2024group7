import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext(null);

export const SearchProvider = ({ result }) => {
  const [searchState, setSearchState] = useState({
    title: null,
    image: null,
    creator: null,
    type: null,
  });

  // Function to make a search and store that result
  const search = (searchData) => {
    setSearchState({ title: searchData.title, image: searchData.image, creator: searchData.creator, type: searchData.type});
  };

  return (
    <SearchContext.Provider value={{ ...searchState, search }}>
      {result}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
