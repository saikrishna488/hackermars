"use client";
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { globalContext } from '@/context_api/globalContext';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import MobileView from './MobileView';
import Sidebar from './Sidebar';

const Hackathons = () => {
    const [selectedHackathon, setSelectedHackathon] = useState({});
    const { hackathons, setHackathons } = useContext(globalContext);
    const [filteredHackathons, setFilteredHackathons] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchHackathons = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hackathon/show`);
                if (res.data.res) {
                    setHackathons(res.data.hackathons);
                    setSelectedHackathon(res.data.hackathons[0] || {});
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHackathons();
    }, [setHackathons]);

    const handleCardClick = (hackathon) => setSelectedHackathon(hackathon);

    return (
        <div className='h-screen lg:pt-16 pt-32 relative'>
            {loading && <div className="spinner">Loading...</div>}
            <div className='flex flex-row w-full h-full'>
                <Sidebar
                    hackathons={hackathons}
                    setHackathons={setHackathons}
                    setSelectedHackathon={setSelectedHackathon}
                />
                {hackathons.length > 0 ? (
                    <>
                        <LeftSection
                            hackathons={filteredHackathons.length ? filteredHackathons : hackathons}
                            setSelectedHackathon={handleCardClick}
                        />
                        <RightSection hackathon={selectedHackathon} />
                        <MobileView hackathons={filteredHackathons.length ? filteredHackathons : hackathons} />
                    </>
                ) : (
                    <div className="flex items-center justify-center w-full">
                        <h4 className="text-gray-600">No hackathons found. Please refresh the page.</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hackathons;
