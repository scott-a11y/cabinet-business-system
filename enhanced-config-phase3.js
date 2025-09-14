// Phase 3 Enhanced Configuration System with CRM, Email, Payment & Analytics Integration

// ==========================================
// 🔧 CORE CONFIGURATION MANAGEMENT
// ==========================================

class Phase3ConfigurationManager {
    constructor() {
        this.currentConfig = 'foundry_cabinets';
        this.apiKeys = this.loadAPIKeys();
        this.businessRules = this.loadBusinessRules();
        this.integrations = this.loadIntegrations();
        this.analytics = this.loadAnalyticsConfig();
        this.init();
    }

    init() {
        this.applyConfiguration();
        this.initializeIntegrations();
        this.setupAnalytics();
        console.log('✅ Phase 3 Configuration System initialized');
    }

    // Load API keys and credentials (encrypted in production)
    loadAPIKeys() {
        return {
            emailjs: {
                userId: 'YOUR_EMAILJS_USER_ID',
                serviceId: 'YOUR_EMAILJS_SERVICE_ID',
                templateIds: {
                    welcome: 'template_welcome',
                    followUp: 'template_followup',
                    proposal: 'template_proposal',
                    reminder: 'template_reminder'
                }
            },
            stripe: {
                publishableKey: 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY',
                webhookSecret: 'whsec_YOUR_WEBHOOK_SECRET'
            },
            analytics: {
                googleAnalytics: 'GA_MEASUREMENT_ID',
                mixpanel: 'MIXPANEL_PROJECT_TOKEN'
            },
            crm: {
                hubspotKey: 'YOUR_HUBSPOT_API_KEY',
                salesforceKey: 'YOUR_SALESFORCE_API_KEY'
            }
        };
    }

    // Load business rules and automation
    loadBusinessRules() {
        return {
            leadScoring: {
                email: 5,
                phone: 10,
                projectType: {
                    kitchen: 15,
                    bathroom: 10,
                    custom: 20
                },
                projectValue: {
                    under15k: 5,
                    '15k-30k': 10,
                    '30k-50k': 15,
                    over50k: 20
                },
                source: {
                    configurator: 15,
                    referral: 20,
                    website: 10,
                    social: 8
                }
            },
            automation: {
                welcomeEmail: {
                    enabled: true,
                    delay: 5, // minutes
                    template: 'welcome'
                },
                followUpEmail: {
                    enabled: true,
                    delay: 72, // hours
                    template: 'followUp'
                },
                reminderEmail: {
                    enabled: true,
                    delay: 168, // hours (1 week)
                    template: 'reminder'
                }
            },
            notifications: {
                newLead: true,
                highValueLead: true, // over $40k
                overdueFollowup: true,
                paymentReceived: true
            }
        };
    }

    // Load integration configurations
    loadIntegrations() {
        return {
            email: {
                provider: 'emailjs', // emailjs, sendgrid, mailchimp
                enabled: true,
                rateLimiting: {
                    perHour: 100,
                    perDay: 500
                }
            },
            payments: {
                provider: 'stripe', // stripe, square, paypal
                enabled: true,
                depositOptions: [10, 25, 50], // percentage options
                currency: 'USD'
            },
            crm: {
                provider: 'internal', // internal, hubspot, salesforce
                enabled: true,
                syncInterval: 300000, // 5 minutes
                autoCreateContacts: true
            },
            analytics: {
                provider: 'internal', // internal, google, mixpanel
                enabled: true,
                trackingEnabled: true,
                heatmapEnabled: false
            },
            storage: {
                provider: 'localStorage', // localStorage, firebase, aws
                encryption: false,
                backup: true
            }
        };
    }

    // Load analytics configuration
    loadAnalyticsConfig() {
        return {
            events: {
                pageView: true,
                configuratorStart: true,
                configuratorStep: true,
                configuratorComplete: true,
                proposalGenerated: true,
                emailSent: true,
                paymentAttempt: true,
                paymentSuccess: true,
                leadCreated: true,
                statusChange: true
            },
            goals: {
                conversionRate: 25, // target percentage
                averageProjectValue: 35000, // target USD
                emailOpenRate: 60, // target percentage
                responseTime: 24 // target hours
            },
            dashboards: {
                realTime: true,
                daily: true,
                weekly: true,
                monthly: true
            }
        };
    }

