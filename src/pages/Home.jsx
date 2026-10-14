import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MovieList from '../components/MovieList'

const Home = () => {
  return (
    <div>
      
    <Navbar />

    <div className='min-h-screen bg-gray-950'>
      <MovieList/>
    </div>

    <Footer/>


    </div>
  )
}

export default Home
