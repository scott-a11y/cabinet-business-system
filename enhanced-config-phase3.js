// 🚀 ENHANCED CONFIGURATION SYSTEM - PHASE 3
// Complete CRM and Business Automation Platform

// Current configuration state
let currentConfig = localStorage.getItem('businessConfig') || 'foundry_cabinets';

// Business configurations with Phase 3 CRM features
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
        
        // Phase 3 CRM Configuration
        crmSettings: {
            leadScoringEnabled: true,
            emailAutomationEnabled: true,
            paymentProcessingEnabled: true,
            analyticsTrackingEnabled: true
        },
        
        // Email Templates
        emailTemplates: {
            welcome: {
                subject: 'Welcome to Foundry Cabinets - Your Project Awaits!',
                template: 'foundry_welcome'
            },
            followUp: {
                subject: 'Following Up on Your Cabinet Project',
                template: 'foundry_followup'
            },
            reminder: {
                subject: 'Don\'t Miss Out - Your Custom Quote Expires Soon',
                template: 'foundry_reminder'
            }
        },
        
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
        
        crmSettings: {
            leadScoringEnabled: true,
            emailAutomationEnabled: true,
            paymentProcessingEnabled: true,
            analyticsTrackingEnabled: true
        },
        
        emailTemplates: {
            welcome: {
                subject: 'Welcome to Seattle Premium Cabinets - Pacific Northwest Excellence',
                template: 'seattle_welcome'
            },
            followUp: {
                subject: 'Your Seattle Cabinet Project - Next Steps',
                template: 'seattle_followup'
            },
            reminder: {
                subject: 'Premium Quality Awaits - Quote Expires Soon',
                template: 'seattle_reminder'
            }
        },
        
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
        
        crmSettings: {
            leadScoringEnabled: true,
            emailAutomationEnabled: true,
            paymentProcessingEnabled: true,
            analyticsTrackingEnabled: true
        },
        
        emailTemplates: {
            welcome: {
                subject: 'Welcome to District Design Build - Architectural Excellence',
                template: 'district_welcome'
            },
            followUp: {
                subject: 'Your Architectural Millwork Project - Design Phase',
                template: 'district_followup'
            },
            reminder: {
                subject: 'Custom Design Awaits - Exclusive Quote Expires',
                template: 'district_reminder'
            }
        },
        
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
        
        crmSettings: {
            leadScoringEnabled: true,
            emailAutomationEnabled: true,
            paymentProcessingEnabled: true,
            analyticsTrackingEnabled: true,
            conciergeServiceEnabled: true
        },
        
        emailTemplates: {
            welcome: {
                subject: 'Welcome to Prestige Kitchen Studios - Ultra-Luxury Awaits',
                template: 'prestige_welcome'
            },
            followUp: {
                subject: 'Your Luxury Kitchen Journey - Exclusive Design Consultation',
                template: 'prestige_followup'
            },
            reminder: {
                subject: 'Luxury Awaits - Exclusive Design Proposal Expires',
                template: 'prestige_reminder'
            }
        },
        
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

// Configuration Manager Class
class ConfigurationManager {
    constructor() {
        this.currentConfig = currentConfig;
        this.configs = BUSINESS_CONFIGS;
        this.loadConfig();
    }

    // Load current configuration
    loadConfig() {
        const config = this.configs[this.currentConfig];
        if (config && typeof window !== 'undefined') {
            window.CONFIG = config;
            this.applyGlobalStyles(config);
        }
        return config;
    }

    // Switch configuration
    switchConfig(configName) {
        if (this.configs[configName]) {
            this.currentConfig = configName;
            localStorage.setItem('businessConfig', configName);
            window.CONFIG = this.configs[configName];
            this.applyGlobalStyles(this.configs[configName]);
            this.updateConfigButtons();
            this.applyConfiguration();
            
            // Track configuration change
            if (typeof window.trackEvent === 'function') {
                window.trackEvent('config_switch', { 
                    from: currentConfig, 
                    to: configName 
                });
            }
            
            console.log('✅ Switched to configuration:', configName);
            return true;
        }
        return false;
    }

    // Apply global CSS custom properties
    applyGlobalStyles(config) {
        if (config.colors && typeof document !== 'undefined') {
            const root = document.documentElement;
            root.style.setProperty('--primary-gold', config.colors.primary);
            root.style.setProperty('--light-gold', config.colors.light);
            root.style.setProperty('--cream', config.colors.cream);
            root.style.setProperty('--warm-white', config.colors.warmWhite);
        }
    }

