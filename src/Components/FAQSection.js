import { useState, useRef, useEffect } from "react"
import { ChevronUp, ChevronDown, ArrowUp } from "lucide-react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)
  const topRef = useRef(null)

  const faqData = [
    {
      question: "How do I know if I qualify?",
      answer: "Complete the form. A legal team will assess your situation based on your exposure and health condition.",
      hasButton: true
    },
    {
      question: "Do I have to pay anything now?",
      answer: "No upfront costs. We work on a contingency fee basis, meaning we only get paid if you win your case."
    },
    {
      question: "Will someone contact me?",
      answer: "Yes, our legal team will contact you within 24 hours to discuss your case and next steps."
    },
    {
      question: "Can I file on behalf of a loved one?",
      answer: "Yes, you can file on behalf of a loved one if they are unable to do so themselves due to injury or incapacity."
    }
  ]

  const [activeIndex, setActiveIndex] = useState(null); // No dropdown open by default
  
  const toggle = (idx) => {
    setActiveIndex(idx === activeIndex ? null : idx);
  };

  const scrollToTop = () => {
    console.log("Scroll to top function called"); // Debug log
    
    // Try multiple scrolling methods for better compatibility
    try {
      // Method 1: Scroll to top of document
      document.documentElement.scrollTop = 0;
      
      // Method 2: Scroll to top of body
      document.body.scrollTop = 0;
      
      // Method 3: Use window.scrollTo as fallback
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      console.log("Scrolling completed");
    } catch (error) {
      console.error("Error scrolling to top:", error);
      
      // Fallback: Force scroll to top
      window.scrollTo(0, 0);
    }
  };

  // Alternative method: Scroll to a specific element
  const scrollToTopElement = () => {
    console.log("Alternative scroll method called");
    
    // Try to find the navbar or first element to scroll to
    const navbar = document.querySelector('nav') || document.querySelector('header') || document.body.firstElementChild;
    
    if (navbar) {
      navbar.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      console.log("Scrolled to navbar element");
    } else {
      // Fallback to window scroll
      window.scrollTo(0, 0);
      console.log("Used fallback scroll method");
    }
  };
  
  return (
    <section
      className="py-12 px-25 sm:px-4 md:px-8 lg:px-16 w-[70vw] mx-auto"
      style={{ fontFamily: "Quicksand, sans-serif" }}
    >
      {/* Title */}
      <h2 className="text-[32px] sm:text-[40px] font-semibold text-[#0A1F8F] mb-6 capitalize leading-none">
        Frequently Asked{" "}
        <span className="text-[#D14836] font-semibold capitalize">
          Questions
        </span>
      </h2>

      {/* Accordion */}
      <div className="space-y-4">
        {faqData.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded overflow-hidden"
          >
            <button
              onClick={() => toggle(idx)}
              className={`w-full text-left px-4 py-3 flex justify-between items-center ${
                activeIndex === idx ? "bg-[#F4F6FC]" : "bg-white"
              } transition`}
              style={{ fontFamily: "Quicksand, sans-serif" }}
            >
              <span className="text-[#0A1F8F] text-[20px] sm:text-[24px] font-semibold leading-normal">
                {item.question}
              </span>
              <span className="text-[18px] font-light select-none">
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform duration-300 
      ${activeIndex === idx ? "rotate-180 text-[#EDC14A]" : "text-[#0A1F8F]"}`}
                />
              </span>
            </button>
            {activeIndex === idx && (
              <div
                className="px-4 pb-4 pt-1 text-[#757575] text-[18px] sm:text-[20px] font-medium leading-normal bg-[#F4F6FC]"
                style={{ fontFamily: "Quicksand, sans-serif" }}
              >
                <p className="mb-4">{item.answer}</p>
                {item.hasButton && (
                  <button
                    onClick={() => {
                      console.log("Button clicked!");
                      scrollToTop();
                      // Also try the alternative method after a short delay
                      setTimeout(() => {
                        scrollToTopElement();
                      }, 100);
                    }}
                    className="inline-flex items-center space-x-2 bg-[#D14836] hover:bg-[#B03A2A] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    {/* <ArrowUp className="w-4 h-4" /> */}
                    <span>See If You Qualify</span>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 