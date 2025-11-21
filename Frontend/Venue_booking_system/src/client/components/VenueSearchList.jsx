import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MapPin, ChevronDown, SlidersHorizontal, X, DollarSign, Tag, Check, ArrowRight, Heart, Star } from 'lucide-react';

// --- MOCK DATA & UTILITIES ---

const MOCK_VENUES = [
    {
        id: 1, name: "Third Eye Function Center", location: "Rockdale, NSW", rating: 4.8, oldPrice: 60, newPrice: 50,
        description: "Your premier destination for exquisite dining and flawless service.",
        mainImageUrl: "https://placehold.co/400x300/1E3A8A/ffffff?text=Function+Center", type: 'Function Center', 
        thumbnails: ["https://placehold.co/80x60/3B82F6/ffffff?text=T1", "https://placehold.co/80x60/10B981/ffffff?text=T2", "https://placehold.co/80x60/F59E0B/ffffff?text=T3", "https://placehold.co/80x60/EF4444/ffffff?text=T4"],
    },
    {
        id: 2, name: "Himalayan Harmony Event Center", location: "Melbourne, VIC", rating: 4.9, oldPrice: 80, newPrice: 60,
        description: "Vast open spaces, exceptional acoustics, and bespoke decorating services.",
        mainImageUrl: "https://placehold.co/400x300/047857/ffffff?text=Event+Center", type: 'Function Center', 
        thumbnails: ["https://placehold.co/80x60/60A5FA/ffffff?text=S1", "https://placehold.co/80x60/34D399/ffffff?text=S2", "https://placehold.co/80x60/FBBF24/ffffff?text=S3", "https://placehold.co/80x60/F87171/ffffff?text=S4"],
    },
    {
        id: 3, name: "Everest Celebration Hall", location: "Sydney, NSW", rating: 4.6, oldPrice: 120, newPrice: 100,
        description: "A luxury ballroom experience in the heart of the city. Perfect for corporate functions.",
        mainImageUrl: "https://placehold.co/400x300/9333EA/ffffff?text=Celebration+Hall", type: 'Hotel & Resort', 
        thumbnails: ["https://placehold.co/80x60/A5B4FC/ffffff?text=L1", "https://placehold.co/80x60/C4B5FD/ffffff?text=L2", "https://placehold.co/80x60/FDE047/ffffff?text=L3", "https://placehold.co/80x60/F9A8D4/ffffff?text=L4"],
    },
    {
        id: 4, name: "Kathmandu Cultural Gathering Place", location: "Perth, WA", rating: 4.7, oldPrice: 80, newPrice: 50,
        description: "An authentic and beautifully decorated space designed for cultural events.",
        mainImageUrl: "https://placehold.co/400x300/F97316/ffffff?text=Cultural+Place", type: 'Community Hall', 
        thumbnails: ["https://placehold.co/80x60/FECACA/ffffff?text=A1", "https://placehold.co/80x60/FDBA74/ffffff?text=A2", "https://placehold.co/80x60/FCD34D/ffffff?text=A3", "https://placehold.co/80x60/A78BFA/ffffff?text=A4"],
    },
    {
        id: 5, name: "The Blue Lagoon Restaurant", location: "Sydney, NSW", rating: 4.5, oldPrice: 40, newPrice: 35,
        description: "Fine dining restaurant with private rooms perfect for intimate events.",
        mainImageUrl: "https://placehold.co/400x300/4F46E5/ffffff?text=Restaurant", type: 'Restaurant', 
        thumbnails: ["https://placehold.co/80x60/FCA5A5/ffffff?text=R1", "https://placehold.co/80x60/FDBA74/ffffff?text=R2", "https://placehold.co/80x60/FCD34D/ffffff?text=R3", "https://placehold.co/80x60/A78BFA/ffffff?text=R4"],
    },
    {
        id: 6, name: "Beachside Convention Center", location: "Gold Coast, QLD", rating: 4.2, oldPrice: 150, newPrice: 120,
        description: "Large-scale center perfect for trade shows and conventions.",
        mainImageUrl: "https://placehold.co/400x300/374151/ffffff?text=Convention+Hall", type: 'Function Center', 
        thumbnails: ["https://placehold.co/80x60/FCA5A5/ffffff?text=R1", "https://placehold.co/80x60/FDBA74/ffffff?text=R2", "https://placehold.co/80x60/FCD34D/ffffff?text=R3", "https://placehold.co/80x60/A78BFA/ffffff?text=R4"],
    },
];

