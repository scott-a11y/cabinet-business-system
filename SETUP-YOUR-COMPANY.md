# 🏢 Setup Your Company Information

## ❗ IMPORTANT: Your Business Information Not Configured

Your cabinet business management system is currently showing **placeholder/template information** instead of your actual business details. This is why you're seeing "FOUNDRY CABINETS CO" and old contact information.

## 🔧 Step-by-Step Fix

### Step 1: Update Company Information in config.js

1. **Open the file:** `config.js`
2. **Find these lines and replace with your information:**

```javascript
// REPLACE THESE PLACEHOLDER VALUES:
companyName: '[YOUR COMPANY NAME]',           // Replace with: 'Your Actual Company Name'
companySubtitle: '[YOUR COMPANY SUBTITLE]',   // Replace with: 'Your Company Subtitle'
companyTagline: '[YOUR COMPANY TAGLINE]',     // Replace with: 'Your Company Tagline'
location: '[YOUR CITY, STATE]',               // Replace with: 'Your City, ST'
phone: '[YOUR PHONE NUMBER]',                 // Replace with: '(555) 555-5555'
email: '[YOUR EMAIL ADDRESS]',                // Replace with: 'your-email@yourcompany.com'
website: '[YOUR WEBSITE]',                    // Replace with: 'www.yourcompany.com'
```

**Example of what it should look like after you update it:**
```javascript
companyName: 'Smith Cabinet Works',
companySubtitle: 'Custom Kitchen Solutions', 
companyTagline: 'Craftsmanship You Can Trust',
location: 'Seattle, WA',
phone: '(206) 555-0123',
email: 'info@smithcabinets.com',
website: 'www.smithcabinets.com',
```

### Step 2: Replace Logo Files

You need to replace these **3 logo files** with your actual logo:

1. **`logo.svg`** - Main company logo (300x120px recommended)
2. **`logo-icon.svg`** - Square icon version (64x64px recommended)  
3. **`favicon.svg`** - Website favicon (32x32px recommended)

**Current files show:** "YOUR COMPANY LOGO HERE" placeholder
**You need:** Your actual business logo files

### Step 3: Update Logo File Names (if needed)

If your logo files have different names, update these lines in `config.js`:

```javascript
logo: 'your-actual-logo-filename.svg',        // Update filename
logoIcon: 'your-actual-icon-filename.svg',    // Update filename
```

### Step 4: Test Your Changes

1. **Open `test-config.html`** in your web browser
2. **Check the status table** - all items should show "Configured" in green
3. **Verify logos display** - should show your actual logos, not placeholders
4. **Test other pages** like `client-proposal.html` and `app-launcher.html`

## 🚨 Why This Happened

The system was set up as a **template** with placeholder information. The files need to be customized with your specific business details. The configuration system exists but wasn't properly personalized.

## ✅ What Gets Fixed

After completing these steps:
- ✅ Your actual company name appears everywhere
- ✅ Your real logo displays instead of placeholder  
- ✅ Your contact information shows correctly
- ✅ All pages use your branding consistently
- ✅ PDF proposals show your company details

## 🆘 Still Having Issues?

1. **Clear browser cache** (Ctrl+F5 or Cmd+Shift+R)
2. **Check JavaScript console** for error messages (F12 → Console tab)
3. **Verify file paths** - make sure logo files are in the root directory
4. **Check file permissions** - ensure files are readable by the web server

## 📋 Quick Checklist

- [ ] Updated `companyName` in config.js
- [ ] Updated `companySubtitle` in config.js  
- [ ] Updated `companyTagline` in config.js
- [ ] Updated `location` in config.js
- [ ] Updated `phone` in config.js
- [ ] Updated `email` in config.js
- [ ] Updated `website` in config.js
- [ ] Replaced `logo.svg` with your logo
- [ ] Replaced `logo-icon.svg` with your icon
- [ ] Replaced `favicon.svg` with your favicon
- [ ] Tested with `test-config.html`
- [ ] Verified pages display correctly

---

**Need Help?** This is a configuration issue, not a system bug. The template needs to be personalized with your business information.