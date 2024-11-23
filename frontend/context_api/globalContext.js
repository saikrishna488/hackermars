"use client"
import { createContext, useState } from "react";

const globalContext = createContext();

const GlobalProvider = ({children})=>{

    const [user,setUser] = useState({})
    const [hackathons , setHackathons] = useState([])
    const [admin,setAdmin] = useState({})
    const [hackathon ,setHackathon] = useState([])
    const [project,setProject] = useState({});


    const value = {
        user,
        setUser,
        hackathons,
        setHackathons,
        admin,
        setAdmin,
        hackathon,
        setHackathon,
        project,
        setProject
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