    applyConfiguration() {
        if (window.CONFIG && window.BUSINESS_CONFIGS) {
            const config = window.BUSINESS_CONFIGS[this.currentConfig];
            if (config) {
                // Apply visual configuration
                this.applyVisualConfig(config);
                
                // Apply business logic
                this.applyBusinessConfig(config);
                
                // Update global CONFIG
                window.CONFIG = { ...window.CONFIG, ...config };
            }
        }
    }

    applyVisualConfig(config) {
        // Update CSS custom properties
        if (config.colors) {
            const root = document.documentElement;
            Object.entries(config.colors).forEach(([key, value]) => {
                root.style.setProperty(`--${key}`, value);
            });
        }

        // Update page titles and meta
        if (config.companyName) {
            document.title = document.title.replace(/^[^-]*/, config.companyName);
        }
    }

    applyBusinessConfig(config) {
        // Update pricing rules
        if (config.pricing) {
            this.updatePricingRules(config.pricing);
        }

        // Update email templates
        if (config.emailTemplates) {
            this.updateEmailTemplates(config.emailTemplates);
        }

        // Update business rules
        if (config.businessRules) {
            this.businessRules = { ...this.businessRules, ...config.businessRules };
        }
    }

    updatePricingRules(pricing) {
        // Dynamic pricing based on configuration
        window.PRICING_RULES = pricing;
    }

    updateEmailTemplates(templates) {
        // Update email templates with business-specific content
        Object.entries(templates).forEach(([key, template]) => {
            if (this.apiKeys.emailjs.templateIds[key]) {
                // Template updates would go through EmailJS dashboard
                console.log(`📧 Email template ${key} ready for update`);
            }
        });
    }

    initializeIntegrations() {
        // Initialize EmailJS
        if (this.integrations.email.enabled && typeof emailjs !== 'undefined') {
            emailjs.init(this.apiKeys.emailjs.userId);
            console.log('✅ EmailJS initialized');
        }

        // Initialize Stripe
        if (this.integrations.payments.enabled && typeof Stripe !== 'undefined') {
            window.stripeInstance = Stripe(this.apiKeys.stripe.publishableKey);
            console.log('✅ Stripe initialized');
        }

        // Initialize Analytics
        if (this.integrations.analytics.enabled) {
            this.initAnalytics();
        }
    }

    initAnalytics() {
        // Custom analytics system
        window.analytics = {
            track: (event, properties = {}) => {
                if (!this.analytics.events[event]) return;

                const analyticsData = {
                    event,
                    properties: {
                        ...properties,
                        timestamp: new Date().toISOString(),
                        page: window.location.pathname,
                        userAgent: navigator.userAgent,
                        sessionId: this.getSessionId()
                    }
                };

                // Store locally
                this.storeAnalyticsEvent(analyticsData);

                // Send to external providers if configured
                this.sendToAnalyticsProviders(analyticsData);
            },
            
            identify: (userId, traits = {}) => {
                localStorage.setItem('analytics_user', JSON.stringify({
                    userId,
                    traits,
                    timestamp: new Date().toISOString()
                }));
            },

            page: (name, properties = {}) => {
                this.track('pageView', { pageName: name, ...properties });
            }
        };

        console.log('✅ Analytics system initialized');
    }

    storeAnalyticsEvent(data) {
        const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
        events.push(data);
        
        // Keep only last 1000 events to prevent storage overflow
        if (events.length > 1000) {
            events.splice(0, events.length - 1000);
        }
        
        localStorage.setItem('analytics_events', JSON.stringify(events));
    }

