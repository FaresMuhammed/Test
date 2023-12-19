// we will use context to storing user information to protect them
// we will delete all localstorage

import { createContext, useState } from "react";

export const User = createContext({})    // the context we will use to store user information

export default function UserProvider({ children }) { 
    
  const[Auth , setAuth] = useState({})    // the value in user is auth&setauth
    
  return <User.Provider value={{Auth , setAuth}}>{ children }</User.Provider>;}