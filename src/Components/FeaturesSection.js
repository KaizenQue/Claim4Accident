import { Phone, MessageCircle, DollarSign } from "lucide-react";
import Frame1 from "../img/Frame 1000009322.png";
import Frame2 from "../img/Group.png";
import Frame3 from "../img/Group (1).png";
import Frame4 from "../img/Group (2).png";

export default function FeaturesSection() {
  const features = [
    {
      img: Frame1,
      title: "Start-to-Finish Legal Support",
    },
    {
      img: Frame2,
      title: "Available 24/7 to provide answers & updates when it matters most.",
    },
    {
      img: Frame3,
      title: "Fast Response Times & Clear Communication",
    },
    {
      img: Frame4,
      title: "Focused on Getting Fair Settlements, Not Quick Payouts",
    },
  ];

  return (
    <section className="bg-[#D14836] py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon; 

            return (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#EBF5F8] rounded-lg flex items-center justify-center flex-shrink-0">
                  {feature.img ? (
                    <img
                      src={feature.img}
                      alt="feature-icon"
                      className="w-20 h-20 object-contain"
                    />
                  ) : (
                    <IconComponent className="w-20 h-20 text-[#2C3E50]" />
                  )}
                </div>
                <h3 className="text-white text-[15px] lg:text-[15px] w-[244px] leading-tight font-normal">
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
