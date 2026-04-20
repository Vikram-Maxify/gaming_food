import React from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import Banner from '../components/Banner'
import Categories from '../components/categories'
import FoodGrid from '../components/FoodGrid'
import MainCourse from '../components/MainCourse'
import FastFoods from '../components/FastFoods'

const HomePage = () => {
  return (
    <>
    <Navbar />
    <SearchBar />
    <Banner />
    <Categories />
    <FoodGrid />
    <MainCourse />
    <FastFoods />
    </>
  )
}

export default HomePage