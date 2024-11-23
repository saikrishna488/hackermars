// ServerFetchUser.jsx
import { cookies } from 'next/headers';
import axios from 'axios';
import ClientSetUser from './ClientSetUser';

export default async function ServerFetchUser() {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    const googleToken = cookieStore.get('google_token')?.value;

    let user = null;

    try {
        if (token) {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/jwt`, { token });
            user = res.data?.res ? res.data.user : null;
        } else if (googleToken) {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/google`, { token: googleToken });
            user = res.data?.res ? res.data.user : null;
        }
    } catch (err) {
        console.error('Error fetching user:', err);
    }

    return <ClientSetUser user={user} />;
}