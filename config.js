// ðŸªµ FOUNDRY CABINETS CO - SINGLE BRAND CONFIGURATION
// Simplified production-ready configuration system

// ðŸ¢ COMPANY INFORMATION
const FOUNDRY_CABINETS = {
    // Company Identity
    companyName: 'Foundry Cabinets Co',
    companySubtitle: 'Professional Cabinet Solutions',
    companyTagline: 'Driven by Precision. Evolved by Design.',
    
    // Branding
    logo: 'logo.svg',
    logoIcon: 'logo-icon.svg',
    logoEmoji: '🪵', // Fallback emoji for compatibility
    primaryColor: '#D4B062',
    
    // Contact Information
    location: 'Portland, OR',
    phone: '360-606-1106',
    email: 'scott@ddbteam.com',
    website: 'www.ddb503.com',
    
    // Market-Validated Pricing (Portland, OR)
    pricing: {
        economy: {
            min: 800,
            max: 1200,
            avg: 965,
            name: 'Economy',
            description: 'Quality cabinets with essential features'
        },
        standard: {
            min: 1000,
            max: 1500,
            avg: 1225,
            name: 'Standard',
            description: 'Popular choice with enhanced features'
        },
        premium: {
            min: 1400,
            max: 1900,
            avg: 1630,
            name: 'Premium',
            description: 'High-end materials and custom options'
        },
        
            min: 1900,
            max: 2600,
            avg: 2250,
    },
    
    // Business Features & Statistics
    features: {
        warranty: '5-year comprehensive coverage',
        timeline: '4-6 weeks from approval',
        onTimeRate: '92%',
        satisfactionRate: '98%',
        experience: '15+ years',
        projectsCompleted: '150+',
        licensed: true,
        bonded: true,
        insured: true
    },
    
    // Service Areas
    serviceAreas: [
        'Portland Metro',
        'Beaverton',
        'Lake Oswego',
        'Tigard',
        'Milwaukie',
        'Oregon City'
    ],
    
    // Specialties
    specialties: [
        'Custom Kitchen Cabinets',
        'Bathroom Vanities',
        'Built-in Storage',
        'Entertainment Centers',
        'Home Office Solutions',
        'Garage Organization'
    ],
    
    // Materials & Options
    materials: {
        wood: ['Oak', 'Maple', 'Cherry', 'Walnut', 'Hickory'],
        finishes: ['Natural', 'Stained', 'Painted', 'Glazed'],
        hardware: ['Soft-Close Hinges', 'Full-Extension Drawers', 'Premium Handles'],
        styles: ['Traditional', 'Contemporary', 'Transitional', 'Modern', 'Rustic']
    }
};

// ðŸŽ¯ MAKE GLOBALLY AVAILABLE
window.FOUNDRY_CONFIG = FOUNDRY_CABINETS;

// ðŸ“Š BUSINESS CALCULATIONS
const BusinessCalculations = {
    // Calculate linear foot pricing
    calculateLinearFootPrice: function(linearFeet, tier = 'standard') {
        const pricing = FOUNDRY_CABINETS.pricing[tier];
        return Math.round(linearFeet * pricing.avg);
    },
    
    // Calculate project total with tax
    calculateProjectTotal: function(subtotal, taxRate = 0.0825) {
        const tax = Math.round(subtotal * taxRate);
        return {
            subtotal: subtotal,
            tax: tax,
            total: subtotal + tax
        };
    },
    
    // Get seasonal pricing factor
    getSeasonalFactor: function() {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return 1.1; // Spring (Mar-May)
        if (month >= 5 && month <= 7) return 1.15; // Summer (Jun-Aug)
        if (month >= 8 && month <= 10) return 1.0; // Fall (Sep-Nov)
        return 0.95; // Winter (Dec-Feb)
    },
    
    // Estimate project timeline
    estimateTimeline: function(complexity = 'standard') {
        const timelines = {
            simple: '3-4 weeks',
            standard: '4-6 weeks',
            complex: '6-8 weeks',
            
        };
        return timelines[complexity] || timelines.standard;
    }
};

// ðŸŽ¨ DESIGN UTILITIES
const DesignUtils = {
    // Apply company colors to elements
    applyBranding: function() {
        const root = document.documentElement;
        root.style.setProperty('--primary-gold', FOUNDRY_CABINETS.primaryColor);
        
        // Update page title if element exists
        const titleEl = document.getElementById('page-title');
        if (titleEl) {
            titleEl.textContent = FOUNDRY_CABINETS.companyName + ' - ' + titleEl.textContent;
        }
        
        // Update document title
        if (document.title.includes('Your Custom Estimate')) {
            document.title = FOUNDRY_CABINETS.companyName + ' - Your Custom Estimate';
        }
    },
    
    // Format currency
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount);
    },
    
    // Format phone number
    formatPhone: function(phone = FOUNDRY_CABINETS.phone) {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
};

// ðŸ“± CLIENT UTILITIES
const ClientUtils = {
    // Generate estimate ID
    generateEstimateId: function() {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `FC${year}${month}${day}-${random}`;
    },
    
    // Get current date formatted
    getCurrentDate: function() {
        return new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Get estimate expiration date (30 days)
    getExpirationDate: function() {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};

// ðŸš€ AUTO-INITIALIZATION
document.addEventListener('DOMContentLoaded', function() {
    // Apply branding automatically
    DesignUtils.applyBranding();
    
    // Update any dynamic content
    const estimateDateEl = document.getElementById('estimate-date');
    if (estimateDateEl) {
        estimateDateEl.textContent = ClientUtils.getCurrentDate();
    }
    
    const expirationDateEl = document.getElementById('expiration-date');
    if (expirationDateEl) {
        expirationDateEl.textContent = ClientUtils.getExpirationDate();
    }
    
    console.log('âœ… Foundry Cabinets Co configuration loaded successfully');
});

// ðŸ“Š EXPORT FOR MODULES (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FOUNDRY_CABINETS,
        BusinessCalculations,
        DesignUtils,
        ClientUtils
    };
}


