import React from 'react';
import { ChevronRight, Heart, MapPin, Star } from 'lucide-react';

// Replicating the mock data structure for completeness
const makeupData = [
  {
    id: 1,
    name: 'Third Eye Function Center',
    location: 'Rockdale, NSW',
    priceRange: '$60 - $50',
    rating: 4.8,
    imagePlaceholder: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', 
  },
  {
    id: 2,
    name: 'Himalayan Harmony Event Center',
    location: 'Melbourne, VIC',
    priceRange: '$80 - $60',
    rating: 4.8,
    imagePlaceholder: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
  },
  {
    id: 3,
    name: 'Everest Grand Banquet Hall',
    location: 'Sydney, NSW',
    priceRange: '$70 - $55',
    rating: 4.7,
    imagePlaceholder: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  },
  {
    id: 4,
    name: 'Royal Orchid Event Palace',
    location: 'Brisbane, QLD',
    priceRange: '$75 - $65',
    rating: 4.9,
    imagePlaceholder: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
  },
  
];



function MakeupCard({ makeup }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      
      {/* Image Section */}
      <div className="relative h-60">
        {/* <div className="absolute inset-0 bg-black bg-opacity-100"></div> */}
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: `url(${makeup.imagePlaceholder})` }}
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
          <span className="font-semibold">{makeup.location}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">{makeup.name}</h3>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="text-lg font-bold text-gray-800">
            {makeup.priceRange}
            <span className="text-sm font-normal text-gray-500 ml-1 block sm:inline">Per Person</span>
          </div>
          <div className="flex items-center text-yellow-500 text-sm font-semibold">
            <Star size={16} className="fill-current mr-1" />
            {makeup.rating.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TopRatedmakeup() {
  return (
    <section className="mt-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-6 px-2 md:px-0">
        <h2 className="text-2xl font-bold text-gray-800">Top Rated Makeup Artists</h2>
        <a href="#" className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center">
          View all
          <ChevronRight size={16} className="ml-1" />
        </a>
      </div>

      {/* makeup Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {makeupData.map((makeup) => (
          <MakeupCard key={makeup.id} makeup={makeup} />
        ))}
      </div>
    </section>
  );
}