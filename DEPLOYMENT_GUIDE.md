# GoDaddy Deployment Guide for React Router App

## The Problem
When you deploy a React Router app to GoDaddy shared hosting, you get 404 errors on subpaths because:
1. React Router handles client-side routing
2. GoDaddy's server doesn't know about your React routes
3. The server tries to find actual files/directories for routes like `/legal`, `/Nevada`, etc.

## Solution
We need to configure the server to redirect all requests to `index.html`, letting React Router handle the routing.

## Steps to Deploy

### 1. Build Your App
```bash
npm run build
```

### 2. Upload Files to GoDaddy
Upload the **entire contents** of the `build/` folder to your GoDaddy hosting root directory (usually `public_html/` or `htdocs/`).

### 3. Ensure .htaccess is in Root Directory
The `.htaccess` file must be in your hosting root directory (same level as `index.html`).

### 4. Verify .htaccess Content
Your `.htaccess` file should contain:
```apache
# Enable URL rewriting
RewriteEngine On

# Handle client-side routing - redirect all requests to index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]

# Alternative approach - try both methods
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Fallback for servers that don't support mod_rewrite
<IfModule !mod_rewrite.c>
    ErrorDocument 404 /index.html
</IfModule>
```

### 5. Test Your Routes
After deployment, test these routes:
- `/` (home page)
- `/legal`
- `/Nevada`
- `/California`
- `/Colorado`
- `/contactus`
- `/Disclaimer`
- `/PrivacyPolicy`

## What the .htaccess Does

1. **`RewriteEngine On`** - Enables URL rewriting
2. **`RewriteCond %{REQUEST_FILENAME} !-f`** - Don't rewrite if the request is for an existing file
3. **`RewriteCond %{REQUEST_FILENAME} !-d`** - Don't rewrite if the request is for an existing directory
4. **`RewriteRule ^ index.html [QSA,L]`** - Redirect all other requests to index.html
5. **`RewriteBase /`** - Sets the base URL for rewriting
6. **`ErrorDocument 404 /index.html`** - Fallback for servers without mod_rewrite

## Troubleshooting

### Still Getting 404 Errors?
1. **Check .htaccess location**: Must be in the same directory as `index.html`
2. **Verify file permissions**: .htaccess should be readable by the web server
3. **Check GoDaddy settings**: Ensure Apache mod_rewrite is enabled
4. **Clear browser cache**: Hard refresh (Ctrl+F5) or clear cache

### GoDaddy Specific Issues
1. **File Manager**: Use GoDaddy's File Manager to upload files
2. **Hidden Files**: .htaccess might be hidden - enable "Show Hidden Files" in File Manager
3. **Support**: Contact GoDaddy support if mod_rewrite is not enabled

### Alternative Solution (if .htaccess doesn't work)
If .htaccess doesn't work, you can also try creating a `web.config` file for IIS compatibility:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Router" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

## Final Notes
- Always test your routes after deployment
- Keep a backup of your working .htaccess file
- If you make changes to your React app, rebuild and re-upload the entire build folder
- The .htaccess file must be uploaded as a plain text file, not as a document 