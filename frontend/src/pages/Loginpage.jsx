import React, { useContext, useState } from 'react'
import assets from '../assets/assets';
import { AuthContext } from '../verify/Auth';

const Loginpage = () => {
  const [currState, setcurrstate] = useState("Signup");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("I am using BitChat!");
  const [isdatasubmitted, setisdatasubmitted] = useState(false);

  const{login}=useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currState === "Signup" && !isdatasubmitted) {
      setisdatasubmitted(true);
    } 
     login(currState === "Signup" ? "Signup" : "login", { fullName:fullname, email, password, bio });

      // handle API call
    
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      <div>
          <img src={assets.logo_icon} alt="" className="w-28" />
          <h1 className='text-3xl pt-3'>BitChat</h1>

      </div>
    
      
      <form 
        onSubmit={handleSubmit} 
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          <img src={assets.arrow_icon} alt="" className="w-5 cursor-pointer hidden" />
        </h2>

        {currState === "Signup" && !isdatasubmitted && (
          <input 
            type="text"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full Name"
            required
          />
        )}

        {!isdatasubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
          </>
        )}

        {currState === "Signup" && isdatasubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Provide a short bio..."
            required
          />
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r  from-green-600 to-green-400 text-white rounded-md cursor-pointer"
        >
          {currState === "Signup" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex gap-2 items-center text-sm">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="flex flex-col gap-2">
  {currState === "Signup" ? (
    <p className="text-sm text-gray-600">
      Already have an account? 
      <span onClick={()=>{setcurrstate("login"); setisdatasubmitted(false)}} className="font-medium  text-green-600 cursor-pointer">Login here</span>
    </p>
  ) : (
    <p className="text-sm text-gray-600">
      Create an account
      <span onClick={()=>setcurrstate("Signup")}  className="font-medium  text-green-600 cursor-pointer"> Click here</span>
    </p>
  )}
</div>



      </form>
    </div>
  )
}

export default Loginpage;