    sendToAnalyticsProviders(data) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', data.event, data.properties);
        }

        // Mixpanel
        if (typeof mixpanel !== 'undefined') {
            mixpanel.track(data.event, data.properties);
        }
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('analytics_session');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('analytics_session', sessionId);
        }
        return sessionId;
    }

    // Automation engine
    processLeadAutomation(lead) {
        const score = this.calculateLeadScore(lead);
        lead.score = score;

        // Trigger automations based on score and rules
        if (this.businessRules.automation.welcomeEmail.enabled) {
            this.scheduleEmail(lead, 'welcome', this.businessRules.automation.welcomeEmail.delay);
        }

        if (score > 50 && this.businessRules.notifications.highValueLead) {
            this.sendNotification('High-value lead detected', lead);
        }

        return lead;
    }

    calculateLeadScore(lead) {
        let score = 0;
        const rules = this.businessRules.leadScoring;

        // Email presence
        if (lead.client?.email) score += rules.email;

        // Phone presence
        if (lead.client?.phone) score += rules.phone;

        // Project type
        if (lead.estimate?.projectType && rules.projectType[lead.estimate.projectType]) {
            score += rules.projectType[lead.estimate.projectType];
        }

        // Project value
        const value = lead.estimate?.total || 0;
        if (value < 15000) score += rules.projectValue.under15k;
        else if (value < 30000) score += rules.projectValue['15k-30k'];
        else if (value < 50000) score += rules.projectValue['30k-50k'];
        else score += rules.projectValue.over50k;

        // Source
        if (lead.source && rules.source[lead.source]) {
            score += rules.source[lead.source];
        }

        return Math.min(score, 100); // Cap at 100
    }

    scheduleEmail(lead, templateType, delayMinutes) {
        const emailData = {
            leadId: lead.id,
            templateType,
            scheduledFor: new Date(Date.now() + delayMinutes * 60000).toISOString(),
            recipient: lead.client?.email,
            variables: this.prepareEmailVariables(lead)
        };

        // Store in scheduled emails queue
        const scheduled = JSON.parse(localStorage.getItem('scheduled_emails') || '[]');
        scheduled.push(emailData);
        localStorage.setItem('scheduled_emails', JSON.stringify(scheduled));

        // Process immediately if delay is 0
        if (delayMinutes === 0) {
            this.processScheduledEmail(emailData);
        }
    }

    prepareEmailVariables(lead) {
        const config = window.CONFIG || {};
        return {
            client_name: lead.client?.name || 'Valued Customer',
            company_name: config.companyName || 'Your Company',
            project_type: lead.estimate?.projectType || 'your project',
            estimate_total: this.formatCurrency(lead.estimate?.total || 0),
            timeline: lead.estimate?.timeline || '4-6 weeks',
            phone: config.phone || '',
            email: config.email || '',
            website: config.website || ''
        };
    }

    async processScheduledEmail(emailData) {
        try {
            if (typeof emailjs !== 'undefined') {
                const templateId = this.apiKeys.emailjs.templateIds[emailData.templateType];
                if (templateId) {
                    await emailjs.send(
                        this.apiKeys.emailjs.serviceId,
                        templateId,
                        emailData.variables
                    );
                    console.log(`✅ Email sent: ${emailData.templateType} to ${emailData.recipient}`);
                }
            }
        } catch (error) {
            console.error('❌ Email sending failed:', error);
        }
    }

    sendNotification(message, data) {
        // Browser notification
        if (Notification.permission === 'granted') {
            new Notification(message, {
                body: JSON.stringify(data, null, 2),
                icon: '/favicon.ico'
            });
        }

        // Console log for admin
        console.log(`🔔 Notification: ${message}`, data);

        // Store in notifications queue for admin dashboard
        const notifications = JSON.parse(localStorage.getItem('admin_notifications') || '[]');
        notifications.push({
            message,
            data,
            timestamp: new Date().toISOString(),
            read: false
        });
        localStorage.setItem('admin_notifications', JSON.stringify(notifications));
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Export/Import functionality
    exportConfiguration() {
        return {
            apiKeys: this.apiKeys,
            businessRules: this.businessRules,
            integrations: this.integrations,
            analytics: this.analytics,
            currentConfig: this.currentConfig,
            exportDate: new Date().toISOString()
        };
    }

    importConfiguration(configData) {
        try {
            this.apiKeys = configData.apiKeys || this.apiKeys;
            this.businessRules = configData.businessRules || this.businessRules;
            this.integrations = configData.integrations || this.integrations;
            this.analytics = configData.analytics || this.analytics;
            this.currentConfig = configData.currentConfig || this.currentConfig;
            
            this.applyConfiguration();
            console.log('✅ Configuration imported successfully');
            return true;
        } catch (error) {
            console.error('❌ Configuration import failed:', error);
            return false;
        }
    }
}

// ==========================================
// 🏢 BUSINESS CONFIGURATIONS
// ==========================================

