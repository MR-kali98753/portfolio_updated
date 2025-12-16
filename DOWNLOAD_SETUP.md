# Download Files Setup Guide

## Issue
The CV and APK download buttons were not working when deployed to Vercel because the referenced files did not exist in the project.

## Solution Implemented

1. **Added Error Handling**: Updated the download functions to check if files exist before attempting to download them
2. **Graceful Fallback**: Added user-friendly alerts when files are not available
3. **Vercel Configuration**: Created `vercel.json` to properly serve static assets
4. **Directory Structure**: Created the missing `public/assets` directory

## How to Add Your Actual Files

### 1. Place Your Files
Add your actual CV and APK files to the `public/assets` directory:
```
public/
  assets/
    Abinas_Keshari_Singh_ATS_OnePage.docx
    application-f5c02e22-2deb-45d1-894f-065a2303dcab.apk
```

### 2. File Naming
Ensure the filenames match exactly what's referenced in the code:
- CV: `Abinas_Keshari_Singh_ATS_OnePage.docx`
- APK: `application-f5c02e22-2deb-45d1-894f-065a2303dcab.apk`

### 3. Deployment
When you deploy to Vercel, these files will be automatically served from the public directory.

## How It Works

The download functions now:
1. Check if the file exists using a fetch request
2. If the file exists, initiate the download
3. If the file doesn't exist, show a user-friendly alert with contact information
4. Handle network errors gracefully

## Testing Locally

To test locally:
1. Add your actual files to `public/assets/`
2. Run `npm run dev`
3. Click the download buttons

## For Production

When deploying to Vercel:
1. Make sure your files are in the `public/assets/` directory before building
2. Vercel will automatically serve files from the public directory
3. The `vercel.json` configuration ensures proper caching and headers for downloads

## Customization

If you want to use different filenames:
1. Update the filenames in `src/components/Hero.tsx` (lines 43 and 50)
2. Make sure your actual files match the new names
3. Update the `vercel.json` if you change the assets directory structure