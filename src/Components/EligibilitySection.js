import { FileText, DollarSign, Car, Stethoscope, Clock } from "lucide-react"

export default function EligibilitySection() {
  const eligibilityCriteria = [
    {
      icon: FileText,
      text: "You have a police report or other crash documentation"
    },
    {
      icon: DollarSign,
      text: "You haven't accepted a final payout from insurance"
    },
    {
      icon: Car,
      text: "You were injured in a crash caused by another driver"
    },
    {
      icon: Stethoscope,
      text: "You've missed work, needed medical treatment, or have ongoing pain"
    },
    {
      icon: Clock,
      text: "You're within your state's legal deadline (1-3 years)"
    }
  ]

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Left Column - Header + 2 items */}
          <div className="space-y-6">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
                {/* Who Can File A Claim? */}
                <span className="text-[#0A1F8F]">Who Can</span>{" "}
                <span className="text-[#D9534F]">File A Claim?</span>
              </h2>
              <p className="text-lg font-medium text-[#D9534F]">
                You're likely eligible if:
              </p>
            </div>

            {/* First 2 eligibility criteria */}
            {eligibilityCriteria.slice(0, 2).map((criteria, index) => {
              const IconComponent = criteria.icon
              return (
                <div
                  key={index}
                  className="bg-[#0A1F8F] rounded-[100px] p-6 flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-white rounded-[100px] flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-[#0A1F8F]" />
                  </div>
                  <p className="text-white text-sm lg:text-base font-medium leading-relaxed mb-0">
                    {criteria.text}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Right Column - 3 items */}
          <div className="space-y-6">
            {eligibilityCriteria.slice(2, 5).map((criteria, index) => {
              const IconComponent = criteria.icon
              return (
                <div
                  key={index + 2}
                  className="bg-[#0A1F8F] rounded-[100px] p-6 flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-[#0A1F8F]" />
                  </div>
                  <p className="text-white text-sm lg:text-base font-medium leading-relaxed mb-0">
                    {criteria.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
} 