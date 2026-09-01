import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

    const [formdetails, setFormDetails] = useState({
        email: '',
        password:''
    })

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormDetails((prev) => ({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit = async () =>  {
        if (!formdetails.email || !formdetails.password) {
            setError("All details are required")
            return
        }
        setLoading(true);
        try {
            await new Promise((resolve)=>setTimeout(resolve,1000))
            setFormDetails((prev) => ({
                ...prev,
                password:''
            }))
        } catch (error) {
            setError(`Invalid email or password ${error}`)
            
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className='h-16 w-full flex items-center justify-center bg-gray-50 px-4 py-12'>
          <div className='w-full max-w-md bg-white rounded-lg shadow-md border border-gray-100 p-8'>
              
              <div className='text-centre mb-8'>
                  <h2 className='text-3xl font-extrabold text-gray-900 tracking-tight'>
                      Welcome Back 
                  </h2>

                  <p className='text-sm text-gray-600 mt-2'>
                      Log in to continue
                  </p>
              </div>

              {error && (
                  <div className='mb-6 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg'>
                      {error}
                  </div>
              )}

              <form onSubmit={handleSubmit} className='space-y-5'>
                  <div>
                      <label
                          htmlFor="email"
                          className='block text-sm font-medium text-gray-700 mb-1'
                      >
                          Email Address
                      </label>
                      <input
                          type="text"
                          id='email'
                          name='email'
                          value={formdetails.email}
                          onChange={handleChange}
                          placeholder='enter email'
                          required
                          className='w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                      />
                  </div>

                  <div>
                      <label
                          htmlFor="password"
                          className='block text-sm font-medium text-gray-700 mb-1'
                      >
                          password
                      </label>
                      <input
                          type="password"
                          name='password'
                          id='password'
                          value={formdetails.password}
                          onChange={handleChange}
                          placeholder='Password'
                          required
                          className='w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                      />
                  </div>

                  <button
                      type='submit'
                      disabled={loading}
                  >
                      {loading?'Logging in':'Sign In'}
                  </button>
              </form>

              <div className='mt-6 text-centre text-sm text-gray-600'>
                  Do not have account? 
                  <Link
                      to="/register"
                      className='font-semibold text-black hover:underline'
                  >Create one</Link>
              </div>
              
      </div>
    </div>
  )
}

export default Login

