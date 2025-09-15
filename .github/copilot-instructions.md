# Cabinet Business Management System
Cabinet Business Management System is a static HTML/JavaScript web application for cabinet contractors and manufacturers. It provides comprehensive tools for client proposals, project estimation, CRM management, photo galleries, and administrative dashboards.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively
- **NEVER CANCEL**: No build process required - this is a static web application. All operations complete in seconds.
- Start local development server:
  - `cd /home/runner/work/cabinet-business-system/cabinet-business-system`
  - `python3 -m http.server 8000` -- starts instantly (1-2 seconds)
  - Access at `http://localhost:8000`
- Run JavaScript syntax validation:
  - `node -c config.js` -- validates instantly (<1 second)
  - `for js in *.js; do echo "Testing $js"; node -c "$js" && echo "✓ OK" || echo "✗ ERROR"; done` -- validates all JS files (<1 second)
- Test all HTML pages load correctly:
  - `curl -s -w "%{http_code}" http://localhost:8000/[page].html -o /dev/null` -- tests instantly (<1 second)

## Validation
- Always test complete user workflows after making changes to HTML/JavaScript files.
- **CRITICAL USER SCENARIOS**: Test these workflows to ensure functionality works:
  1. **Estimate Calculator Workflow**: Navigate to http://localhost:8000/interactive-estimate-calculator.html → Select room size → Choose style → Add features → Review estimate (should show calculated pricing)
  2. **Admin Dashboard**: Navigate to http://localhost:8000/admin-dashboard.html → Verify project data loads → Check quick actions work
  3. **Client Portal**: Navigate to http://localhost:8000/client-portal.html → Verify client interface loads properly
  4. **Photo Gallery**: Navigate to http://localhost:8000/multi-photo-gallery.html → Test image loading and gallery functionality
- **MANUAL VALIDATION REQUIREMENT**: Always complete at least the Estimate Calculator workflow end-to-end after making changes.
- Use browser automation tools (playwright) to test interactive elements and verify calculations work correctly.
- Always verify JavaScript console shows no errors during testing.

## Key System Components

### Configuration Files (CRITICAL)
- **`config.js`** - Main business configuration (company info, pricing, contact details)
- **`enhanced-config.js`** - Enhanced configuration for advanced features
- **`enhanced-config-phase3.js`** - Phase 3 configuration with full CRM integration
- **`production-config-template.js`** - Template for production deployments

### Core HTML Pages
- **`index.html`** - Main business hub and landing page (19KB)
- **`enhanced-client-proposal-phase3.html`** - Primary client-facing proposal system (67KB) - MOST IMPORTANT
- **`interactive-estimate-calculator.html`** - Real-time pricing calculator (53KB)
- **`admin-dashboard.html`** - Business management dashboard (49KB)
- **`client-portal.html`** - Client communication interface
- **`multi-photo-gallery.html`** - Professional project showcase (50KB)
- **`pdf-proposal-generator.html`** - PDF creation system (58KB)

### JavaScript Modules
- **`error-handling.js`** - Error management and user feedback
- **`mobile-optimization.js`** - Mobile responsiveness enhancements
- **`api-integration-manager.js`** - External API integration (EmailJS, Stripe)
- **`resource-loader.js`** - Dynamic resource loading
- **`navigation-system.js`** - Navigation menu system (⚠️ HAS ENCODING ISSUES - contains corrupted emoji characters)

## Common Tasks

### Testing Application Functionality
```bash
# Start development server
cd /home/runner/work/cabinet-business-system/cabinet-business-system
python3 -m http.server 8000 &

# Test main pages load (each takes <1 second)
curl -s -w "%{http_code}" http://localhost:8000/ -o /dev/null                    # Should return 200
curl -s -w "%{http_code}" http://localhost:8000/interactive-estimate-calculator.html -o /dev/null  # Should return 200
curl -s -w "%{http_code}" http://localhost:8000/admin-dashboard.html -o /dev/null                  # Should return 200

# Validate JavaScript syntax (each takes <1 second)
node -c config.js
node -c enhanced-config.js
node -c error-handling.js
```

### Configuration Updates
- Always update business information in `config.js` first
- Test configuration changes by loading main page and checking browser console
- Verify pricing calculations work in estimate calculator after config changes

### Troubleshooting
- **JavaScript Syntax Error in navigation-system.js**: File contains corrupted emoji characters. Only affects `enhanced-template.html`. Not critical for main functionality.
- **External Images Blocked**: Application references Unsplash images that may be blocked in some environments. Functionality works without them.
- **No Build Process**: This is correct - the application runs directly from HTML/JS files without compilation.

## File Structure Reference
```
/home/runner/work/cabinet-business-system/cabinet-business-system/
├── index.html                                    # Main business hub (19KB)
├── enhanced-client-proposal-phase3.html         # Primary proposal system (67KB) ⭐
├── interactive-estimate-calculator.html         # Pricing calculator (53KB) ⭐
├── admin-dashboard.html                         # Management dashboard (49KB) ⭐
├── client-portal.html                          # Client interface
├── multi-photo-gallery.html                   # Photo showcase (50KB)
├── pdf-proposal-generator.html                 # PDF generator (58KB)
├── config.js                                   # Main configuration ⭐
├── enhanced-config.js                          # Enhanced config
├── enhanced-config-phase3.js                  # Phase 3 config
├── error-handling.js                          # Error management
├── mobile-optimization.js                     # Mobile support
├── api-integration-manager.js                 # API integrations
├── resource-loader.js                         # Resource loading
├── navigation-system.js                       # Navigation (⚠️ has encoding issues)
├── favicon.ico                                # Site favicon
├── logo.svg                                   # Company logo
└── [Multiple documentation .md files]         # Deployment guides
```

## Deployment Information
- **Static Hosting**: Application can be deployed to any static web host (GitHub Pages, Netlify, Apache, Nginx)
- **No Server Required**: Runs entirely in browser - no backend dependencies
- **SSL Recommended**: Required for payment processing features (Stripe integration)
- **External Dependencies**: EmailJS for email notifications, Stripe for payments (both optional)

## Performance Notes
- **Page Load Times**: Main pages load in <1 second total
- **Server Startup**: Python HTTP server starts instantly (1-2 seconds)
- **No Build Time**: Zero build time - direct file serving

## Known Issues
1. **navigation-system.js**: Contains corrupted emoji characters causing syntax errors. Only affects `enhanced-template.html`. Not critical for main functionality.
2. **External Images**: Some Unsplash images may be blocked by ad blockers or firewalls. Application functions normally without them.
3. **README Encoding**: README.md is in UTF-16 format. Use `iconv -f UTF-16LE -t UTF-8 README.md` to read properly.

## Quick Validation Checklist
After making changes, always verify:
- [ ] JavaScript files pass syntax validation (`node -c [file].js`)
- [ ] Main page loads without console errors (`http://localhost:8000`)
- [ ] Estimate calculator completes full workflow with realistic pricing
- [ ] Admin dashboard displays project data correctly
- [ ] Configuration changes apply correctly to all pages