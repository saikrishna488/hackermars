// ClientSetUser.jsx
'use client';

import { useContext, useEffect } from 'react';
import { globalContext } from '@/context_api/globalContext';

export default function ClientSetUser({ user }) {
    const { setUser } = useContext(globalContext);

    useEffect(() => {
        if (user) {
            setUser(user);
        }

        
    }, [user, setUser]);

    return null; // No visible output, only setting state
}
