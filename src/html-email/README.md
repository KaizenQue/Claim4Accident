# EmailJS Setup for Stepper Forms

This folder contains HTML email templates for the motor vehicle accident case review stepper forms.

## Files

### 1. `stepper-form-template.html`
- **Purpose**: Admin notification email template
- **Used for**: Sending detailed case review submissions to administrators
- **Features**:
  - Professional design with gradient header
  - Organized sections for accident information, contact details, and technical data
  - Clear next steps section for follow-up
  - Responsive design

### 2. `confirmation-template.html`
- **Purpose**: User confirmation email template
- **Used for**: Sending confirmation emails to users after form submission
- **Features**:
  - Thank you message with user's name
  - Clear next steps explanation
  - Contact information for immediate assistance
  - Professional styling with call-to-action buttons

## EmailJS Template Variables

### Admin Template Variables
- `{{full_name}}` - User's full name
- `{{phone_number}}` - User's phone number
- `{{email}}` - User's email address
- `{{accident_type}}` - Type of accident (Car/Pickup Truck)
- `{{injury_level}}` - Level of injury (Mild Injury/Serious Injury/Death)
- `{{who_was_in_accident}}` - Who was involved in the accident
- `{{who_was_at_fault}}` - Who was at fault
- `{{consent_given}}` - Whether consent was given (Yes/No)
- `{{ip_address}}` - User's IP address
- `{{page_source}}` - Source URL
- `{{page_path}}` - Current page path (e.g., /california, /nevada, /colorado)
- `{{full_page_url}}` - Complete page URL with path
- `{{page_type}}` - Page type identifier (e.g., "California Landing Page")
- `{{submission_date}}` - Date of submission
- `{{submission_time}}` - Time of submission

### Confirmation Template Variables
- `{{full_name}}` - User's full name
- `{{submission_date}}` - Date of submission
- `{{submission_time}}` - Time of submission

## EmailJS Service Setup

### Required EmailJS Templates

1. **Admin Notification Template** (`template_mnhb9lx`)
   - Service ID: `service_k1vzny9`
   - Template ID: `template_mnhb9lx`
   - Use HTML content from `stepper-form-template.html`

2. **User Confirmation Template** (`template_ex2ix8w`)
   - Service ID: `service_k1vzny9`
   - Template ID: `template_ex2ix8w`
   - Use HTML content from `confirmation-template.html`

### EmailJS Configuration

```javascript
// Initialize EmailJS
emailjs.init("DyDZ85E9uwzwSyUoD");

// Service ID
const SERVICE_ID = "service_k1vzny9";

// Template IDs
const ADMIN_TEMPLATE_ID = "template_mnhb9lx";
const CONFIRMATION_TEMPLATE_ID = "template_ex2ix8w";
```

## Implementation

### 1. Landing Page Integration
All three landing pages (`LandingPage.js`, `LandingPage2.js`, `LandingPage3.js`) now include:

```javascript
import { sendStepperFormEmail } from './emailService'

const handleSubmit = async () => {
  try {
    const emailResult = await sendStepperFormEmail(formData, "Page Type")
    if (emailResult.success) {
      // Handle success
    }
  } catch (error) {
    // Handle error
  }
}
```

### 2. Email Service Functions

The `emailService.js` file includes two new functions:

- `sendStepperFormEmail()` - Sends admin notification and user confirmation
- `sendStepperFormEmailWithHTML()` - Alternative with HTML template support

### 3. Form Data Structure

```javascript
const formData = {
  accidentType: "car" | "truck",
  injuryLevel: "mild" | "serious" | "death",
  whoWasInAccident: "me" | "caretaker",
  whoWasAtFault: "injured" | "someone-else" | "dont-know",
  fullName: "string",
  phoneNumber: "string",
  email: "string",
  consent: boolean
}
```

## Setup Instructions

### 1. EmailJS Dashboard Setup
1. Log into EmailJS dashboard
2. Create new email template for admin notifications
3. Copy HTML content from `stepper-form-template.html`
4. Set template variables as listed above
5. Note the template ID for use in the code

### 2. Template Variables Mapping
Ensure all template variables in the HTML templates match the variables sent from the JavaScript code.

### 3. Testing
1. Test form submission on each landing page
2. Verify admin notification emails are received
3. Verify user confirmation emails are sent (if email provided)
4. Check email formatting and styling

## Customization

### Styling
- Modify CSS in HTML templates to match brand colors
- Update gradient colors in header sections
- Adjust spacing and typography as needed

### Content
- Update contact information and phone numbers
- Modify legal disclaimers and terms
- Customize next steps and call-to-action text

### Functionality
- Add additional form fields as needed
- Modify email templates to include new data
- Update template variables accordingly

## Troubleshooting

### Common Issues
1. **Emails not sending**: Check EmailJS service and template IDs
2. **Template variables not showing**: Verify variable names match exactly
3. **Styling issues**: Test in different email clients
4. **Form data not captured**: Check form validation and data structure

### Debug Steps
1. Check browser console for JavaScript errors
2. Verify EmailJS initialization
3. Test with console.log statements
4. Check EmailJS dashboard for delivery status 