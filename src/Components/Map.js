"use client"

import React, { useState, useEffect } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

// USA GeoJSON data
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

// State data with additional information
const stateData = {
  Alabama: { population: "4.9M", capital: "Montgomery" },
  Alaska: { population: "0.7M", capital: "Juneau" },
  Arizona: { population: "7.3M", capital: "Phoenix" },
  Arkansas: { population: "3.0M", capital: "Little Rock" },
  California: { 
    population: "39.5M", 
    capital: "Sacramento",
    highlighted: true,
    routes: [
      { route: "I-5", area: "Los Angeles stretch", fatalities: "~700+", injuries: "~12,000", notes: "Major interstate, heavy freight" },
      { route: "SR-99", area: "Sacramento-Bakersfield", fatalities: "~62", injuries: "~1,100", notes: "High crash density, rural urban mix" },
      { route: "SR-138", area: "San Bernardino area", fatalities: "~20", injuries: "~350", notes: "Nicknamed 'Blood Alley'" }
    ]
  },
  Colorado: { population: "5.8M", capital: "Denver" },
  Connecticut: { population: "3.6M", capital: "Hartford" },
  Delaware: { population: "1.0M", capital: "Dover" },
  Florida: { population: "21.5M", capital: "Tallahassee" },
  Georgia: { population: "10.6M", capital: "Atlanta" },
  Hawaii: { population: "1.4M", capital: "Honolulu" },
  Idaho: { population: "1.8M", capital: "Boise" },
  Illinois: { population: "12.7M", capital: "Springfield" },
  Indiana: { population: "6.7M", capital: "Indianapolis" },
  Iowa: { population: "3.2M", capital: "Des Moines" },
  Kansas: { population: "2.9M", capital: "Topeka" },
  Kentucky: { population: "4.5M", capital: "Frankfort" },
  Louisiana: { population: "4.6M", capital: "Baton Rouge" },
  Maine: { population: "1.3M", capital: "Augusta" },
  Maryland: { population: "6.0M", capital: "Annapolis" },
  Massachusetts: { population: "6.9M", capital: "Boston" },
  Michigan: { population: "10.0M", capital: "Lansing" },
  Minnesota: { population: "5.6M", capital: "St. Paul" },
  Mississippi: { population: "3.0M", capital: "Jackson" },
  Missouri: { population: "6.1M", capital: "Jefferson City" },
  Montana: { population: "1.1M", capital: "Helena" },
  Nebraska: { population: "1.9M", capital: "Lincoln" },
  Nevada: { population: "3.1M", capital: "Carson City" },
  "New Hampshire": { population: "1.4M", capital: "Concord" },
  "New Jersey": { population: "8.9M", capital: "Trenton" },
  "New Mexico": { population: "2.1M", capital: "Santa Fe" },
  "New York": { population: "19.5M", capital: "Albany" },
  "North Carolina": { population: "10.5M", capital: "Raleigh" },
  "North Dakota": { population: "0.8M", capital: "Bismarck" },
  Ohio: { population: "11.7M", capital: "Columbus" },
  Oklahoma: { population: "4.0M", capital: "Oklahoma City" },
  Oregon: { population: "4.2M", capital: "Salem" },
  Pennsylvania: { population: "12.8M", capital: "Harrisburg" },
  "Rhode Island": { population: "1.1M", capital: "Providence" },
  "South Carolina": { population: "5.1M", capital: "Columbia" },
  "South Dakota": { population: "0.9M", capital: "Pierre" },
  Tennessee: { population: "6.8M", capital: "Nashville" },
  Texas: { population: "29.0M", capital: "Austin" },
  Utah: { population: "3.2M", capital: "Salt Lake City" },
  Vermont: { population: "0.6M", capital: "Montpelier" },
  Virginia: { population: "8.5M", capital: "Richmond" },
  Washington: { population: "7.6M", capital: "Olympia" },
  "West Virginia": { population: "1.8M", capital: "Charleston" },
  Wisconsin: { population: "5.8M", capital: "Madison" },
  Wyoming: { population: "0.6M", capital: "Cheyenne" },
}

// Get array of state names for the dropdown
const stateNames = Object.keys(stateData).sort()

// Colors for different state regions - updated to match landing page blue theme
const regionColors = {
  West: "#1e40af",      // blue-700
  Midwest: "#1e3a8a",   // blue-800
  Northeast: "#3730a3", // indigo-700
  South: "#1e40af",     // blue-700
}

