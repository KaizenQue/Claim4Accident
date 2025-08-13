# GoDaddy Subpath Routing Troubleshooting Guide

## Current Issue
- Home page (`/`) works ✅
- Subpaths like `/California` return 404 ❌

## Immediate Steps to Try

### 1. Rebuild and Re-upload
```bash
npm run build
```
Upload the ENTIRE contents of the `build/` folder to GoDaddy.

### 2. Verify File Locations
Ensure these files are in your GoDaddy hosting root directory:
- `index.html`
- `.htaccess` (with the dot!)
- `web.config`
- `_redirects`
- All other build files

### 3. Test .htaccess File
Try accessing `http://claim4accidents.com/.htaccess` in your browser.
- If you see the file contents: Good, the file is being served
- If you get a 404: The file isn't in the right location
- If you get "Forbidden": File permissions issue

## Alternative .htaccess Configurations

### Option 1: Basic (Current)
```apache
Options +FollowSymLinks
RewriteEngine On

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]
```

### Option 2: With RewriteBase
```apache
Options +FollowSymLinks
RewriteEngine On
RewriteBase /

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]
```

### Option 3: Minimal
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## GoDaddy-Specific Issues

### 1. Check Hosting Plan
- **Basic Hosting**: May not support .htaccess
- **Deluxe/Premium**: Should support .htaccess
- **Business**: Should support .htaccess

### 2. Enable mod_rewrite
Contact GoDaddy support and ask them to:
- Enable Apache mod_rewrite module
- Confirm .htaccess files are supported
- Check if there are any server-level restrictions

### 3. File Manager Issues
- Use GoDaddy's File Manager (not FTP)
- Enable "Show Hidden Files"
- Ensure .htaccess is uploaded as plain text

## Testing Steps

### 1. Test .htaccess Recognition
Create a test .htaccess file:
```apache
# Test file
RewriteEngine On
RewriteRule ^test$ /index.html [L]
```
Then visit `http://claim4accidents.com/test` - if it works, .htaccess is working.

### 2. Check Server Response
Use browser dev tools (F12) → Network tab:
- Visit `/California`
- Check the response status code
- Look for any server error messages

### 3. Test with Different Browser
Try accessing `/California` in:
- Incognito/Private mode
- Different browser
- Mobile browser

## If Nothing Works

### 1. Contact GoDaddy Support
Ask them specifically:
- "Does my hosting plan support .htaccess files?"
- "Is Apache mod_rewrite enabled?"
- "Are there any server restrictions on URL rewriting?"

### 2. Consider Alternative Hosting
If GoDaddy doesn't support .htaccess:
- Netlify (free)
- Vercel (free)
- GitHub Pages (free)
- AWS S3 + CloudFront

### 3. Use Hash Router (Last Resort)
Change your React Router from Browser Router to Hash Router:
```javascript
import { createHashRouter } from 'react-router-dom';

const router = createHashRouter([
  // your routes
]);
```
This will make URLs like `/#/California` instead of `/California`.

## File Upload Checklist

✅ `index.html` - in root directory  
✅ `.htaccess` - in root directory (with dot)  
✅ `web.config` - in root directory  
✅ `_redirects` - in root directory  
✅ All static assets uploaded  
✅ File permissions set correctly  

## Common Mistakes

❌ Uploading files to wrong directory  
❌ .htaccess without the dot  
❌ Wrong file permissions  
❌ Using FTP instead of File Manager  
❌ Not clearing browser cache  
❌ Uploading .htaccess as document instead of text  

## Next Steps

1. **Rebuild your app** with `npm run build`
2. **Upload ALL files** from build folder to GoDaddy root
3. **Test each route** systematically
4. **Contact GoDaddy support** if still not working
5. **Consider alternative hosting** if GoDaddy doesn't support .htaccess 