window.BUSINESS_CONFIGS = {
    foundry_cabinets: {
        // Company Information
        companyName: "Foundry Cabinets Co",
        companySubtitle: "by District Design Build, LLC",
        companyTagline: "Driven by Precision. Evolved by Design.",
        logo: "🪵",
        
        // Contact Information
        phone: "360-606-1106",
        email: "scott@ddbteam.com",
        website: "www.ddb503.com",
        location: "Portland, OR",
        address: "1234 Industrial Blvd, Portland, OR 97201",
        
        // Visual Branding
        colors: {
            primary: "#D4B062",
            secondary: "#C5A055",
            accent: "#2E7D4A"
        },
        
        // Pricing Configuration
        pricing: {
            tiers: {
                essential: { basePrice: 965, description: "Quality construction with standard features" },
                standard: { basePrice: 1225, description: "Enhanced features and premium finishes" },
                premium: { basePrice: 1630, description: "Top-tier materials and custom details" },
                luxury: { basePrice: 2250, description: "Luxury materials with designer hardware" }
            },
            addons: {
                island: 5000,
                crown: 1200,
                pantry: 2800,
                lighting: 1500,
                hardware_upgrade: 800,
                soft_close: 1200
            },
            modifiers: {
                rush: 1.15,
                seasonal: {
                    spring: 1.15,
                    summer: 1.10,
                    fall: 1.05,
                    winter: 0.95
                },
                regional: {
                    portland: 1.0,
                    seattle: 1.15,
                    bend: 1.08,
                    eugene: 0.95
                }
            }
        },
        
        // Business Rules
        businessRules: {
            minimumProject: 5000,
            depositOptions: [10, 25],
            warrantyYears: 5,
            timelineWeeks: { min: 4, max: 8 },
            taxRate: 0.0825 // Oregon rate
        },
        
        // Email Templates
        emailTemplates: {
            welcome: {
                subject: "Welcome to Foundry Cabinets - Let's Build Something Amazing!",
                greeting: "Thank you for choosing Foundry Cabinets for your project."
            },
            followUp: {
                subject: "Your Cabinet Project - Ready for the Next Step?",
                greeting: "I hope you've had time to review your cabinet proposal."
            }
        },
        
        // Integration Settings
        integrations: {
            scheduling: "calendly.com/foundry-cabinets",
            socialMedia: {
                instagram: "@foundrycabinets",
                facebook: "FoundryCabinetsPortland"
            }
        }
    },

    seattle_cabinets: {
        companyName: "Seattle Premium Cabinets",
        companySubtitle: "Pacific Northwest Craftsmanship",
        companyTagline: "Inspired by Nature. Built for Life.",
        logo: "🏔️",
        
        phone: "206-555-0123",
        email: "info@seattlecabinets.com",
        website: "www.seattlecabinets.com",
        location: "Seattle, WA",
        
        colors: {
            primary: "#2C5530",
            secondary: "#4A7C59",
            accent: "#8FBC8F"
        },
        
        pricing: {
            tiers: {
                essential: { basePrice: 1060, description: "Northwest quality with eco-friendly materials" },
                standard: { basePrice: 1350, description: "Sustainable luxury with premium features" },
                premium: { basePrice: 1790, description: "Artisan craftsmanship with local materials" },
                luxury: { basePrice: 2475, description: "Pacific Northwest luxury design" }
            },
            modifiers: {
                seasonal: {
                    spring: 1.20,
                    summer: 1.15,
                    fall: 1.10,
                    winter: 1.05
                }
            }
        },
        
        businessRules: {
            taxRate: 0.1025, // Washington rate
            warrantyYears: 7
        }
    },

    district_design: {
        companyName: "District Design Build",
        companySubtitle: "Architectural Millwork Specialists",
        companyTagline: "Where Architecture Meets Craftsmanship.",
        logo: "🏗️",
        
        phone: "503-555-0187",
        email: "design@districtbuild.com",
        website: "www.districtdesignbuild.com",
        location: "Portland, OR",
        
        colors: {
            primary: "#1C1C1C",
            secondary: "#D4B062",
            accent: "#C5801A"
        },
        
        pricing: {
            tiers: {
                essential: { basePrice: 1200, description: "Architectural-grade construction" },
                standard: { basePrice: 1550, description: "Designer collaboration included" },
                premium: { basePrice: 1950, description: "Custom architectural millwork" },
                luxury: { basePrice: 2850, description: "Bespoke architectural elements" }
            }
        }
    },

    luxury_kitchens: {
        companyName: "Prestige Kitchen Studios",
        companySubtitle: "Ultra-Luxury Kitchen Design",
        companyTagline: "Beyond Expectations. Beyond Compare.",
        logo: "💎",
        
        phone: "503-555-0199",
        email: "concierge@prestigekitchens.com",
        website: "www.prestigekitchenstudios.com",
        location: "West Linn, OR",
        
        colors: {
            primary: "#8B4513",
            secondary: "#DAA520",
            accent: "#B8860B"
        },
        
        pricing: {
            tiers: {
                essential: { basePrice: 1800, description: "Luxury entry-level with premium materials" },
                standard: { basePrice: 2400, description: "Designer luxury with custom features" },
                premium: { basePrice: 3200, description: "Ultra-premium with imported materials" },
                luxury: { basePrice: 4500, description: "Bespoke luxury with concierge service" }
            }
        },
        
        businessRules: {
            minimumProject: 25000,
            depositOptions: [25, 50],
            warrantyYears: 10
        }
    }
};

