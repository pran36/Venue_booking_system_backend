import React from 'react'
import TopBar from '../components/TopBar'
import SearchBar from '../components/SearchBar'
import CategorySelector from '../components/CategorySelector'
import { TopRatedVenue } from '../components/Body/TopRatedVenue'
import { TopRatedPhoto } from '../components/Body/TopRatedPhoto'
import { TopRatedmakeup } from '../components/Body/TopRatedMakeup'
import Newsletter from '../components/Footer/Newsletter'
import BottomMenu from '../components/Footer/BottomMenu'

function HomePage() {
  return (
    <>
        <TopBar></TopBar>
        <SearchBar></SearchBar>
        <CategorySelector></CategorySelector>
        <TopRatedVenue></TopRatedVenue>
        <TopRatedPhoto></TopRatedPhoto>
        <TopRatedmakeup></TopRatedmakeup>
        <Newsletter></Newsletter>
        <BottomMenu></BottomMenu>
    </>
  )
}

export default HomePage