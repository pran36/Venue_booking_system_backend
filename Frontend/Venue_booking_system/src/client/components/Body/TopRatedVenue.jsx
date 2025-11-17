import React from 'react';
import { ChevronRight, Heart, MapPin, Star } from 'lucide-react';

// Replicating the mock data structure for completeness
const venueData = [
  {
    id: 1,
    name: "Bhrikuti Mandap Event Hall",
    location: "Kathmandu, Nepal",
    priceRange: "$60 - $45",
    rating: 4.8,
    imagePlaceholder: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119",
  },
  {
    id: 2,
    name: "Heritage Banquet Bhaktapur",
    location: "Bhaktapur, Nepal",
    priceRange: "$55 - $40",
    rating: 4.7,
    imagePlaceholder: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    id: 3,
    name: "Traditional Newari Celebration Hall",
    location: "Patan, Nepal",
    priceRange: "$65 - $50",
    rating: 4.8,
    imagePlaceholder: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  },
  {
    id: 4,
    name: "Everest View Wedding Venue",
    location: "Nagarkot, Nepal",
    priceRange: "$80 - $60",
    rating: 4.9,
    imagePlaceholder: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  },
  
];



function VenueCard({ venue }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      
      {/* Image Section */}
      <div className="relative h-60">
        {/* <div className="absolute inset-0 bg-black bg-opacity-100"></div> */}
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: `url(${venue.imagePlaceholder})` }}
        >
          
        </div>
        
        {/* Heart Icon (Favorite Button) */}
        <button className="absolute top-4 right-4 p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition-opacity backdrop-blur-sm shadow-md">
          <Heart size={20} className="text-red-500 fill-white hover:fill-red-500 transition-colors" />
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          <span className="h-2 w-2 bg-white rounded-full opacity-100 transition-opacity"></span>
          <span className="h-2 w-2 bg-white rounded-full opacity-50 transition-opacity"></span>
          <span className="h-2 w-2 bg-white rounded-full opacity-50 transition-opacity"></span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin size={16} className="mr-1 text-red-500" />
          <span className="font-semibold">{venue.location}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">{venue.name}</h3>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="text-lg font-bold text-gray-800">
            {venue.priceRange}
            <span className="text-sm font-normal text-gray-500 ml-1 block sm:inline">Per Person</span>
          </div>
          <div className="flex items-center text-yellow-500 text-sm font-semibold">
            <Star size={16} className="fill-current mr-1" />
            {venue.rating.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TopRatedVenue() {
  return (
    <section className="mt-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-6 px-2 md:px-0">
        <h2 className="text-2xl font-bold text-gray-800">Top Rated Venues</h2>
        <a href="#" className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center">
          View all
          <ChevronRight size={16} className="ml-1" />
        </a>
      </div>

      {/* Venue Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {venueData.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </section>
  );
}