// 🛡️ BULLETPROOF CONFIGURATION SYSTEM
// Enhanced Visual Business Management System

// Current configuration state
let currentConfig = localStorage.getItem('businessConfig') || 'foundry_cabinets';

// Business configurations
const BUSINESS_CONFIGS = {
    foundry_cabinets: {
        // Company Identity
        companyName: 'Foundry Cabinets Co',
        companySubtitle: 'by District Design Build, LLC',
        companyTagline: 'Driven by Precision. Evolved by Design.',
        logo: '🪵',
        
        // Contact Information
        location: 'Portland, OR',
        phone: '360-606-1106',
        email: 'scott@ddbteam.com',
        website: 'www.ddb503.com',
        
        // Pricing Configuration (Portland Market)
        pricingTiers: {
            economy: { 
                name: 'Economy', 
                price: 965, 
                range: '$800-$1,200/LF',
                features: ['Particle board construction', 'Basic hardware', '1-year warranty']
            },
            standard: { 
                name: 'Standard', 
                price: 1225, 
                range: '$1,000-$1,500/LF',
                features: ['Plywood construction', 'Soft-close hardware', '3-year warranty']
            },
            premium: { 
                name: 'Premium', 
                price: 1630, 
                range: '$1,400-$1,900/LF',
                features: ['Solid wood construction', 'Premium hardware', '5-year warranty']
            },
            luxury: { 
                name: 'Luxury', 
                price: 2250, 
                range: '$1,900-$2,600/LF',
                features: ['Custom solid wood', 'Designer hardware', '10-year warranty']
            }
        },
        
        // Visual Branding
        colors: {
            primary: '#D4B062',
            light: '#F4E4A1',
            cream: '#FBF8F0',
            warmWhite: '#FEFCF7'
        },
        
        // Client-facing content
        welcomeTitle: 'Your Custom Cabinet Estimate',
        welcomeMessage: 'Thank you for choosing Foundry Cabinets for your home transformation. We\'ve carefully crafted this estimate based on your specific needs and our commitment to exceptional quality and craftsmanship.',
        clientName: 'The Thompson Family',
        projectName: 'Kitchen Cabinet Installation'
    },

    seattle_cabinets: {
        companyName: 'Seattle Premium Cabinets',
        companySubtitle: 'Pacific Northwest Craftsmanship',
        companyTagline: 'Where Innovation Meets Tradition.',
        logo: '🏔️',
        
        location: 'Seattle, WA',
        phone: '206-555-0123',
        email: 'info@seattlecabinets.com',
        website: 'www.seattlepremiumcabinets.com',
        
        pricingTiers: {
            economy: { 
                name: 'Craftsman', 
                price: 1060, 
                range: '$900-$1,300/LF',
                features: ['Premium plywood', 'Northwest styling', '2-year warranty']
            },
            standard: { 
                name: 'Professional', 
                price: 1350, 
                range: '$1,100-$1,600/LF',
                features: ['Solid wood frames', 'Custom finishes', '5-year warranty']
            },
            premium: { 
                name: 'Artisan', 
                price: 1795, 
                range: '$1,500-$2,100/LF',
                features: ['Hand-crafted details', 'Premium hardware', '7-year warranty']
            },
            luxury: { 
                name: 'Master Craft', 
                price: 2475, 
                range: '$2,100-$2,850/LF',
                features: ['Heirloom quality', 'Imported hardware', '15-year warranty']
            }
        },
        
        colors: {
            primary: '#2E5C3E',
            light: '#A8C8A8',
            cream: '#F5F8F5',
            warmWhite: '#FEFFFE'
        },
        
        welcomeTitle: 'Your Seattle Premium Cabinet Solution',
        welcomeMessage: 'Experience the finest in Pacific Northwest craftsmanship. Our Seattle team combines traditional woodworking techniques with modern innovation to create cabinets that stand the test of time.',
        clientName: 'The Johnson Family',
        projectName: 'Complete Kitchen Renovation'
    },

    district_design: {
        companyName: 'District Design Build',
        companySubtitle: 'Architectural Millwork Specialists',
        companyTagline: 'Building Tomorrow\'s Spaces Today.',
        logo: '🏗️',
        
        location: 'Portland, OR',
        phone: '503-555-0456',
        email: 'projects@districtdesign.com',
        website: 'www.districtdesignbuild.com',
        
        pricingTiers: {
            economy: { 
                name: 'Studio', 
                price: 1200, 
                range: '$1,000-$1,400/LF',
                features: ['Architectural grade', 'Custom design', '3-year warranty']
            },
            standard: { 
                name: 'Professional', 
                price: 1525, 
                range: '$1,300-$1,750/LF',
                features: ['Designer millwork', 'Premium finishes', '5-year warranty']
            },
            premium: { 
                name: 'Architect Series', 
                price: 2050, 
                range: '$1,750-$2,350/LF',
                features: ['Custom architectural details', 'Luxury finishes', '10-year warranty']
            },
            luxury: { 
                name: 'Signature Collection', 
                price: 2850, 
                range: '$2,400-$3,300/LF',
                features: ['Bespoke design', 'Museum quality', 'Lifetime warranty']
            }
        },
        
        colors: {
            primary: '#1A365D',
            light: '#90CDF4',
            cream: '#F7FAFC',
            warmWhite: '#FFFEF7'
        },
        
        welcomeTitle: 'Your Architectural Millwork Solution',
        welcomeMessage: 'District Design Build specializes in creating architectural millwork that seamlessly integrates with your space\'s design vision. Our team of craftsmen and designers work together to bring your unique vision to life.',
        clientName: 'The Martinez Family',
        projectName: 'Custom Architectural Millwork'
    },

    luxury_kitchens: {
        companyName: 'Prestige Kitchen Studios',
        companySubtitle: 'Ultra-Luxury Kitchen Design',
        companyTagline: 'Where Luxury Meets Functionality.',
        logo: '💎',
        
        location: 'Lake Oswego, OR',
        phone: '503-555-0789',
        email: 'concierge@prestigekitchens.com',
        website: 'www.prestigekitchenstudios.com',
        
        pricingTiers: {
            economy: { 
                name: 'Prestige Select', 
                price: 1800, 
                range: '$1,500-$2,100/LF',
                features: ['Premium materials', 'Luxury hardware', '5-year warranty']
            },
            standard: { 
                name: 'Prestige Professional', 
                price: 2750, 
                range: '$2,300-$3,200/LF',
                features: ['Designer materials', 'Custom features', '10-year warranty']
            },
            premium: { 
                name: 'Prestige Signature', 
                price: 3650, 
                range: '$3,200-$4,100/LF',
                features: ['Exotic materials', 'Concierge service', '15-year warranty']
            },
            luxury: { 
                name: 'Prestige Elite', 
                price: 4500, 
                range: '$4,000-$5,000/LF',
                features: ['Museum quality', '24/7 concierge', 'Lifetime warranty']
            }
        },
        
        colors: {
            primary: '#744C2E',
            light: '#E6D2B7',
            cream: '#FAF8F4',
            warmWhite: '#FFFFFE'
        },
        
        welcomeTitle: 'Your Ultra-Luxury Kitchen Experience',
        welcomeMessage: 'Welcome to the pinnacle of kitchen luxury. At Prestige Kitchen Studios, we create more than kitchens – we craft culinary masterpieces that reflect your refined taste and lifestyle.',
        clientName: 'The Wellington Family',
        projectName: 'Ultra-Luxury Kitchen Design'
    }
};

