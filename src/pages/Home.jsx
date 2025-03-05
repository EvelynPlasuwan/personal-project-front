import React from 'react'
import { Banner } from '../icon'
import EventList from '../components/EventList'
import CategoriesBar from '../components/CategoriesBar'
import SearchBar from '../components/SearchBar'
import Footer from '../components/Footer'
import About from './About'

function Home() {
  return (
    <>
    <div className='flex h-[70vh] w-full bg-white opacity-90'>
      <SearchBar/>
    </div>
    
    <CategoriesBar/>

    <div className="container mx-auto py-5">
      <h1 className="text-2xl font-bold text-center mb-6">Upcoming Events</h1>
      <EventList />
    </div>

<About/>
    
    <Footer/>
    </>
  )
}

export default Home