// ==========================================
// 🚀 INITIALIZATION & AUTOMATION
// ==========================================

// Initialize Phase 3 Configuration
window.configManager = new Phase3ConfigurationManager();

// Global configuration switching function
function switchConfig(configName) {
    if (window.BUSINESS_CONFIGS[configName]) {
        window.configManager.currentConfig = configName;
        window.configManager.applyConfiguration();
        
        // Update active button
        document.querySelectorAll('.config-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`btn-${configName}`)?.classList.add('active');
        
        // Track configuration change
        if (window.analytics) {
            window.analytics.track('configurationChanged', { 
                newConfig: configName,
                previousConfig: window.configManager.currentConfig
            });
        }
        
        console.log(`✅ Switched to ${configName} configuration`);
    }
}

// Scheduled email processor (runs every minute)
setInterval(() => {
    const scheduled = JSON.parse(localStorage.getItem('scheduled_emails') || '[]');
    const now = new Date();
    
    const toProcess = scheduled.filter(email => new Date(email.scheduledFor) <= now);
    const remaining = scheduled.filter(email => new Date(email.scheduledFor) > now);
    
    toProcess.forEach(email => {
        window.configManager.processScheduledEmail(email);
    });
    
    if (toProcess.length > 0) {
        localStorage.setItem('scheduled_emails', JSON.stringify(remaining));
    }
}, 60000); // Every minute

// Lead scoring and automation processor
window.processNewLead = function(leadData) {
    const processedLead = window.configManager.processLeadAutomation(leadData);
    
    // Track lead creation
    if (window.analytics) {
        window.analytics.track('leadCreated', {
            leadId: processedLead.id,
            score: processedLead.score,
            projectValue: processedLead.estimate?.total || 0,
            source: processedLead.source
        });
    }
    
    return processedLead;
};

// Global analytics tracking
window.trackEvent = function(event, properties = {}) {
    if (window.analytics) {
        window.analytics.track(event, properties);
    }
};

// Request notification permission
if (Notification.permission === 'default') {
    Notification.requestPermission();
}

// Global error handling
window.addEventListener('error', (error) => {
    console.error('💥 Global error:', error);
    if (window.analytics) {
        window.analytics.track('error', {
            message: error.message,
            filename: error.filename,
            lineno: error.lineno,
            colno: error.colno
        });
    }
});

// Performance monitoring
window.addEventListener('load', () => {
    setTimeout(() => {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        if (window.analytics) {
            window.analytics.track('pageLoadTime', {
                loadTime: loadTime,
                page: window.location.pathname
            });
        }
    }, 0);
});

// Export configuration management functions
window.exportSystemConfig = function() {
    const config = window.configManager.exportConfiguration();
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], {type:'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `system-config-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
};

window.importSystemConfig = function(fileInput) {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const config = JSON.parse(e.target.result);
                const success = window.configManager.importConfiguration(config);
                alert(success ? 'Configuration imported successfully!' : 'Failed to import configuration.');
            } catch (error) {
                alert('Invalid configuration file.');
            }
        };
        reader.readAsText(file);
    }
};

// Backward compatibility with Phase 2 files
window.CONFIG = window.BUSINESS_CONFIGS.foundry_cabinets;

console.log('🚀 Phase 3 Enhanced Configuration System loaded successfully!');
console.log('📊 CRM, Email, Payment & Analytics integrations ready');
console.log('🔧 Use switchConfig() to change business configurations');
console.log('📈 Analytics tracking active for all user interactions');
