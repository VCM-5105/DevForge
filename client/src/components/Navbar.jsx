import React, { useState } from 'react'
import { Link, NavLink } from "react-router-dom"
import {FaBars,FaTimes} from "react-icons/fa"

const Navbar = () => {
    const [isOpen, setIsopen] = useState(false);

    
  return (
      <div className='w-full bg-amber-100 sticky top-0 z-50'>
          
          <div className='w-full px-6 sm:px-8 h-16 flex items-center justify-between min-w-0'>
              
              <Link to="/" className='text-2xl font-bold text-shadow-green-500'>
                  DevForge</Link>
              

              <div className='hidden md:flex items-center gap-8'>
                  <div className='flex items-center gap-6'>
                      <NavLink
                          to="/" end
                          className={({isActive})=>isActive?'font-bold':'text-gray-700 hover:text-green-500'}>Home</NavLink>
                      <NavLink
                          to="/about"
                      className={({isActive})=>isActive?'font-bold':'text-gray-700 hover:text-green-500'}>About</NavLink>
                      <NavLink to='/features'
                      className={({isActive})=>isActive?'font-bold':'text-gray-700 hover:text-green-500'}>Features</NavLink>
                  </div>


                  <div className='flex items-center gap-3'>
                      <Link
                          to="/login"
                        className='inline-block px-6 py-3 rounded-lg bg-blue-200 text-black hover:bg-amber-300'  
                      >Login</Link>
                      <Link
                          to="/register"
                          className='inline-block px-6 py-3 rounded-lg bg-blue-200 text-black hover:bg-amber-300'
                      >Register</Link>
                </div>
              </div>

              <button
                  onClick={()=>setIsopen(!isOpen)}
              className='md:hidden text-2xl'>
                  {isOpen?<FaTimes size={24} /> : <FaBars size={24} />}
              </button>
          </div>

          {isOpen &&
              ( 
                  <div className='md:hidden border-t px-6 py-4'>
                  <div className='flex flex-col gap-4'>
                      
                      <NavLink
                          to="/"
                          onClick={()=>setIsopen(false)}
                      >Home</NavLink>

                      <NavLink
                          to="/about"
                          onClick={()=>setIsopen(false)}
                      >About</NavLink>
                      <NavLink
                          to="/features"
                          onClick={()=>setIsopen(false)}
                      >Features</NavLink>
                  </div>
                  <div className='flex flex-col gap-3 mt-4 w-full'>
                      <Link
                          to="/login"
                          onClick={() => setIsopen(false)}
                          className='px-5 py-2 border rounded-lg text-center'
                      >Login</Link>
                      <Link
                          to="/register"
                          onClick={() => setIsopen(false)}
                          className='px-5 py-2 rounded-lg bg-black text-white text-center'
                      >Register</Link>
                  </div>
              </div>
          )}
      
    </div>
  )
}

export default Navbar
