// 🛡️ BULLETPROOF CONFIGURATION SYSTEM
// This file configures all aspects of your cabinet business system

window.CONFIG = {
    // 🏢 BUSINESS INFORMATION
    companyName: 'Foundry Cabinets Co',
    companySubtitle: 'by District Design Build, LLC', 
    companyTagline: 'Driven by Precision. Evolved by Design.',
    
    // 📍 CONTACT INFORMATION
    location: 'Portland, OR',
    phone: '360-606-1106',
    email: 'scott@ddbteam.com',
    website: 'www.ddb503.com',
    
    // 🎨 BRANDING
    logo: '🪵', // Can be emoji or image path
    primaryColor: '#D4B062',
    secondaryColor: '#F4E4A1',
    
    // 💰 PRICING TIERS (Portland Market-Validated)
    pricing: {
        economy: {
            min: 800,
            max: 1200,
            avg: 965,
            name: 'Economy',
            description: 'Quality materials, solid construction'
        },
        standard: {
            min: 1000,
            max: 1500,
            avg: 1225,
            name: 'Standard',
            description: 'Enhanced features, better finishes'
        },
        premium: {
            min: 1400,
            max: 1900,
            avg: 1630,
            name: 'Premium',
            description: 'High-end materials, custom details'
        },
        luxury: {
            min: 1900,
            max: 2600,
            avg: 2250,
            name: 'Luxury',
            description: 'Luxury finishes, premium hardware'
        }
    },
    
    // 📊 BUSINESS METRICS
    businessStats: {
        experience: '15+ years',
        projectsCompleted: '150+',
        onTimeRate: '92%',
        satisfactionRate: '98%',
        warrantyYears: 5,
        avgTimeline: '4-6 weeks'
    },
    
    // 🔧 ADD-ONS & OPTIONS
    addons: [
        {
            id: 'soft-close',
            name: 'Soft-Close Hinges & Slides',
            price: 850,
            description: 'Premium hardware for smooth operation'
        },
        {
            id: 'crown-molding',
            name: 'Crown Molding Package',
            price: 650,
            description: 'Professional finishing touches'
        },
        {
            id: 'lighting',
            name: 'Under-Cabinet LED Lighting',
            price: 750,
            description: 'Energy-efficient task lighting'
        },
        {
            id: 'pullout-drawers',
            name: 'Pull-Out Drawer Organizers',
            price: 950,
            description: 'Maximize storage efficiency'
        },
        {
            id: 'lazy-susan',
            name: 'Corner Lazy Susan Systems',
            price: 450,
            description: 'Optimize corner cabinet access'
        }
    ],
    
    // 🏠 PROJECT TYPES
    projectTypes: [
        { value: 'kitchen-remodel', name: 'Complete Kitchen Remodel', popular: true },
        { value: 'kitchen-cabinets', name: 'Kitchen Cabinets Only', popular: true },
        { value: 'bathroom-vanity', name: 'Bathroom Vanity', popular: false },
        { value: 'built-ins', name: 'Custom Built-ins', popular: false },
        { value: 'laundry-room', name: 'Laundry Room Cabinets', popular: false },
        { value: 'office-cabinets', name: 'Home Office Built-ins', popular: false },
        { value: 'pantry', name: 'Walk-in Pantry', popular: false },
        { value: 'mudroom', name: 'Mudroom Storage', popular: false },
        { value: 'entertainment', name: 'Entertainment Center', popular: false },
        { value: 'other', name: 'Other Custom Work', popular: false }
    ],
    
    // 📱 SYSTEM FEATURES
    features: {
        pdfGeneration: true,
        multiOptionProposals: true,
        clientPortal: true,
        photoGallery: true,
        beforeAfterShowcase: true,
        virtualTours: true,
        estimateCalculator: true,
        mobileOptimized: true
    },
    
    // ⚙️ TECHNICAL SETTINGS
    technical: {
        taxRate: 0.0825, // 8.25% Portland tax rate
        currency: 'USD',
        measurementUnit: 'LF', // Linear Feet
        defaultTimeline: '4-6 weeks',
        proposalValidDays: 30,
        depositPercentage: 50
    },
    
    // 🎯 MARKETING MESSAGES
    messages: {
        welcomeTitle: 'Your Custom Cabinet Estimate',
        welcomeMessage: 'Thank you for choosing Foundry Cabinets for your home transformation. We\'ve carefully crafted this estimate based on your specific needs and our commitment to exceptional quality and craftsmanship.',
        proposalTagline: 'Transform your space with exceptional craftsmanship',
        ctaMessage: 'Ready to transform your space with our exceptional craftsmanship and attention to detail?'
    },
    
    // 📄 SAMPLE CLIENT DATA (for demos)
    sampleClient: {
        name: 'The Thompson Family',
        email: 'thompsons@example.com',
        phone: '(503) 123-4567',
        address: '1234 Oak Street, Portland, OR 97201',
        projectName: 'Kitchen Cabinet Installation',
        projectCode: 'TC2025001',
        linearFootage: 25
    }
};

