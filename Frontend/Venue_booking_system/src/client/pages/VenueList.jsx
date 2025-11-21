import React from 'react'
import TopBar from '../components/Topbar/Topbar'
import VenueSearchResults from '../components/VenueSearchList'
import Newsletter from '../components/Footer/Newsletter'
import BottomMenu from '../components/Footer/BottomMenu'

function VenueList() {
  return (
    <div>
        <TopBar></TopBar>
        <VenueSearchResults></VenueSearchResults>
        <Newsletter></Newsletter>
        <BottomMenu></BottomMenu>
    </div>
  )
}

export default VenueList