import React, { useContext, useState, createContext } from 'react';

// create a context:
const CharactersContext = createContext([]);

// export the provider as function
export function CharactersProvider({children}) {
  // set the state with the intial shape of the data
  const [characters, setCharacters] = useState([]);
  // return the provider as a component and the props are based on what you destructured from useState()
  return (
    <CharactersContext.Provider value={[characters, setCharacters]}>
      {children}
    </CharactersContext.Provider>
  );
}
// export the a function to use the context
export function useCharactersContext() {
  return useContext(CharactersContext);
}