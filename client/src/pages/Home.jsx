import React from 'react'
import { Link } from 'react-router-dom'
import heroBg from "../assets/hero_backgroundImg.jpg"

const Home = () => {
  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg})` }}>
      
          <div className='absolute inset-0 bg-black/60'></div> 

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
            <span className="text-amber-300 font-semibold tracking-widest text-l uppercase mb-3">
          DevForge
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Your Developer Workspace
              </h1>
              

              <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
          Track your coding problems, projects, goals, and resources in one place.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-base transition-all duration-200 shadow-lg text-center"
          >
            Get Started
          </Link>
          
          <Link
            to="/features"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg border-2 border-white/80 hover:border-white text-white hover:bg-white/10 font-semibold text-base transition-all duration-200 text-center"
          >
            Explore Features
          </Link>
        </div>
          </div>
    </div>
  )
}

export default Home
