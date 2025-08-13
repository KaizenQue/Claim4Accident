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
  IconButton,
  Link
} from "@mui/material"
import { 
  Phone, 
  LocationOn, 
  Email,
  Send,
  Close
} from '@mui/icons-material'
import MainImg from '../img/bg.png'
import icon1 from '../img/1.svg'
import icon2 from '../img/2.svg'
import icon3 from '../img/3.svg'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
    consent: false
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    console.log("Contact form submitted:", formData)
    alert("Thank you! We'll get back to you soon.")
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
      consent: false
    })
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundImage: `url(${MainImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Overlay for better text readability */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1
      }} />

      {/* Contact Form - Centered */}
      <Box sx={{ 
        position: 'relative', 
        zIndex: 3,
        width: '100%',
        maxWidth: '500px',
        mx: 'auto',
        px: 2
      }}>
        <Card sx={{ 
          width: '100%', 
          bgcolor: 'white',
          boxShadow: 'none',
          border: 'none'
        }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold', 
              color: '#1e3a8a',
              mb: 1,
              textAlign: 'center'
            }}>
              Contact Us
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#64748b',
              textAlign: 'center',
              mb: 3
            }}>
              Send us a message and we'll get back to you
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
              label="Email"
              type="email"
              size="small"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
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

            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Subject</InputLabel>
              <Select
                value={formData.subject}
                label="Subject"
                onChange={(e) => handleInputChange("subject", e.target.value)}
              >
                <MenuItem value="general">General Inquiry</MenuItem>
                <MenuItem value="case-review">Case Review</MenuItem>
                <MenuItem value="legal-advice">Legal Advice</MenuItem>
                <MenuItem value="appointment">Schedule Appointment</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={4}
              size="small"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              sx={{ mb: 3 }}
            />

            {/* Consent Section */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => handleInputChange("consent", e.target.checked)}
                  style={{ marginTop: '4px' }}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem', lineHeight: 1.4 }}>
                  I agree to the{' '}
                  <Link href="#" sx={{ color: '#E05C4B', textDecoration: 'none', fontWeight: 'medium' }}>
                    Privacy policy
                  </Link>
                  {' '}and{' '}
                  <Link href="#" sx={{ color: '#E05C4B', textDecoration: 'none', fontWeight: 'medium' }}>
                    Terms of service
                  </Link>
                  {' '}and give my consent to be contacted regarding my inquiry.
                </Typography>
              </Box>
            </Box>

            <Button 
              variant="contained" 
              onClick={handleSubmit}
              fullWidth
              startIcon={<Send />}
              sx={{ 
                bgcolor: '#D14836',
                '&:hover': { bgcolor: '#b91c1c' },
                py: 1.5,
                fontSize: '0.875rem',
                fontWeight: 'bold',
                borderRadius: 2
              }}
            >
              Send Message
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
} 