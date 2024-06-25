import React, { createContext, useState } from 'react'


export const SearchContext=createContext();
const Searchquery = (props) => {

    const [filter,setFilter] =useState("");
  return (
   <SearchContext.Provider value={{filter,setFilter}} >
      {props.children}
  </SearchContext.Provider>
  )
}

export default Searchquery;