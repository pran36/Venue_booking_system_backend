import React, { useState, useMemo, useEffect } from 'react';
import { 
    MapPin, Star, Heart, Share2, Calendar, Users, DollarSign, Utensils, Zap, Bus, Car, Wifi, Cake, Camera, Music3, Palette, UserCheck 
} from 'lucide-react';
import TopBar from './Topbar/Topbar';

// --- MOCK DATA ---
const MOCK_VENUE_DATA_LIST = [
    {
        id: 1,
        name: "Third Eye Function Center",
        location: "Rockdale, NSW",
        rating: 4.8,
        reviewCount: 125,
        minCapacity: 150,
        maxCapacity: 500,
        description: "At Third Eye Function Center, we pride ourselves on offering an exceptional venue that caters to all your event needs. Whether you're planning a birthday celebration, christening, engagement party, wedding reception, or corporate function, our state-of-the-art facilities provide the perfect setting to create lasting memories. Our team is dedicated to flawless execution and exquisite dining.",
        mainImageUrl: "https://placehold.co/800x600/6B21A8/ffffff?text=Main+Function+Room+ID+1",
        gallery: [
            { url: "https://placehold.co/200x150/8B5CF6/ffffff?text=Dining+Setup", type: 'image' },
            { url: "https://placehold.co/200x150/A78BFA/ffffff?text=Venue+Video", type: 'video' },
            { url: "https://placehold.co/200x150/C4B5FD/ffffff?text=Event+Night", type: 'image' },
            { url: "https://placehold.co/200x150/DBD2F6/ffffff?text=Lounge+Area", type: 'image' },
        ],
        features: [
            { name: "Meeting Rooms", icon: UserCheck },
            { name: "Banquet Halls", icon: Cake },
            { name: "Outdoor Spaces", icon: MapPin },
            { name: "Catering Services", icon: Utensils },
            { name: "Parking", icon: Car },
        ],
        services: [
            { name: "Function Center", icon: Bus },
            { name: "Business Event", icon: UserCheck },
            { name: "Catering", icon: Utensils },
            { name: "Photography & Videography", icon: Camera },
        ]
    },
    {
        id: 2,
        name: "Himalayan Harmony Event Center",
        location: "Melbourne, VIC",
        rating: 4.5,
        reviewCount: 88,
        minCapacity: 50,
        maxCapacity: 250,
        description: "A breathtaking venue perfect for intimate weddings and corporate retreats. Himalayan Harmony offers unparalleled views and customizable spaces, ensuring your event is both serene and spectacular.",
        mainImageUrl: "https://placehold.co/800x600/059669/ffffff?text=Harmony+Hall+ID+2",
        gallery: [
            { url: "https://placehold.co/200x150/34D399/ffffff?text=Lounge+View", type: 'image' },
            { url: "https://placehold.co/200x150/6EE7B7/ffffff?text=Garden+Patio", type: 'image' },
            { url: "https://placehold.co/200x150/A7F3D0/ffffff?text=Setup+Draft", type: 'image' },
            { url: "https://placehold.co/200x150/D1FAE5/ffffff?text=Night+Shot", type: 'image' },
        ],
        features: [
            { name: "Outdoor Spaces", icon: MapPin },
            { name: "Free Wi-Fi", icon: Wifi },
            { name: "Valet Parking", icon: Car },
        ],
        services: [
            { name: "DJ Service", icon: Music3 },
            { name: "Decor", icon: Palette },
            { name: "Make Up Artist", icon: UserCheck },
        ]
    }
];

// Mock function to simulate fetching data based on ID
const getVenueById = (id) => {
    // Note: We convert ID to string/number if necessary for real use cases, but MOCK_VENUE_DATA_LIST uses number
    return MOCK_VENUE_DATA_LIST.find(venue => venue.id === Number(id));
};


// --- CUSTOM HOOK TO SIMULATE ROUTING ---
// In a real app, this would be replaced by: 
// import { useParams } from 'react-router-dom';
// const { venueId } = useParams();
const useSimulatedRouteId = () => {
    // This state simulates the dynamic parameter read from the URL (e.g., '/venue/1')
    const [routeId, setRouteId] = useState(1); 
    
    // We return the ID as 'venueId' and the function to change it (for the demo buttons)
    return { 
        venueId: routeId, 
        setRouteId: setRouteId 
    }; 
};


// --- Sub Components ---

const Header = ({ setRouteId }) => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
            {/* Logo Placeholder */}
            <div className="flex items-center space-x-2 text-xl font-bold text-gray-800">
                <span className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center text-white text-lg font-serif">V</span>
                <span>VenueVerse</span>
            </div>
            
            

            {/* User Actions Placeholder */}
            <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Zap size={20} />
                </button>
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
                    A
                </div>
            </div>
        </div>
    </header>
);

