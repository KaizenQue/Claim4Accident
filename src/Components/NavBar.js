import React, { useState } from 'react';
import logoImage from '../img/Logo.svg';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-5 flex items-center h-16">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <img src={logoImage} alt="Logo" className="h-8 w-auto" />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div 
          className={`md:hidden flex flex-col cursor-pointer p-1 ml-auto ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
        >
          <span className={`w-6 h-0.5 bg-[#2C3E50] mb-1 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#2C3E50] mb-1 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#2C3E50] transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </div>

        {/* Navigation Links - Centered */}
        <div className="hidden md:flex md:items-center md:space-x-8 flex-1 justify-center">
          <a href="#" className="text-[#337ab7] font-bold hover:text-[#337ab7] transition-colors duration-300 no-underline">Home</a>
          <a href="#" className="text-gray-500 hover:text-[#2C3E50] transition-colors duration-300 no-underline">About Us</a>
          
          {/* Services Dropdown */}
          <div className="relative">
            <a 
              href="#" 
              className="text-gray-500 hover:text-[#2C3E50] transition-colors duration-300 flex items-center no-underline"
              onClick={toggleServices}
            >
              Services
              <span className="text-[#F1C40F] text-xs ml-1">▼</span>
            </a>
            {isServicesOpen && (
              <div className="absolute top-full left-0 bg-white shadow-lg rounded-md min-w-[150px] z-50 bg-gray-50">
                <a href="#" className="block py-3 px-5 text-gray-500 hover:bg-gray-100 hover:text-[#2C3E50] transition-colors duration-300 no-underline">Service 1</a>
                <a href="#" className="block py-3 px-5 text-gray-500 hover:bg-gray-100 hover:text-[#2C3E50] transition-colors duration-300 no-underline">Service 2</a>
                <a href="#" className="block py-3 px-5 text-gray-500 hover:bg-gray-100 hover:text-[#2C3E50] transition-colors duration-300 no-underline">Service 3</a>
              </div>
            )}
          </div>
          
          <a href="#" className="text-gray-500 hover:text-[#2C3E50] transition-colors duration-300 no-underline">Contact Us</a>
        </div>

        {/* Call to Action Button */}
        <div className="hidden md:flex items-center flex-shrink-0">
          <button className="bg-[#D9534F] text-white border-none rounded py-2 px-4 cursor-pointer transition-colors duration-300 hover:bg-[#c0392b] flex flex-col items-center min-w-[140px]">
            <span className="text-xs font-normal uppercase leading-none">CALL NOW</span>
            <span className="text-base font-bold leading-tight">888 201-1350</span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden absolute top-16 left-0 right-0 bg-white shadow-md transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'}`}>
          <a href="#" className="block py-4 px-5 text-[#337ab7] font-bold border-b border-gray-100 no-underline">Home</a>
          <a href="#" className="block py-4 px-5 text-gray-500 border-b border-gray-100 no-underline">About Us</a>
          
          {/* Mobile Services Dropdown */}
          <div className="relative">
            <a 
              href="#" 
              className="block py-4 px-5 text-gray-500 border-b border-gray-100 flex items-center no-underline"
              onClick={toggleServices}
            >
              Services
              <span className="text-[#F1C40F] text-xs ml-1">▼</span>
            </a>
            {isServicesOpen && (
              <div className="bg-gray-50">
                <a href="#" className="block py-3 px-8 text-gray-500 hover:bg-gray-100 no-underline">Service 1</a>
                <a href="#" className="block py-3 px-8 text-gray-500 hover:bg-gray-100 no-underline">Service 2</a>
                <a href="#" className="block py-3 px-8 text-gray-500 hover:bg-gray-100 no-underline">Service 3</a>
              </div>
            )}
          </div>
          
          <a href="#" className="block py-4 px-5 text-gray-500 border-b border-gray-100 no-underline">Contact Us</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 