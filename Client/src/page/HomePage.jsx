import React from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import Banner from '../components/Banner'
import Categories from '../components/categories'
import FoodGrid from '../components/FoodGrid'
import MainCourse from '../components/MainCourse'
import FastFoods from '../components/FastFoods'
import Starters from '../components/Starters'
import Breads from '../components/Breads'
import Rice from '../components/Rice'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <>
      
      <div className='md:hidden'>
        <SearchBar />
      </div>
      <Banner />
      <Categories />
      <FoodGrid />
      <FastFoods />
      <Starters />
      <MainCourse />
      <Breads />
      <Rice />
      <Footer />
    </>
  )
}

export default HomePage