const VenueGallery = ({ venue }) => {
    const mainImage = venue.mainImageUrl;
    const sideImages = venue.gallery.slice(0, 4);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-3 mb-8">
            {/* Main Image (Large on left) */}
            <div className="md:col-span-2 lg:row-span-2 overflow-hidden rounded-xl shadow-lg">
                <img 
                    src={mainImage} 
                    alt={venue.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
            </div>

            {/* Side Images/Videos (Small on right) */}
            {sideImages.map((item, index) => (
                <div key={index} className="relative overflow-hidden rounded-xl shadow-md group">
                    <img 
                        src={item.url} 
                        alt={`Gallery view ${index + 1}`} 
                        className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    {/* Overlay for Video/More Photos button */}
                    {item.type === 'video' ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white font-semibold">
                            ▶ Video
                        </div>
                    ) : (
                        index === 3 && (
                            <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white font-semibold text-sm hover:bg-opacity-50 transition-colors">
                                <Camera size={20} className="mr-1" /> See All 24 Photos/Videos
                            </button>
                        )
                    )}
                </div>
            ))}
        </div>
    );
};

const BookingSummary = ({ venue }) => {
    // State for booking inputs (simplified for demo)
    const [date, setDate] = useState('2025-07-25');
    const [adults, setAdults] = useState(100);

    // Mock pricing calculation
    const mockPricing = useMemo(() => {
        // Base cost changes based on venue ID
        const costPerPerson = venue.id === 1 ? 50 : 65; 
        const visionCost = venue.id === 1 ? 2000 : 1500;
        const photographyCost = venue.id === 1 ? 500 : 800;
        
        const subtotal = adults * costPerPerson;
        const totalBeforeTax = subtotal + visionCost + photographyCost;
        const tax = totalBeforeTax * 0.10; // 10% mock tax
        const total = totalBeforeTax + tax;
        
        return {
            costPerPerson,
            subtotal,
            tax,
            visionCost,
            photographyCost,
            total: total.toFixed(2),
            minDeposit: (total * 0.20).toFixed(2) // 20% deposit
        };
    }, [adults, venue.id]);

    const handleCopy = () => {
        const bookingDetails = `Venue: ${venue.name}\nDate: ${date}\nGuests: ${adults} Adults\nTotal Estimated Cost: $${mockPricing.total}`;
        
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = bookingDetails;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        
        try {
            document.execCommand('copy');
            // Log to console instead of alert
            console.log('Booking details copied to clipboard!'); 
        } catch (err) {
            console.error('Could not copy text: ', err);
        }
        document.body.removeChild(tempTextarea);
    };

    return (
        <div className="sticky top-20 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
                <h3 className="text-xl font-bold text-gray-900">Booking Summary</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors" onClick={() => console.log('Clear Form')}>
                    Clear
                </button>
            </div>

            {/* Input Fields */}
            <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-2">
                    <Calendar size={20} className="text-gray-500" />
                    <input 
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                
                <div className="flex items-center space-x-2">
                    <Users size={20} className="text-gray-500" />
                    <input 
                        type="number" 
                        placeholder="Adults" 
                        min="1"
                        value={adults} 
                        onChange={(e) => setAdults(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                
                {/* Guest Breakdown (Simplified) */}
                <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between py-1"><span>Adults (13+)</span><span>{adults}</span></div>
                    <div className="flex justify-between py-1"><span>Children (2-12)</span><span>0</span></div>
                    <div className="flex justify-between py-1"><span>Infants (Under 2)</span><span>0</span></div>
                    <div className="flex justify-between py-1 font-semibold text-gray-700 border-t mt-1 pt-1"><span>Total Capacity</span><span>{adults}</span></div>
                </div>
            </div>

            {/* Pricing Details */}
            <div className="text-sm space-y-2 mb-6 border-b pb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Cost Breakdown</h4>
                
                <div className="flex justify-between">
                    <span className="text-gray-600">Per Person Package (Adults x ${mockPricing.costPerPerson})</span>
                    <span className="font-medium">${mockPricing.subtotal}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Venue Rental (Basic Package)</span>
                    <span className="font-medium">${mockPricing.visionCost}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Photography Add-on</span>
                    <span className="font-medium">${mockPricing.photographyCost}</span>
                </div>
                
                <div className="flex justify-between font-bold text-base pt-2 border-t mt-2">
                    <span className="text-gray-900">Total Estimate (Excl. Tax)</span>
                    <span className="text-gray-900">${(parseFloat(mockPricing.total) - mockPricing.tax).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                    <span>Tax (10%)</span>
                    <span>${mockPricing.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-extrabold text-lg text-blue-700 pt-2 border-t mt-2">
                    <span>Total Cost</span>
                    <span>${mockPricing.total}</span>
                </div>
            </div>

            {/* Final Action */}
            <p className="text-xs text-gray-500 mb-3">
                Minimum Deposit Amount: <span className="font-bold text-gray-800">${mockPricing.minDeposit}</span>
            </p>
            <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-full text-lg shadow-xl hover:bg-blue-700 transition-colors">
                Book Now
            </button>
            <button 
                onClick={handleCopy} 
                className="w-full py-2 mt-2 bg-gray-100 text-gray-700 font-medium rounded-full text-sm hover:bg-gray-200 transition-colors border border-gray-300"
            >
                <Share2 size={16} className="inline mr-1" /> Copy Booking Details
            </button>
            <p className="text-xs text-center text-gray-400 mt-2">
                By booking, you agree to the Terms and Conditions.
            </p>
        </div>
    );
};

// --- Main App Component ---

const VenueDetails = () => {
    // 1. SIMULATE ROUTE: Get the dynamic ID (and the function to change it for the demo)
    const { venueId, setRouteId } = useSimulatedRouteId();
    
    const [venue, setVenue] = useState(null);

    // 2. DATA FETCHING: Use effect to "fetch" the venue data whenever the ID (route parameter) changes
    useEffect(() => {
        // In a real app, venueId would come from the URL via a router hook
        const fetchedVenue = getVenueById(venueId);
        setVenue(fetchedVenue);
    }, [venueId]);

    // Show loading or error state if data is not ready
    if (!venue) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-lg font-medium text-gray-600">
                    Loading Venue Details (Simulated ID: {venueId})...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Pass the setRouteId function to the Header to allow simulation of navigation */}
            {/* <Header setRouteId={setRouteId} /> */}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
                <TopBar></TopBar>
                {/* Dynamic ID Selector (Simulates clicking a card in the search list) */}
            <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Simulate URL Change:</span>
                {MOCK_VENUE_DATA_LIST.map(venue => (
                    <button 
                        key={venue.id}
                        // Now calling the function returned by the mock router hook
                        onClick={() => setRouteId(venue.id)}
                        className="py-1 px-3 bg-blue-100 text-blue-600 font-semibold rounded-full hover:bg-blue-200 transition-colors text-xs"
                    >
                        Venue {venue.id}
                    </button>
                ))}
            </div>
                {/* Title and Action Bar (Dynamic Content) */}
                <div className="mb-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">{venue.name}</h1>
                        <div className="flex items-center space-x-3 text-gray-600">
                            <button className="flex items-center text-sm hover:text-red-500 transition-colors">
                                <Heart size={20} className="mr-1" /> Save
                            </button>
                            <button className="flex items-center text-sm hover:text-blue-500 transition-colors" onClick={() => console.log('Sharing venue link for', venue.name)}>
                                <Share2 size={20} className="mr-1" /> Share
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center mt-1 text-gray-500 text-sm">
                        <MapPin size={16} className="mr-1" />
                        <span className="mr-3">{venue.location}</span>
                        <div className="flex items-center text-yellow-600 font-semibold bg-yellow-100 px-2 py-0.5 rounded-full text-xs">
                            <Star size={12} fill="currentColor" className="mr-1" />
                            {venue.rating.toFixed(1)} ({venue.reviewCount} reviews)
                        </div>
                    </div>
                </div>
                
                <VenueGallery venue={venue} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-10">
                        
                        {/* 1. Overview */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b pb-2">Overview</h2>
                            <p className="text-gray-700 leading-relaxed">{venue.description}</p>
                        </section>

                        {/* 2. Capacity */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b pb-2">Capacity</h2>
                            <div className="flex space-x-8 text-lg font-medium text-gray-700">
                                <div>
                                    <span className="text-gray-500 block text-sm">Minimum</span>
                                    {venue.minCapacity} People
                                </div>
                                <div>
                                    <span className="text-500 block text-sm">Maximum</span>
                                    {venue.maxCapacity} People
                                </div>
                            </div>
                        </section>

                        {/* 3. What this place offers (Features) */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">What this place offers</h2>
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                                {venue.features.map(feature => (
                                    <div key={feature.name} className="flex flex-col items-center justify-center p-3 text-center bg-white rounded-lg border hover:bg-blue-50 transition-colors">
                                        <feature.icon size={24} className="text-blue-600 mb-1" />
                                        <span className="text-xs font-medium text-gray-700">{feature.name}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 4. Book Together With (Related Services) */}
                        <section>
                            <h2 className="2xl font-bold text-gray-900 mb-4 border-b pb-2">Book Together With</h2>
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                                {venue.services.map(service => (
                                    <button key={service.name} className="flex flex-col items-center justify-center p-3 text-center bg-white rounded-lg border border-gray-300 hover:bg-green-50 hover:border-green-500 transition-all shadow-sm">
                                        <service.icon size={24} className="text-green-600 mb-1" />
                                        <span className="text-xs font-medium text-gray-700">{service.name}</span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* 5. Location (Map Placeholder) */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Location</h2>
                            <div className="w-full h-80 bg-gray-200 rounded-xl overflow-hidden shadow-inner">
                                <img 
                                    src={`https://placehold.co/1000x800/60A5FA/ffffff?text=Map+of+${venue.location}`} 
                                    alt="Location Map Placeholder" 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sticky Booking Summary */}
                    <div className="lg:col-span-1">
                        <BookingSummary venue={venue} />
                    </div>
                </div>

            </main>
        </div>
    );
}

export default VenueDetails;