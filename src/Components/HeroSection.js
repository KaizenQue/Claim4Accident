import { ChevronDown } from "lucide-react"
import HeroImg from '../img/HuntleyLaw.png'

export default function HeroSection() {
  const scrollToComponent2 = () => {
    console.log('Button clicked! Starting scroll function...');
    // Try multiple approaches to find Component2
    let component2Element = document.getElementById('component2');
    console.log('Component2 element found:', component2Element);
    
    if (!component2Element) {
      // Try alternative selectors
      component2Element = document.querySelector('[data-component="component2"]');
      console.log('Trying data-component selector:', component2Element);
    }
    
    if (!component2Element) {
      // Try CSS class selector as last resort
      component2Element = document.querySelector('.min-h-screen.w-full.flex.flex-col.md\\:flex-row.relative');
      console.log('Trying CSS class selector:', component2Element);
    }
    
    if (component2Element) {
      console.log('Scrolling to Component2...');
      try {
        component2Element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } catch (error) {
        console.log('scrollIntoView failed, trying window.scrollTo...');
        const rect = component2Element.getBoundingClientRect();
        const scrollTop = window.pageYOffset + rect.top;
        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    } else {
      console.log('Component2 element not found, scrolling down by viewport height...');
      // Fallback: scroll down by one viewport height
      window.scrollTo({
        top: window.pageYOffset + window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden" style={{
      backgroundImage: `url(${HeroImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Background pattern/texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left content */}
          <div className="text-white space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Injured In A Motor Vehicle Accident?{" "}
              <span className="block mt-2">You Focus On Healing, We'll Handle The Fight.</span>
            </h1>

            <p className="text-base md:text-lg text-gray-200 max-w-2xl">
              We Fight Insurance Companies And Negligent Drivers So You Can Recover With No Fees Unless We Win.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold text-base transition-colors">
                Start Your Free Case Review
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-6 py-3 rounded-lg font-semibold text-base transition-colors">
                Call Now: (888) 202-1350
              </button>
            </div>
          </div>

          {/* Right form */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Claim Your Accident</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">What Type Of Accident?</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-600 text-white p-4 rounded-lg flex flex-col items-center space-y-2 hover:bg-blue-700 transition-colors">
                    <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">🚗</div>
                    <span className="text-sm font-medium">Car</span>
                  </button>
                  <button className="bg-gray-100 text-gray-700 p-4 rounded-lg flex flex-col items-center space-y-2 hover:bg-gray-200 transition-colors">
                    <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">🚛</div>
                    <span className="text-sm font-medium">4 Wheeler Truck</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Who's fault?</label>
                <div className="relative">
                  <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Some one else</option>
                    <option>Not sure</option>
                    <option>Shared fault</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <button 
                onClick={scrollToComponent2}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Next</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
