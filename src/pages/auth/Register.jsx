import axios from "axios"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import Login from './Login'
import Logo from '../../assets/Logo'
import { createAlert } from "../../utils/createAlert"
import FormInput from "../../components/form/FormInput"
import Buttons from "../../components/form/Buttons"
import { Link } from "react-router"


//Validator
import { registerSchema } from "../../utils/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { actionRegister } from "../../api/auth"
import Home from "../Home"
import { CloseButton } from "../../icon"


function Register() {

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(registerSchema),
  })
  const { isSubmitting, errors } = formState;
  // console.log(errors);
  // console.log(errors.password.message);


  

  const hdlSubmit = async (value) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      const res = await actionRegister(value);
      createAlert("success", "Register Success")
      reset();

    } catch (error) {
      createAlert("info", error.response?.data?.message)
    }
  }

  return (

    <div className="flex w-full h-screen  bg-[#2B293D]">

      <div className="w-2/5 p-8 ">

        <div className='m-2'>
          <Logo />
        </div>

      <div className='  flex flex-col justify-center'>

        <div className="text-white mt-40 text-lg font-bold" >
          <h2 className="text-xl font-semibold mb-2">Discover tailored events.</h2>
          <p className="text-md">
            Sign up for personalized recommendations today!
          </p>
        </div>
        </div>
      </div>


        {/* Card */}
        <div
          className=' w-3/5 bg-white rounded-l-3xl shadow-lg p-8 flex flex-col justify-center'>
          <div className="max-w-md mx-auto w-full">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Create Account</h2>
              <Link to="/"><CloseButton/></Link>
             
            </div>
            <hr />
            {/* login passport */}
            <div className="flex gap-4 mb-4">
        <button className="flex items-center justify-center gap-2 w-1/2 border border-gray-300 rounded-md py-2 px-4 text-sm text-gray-700 hover:bg-gray-50">
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#4285F4"/>
          </svg>
          Sign up with Google
        </button>
        <button className="flex items-center justify-center gap-2 w-1/2 border border-gray-300 rounded-md py-2 px-4 text-sm text-gray-700 hover:bg-gray-50">
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
          </svg>
          Sign up with Facebook
        </button>
      </div>
      
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

          {/* form */}
          <form 
          onSubmit={handleSubmit(hdlSubmit)}
          className="space-y-4"
          >

            <div className='flex flex-col gap-2 py-4'>
              <FormInput register={register} name="username" errors={errors} />
              <FormInput register={register} name="email" errors={errors} />
              <FormInput register={register} name="password" errors={errors} type="password" />
              <FormInput
                register={register}
                name="confirmPassword"
                errors={errors}
                type="password"
              />
         
            </div>
            


            {/* Submit form */}
            
              <Buttons isSubmitting={isSubmitting} label="Create Account" />
            
          </form>



        <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account? <a href= "http://localhost:5173/auth/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>

        </div>
      </div>
    </div>
  )
}

export default Register