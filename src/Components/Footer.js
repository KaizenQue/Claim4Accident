import { Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#2C3E50] text-white">
      {/* Top Section - Contact & Social Media */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Contact Heading */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl lg:text-2xl font-bold">
              <span className="text-white">Contact Us To Explore Your</span>{" "}
              <span className="text-[#D9534F]">Legal Options</span>{" "}
              <span className="text-white">Today</span>
            </h3>
          </div>

          {/* Call to Action & Social Media */}
          <div className="flex items-center gap-4">
            <button className="bg-[#337ab7] text-white px-6 py-3 rounded-md font-medium hover:bg-[#2E86C1] transition-colors duration-300">
              Free Case Review
            </button>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 border border-white rounded flex items-center justify-center hover:bg-white hover:text-[#2C3E50] transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 border border-white rounded flex items-center justify-center hover:bg-white hover:text-[#2C3E50] transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 border border-white rounded flex items-center justify-center hover:bg-white hover:text-[#2C3E50] transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="border-t border-[#D9534F]"></div>

      {/* Bottom Section - Navigation & Legal */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="text-xl font-bold">
            LOGO
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-white hover:text-[#D9534F] transition-colors duration-300 no-underline">
              Home
            </a>
            <a href="#" className="text-white hover:text-[#D9534F] transition-colors duration-300 no-underline">
              About Us
            </a>
            <a href="#" className="text-white hover:text-[#D9534F] transition-colors duration-300 no-underline">
              Services
            </a>
            <a href="#" className="text-white hover:text-[#D9534F] transition-colors duration-300 no-underline">
              Contact Us
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-white hover:text-[#D9534F] transition-colors duration-300 no-underline">
              Privacy Policy
            </a>
            <a href="#" className="text-white hover:text-[#D9534F] transition-colors duration-300 no-underline">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 