// Configuration switching function
function switchConfig(configName) {
    if (BUSINESS_CONFIGS[configName]) {
        currentConfig = configName;
        localStorage.setItem('businessConfig', configName);
        window.CONFIG = BUSINESS_CONFIGS[configName];
        
        // Apply global CSS custom properties
        if (BUSINESS_CONFIGS[configName].colors) {
            const root = document.documentElement;
            root.style.setProperty('--primary-gold', BUSINESS_CONFIGS[configName].colors.primary);
            root.style.setProperty('--light-gold', BUSINESS_CONFIGS[configName].colors.light);
            root.style.setProperty('--cream', BUSINESS_CONFIGS[configName].colors.cream);
            root.style.setProperty('--warm-white', BUSINESS_CONFIGS[configName].colors.warmWhite);
        }
        
        // Update configuration buttons
        const buttons = document.querySelectorAll('.config-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.id === `btn-${configName}`) {
                btn.classList.add('active');
            }
        });
        
        // Apply configuration to current page
        if (typeof applyConfiguration === 'function') {
            applyConfiguration();
        }
        
        console.log('✅ Switched to configuration:', configName);
        return true;
    }
    return false;
}

// Load current configuration on startup
function loadConfiguration() {
    const config = BUSINESS_CONFIGS[currentConfig];
    if (config) {
        window.CONFIG = config;
        
        // Apply global styles
        if (config.colors) {
            const root = document.documentElement;
            root.style.setProperty('--primary-gold', config.colors.primary);
            root.style.setProperty('--light-gold', config.colors.light);
            root.style.setProperty('--cream', config.colors.cream);
            root.style.setProperty('--warm-white', config.colors.warmWhite);
        }
    }
    return config;
}

// Initialize configuration system
document.addEventListener('DOMContentLoaded', function() {
    loadConfiguration();
    console.log('🚀 Configuration system initialized');
    console.log('📊 Current configuration:', currentConfig);
});

// Make functions globally available
window.switchConfig = switchConfig;
window.loadConfiguration = loadConfiguration;
window.BUSINESS_CONFIGS = BUSINESS_CONFIGS;
