import { ChevronDown } from "lucide-react";
import HeroImg from '../img/HuntleyLaw.png';
import Frame from "../img/truck 1.svg";
import Frame1 from "../img/car 1.svg";
import Groupbg from "../img/Groupbg.png";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

   const handlePhoneCall = () => {
    window.location.href = "tel:8882021350"
  }

  const scrollToComponent2 = () => {
    const component2Element = document.getElementById('component2') ||
      document.querySelector('[data-component="component2"]') ||
      document.querySelector('.min-h-screen.w-full.flex.flex-col.md\\:flex-row.relative');

    if (component2Element) {
      component2Element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: window.pageYOffset + window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url(${Groupbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay Patterns */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 left-10 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-40 right-20 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-14 h-14 border border-white/20 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20 mt-[-3%]">
        <div className="flex flex-col items-center justify-center gap-10 min-h-screen">

          {/* Centered Content */}
          <div className="text-white space-y-6 text-center">
            <h1
              className="text-white font-['Rethink_Sans'] text-[45px] leading-[70px] font-bold capitalize max-w-[966px] mx-auto px-5">
              Injured In A Motor Vehicle Accident? You Focus On <br />
              Healing, We'll Handle The Fight.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-200 font-['Rethink_Sans'] max-w-xl mx-auto">
              We Fight Insurance Companies And Negligent Drivers So You Can Recover With No Fees Unless We Win.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                className="border-2 border-white text-white hover:bg-red-700 hover:border-red-700 hover:text-white px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition"
                onClick={() => navigate("/Component2")}
              >
                Start Your Free Case Review
              </button>
              <button
                className="border-2 border-white text-white hover:bg-red-700 hover:border-red-700 hover:text-white px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition"
               onClick={handlePhoneCall}>
                Call Now: xxx xxx xxxx
              </button>
            </div>
          </div>

        </div>
      </div>

    </section >
  );
}
