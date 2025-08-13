import React from 'react';
import mapimg from '../img/mapimg.svg'
import MapMobile from '../img/MapMobile.png'

const LocationCard = () => {
  const locations = [
    {
      state: "California",
      cities: "Riverside, Irvine, Sacramento, Los Angeles, San Diego, San Francisco"
    },
    {
      state: "Colorado", 
      cities: "Denver, Boulder, Fort Collins"
    },
    {
      state: "Nevada",
      cities: "Las Vegas, Reno, Henderson"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Mobile View */}
        <div className="md:hidden">
          {/* Mobile Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              {/* We Serve Clients Across */}
              <span className="text-[#0A1F8F]">We Serve</span>{" "}
              <span className="text-[#D9534F]">Clients Across</span>
            </h2>
            <p className="text-gray-600 text-base">
              Each location has local laws, deadlines, and court strategies and we're on top of all of it.
            </p>
          </div>
          
          {/* Mobile Map Image */}
          <div className="flex justify-center mb-8">
            <img 
              src={MapMobile} 
              alt="Map showing service locations" 
              className="w-full max-w-sm object-contain"
            />
          </div>
          
          {/* Mobile Locations List */}
          {/* <div className="space-y-6">
            {locations.map((location, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                <h2 className="text-xl font-bold text-blue-900 mb-2">
                  {location.state}
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {location.cities}
                </p>
              </div>
            ))}
          </div> */}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          {/* Header - Right aligned */}
          <div className="text-right mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">
              {/* We Serve Clients Across */}
              <span className="text-[#0A1F8F]">We Serve</span>{" "}
              <span className="text-[#D9534F]">Clients Across</span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-gray-600 text-lg md:text-xl max-w-4xl ml-auto">
              Each location has local laws, deadlines, and court strategies and we're on top of all of it.
            </p>
          </div>
          
          {/* Main Container */}
          <div className="relative w-full">
            {/* Curved Light Border */}
            <div className="absolute inset-0 bg-blue-100 rounded-l-full transform translate-x-2 translate-y-2"></div>
            
            {/* Main Content Container - extends to full width on right */}
            <div className="relative bg-teal-900 text-white pl-24 pr-0 py-12 md:pl-32 lg:pl-40 md:py-16" 
                 style={{borderRadius: '9999px 0 0 9999px', width: '100vw', backgroundColor:'#0A1F8F'}}>
              <div className="flex items-center max-w-full">
                <div className="space-y-8 md:space-y-12 max-w-2xl pr-8 md:pr-12 flex-1">
                  {locations.map((location, index) => (
                    <div key={index} className={`space-y-3 ${location.state === 'Colorado' ? '-ml-5' : ''}`}>
                      <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-white">
                        {location.state}
                      </h2>
                      <p className="text-xs md:text-sm lg:text-base leading-relaxed text-gray-200">
                        {location.cities}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Map Image on the right */}
                <div className="flex-shrink-0 mr-8 md:mr-12 lg:mr-16 xl:mr-20 2xl:mr-24">
                  <img 
                    src={mapimg} 
                    alt="Map showing service locations" 
                    className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 2xl:w-80 2xl:h-80 object-contain"
                    style={{
                      maxWidth: 'min(20vw, 320px)',
                      maxHeight: 'min(20vw, 320px)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;