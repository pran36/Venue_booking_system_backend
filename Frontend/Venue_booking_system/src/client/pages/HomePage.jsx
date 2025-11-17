import React from 'react'
import TopBar from '../components/TopBar'
import SearchBar from '../components/SearchBar'
import CategorySelector from '../components/CategorySelector'
import { TopRatedVenue } from '../components/Body/TopRatedVenue'
import { TopRatedPhoto } from '../components/Body/TopRatedPhoto'

function HomePage() {
  return (
    <>
        <TopBar></TopBar>
        <SearchBar></SearchBar>
        <CategorySelector></CategorySelector>
        <TopRatedVenue></TopRatedVenue>
        <TopRatedPhoto></TopRatedPhoto>
    </>
  )
}

export default HomePage