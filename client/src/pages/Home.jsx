import React from 'react'
import { Link } from 'react-router-dom'
import heroBg from "../assets/hero_backgroundImg.jpg"
import FeatureCard from '../components/FeatureCard'

const Home = () => {
  return (
      <>
          <div className="relative min-h-[calc(100vh-64px)] w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg})` }}>
      
          <div className='absolute inset-0 bg-black/60'></div> 

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
            <span className="text-amber-300 font-semibold tracking-widest text-lg uppercase mb-3">
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
          
          <div id="features" className='max-w-6xl mx-auto px-6 py-20'>
              <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 text-center'>Everything you need to grow</h1>
              <p className='mt-4 text-gray-600 text-center max-w-2xl mx-auto'>Organize your development journey and keep everything you need in one place.</p>

              <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                  <FeatureCard
                      icon="#"
                      title="Coding Problem"
                      description="Track your coding problems, solutions, difficulty and progress."
                  />
                  <FeatureCard
                      icon="$"
                      title="Goals"
                      description="Set development goals and keep track of your progress."
                  />
                  <FeatureCard
                      icon="&"
                      title="Projects"
                      description="Organize your projects, GitHub links, status and progress."
                  />
                  <FeatureCard
                      icon="@"
                      title="Notes"
                      description="Save useful tutorials, documentation, links and learning resources."
                  />
              </div>
          </div>
      </>
  )
}

export default Home