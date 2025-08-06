"use client";
import { useState } from "react";
import Image from "../img/Accident1.jpg";
import Image2 from "../img/Accident2.png";
import { sendGamingLawsuitAdminEmail, sendGamingLawsuitUserEmail } from "./emailService.js";

// New step-based form questions
const formSteps = [
  {
    id: 1,
    type: "claim_type",
    header: "Take 15 Seconds to See if You Have a Case",
    question: "What type of accident occurred?",
    options: [
      { text: "Car Accident", icon: "🚗" },
      { text: "Truck Accident", icon: "🚛" }
    ],
    showFooter: false
  },
  {
    id: 2,
    type: "accident_participant",
    header: "Who was in the accident?",
    question: "Who was in the accident?",
    options: [
      { text: "I was in the accident", icon: "👤" },
      { text: "I am the caretaker", icon: "👨‍⚕️" }
    ],
    showFooter: true
  },
  {
    id: 3,
    type: "fault_determination",
    header: "Who was at fault?",
    question: "Who was at fault?",
    options: [
      { text: "The Injured Person", icon: "⚠️" },
      { text: "Someone else", icon: "👥" },
      { text: "I don't know", icon: "❓" }
    ],
    showFooter: true
  },
  {
    id: 4,
    type: "insurance_status",
    header: "Were you insured at the time of the accident?",
    question: "Were you insured at the time of the accident?",
    options: [
      { text: "Yes", icon: "✅" },
      { text: "No", icon: "❌" },
      { text: "I don't know", icon: "❓" }
    ],
    showFooter: true
  },
  {
    id: 5,
    type: "contact_info",
    header: "Let's get in touch",
    question: "Let's get in touch",
    fields: [
      { name: "firstName", label: "First Name", type: "text", required: true },
      { name: "lastName", label: "Last Name", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
      { name: "email", label: "Email", type: "email", required: true }
    ],
    showFooter: true
  },
  {
    id: 6,
    type: "consultation_preference",
    header: "How should we start your Free Consultation?!",
    question: "How should we start your Free Consultation?!",
    options: [
      { text: "Call Me Now", icon: "📞" },
      { text: "Schedule a Call", icon: "📅" },
      { text: "Text Me", icon: "💬" },
      { text: "Email Me", icon: "📧" }
    ],
    showFooter: true
  },
  {
    id: 7,
    type: "schedule_call",
    header: "Let's Get in Touch For A Free Consultation!",
    question: "Let's Get in Touch For A Free Consultation!",
    fields: [
      { name: "preferredDate", label: "Pick Your Date", type: "date", required: true },
      { name: "preferredTime", label: "Pick Your Time", type: "time", required: true }
    ],
    showFooter: true,
    conditional: true // Only shows if "Schedule a Call" is selected
  }
];

export default function Component() {
  const [step, setStep] = useState("initial");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    claimType: "",
    accidentParticipant: "",
    faultDetermination: "",
    insuranceStatus: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    consultationPreference: "",
    preferredDate: "",
    preferredTime: ""
  });
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCopyAnimation, setShowCopyAnimation] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leftCardImageIndex, setLeftCardImageIndex] = useState(0);

  const handleCheckEligibility = () => {
    setStep("eligibility");
    setCurrentStepIndex(0);
    setFormData({
      claimType: "",
      accidentParticipant: "",
      faultDetermination: "",
      insuranceStatus: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      consultationPreference: "",
      preferredDate: "",
      preferredTime: ""
    });
  };

  const handleOptionSelect = (option) => {
    const currentStep = formSteps[currentStepIndex];
    
    setFormData(prev => ({
      ...prev,
      [currentStep.type]: option
    }));

    // Special handling for consultation preference
    if (currentStep.type === "consultation_preference") {
      if (option === "Schedule a Call") {
        // Move to scheduling step
        setCurrentStepIndex(currentStepIndex + 1);
    } else {
        // Submit form directly
        handleSubmitForm();
      }
    } else {
      // Move to next step
      if (currentStepIndex < formSteps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
      }
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
        ...prev,
      [fieldName]: value
    }));
  };

  const handleNext = () => {
    const currentStep = formSteps[currentStepIndex];
    
    // Validate required fields
    if (currentStep.fields) {
      const hasAllRequiredFields = currentStep.fields.every(field => {
        if (field.required) {
          return formData[field.name] && formData[field.name].trim() !== "";
        }
        return true;
      });
      
      if (!hasAllRequiredFields) {
        return; // Don't proceed if required fields are empty
      }
    }

    if (currentStep.type === "contact_info") {
      // Move to consultation preference
      setCurrentStepIndex(currentStepIndex + 1);
    } else if (currentStep.type === "schedule_call") {
      // Submit form
      handleSubmitForm();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else {
      setStep("eligibility");
      setCurrentStepIndex(0);
    }
  };

  const handleSubmitForm = async () => {
    setIsSubmitting(true);
    
    try {
      // Prepare data for email
      const emailData = {
        fullName: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        email: formData.email,
        claimType: formData.claimType,
        accidentParticipant: formData.accidentParticipant,
        faultDetermination: formData.faultDetermination,
        insuranceStatus: formData.insuranceStatus,
        consultationPreference: formData.consultationPreference,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime
      };

      // Send admin email
      await sendGamingLawsuitAdminEmail(emailData, {}, "new_form");
      
      // Send user confirmation email
      await sendGamingLawsuitUserEmail(emailData, {}, "new_form");
      
      setSuccessMessage(`Great, ${formData.firstName}! We'll be in touch in the next few minutes or if this is more urgent you can call us now (888) 202 1350.`);
      setShowSuccessDialog(true);
    } catch (error) {
      setSuccessMessage("Sorry, there was an error submitting your form. Please try again later.");
      setShowSuccessDialog(true);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    // Reset form
      setStep("initial");
    setCurrentStepIndex(0);
    setFormData({
      claimType: "",
      accidentParticipant: "",
      faultDetermination: "",
      insuranceStatus: "",
      firstName: "",
      lastName: "",
        phone: "",
        email: "",
      consultationPreference: "",
      preferredDate: "",
      preferredTime: ""
    });
  };

  const renderInitialContent = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center drop-shadow-lg">
        Motor Vehicle Accident Lawsuit
      </h2>
      <p className="text-lg mb-6 text-white opacity-90 text-center max-w-xs md:max-w-md drop-shadow">
        Get the legal help you need after a motor vehicle accident
      </p>
      <button
        onClick={handleCheckEligibility}
        className="border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-none active:shadow-none"
      >
        Check Eligibility
      </button>
    </div>
  );

  const renderFormStep = () => {
    const currentStep = formSteps[currentStepIndex];
    if (!currentStep) return null;

    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full h-full p-2 md:p-6">
        <div className="bg-white rounded-lg p-3 md:p-8 max-w-sm md:max-w-md w-full max-h-[90vh] overflow-y-auto relative bottom-[55px]">
          {/* Progress bar */}
          <div className="w-full h-2 md:h-3 bg-gray-200 rounded-full mb-3 md:mb-6">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${((currentStepIndex + 1) / formSteps.length) * 100}%` }}
            />
          </div>
          
          <div className="text-center mb-3 md:mb-6">
            <span className="text-xs md:text-sm text-gray-500">
              Step {currentStepIndex + 1} of {formSteps.length}
            </span>
          </div>

          <h2 className="text-base md:text-xl font-bold text-gray-800 mb-2 md:mb-4 text-center">
            {currentStep.header}
          </h2>
          
          {currentStep.question && (
            <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 text-center">
              {currentStep.question}
            </p>
          )}

          {/* Options */}
          {currentStep.options && (
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              {currentStep.options.map((option, index) => (
              <button
                key={index}
                  onClick={() => handleOptionSelect(option.text)}
                  className="w-full text-left p-3 md:p-4 border-2 border-gray-300 rounded-lg transition-all duration-200 text-sm md:text-base hover:border-blue-400 hover:bg-gray-50 flex items-center gap-3"
                >
                  <span className="text-xl">{option.icon}</span>
                  <span>{option.text}</span>
              </button>
            ))}
          </div>
          )}

          {/* Input Fields */}
          {currentStep.fields && (
            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
              {currentStep.fields.map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
              <input
                    type={field.type}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={field.required}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-2 md:gap-4">
            {currentStepIndex > 0 && (
              <button
                onClick={handleBack}
                className="flex-1 py-2 md:py-3 px-4 md:px-6 border-2 border-dashed border-black bg-white font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:rounded-md hover:shadow-[2px_2px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-none active:shadow-none text-xs md:text-sm"
              >
                GO BACK
              </button>
          )}

            {(currentStep.type === "contact_info" || currentStep.type === "schedule_call") && (
          <button
                onClick={handleNext}
                disabled={isSubmitting}
                className={`flex-1 py-2 md:py-3 px-4 md:px-6 rounded font-semibold transition-colors text-xs md:text-sm ${
                  isSubmitting 
                    ? "bg-gray-400 text-white cursor-not-allowed" 
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "NEXT"}
          </button>
            )}
          </div>

          {/* Footer */}
          {currentStep.showFooter && (
            <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-200">
              <p className="text-xs md:text-sm text-gray-600 text-center">
                Call Us for Free: (888) 202 1350
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getCardContent = (cardNumber) => {
    if (step === "eligibility") {
      // Only show form on the right card (card 2)
      if (cardNumber === 2) {
        return renderFormStep();
      }
      return null; // Left card (card 1) will be empty
    }
    return null;
  };

  const cardImages = [Image, Image2];

  const renderSuccessDialog = () => (
    <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-500 scale-95 hover:scale-100 relative overflow-hidden border-4 border-dashed border-black">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>
        
        <div className="relative p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-green-600 mb-2 animate-pulse">
                 SUCCESS!
              </h3>
            </div>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {successMessage}
          </p>
          
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full animate-pulse" style={{width: '100%'}}></div>
              </div>
            <p className="text-sm text-gray-500">✅ Form submitted successfully!</p>
            </div>
          
          <div className="space-y-3">
              <button
                onClick={() => {
                  setShowSuccessDialog(false);
                  setIsShareModalOpen(true);
                }}
                className="w-full py-3 px-6 font-semibold text-gray-700 bg-white border-2 border-dashed border-gray-300 rounded-lg transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 transform hover:scale-105 active:scale-95"
              >
                📤 Share with Others
              </button>
          </div>
        </div>
        
        <button
          onClick={handleSuccessDialogClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row relative" data-component="component2">
      <style>
        {`
          @keyframes rocket-fly {
            0% {
              transform: translateY(0) scale(0.5);
              opacity: 1;
            }
            100% {
              transform: translateY(-200px) scale(1.2);
              opacity: 0;
            }
          }
          .animate-rocket-fly {
            animation: rocket-fly 1.5s ease-in-out forwards;
          }
          
          @keyframes fade-in {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
          
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
              transform: translate3d(0,0,0);
            }
            40%, 43% {
              transform: translate3d(0, -30px, 0);
            }
            70% {
              transform: translate3d(0, -15px, 0);
            }
            90% {
              transform: translate3d(0, -4px, 0);
            }
          }
          .animate-bounce {
            animation: bounce 1s infinite;
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          @keyframes confetti-fall {
            0% {
              transform: translateY(-100vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
          .animate-confetti {
            animation: confetti-fall 3s linear infinite;
          }
          
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
      `}
      </style>

      {/* {(step === "initial" || step === "eligibility") && (
        <div className="absolute top-4 left-4 z-40 flex gap-4">
          <button
            onClick={() => (window.location.href = "mailto:abc@abc.com")}
            className="border-2 border-dashed border-black bg-white px-4 py-2 font-semibold uppercase text-black text-sm transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-none active:shadow-none"
          >
            Contact Us
          </button>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="border-2 border-dashed border-black bg-white px-4 py-2 font-semibold uppercase text-black text-sm transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-none active:shadow-none"
          >
            Share with others
          </button>
        </div>
      )} */}

      {step === "initial" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none bg-transparent">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 text-center drop-shadow-lg pointer-events-auto">
            Motor Vehicle Accident Lawsuit
          </h2>
          <p className="text-lg md:text-2xl mb-6 text-white opacity-90 text-center max-w-xs md:max-w-2xl drop-shadow pointer-events-auto">
            Get the legal help you need after a motor vehicle accident
          </p>
          <button
            onClick={handleCheckEligibility}
            className="border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-none active:shadow-none pointer-events-auto"
          >
            Check Eligibility
          </button>
        </div>
      )}

      <div
        className={`relative w-full md:w-1/2 h-[50vh] md:h-screen overflow-hidden group transition-all duration-500 ease-in-out border-0 rounded-none md:rounded-r-lg
        ${step === "eligibility" ? "z-20 h-[35vh]" : "z-10 h-[50vh]"}
        card-gamified`}
      >
        <img
          src={cardImages[leftCardImageIndex]}
          alt="Card 1"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {getCardContent(1)}
      </div>

      <div
        className={`relative w-full md:w-1/2 h-[50vh] md:h-screen overflow-hidden group transition-all duration-500 ease-in-out border-0 rounded-none md:rounded-l-lg
        ${step === "eligibility" ? "z-30 h-[65vh]" : "z-10 h-[50vh]"}
        card-gamified`}
      >
        <img
          src={cardImages[1]}
          alt="Injured person"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {step === "eligibility" && (
          <div className="absolute inset-0 bg-white opacity-100 z-10" />
        )}
        {getCardContent(2)}
      </div>

      {isShareModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 hover:scale-100 relative overflow-hidden">
            <div className="p-6 relative bg-gray-50 rounded-t-xl">
              <h3 className="text-2xl font-bold text-center text-gray-800">
                Share with others
              </h3>
              <p className="text-center text-gray-500 mt-1 text-sm">
                Help someone else get the legal aid they need.
              </p>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4">
                <a
                  href={`mailto:?subject=Check out this legal assistance page&body=I found this helpful, you might too: ${
                    typeof window !== "undefined" ? window.location.href : ""
                  }`}
                  className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-cyan-500 hover:shadow-[4px_4px_0px_#06b6d4] transition-all duration-300 transform hover:-translate-y-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-cyan-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-semibold text-lg text-gray-700">
                    Email
                  </span>
                </a>
                <button
                  onClick={() => {
                    if (copied) return;
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setShowCopyAnimation(true);
                    setTimeout(() => {
                      setCopied(false);
                      setShowCopyAnimation(false);
                    }, 2000);
                  }}
                  disabled={copied}
                  className={`p-4 border-2 border-dashed rounded-lg transition-all duration-300 transform hover:-translate-y-1 font-semibold text-lg text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ${
                    copied
                      ? "border-green-500 shadow-[4px_4px_0px_#22c55e]"
                      : "border-gray-300 hover:border-blue-500 hover:shadow-[4px_4px_0px_#3b82f6]"
                  }`}
                >
                  {copied ? "URL Copied!" : "Copy URL"}
                </button>
              </div>
            </div>

            {showCopyAnimation && (
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 pointer-events-none">
                <div className="animate-rocket-fly text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-blue-500 transform -rotate-45"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                  <span className="mt-2 text-lg font-bold text-green-500">
                    Copied!
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showSuccessDialog && renderSuccessDialog()}
    </div>
  );
}
