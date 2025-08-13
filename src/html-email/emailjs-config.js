// EmailJS Configuration for Stepper Forms

// EmailJS Public Key
export const EMAILJS_PUBLIC_KEY = "DyDZ85E9uwzwSyUoD";

// Service ID
export const EMAILJS_SERVICE_ID = "service_k1vzny9";

// Template IDs
export const TEMPLATE_IDS = {
  // Admin notification template
  STEPPER_FORM_ADMIN: "template_mnhb9lx",
  
  // User confirmation template
  STEPPER_FORM_CONFIRMATION: "template_ex2ix8w",
  
  // HTML version templates (optional)
  STEPPER_FORM_ADMIN_HTML: "template_mnhb9lx",
  STEPPER_FORM_CONFIRMATION_HTML: "template_ex2ix8w"
};

// Email addresses
export const EMAIL_ADDRESSES = {
  ADMIN: "reachus@fightformesothelioma.com",
  FROM: "reachus@fightformesothelioma.com"
};

// Page types for tracking
export const PAGE_TYPES = {
  NEVADA: "Nevada Landing Page",
  CALIFORNIA: "California Landing Page", 
  COLORADO: "Colorado Landing Page"
};

// Form field mappings
export const FORM_FIELD_MAPPINGS = {
  accidentType: {
    car: "Car",
    truck: "Pickup Truck"
  },
  injuryLevel: {
    mild: "Mild Injury",
    serious: "Serious Injury", 
    death: "Death"
  },
  whoWasInAccident: {
    me: "I was in the accident",
    caretaker: "I am the Caretaker"
  },
  whoWasAtFault: {
    injured: "Injured Person",
    "someone-else": "Someone else",
    "dont-know": "I don't know"
  }
};

// EmailJS initialization
export const initializeEmailJS = () => {
  if (typeof window !== 'undefined' && window.emailjs) {
    window.emailjs.init(EMAILJS_PUBLIC_KEY);
  }
};

// Template variable formatters
export const formatTemplateVariables = (formData, pageType) => {
  const currentDate = new Date();
  const pagePath = typeof window !== 'undefined' ? window.location.pathname : "Unknown";
  const fullPageUrl = typeof window !== 'undefined' ? window.location.href : "Unknown";
  
  return {
    // Form data
    full_name: formData.fullName || "Not provided",
    phone_number: formData.phoneNumber || "Not provided", 
    email: formData.email || "Not provided",
    accident_type: FORM_FIELD_MAPPINGS.accidentType[formData.accidentType] || "Not specified",
    injury_level: FORM_FIELD_MAPPINGS.injuryLevel[formData.injuryLevel] || "Not specified",
    who_was_in_accident: FORM_FIELD_MAPPINGS.whoWasInAccident[formData.whoWasInAccident] || "Not specified",
    who_was_at_fault: FORM_FIELD_MAPPINGS.whoWasAtFault[formData.whoWasAtFault] || "Not specified",
    consent_given: formData.consent ? "Yes" : "No",
    
    // Technical data
    page_type: pageType,
    page_path: pagePath,
    full_page_url: fullPageUrl,
    submission_date: currentDate.toLocaleDateString(),
    submission_time: currentDate.toLocaleTimeString(),
    
    // Email configuration
    from_name: formData.fullName || "Anonymous",
    from_email: EMAIL_ADDRESSES.FROM,
    to_email: EMAIL_ADDRESSES.ADMIN,
    subject: `New ${pageType} Case Review Submission`
  };
};

// Validation functions
export const validateFormData = (formData) => {
  const errors = [];
  
  if (!formData.fullName) {
    errors.push("Full name is required");
  }
  
  if (!formData.phoneNumber) {
    errors.push("Phone number is required");
  }
  
  if (!formData.accidentType) {
    errors.push("Accident type is required");
  }
  
  if (!formData.injuryLevel) {
    errors.push("Injury level is required");
  }
  
  if (!formData.whoWasInAccident) {
    errors.push("Who was in accident is required");
  }
  
  if (!formData.whoWasAtFault) {
    errors.push("Who was at fault is required");
  }
  
  if (!formData.consent) {
    errors.push("Consent is required");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Email sending configuration
export const EMAIL_CONFIG = {
  // Retry settings
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  
  // Timeout settings
  timeout: 10000, // 10 seconds
  
  // Success/error messages
  messages: {
    success: "Thank you! We'll contact you soon.",
    error: "There was an error submitting your form. Please try again.",
    networkError: "Network error. Please check your connection and try again."
  }
};

export default {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  TEMPLATE_IDS,
  EMAIL_ADDRESSES,
  PAGE_TYPES,
  FORM_FIELD_MAPPINGS,
  initializeEmailJS,
  formatTemplateVariables,
  validateFormData,
  EMAIL_CONFIG
}; 