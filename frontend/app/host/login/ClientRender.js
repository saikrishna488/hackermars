"use client";

import React, { useContext, useEffect } from 'react';
import axios from 'axios'; 
import { toast } from 'react-toastify';
import { globalContext } from '@/context_api/globalContext';

const ClientRender = () => {
    const { client, setClient } = useContext(globalContext);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const renderUser = async (token) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/client/jwt`, { token });
            const data = res.data;


            
            if (data.res) {
                setClient(data.client);
                console.log(data.client)
            } else {
                toast.error("Failed to fetch client data.");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while fetching user data.");
        }
    };

    useEffect(() => {

        
        if (!client.name) {
            const token = getCookie("clientToken");
            if (token) {
                renderUser(token);
            }
        }
    }, [client?.name]);

    return null; // This component does not render anything
};

export default ClientRender;
