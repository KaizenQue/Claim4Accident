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
  Link
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

export default function LegalLandingPage() {
  const [showForm, setShowForm] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [hoveredState, setHoveredState] = useState(null)
  const [formData, setFormData] = useState({
    // Step 1
    accidentType: "",
    injuryLevel: "",
    // Step 2
    whoWasInAccident: "",
    whoWasAtFault: "",
    // Step 3
    fullName: "",
    phoneNumber: "",
    email: "",
    consent: false
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    alert("Thank you! We'll contact you soon.")
    setShowForm(false)
    setCurrentStep(1)
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
    { number: "700+", label: "Fatalities on I-5", icon: TrendingUp },
    { number: "12K+", label: "Injuries on I-5", icon: Description },
    { number: "62", label: "Fatalities on SR-99", icon: LocationOn },
    { number: "1.1K", label: "Injuries on SR-99", icon: People }
  ]

  const steps = ['Accident Type & Injury', 'Accident Details', 'Contact Information']

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3730a3 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
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
        zIndex: 1 
      }}>
        <Grid container spacing={0} sx={{ minHeight: '100vh', alignItems: 'center' }}>
          {/* Left Content */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ 
              position: 'relative',
              height: '100vh',
              backgroundImage: showForm ? 
                (currentStep === 1 ? 'url("https://images.unsplash.com/photo-1589820296150-3f9deaa7b7bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")' :
                currentStep === 2 ? 'url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80")' :
                'url("https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80")') :
                'url("https://images.unsplash.com/photo-1589820296150-3f9deaa7b7bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(30, 58, 138, 0.8)',
                zIndex: 1
              }
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
                      fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.5rem' },
                      lineHeight: 1.2
                    }}>
                      Injured In A Motor Vehicle Accident?
                      <Box component="span" sx={{ color: '#bfdbfe', display: 'block', mt: 1 }}>
                        You Focus On Healing, We'll Handle The Fight.
                      </Box>
                    </Typography>
                    
                    <Typography variant="body1" sx={{ 
                      color: '#dbeafe', 
                      mb: 3,
                      maxWidth: '500px',
                      fontSize: '1rem',
                      lineHeight: 1.6
                    }}>
                      We Fight Insurance Companies And Negligent Drivers So You Can
                      Recover With No Fees Unless We Win.
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
                      <Button 
                        variant="contained"
                        onClick={() => setShowForm(true)}
                        sx={{ 
                          bgcolor: '#dc2626',
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
                        Call Now: (888) 202-1350
                      </Button>
                    </Box>

                    {/* Stats Section */}
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h4" sx={{ 
                        color: 'white', 
                        mb: 2,
                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                        fontWeight: 'bold'
                      }}>
                        California <Box component="span" sx={{ color: '#f87171' }}>Accident Statistics</Box>
                      </Typography>
                      
                      <Grid container spacing={2}>
                        {stats.map((stat, index) => {
                          const IconComponent = stat.icon
                          return (
                            <Grid item xs={6} md={3} key={index}>
                              <Paper sx={{ 
                                bgcolor: 'rgba(255,255,255,0.1)', 
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                p: 2,
                                textAlign: 'center',
                                height: '120px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                                transition: 'all 0.3s'
                              }}>
                                <IconComponent sx={{ color: '#93c5fd', fontSize: 24, mb: 1 }} />
                                <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5, fontSize: '1.25rem' }}>
                                  {stat.number}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#bfdbfe', fontSize: '0.75rem' }}>
                                  {stat.label}
                                </Typography>
                              </Paper>
                            </Grid>
                          )
                        })}
                      </Grid>
                    </Box>
                  </>
                ) : (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ 
                      color: 'white', 
                      fontWeight: 'bold', 
                      mb: 2,
                      fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.5rem' },
                      lineHeight: 1.2
                    }}>
                      {currentStep === 1 ? "Accident Type & Injury" :
                       currentStep === 2 ? "Accident Details" :
                       "Contact Information"}
                    </Typography>
                    
                    <Typography variant="body1" sx={{ 
                      color: '#dbeafe', 
                      mb: 3,
                      maxWidth: '500px',
                      fontSize: '1rem',
                      lineHeight: 1.6
                    }}>
                      {currentStep === 1 ? "Tell us about your accident type and injury level" :
                       currentStep === 2 ? "Help us understand who was involved and at fault" :
                       "Let's get your contact information to start your case review"}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Right Content - Map or Form */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ 
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: showForm ? 'white' : 'rgba(30, 58, 138, 0.8)',
              backdropFilter: 'blur(10px)'
            }}>
              {!showForm ? (
                <Box sx={{ 
                  position: 'relative', 
                  width: '100%', 
                  maxWidth: '500px',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 3,
                  p: 2
                }}>
                  <Box sx={{ 
                    width: '100%', 
                    height: { xs: '300px', sm: '400px', md: '450px' },
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: 'rgba(255,255,255,0.05)'
                  }}>
                    <Map highlightOnHover={true} />
                  </Box>
                </Box>
              ) : (
                <Card sx={{ 
                  width: '100%', 
                  maxWidth: '500px',
                  bgcolor: 'transparent',
                  boxShadow: 'none',
                  border: 'none'
                }}>
                  <CardContent sx={{ p: 3 }}>
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
                          fontSize: '1.25rem'
                        }}>
                          A <Box component="span" sx={{ color: '#E05C4B' }}>Few Seconds</Box> Is All It Takes To See If You Have A Valid Case
                        </Typography>
                        
                        {/* Accident Type Section */}
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 'bold', 
                            color: 'text.primary', 
                            mb: 2,
                            textAlign: 'center'
                          }}>
                            What Type Of Accident?
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Card 
                                onClick={() => handleInputChange("accidentType", "car")}
                                sx={{ 
                                  cursor: 'pointer',
                                  border: formData.accidentType === "car" ? '2px solid #1e40af' : '1px solid #e5e7eb',
                                  bgcolor: formData.accidentType === "car" ? '#1e40af' : '#f9fafb',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    borderColor: '#1e40af',
                                    bgcolor: formData.accidentType === "car" ? '#1e40af' : '#f3f4f6'
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
                                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
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
                                  border: formData.accidentType === "truck" ? '2px solid #1e40af' : '1px solid #e5e7eb',
                                  bgcolor: formData.accidentType === "truck" ? '#1e40af' : '#f9fafb',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    borderColor: '#1e40af',
                                    bgcolor: formData.accidentType === "truck" ? '#1e40af' : '#f3f4f6'
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
                                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
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
                            textAlign: 'center'
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
                                  borderRadius: '50%',
                                  bgcolor: formData.injuryLevel === "mild" ? '#1e40af' : '#e5e7eb',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1,
                                  border: formData.injuryLevel === "mild" ? '2px solid #1e40af' : '1px solid #d1d5db',
                                  '&:hover': {
                                    bgcolor: formData.injuryLevel === "mild" ? '#1e40af' : '#f3f4f6'
                                  }
                                }}>
                                  <Typography variant="h4" sx={{ 
                                    color: formData.injuryLevel === "mild" ? 'white' : '#9ca3af'
                                  }}>
                                    😷
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: formData.injuryLevel === "mild" ? '#1e40af' : '#6b7280',
                                  fontWeight: 'medium'
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
                                  borderRadius: '50%',
                                  bgcolor: formData.injuryLevel === "serious" ? '#1e40af' : '#e5e7eb',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1,
                                  border: formData.injuryLevel === "serious" ? '2px solid #1e40af' : '1px solid #d1d5db',
                                  '&:hover': {
                                    bgcolor: formData.injuryLevel === "serious" ? '#1e40af' : '#f3f4f6'
                                  }
                                }}>
                                  <Typography variant="h4" sx={{ 
                                    color: formData.injuryLevel === "serious" ? 'white' : '#9ca3af'
                                  }}>
                                    😱
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: formData.injuryLevel === "serious" ? '#1e40af' : '#6b7280',
                                  fontWeight: 'medium'
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
                                  borderRadius: '50%',
                                  bgcolor: formData.injuryLevel === "death" ? '#1e40af' : '#e5e7eb',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1,
                                  border: formData.injuryLevel === "death" ? '2px solid #1e40af' : '1px solid #d1d5db',
                                  '&:hover': {
                                    bgcolor: formData.injuryLevel === "death" ? '#1e40af' : '#f3f4f6'
                                  }
                                }}>
                                  <Typography variant="h4" sx={{ 
                                    color: formData.injuryLevel === "death" ? 'white' : '#9ca3af'
                                  }}>
                                    💀
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: formData.injuryLevel === "death" ? '#1e40af' : '#6b7280',
                                  fontWeight: 'medium'
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
                          fontSize: '1.25rem'
                        }}>
                          A <Box component="span" sx={{ color: '#E05C4B' }}>Few Seconds</Box> Is All It Takes To See If You Have A Valid Case
                        </Typography>
                        
                        {/* Who Was In The Accident Section */}
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 'bold', 
                            color: 'text.primary', 
                            mb: 2,
                            textAlign: 'center'
                          }}>
                            Who Was In The Accident?
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Card 
                                onClick={() => handleInputChange("whoWasInAccident", "me")}
                                sx={{ 
                                  cursor: 'pointer',
                                  border: formData.whoWasInAccident === "me" ? '2px solid #1e40af' : '1px solid #e5e7eb',
                                  bgcolor: formData.whoWasInAccident === "me" ? '#1e40af' : '#f9fafb',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    borderColor: '#1e40af',
                                    bgcolor: formData.whoWasInAccident === "me" ? '#1e40af' : '#f3f4f6'
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
                                      border: formData.whoWasInAccident === "me" ? '1px solid #1e40af' : 'none'
                                    }}>
                                      <Typography variant="body2" sx={{ 
                                        color: formData.whoWasInAccident === "me" ? '#1e40af' : 'transparent',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold'
                                      }}>
                                        ✓
                                      </Typography>
                                    </Box>
                                  </Box>
                                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                    I was in the accident
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={6}>
                              <Card 
                                onClick={() => handleInputChange("whoWasInAccident", "caretaker")}
                                sx={{ 
                                  cursor: 'pointer',
                                  border: formData.whoWasInAccident === "caretaker" ? '2px solid #1e40af' : '1px solid #e5e7eb',
                                  bgcolor: formData.whoWasInAccident === "caretaker" ? '#1e40af' : '#f9fafb',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    borderColor: '#1e40af',
                                    bgcolor: formData.whoWasInAccident === "caretaker" ? '#1e40af' : '#f3f4f6'
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
                                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
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
                            textAlign: 'center'
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
                                  bgcolor: formData.whoWasAtFault === "injured" ? '#1e40af' : '#e5e7eb',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1,
                                  border: formData.whoWasAtFault === "injured" ? '2px solid #1e40af' : '1px solid #d1d5db',
                                  '&:hover': {
                                    bgcolor: formData.whoWasAtFault === "injured" ? '#1e40af' : '#f3f4f6'
                                  }
                                }}>
                                  <Typography variant="h4" sx={{ 
                                    color: formData.whoWasAtFault === "injured" ? 'white' : '#9ca3af'
                                  }}>
                                    🤕
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: formData.whoWasAtFault === "injured" ? '#1e40af' : '#6b7280',
                                  fontWeight: 'medium'
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
                                  bgcolor: formData.whoWasAtFault === "someone-else" ? '#1e40af' : '#e5e7eb',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1,
                                  border: formData.whoWasAtFault === "someone-else" ? '2px solid #1e40af' : '1px solid #d1d5db',
                                  '&:hover': {
                                    bgcolor: formData.whoWasAtFault === "someone-else" ? '#1e40af' : '#f3f4f6'
                                  }
                                }}>
                                  <Typography variant="h4" sx={{ 
                                    color: formData.whoWasAtFault === "someone-else" ? 'white' : '#9ca3af'
                                  }}>
                                    😱
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: formData.whoWasAtFault === "someone-else" ? '#1e40af' : '#6b7280',
                                  fontWeight: 'medium'
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
                                  bgcolor: formData.whoWasAtFault === "dont-know" ? '#1e40af' : '#e5e7eb',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1,
                                  border: formData.whoWasAtFault === "dont-know" ? '2px solid #1e40af' : '1px solid #d1d5db',
                                  '&:hover': {
                                    bgcolor: formData.whoWasAtFault === "dont-know" ? '#1e40af' : '#f3f4f6'
                                  }
                                }}>
                                  <Typography variant="h4" sx={{ 
                                    color: formData.whoWasAtFault === "dont-know" ? 'white' : '#9ca3af'
                                  }}>
                                    😵
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: formData.whoWasAtFault === "dont-know" ? '#1e40af' : '#6b7280',
                                  fontWeight: 'medium'
                                }}>
                                  I don't Know
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    )}

                    {/* Step 3: Contact Information */}
                    {currentStep === 3 && (
                      <Box sx={{ space: 2 }}>
                        <Typography variant="h4" sx={{ 
                          fontWeight: 'bold', 
                          color: 'text.primary', 
                          mb: 3,
                          textAlign: 'center'
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
                          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
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

                    {/* Navigation Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                      <Button
                        variant="outlined"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        startIcon={<ChevronLeft />}
                        size="small"
                      >
                        Back
                      </Button>
                      
                      {currentStep < 3 ? (
                        <Button 
                          variant="contained" 
                          onClick={nextStep}
                          endIcon={<ChevronRight />}
                          size="small"
                          sx={{ 
                            bgcolor: '#E05C4B',
                            '&:hover': { bgcolor: '#d84315' }
                          }}
                        >
                          Next
                        </Button>
                      ) : (
                        <Button 
                          variant="contained" 
                          onClick={handleSubmit}
                          endIcon={<ChevronRight />}
                          size="small"
                          sx={{ 
                            bgcolor: '#1e40af',
                            '&:hover': { bgcolor: '#1e3a8a' }
                          }}
                        >
                          Start My Case Review
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
