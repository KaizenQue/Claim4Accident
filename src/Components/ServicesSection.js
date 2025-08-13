import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Carousel from "./Carousel";

// ✅ Rename your images to remove spaces and update paths accordingly
import CarAccidentImg from "../img/MainCar.png";
import MotorcycleImg from "../img/Pickup Truck Accident in US.png";

export default function ServicesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const serviceCards = [
    {
      title: "Car Accidents",
      description: "T-bone, rear-end, head-on, uninsured driver",
      image: CarAccidentImg,
    },
    {
      title: "Motorcycle Accidents",
      description: "Lane splitting, intersection crashes, hit and run",
      image: CarAccidentImg,
    },
  ];

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + serviceCards.length) % serviceCards.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % serviceCards.length);
  };

  const carouselItems = serviceCards.map((service, index) => (
    <div key={index} className="relative h-full w-full">
      {/* Background Design Element */}
      <div className="absolute top-0 left-0 w-24 h-24 lg:w-32 lg:h-32 bg-[#EBF5F8] rounded-full -translate-x-6 -translate-y-6 lg:-translate-x-8 lg:-translate-y-8 opacity-60 z-10"></div>

      {/* Image and Text */}
      <div className="relative h-full w-full">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 rounded-lg z-20"></div>

        {/* Text Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 lg:p-6 z-30 rounded-b-lg">
          <h4 className="text-lg lg:text-2xl xl:text-3xl font-bold text-white mb-1 lg:mb-2">
            {service.title}
          </h4>
          <p className="text-white/90 text-xs lg:text-sm xl:text-base">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="py-8 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Quote Section */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-[#0A1F8F] text-center font-['Rethink_Sans'] text-[24px] lg:text-[35px] italic font-normal leading-[32px] lg:leading-[50px] capitalize px-2">
            "Don't Let The Insurance Company Decide Your Case's Value — We Fight For The Maximum Settlement You Deserve."
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left Section - Our Services */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6">
                <span className="text-[#0A1F8F]">Specializing in</span>{" "}
                <span className="text-[#D9534F]">Motor Vehicle Accident Claims</span>
              </h3>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6 lg:mb-8">
                We focus exclusively on motor vehicle accident claims — from minor collisions to catastrophic crashes. Whether it's a T-bone, rear-end, head-on, or a case involving an uninsured driver, our legal partners know how to fight for the settlement you deserve.
              </p>
            </div>

            {/* Navigation Arrows */}
            {/* <div className="flex space-x-4">
              <button
                onClick={handlePrevious}
                className="w-12 h-12 border-2 border-[#0A1F8F] bg-white rounded-full flex items-center justify-center hover:bg-[#0A1F8F] hover:text-white transition-colors duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 bg-[#D9534F] text-white rounded-full flex items-center justify-center hover:bg-[#c0392b] transition-colors duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div> */}
          </div>

          {/* Right Section - Carousel */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-lg h-48 sm:h-64 lg:h-80">
              <Carousel
                items={carouselItems}
                currentIndex={currentSlide}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
