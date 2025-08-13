"use client"

import { useState } from "react"
import { 
  Button, 
  Card, 
  CardContent, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box, 
  Typography, 
  Grid, 
  Paper,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Link,
  CircularProgress
} from "@mui/material"
import { 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  LocationOn, 
  People, 
  TrendingUp, 
  Description,
  Close,
  DirectionsCar,
  LocalShipping,
  Person,
  Group
} from '@mui/icons-material'
import Map from './Map'
import Img1 from '../img/IMG1.png'
import Img2 from '../img/IMG2.png'
import Img3 from '../img/IMG3.png'
import MainImg from '../img/bg.png'
import NImg from '../img/Navada.svg'
import icon1 from '../img/1.svg'
import icon2 from '../img/2.svg'
import icon3 from '../img/3.svg'
import Navbar from "./NavBar"
import { sendStepperFormEmail } from './emailService';
import deadAct from '../img/DeathActive.svg';
import deadinact from '../img/DeathDef.svg';
import MildSerious from '../img/MildSerious.svg';
import MildSeriousDef from '../img/MildDef.svg';
import SeriousDef from '../img/SeriousDef.svg';
import MildDef from '../img/MildDef.svg';
import MildActive from '../img/MildActive.svg';

export default function LegalLandingPage() {
  const [showForm, setShowForm] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [hoveredState, setHoveredState] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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

  const nextStep = () => {
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

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    console.log("Form submitted:", formData)
    setIsLoading(true)
    
    try {
      // Send email using EmailJS
      const emailResult = await sendStepperFormEmail(formData, "Nevada Landing Page")
      
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
        setShowForm(false)
        setCurrentStep(1)
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

  const handlePhoneCall = () => {
    window.location.href = "tel:8882021350"
  }

  const stateData = [
    { id: "CA", name: "California", cities: ["Los Angeles", "San Francisco", "San Diego"], highlighted: true },
    { id: "NV", name: "Nevada", cities: ["Las Vegas", "Reno"], highlighted: true },
    { id: "CO", name: "Colorado", cities: ["Denver", "Colorado Springs"], highlighted: true },
    { id: "TX", name: "Texas", cities: ["Houston", "Dallas", "Austin"], highlighted: false },
    { id: "FL", name: "Florida", cities: ["Miami", "Orlando", "Tampa"], highlighted: false },
    { id: "NY", name: "New York", cities: ["New York City", "Buffalo", "Albany"], highlighted: false },
  ]

  const stats = [
    { number: "300+", label: "Fatalities on I-15", icon: TrendingUp },
    { number: "8K+", label: "Injuries on I-15", icon: Description },
    { number: "150+", label: "Fatalities on I-80", icon: LocationOn },
    { number: "2.5K", label: "Injuries on I-80", icon: People }
  ]

  const steps = ['Accident Type & Injury', 'Accident Details', 'Insurance Information', 'Contact Information', 'Contact Preference', 'Final Step']

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
    <>
    <Navbar />
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundImage: `url(${MainImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      overflow: 'hidden',
      marginTop:"4%"
    }}>
      {/* Overlay for better text readability */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: 'rgba(30, 58, 138, 0.3)',
        zIndex: 1
      }} />

      {/* Background Pattern */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        zIndex: 2,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '80px',
          left: '40px',
          width: '128px',
          height: '128px',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50%'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '160px',
          right: '80px',
          width: '96px',
          height: '96px',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50%'
        }
      }} />

      <Box sx={{ 
        position: 'relative', 
        zIndex: 3 
      }}>
        <Grid container spacing={0} sx={{ minHeight: '100vh', alignItems: 'center' }}>
          {/* Left Content */}
          <Grid item xs={12} lg={6} sx={{ order: { xs: 2, lg: 1 } }}>
            <Box sx={{ 
              position: 'relative',
              height: { xs: '45vh', lg: '100vh' },
              backgroundImage: { 
                xs: 'none',
                lg: showForm ? 
                  (currentStep === 1 ? `url(${Img1})` :
                  currentStep === 2 ? `url(${Img2})` :
                  currentStep === 3 ? `url(${Img3})` :
                  currentStep === 4 ? `url(${Img3})` :
                  currentStep === 5 ? `url(${Img3})` :
                  `url(${Img3})`) :
                  'none'
              },
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              mt: { xs: -52, lg: 0 }
            }}>
              <Box sx={{ 
                position: 'relative', 
                zIndex: 2, 
                px: 4, 
                py: 6,
                color: 'white'
              }}>
                {!showForm ? (
                  <>
                    <Typography variant="h3" sx={{ 
                      color: 'white', 
                      fontWeight: 'bold', 
                      mb: 2,
                      fontSize: { xs: '24px', md: '1.5rem', lg: '2rem' },
                      lineHeight: 1.2,
                      maxWidth: { xs: '100%', md: '600px', lg: '700px' }
                    }}>
                      Injured in a <span style={{ color: '#D14836' }}>Nevada </span> Car Accident?
                      <Box component="span" sx={{ color: 'white', display: 'block', mt: 1 }}>
                        You Focus On Healing, We'll Handle The Fight.
                      </Box>
                    </Typography>
                    
                    <Typography variant="body1" sx={{ 
                      color: '#dbeafe', 
                      mb: 4,
                      maxWidth: { xs: '100%', md: '600px', lg: '700px' },
                      fontSize: '1.1rem',
                      lineHeight: 1.6
                    }}>
                      No Win. No Fee. We take on insurance companies so you don't have to.
                    </Typography>

                    {/* <Typography variant="body1" sx={{ 
                      color: '#dbeafe', 
                      mb: 3,
                      maxWidth: '500px',
                      fontSize: '1rem',
                      lineHeight: 1.6
                    }}>
                      A crash can leave you hurt, confused, and overwhelmed with bills. Whether it happened on I-15, I-80, or a city street, we help Nevadans take back control. You heal — we'll deal with the insurance fight.
                    </Typography> */}

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
                      <Button 
                        variant="contained"
                        onClick={() => setShowForm(true)}
                        sx={{ 
                          bgcolor: '#D14836',
                          '&:hover': { bgcolor: '#b91c1c' },
                          px: 3,
                          py: 1.5,
                          fontSize: '0.875rem',
                          fontWeight: 'bold',
                          borderRadius: 2
                        }}
                      >
                        Start Your Free Case Review
                      </Button>
                      
                      <Button 
                        variant="outlined"
                        startIcon={<Phone />}
                        onClick={handlePhoneCall}
                        sx={{ 
                          borderColor: 'white',
                          color: 'white',
                          '&:hover': { 
                            bgcolor: 'white',
                            color: '#1e3a8a'
                          },
                          px: 3,
                          py: 1.5,
                          fontSize: '0.875rem',
                          fontWeight: 'bold',
                          borderRadius: 2
                        }}
                      >
                        Call Now: (888)-202-1350
                      </Button>
                    </Box>

                    {/* Stats Section */}
                    <Box sx={{ mb: 4, mt: { xs: 2, lg: 10 } }}>
                      <Typography variant="h4" sx={{ 
                        color: 'white', 
                        mb: 2,
                        fontSize: { xs: '24px', lg: '32px' },
                        fontWeight: 'bold'
                      }}>
                        Why Choose <Box component="span" sx={{ color: '#D14836' }}>Our Services</Box>
                      </Typography>
                      
                      <Grid container spacing={{ xs: 1, lg: 4 }}>
                        <Grid item xs={4}>
                          <Paper sx={{ 
                            bgcolor: '#0A1F8F', 
                            boxShadow: 'none',
                            p: { xs: 1, lg: 2 },
                            textAlign: 'center',
                            height: { xs: '100px', lg: '150px' },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '&:hover': { bgcolor: '#0A1F8F' },
                            transition: 'all 0.3s'
                          }}>
                            <Box sx={{ 
                              fontSize: 32, 
                              mb: 1,
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5
                            }}>
                              <img src={icon1} alt="icon1" style={{ width: '20px', height: '20px' }} />
                            </Box>
                            <Typography variant="body2" sx={{ 
                              color: 'white', 
                              fontSize: { xs: '0.7rem', lg: '0.875rem' },
                              fontWeight: 'medium',
                              lineHeight: 1.2,
                              textAlign: 'center'
                            }}>
                              Specialized<br />Legal Support
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={4}>
                          <Paper sx={{ 
                            bgcolor: '#0A1F8F', 
                            boxShadow: 'none',
                            p: { xs: 1, lg: 2 },
                            textAlign: 'center',
                            height: { xs: '100px', lg: '150px' },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '&:hover': { bgcolor: '#0A1F8F' },
                            transition: 'all 0.3s'
                          }}>
                            <Box sx={{ 
                              fontSize: 32, 
                              mb: 1,
                              color: 'white'
                            }}>
                              <img src={icon2} alt="icon2" style={{ width: '20px', height: '20px' }} />
                            </Box>
                            <Typography variant="body2" sx={{ 
                              color: 'white', 
                              fontSize: { xs: '0.7rem', lg: '0.875rem' },
                              fontWeight: 'medium',
                              lineHeight: 1.2,
                              textAlign: 'center'
                            }}>
                              No Upfront<br />Costs
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={4}>
                          <Paper sx={{ 
                            bgcolor: '#0A1F8F', 
                            boxShadow: 'none',
                            p: { xs: 1, lg: 2 },
                            textAlign: 'center',
                            height: { xs: '100px', lg: '150px' },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '&:hover': { bgcolor: '#0A1F8F' },
                            transition: 'all 0.3s'
                          }}>
                            <Box sx={{ 
                              fontSize: 32, 
                              mb: 1,
                              color: 'white'
                            }}>
                              <img src={icon3} alt="icon3" style={{ width: '20px', height: '20px' }} />
                            </Box>
                            <Typography variant="body2" sx={{ 
                              color: 'white', 
                              fontSize: { xs: '0.7rem', lg: '0.875rem' },
                              fontWeight: 'medium',
                              lineHeight: 1.2,
                              textAlign: 'center'
                            }}>
                              Confidential<br />Case Reviews
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Trust Line */}
                    {/* <Box sx={{ mt: 4, textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ 
                        color: '#bfdbfe', 
                        fontSize: '0.875rem',
                        fontStyle: 'italic'
                      }}>
                        Serving over 100 Nevada communities. Thousands of claims filed. 24/7 case support.
                      </Typography>
                    </Box> */}
                  </>
                ) : (
                  <Box sx={{ textAlign: 'center' }}>
                    {/* Removed the step titles and descriptions */}
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Right Content - Map or Form */}
          <Grid item xs={12} lg={6} sx={{ order: { xs: 1, lg: 2 } }}>
            <Box sx={{ 
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: showForm ? 'white' : 'transparent'
            }}>
              {!showForm ? (
                <Box sx={{ 
                  position: 'relative', 
                  width: '100%', 
                  maxWidth: '500px',
                  display: { xs: 'none', sm: 'flex' }
                }}>
                  <Box sx={{ 
                    width: '100%', 
                    height: { xs: '300px', sm: '400px', md: '450px' },
                    borderRadius: 2,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img 
                      src={NImg} 
                      alt="Nevada" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                </Box>
              ) : (
                <Card sx={{ 
                  width: '100%', 
                  maxWidth: '500px',
                  bgcolor: 'white',
                  boxShadow: 'none',
                  border: 'none'
                }}>
                  <CardContent sx={{ p: 3, maxHeight: '70vh', overflowY: currentStep === 4 ? 'auto' : 'visible' }}>
                    {/* <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 'bold', 
                          color: '#1e3a8a',
                          mb: 1,
                          textAlign: 'center'
                        }}>
                          Free Case Review
                        </Typography>
                        <IconButton
                          onClick={() => setShowForm(false)}
                          sx={{ color: 'text.secondary' }}
                          size="small"
                        >
                          <Close />
                        </IconButton>
                      </Box>
                      <Typography variant="body1" sx={{ 
                        color: '#64748b',
                        textAlign: 'center',
                        mb: 3
                      }}>
                        Get your free consultation today
                      </Typography>
                    </Box> */}

                    {/* Step 1: Accident Type & Injury Level */}
                    {currentStep === 1 && (
                      <Box sx={{ space: 2 }}>
                        <Typography variant="h5" sx={{ 
                          fontWeight: 'bold', 
                          color: 'text.primary', 
                          mb: 3,
                          textAlign: 'center',
                          fontSize: '1rem'
                        }}>
                          A <Box component="span" sx={{ color: '#E05C4B' }}>Few Seconds</Box> Is All It Takes To See If You Have A Valid Case
                        </Typography>
                        
                        {/* Accident Type Section */}
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 'bold', 
                            color: 'text.primary', 
                            mb: 2,
                            textAlign: 'center',
                            fontSize: '0.875rem'
                          }}>
                            What Type Of Accident?
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Card 
                                onClick={() => handleInputChange("accidentType", "car")}
                                sx={{ 
                                  cursor: 'pointer',
                                  border: formData.accidentType === "car" ? '2px solid #0A1F8F' : '1px solid #e5e7eb',
                                  bgcolor: formData.accidentType === "car" ? '#0A1F8F' : '#f9fafb',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    borderColor: '#0A1F8F',
                                    bgcolor: formData.accidentType === "car" ? '#0A1F8F' : '#f3f4f6'
                                  }
                                }}
                              >
                                <CardContent sx={{ 
                                  textAlign: 'center', 
                                  py: 3,
                                  color: formData.accidentType === "car" ? 'white' : '#6b7280'
                                }}>
                                  <DirectionsCar sx={{ 
                                    fontSize: 48, 
                                    mb: 1,
                                    color: formData.accidentType === "car" ? 'white' : '#9ca3af'
                                  }} />
                                  <Typography variant="body1" sx={{ fontWeight: 'medium', fontSize: '0.875rem' }}>
                                    Car
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={6}>
                              <Card 
                                onClick={() => handleInputChange("accidentType", "truck")}
                                sx={{ 
                                  cursor: 'pointer',
                                  border: formData.accidentType === "truck" ? '2px solid #0A1F8F' : '1px solid #e5e7eb',
                                  bgcolor: formData.accidentType === "truck" ? '#0A1F8F' : '#f9fafb',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    borderColor: '#0A1F8F',
                                    bgcolor: formData.accidentType === "truck" ? '#0A1F8F' : '#f3f4f6'
                                  }
                                }}
                              >
                                <CardContent sx={{ 
                                  textAlign: 'center', 
                                  py: 3,
                                  color: formData.accidentType === "truck" ? 'white' : '#6b7280'
                                }}>
                                  <LocalShipping sx={{ 
                                    fontSize: 48, 
                                    mb: 1,
                                    color: formData.accidentType === "truck" ? 'white' : '#9ca3af'
                                  }} />
                                  <Typography variant="body1" sx={{ fontWeight: 'medium', fontSize: '0.875rem' }}>
                                    Pickup Truck
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          </Grid>
                        </Box>

                        {/* Injury Level Section */}
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 'bold', 
                            color: 'text.primary', 
                            mb: 2,
                            textAlign: 'center',
                            fontSize: '0.875rem'
                          }}>
                            What Was The Level Of Injury?
                          </Typography>
                          <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={4}>
                              <Box 
                                onClick={() => handleInputChange("injuryLevel", "mild")}
                                sx={{ 
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <Box sx={{
                                  width: 80,
                                  height: 80,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1,
                                  '&:hover': {
                                    transform: 'scale(1.05)'
                                  }
                                }}>
                                  <img 
                                    src={formData.injuryLevel === "mild" ? MildActive : MildDef} 
                                    alt="Mild Injury"
                                    style={{ width: '80px', height: '80px' }}
                                  />
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: formData.injuryLevel === "mild" ? '#0A1F8F' : '#6b7280',
                                  fontWeight: 'medium',
                                  fontSize: '0.75rem'
                                }}>
                                  Mild Injury
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box 
                                onClick={() => handleInputChange("injuryLevel", "serious")}
                                sx={{ 
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <Box sx={{
                                  width: 80,
                                  height: 80,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1,
                                  '&:hover': {
                                    transform: 'scale(1.05)'
                                  }
                                }}>
                                  <img 
                                    src={formData.injuryLevel === "serious" ? MildSerious : SeriousDef} 
                                    alt="Serious Injury"
                                    style={{ width: '80px', height: '80px' }}
                                  />
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: formData.injuryLevel === "serious" ? '#0A1F8F' : '#6b7280',
                                  fontWeight: 'medium',
                                  fontSize: '0.75rem'
                                }}>
                                  Serious Injury
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box 
                                onClick={() => handleInputChange("injuryLevel", "death")}
                                sx={{ 
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <Box sx={{
                                  width: 80,
                                  height: 80,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1,
                                  '&:hover': {
                                    transform: 'scale(1.05)'
                                  }
                                }}>
                                  <img 
                                    src={formData.injuryLevel === "death" ? deadAct : deadinact} 
                                    alt="Death"
                                    style={{ width: '80px', height: '80px' }}
                                  />
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: formData.injuryLevel === "death" ? '#0A1F8F' : '#6b7280',
                                  fontWeight: 'medium',
                                  fontSize: '0.75rem'
                                }}>
                                  Death
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    )}

                    {/* Step 2: Who Was In The Accident & Who Was At Fault */}
                    {currentStep === 2 && (
                      <Box sx={{ space: 2 }}>
                        <Typography variant="h5" sx={{ 
                          fontWeight: 'bold', 
                          color: 'text.primary', 
                          mb: 3,
                          textAlign: 'center',
                          fontSize: '1rem'
                        }}>
                          A <Box component="span" sx={{ color: '#E05C4B' }}>Few Seconds</Box> Is All It Takes To See If You Have A Valid Case
                        </Typography>
                        
                        {/* Who Was In The Accident Section */}
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 'bold', 
                            color: 'text.primary', 
                            mb: 2,
                            textAlign: 'center',
                            fontSize: '0.875rem'
                          }}>
                            Who Was In The Accident?
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <Card 
                                onClick={() => handleInputChange("whoWasInAccident", "me")}
                                sx={{ 
                                  cursor: 'pointer',
                                  border: formData.whoWasInAccident === "me" ? '2px solid #0A1F8F' : '1px solid #e5e7eb',
                                  bgcolor: formData.whoWasInAccident === "me" ? '#0A1F8F' : '#f9fafb',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    borderColor: '#0A1F8F',
                                    bgcolor: formData.whoWasInAccident === "me" ? '#0A1F8F' : '#f3f4f6'
                                  }
                                }}
                              >
                                <CardContent sx={{ 
                                  textAlign: 'center', 
                                  py: 3,
                                  color: formData.whoWasInAccident === "me" ? 'white' : '#6b7280'
                                }}>
                                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                    <Person sx={{ 
                                      fontSize: 48, 
                                      mb: 1,
                                      color: formData.whoWasInAccident === "me" ? 'white' : '#9ca3af'
                                    }} />
                                    <Box sx={{
                                      position: 'absolute',
                                      top: -5,
                                      right: -5,
                                      width: 20,
                                      height: 20,
                                      borderRadius: '50%',
                                      bgcolor: formData.whoWasInAccident === "me" ? 'white' : 'transparent',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      border: formData.whoWasInAccident === "me" ? '1px solid #0A1F8F' : 'none'
                                    }}>
                                      <Typography variant="body2" sx={{ 
                                        color: formData.whoWasInAccident === "me" ? '#0A1F8F' : 'transparent',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold'
                                      }}>
                                        ✓
                                      </Typography>
                                    </Box>
                                  </Box>
                                  <Typography variant="body1" sx={{ fontWeight: 'medium', fontSize: '0.875rem' }}>
                                    I was in the accident
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={4}>
                              <Card 
                                onClick={() => handleInputChange("whoWasInAccident", "passenger")}
                                sx={{ 
                                  cursor: 'pointer',
                                  border: formData.whoWasInAccident === "passenger" ? '2px solid #0A1F8F' : '1px solid #e5e7eb',
                                  bgcolor: formData.whoWasInAccident === "passenger" ? '#0A1F8F' : '#f9fafb',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    borderColor: '#0A1F8F',
                                    bgcolor: formData.whoWasInAccident === "passenger" ? '#0A1F8F' : '#f3f4f6'
                                  }
                                }}
                              >
                                <CardContent sx={{ 
                                  textAlign: 'center', 
                                  py: 3,
                                  color: formData.whoWasInAccident === "passenger" ? 'white' : '#6b7280'
                                }}>
                                  <Person sx={{ 
                                    fontSize: 48, 
                                    mb: 1,
                                    color: formData.whoWasInAccident === "passenger" ? 'white' : '#9ca3af'
                                  }} />
                                  <Typography variant="body1" sx={{ fontWeight: 'medium', fontSize: '0.875rem' }}>
                                    I was the passenger
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={4}>
                              <Card 
                                onClick={() => handleInputChange("whoWasInAccident", "caretaker")}
                                sx={{ 
                                  cursor: 'pointer',
                                  border: formData.whoWasInAccident === "caretaker" ? '2px solid #0A1F8F' : '1px solid #e5e7eb',
                                  bgcolor: formData.whoWasInAccident === "caretaker" ? '#0A1F8F' : '#f9fafb',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    borderColor: '#0A1F8F',
                                    bgcolor: formData.whoWasInAccident === "caretaker" ? '#0A1F8F' : '#f3f4f6'
                                  }
                                }}
                              >
                                <CardContent sx={{ 
                                  textAlign: 'center', 
                                  py: 3,
                                  color: formData.whoWasInAccident === "caretaker" ? 'white' : '#6b7280'
                                }}>
                                  <Group sx={{ 
                                    fontSize: 48, 
                                    mb: 1,
                                    color: formData.whoWasInAccident === "caretaker" ? 'white' : '#9ca3af'
                                  }} />
                                  <Typography variant="body1" sx={{ fontWeight: 'medium', fontSize: '0.875rem' }}>
                                    I am the Caretaker
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          </Grid>
                        </Box>

                        {/* Who Was At Fault Section */}
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 'bold', 
                            color: 'text.primary', 
                            mb: 2,
                            textAlign: 'center',
                            fontSize: '0.875rem'
                          }}>
                            Who Was At Fault?
                          </Typography>
                          <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={4}>
                              <Box 
                                onClick={() => handleInputChange("whoWasAtFault", "injured")}
                                sx={{ 
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <Box sx={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: '50%',
                                  bgcolor: formData.whoWasAtFault === "injured" ? '#0A1F8F' : '#e5e7eb',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1,
                                  border: formData.whoWasAtFault === "injured" ? '2px solid #0A1F8F' : '1px solid #d1d5db',
                                  '&:hover': {
                                    bgcolor: formData.whoWasAtFault === "injured" ? '#0A1F8F' : '#f3f4f6'
                                  }
                                }}>
                                  <Typography variant="h4" sx={{ 
                                    color: formData.whoWasAtFault === "injured" ? 'white' : '#9ca3af'
                                  }}>
                                    🤕
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: formData.whoWasAtFault === "injured" ? '#0A1F8F' : '#6b7280',
                                  fontWeight: 'medium',
                                  fontSize: '0.75rem'
                                }}>
                                  Injured Person
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box 
                                onClick={() => handleInputChange("whoWasAtFault", "someone-else")}
                                sx={{ 
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <Box sx={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: '50%',
                                  bgcolor: formData.whoWasAtFault === "someone-else" ? '#0A1F8F' : '#e5e7eb',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1,
                                  border: formData.whoWasAtFault === "someone-else" ? '2px solid #0A1F8F' : '1px solid #d1d5db',
                                  '&:hover': {
                                    bgcolor: formData.whoWasAtFault === "someone-else" ? '#0A1F8F' : '#f3f4f6'
                                  }
                                }}>
                                  <Typography variant="h4" sx={{ 
                                    color: formData.whoWasAtFault === "someone-else" ? 'white' : '#9ca3af'
                                  }}>
                                    😱
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: formData.whoWasAtFault === "someone-else" ? '#0A1F8F' : '#6b7280',
                                  fontWeight: 'medium',
                                  fontSize: '0.75rem'
                                }}>
                                  Someone else
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box 
                                onClick={() => handleInputChange("whoWasAtFault", "dont-know")}
                                sx={{ 
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <Box sx={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: '50%',
                                  bgcolor: formData.whoWasAtFault === "dont-know" ? '#0A1F8F' : '#e5e7eb',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1,
                                  border: formData.whoWasAtFault === "dont-know" ? '2px solid #0A1F8F' : '1px solid #d1d5db',
                                  '&:hover': {
                                    bgcolor: formData.whoWasAtFault === "dont-know" ? '#0A1F8F' : '#f3f4f6'
                                  }
                                }}>
                                  <Typography variant="h4" sx={{ 
                                    color: formData.whoWasAtFault === "dont-know" ? 'white' : '#9ca3af'
                                  }}>
                                    😵
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: formData.whoWasAtFault === "dont-know" ? '#0A1F8F' : '#6b7280',
                                  fontWeight: 'medium',
                                  fontSize: '0.75rem'
                                }}>
                                  I don't Know
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    )}

                    {/* Step 3: Insurance Information */}
                    {currentStep === 3 && (
                      <Box sx={{ space: 2 }}>
                        <Typography variant="h5" sx={{ 
                          fontWeight: 'bold', 
                          color: 'text.primary', 
                          mb: 3,
                          textAlign: 'center',
                          fontSize: '1rem'
                        }}>
                          A <Box component="span" sx={{ color: '#E05C4B' }}>Few Seconds</Box> Is All It Takes To See If You Have A Valid Case
                        </Typography>
                        
                        {/* Insurance Question Section */}
                        <Box sx={{ mb: 4 }}>
                          {/* <Typography variant="h6" sx={{ 
                            fontWeight: 'bold', 
                            color: 'text.primary', 
                            mb: 3,
                            textAlign: 'center',
                            fontSize: '0.875rem'
                          }}>
                            Were You Insured At The Time Of The Accident?
                          </Typography> */}
                          <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={4}>
                              <Box 
                                onClick={() => handleInputChange("wereYouInsured", "yes")}
                                sx={{ 
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <Box sx={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: '50%',
                                  bgcolor: formData.wereYouInsured === "yes" ? '#0A1F8F' : '#e5e7eb',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1,
                                  border: formData.wereYouInsured === "yes" ? '2px solid #0A1F8F' : '1px solid #d1d5db',
                                  '&:hover': {
                                    bgcolor: formData.wereYouInsured === "yes" ? '#0A1F8F' : '#f3f4f6'
                                  }
                                }}>
                                  <Typography variant="h4" sx={{ 
                                    color: formData.wereYouInsured === "yes" ? 'white' : '#9ca3af',
                                    fontWeight: 'bold'
                                  }}>
                                    ✓
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: formData.wereYouInsured === "yes" ? '#0A1F8F' : '#6b7280',
                                  fontWeight: 'medium',
                                  fontSize: '0.75rem'
                                }}>
                                  Yes
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box 
                                onClick={() => handleInputChange("wereYouInsured", "no")}
                                sx={{ 
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <Box sx={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: '50%',
                                  bgcolor: formData.wereYouInsured === "no" ? '#0A1F8F' : '#e5e7eb',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1,
                                  border: formData.wereYouInsured === "no" ? '2px solid #0A1F8F' : '1px solid #d1d5db',
                                  '&:hover': {
                                    bgcolor: formData.wereYouInsured === "no" ? '#0A1F8F' : '#f3f4f6'
                                  }
                                }}>
                                  <Typography variant="h4" sx={{ 
                                    color: formData.wereYouInsured === "no" ? 'white' : '#9ca3af',
                                    fontWeight: 'bold'
                                  }}>
                                    ✕
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: formData.wereYouInsured === "no" ? '#0A1F8F' : '#6b7280',
                                  fontWeight: 'medium',
                                  fontSize: '0.75rem'
                                }}>
                                  No
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box 
                                onClick={() => handleInputChange("wereYouInsured", "dont-know")}
                                sx={{ 
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <Box sx={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: '50%',
                                  bgcolor: formData.wereYouInsured === "dont-know" ? '#0A1F8F' : '#e5e7eb',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1,
                                  border: formData.wereYouInsured === "dont-know" ? '2px solid #0A1F8F' : '1px solid #d1d5db',
                                  '&:hover': {
                                    bgcolor: formData.wereYouInsured === "dont-know" ? '#0A1F8F' : '#f3f4f6'
                                  }
                                }}>
                                  <Typography variant="h4" sx={{ 
                                    color: formData.wereYouInsured === "dont-know" ? 'white' : '#9ca3af',
                                    fontWeight: 'bold'
                                  }}>
                                    ?
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: formData.wereYouInsured === "dont-know" ? '#0A1F8F' : '#6b7280',
                                  fontWeight: 'medium',
                                  fontSize: '0.75rem'
                                }}>
                                  I don't Know
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    )}

                    {/* Step 4: Contact Information */}
                    {currentStep === 4 && (
                      <Box sx={{ space: 2 }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 'bold', 
                          color: 'text.primary', 
                          mb: 3,
                          textAlign: 'center',
                          fontSize: '1.25rem'
                        }}>
                          Let's Get In Touch
                        </Typography>
                        
                        <TextField
                          fullWidth
                          label="Full Name"
                          size="small"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          sx={{ mb: 2 }}
                        />
                        
                        <TextField
                          fullWidth
                          label="Phone Number"
                          size="small"
                          value={formData.phoneNumber}
                          onChange={handlePhoneNumberChange}
                          sx={{ mb: 2 }}
                        />
                        
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          size="small"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          sx={{ mb: 3 }}
                        />

                        {/* Consent Section */}
                        <Box sx={{ mb: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <Checkbox
                              checked={formData.consent}
                              onChange={(e) => handleInputChange("consent", e.target.checked)}
                              sx={{ mt: 0.5 }}
                            />
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem', lineHeight: 1.4 }}>
                              I agree to the{' '}
                              <Link href="#" sx={{ color: '#E05C4B', textDecoration: 'none', fontWeight: 'medium' }}>
                                Privacy policy
                              </Link>
                              {' '}and{' '}
                              <Link href="#" sx={{ color: '#E05C4B', textDecoration: 'none', fontWeight: 'medium' }}>
                                Disclaimer
                              </Link>
                              {' '}and give my express written consent, affiliates and/or lawyer to contact you at the number provided above, even if this number is a wireless number or if I am presently listed on a Do Not Call list. I understand that I may be contacted by telephone, email, text message or mail regarding case options and that I may be called using automatic dialing equipment. Message and data rates may apply. My consent does not require purchase. This is Legal advertising.
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    )}

                    {/* Step 5: Contact Preference */}
                    {currentStep === 5 && (
                      <Box sx={{ space: 2 }}>
                        {/* <Typography variant="h5" sx={{ 
                          fontWeight: 'bold', 
                          color: 'text.primary', 
                          mb: 2,
                          textAlign: 'center',
                          fontSize: '1.1rem'
                        }}>
                          Were <Box component="span" sx={{ color: '#E05C4B' }}>You Insured</Box> At The Time Of The Accident?
                        </Typography>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 'bold', 
                          color: '#0A1F8F', 
                          mb: 4,
                          textAlign: 'center',
                          fontSize: '0.9rem'
                        }}>
                          Were You Insured At The Time Of The Accident?
                        </Typography> */}
                        
                        {/* Contact Preference Options */}
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box 
                              onClick={() => handleInputChange("contactPreference", "call-now")}
                              sx={{ 
                                cursor: 'pointer',
                                textAlign: 'center',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <Box sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                bgcolor: formData.contactPreference === "call-now" ? '#0A1F8F' : '#e5e7eb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 1,
                                border: formData.contactPreference === "call-now" ? '2px solid #0A1F8F' : '1px solid #d1d5db',
                                '&:hover': {
                                  bgcolor: formData.contactPreference === "call-now" ? '#0A1F8F' : '#f3f4f6'
                                }
                              }}>
                                <Phone sx={{ 
                                  fontSize: 32, 
                                  color: formData.contactPreference === "call-now" ? 'white' : '#0A1F8F'
                                }} />
                              </Box>
                              <Typography variant="body2" sx={{ 
                                color: formData.contactPreference === "call-now" ? '#0A1F8F' : '#0A1F8F',
                                fontWeight: 'medium',
                                fontSize: '0.75rem'
                              }}>
                                Call Me Now
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box 
                              onClick={() => handleInputChange("contactPreference", "schedule-call")}
                              sx={{ 
                                cursor: 'pointer',
                                textAlign: 'center',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <Box sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                bgcolor: formData.contactPreference === "schedule-call" ? '#0A1F8F' : '#e5e7eb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 1,
                                border: formData.contactPreference === "schedule-call" ? '2px solid #0A1F8F' : '1px solid #d1d5db',
                                '&:hover': {
                                  bgcolor: formData.contactPreference === "schedule-call" ? '#0A1F8F' : '#f3f4f6'
                                }
                              }}>
                                <Box sx={{ 
                                  fontSize: 32, 
                                  color: formData.contactPreference === "schedule-call" ? 'white' : '#0A1F8F',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  📅
                                </Box>
                              </Box>
                              <Typography variant="body2" sx={{ 
                                color: formData.contactPreference === "schedule-call" ? '#0A1F8F' : '#6b7280',
                                fontWeight: 'medium',
                                fontSize: '0.75rem'
                              }}>
                                Schedule a Call
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box 
                              onClick={() => handleInputChange("contactPreference", "text-me")}
                              sx={{ 
                                cursor: 'pointer',
                                textAlign: 'center',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <Box sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                bgcolor: formData.contactPreference === "text-me" ? '#0A1F8F' : '#e5e7eb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 1,
                                border: formData.contactPreference === "text-me" ? '2px solid #0A1F8F' : '1px solid #d1d5db',
                                '&:hover': {
                                  bgcolor: formData.contactPreference === "text-me" ? '#0A1F8F' : '#f3f4f6'
                                }
                              }}>
                                <Box sx={{ 
                                  fontSize: 32, 
                                  color: formData.contactPreference === "text-me" ? 'white' : '#0A1F8F',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  💬
                                </Box>
                              </Box>
                              <Typography variant="body2" sx={{ 
                                color: formData.contactPreference === "text-me" ? '#0A1F8F' : '#6b7280',
                                fontWeight: 'medium',
                                fontSize: '0.75rem'
                              }}>
                                Text Me
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box 
                              onClick={() => handleInputChange("contactPreference", "email-me")}
                              sx={{ 
                                cursor: 'pointer',
                                textAlign: 'center',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <Box sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                bgcolor: formData.contactPreference === "email-me" ? '#0A1F8F' : '#e5e7eb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 1,
                                border: formData.contactPreference === "email-me" ? '2px solid #0A1F8F' : '1px solid #d1d5db',
                                '&:hover': {
                                  bgcolor: formData.contactPreference === "email-me" ? '#0A1F8F' : '#f3f4f6'
                                }
                              }}>
                                <Box sx={{ 
                                  fontSize: 32, 
                                  color: formData.contactPreference === "email-me" ? 'white' : '#0A1F8F',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  ✉️
                                </Box>
                              </Box>
                              <Typography variant="body2" sx={{ 
                                color: formData.contactPreference === "email-me" ? '#0A1F8F' : '#6b7280',
                                fontWeight: 'medium',
                                fontSize: '0.75rem'
                              }}>
                                Email Me
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    )}

                    {/* Step 6: Final Step based on contact preference */}
                    {currentStep === 6 && (
                      <Box sx={{ space: 2 }}>
                        {formData.contactPreference === "schedule-call" ? (
                          // Schedule a Call - Date and Time Picker
                          <Box sx={{ space: 2 }}>
                            <Typography variant="h4" sx={{ 
                              fontWeight: 'bold', 
                              color: 'text.primary', 
                              mb: 3,
                              textAlign: 'center',
                              fontSize: '1.25rem'
                            }}>
                              Schedule Your Call
                            </Typography>
                            
                            <TextField
                              fullWidth
                              label="Preferred Date"
                              type="date"
                              size="small"
                              value={formData.scheduledDate}
                              onChange={(e) => handleInputChange("scheduledDate", e.target.value)}
                              InputLabelProps={{ shrink: true }}
                              sx={{ mb: 2 }}
                            />
                            
                            <TextField
                              fullWidth
                              label="Preferred Time"
                              type="time"
                              size="small"
                              value={formData.scheduledTime}
                              onChange={(e) => handleInputChange("scheduledTime", e.target.value)}
                              InputLabelProps={{ shrink: true }}
                              sx={{ mb: 2 }}
                            />

                            <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                              <InputLabel>Timezone</InputLabel>
                              <Select
                                value={formData.timezone}
                                onChange={(e) => handleInputChange("timezone", e.target.value)}
                                label="Timezone"
                              >
                                {usTimezones.map((tz) => (
                                  <MenuItem key={tz.value} value={tz.value}>
                                    {tz.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>

                            <Typography variant="body2" sx={{ 
                              color: 'text.secondary', 
                              fontSize: '0.875rem', 
                              lineHeight: 1.4,
                              mb: 3,
                              textAlign: 'center'
                            }}>
                              We'll call you at your preferred time. If you need to reschedule, please contact us at (888) 202-1350.
                            </Typography>
                            
                            <Button 
                              variant="contained"
                              onClick={handleSubmit}
                              disabled={isLoading}
                              endIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <ChevronRight />}
                              size="small"
                              sx={{ 
                                bgcolor: '#D14836',
                                '&:hover': { bgcolor: '#b91c1c' },
                                px: 3,
                                py: 1.5,
                                fontSize: '0.875rem',
                                fontWeight: 'bold',
                                borderRadius: 2
                              }}
                            >
                              {isLoading ? "Processing..." : "Schedule Call"}
                            </Button>
                          </Box>
                        ) : (
                          // Text Me or Email Me - Confirmation Message
                          <Box sx={{ space: 2, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ 
                              fontWeight: 'bold', 
                              color: 'text.primary', 
                              mb: 3,
                              fontSize: '1.25rem'
                            }}>
                              Thank You!
                            </Typography>
                            
                            <Typography variant="body1" sx={{ 
                              color: 'text.secondary', 
                              fontSize: '1rem', 
                              lineHeight: 1.6,
                              mb: 3
                            }}>
                              Our team will reach out to you soon via {formData.contactPreference === "text-me" ? "text message" : "email"}.
                            </Typography>

                            <Typography variant="body2" sx={{ 
                              color: 'text.secondary', 
                              fontSize: '0.875rem', 
                              lineHeight: 1.4,
                              mb: 3
                            }}>
                              If this is urgent, you can reach us directly at:
                            </Typography>

                            <Button 
                              variant="contained"
                              startIcon={<Phone />}
                              onClick={() => window.location.href = "tel:8882021350"}
                              sx={{ 
                                bgcolor: '#D14836',
                                '&:hover': { bgcolor: '#b91c1c' },
                                px: 3,
                                py: 1.5,
                                fontSize: '0.875rem',
                                fontWeight: 'bold',
                                borderRadius: 2
                              }}
                            >
                              Call Now: (888) 202-1350
                            </Button>
                          </Box>
                        )}
                      </Box>
                    )}

                    {/* Navigation Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                      <Button
                        variant="outlined"
                        onClick={prevStep}
                        disabled={currentStep === 1 || isLoading}
                        startIcon={<ChevronLeft />}
                        size="small"
                      >
                        Back
                      </Button>
                      
                      {currentStep < 5 ? (
                        <Button 
                          variant="contained" 
                          onClick={nextStep}
                          endIcon={<ChevronRight />}
                          size="small"
                          disabled={isLoading}
                          sx={{ 
                            bgcolor: '#E05C4B',
                            '&:hover': { bgcolor: '#d84315' }
                          }}
                        >
                          Next
                        </Button>
                      ) : currentStep === 5 ? (
                        <Button 
                          variant="contained" 
                          onClick={handleSubmit}
                          endIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <ChevronRight />}
                          size="small"
                          disabled={isLoading}
                          sx={{ 
                            bgcolor: '#E05C4B',
                            '&:hover': { bgcolor: '#d84315' }
                          }}
                        >
                          {isLoading ? "Processing..." : (formData.contactPreference === "call-now" ? "Call Now" : "Submit")}
                        </Button>
                      ) : currentStep === 6 && formData.contactPreference === "schedule-call" ? (
                        <Button 
                          variant="contained" 
                          onClick={handleSubmit}
                          endIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <ChevronRight />}
                          size="small"
                          disabled={isLoading}
                          sx={{ 
                            bgcolor: '#D14836',
                            '&:hover': { bgcolor: '#b91c1c' }
                          }}
                        >
                          {isLoading ? "Processing..." : "Schedule Call"}
                        </Button>
                      ) : null}
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </>
    
  )
}
