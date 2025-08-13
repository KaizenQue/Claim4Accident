import { Headphones, Handshake, DollarSign } from "lucide-react"
import img1 from '../img/12.svg';
import img2 from '../img/22.svg';
import img3 from '../img/32.svg';

export default function ProcessSection() {
  const processes = [
    {
      icon: img1,
      title: "Free Consultation",
      description: "Tell us what happened. We'll tell you how we can help."
    },
    {
      icon: img2,
      title: "We Handle Everything",
      description: "From accident investigation to medical records to insurance negotiations."
    },
    {
      icon: img3,
      title: "You Get Paid",
      description: "We push for the maximum settlement, & we don't back down."
    }
  ]

  return (
    <section className="py-12 lg:py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="flex flex-col lg:flex-row items-start justify-between gap-8">

      {/* Header */}
      <div className="lg:w-1/3 text-left lg:sticky top-10">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1F8F] mb-4">
          {/* Our Process */}
          <span className="text-[#0A1F8F]">Our</span>{" "}
                <span className="text-[#D9534F]">Process</span>
        </h2>
        <p className="text-gray-600 text-lg">
          No legal jargon. No chasing us down. Just results.
        </p>
      </div>

      {/* Process Blocks */}
      <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {processes.map((process, index) => (
          <div
            key={index}
            className="bg-[#EBF5F8] p-3 xl:p-4 rounded-lg transform rotate-1 hover:rotate-0 transition-transform duration-300"
            style={{
              clipPath: 'polygon(0 10%, 90% 0, 100% 90%, 10% 100%)',
            }}
          >
            <div className="text-center">
              <div className="flex justify-center mb-2 xl:mb-4">
                <div className="w-10 h-10 xl:w-12 xl:h-12 bg-[#D9534F] rounded-full flex items-center justify-center">
                  <img 
                    src={process.icon} 
                    alt={process.title}
                    className="w-5 h-5 xl:w-6 xl:h-6 text-white" 
                  />
                </div>
              </div>
              <h3 className="text-sm xl:text-base font-bold text-gray-800 mb-1 xl:mb-2">
                {process.title}
              </h3>
              <p className="text-gray-600 text-xs xl:text-sm leading-relaxed">
                {process.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

  )
} 