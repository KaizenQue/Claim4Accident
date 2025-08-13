import Navbar from "./NavBar";
import HeroSection3 from "./HeroSection3";
import FeaturesSection from "./FeaturesSection";
import ServicesSection from "./ServicesSection";
import ProcessSection from "./ProcessSection";
import EligibilitySection from "./EligibilitySection";
import LocationsSection from "./LocationsSection";
import FAQSection from "./FAQSection";
import Footer from "./Footer";
import Component2 from './Component2'
import LocationCard from './LocationCard'
const HomePage = ()=>{

    return(
        <>
        <Navbar/>
        <HeroSection3/>
        <FeaturesSection/>
        <ServicesSection/>
        <ProcessSection/>
        <EligibilitySection/>
        {/* <div id="component2">
          <Component2/>
        </div> */}
        {/* <LocationsSection/> */}
        <LocationCard/>
        <FAQSection/>
        <Footer/>
        </>
    )
}

export default HomePage