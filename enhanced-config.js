// ðŸ›¡ï¸ BULLETPROOF CONFIGURATION SYSTEM v2.0
// Enhanced error handling, fallbacks, and validation

// ðŸš¨ CONFIGURATION LOADING STATUS TRACKER
window.CONFIG_STATUS = {
    loaded: false,
    error: null,
    attempts: 0,
    fallbackUsed: false
};

// ðŸ"§ FALLBACK CONFIGURATION (if main config fails)
window.FALLBACK_CONFIG = {
    // Default Foundry Cabinets Configuration
    companyName: 'Foundry Cabinets Co',
    companySubtitle: 'by District Design Build, LLC',
    companyTagline: 'Driven by Precision. Evolved by Design.',
    logo: 'ðŸªµ',
    logoType: 'emoji',
    
    // Contact Information
    location: 'Portland, OR',
    phone: '360-606-1106',
    email: 'scott@ddbteam.com',
    website: 'www.ddb503.com',
    
    // Visual Theme
    primaryColor: '#D4B062',
    secondaryColor: '#F4E4A1',
    accentColor: '#C5A055',
    
    // Business Features
    warranty: '5-year comprehensive coverage',
    timeline: '4-6 weeks from approval',
    onTimeRate: '92%',
    satisfactionRate: '98%',
    experience: '15+ years',
    projectsCompleted: '150+',
    
    // Market Validated Pricing (Portland)
    pricing: {
        economy: { min: 800, max: 1200, avg: 965, name: 'Economy', description: 'Quality basics with solid construction' },
        standard: { min: 1000, max: 1500, avg: 1225, name: 'Standard', description: 'Enhanced features with premium materials' },
        premium: { min: 1400, max: 1900, avg: 1630, name: 'Premium', description: 'Luxury details with custom options' },
        luxury: { min: 1900, max: 2600, avg: 2250, name: 'Luxury', description: 'Ultimate craftsmanship with bespoke design' }
    },
    
    // Add-on Features and Pricing
    features: {
        softCloseHinges: { price: 150, name: 'Soft-Close Hinges', description: 'Quiet, smooth operation' },
        underCabinetLighting: { price: 300, name: 'Under-Cabinet LED Lighting', description: 'Energy-efficient task lighting' },
        pullOutShelves: { price: 200, name: 'Pull-Out Shelves', description: 'Maximize storage accessibility' },
        lazysSusan: { price: 250, name: 'Lazy Susan Corner Solution', description: 'Efficient corner storage' },
        customCrownMolding: { price: 400, name: 'Custom Crown Molding', description: 'Elegant finishing touch' },
        glassInserts: { price: 180, name: 'Glass Door Inserts', description: 'Sophisticated display options' }
    },
    
    // Client Specific (can be overridden)
    clientName: 'Valued Client',
    projectName: 'Kitchen Transformation',
    welcomeTitle: 'Your Custom Cabinet Estimate',
    welcomeMessage: 'Thank you for choosing our services for your home transformation. We have carefully crafted this estimate based on your specific needs and our commitment to exceptional quality and craftsmanship.'
};

// ðŸ"„ BUSINESS CONFIGURATIONS
window.BUSINESS_CONFIGS = {
    foundry_cabinets: {
        ...window.FALLBACK_CONFIG,
        id: 'foundry_cabinets',
        companyName: 'Foundry Cabinets Co',
        companySubtitle: 'by District Design Build, LLC',
        companyTagline: 'Driven by Precision. Evolved by Design.',
        logo: 'ðŸªµ',
        primaryColor: '#D4B062',
        pricing: {
            economy: { min: 800, max: 1200, avg: 965, name: 'Economy' },
            standard: { min: 1000, max: 1500, avg: 1225, name: 'Standard' },
            premium: { min: 1400, max: 1900, avg: 1630, name: 'Premium' },
            luxury: { min: 1900, max: 2600, avg: 2250, name: 'Luxury' }
        }
    },
    
    seattle_cabinets: {
        ...window.FALLBACK_CONFIG,
        id: 'seattle_cabinets',
        companyName: 'Seattle Premium Cabinets',
        companySubtitle: 'Pacific Northwest Excellence',
        companyTagline: 'Crafting Seattle Homes Since 2010',
        logo: 'ðŸ"ï¸',
        primaryColor: '#2E5E7E',
        location: 'Seattle, WA',
        pricing: {
            economy: { min: 850, max: 1300, avg: 1060, name: 'Economy' },
            standard: { min: 1100, max: 1650, avg: 1350, name: 'Standard' },
            premium: { min: 1550, max: 2100, avg: 1800, name: 'Premium' },
            luxury: { min: 2100, max: 2850, avg: 2475, name: 'Luxury' }
        }
    },
    
    district_design: {
        ...window.FALLBACK_CONFIG,
        id: 'district_design',
        companyName: 'District Design Build',
        companySubtitle: 'Architectural Millwork Specialists',
        companyTagline: 'Where Architecture Meets Craftsmanship',
        logo: 'ðŸ—ï¸',
        primaryColor: '#8B4513',
        pricing: {
            economy: { min: 950, max: 1400, avg: 1200, name: 'Professional' },
            standard: { min: 1250, max: 1800, avg: 1525, name: 'Architectural' },
            premium: { min: 1750, max: 2400, avg: 2075, name: 'Designer' },
            luxury: { min: 2400, max: 3300, avg: 2850, name: 'Bespoke' }
        }
    },
    
    luxury_kitchens: {
        ...window.FALLBACK_CONFIG,
        id: 'luxury_kitchens',
        companyName: 'Prestige Kitchen Studios',
        companySubtitle: 'Ultra-Luxury Kitchen Design',
        companyTagline: 'Excellence Beyond Expectation',
        logo: 'ðŸ'Ž',
        primaryColor: '#4A148C',
        pricing: {
            economy: { min: 1200, max: 1800, avg: 1500, name: 'Signature' },
            standard: { min: 1600, max: 2400, avg: 2000, name: 'Premium' },
            premium: { min: 2200, max: 3200, avg: 2700, name: 'Luxury' },
            luxury: { min: 3000, max: 6000, avg: 4500, name: 'Ultra-Luxury' }
        }
    }
};