// Utility function to parse price range strings into min/max numbers
const parsePriceRange = (rangeString) => {
    if (rangeString === 'Any price') return { min: 0, max: Infinity };
    const parts = rangeString.replace(/\$/g, '').split(' - ');
    if (parts.length === 2) return { min: Number(parts[0]), max: Number(parts[1]) };
    if (rangeString.includes('+')) return { min: Number(rangeString.replace('+', '')), max: Infinity };
    return { min: 0, max: Infinity };
};

// --- VenueCard Component ---

const VenueCard = ({ venue }) => {
    // The entire card links to the detail page
    const venueDetailPath = `/venue/${venue.id}`;

    // Handler for the Heart button
    const handleFavoriteToggle = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); // CRITICAL: Stop event from triggering the parent <a>
        console.log(`Venue ${venue.id} added to wishlist!`);
    };

    // Handler for the View Details button
    const handleViewDetailsClick = (e) => {
        e.stopPropagation(); // CRITICAL: Stop event from triggering the parent <a> click handler
        navigateTo(venueDetailPath, e); // Manually trigger navigation
    };

    return (
        // Wrap the entire card content in an anchor tag for navigation
        <a 
            href={venueDetailPath} // Mock navigation URL
            onClick={(e) => navigateTo(venueDetailPath, e)} // Use navigateTo to simulate router
            className="flex-col md:flex-row bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6 p-4 md:p-6 group relative block no-underline"
        >
            
            {/* Image Section (Left) */}
            <div className="md:w-1/3 relative shrink-0">
                <img 
                    src={venue.mainImageUrl} 
                    alt={venue.name} 
                    className="w-full h-48 md:h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.03] transform"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/cccccc/000000?text=Image+Unavailable"; }}
                />
                
                {/* Heart Icon for Wishlist - Using <button> with stopPropagation */}
                <button 
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-500 hover:text-white text-gray-600 transition-all z-10"
                    onClick={handleFavoriteToggle}
                    aria-label="Toggle favorite"
                >
                    <Heart size={20} fill={venue.isFavourite ? 'currentColor' : 'none'} />
                </button>
            </div>

            {/* Details Section (Right) */}
            <div className="md:w-2/3 md:pl-6 pt-4 md:pt-0 flex flex-col justify-between">
                
                {/* Top Header */}
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium text-blue-600 flex items-center">
                            <MapPin size={16} className="mr-1" />
                            {venue.location}
                        </p>
                        <div className="flex items-center text-sm font-semibold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                            <Star size={14} fill="currentColor" className="mr-1" />
                            {venue.rating.toFixed(1)}
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                        {venue.name}
                    </h2>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {venue.description}
                    </p>
                    
                    {/* Thumbnails */}
                    <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
                        {venue.thumbnails.map((url, index) => (
                            <img 
                                key={index}
                                src={url}
                                alt={`Gallery thumbnail ${index + 1}`}
                                className="w-16 h-12 object-cover rounded-lg border-2 border-transparent hover:border-blue-500 cursor-pointer shrink-0"
                                onClick={(e) => e.preventDefault()} // Prevent navigation when clicking thumbnail
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Bar: Price and Button */}
                <div className="flex justify-between items-center border-t pt-4 mt-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline">
                        <span className="text-sm text-gray-500 whitespace-nowrap mr-2">Starting from</span>
                        <p className="text-xl font-extrabold text-gray-900 flex items-baseline">
                            <span className="text-base text-gray-400 line-through mr-1">${venue.oldPrice}</span>
                            <span className="text-2xl text-red-600">${venue.newPrice}</span>
                            <span className="text-sm font-normal text-gray-500 ml-1">Per Person</span>
                        </p>
                    </div>
                    
                    {/* FIXED: Changed the nested <a> to a <button> to resolve the hydration error. */}
                    <button 
                        type="button"
                        className="px-5 py-2 bg-blue-600 text-white font-semibold text-sm rounded-full shadow-md hover:bg-blue-700 transition-colors whitespace-nowrap"
                        onClick={handleViewDetailsClick}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </a>
    );
};

// --- Filter Helper Components ---

const DropdownMenu = ({ title, options, selected, onSelect, onClose }) => (
    <div className="absolute z-50 mt-2 w-56 rounded-xl bg-white p-4 shadow-2xl border border-gray-100 transition ease-out duration-100 transform origin-top">
        <h3 className="text-md font-semibold text-gray-900 mb-3 border-b pb-2">{title}</h3>
        <ul className="space-y-2">
            {options.map((option) => (
                <li 
                    // FIX: Using option.value as key, which is guaranteed to be a unique string based on the data structure
                    key={option.value} 
                    className="flex justify-between items-center px-2 py-1 cursor-pointer hover:bg-blue-50 rounded-lg text-sm transition-colors"
                    onClick={() => onSelect(option.value)}
                >
                    <span className={option.value === selected ? 'font-bold text-blue-600' : 'font-medium text-gray-700'}>
                        {/* FIX: option.label is now correctly a string */}
                        {option.label}
                    </span>
                    {option.value === selected && <Check size={16} className="text-blue-600" />}
                </li>
            ))}
        </ul>
        <div className="mt-3 pt-3 border-t">
            <button 
                onClick={onClose}
                className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
                Close
            </button>
        </div>
    </div>
);

const LocationFilter = ({ filters, setFilters, onClose }) => {
    const [tempSearch, setTempSearch] = useState(filters.locationSearch);
    
    const handleApply = () => {
        setFilters(prev => ({ ...prev, locationSearch: tempSearch }));
        onClose();
    };

    return (
        <div className="absolute z-50 mt-2 w-80 rounded-xl bg-white p-4 shadow-2xl border border-gray-100 transition ease-out duration-100 transform origin-top-left">
            <h3 className="text-md font-semibold text-gray-900 mb-3">Search Location</h3>
            <div className="relative">
                <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
                <input 
                    type="text"
                    placeholder="Enter city, postcode, or region"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={tempSearch}
                    onChange={(e) => setTempSearch(e.target.value)}
                />
            </div>
            <div className="mt-4 flex justify-between items-center pt-2 border-t">
                <button 
                    onClick={onClose} 
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleApply} 
                    className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                    Apply <ArrowRight size={14} className="ml-1" />
                </button>
            </div>
        </div>
    );
};

