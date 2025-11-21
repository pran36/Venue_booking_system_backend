import React, { useState, useRef, useEffect} from 'react';
import { Search, Calendar, Users } from 'lucide-react';
import HotelSelector from '../HotelSelector';
import GuestSelector from '../GuestSelector';

const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const totalGuests = 4; // Placeholder for actual state
const CalendarIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5" />
    </svg>
);
const UserIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0H4.501Z" />
    </svg>
);
const SearchIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);
const VenueIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.25c0-.66.59-1.2 1.33-1.2h5.59c.74 0 1.33.54 1.33 1.2V21M3.75 12h.008v.008H3.75V12Zm4.5 0h.008v.008H8.25V12Zm4.5 0h.008v.008h-.008V12Zm4.5 0h.008v.008h-.008V12Zm2.25 0h.008v.008h-.008V12ZM4.5 16.5h.008v.008H4.5V16.5Zm4.5 0h.008v.008H9V16.5Zm4.5 0h.008v.008h-.008V16.5Zm4.5 0h.008v.008h-.008V16.5Zm2.25 0h.008v.008h-.008V16.5Zm-18-5.25v6.75a2.25 2.25 0 0 0 2.25 2.25h15.75a2.25 2.25 0 0 0 2.25-2.25v-6.75m-18 0a2.25 2.25 0 0 1 2.25-2.25h15.75a2.25 2.25 0 0 1 2.25 2.25m-18 0V7.5a2.25 2.25 0 0 1 2.25-2.25h15.75a2.25 2.25 0 0 1 2.25 2.25v4.5M6 10.5h.008v.008H6V10.5Zm2.25 0h.008v.008H8.25V10.5Zm4.5 0h.008v.008h-.008V10.5Zm4.5 0h.008v.008h-.008V10.5Z" />
    </svg>
);
const mockHotels = [
    { id: 1, name: "Luxury Venue Hotel", location: "New York, USA", imageUrl: "https://placehold.co/40x40/D1E9FF/1C3AA9?text=H1" },
    { id: 2, name: "Riverside Grand Resort", location: "London, UK", imageUrl: "https://placehold.co/40x40/D1E9FF/1C3AA9?text=H2" },
    { id: 3, name: "The Quiet Manor", location: "Paris, France", imageUrl: "https://placehold.co/40x40/D1E9FF/1C3AA9?text=H3" },
    { id: 4, name: "Digital Events Hub", location: "Remote, Global", imageUrl: "https://placehold.co/40x40/D1E9FF/1C3AA9?text=H4" },
    { id: 5, name: "Grand Ballrooms & Suites", location: "Miami, USA", imageUrl: "https://placehold.co/40x40/D1E9FF/1C3AA9?text=H5" },
]; 