export default function Home({ highlightOnHover = true }) {
  const [tooltipContent, setTooltipContent] = useState("")
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [selectedState, setSelectedState] = useState("California")
  const [isMapClickable, setIsMapClickable] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogState, setDialogState] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    state: "California",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isMapVisible, setIsMapVisible] = useState(false)

  // Add useEffect for initial animation
  useEffect(() => {
    setIsMapVisible(true)
    if (stateData["California"]) {
      setTooltipContent(`
        California - High-Risk Routes
        
        I-5 (Los Angeles): ${stateData["California"].routes[0].fatalities} fatalities, ${stateData["California"].routes[0].injuries} injuries
        SR-99 (Sacramento-Bakersfield): ${stateData["California"].routes[1].fatalities} fatalities, ${stateData["California"].routes[1].injuries} injuries
        SR-138 (San Bernardino): ${stateData["California"].routes[2].fatalities} fatalities, ${stateData["California"].routes[2].injuries} injuries
      `);
      setTooltipPosition({ x: 400, y: 200 });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStateChange = (e) => {
    setFormData((prev) => ({ ...prev, state: e.target.value }))
    setSelectedState(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted with data:", formData)
    setIsSubmitted(true)
    
    // Reset form after submission with slight delay
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        state: "",
      })
      setIsSubmitted(false)
      setSelectedState("")
    }, 3000)
  }

  const handleStateClick = (stateName) => {
    if (!isMapClickable) return;
    setSelectedState(stateName);
    setFormData(prev => ({ ...prev, state: stateName }));
    setDialogState(stateData[stateName]);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setDialogState(null);
  };

  return (
    <main className="bg-transparent">
      <section className="w-full h-full">
        <div className="w-full h-full">
          {/* Map Section - Full width */}
          <div className={`w-full h-full bg-transparent relative transition-all duration-700 transform ${isMapVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="w-full h-full rounded-xl overflow-hidden bg-transparent p-0">
              <ComposableMap projection="geoAlbersUsa">
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateName = geo.properties.name;
                      const isSelected = selectedState === stateName;
                      const isHovered = highlightOnHover && tooltipContent.includes(stateName);
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={(e) => {
                            if (!highlightOnHover || !isMapClickable) return;
                            const { name } = geo.properties;
                            if (stateData[name]) {
                              if (name === "California" && stateData[name].routes) {
                                setTooltipContent(`
                                  California - High-Risk Routes
                                  
                                  I-5 (Los Angeles): ${stateData[name].routes[0].fatalities} fatalities, ${stateData[name].routes[0].injuries} injuries
                                  SR-99 (Sacramento-Bakersfield): ${stateData[name].routes[1].fatalities} fatalities, ${stateData[name].routes[1].injuries} injuries
                                  SR-138 (San Bernardino): ${stateData[name].routes[2].fatalities} fatalities, ${stateData[name].routes[2].injuries} injuries
                                `);
                              } else {
                                setTooltipContent(`
                                  ${name}
                                  Population: ${stateData[name].population}
                                  Capital: ${stateData[name].capital}
                                `);
                              }
                              const rect = e.currentTarget.getBoundingClientRect();
                              const x = e.clientX - rect.left;
                              const y = e.clientY - rect.top;
                              setTooltipPosition({ x, y });
                            }
                          }}
                          onMouseLeave={() => {
                            if (!highlightOnHover || !isMapClickable) return;
                            setTooltipContent("");
                          }}
                          onClick={() => handleStateClick(geo.properties.name)}
                          style={{
                            default: {
                              fill: isSelected ? "#dc2626" : "#1e40af",
                              opacity: isSelected ? 1 : 0.7,
                              stroke: "#ffffff",
                              strokeWidth: isSelected ? 2 : 1,
                              outline: "none",
                              transition: "all 0.3s ease",
                            },
                            hover: {
                              fill: isMapClickable && isHovered ? "#dc2626" : (isSelected ? "#dc2626" : "#1e40af"),
                              opacity: isMapClickable && isHovered ? 0.95 : (isSelected ? 1 : 0.7),
                              stroke: "#ffffff",
                              strokeWidth: isMapClickable && isHovered ? 1.5 : (isSelected ? 2 : 1),
                              outline: "none",
                              cursor: isMapClickable ? "pointer" : "default",
                              transition: "all 0.3s ease",
                            },
                            pressed: {
                              fill: "#b91c1c",
                              outline: "none",
                              transition: "all 0.2s ease",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            </div>
            
            {/* Floating Tooltip */}
            {tooltipContent && highlightOnHover && (
              <div 
                className="absolute bg-white/95 backdrop-blur-sm border border-blue-200 rounded-xl p-3 shadow-lg transform transition-all duration-300 ease-in-out animate-fade-in max-w-[200px] sm:max-w-none"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1000,
                  maxWidth: '90vw',
                  wordBreak: 'break-word'
                }}
              >
                <pre className="whitespace-pre-line text-blue-700 font-medium text-sm">{tooltipContent}</pre>
              </div>
            )}

            {/* State Statistics Dialog */}
            {showDialog && dialogState && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 relative max-h-[80vh] overflow-y-auto">
                  <button
                    onClick={handleCloseDialog}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors duration-200"
                  >
                    ×
                  </button>
                  <h2 className="text-2xl font-bold text-blue-700 mb-4">{selectedState}</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Population:</span>
                      <span className="font-semibold text-blue-700">{dialogState.population}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Capital:</span>
                      <span className="font-semibold text-blue-700">{dialogState.capital}</span>
                    </div>
                    
                    {/* California Route Statistics */}
                    {selectedState === "California" && dialogState.routes && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-blue-700 mb-3">High-Risk Routes</h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full border border-gray-200 rounded-lg">
                            <thead className="bg-blue-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-blue-700 border-b">Route</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-blue-700 border-b">Key Area</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-blue-700 border-b">Fatalities (per year)</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-blue-700 border-b">Injuries (per year)*</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-blue-700 border-b">Notes</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dialogState.routes.map((route, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                  <td className="px-4 py-2 text-sm font-medium text-blue-700 border-b">{route.route}</td>
                                  <td className="px-4 py-2 text-sm text-gray-700 border-b">{route.area}</td>
                                  <td className="px-4 py-2 text-sm text-red-600 font-semibold border-b">{route.fatalities}</td>
                                  <td className="px-4 py-2 text-sm text-orange-600 font-semibold border-b">{route.injuries}</td>
                                  <td className="px-4 py-2 text-sm text-gray-600 border-b">{route.notes}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">* Annual injury statistics</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

// Add these styles at the top of your file, after the imports
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-slide-down {
  animation: slideDown 0.5s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}