// 🚀 ENHANCED CONFIGURATION SYSTEM - PHASE 3
// Complete CRM and Business Automation Platform

// Current configuration state
let currentConfig = localStorage.getItem('businessConfig') || 'foundry_cabinets';

// Business configurations with Phase 3 CRM features
const BUSINESS_CONFIGS = {
    foundry_cabinets: {
        // Company Identity
        companyName: 'Foundry Cabinets Co',
        companySubtitle: 'Premium Cabinet Solutions',
        companyTagline: 'Driven by Precision. Evolved by Design.',
        logo: 'logo.svg',
        logoIcon: 'logo-icon.svg',
        logoEmoji: '🪵', // Fallback emoji for compatibility
        
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
