import React, { useState, useRef, useEffect } from 'react';

const mockHotels = [
    { id: 1, name: "Luxury Venue Hotel", location: "New York, USA", imageUrl: "https://placehold.co/40x40/D1E9FF/1C3AA9?text=H1" },
    { id: 2, name: "Riverside Grand Resort", location: "London, UK", imageUrl: "https://placehold.co/40x40/D1E9FF/1C3AA9?text=H2" },
    { id: 3, name: "The Quiet Manor", location: "Paris, France", imageUrl: "https://placehold.co/40x40/D1E9FF/1C3AA9?text=H3" },
    { id: 4, name: "Digital Events Hub", location: "Remote, Global", imageUrl: "https://placehold.co/40x40/D1E9FF/1C3AA9?text=H4" },
    { id: 5, name: "Grand Ballrooms & Suites", location: "Miami, USA", imageUrl: "https://placehold.co/40x40/D1E9FF/1C3AA9?text=H5" },
];

const HotelSelector = ({ hotels, onSelect, searchQuery }) => {
    // Filter results based on the current input query (case-insensitive)
    const filteredHotels = hotels.filter(hotel => 
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="absolute left-0 top-full mt-2 w-[400px] bg-white p-2 rounded-xl shadow-2xl z-30 border border-gray-100 max-h-80 overflow-y-auto">
            {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel) => (
                    <div 
                        key={hotel.id}
                        className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-150"
                        onClick={() => onSelect(hotel)}
                    >
                        {/* Hotel Photo */}
                        <img 
                            src={hotel.imageUrl} 
                            alt={hotel.name} 
                            className="h-10 w-10 rounded-lg object-cover shadow"
                            // Fallback for image loading
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x40/9CA3AF/FFFFFF?text=X"; }}
                        />
                        
                        {/* Hotel Info */}
                        <div>
                            <div className="font-semibold text-gray-800">{hotel.name}</div>
                            <div className="text-gray-500 text-sm">{hotel.location}</div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-3 text-center text-gray-500">No venues found matching "{searchQuery}".</div>
            )}
        </div>
    );
};

export default HotelSelector