function SearchBarPage() {
    const [selectedDate, setSelectedDate] = useState('');
        const dateInputRef = useRef(null);
        // State for Guest Selector
        const [isGuestSelectorOpen, setIsGuestSelectorOpen] = useState(false);
        const [guestCounts, setGuestCounts] = useState({ adults: 1, children: 0, infants: 0 });
        // 1. Function to handle the date selection
        const handleDateChange = (event) => {
            setSelectedDate(event.target.value);
        };
        
        // 2. Function to trigger the calendar picker when the section is clicked
        const handleWhenClick = () => {
            if (dateInputRef.current && dateInputRef.current.showPicker) {
                dateInputRef.current.showPicker();
            } else if (dateInputRef.current) {
                 // Fallback for browsers without showPicker
                 dateInputRef.current.focus();
                 dateInputRef.current.click();
            }
        };
    
        // State for Hotel Selector (NEW)
        const [isHotelSelectorOpen, setIsHotelSelectorOpen] = useState(false);
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedVenue, setSelectedVenue] = useState(null);
    
        // Helper to format date for display
        const getDisplayDate = () => {
            if (!selectedDate) return 'When';
            
            // Date formatting in React for display
            const date = new Date(selectedDate.replace(/-/g, '/'));
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        };
         // Handlers for Guest Selector
        const handleGuestChange = (newCounts) => setGuestCounts(newCounts);
        const handleGuestClick = (e) => {
            e.stopPropagation(); // Prevent the click from bubbling up and closing
            setIsHotelSelectorOpen(false); // Close other dropdowns
            setIsGuestSelectorOpen(prev => !prev);
        };
        const getDisplayGuests = () => {
            const totalGuests = guestCounts.adults + guestCounts.children;
            if (totalGuests === 0) return 'Guest';
            return `${totalGuests} Guest${totalGuests > 1 ? 's' : ''}`;
        };
    
        // Handlers for Hotel Selector (NEW)
        const handleSearchInputClick = (e) => {
            e.stopPropagation(); // Prevent the click from bubbling up and closing
            setIsGuestSelectorOpen(false); // Close other dropdowns
            setIsHotelSelectorOpen(true);
        };
        
        const handleVenueSelect = (hotel) => {
            setSelectedVenue(hotel);
            setSearchQuery(hotel.name);
            setIsHotelSelectorOpen(false);
        };
        
        const handleSearchQueryChange = (e) => {
            setSearchQuery(e.target.value);
            setSelectedVenue(null); // Clear selected venue if user starts typing again
            setIsHotelSelectorOpen(true); // Open selector on type
        };
    
        // Close dropdowns when clicking outside
        useEffect(() => {
            const closeDropdowns = () => {
                setIsHotelSelectorOpen(false);
                setIsGuestSelectorOpen(false);
            };
            document.addEventListener('click', closeDropdowns);
            return () => document.removeEventListener('click', closeDropdowns);
        }, []);
    
        const textStyle = selectedDate 
            ? 'text-gray-800' 
            : 'text-gray-500';
  return (
    <div>
        <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center bg-gray-100 rounded-full p-2 shadow-inner max-w-xl mx-auto">
        
        {/* Looking For / Category Field */}
        <div className="flex-1 px-4 py-2 flex items-center space-x-2 text-gray-800 cursor-pointer bg-white rounded-full shadow-md -m-1 mr-1 relative" onClick={handleSearchInputClick}>
            <Search size={20} className="text-blue-600" />
            <input 
                type="text" 
                placeholder="Venue, Service, or Category" 
                className="w-full text-sm font-semibold text-gray-800 focus:outline-none bg-transparent"
                value={searchQuery}
                onChange={handleSearchQueryChange}
            />
            {/* Hotel Selector Dropdown */}
                        {isHotelSelectorOpen && (
                            <HotelSelector 
                                hotels={mockHotels} 
                                onSelect={handleVenueSelect} 
                                searchQuery={searchQuery}
                            />)}
        </div>

        {/* When Field */}
        <div className="flex-1 px-4 py-2 flex items-center space-x-2 text-gray-400 cursor-pointer border-r border-gray-300" onClick={handleWhenClick}>
            <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className={`whitespace-nowrap font-medium ${textStyle}`}>
                        {getDisplayDate()}
                    </span>

                    {/* Hidden Native Date Input */}
                    <input 
                        type="date" 
                        ref={dateInputRef} // Ref to access the DOM element
                        className="sr-only" // sr-only hides the input visually but keeps it accessible/functional
                        onChange={handleDateChange}
                        value={selectedDate}
                    />
        </div>

        {/* Guest Field */}
        <div className="shrink-0 w-28 flex items-center px-4 cursor-pointer hover:bg-gray-100 transition duration-150 relative" onClick={handleGuestClick}>
            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className={`whitespace-nowrap font-medium ${guestCounts.adults > 1 || guestCounts.children > 0 || guestCounts.infants > 0 ? 'text-gray-800' : 'text-gray-500'}`}>
                            {getDisplayGuests()}
                        </span>

                        {/* Guest Selector Dropdown */}
                        {isGuestSelectorOpen && (
                            <GuestSelector 
                                initialCounts={guestCounts} 
                                onGuestChange={handleGuestChange} 
                            />
                        )}
        </div>

        {/* Search Button */}
        <button className="bg-black text-white p-3 rounded-full flex items-center justify-center w-12 h-12 ml-2 hover:bg-gray-800 transition-colors flex-shrink-0">
            <Search size={20} />
        </button>
    </div></form></div>
  )
}

export default SearchBarPage