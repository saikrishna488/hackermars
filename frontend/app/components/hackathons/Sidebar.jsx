import React from 'react';

const Sidebar = ({ hackathons, setHackathons, setSelectedHackathon }) => {
    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        // Reset to the original list of hackathons when "all" is selected
        let filteredHackathons = [...hackathons];

        if (name === "sort") {
            if (value === "date") {
                filteredHackathons.sort((a, b) => new Date(a.date) - new Date(b.date));
            } else if (value === "popularity") {
                filteredHackathons.sort((a, b) => b.registered_users.length - a.registered_users.length);
            } else if (value === "name") {
                filteredHackathons.sort((a, b) => a.title.localeCompare(b.title));
            }
        } else if (name === "date") {
            if (value === "upcoming") {
                filteredHackathons = filteredHackathons.filter(h => new Date(h.date) > new Date());
            } else if (value === "past") {
                filteredHackathons = filteredHackathons.filter(h => new Date(h.date) < new Date());
            }
        } else if (name === "mode") {
            if (value === "online") {
                filteredHackathons = filteredHackathons.filter(h => h.mode === "online");
            } else if (value === "offline") {
                filteredHackathons = filteredHackathons.filter(h => h.mode === "offline");
            }
        }

        // Update the hackathons state and select the first one
        setHackathons(filteredHackathons);
        setSelectedHackathon(filteredHackathons[0] || null); // Handle case if no hackathons match
    };

    return (
        <div className="lg:block hidden w-1/5 p-5 bg-gray-100 border-r border-gray-300">
            <h3 className="text-lg font-semibold mb-4">Filter Hackathons</h3>

            <label htmlFor="sortFilter" className="block mb-1">Sort By:</label>
            <select
                id="sortFilter"
                name="sort"
                onChange={handleFilterChange}
                className="mb-4 p-2 border border-gray-300 rounded"
            >
                <option value="date">Date</option>
                <option value="popularity">Popularity</option>
                <option value="name">Name</option>
            </select>

            <label htmlFor="dateFilter" className="block mb-1">Date:</label>
            <select
                id="dateFilter"
                name="date"
                onChange={handleFilterChange}
                className="mb-4 p-2 border border-gray-300 rounded"
            >
                <option value="all">All Dates</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
            </select>

            <label htmlFor="modeFilter" className="block mb-1">Mode:</label>
            <select
                id="modeFilter"
                name="mode"
                onChange={handleFilterChange}
                className="mb-4 p-2 border border-gray-300 rounded"
            >
                <option value="all">All Modes</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
            </select>
        </div>
    );
};

export default Sidebar;
