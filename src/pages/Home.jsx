import React from 'react';
import { motion } from "framer-motion";
import { Banner } from '../icon';
import EventList from '../components/EventList';
import CategoriesBar from '../components/CategoriesBar';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import About from './About';
import SlideBanner from '../components/SlideBanner';

function Home() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <motion.div 
        className='flex h-[68vh] w-full bg-white opacity-90'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <SearchBar/>
      </motion.div>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <CategoriesBar/>
      </motion.div>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <SlideBanner/>
      </motion.div>

      <motion.div 
        className="container mx-auto mt-10 mb-0 py-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Upcoming Events</h1>
        <EventList />
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <About/>
      </motion.div>
      
      <Footer/>
    </>
  );
}

export default Home;