// 🚀 AUTO-CONFIGURATION FUNCTION
// This automatically applies configuration when the page loads
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    
    // Apply configuration to page elements
    function applyConfiguration() {
        try {
            if (!window.CONFIG) {
                console.warn('⚠️ CONFIG not loaded');
                return false;
            }
            
            // Common element updates
            const updates = {
                'company-name': CONFIG.companyName,
                'company-subtitle': CONFIG.companySubtitle,
                'company-tagline': CONFIG.companyTagline,
                'company-logo': CONFIG.logo,
                'company-phone': CONFIG.phone,
                'company-email': CONFIG.email,
                'company-website': CONFIG.website,
                'company-location': CONFIG.location
            };
            
            // Apply updates to elements that exist
            Object.entries(updates).forEach(([id, value]) => {
                const elements = document.querySelectorAll(`#${id}, [data-config="${id}"]`);
                elements.forEach(el => {
                    if (el && value) {
                        el.textContent = value;
                    }
                });
            });
            
            // Update page title if element exists
            const titleEl = document.getElementById('page-title');
            if (titleEl) {
                document.title = titleEl.textContent;
            }
            
            // Update contact info combinations
            const contactElements = document.querySelectorAll('[data-config="contact-info"]');
            contactElements.forEach(el => {
                el.textContent = `${CONFIG.location} • ${CONFIG.phone} • ${CONFIG.email} • ${CONFIG.website}`;
            });
            
            console.log('✅ Configuration applied successfully');
            return true;
            
        } catch (error) {
            console.error('🚨 Error applying configuration:', error);
            return false;
        }
    }
    
    // Apply configuration when DOM is ready
    ready(function() {
        setTimeout(applyConfiguration, 100); // Small delay to ensure all scripts loaded
    });
    
})();

// 🎨 CSS CUSTOM PROPERTIES INJECTION
// This injects the color theme into CSS custom properties
(function() {
    'use strict';
    
    function injectTheme() {
        if (!window.CONFIG) return;
        
        const root = document.documentElement;
        if (CONFIG.primaryColor) {
            root.style.setProperty('--primary-gold', CONFIG.primaryColor);
        }
        if (CONFIG.secondaryColor) {
            root.style.setProperty('--light-gold', CONFIG.secondaryColor);
        }
    }
    
    // Inject theme when DOM is ready
    if (document.readyState !== 'loading') {
        injectTheme();
    } else {
        document.addEventListener('DOMContentLoaded', injectTheme);
    }
    
})();

// 💰 PRICING CALCULATION HELPERS
window.PricingHelpers = {
    
    // Calculate base cost for a tier and linear footage
    calculateBaseCost: function(tier, linearFootage) {
        if (!CONFIG.pricing[tier]) return 0;
        return CONFIG.pricing[tier].avg * parseFloat(linearFootage);
    },
    
    // Calculate total with tax
    calculateWithTax: function(subtotal) {
        return subtotal * (1 + CONFIG.technical.taxRate);
    },
    
    // Calculate discount amount
    calculateDiscount: function(subtotal, discountPercent) {
        return subtotal * (parseFloat(discountPercent) / 100);
    },
    
    // Format currency
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: CONFIG.technical.currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },
    
    // Get project size category
    getProjectSize: function(linearFootage) {
        const lf = parseFloat(linearFootage);
        if (lf < 15) return 'Small';
        if (lf < 25) return 'Medium';
        if (lf < 40) return 'Large';
        return 'Extra Large';
    }
    
};

// 📊 ANALYTICS HELPERS
window.AnalyticsHelpers = {
    
    // Track proposal generation
    trackProposal: function(data) {
        console.log('📊 Proposal Generated:', data);
        // Add analytics tracking here (Google Analytics, etc.)
    },
    
    // Track client interaction
    trackClientAction: function(action, data) {
        console.log(`📊 Client Action - ${action}:`, data);
        // Add analytics tracking here
    }
    
};

console.log('✅ Foundry Cabinets Co Configuration System Loaded Successfully');
console.log('🏢 Company:', CONFIG.companyName);
console.log('📍 Location:', CONFIG.location);
console.log('💰 Pricing Tiers:', Object.keys(CONFIG.pricing).length);
console.log('🔧 Add-ons Available:', CONFIG.addons.length);