// ðŸŽ¯ ENHANCED CONFIGURATION LOADER WITH BULLETPROOF ERROR HANDLING
function loadConfiguration() {
    try {
        window.CONFIG_STATUS.attempts++;
        
        // Try to load saved configuration first
        const savedConfig = localStorage.getItem('selectedBusinessConfig');
        if (savedConfig && window.BUSINESS_CONFIGS[savedConfig]) {
            window.CONFIG = { ...window.BUSINESS_CONFIGS[savedConfig] };
            window.CONFIG_STATUS.loaded = true;
            console.log('âœ… Configuration loaded from localStorage:', savedConfig);
            return true;
        }
        
        // Fall back to default configuration
        window.CONFIG = { ...window.FALLBACK_CONFIG };
        window.CONFIG_STATUS.loaded = true;
        window.CONFIG_STATUS.fallbackUsed = true;
        
        console.log('âœ… Configuration loaded (using fallback)');
        return true;
        
    } catch (error) {
        console.error('ðŸš¨ Configuration loading failed:', error);
        window.CONFIG_STATUS.error = error.message;
        
        // Emergency fallback
        window.CONFIG = { ...window.FALLBACK_CONFIG };
        window.CONFIG_STATUS.loaded = true;
        window.CONFIG_STATUS.fallbackUsed = true;
        
        return false;
    }
}

// ðŸ"„ BUSINESS CONFIGURATION SWITCHER
function switchConfig(configId) {
    try {
        if (!window.BUSINESS_CONFIGS[configId]) {
            console.warn(`âš ï¸ Unknown configuration: ${configId}`);
            return false;
        }
        
        // Update active configuration
        window.CONFIG = { ...window.BUSINESS_CONFIGS[configId] };
        
        // Save selection
        localStorage.setItem('selectedBusinessConfig', configId);
        
        // Update UI indicators
        updateConfigButtons(configId);
        
        // Apply configuration to page
        if (typeof applyConfiguration === 'function') {
            applyConfiguration();
        }
        
        console.log('âœ… Configuration switched to:', configId);
        return true;
        
    } catch (error) {
        console.error('ðŸš¨ Configuration switch failed:', error);
        return false;
    }
}

// ðŸŽ¨ UI BUTTON UPDATER
function updateConfigButtons(activeId) {
    try {
        // Update all config buttons
        const buttons = document.querySelectorAll('.config-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.id === `btn-${activeId}`) {
                btn.classList.add('active');
            }
        });
    } catch (error) {
        console.warn('âš ï¸ Could not update config buttons:', error);
    }
}

// ðŸšš INITIALIZATION WITH RETRY LOGIC
function initializeConfig() {
    const maxRetries = 3;
    let retryCount = 0;
    
    function attemptLoad() {
        if (loadConfiguration()) {
            // Success - set up page
            if (typeof applyConfiguration === 'function') {
                setTimeout(applyConfiguration, 100);
            }
            
            // Set up active button
            const activeConfig = localStorage.getItem('selectedBusinessConfig') || 'foundry_cabinets';
            updateConfigButtons(activeConfig);
            
            return;
        }
        
        // Retry if failed
        retryCount++;
        if (retryCount < maxRetries) {
            console.log(`ðŸ"„ Retrying configuration load (${retryCount}/${maxRetries})...`);
            setTimeout(attemptLoad, 500 * retryCount);
        } else {
            console.error('ðŸš¨ Configuration loading failed after all retries');
        }
    }
    
    attemptLoad();
}

// ðŸŽ¯ VALIDATION HELPERS
function validateConfig() {
    if (!window.CONFIG) return false;
    
    const required = ['companyName', 'phone', 'email', 'pricing'];
    return required.every(field => window.CONFIG[field]);
}

function getConfigValue(path, fallback = null) {
    try {
        return path.split('.').reduce((obj, key) => obj && obj[key], window.CONFIG) || fallback;
    } catch {
        return fallback;
    }
}

// ðŸš€ AUTO-INITIALIZATION
document.addEventListener('DOMContentLoaded', initializeConfig);

// ðŸ"Š GLOBAL ERROR HANDLER
window.addEventListener('error', function(event) {
    if (event.filename && event.filename.includes('config')) {
        console.error('ðŸš¨ Configuration script error:', event.error);
        // Try to recover
        if (!window.CONFIG_STATUS.loaded) {
            initializeConfig();
        }
    }
});

console.log('ðŸ›¡ï¸ Bulletproof Configuration System v2.0 loaded');
