import React from 'react'
import Layouts from "../layouts/Layouts"
import { Link } from 'react-router'

function About() {
  return (
    <>
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center text-center bg-cover bg-center" 
    style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)),url('/aboutBanner.png')" }}>

<div>
  <span className='text-[#FFE047] text-6xl font-bold shadow-black'>Bringing the world together through live experiences</span>
</div>
    </div>

<div className='bg-[#BD3733] w-full h-[100px] md:h-[350px] flex items-center justify-center text-center bg-cover bg-center'>
<span
className='text-2xl font-semibold text-white mx-72'
>
GoEvent is a global self-service ticketing platform for live experiences that allows anyone to create, share, find and attend events that fuel their passions and enrich their lives. From music festivals, marathons, conferences, community rallies, and fundraisers, to gaming competitions and air guitar contests. Our mission is to bring the world together through live experiences.
</span>
</div>

<div className='bg-[#2B293D] w-full h-[100px] md:h-[100px] flex items-center justify-evenly text-left bg-cover bg-center'>
<span
className='text-3xl font-bold text-[#FFE047] ml-96'
>
Make it happens today   <span className='text-white'>    ►►►</span> 
</span>

<button className="btn btn-dash btn-warning text-3xl ">
<Link to="/auth/login"> + Create Event</Link>
</button>

</div>
      </>
  )
}

export default About