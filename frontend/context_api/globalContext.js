"use client"
import { createContext, useState } from "react";

const globalContext = createContext();

const GlobalProvider = ({children})=>{

    const [user,setUser] = useState({})
    const [hackathons , setHackathons] = useState([])


    const value = {
        user,
        setUser,
        hackathons,
        setHackathons
    }

    return (
        <globalContext.Provider value={
            value
        }>
            {children}
        </globalContext.Provider>
    )
}

export {globalContext,GlobalProvider}