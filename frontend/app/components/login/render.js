"use client";

import React, { useContext, useEffect } from 'react';
import axios from 'axios'; // Make sure to import axios
import { toast } from 'react-toastify';
import { globalContext } from '@/context_api/globalContext';

const UserRender = () => {
    const { user, setUser } = useContext(globalContext);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const renderUser = async (token) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/google`, {
                token
            });

            const data = res.data;

            if (data.res) {
                setUser(data.user);
            }
        } catch (err) {
            // console.error('Error:', err);
        }


        try{
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/jwt`, {
                token
            });

            const data = res.data;
            if (data.res) {
                setUser(data.user);
            }

        }
        catch(err){
            
        }
    };

    useEffect(() => {
        if (!user.name) {
            const token = getCookie("token");
            if (token) {
                renderUser(token);
            }
        }
    }, [user.name]);

    return null; // This component does not render anything
};

export default UserRender;
