# Cabinet Business Management System

This is a complete web-based cabinet business management system built with HTML, CSS, and JavaScript. The system includes estimate calculators, admin dashboards, client portals, photo galleries, and proposal generators for Foundry Cabinets Co.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

- Bootstrap and run the application:
  - `cd /home/runner/work/cabinet-business-system/cabinet-business-system`
  - `python3 -m http.server 8080` -- starts INSTANTLY (< 2 seconds). NEVER CANCEL.
  - Access at `http://localhost:8080/index.html`
  - No build process required - pure HTML/CSS/JavaScript

- Validate functionality:
  - `curl -I http://localhost:8080/` -- confirms server is running
  - Always test complete user workflows after making changes
  - Server startup is INSTANT - no timeouts needed

- Stop the server:
  - `pkill -f "python3 -m http.server"` or `Ctrl+C`

## Validation Scenarios

ALWAYS run through at least one complete end-to-end scenario after making changes:

### Primary Validation: Complete Estimate Workflow
1. Start server: `python3 -m http.server 8080`
2. Navigate to `http://localhost:8080/index.html`
3. Click "Start Your Estimate" button
4. Complete all 4 steps of estimate calculator:
   - Step 1: Select room size (e.g., "Large Kitchen")
   - Step 2: Choose style (e.g., "Premium Collection") 
   - Step 3: Select features (optional add-ons)
   - Step 4: View final estimate and contact form
5. Verify estimate calculations work correctly (should show dollar amounts)
6. Test navigation between all system components

### Secondary Validation: Admin Functions
1. Navigate to Admin Dashboard via navigation menu
2. Verify project data displays correctly
3. Test Photo Gallery via quick actions
4. Confirm all navigation links work
5. Check console for JavaScript errors

### Configuration Validation
- Test business configuration switching (if applicable)
- Verify contact information displays correctly
- Check branding and styling consistency
- Confirm pricing calculations are accurate

## Key System Components

### Main Files
- `index.html` - Business Hub main page
- `interactive-estimate-calculator.html` - Client-facing estimate tool
- `admin-dashboard.html` - Project management interface
- `client-proposal.html` - Proposal presentation system
- `multi-photo-gallery.html` - Portfolio showcase
- `config.js` - Central configuration system
- `enhanced-config-phase3.js` - Advanced CRM configuration

### Configuration System
- All business settings in `config.js` and `enhanced-config-phase3.js`
- Self-contained pages with embedded configurations
- No external dependencies - works offline and online
- Browser-compatible (Chrome, Firefox, Safari, Edge)

### Navigation Structure
- Navigation menu available on all pages
- Consistent branding and styling
- Mobile-optimized responsive design
- Fast page transitions (no loading delays)

## Common Tasks

### Making Changes
- Edit HTML files directly - no build process required
- Update configurations in `config.js` or `enhanced-config-phase3.js`
- Test immediately by refreshing browser
- Always validate complete user workflows

### Debugging
- Check browser console for JavaScript errors
- Use browser developer tools for styling issues
- Test in multiple browsers for compatibility
- Verify all navigation links work correctly

### Adding Features
- Follow existing code patterns and structure
- Maintain consistent styling with CSS variables
- Ensure mobile responsiveness
- Update navigation menus as needed

## File Structure Reference

```
/
├── index.html                              # Main business hub
├── admin-dashboard.html                    # Admin interface
├── interactive-estimate-calculator.html    # Estimate calculator
├── client-proposal.html                    # Proposal generator
├── multi-photo-gallery.html              # Photo portfolio
├── config.js                             # Base configuration
├── enhanced-config-phase3.js             # Advanced CRM config
├── go-live-setup.html                    # Setup wizard
├── README.md                             # Project documentation
└── .github/
    └── copilot-instructions.md           # This file
```

## Performance & Timing

- **Server startup**: INSTANT (< 2 seconds)
- **Page loading**: INSTANT (< 1 second per page)
- **Navigation**: INSTANT (no build delays)
- **No timeouts needed** - all operations complete immediately

## Testing Requirements

- **ALWAYS** run complete estimate workflow validation
- **ALWAYS** test admin dashboard functionality  
- **ALWAYS** verify navigation between all components
- **ALWAYS** check browser console for errors
- Test on mobile devices when making UI changes
- Verify pricing calculations are accurate

## Known Issues & Limitations

- External images (Unsplash) may be blocked by ad blockers (expected, not a bug)
- System is designed for modern browsers (Chrome, Firefox, Safari, Edge)
- No database backend - uses localStorage for client-side persistence
- Requires HTTP server (cannot run via file:// protocol for full functionality)

## Security & Deployment

- Self-contained system with no external dependencies
- Client-side processing keeps data secure
- No database required - uses local storage
- Ready for deployment to any web server
- SSL recommended for production use

## Troubleshooting

If functionality doesn't work:
1. Check server is running: `curl -I http://localhost:8080/`
2. Check browser console for JavaScript errors
3. Verify all files are present in repository
4. Test with different browser (incognito mode)
5. Restart server if needed

The system is designed to "just work" - if it doesn't, check the basics first.