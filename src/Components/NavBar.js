import React, { useState } from 'react';
import logoImage from '../img/Logo.svg';

import logo from "../img/MainLogo.svg"
// import Call from "../img/Frame 33.png"


function Navbar() {
  const handlePhoneCall = () => {
    window.location.href = "tel:(888) 202 1350"
  }

  const handleLogoClick = () => {
    window.location.href = "/"
  }


  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-5 flex items-center h-20">
        {/* Logo - Centered on mobile, left-aligned on desktop */}
        <div className="flex items-center justify-center md:justify-start flex-1 md:flex-none" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" className="h-8 w-auto"  />
        </div>

        {/* Navigation Links - Centered */}
        <div className="hidden md:flex md:items-center md:space-x-8 flex-1 justify-center">
          {/* <a href="#" className="text-gray-500 hover:text-[#2C3E50] transition-colors duration-300 no-underline">Contact Us</a> */}
        </div>

        {/* Call to Action Button */}
        <div className="hidden md:flex items-center flex-shrink-0">
          <button 
            onClick={handlePhoneCall}
            className="flex items-center space-x-3 bg-white border-none rounded-lg py-2 px-3 cursor-pointer transition-all duration-300"
          >
            {/* Red circle with phone icon */}
            <div className="bg-[#D9534F] rounded-full p-2 flex items-center justify-center">
              <svg 
                className="w-4 h-4 text-white transform rotate-12" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            
            {/* Text content */}
            <div className="flex flex-col items-start">
              <span className="text-[#D9534F] text-xs font-bold uppercase tracking-wide leading-none">CALL US NOW</span>
              <span className="text-[#2C3E50] text-sm font-bold leading-tight">(888) 202-1350</span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 