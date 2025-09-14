// 🚀 ENHANCED CONFIGURATION SYSTEM - PHASE II
// Advanced Cabinet Business Management Platform

// Enhanced Configuration Manager with CRM and Market Intelligence
class ConfigurationManager {
    constructor() {
        this.currentConfig = localStorage.getItem('businessConfig') || 'foundry_cabinets';
        this.analytics = [];
        this.leads = [];
        this.emailTemplates = {};
        this.marketData = {};
        
        this.init();
    }

    // Initialize enhanced configuration system
    init() {
        this.loadMarketIntelligence();
        this.loadEmailTemplates();
        this.initializeAnalytics();
        this.setupCRM();
        
        console.log('🚀 Enhanced Configuration Manager initialized');
    }

    // Load Portland market intelligence data
    loadMarketIntelligence() {
        this.marketData = {
            portland: {
                averagePricing: {
                    economy: { min: 800, max: 1200, avg: 965, marketShare: 35 },
                    standard: { min: 1000, max: 1500, avg: 1225, marketShare: 30 },
                    premium: { min: 1400, max: 1900, avg: 1630, marketShare: 25 },
                    luxury: { min: 1900, max: 2600, avg: 2250, marketShare: 10 }
                },
                competitors: {
                    'Neil Kelly': { 
                        marketShare: 15, 
                        avgPrice: 2100, 
                        strength: 'Premium brand recognition',
                        weakness: 'Higher pricing',
                        positioning: 'Luxury market leader'
                    },
                    'IKEA Kitchen Services': { 
                        marketShare: 25, 
                        avgPrice: 850, 
                        strength: 'Volume pricing, brand recognition',
                        weakness: 'Limited customization',
                        positioning: 'Budget-conscious consumers'
                    },
                    'Home Depot': { 
                        marketShare: 20, 
                        avgPrice: 1200, 
                        strength: 'Nationwide presence, financing',
                        weakness: 'Installation quality varies',
                        positioning: 'Mid-market convenience'
                    },
                    'Local Custom Shops': { 
                        marketShare: 30, 
                        avgPrice: 1500, 
                        strength: 'Personalized service, quality craftsmanship',
                        weakness: 'Limited marketing reach',
                        positioning: 'Custom quality specialists'
                    },
                    'Premium Designers': { 
                        marketShare: 10, 
                        avgPrice: 3200, 
                        strength: 'Designer partnerships, luxury materials',
                        weakness: 'Very high pricing, limited market',
                        positioning: 'Ultra-luxury segment'
                    }
                },
                trends: {
                    growthRate: 12.5,
                    seasonality: {
                        spring: 35, // % of annual business
                        summer: 30,
                        fall: 25,
                        winter: 10
                    },
                    popularStyles: ['Modern', 'Transitional', 'Farmhouse', 'Contemporary'],
                    avgProjectSize: 42500,
                    avgTimeToClose: 23 // days
                }
            }
        };
        
        console.log('📊 Market intelligence loaded');
    }

