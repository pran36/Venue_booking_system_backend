import React, { useState, useRef, useEffect} from 'react';
import GuestSelector from './GuestSelector';
import HotelSelector from './HotelSelector';

  // Heroicon SVGs (usually imported from a library like @heroicons/react)
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
const SearchBar = () => {
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
        <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <form className="flex rounded-full bg-white shadow-xl max-w-4xl mx-auto h-16 divide-x divide-gray-200" onSubmit={(e) => e.preventDefault()}>
                    
                    {/* 1. Input: Type Name, Location or Category */}
                    <div 
                        className="flex-1 flex items-center p-4 rounded-l-full hover:bg-gray-100 transition duration-150 relative"
                        onClick={handleSearchInputClick}
                    >
                        <VenueIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <input 
                            type="text" 
                            placeholder="Type Name, Location or Category" 
                            className="focus:outline-none w-full bg-transparent text-gray-700 placeholder-gray-400 font-semibold" 
                            value={searchQuery}
                            onChange={handleSearchQueryChange}
                        />
                        {/* Hotel Selector Dropdown */}
                        {isHotelSelectorOpen && (
                            <HotelSelector 
                                hotels={mockHotels} 
                                onSelect={handleVenueSelect} 
                                searchQuery={searchQuery}
                            />
                        )}
                    </div>

                {/* Input 2: When (Click Handler) */}
                <div 
                    className="shrink-0 w-32 flex items-center px-4 cursor-pointer hover:bg-gray-100 transition duration-150"
                    onClick={handleWhenClick}
                >
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

                {/* Input 3: Guest */}
                <div 
                        className="shrink-0 w-28 flex items-center px-4 cursor-pointer hover:bg-gray-100 transition duration-150 relative"
                        onClick={handleGuestClick}
                    >
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
                <button type="submit" className="w-32 flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-r-full transition duration-150 space-x-2">
                    <SearchIcon className="h-5 w-5" />
                    <span>Search</span>
                </button>
                
            </form>
        </main>
    </div>
  )
}

export default SearchBar