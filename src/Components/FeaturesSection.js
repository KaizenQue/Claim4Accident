import { FileText, Phone, MessageCircle, DollarSign } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      title: "Start-to-Finish Legal Support",
    },
    {
      icon: Phone,
      title: "Available 24/7 to provide answers & updates when it matters most.",
    },
    {
      icon: MessageCircle,
      title: "Fast Response Times & Clear Communication",
    },
    {
      icon: DollarSign,
      title: "Focused on Getting Fair Settlements, Not Quick Payouts",
    },
  ]

  return (
    <section className="bg-[#347AB7] py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="flex items-center space-x-4"
              >
                <div className="w-16 h-16 bg-[#EBF5F8] rounded-lg flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-8 h-8 text-[#2C3E50]" />
                </div>
                <h3 className="text-white text-sm lg:text-base leading-tight font-normal">
                  {feature.title}
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
