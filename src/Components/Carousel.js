import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ items, autoPlay = true, interval = 5000, currentIndex, onSlideChange }) {
  const [internalIndex, setInternalIndex] = useState(0);
  
  // Use external index if provided, otherwise use internal state
  const currentIndexValue = currentIndex !== undefined ? currentIndex : internalIndex;
  const setCurrentIndex = onSlideChange || setInternalIndex;

  // Auto-play functionality (only if autoPlay is true and no external control)
  useEffect(() => {
    if (!autoPlay || onSlideChange) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length, onSlideChange, setCurrentIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-full">
      {/* Carousel Container */}
      <div className="relative h-full overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndexValue * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Only show if no external control */}
      {/* {!onSlideChange && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 border-2 border-white bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-300 z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#D9534F] text-white rounded-full flex items-center justify-center hover:bg-[#c0392b] transition-colors duration-300 z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )} */}

      {/* Indicators */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndexValue ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div> */}
    </div>
  );
} 