"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ArrowRight, ArrowLeft, Check, Phone, User, Users } from 'lucide-react'
import BgImg from '../img/hero.png'
import HuntleyLawMobile from '../img/HuntleyLawMobile.png'
import HuntleyLawLaptop from '../img/HuntleyLawLaptop.png'
import { sendStepperFormEmail } from './emailService'
import deadActive from '../img/dead active.svg'
import deadInactive from '../img/dead default.svg'
import deadAct from '../img/DeathActive.svg';
import deadinact from '../img/DeathDef.svg';
import MildSerious from '../img/MildSerious.svg';
import MildSeriousDef from '../img/MildDef.svg';
import SeriousDef from '../img/SeriousDef.svg';
import MildDef from '../img/MildDef.svg';
import MildActive from '../img/MildActive.svg';
import carIcon from '../img/CarNew.png';
import truckIcon from '../img/Truck.png';

export default function HeroSection3() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedVehicle, setSelectedVehicle] = useState("car")
  const [selectedFault, setSelectedFault] = useState("someone-else")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState(HuntleyLawLaptop)
  const [formData, setFormData] = useState({
    // Step 1
    accidentType: "",
    injuryLevel: "",
    // Step 2
    whoWasInAccident: "",
    whoWasAtFault: "",
    // Step 3
    wereYouInsured: "",
    // Step 4
    fullName: "",
    phoneNumber: "",
    email: "",
    consent: false,
    // Step 5
    contactPreference: "",
    // Step 6
    scheduledDate: "",
    scheduledTime: "",
    timezone: ""
  })

  // Handle responsive background image
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setBackgroundImage(HuntleyLawMobile)
      } else {
        setBackgroundImage(HuntleyLawLaptop)
      }
    }

    // Set initial background
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const vehicleOptions = [
    { id: "car", label: "Car", icon: carIcon, isImage: true },
    { id: "truck", label: "Pickup Truck", icon: truckIcon, isImage: true }
  ]

  const faultOptions = [
    { value: "someone-else", label: "Someone else" },
    { value: "my-fault", label: "My fault" },
    { value: "not-sure", label: "Not sure" }
  ]

  const handleNext = () => {
    if (currentStep < 6) {
      // For step 4, send email after moving to step 5
      if (currentStep === 4) {
        handleSubmit().then(() => {
          setCurrentStep(currentStep + 1)
        })
        return
      }
      
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, '')
    
    // Limit to 10 digits
    if (phoneNumber.length > 10) return formData.phoneNumber
    
    // Format the number
    if (phoneNumber.length === 0) return ''
    if (phoneNumber.length <= 3) return `(${phoneNumber}`
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`
  }

  const handlePhoneNumberChange = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value)
    handleInputChange("phoneNumber", formattedNumber)
  }

  const handleSubmit = async () => {
    console.log("Form submitted:", {
      vehicle: selectedVehicle,
      fault: selectedFault,
      ...formData
    })
    setIsLoading(true)
    
    try {
      // Send email using EmailJS
      const emailResult = await sendStepperFormEmail(formData, "Hero Section 3")
      
      if (emailResult.success) {
        console.log("Email sent successfully")
      } else {
        console.error("Email sending failed:", emailResult.error)
        //alert("Thank you! We'll contact you soon.")
      }
      
      // Handle different contact preferences regardless of API success/failure
      if (formData.contactPreference === "call-now") {
        // For call now, redirect to phone after email attempt
        window.location.href = "tel:8882021350"
        return { success: true }
      } else if (formData.contactPreference === "text-me" || formData.contactPreference === "email-me") {
        // For text/email, go to step 6
        setCurrentStep(6)
        setIsLoading(false)
        return { success: true }
      } else if (formData.contactPreference === "schedule-call") {
        // For schedule call, go to step 6
        setCurrentStep(6)
        setIsLoading(false)
        return { success: true }
      }
      
      // Only reset form and go to step 1 for final submissions
      if (currentStep === 6) {
        //alert("Thank you! We'll contact you soon.")
        // Reset form data
        setFormData({
          accidentType: "",
          injuryLevel: "",
          whoWasInAccident: "",
          whoWasAtFault: "",
          wereYouInsured: "",
          fullName: "",
          phoneNumber: "",
          email: "",
          consent: false,
          contactPreference: "",
          scheduledDate: "",
          scheduledTime: "",
          timezone: ""
        })
        setCurrentStep(1)
        setIsLoading(false)
        return { success: true }
      }
      
      setIsLoading(false)
      return { success: true }
    } catch (error) {
      console.error("Error submitting form:", error)
      //alert("Thank you! We'll contact you soon.")
      
      // Handle different contact preferences even if API fails
      if (formData.contactPreference === "call-now") {
        // For call now, redirect to phone after email attempt
        window.location.href = "tel:8882021350"
        return { success: true }
      } else if (formData.contactPreference === "text-me" || formData.contactPreference === "email-me") {
        // For text/email, go to step 6
        setCurrentStep(6)
        setIsLoading(false)
        return { success: true }
      } else if (formData.contactPreference === "schedule-call") {
        // For schedule call, go to step 6
        setCurrentStep(6)
        setIsLoading(false)
        return { success: true }
      }
      
      setIsLoading(false)
      return { success: false, error }
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 min-h-[400px]">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                A <span className="text-red-600">Few Seconds</span> Is All It Takes To See If You Have A Valid Case
              </h3>
              
              {/* Accident Type Section */}
              <div className="mb-6">
                <h4 className="text-base font-semibold text-gray-800 mb-3 text-center">
                  What Type Of Accident?
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {vehicleOptions.map((option) => {
                    const IconComponent = option.icon
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleInputChange("accidentType", option.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.accidentType === option.id
                            ? 'border-blue-800 bg-blue-800 text-white'
                            : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          {option.isImage ? (
                            <img 
                              src={IconComponent} 
                              alt={option.label}
                              style={{ width: '6rem', height: '2.5rem' }}
                              className={`${
                                formData.accidentType === option.id ? 'filter brightness-0 invert' : ''
                              }`} 
                            />
                          ) : (
                            <IconComponent 
                              style={{ width: '6rem', height: '3rem' }}
                              className={`${
                                formData.accidentType === option.id ? 'text-white' : 'text-gray-400'
                              }`} 
                            />
                          )}
                          <span className={`text-sm font-medium ${
                            formData.accidentType === option.id ? 'text-white' : 'text-gray-600'
                          }`}>
                            {option.label}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Injury Level Section */}
              <div className="mb-6">
                <h4 className="text-base font-semibold text-gray-800 mb-3 text-center">
                  What Was The Level Of Injury?
                </h4>
                <div className="grid grid-cols-3 gap-3 justify-center">
                  {[
                    { value: "mild", label: "Mild Injury" },
                    { value: "serious", label: "Serious Injury" },
                    { value: "death", label: "Death" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleInputChange("injuryLevel", option.value)}
                      className="flex flex-col items-center space-y-2"
                    >
                      <div className={`w-20 h-20 flex items-center justify-center transition-all hover:scale-105`}>
                        {option.value === "mild" ? (
                          <img 
                            src={formData.injuryLevel === "mild" ? MildActive : MildDef} 
                            alt="Mild Injury" 
                            className="w-20 h-20"
                          />
                        ) : option.value === "serious" ? (
                          <img 
                            src={formData.injuryLevel === "serious" ? MildSerious : SeriousDef} 
                            alt="Serious Injury" 
                            className="w-20 h-20"
                          />
                        ) : (
                          <img 
                            src={formData.injuryLevel === "death" ? deadAct : deadinact} 
                            alt="Death" 
                            className="w-20 h-20"
                          />
                        )}
                      </div>
                      <span className={`text-xs font-medium ${
                        formData.injuryLevel === option.value ? 'text-blue-800' : 'text-gray-600'
                      }`}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6 min-h-[400px]">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                A <span className="text-red-600">Few Seconds</span> Is All It Takes To See If You Have A Valid Case
              </h3>
              
              {/* Who Was In The Accident Section */}
              <div className="mb-6">
                <h4 className="text-base font-semibold text-gray-800 mb-3 text-center">
                  Who Was In The Accident?
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleInputChange("whoWasInAccident", "me")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.whoWasInAccident === "me"
                        ? 'border-blue-800 bg-blue-800 text-white'
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="relative">
                        <User className={`w-12 h-12 ${
                          formData.whoWasInAccident === "me" ? 'text-white' : 'text-gray-400'
                        }`} />
                        {formData.whoWasInAccident === "me" && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-blue-800">
                            <span className="text-blue-800 text-xs font-bold">✓</span>
                          </div>
                        )}
                      </div>
                      <span className={`text-sm font-medium ${
                        formData.whoWasInAccident === "me" ? 'text-white' : 'text-gray-600'
                      }`}>
                        I was in the accident
                      </span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleInputChange("whoWasInAccident", "passenger")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.whoWasInAccident === "passenger"
                        ? 'border-blue-800 bg-blue-800 text-white'
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <User className={`w-12 h-12 ${
                        formData.whoWasInAccident === "passenger" ? 'text-white' : 'text-gray-400'
                      }`} />
                      <span className={`text-sm font-medium ${
                        formData.whoWasInAccident === "passenger" ? 'text-white' : 'text-gray-600'
                      }`}>
                        I was the passenger
                      </span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleInputChange("whoWasInAccident", "caretaker")}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.whoWasInAccident === "caretaker"
                        ? 'border-blue-800 bg-blue-800 text-white'
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Users className={`w-12 h-12 ${
                        formData.whoWasInAccident === "caretaker" ? 'text-white' : 'text-gray-400'
                      }`} />
                      <span className={`text-sm font-medium ${
                        formData.whoWasInAccident === "caretaker" ? 'text-white' : 'text-gray-600'
                      }`}>
                        I am the Caretaker
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Who Was At Fault Section */}
              <div className="mb-6">
                <h4 className="text-base font-semibold text-gray-800 mb-3 text-center">
                  Who Was At Fault?
                </h4>
                <div className="grid grid-cols-3 gap-3 justify-center">
                  {[
                    { value: "injured", emoji: "🤕", label: "Injured Person" },
                    { value: "someone-else", emoji: "😱", label: "Someone else" },
                    { value: "dont-know", emoji: "😵", label: "I don't Know" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleInputChange("whoWasAtFault", option.value)}
                      className="flex flex-col items-center space-y-2"
                    >
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all ${
                        formData.whoWasAtFault === option.value
                          ? 'border-blue-800 bg-blue-800'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}>
                        <span className="text-2xl">{option.emoji}</span>
                      </div>
                      <span className={`text-xs font-medium ${
                        formData.whoWasAtFault === option.value ? 'text-blue-800' : 'text-gray-600'
                      }`}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6 min-h-[400px] flex flex-col justify-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                A <span className="text-red-600">Few Seconds</span> Is All It Takes To See If You Have A Valid Case
              </h3>
              
              {/* Insurance Question Section */}
              <div className="mb-6">
                <h4 className="text-base font-semibold text-gray-800 mb-6 text-center">
                  Were You Insured At The Time Of The Accident?
                </h4>
                <div className="grid grid-cols-3 gap-4 justify-center">
                  {[
                    { value: "yes", icon: "✓", label: "Yes" },
                    { value: "no", icon: "✕", label: "No" },
                    { value: "dont-know", icon: "?", label: "I don't Know" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleInputChange("wereYouInsured", option.value)}
                      className="flex flex-col items-center space-y-2"
                    >
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all ${
                        formData.wereYouInsured === option.value
                          ? 'border-blue-800 bg-blue-800 text-white'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600'
                      }`}>
                        <span className="text-2xl font-bold">{option.icon}</span>
                      </div>
                      <span className={`text-sm font-medium ${
                        formData.wereYouInsured === option.value ? 'text-blue-800' : 'text-gray-600'
                      }`}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6 min-h-[400px] flex flex-col justify-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Let's Get In Touch
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Consent Section */}
                <div className="mt-4">
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => handleInputChange('consent', e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="text-xs text-gray-600 leading-relaxed">
                      I agree to the{' '}
                      <a href="#" className="text-red-600 font-medium no-underline">
                        Privacy policy
                      </a>
                      {' '}and{' '}
                      <a href="#" className="text-red-600 font-medium no-underline">
                        Disclaimer
                      </a>
                      {' '}and give my express written consent, affiliates and/or lawyer to contact you at the number provided above, even if this number is a wireless number or if I am presently listed on a Do Not Call list. I understand that I may be contacted by telephone, email, text message or mail regarding case options and that I may be called using automatic dialing equipment. Message and data rates may apply. My consent does not require purchase. This is Legal advertising.
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6 min-h-[400px] flex flex-col justify-center">
            <div>
              {/* Contact Preference Options */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleInputChange("contactPreference", "call-now")}
                  className="flex flex-col items-center space-y-2 p-4 rounded-lg border-2 transition-all hover:border-blue-800"
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all ${
                    formData.contactPreference === "call-now"
                      ? 'border-blue-800 bg-blue-800 text-white'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600'
                  }`}>
                    <Phone className="w-8 h-8" />
                  </div>
                  <span className={`text-sm font-medium ${
                    formData.contactPreference === "call-now" ? 'text-blue-800' : 'text-gray-600'
                  }`}>
                    Call Me Now
                  </span>
                </button>
                
                <button
                  onClick={() => handleInputChange("contactPreference", "schedule-call")}
                  className="flex flex-col items-center space-y-2 p-4 rounded-lg border-2 transition-all hover:border-blue-800"
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all ${
                    formData.contactPreference === "schedule-call"
                      ? 'border-blue-800 bg-blue-800 text-white'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600'
                  }`}>
                    <span className="text-2xl">📅</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    formData.contactPreference === "schedule-call" ? 'text-blue-800' : 'text-gray-600'
                  }`}>
                    Schedule a Call
                  </span>
                </button>
                
                <button
                  onClick={() => handleInputChange("contactPreference", "text-me")}
                  className="flex flex-col items-center space-y-2 p-4 rounded-lg border-2 transition-all hover:border-blue-800"
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all ${
                    formData.contactPreference === "text-me"
                      ? 'border-blue-800 bg-blue-800 text-white'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600'
                  }`}>
                    <span className="text-2xl">💬</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    formData.contactPreference === "text-me" ? 'text-blue-800' : 'text-gray-600'
                  }`}>
                    Text Me
                  </span>
                </button>
                
                <button
                  onClick={() => handleInputChange("contactPreference", "email-me")}
                  className="flex flex-col items-center space-y-2 p-4 rounded-lg border-2 transition-all hover:border-blue-800"
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all ${
                    formData.contactPreference === "email-me"
                      ? 'border-blue-800 bg-blue-800 text-white'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600'
                  }`}>
                    <span className="text-2xl">✉️</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    formData.contactPreference === "email-me" ? 'text-blue-800' : 'text-gray-600'
                  }`}>
                    Email Me
                  </span>
                </button>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6 min-h-[400px] flex flex-col justify-center">
            {formData.contactPreference === "schedule-call" ? (
              // Schedule a Call - Date and Time Picker
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  Schedule Your Call
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.scheduledDate}
                      onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      value={formData.scheduledTime}
                      onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Timezone
                    </label>
                    <select
                      value={formData.timezone}
                      onChange={(e) => handleInputChange('timezone', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select timezone</option>
                      {usTimezones.map((tz) => (
                        <option key={tz.value} value={tz.value}>
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <p className="text-sm text-gray-600 text-center">
                    We'll call you at your preferred time. If you need to reschedule, please contact us at (888) 202-1350.
                  </p>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Schedule Call</span>
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              // Text Me or Email Me - Confirmation Message
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Thank You!
                </h3>
                
                <p className="text-gray-600 mb-4">
                  Our team will reach out to you soon via {formData.contactPreference === "text-me" ? "text message" : "email"}.
                </p>

                <p className="text-sm text-gray-600 mb-4">
                  If this is urgent, you can reach us directly at:
                </p>

                <button
                  onClick={() => window.location.href = "tel:8882021350"}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now: (888) 202-1350</span>
                </button>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  const usTimezones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "America/Anchorage", label: "Alaska Time (AKT)" },
    { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" },
    { value: "America/Phoenix", label: "Arizona Time (MST)" },
    { value: "America/Indiana/Indianapolis", label: "Eastern Time - Indiana" },
    { value: "America/Detroit", label: "Eastern Time - Michigan" },
    { value: "America/Kentucky/Louisville", label: "Eastern Time - Kentucky" },
    { value: "America/Kentucky/Monticello", label: "Eastern Time - Kentucky (Monticello)" },
    { value: "America/Indiana/Vincennes", label: "Eastern Time - Indiana (Vincennes)" },
    { value: "America/Indiana/Winamac", label: "Eastern Time - Indiana (Winamac)" },
    { value: "America/Indiana/Marengo", label: "Eastern Time - Indiana (Marengo)" },
    { value: "America/Indiana/Petersburg", label: "Eastern Time - Indiana (Petersburg)" },
    { value: "America/Indiana/Vevay", label: "Eastern Time - Indiana (Vevay)" },
    { value: "America/Indiana/Tell_City", label: "Central Time - Indiana (Tell City)" },
    { value: "America/Indiana/Knox", label: "Central Time - Indiana (Knox)" },
    { value: "America/Menominee", label: "Central Time - Michigan (Menominee)" },
    { value: "America/North_Dakota/Center", label: "Central Time - North Dakota (Center)" },
    { value: "America/North_Dakota/New_Salem", label: "Central Time - North Dakota (New Salem)" },
    { value: "America/North_Dakota/Beulah", label: "Central Time - North Dakota (Beulah)" },
    { value: "America/Boise", label: "Mountain Time - Idaho" }
  ]

  return (
    <div className="min-h-screen relative pt-20"> {/* Added pt-20 to account for navbar height */}
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Section - Text and Buttons */}
            <div className="text-white space-y-6 text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Injured In A Motor Vehicle Accident? You Focus On Healing, We'll Handle The Fight.
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-lg">
                We Fight Insurance Companies And Negligent Drivers So You Can Recover With No Fees Unless We Win.
              </p>
            </div>
            
            {/* Right Section - Stepper Form Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto h-auto min-h-[680px] flex flex-col">
              <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-6 text-center lg:text-left">
                {currentStep === 1 && "See If You Qualify"}
                {currentStep === 2 && "Accident Details"}
                {currentStep === 3 && "Insurance Information"}
                {currentStep === 4 && "Contact Information"}
                {currentStep === 5 && "Contact Preference"}
                {currentStep === 6 && "Final Step"}
              </h2>
              
              <div className={`flex-1 ${currentStep === 4 ? 'overflow-y-auto' : ''}`}>
                {renderStepContent()}
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-6">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    disabled={isLoading}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back</span>
                  </button>
                )}
                
                {currentStep < 5 ? (
                  <button
                    onClick={handleNext}
                    disabled={isLoading}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : currentStep === 5 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span className="hidden sm:inline">Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>{formData.contactPreference === "call-now" ? "Call Now" : "Submit"}</span>
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </button>
                ) : currentStep === 6 && formData.contactPreference === "schedule-call" ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span className="hidden sm:inline">Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Schedule Call</span>
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 