const MoreFiltersModal = ({ onClose, filters, setFilters }) => {
    const [tempMin, setTempMin] = useState(filters.minPrice === 0 ? '' : filters.minPrice);
    const [tempMax, setTempMax] = useState(filters.maxPrice === Infinity ? '' : filters.maxPrice);

    const handleApply = () => {
        const minVal = Number(tempMin) || 0;
        const maxVal = Number(tempMax) || Infinity;
        
        setFilters(prev => ({
            ...prev,
            minPrice: minVal,
            maxPrice: maxVal
        }));
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-2xl h-auto max-h-[90vh] rounded-xl shadow-2xl p-6 overflow-y-auto">
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">All Filters</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Filter Group 1: Price Range */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center"><DollarSign size={20} className="mr-2 text-green-600" /> Custom Price Range</h3>
                        <p className="text-sm text-gray-500 mb-3">Set a specific budget range per person.</p>
                        <div className="flex space-x-4">
                            <input 
                                type="number" 
                                placeholder="Min Price (e.g., 50)" 
                                className="w-1/2 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                                value={tempMin}
                                onChange={(e) => setTempMin(e.target.value)}
                            />
                            <input 
                                type="number" 
                                placeholder="Max Price (e.g., 200)" 
                                className="w-1/2 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                                value={tempMax}
                                onChange={(e) => setTempMax(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Mock Filter Group 2: Venue Features (Visual only) */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center"><Tag size={20} className="mr-2 text-indigo-600" /> Venue Features (Mock)</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            {['Outdoor Area', 'Onsite Parking', 'In-house Catering', 'Wheelchair Access'].map(feature => (
                                <label key={feature} className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded text-indigo-600 border-gray-300" />
                                    <span>{feature}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t flex justify-between items-center">
                    <button 
                        onClick={() => { setFilters(prev => ({...prev, minPrice: 0, maxPrice: Infinity})); onClose(); }}
                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                    >
                        Clear Price Filters
                    </button>
                    <button 
                        onClick={handleApply} 
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                    >
                        Show Results
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- VenueFilter Component ---

const VenueFilter = ({ filters, setFilters }) => {
    // UI state for active filter dropdown/modal (managed locally by the filter component)
    const [activeFilter, setActiveFilter] = useState(null); 
    
    // Refs for detecting clicks outside of dropdowns
    const filterRefs = {
        location: useRef(null),
        price: useRef(null),
        types: useRef(null),
    };
    
    // Close dropdown if user clicks outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeFilter && activeFilter !== 'more') {
                const ref = filterRefs[activeFilter]?.current;
                if (ref && !ref.contains(event.target)) {
                    setActiveFilter(null);
                }
            }
        };

        if (activeFilter && activeFilter !== 'more') {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeFilter]);

    // Filter Options Definitions
    const priceOptions = [
        { label: 'Any price', value: 'Any price' },
        { label: '$0 - $50', value: '$0 - $50' },
        { label: '$51 - $100', value: '$51 - $100' },
        { label: '$101+', value: '$101+' },
    ];
    
    const typeOptions = [
        { label: 'All types', value: 'All types' },
        { label: 'Function Center', value: 'Function Center' },
        { label: 'Restaurant', value: 'Restaurant' },
        { label: 'Hotel & Resort', value: 'Hotel & Resort' },
        { label: 'Community Hall', value: 'Community Hall' },
    ];

    // HANDLERS
    
    const handlePriceSelect = (rangeString) => {
        const { min, max } = parsePriceRange(rangeString);
        setFilters(prev => ({ 
            ...prev, 
            minPrice: min, 
            maxPrice: max 
        }));
        setActiveFilter(null);
    };

    const handleTypeSelect = (typeString) => {
        setFilters(prev => ({ ...prev, venueType: typeString }));
        setActiveFilter(null);
    };
    
    const handleFilterToggle = (filterName) => {
        setActiveFilter(activeFilter === filterName ? null : filterName);
    };

    // Determine the currently selected price label for display
    const currentPriceLabel = priceOptions.find(opt => {
        const { min, max } = parsePriceRange(opt.value);
        return filters.minPrice === min && filters.maxPrice === max;
    })?.label || 'Custom Price';

    return (
        <>
            <div className="flex space-x-3 pb-4 flex-wrap mb-8">
                
                {/* 1. Location Filter */}
                <div className="relative" ref={filterRefs.location}>
                    <button 
                        className={`flex items-center space-x-2 px-6 py-3 border rounded-full bg-white shadow-sm transition duration-150 shrink-0 mb-2 
                            ${activeFilter === 'location' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300 hover:border-gray-400'}`}
                        onClick={() => handleFilterToggle('location')}
                    >
                        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            {filters.locationSearch ? `Location: ${filters.locationSearch}` : 'Search by location'}
                        </span>
                        <MapPin size={18} className="text-gray-500" />
                    </button>
                    {activeFilter === 'location' && 
                        <LocationFilter 
                            filters={filters} 
                            setFilters={setFilters} 
                            onClose={() => setActiveFilter(null)} 
                        />}
                </div>

                {/* 2. Price Dropdown Filter */}
                <div className="relative" ref={filterRefs.price}>
                    <button 
                        className={`flex items-center space-x-1 px-4 py-3 border rounded-full bg-white shadow-sm transition duration-150 shrink-0 mb-2
                            ${activeFilter === 'price' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300 hover:border-gray-400'}`}
                        onClick={() => handleFilterToggle('price')}
                    >
                        <span className="text-sm font-medium text-gray-700">
                            {currentPriceLabel}
                        </span>
                        <ChevronDown size={18} className="text-gray-500" />
                    </button>
                    {activeFilter === 'price' && (
                        <DropdownMenu 
                            title="Filter by Price"
                            options={priceOptions}
                            selected={currentPriceLabel}
                            onSelect={handlePriceSelect}
                            onClose={() => setActiveFilter(null)}
                        />
                    )}
                </div>

                {/* 3. Types Dropdown Filter */}
                <div className="relative" ref={filterRefs.types}>
                    <button 
                        className={`flex items-center space-x-1 px-4 py-3 border rounded-full bg-white shadow-sm transition duration-150 shrink-0 mb-2
                            ${activeFilter === 'types' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300 hover:border-gray-400'}`}
                        onClick={() => handleFilterToggle('types')}
                    >
                        <span className="text-sm font-medium text-gray-700">
                            {filters.venueType}
                        </span>
                        <ChevronDown size={18} className="text-gray-500" />
                    </button>
                    {activeFilter === 'types' && (
                        <DropdownMenu 
                            title="Filter by Type"
                            // FIX: Passing typeOptions directly as it is already an array of { label, value } objects. 
                            // This resolves the "Objects are not valid as a React child" and the duplicate key error.
                            options={typeOptions}
                            selected={filters.venueType}
                            onSelect={handleTypeSelect}
                            onClose={() => setActiveFilter(null)}
                        />
                    )}
                </div>

                {/* 4. More Filters Button (Opens Modal for Custom Price Range) */}
                {/* <button 
                    className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-full bg-white shadow-sm hover:border-gray-400 transition duration-150 shrink-0 mb-2"
                    onClick={() => handleFilterToggle('more')}
                >
                    <SlidersHorizontal size={18} className="text-gray-700" />
                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                        More Filters
                    </span>
                </button> */}
            </div>
            
            {/* Conditional Modal Render */}
            {activeFilter === 'more' && 
                <MoreFiltersModal 
                    onClose={() => setActiveFilter(null)} 
                    filters={filters}
                    setFilters={setFilters}
                />}
        </>
    );
}

// --- VenueSearchResults (Main Component - Default Export) ---

function VenueSearchResults() {
    
    const locationText = "New South Wales";
    
    // Central state for all active filters
    const [filters, setFilters] = useState({
        locationSearch: '',
        minPrice: 0,
        maxPrice: Infinity,
        venueType: 'All types',
    });
    
    // FILTERING LOGIC using useMemo
    const filteredVenues = useMemo(() => {
        const { locationSearch, minPrice, maxPrice, venueType } = filters;

        const lowerCaseSearch = locationSearch.toLowerCase().trim();

        return MOCK_VENUES.filter(venue => {
            // 1. Location Search Filter (checks venue name and location)
            const matchesLocation = lowerCaseSearch === '' || 
                venue.location.toLowerCase().includes(lowerCaseSearch) ||
                venue.name.toLowerCase().includes(lowerCaseSearch);

            // 2. Price Range Filter
            const matchesPrice = venue.newPrice >= minPrice && venue.newPrice <= maxPrice;

            // 3. Venue Type Filter
            const matchesType = venueType === 'All types' || venue.type === venueType;

            return matchesLocation && matchesPrice && matchesType;
        });
    }, [filters]);

    const totalResults = filteredVenues.length;
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans bg-gray-50 min-h-screen">
            
            {/* Results Header */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                <span className="font-extrabold">{totalResults} Results</span> 
                <span className="text-xl font-normal text-gray-500 ml-2">in {locationText}</span>
            </h1>

            {/* Filter Component */}
            <VenueFilter 
                filters={filters} 
                setFilters={setFilters} 
            />
            
            {/* Venue Listings Section */}
            <div className="space-y-6">
                {totalResults > 0 ? (
                    filteredVenues.map(venue => (
                        <VenueCard key={venue.id} venue={venue} />
                    ))
                ) : (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-lg shadow-inner mt-10">
                        <p className="font-semibold">No venues match your current filters.</p>
                        <p className="text-sm">Try adjusting your location, price, or type selections.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VenueSearchResults;