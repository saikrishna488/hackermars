

import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
    title: "HackerMars",
    description: "HackerMars at your Service",
};

export default function Layout({ children }) {
    return (
        <>
        {
            children
        }
        </>
    );
}
