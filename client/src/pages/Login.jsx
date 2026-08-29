import React, { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errormsg, setErrormsg] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrormsg("Both Fields are required");
            return;
        }
        console.log("Submitting to backend for verification", { email, password });
        setErrormsg("");
        
    }
    
  return (
    <div>
          <form onSubmit={onSubmit}>
              <h1>Welcome Back - Please login</h1>
              {error && <p className='text-sm text-red-500 mb-4'>{error}</p>}

              <div>
                  <label >EMAIL</label>
                  <input 
                      type="email"
                      value={email}
                      onChange={(e)=>(e.target.value)}
                  />
                  <label htmlFor="">Password</label>
                  <input type="password"
                      value={password}
                      onChange={(e)=>(e.target.value)}
                  
                  />
              </div>
      </form>
    </div>
  )
}

export default Login