    // Load email templates for different business types
    loadEmailTemplates() {
        this.emailTemplates = {
            foundry_cabinets: {
                welcome: {
                    subject: 'Welcome to Foundry Cabinets Co - Your Project Journey Begins',
                    body: `Dear {clientName},

Thank you for choosing Foundry Cabinets Co for your home transformation project. We're excited to work with you to create the kitchen of your dreams.

Your Project Details:
- Project: {projectName}
- Estimated Budget: {estimatedBudget}
- Timeline: {estimatedTimeline}

Next Steps:
1. Design consultation (within 3 business days)
2. Detailed measurements and planning
3. Materials selection and finalization
4. Project kickoff and installation

Our team of craftsmen brings decades of experience to every project, ensuring precision in every detail. You can track your project progress through our client portal at any time.

Questions? Reply to this email or call us at 360-606-1106.

Best regards,
The Foundry Cabinets Co Team
scott@ddbteam.com | www.ddb503.com

"Driven by Precision. Evolved by Design."`
                },
                followup: {
                    subject: 'Your Foundry Cabinets Project Update - {projectPhase}',
                    body: `Hi {clientName},

Your kitchen cabinet project is progressing beautifully! Here's your latest update:

Current Phase: {projectPhase}
Completion: {completionPercentage}%
Next Milestone: {nextMilestone}

Recent Progress:
{recentProgress}

Upcoming this week:
{upcomingTasks}

We'll keep you updated every step of the way. Check your client portal for photos and detailed progress tracking.

The Foundry Cabinets Co Team`
                },
                completion: {
                    subject: 'Project Complete! Your Beautiful New Kitchen Awaits',
                    body: `Congratulations {clientName}!

Your Foundry Cabinets Co kitchen transformation is complete! We're thrilled with how beautifully everything turned out and hope you love your new space as much as we enjoyed creating it.

Project Summary:
- Total Investment: {finalAmount}
- Completion Date: {completionDate}
- Warranty: 5-year comprehensive coverage

Your project gallery is available in the client portal, perfect for sharing with friends and family.

Thank you for trusting us with your home. We'd be honored if you'd consider leaving a review and referring friends who might need our services.

Enjoy your beautiful new kitchen!

The Foundry Cabinets Co Team`
                }
            },
            seattle_cabinets: {
                welcome: {
                    subject: 'Welcome to Seattle Premium Cabinets - Pacific Northwest Craftsmanship',
                    body: `Dear {clientName},

Welcome to the Seattle Premium Cabinets family! We're honored you've chosen our Pacific Northwest craftsmanship for your home.

Your project represents our commitment to blending traditional woodworking techniques with modern innovation. Every detail will reflect the quality and beauty of the Pacific Northwest.

Project Overview:
- Investment Level: {estimatedBudget}
- Craftsmanship Tier: {craftingTier}
- Expected Timeline: {estimatedTimeline}

Our Process:
1. Master craftsman consultation
2. Custom design development
3. Premium material selection
4. Expert installation and finishing

You'll work directly with our master craftsmen throughout the process, ensuring every detail meets our exacting standards.

Warm regards,
Seattle Premium Cabinets Team
info@seattlecabinets.com | 206-555-0123

"Where Innovation Meets Tradition."`
                }
                // Additional templates...
            },
            district_design: {
                welcome: {
                    subject: 'District Design Build - Architectural Excellence Begins',
                    body: `Dear {clientName},

Thank you for selecting District Design Build for your architectural millwork project. We specialize in creating spaces that seamlessly integrate with your architectural vision.

Your project will benefit from our expertise in custom architectural details and our commitment to building tomorrow's spaces today.

Project Scope:
- Architectural Focus: {architecturalStyle}
- Investment Level: {estimatedBudget}
- Design Phase: {designComplexity}

Our collaborative approach ensures every element serves both function and aesthetic vision. You'll work with our design team and craftsmen to realize your unique architectural goals.

Best regards,
District Design Build Team
projects@districtdesign.com | 503-555-0456

"Building Tomorrow's Spaces Today."`
                }
                // Additional templates...
            },
            luxury_kitchens: {
                welcome: {
                    subject: 'Welcome to Prestige Kitchen Studios - Your Luxury Experience Begins',
                    body: `Dear {clientName},

Welcome to Prestige Kitchen Studios, where luxury meets functionality in perfect harmony.

Your dedicated concierge team is ready to provide the white-glove service that defines the Prestige experience. Every aspect of your project will be managed with meticulous attention to detail.

Luxury Project Details:
- Prestige Level: {prestigeLevel}
- Investment: {estimatedBudget}
- Concierge Team: {conciergeTeam}

Your Prestige Experience Includes:
- 24/7 concierge support
- Museum-quality materials and craftsmanship
- Lifetime warranty on all work
- Exclusive client events and previews

Your concierge will contact you within 24 hours to schedule your private design consultation.

With distinction,
Prestige Kitchen Studios Concierge Team
concierge@prestigekitchens.com | 503-555-0789

"Where Luxury Meets Functionality."`
                }
                // Additional templates...
            }
        };
        
        console.log('📧 Email templates loaded for all configurations');
    }

    // Initialize analytics system
    initializeAnalytics() {
        // Load existing analytics from localStorage
        const storedAnalytics = localStorage.getItem('systemAnalytics');
        if (storedAnalytics) {
            try {
                this.analytics = JSON.parse(storedAnalytics);
            } catch (error) {
                console.warn('Failed to load analytics:', error);
                this.analytics = [];
            }
        }

        // Set up performance monitoring
        this.performanceMetrics = {
            pageLoadTimes: {},
            featureUsage: {},
            errorRates: {},
            conversionFunnels: {}
        };

        console.log('📊 Analytics system initialized');
    }

