export default function LocationsSection() {
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
  ]

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Section - Circular Graphic */}
          <div className="relative flex-shrink-0">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              {/* Main Blue Circle */}
              <div className="absolute inset-0 bg-[#0A1F8F] rounded-full border-4 border-[#2C3E50]"></div>
              
              {/* Concentric Arcs */}
              <div className="absolute inset-4 border-2 border-[#EBF5F8] rounded-full"></div>
              <div className="absolute inset-8 border-2 border-[#EBF5F8] rounded-full"></div>
              <div className="absolute inset-12 border-2 border-[#EBF5F8] rounded-full"></div>
              <div className="absolute inset-16 border-2 border-[#EBF5F8] rounded-full"></div>
              
              {/* Blue Dots on Arcs */}
              <div className="absolute top-2 left-1/2 w-3 h-3 bg-[#0A1F8F] rounded-full transform -translate-x-1/2"></div>
              <div className="absolute top-6 left-1/4 w-2 h-2 bg-[#0A1F8F] rounded-full"></div>
              <div className="absolute top-6 right-1/4 w-2 h-2 bg-[#0A1F8F] rounded-full"></div>
              <div className="absolute top-12 left-1/3 w-2 h-2 bg-[#0A1F8F] rounded-full"></div>
              <div className="absolute top-12 right-1/3 w-2 h-2 bg-[#0A1F8F] rounded-full"></div>
              <div className="absolute top-20 left-1/2 w-2 h-2 bg-[#0A1F8F] rounded-full transform -translate-x-1/2"></div>
              <div className="absolute bottom-20 left-1/2 w-2 h-2 bg-[#0A1F8F] rounded-full transform -translate-x-1/2"></div>
              <div className="absolute bottom-12 left-1/3 w-2 h-2 bg-[#0A1F8F] rounded-full"></div>
              <div className="absolute bottom-12 right-1/3 w-2 h-2 bg-[#0A1F8F] rounded-full"></div>
              <div className="absolute bottom-6 left-1/4 w-2 h-2 bg-[#0A1F8F] rounded-full"></div>
              <div className="absolute bottom-6 right-1/4 w-2 h-2 bg-[#0A1F8F] rounded-full"></div>
              <div className="absolute bottom-2 left-1/2 w-3 h-3 bg-[#0A1F8F] rounded-full transform -translate-x-1/2"></div>
            </div>
          </div>

          {/* Right Section - Content Block */}
          <div className="flex-1 bg-[#2C3E50] p-8 lg:p-12 rounded-lg">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0A1F8F] mb-4">
              {/* We Serve Clients Across */}
              <span className="text-[#0A1F8F]">We Serve</span>{" "}
              <span className="text-[#D9534F]">Clients Across</span>
            </h2>
            <p className="text-white text-sm lg:text-base mb-8 leading-relaxed">
              Each location has local laws, deadlines, and court strategies and we're on top of all of it.
            </p>
            
            {/* States and Cities */}
            <div className="space-y-6">
              {locations.map((location, index) => (
                <div key={index}>
                  <h3 className="text-white font-bold text-lg lg:text-xl mb-2">
                    {location.state}:
                  </h3>
                  <p className="text-white text-sm lg:text-base">
                    {location.cities}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 