    // Update configuration buttons
    updateConfigButtons() {
        const buttons = document.querySelectorAll('.config-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.id === `btn-${this.currentConfig}`) {
                btn.classList.add('active');
            }
        });
    }

    // Apply configuration to current page
    applyConfiguration() {
        if (typeof window.applyConfiguration === 'function') {
            window.applyConfiguration();
        }
    }

    // Get current configuration
    getCurrentConfig() {
        return this.configs[this.currentConfig];
    }

    // Get all configurations
    getAllConfigs() {
        return this.configs;
    }

    // Phase 3 CRM Integration Methods
    
    // Lead scoring system with error handling
    scoreInteraction(interactionType, value = 1) {
        try {
            const config = this.getCurrentConfig();
            if (!config.crmSettings.leadScoringEnabled) return 0;
            
            const scores = {
                'page_view': 1,
                'configurator_start': 5,
                'configurator_complete': 15,
                'pdf_download': 10,
                'contact_form': 20,
                'phone_call': 25,
                'email_response': 10
            };
            
            const score = (scores[interactionType] || 1) * value;
            
            // Store lead score with error handling
            try {
                const currentScore = parseInt(localStorage.getItem('leadScore') || '0');
                const newScore = currentScore + score;
                localStorage.setItem('leadScore', newScore.toString());
                
                // Track high-value interactions
                if (newScore >= 50) {
                    this.triggerHighValueLeadAction(newScore);
                }
                
                return newScore;
            } catch (storageError) {
                console.warn('⚠️ Lead score storage error (browser extension conflict):', storageError);
                return score; // Return just the current interaction score
            }
        } catch (error) {
            console.warn('⚠️ Lead scoring error (browser extension conflict):', error);
            return 0;
        }
    }

    // Trigger actions for high-value leads
    triggerHighValueLeadAction(score) {
        const config = this.getCurrentConfig();
        if (config.crmSettings.emailAutomationEnabled) {
            console.log('🔥 High-value lead detected:', score, 'points');
            // In a real implementation, this would trigger email automation
        }
    }

    // Email template system
    getEmailTemplate(templateType) {
        const config = this.getCurrentConfig();
        return config.emailTemplates[templateType] || null;
    }

    // Analytics tracking with error handling
    trackEvent(eventName, properties = {}) {
        try {
            const config = this.getCurrentConfig();
            if (!config.crmSettings.analyticsTrackingEnabled) return;
            
            const event = {
                timestamp: new Date().toISOString(),
                event: eventName,
                properties: {
                    ...properties,
                    businessConfig: this.currentConfig,
                    leadScore: localStorage.getItem('leadScore') || '0'
                }
            };
            
            // Store event locally (in production, send to analytics service)
            try {
                const events = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
                events.push(event);
                
                // Keep only last 100 events to prevent storage overflow
                if (events.length > 100) {
                    events.splice(0, events.length - 100);
                }
                
                localStorage.setItem('analyticsEvents', JSON.stringify(events));
                console.log('📊 Event tracked:', eventName, properties);
            } catch (storageError) {
                console.warn('⚠️ Analytics storage error (browser extension conflict):', storageError);
            }
        } catch (error) {
            console.warn('⚠️ Analytics tracking error (browser extension conflict):', error);
        }
    }

    // Get analytics data
    getAnalyticsData() {
        return JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
    }

    // Payment integration helper
    generatePaymentIntent(amount, description) {
        const config = this.getCurrentConfig();
        if (!config.crmSettings.paymentProcessingEnabled) {
            throw new Error('Payment processing not enabled for this configuration');
        }
        
        // In production, this would integrate with Stripe or similar
        return {
            amount: amount,
            currency: 'usd',
            description: description,
            companyName: config.companyName,
            email: config.email
        };
    }
}

// Initialize configuration manager
const configManager = new ConfigurationManager();

// Global functions for backward compatibility with error handling
window.switchConfig = (configName) => {
    try {
        return configManager.switchConfig(configName);
    } catch (error) {
        console.warn('⚠️ Config switch error (browser extension conflict):', error);
        return false;
    }
};

window.trackEvent = (eventName, properties) => {
    try {
        return configManager.trackEvent(eventName, properties);
    } catch (error) {
        console.warn('⚠️ Track event error (browser extension conflict):', error);
    }
};

window.scoreInteraction = (type, value) => {
    try {
        return configManager.scoreInteraction(type, value);
    } catch (error) {
        console.warn('⚠️ Score interaction error (browser extension conflict):', error);
        return 0;
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { configManager, BUSINESS_CONFIGS };
}

// Make available globally
window.configManager = configManager;
window.BUSINESS_CONFIGS = BUSINESS_CONFIGS;

console.log('🚀 Enhanced Configuration System Phase 3 initialized successfully');
console.log('📊 Current configuration:', configManager.currentConfig);
console.log('🎯 CRM features enabled:', configManager.getCurrentConfig().crmSettings);
