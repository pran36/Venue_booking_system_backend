import React from 'react'
import { ChevronRight, Heart, MapPin, Search, Calendar, Users, Bell, User, Minus, Plus, Star, Facebook, Instagram, Music, Camera, Utensils, Zap, Gift } from 'lucide-react';
function BottomMenu() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-600 mb-10">
        <div>
          <h4 className="font-bold text-gray-800 mb-4">Venue</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-600">Catering</a></li>
            <li><a href="#" className="hover:text-blue-600">Photo and Video</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-4">Kids Activity</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-600">DJ Service</a></li>
            <li><a href="#" className="hover:text-blue-600">Decor</a></li>
            <li><a href="#" className="hover:text-blue-600">Makeup Artist</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-4">News</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-600">Become a Service Provider</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-4">Contact Us</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-600">Privacy and Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Terms and Condition</a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-100">
        <div className="flex space-x-4 mb-4 sm:mb-0">
          <Facebook size={20} className="text-gray-500 hover:text-blue-600 cursor-pointer" />
          <Music size={20} className="text-gray-500 hover:text-blue-600 cursor-pointer" /> 
          <Instagram size={20} className="text-gray-500 hover:text-blue-600 cursor-pointer" />
        </div>
        <div className="text-gray-500 text-sm">
          © Finderly. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default BottomMenu