    // Setup CRM functionality
    setupCRM() {
        // Load existing leads
        const storedLeads = localStorage.getItem('crmLeads');
        if (storedLeads) {
            try {
                this.leads = JSON.parse(storedLeads);
            } catch (error) {
                console.warn('Failed to load CRM data:', error);
                this.leads = [];
            }
        }

        // Lead scoring system
        this.leadScoringRules = {
            'page_view': 1,
            'configurator_start': 5,
            'configurator_step_1': 3,
            'configurator_step_2': 5,
            'configurator_step_3': 8,
            'configurator_complete': 15,
            'pdf_download': 10,
            'contact_form': 20,
            'phone_call': 25,
            'email_response': 10,
            'return_visit': 5,
            'photo_gallery_view': 3,
            'virtual_tour': 8,
            'pricing_calculator': 12
        };

        console.log('🎯 CRM system initialized');
    }

    // Switch business configuration
    switchConfig(configName) {
        if (BUSINESS_CONFIGS[configName]) {
            this.currentConfig = configName;
            localStorage.setItem('businessConfig', configName);
            window.CONFIG = BUSINESS_CONFIGS[configName];
            
            // Apply visual changes
            this.applyConfigurationStyling(BUSINESS_CONFIGS[configName]);
            
            // Track configuration change
            this.trackEvent('config_switched', {
                newConfig: configName,
                timestamp: new Date().toISOString()
            });
            
            // Update active configuration buttons
            this.updateConfigurationUI(configName);
            
            console.log('✅ Configuration switched to:', configName);
            return true;
        }
        console.error('❌ Invalid configuration:', configName);
        return false;
    }

    // Apply configuration styling
    applyConfigurationStyling(config) {
        if (config.colors) {
            const root = document.documentElement;
            root.style.setProperty('--primary-gold', config.colors.primary);
            root.style.setProperty('--light-gold', config.colors.light);
            root.style.setProperty('--cream', config.colors.cream);
            root.style.setProperty('--warm-white', config.colors.warmWhite);
        }
    }

