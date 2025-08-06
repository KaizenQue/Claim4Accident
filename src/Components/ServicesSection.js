import { ChevronLeft, ChevronRight } from "lucide-react"
import Carousel from "./Carousel";
import { useState } from "react";

export default function ServicesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const serviceCards = [
    {
      title: "Car Accidents",
      description: "T-bone, rear-end, head-on, uninsured driver"
    },
    {
      title: "Motorcycle Accidents", 
      description: "Lane splitting, intersection crashes, hit and run"
    },
    {
      title: "Truck Accidents",
      description: "Semi-truck collisions, jackknife accidents, rollovers"
    },
    {
      title: "Pedestrian Accidents",
      description: "Crosswalk incidents, hit and run, distracted driving"
    },
    {
      title: "Bicycle Accidents",
      description: "Dooring, right hook, left cross, hit and run"
    }
  ];

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + serviceCards.length) % serviceCards.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % serviceCards.length);
  };

  const carouselItems = serviceCards.map((service, index) => (
    <div key={index} className="relative h-full">
      {/* Background Design Element */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#EBF5F8] rounded-full -translate-x-8 -translate-y-8 opacity-60"></div>
      
      {/* Car Accident Image */}
      <div className="relative h-full bg-gradient-to-br from-gray-400 to-gray-600">
        {/* Placeholder for car accident image */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Text Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-6">
          <h4 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            {service.title}
          </h4>
          <p className="text-white/90 text-sm lg:text-base">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Quote Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold italic text-[#337ab7] leading-tight">
            "Don't Let The Insurance Company Decide Your Case's Value We Fight For The Maximum Settlement You Deserve."
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Section - Our Services */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                <span className="text-[#337ab7]">Our</span>{" "}
                <span className="text-[#D9534F]">Services</span>
              </h3>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-8">
                Multiple-vehicle collision Accidents - Chain-reaction crashes, pileups on highways, rear-end domino collisions, and accidents involving three or more vehicles
              </p>
            </div>
            
            {/* Navigation Arrows */}
            <div className="flex space-x-4">
              <button 
                onClick={handlePrevious}
                className="w-12 h-12 border-2 border-[#337ab7] bg-white rounded-full flex items-center justify-center hover:bg-[#337ab7] hover:text-white transition-colors duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 bg-[#D9534F] text-white rounded-full flex items-center justify-center hover:bg-[#c0392b] transition-colors duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Section - Car Accidents Card */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-lg h-64 lg:h-80">
              <Carousel 
                items={carouselItems} 
                autoPlay={false} 
                currentIndex={currentSlide}
                onSlideChange={setCurrentSlide}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 