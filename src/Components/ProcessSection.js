import { Headphones, Handshake, DollarSign } from "lucide-react"

export default function ProcessSection() {
  const processes = [
    {
      icon: Headphones,
      title: "Free Consultation",
      description: "Tell us what happened. We'll tell you how we can help."
    },
    {
      icon: Handshake,
      title: "We Handle Everything",
      description: "From accident investigation to medical records to insurance negotiations."
    },
    {
      icon: DollarSign,
      title: "You Get Paid",
      description: "We push for the maximum settlement, & we don't back down."
    }
  ]

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#337ab7] mb-4">
            Our Process
          </h2>
          <p className="text-gray-600 text-lg">
            No legal jargon. No chasing us down. Just results.
          </p>
        </div>

        {/* Process Blocks - Inline Layout */}
        <div className="flex flex-row gap-4 lg:gap-8 justify-center">
          {processes.map((process, index) => {
            const IconComponent = process.icon
            return (
              <div
                key={index}
                className="flex-1 bg-[#EBF5F8] p-4 lg:p-8 rounded-lg transform rotate-1 hover:rotate-0 transition-transform duration-300"
                style={{
                  clipPath: 'polygon(0 10%, 90% 0, 100% 90%, 10% 100%)'
                }}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-3 lg:mb-6">
                    <div className="w-10 h-10 lg:w-16 lg:h-16 bg-[#D9534F] rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 lg:w-8 lg:h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm lg:text-xl font-bold text-gray-800 mb-2 lg:mb-4">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                    {process.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 