    // Update configuration UI buttons
    updateConfigurationUI(configName) {
        const buttons = document.querySelectorAll('.config-btn, .config-option, .config-demo-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.id === `btn-${configName}` || btn.id === `demo-btn-${configName}`) {
                btn.classList.add('active');
            }
        });
    }

    // Get current configuration
    getCurrentConfig() {
        return BUSINESS_CONFIGS[this.currentConfig] || BUSINESS_CONFIGS['foundry_cabinets'];
    }

    // Track events for analytics
    trackEvent(eventName, properties = {}) {
        const event = {
            timestamp: new Date().toISOString(),
            event: eventName,
            properties: {
                ...properties,
                config: this.currentConfig,
                sessionId: this.getSessionId(),
                userAgent: navigator.userAgent,
                url: window.location.href
            }
        };

        this.analytics.push(event);

        // Keep only last 1000 events
        if (this.analytics.length > 1000) {
            this.analytics = this.analytics.slice(-1000);
        }

        // Save to localStorage
        try {
            localStorage.setItem('systemAnalytics', JSON.stringify(this.analytics));
        } catch (error) {
            console.warn('Failed to save analytics:', error);
        }

        console.log('📊 Event tracked:', eventName, properties);
    }

    // Lead scoring system
    scoreInteraction(interactionType, value = 1, metadata = {}) {
        const baseScore = this.leadScoringRules[interactionType] || 1;
        const score = baseScore * value;

        // Get or create current lead session
        let currentLead = this.getCurrentLead();
        if (!currentLead) {
            currentLead = this.createNewLead();
        }

        // Add interaction to lead
        currentLead.interactions.push({
            type: interactionType,
            score: score,
            timestamp: new Date().toISOString(),
            metadata: metadata
        });

        // Update total score
        currentLead.totalScore += score;
        currentLead.lastActivity = new Date().toISOString();

        // Update lead status based on score
        this.updateLeadStatus(currentLead);

        // Save leads
        this.saveLeads();

        // Track high-value interactions
        if (currentLead.totalScore >= 50) {
            this.triggerHighValueLeadAction(currentLead);
        }

        console.log('🎯 Interaction scored:', interactionType, score, 'Total:', currentLead.totalScore);
        return currentLead.totalScore;
    }

    // Get current lead session
    getCurrentLead() {
        const sessionId = this.getSessionId();
        return this.leads.find(lead => lead.sessionId === sessionId && lead.status !== 'converted');
    }

    // Create new lead
    createNewLead() {
        const lead = {
            id: this.generateLeadId(),
            sessionId: this.getSessionId(),
            createdAt: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            totalScore: 0,
            status: 'new', // new, qualified, hot, converted, lost
            interactions: [],
            configuration: this.currentConfig,
            contactInfo: {},
            source: document.referrer || 'direct'
        };

        this.leads.push(lead);
        return lead;
    }

    // Update lead status based on score
    updateLeadStatus(lead) {
        if (lead.totalScore >= 100) {
            lead.status = 'hot';
        } else if (lead.totalScore >= 50) {
            lead.status = 'qualified';
        } else if (lead.totalScore >= 20) {
            lead.status = 'engaged';
        }
    }

    // Trigger high-value lead action
    triggerHighValueLeadAction(lead) {
        console.log('🔥 High-value lead detected:', lead.id, 'Score:', lead.totalScore);
        
        // Could trigger email notification, CRM update, etc.
        this.trackEvent('high_value_lead', {
            leadId: lead.id,
            score: lead.totalScore,
            configuration: lead.configuration
        });

        // Show notification in UI if available
        this.showLeadNotification(lead);
    }

    // Show lead notification in UI
    showLeadNotification(lead) {
        // This could be enhanced with a toast notification system
        if (typeof window.showNotification === 'function') {
            window.showNotification(`High-value lead detected! Score: ${lead.totalScore}`, 'success');
        }
    }

    // Get pricing recommendations based on market data
    getPricingRecommendations(projectType, budget) {
        const marketData = this.marketData.portland;
        const recommendations = {
            suggested: {},
            competitive: {},
            analysis: {}
        };

        // Analyze against market averages
        Object.entries(marketData.averagePricing).forEach(([tier, data]) => {
            const position = budget <= data.min ? 'below' : 
                           budget <= data.avg ? 'competitive' : 
                           budget <= data.max ? 'premium' : 'luxury';

            recommendations.suggested[tier] = {
                price: data.avg,
                position: position,
                marketShare: data.marketShare,
                winProbability: this.calculateWinProbability(budget, data)
            };
        });

        // Competitor analysis
        recommendations.competitive = this.getCompetitorAnalysis(budget);

        return recommendations;
    }

    // Calculate win probability based on pricing vs market
    calculateWinProbability(budget, marketData) {
        const ratio = budget / marketData.avg;
        
        if (ratio <= 0.8) return 0.95; // Very competitive
        if (ratio <= 0.9) return 0.85; // Competitive
        if (ratio <= 1.1) return 0.75; // Market rate
        if (ratio <= 1.2) return 0.60; // Slightly high
        if (ratio <= 1.5) return 0.40; // High
        return 0.20; // Very high
    }

    // Get competitor analysis
    getCompetitorAnalysis(budget) {
        const competitors = this.marketData.portland.competitors;
        const analysis = {};

        Object.entries(competitors).forEach(([name, data]) => {
            const ratio = budget / data.avgPrice;
            analysis[name] = {
                competitive: ratio <= 1.1,
                advantage: ratio < 0.9 ? 'price' : ratio > 1.1 ? 'value' : 'neutral',
                marketShare: data.marketShare,
                positioning: data.positioning
            };
        });

        return analysis;
    }

    // Get email template
    getEmailTemplate(templateType, configName = null) {
        const config = configName || this.currentConfig;
        return this.emailTemplates[config]?.[templateType] || null;
    }

    // Send email (placeholder for integration)
    async sendEmail(to, templateType, variables = {}) {
        const template = this.getEmailTemplate(templateType);
        if (!template) {
            throw new Error(`Template ${templateType} not found for ${this.currentConfig}`);
        }

        // Replace variables in template
        let subject = template.subject;
        let body = template.body;

        Object.entries(variables).forEach(([key, value]) => {
            const regex = new RegExp(`{${key}}`, 'g');
            subject = subject.replace(regex, value);
            body = body.replace(regex, value);
        });

        // In production, this would integrate with email service
        console.log('📧 Email prepared:', {
            to: to,
            subject: subject,
            preview: body.substring(0, 100) + '...'
        });

        // Track email event
        this.trackEvent('email_prepared', {
            template: templateType,
            recipient: to,
            configuration: this.currentConfig
        });

        return { subject, body, status: 'prepared' };
    }

    // Performance monitoring
    recordPerformanceMetric(metric, value, context = {}) {
        if (!this.performanceMetrics[metric]) {
            this.performanceMetrics[metric] = [];
        }

        this.performanceMetrics[metric].push({
            value: value,
            timestamp: new Date().toISOString(),
            context: context
        });

        // Keep only last 100 metrics per type
        if (this.performanceMetrics[metric].length > 100) {
            this.performanceMetrics[metric] = this.performanceMetrics[metric].slice(-100);
        }

        console.log('⚡ Performance metric recorded:', metric, value);
    }

    // Get analytics summary
    getAnalyticsSummary(days = 30) {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);

        const recentEvents = this.analytics.filter(event => 
            new Date(event.timestamp) >= cutoff
        );

        const summary = {
            totalEvents: recentEvents.length,
            uniqueSessions: new Set(recentEvents.map(e => e.properties.sessionId)).size,
            topEvents: {},
            configurationUsage: {},
            conversionFunnel: this.calculateConversionFunnel(recentEvents)
        };

        // Count event types
        recentEvents.forEach(event => {
            summary.topEvents[event.event] = (summary.topEvents[event.event] || 0) + 1;
            summary.configurationUsage[event.properties.config] = 
                (summary.configurationUsage[event.properties.config] || 0) + 1;
        });

        return summary;
    }

    // Calculate conversion funnel
    calculateConversionFunnel(events) {
        const funnel = {
            page_views: 0,
            configurator_starts: 0,
            configurator_completes: 0,
            contact_forms: 0,
            phone_calls: 0
        };

        events.forEach(event => {
            if (event.event === 'page_view') funnel.page_views++;
            if (event.event === 'configurator_start') funnel.configurator_starts++;
            if (event.event === 'configurator_complete') funnel.configurator_completes++;
            if (event.event === 'contact_form') funnel.contact_forms++;
            if (event.event === 'phone_call') funnel.phone_calls++;
        });

        return funnel;
    }

    // Export analytics data
    exportAnalyticsData(format = 'json') {
        const data = {
            analytics: this.analytics,
            leads: this.leads,
            performance: this.performanceMetrics,
            summary: this.getAnalyticsSummary()
        };

        if (format === 'csv') {
            return this.convertToCSV(data);
        }

        return JSON.stringify(data, null, 2);
    }

    // Utility functions
    getSessionId() {
        let sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
    }

    generateLeadId() {
        return 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    saveLeads() {
        try {
            localStorage.setItem('crmLeads', JSON.stringify(this.leads));
        } catch (error) {
            console.warn('Failed to save leads:', error);
        }
    }

    // Convert data to CSV format
    convertToCSV(data) {
        // Simplified CSV conversion - would be enhanced in production
        const csvLines = ['Event,Timestamp,Config,Properties'];
        
        data.analytics.forEach(event => {
            const line = [
                event.event,
                event.timestamp,
                event.properties.config,
                JSON.stringify(event.properties)
            ].join(',');
            csvLines.push(line);
        });

        return csvLines.join('\n');
    }
}

// Initialize enhanced configuration manager
const configManager = new ConfigurationManager();

// Global functions for backward compatibility
window.switchConfig = (configName) => configManager.switchConfig(configName);
window.trackEvent = (eventName, properties) => configManager.trackEvent(eventName, properties);
window.scoreInteraction = (type, value, metadata) => configManager.scoreInteraction(type, value, metadata);
window.getPricingRecommendations = (projectType, budget) => configManager.getPricingRecommendations(projectType, budget);
window.getEmailTemplate = (templateType, configName) => configManager.getEmailTemplate(templateType, configName);
window.sendEmail = (to, templateType, variables) => configManager.sendEmail(to, templateType, variables);
window.getAnalyticsSummary = (days) => configManager.getAnalyticsSummary(days);
window.exportAnalyticsData = (format) => configManager.exportAnalyticsData(format);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConfigurationManager;
}

// Make configuration manager globally available
window.configManager = configManager;

console.log('🚀 Enhanced Configuration System loaded successfully');
