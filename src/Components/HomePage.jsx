import Navbar from "./NavBar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import ServicesSection from "./ServicesSection";
import ProcessSection from "./ProcessSection";
import EligibilitySection from "./EligibilitySection";
import LocationsSection from "./LocationsSection";
import FAQSection from "./FAQSection";
import Footer from "./Footer";
import Component2 from './Component2'

const HomePage = ()=>{

    return(
        <>
        <Navbar/>
        <HeroSection/>
        <FeaturesSection/>
        <ServicesSection/>
        <ProcessSection/>
        <EligibilitySection/>
        <div id="component2">
          <Component2/>
        </div>
        {/* <LocationsSection/> */}
        <FAQSection/>
        <Footer/>
        </>
    )
}

export default HomePage