import React from 'react'
import Logo from '../assets/Logo'
import { Link } from 'react-router'
import { CloseButton } from '../icon'



function MapPage() {
  return (
    <div className="flex w-full h-screen  bg-[#2B293D]">

    <div className="w-1/5 p-8 ">

      {/* <div className='m-2'>
        <Logo />
      </div> */}

      <div className='  flex flex-col justify-center'>

        <div className="text-white mt-40 text-lg font-bold" >
          <h2 className="text-xl font-semibold mb-2">Discover tailored events.</h2>
          <p className="text-md">
            on Map!
          </p>
        </div>
      </div>
    </div>


    {/* Card */}
    <div
      className=' w-4/5 bg-white rounded-l-3xl shadow-lg p-8 flex flex-col justify-center'>
      <div className="max-w-md mx-auto w-full">

        <div className="flex justify-between items-center mb-6 float-end">
         
          <Link to="/"><CloseButton/></Link>
        </div>
     
        

      </div>
    </div>
  </div>
  )
}

export default MapPage