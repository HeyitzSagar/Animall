import React from 'react'
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    const handleStartMilking = () => {
        navigate("/timer"); 
      };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
    <h1 className="text-4xl font-bold text-blue-600 md:text-5xl lg:text-6xl">
      Animall
    </h1>
    <p className="text-gray-900 font-bold text-lg md:text-xl mt-2">
      Welcome to Animall!
    </p>
    <p className="text-red-400 font-bold italic text-sm md:text-xl mt-2">
      Milking Tracker With Music
    </p>

    <button onClick={handleStartMilking} className="mt-6 px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all">
     Click Here
    </button>
  </div>
  )
}

export default LandingPage