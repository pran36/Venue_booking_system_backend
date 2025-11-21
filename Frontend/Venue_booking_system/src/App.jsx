import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './client/pages/HomePage'
import VenueList from './client/pages/VenueList'
import VenueDetails from './client/components/VenueDetails'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/VenueList" element={<VenueList/>} />
        <Route path="/venue/:venueId" element={<VenueDetails />} />
      </Routes>
    </>
  )
}

export default App
