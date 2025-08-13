import { Facebook, Linkedin, Instagram } from "lucide-react"
// import logo from "../img/claim4acc logo.png"
import logo1 from "../img/f logo.svg"
import "./Footer.css"

export default function Footer() {
  const scrollToTop = () => {
    console.log("Footer scroll to top function called");
    
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
      
      console.log("Footer scrolling completed");
    } catch (error) {
      console.error("Error scrolling to top:", error);
      
      // Fallback: Force scroll to top
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-[#0A1F8F] text-white">
      {/* Top Section - Contact & Social Media */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Contact Heading */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl lg:text-2xl font-bold">
              <span className="text-white">Contact Us To Explore <br></br> Your</span>{" "}
              <span className="text-[#D9534F]">Legal Options</span>{" "}
              <span className="text-white">Today</span>
            </h3>
          </div>

          {/* Call to Action & Social Media */}
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <button 
              className="footer-button"
              onClick={scrollToTop}
            >
              Free Case Review
            </button>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=61579252523936" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white rounded flex items-center justify-center hover:bg-white hover:text-[#2C3E50] transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/claim4accidents/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white rounded flex items-center justify-center hover:bg-white hover:text-[#2C3E50] transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/claim4accidents/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white rounded flex items-center justify-center hover:bg-white hover:text-[#2C3E50] transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
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
            <img src={logo1} alt="icon" className="w-30 h-10"/>
          </div>

          {/* Navigation Links */}
          {/* <div className="flex items-center gap-6">
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
          </div> */}

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <a href="/PrivacyPolicy" className="text-white hover:text-[#D9534F] transition-colors duration-300 no-underline">
              Privacy Policy
            </a>
            <a href="/Disclaimer" className="text-white hover:text-[#D9534F] transition-colors duration-300 no-underline">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 