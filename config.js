// 🪵 FOUNDRY CABINETS CO - SINGLE BRAND CONFIGURATION
// Simplified production-ready configuration system

// 🏢 COMPANY INFORMATION
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
            description: 'Premium features with professional finish'
        },
        premium: {
            min: 1400,
            max: 1900,
            avg: 1630,
            name: 'Premium',
            description: 'High-end materials and custom options'
        },
        luxury: {
            min: 1900,
            max: 2600,
            avg: 2250,
            name: 'Luxury',
            description: 'Ultra-premium custom solutions'
        }
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
        'Oregon City',
        'Gresham',
        'Hillsboro'
    ],
    
    // 📊 CRM Lead Scoring Matrix
    leadScoring: {
        budget: {
            'under-20k': 1,
            '20k-40k': 3,
            '40k-75k': 5,
            'over-75k': 7
        },
        timeline: {
            'asap': 2,
            '1-3-months': 5,
            '3-6-months': 3,
            'future': 1
        },
        projectType: {
            'full-kitchen': 5,
            'cabinets-only': 4,
            'bathroom': 3,
            'built-ins': 2,
            'other': 1
        },
        engagement: {
            'downloaded': 1,
            'form-filled': 3,
            'called': 5,
            'meeting-scheduled': 7
        }
    },
    
    // 📧 Email Automation Sequences
    emailSequences: {
        newLead: [
            { day: 0, template: 'welcome', subject: 'Welcome to Foundry Cabinets Co!' },
            { day: 1, template: 'portfolio', subject: 'See Our Latest Kitchen Transformations' },
            { day: 3, template: 'testimonials', subject: 'What Our Portland Clients Say' },
            { day: 7, template: 'consultation', subject: 'Ready for Your Free Design Consultation?' }
        ],
        postConsultation: [
            { day: 0, template: 'proposal-follow-up', subject: 'Your Custom Cabinet Proposal' },
            { day: 3, template: 'questions', subject: 'Questions About Your Project?' },
            { day: 7, template: 'timeline', subject: 'Ready to Start Your Kitchen Transformation?' }
        ]
    },
    
    // 🔄 Phase Integration Settings
    integrations: {
        phase1: {
            basicCalculator: true,
            simpleProposals: true,
            clientPortal: false,
            crmDashboard: false
        },
        phase2: {
            advancedCalculator: true,
            multiOptionProposals: true,
            clientPortal: true,
            crmDashboard: true,
            photoGallery: true
        },
        phase3: {
            fullCrmSuite: true,
            automatedSequences: true,
            leadScoring: true,
            advancedAnalytics: true,
            mobileApp: true
        }
    }
};

// 🌟 BUSINESS CONFIGURATION SELECTOR
const CONFIG = FOUNDRY_CABINETS;

// Apply configuration to window for global access
window.CONFIG = CONFIG;
window.BUSINESS_CONFIG = CONFIG; // Legacy support

// 📤 Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// Initialize configuration
document.addEventListener('DOMContentLoaded', function() {
    console.log(`✅ Foundry Cabinets Co configuration loaded successfully`);
    
    // Apply branding
    if (CONFIG.logo && document.querySelector('.logo img')) {
        document.querySelector('.logo img').src = CONFIG.logo;
        document.querySelector('.logo img').alt = CONFIG.companyName + ' Logo';
    }
    
    // Apply company information
    const companyElements = document.querySelectorAll('[data-company-name]');
    companyElements.forEach(el => el.textContent = CONFIG.companyName);
    
    const phoneElements = document.querySelectorAll('[data-phone]');
    phoneElements.forEach(el => el.textContent = CONFIG.phone);
    
    const emailElements = document.querySelectorAll('[data-email]');
    emailElements.forEach(el => el.textContent = CONFIG.email);
    
    const websiteElements = document.querySelectorAll('[data-website]');
    websiteElements.forEach(el => el.textContent = CONFIG.website);
    
    // Apply pricing if pricing elements exist
    if (typeof applyPricingConfiguration === 'function') {
        applyPricingConfiguration(CONFIG.pricing);
    }
});

// 🔧 Pricing Configuration Helper
function getPricingTier(tierName) {
    return CONFIG.pricing[tierName] || null;
}

// 📈 Lead Scoring Helper
function calculateLeadScore(leadData) {
    let score = 0;
    
    if (leadData.budget && CONFIG.leadScoring.budget[leadData.budget]) {
        score += CONFIG.leadScoring.budget[leadData.budget];
    }
    
    if (leadData.timeline && CONFIG.leadScoring.timeline[leadData.timeline]) {
        score += CONFIG.leadScoring.timeline[leadData.timeline];
    }
    
    if (leadData.projectType && CONFIG.leadScoring.projectType[leadData.projectType]) {
        score += CONFIG.leadScoring.projectType[leadData.projectType];
    }
    
    if (leadData.engagement && CONFIG.leadScoring.engagement[leadData.engagement]) {
        score += CONFIG.leadScoring.engagement[leadData.engagement];
    }
    
    return score;
}

// 🕐 Estimate Timeline Calculator
function estimateTimeline(projectType, complexity = 'standard') {
    const baseTimelines = {
        'full-kitchen': 6,
        'cabinets-only': 4,
        'bathroom': 3,
        'built-ins': 2,
        'other': 3
    };
    
    const complexityMultipliers = {
        'simple': 0.8,
        'standard': 1.0,
        'complex': 1.3,
        'luxury': 1.5
    };
    
    const baseWeeks = baseTimelines[projectType] || 4;
    const multiplier = complexityMultipliers[complexity] || 1.0;
    
    return Math.ceil(baseWeeks * multiplier);
}