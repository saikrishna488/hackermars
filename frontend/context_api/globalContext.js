"use client"
import { createContext, useState } from "react";

const globalContext = createContext();

const GlobalProvider = ({children})=>{

    const [user,setUser] = useState({})
    const [hackathons , setHackathons] = useState([])
    const [adminKey,setAdminKey] = useState({})
    const [client, setClient] = useState({})
    const [hackathon ,setHackathon] = useState([])


    const value = {
        user,
        setUser,
        hackathons,
        setHackathons,
        adminKey,
        setAdminKey,
        client,
        setClient,
        hackathon,
        setHackathon
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