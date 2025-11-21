import React from 'react'
import SearchBarPage from './SearchBarPage'

function TopBar() {
  return (
    <div><header className="bg-white shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
            
            <div className="flex items-center space-x-2">
                <div className="p-1 rounded-full bg-amber-400 text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M3.792 2.986A2.25 2.25 0 0 1 5.992.75h12.016c.995 0 1.879.613 2.201 1.547l1.75 4.965A3 3 0 0 1 19.434 10H4.566a3 3 0 0 1-2.525-1.284l1.75-4.965ZM4.566 12.75a.75.75 0 0 0 0 1.5h14.868a.75.75 0 0 0 0-1.5H4.566Z" clipRule="evenodd" />
                        <path d="M11.97 15.99a1.5 1.5 0 0 1 2.25 0l1.745 2.193a.75.75 0 0 1-.573 1.257H8.548a.75.75 0 0 1-.573-1.257l1.745-2.193a1.5 1.5 0 0 1 2.25 0Z" />
                    </svg>
                </div>
                
                <span className="text-xl font-bold text-gray-800">VenueVerse</span>
            </div>
            <SearchBarPage></SearchBarPage>
            <div className="flex items-center space-x-4">
                
                <a href="#" className="p-1 text-gray-500 hover:text-gray-700 relative">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.33A7.5 7.5 0 0 0 18.2 10.5h-15V9a5.25 5.25 0 0 1 10.5 0v.75m1.5 6a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                    
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500"></span>
                </a>

                <a href="#" className="p-1 text-gray-500 hover:text-gray-700">
                    <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0H4.501Z" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</header></div>
  )
}

export default TopBar