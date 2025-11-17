import React from 'react'

function Newsletter() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-white p-4 sm:p-8">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
        Newsletter
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-10 leading-relaxed">
        Subscribe to our newsletter and stay up to date with the latest news, updates, and exclusive offers.
      </p>
      <div className="flex flex-col sm:flex-row items-center bg-white p-2 rounded-full shadow-lg max-w-md w-full">
        <input
          type="email"
          placeholder="Enter your email"
          className="grow p-3 text-gray-700 focus:outline-none rounded-full sm:rounded-l-full sm:rounded-r-none w-full sm:w-auto mb-3 sm:mb-0 pl-5 pr-5"
          aria-label="Enter your email for newsletter"
        />
        <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300 w-full sm:w-auto">
          Submit
        </button>
      </div>
    </div>
  )
}

export default Newsletter