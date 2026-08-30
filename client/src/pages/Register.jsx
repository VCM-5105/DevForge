import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

    const [formdetails, setFormDetails] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword:''
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

    const handleSumbit = async (e) => {
        e.preventDefault();
        setError();

        if (!formdetails.name || !formdetails.email || !formdetails.username || !formdetails.password || !formdetails.confirmPassword) {
            
            setError("All details are required");
        }

        if (formdetails.password !== formdetails.confirmPassword) {
            setError("Password do not match")
        }

        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            
            setFormDetails({
                name: '',
                email: '',
                username:'',
                password: '',
                confirmPassword:''
            })
        } catch (error) {
            setError(`Registration Failed:${error}`)
        }
    }

  return (
      <div className='px-4 py-12 w-full flex items-center justify-center bg-gray-400 '>
          <div className='w-full max-w-md bg-gray-300 rounded-xl border border-gray-100 pl-8'>
              

              <div className='text-center mb-8'>
                  
                  
                  <h2 className='text-3xl font-extrabold text-black tracking-tight'>
                      Create an account
                  </h2>
                  <p className='text-sm text-black mt-2'>
                      Join DevForge to track your developer Journey
                  </p>
                  
              </div>

              {error && (
                  <div className='mb-6 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg'>{ error}</div>
              )}

              <form onSubmit={handleSumbit} className='space-y-5'>
                  
                  <div>
                      <label htmlFor="name"
                      className='block text-sm font-medium text-gray-700 mb-1'>
                          Full Name
                      </label>
                      <input
                          id="name"
                          type="text"
                          value={formdetails.name}
                          onChange={handleChange}
                          placeholder='enter Name'
                          className='w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                          required

                      />
                  </div>
                  <div>
                      <label
                          htmlFor="email"
                          className='block text-sm font-medium text-gray-700 mb-1'
                      >
                          Email
                      </label>
                      <input
                          type="email"
                          id="email"
                          name='email'
                          value={formdetails.email}
                          onChange={handleChange}
                          placeholder='enter email'
                          className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                          required
                      />
                  </div>

                  <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formdetails.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              required
            />
                  </div>
                  
                  <div>
            <label 
              htmlFor="confirmPassword" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formdetails.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              required
            />
                  </div>
                  
                  <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-black text-white font-semibold text-sm rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 transition-colors shadow-sm"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-semibold text-black hover:underline"
          >
            Log in
          </Link>
        </div>
              
          </div>
      
    </div>
  )
}

export default Register
