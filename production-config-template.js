// Production Configuration Template
// Replace placeholders with your actual values before going live

// ==========================================
// 🚀 PRODUCTION CONFIGURATION CHECKLIST
// ==========================================
/*
BEFORE LAUNCHING, ENSURE YOU HAVE:
□ Replaced all "YOUR_" placeholders with real values
□ Set up EmailJS account and templates
□ Configured Stripe for payments (if enabled)
□ Added SSL certificate (HTTPS)
□ Tested complete customer journey
□ Updated company branding and contact info
*/

class ProductionConfiguration {
    constructor() {
        this.environment = 'production';
        this.setupDate = new Date().toISOString();
        this.version = '3.0-production';
        
        // Validate configuration on initialization
        this.validateConfiguration();
        this.init();
    }

    init() {
        console.log('🚀 Production Configuration Loading...');
        this.applyConfiguration();
        this.initializeIntegrations();
        this.setupAnalytics();
        this.logStatus();
    }

    // ==========================================
    // 🔑 API KEYS & CREDENTIALS
    // ==========================================
    loadAPIKeys() {
        return {
            // EmailJS Configuration (required for email automation)
            emailjs: {
                userId: 'YOUR_EMAILJS_USER_ID',          // Get from EmailJS dashboard
                serviceId: 'YOUR_EMAILJS_SERVICE_ID',    // Your email service ID
                templateIds: {
                    welcome: 'YOUR_WELCOME_TEMPLATE_ID',     // Welcome email template
                    followUp: 'YOUR_FOLLOWUP_TEMPLATE_ID',   // Follow-up email template
                    proposal: 'YOUR_PROPOSAL_TEMPLATE_ID',   // Proposal email template
                    reminder: 'YOUR_REMINDER_TEMPLATE_ID'    // Reminder email template
                }
            },

            // Stripe Payment Processing (optional but recommended)
            stripe: {
                publishableKey: 'YOUR_STRIPE_PUBLISHABLE_KEY',  // pk_live_... for production
                enabled: false  // Set to true when ready to accept payments
            },

            // Analytics Integration (optional)
            analytics: {
                googleAnalytics: 'YOUR_GA_MEASUREMENT_ID',   // Google Analytics 4 ID
                mixpanel: 'YOUR_MIXPANEL_PROJECT_TOKEN'      // Mixpanel project token
            },

            // CRM Integration (optional)
            crm: {
                hubspotKey: 'YOUR_HUBSPOT_API_KEY',
                salesforceKey: 'YOUR_SALESFORCE_API_KEY'
            }
        };
    }

    // ==========================================
    // 🏢 COMPANY INFORMATION
    // ==========================================
    getCompanyInfo() {
        return {
            name: 'YOUR_COMPANY_NAME',                    // e.g., "Smith Custom Cabinets"
            tagline: 'YOUR_COMPANY_TAGLINE',              // e.g., "Quality Craftsmanship Since 1995"
            email: 'YOUR_CONTACT_EMAIL',                  // e.g., "info@smithcabinets.com"
            phone: 'YOUR_CONTACT_PHONE',                  // e.g., "(555) 123-4567"
            website: 'YOUR_WEBSITE_URL',                  // e.g., "https://smithcabinets.com"
            address: {
                street: 'YOUR_STREET_ADDRESS',            // e.g., "123 Workshop Lane"
                city: 'YOUR_CITY',                        // e.g., "Springfield"
                state: 'YOUR_STATE',                      // e.g., "IL"
                zip: 'YOUR_ZIP_CODE'                      // e.g., "62701"
            },
            social: {
                facebook: 'YOUR_FACEBOOK_URL',            // Optional
                instagram: 'YOUR_INSTAGRAM_URL',          // Optional
                linkedin: 'YOUR_LINKEDIN_URL'             // Optional
            }
        };
    }

    // ==========================================
    // 💰 BUSINESS RULES & PRICING
    // ==========================================
    loadBusinessRules() {
        return {
            pricing: {
                // Base pricing for different project types
                kitchen: 15000,           // Starting price for kitchen remodels
                bathroom: 3500,           // Starting price for bathroom vanities
                custom: 0,                // Custom projects require quotes
                
                // Deposit and payment rules
                depositPercent: 25,       // Percentage required as deposit (10-50%)
                minDeposit: 500,          // Minimum deposit amount
                maxDeposit: 5000,         // Maximum deposit amount
                
                // Premium pricing modifiers
                rushPremium: 15,          // Percentage increase for rush jobs
                designFee: 500,           // One-time design consultation fee
                
                // Warranty and service
                warrantyYears: 2,         // Standard warranty period
                serviceRadius: 50         // Service area radius in miles
            },

            // Lead scoring algorithm
            leadScoring: {
                email: 5,                 // Points for providing email
                phone: 10,                // Points for providing phone
                projectType: {
                    kitchen: 15,          // Kitchen remodels get highest score
                    bathroom: 10,
                    custom: 20            // Custom projects often high-value
                },
                projectValue: {
                    under15k: 5,
                    '15k-30k': 10,
                    '30k-50k': 15,
                    over50k: 20
                },
                timeline: {
                    asap: 20,             // Urgent projects score high
                    '1-3months': 15,
                    '3-6months': 10,
                    over6months: 5
                }
            },

            // Email automation settings
            automation: {
                welcomeEmail: {
                    enabled: true,        // Send welcome email to new leads
                    delay: 5,             // Delay in minutes
                    template: 'welcome'
                },
                followUpEmail: {
                    enabled: true,        // Send follow-up email
                    delay: 72,            // Delay in hours (3 days)
                    template: 'followUp'
                },
                reminderEmail: {
                    enabled: true,        // Send reminder if no response
                    delay: 168,           // Delay in hours (1 week)
                    template: 'reminder'
                }
            },

            // Notification settings
            notifications: {
                newLead: true,            // Notify on new lead
                highValueLead: true,      // Notify on leads > $40k
                overdueFollowup: true,    // Notify on overdue follow-ups
                paymentReceived: true     // Notify on successful payments
            }
        };
    }

    // ==========================================
    // 🔧 CONFIGURATION VALIDATION
    // ==========================================
    validateConfiguration() {
        const issues = [];
        const apiKeys = this.loadAPIKeys();
        const company = this.getCompanyInfo();
        
        // Check company information
        if (company.name.includes('YOUR_')) {
            issues.push('Company name not configured');
        }
        if (company.email.includes('YOUR_')) {
            issues.push('Contact email not configured');
        }
        if (company.phone.includes('YOUR_')) {
            issues.push('Contact phone not configured');
        }

        // Check EmailJS setup (if email automation is desired)
        if (apiKeys.emailjs.userId.includes('YOUR_')) {
            issues.push('EmailJS not configured - email automation disabled');
        }

        // Check Stripe setup (if payments are enabled)
        if (apiKeys.stripe.enabled && apiKeys.stripe.publishableKey.includes('YOUR_')) {
            issues.push('Stripe not configured but payments are enabled');
        }

        // Check SSL requirement for payments
        if (apiKeys.stripe.enabled && !window.location.protocol.includes('https')) {
            issues.push('HTTPS required for payment processing');
        }

        // Log issues
        if (issues.length > 0) {
            console.warn('⚠️ Configuration Issues Found:', issues);
            this.showConfigurationAlert(issues);
        } else {
            console.log('✅ Configuration validation passed');
        }

        return issues;
    }

    showConfigurationAlert(issues) {
        // Show user-friendly alert about configuration issues
        if (document.body) {
            const alertDiv = document.createElement('div');
            alertDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                max-width: 400px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            `;
            
            alertDiv.innerHTML = `
                <div style="font-weight: 600; margin-bottom: 8px;">⚠️ Configuration Needed</div>
                <div style="font-size: 14px; margin-bottom: 12px;">
                    Some configuration is required for full functionality:
                    <ul style="margin: 8px 0; padding-left: 20px;">
                        ${issues.map(issue => `<li>${issue}</li>`).join('')}
                    </ul>
                </div>
                <button onclick="window.open('go-live-setup.html', '_blank')" 
                        style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 14px;">
                    🚀 Setup Wizard
                </button>
                <button onclick="this.parentElement.remove()" 
                        style="background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 14px; margin-left: 8px;">
                    Dismiss
                </button>
            `;
            
            document.body.appendChild(alertDiv);
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                if (alertDiv.parentElement) {
                    alertDiv.remove();
                }
            }, 10000);
        }
    }

    // ==========================================
    // 📊 ANALYTICS & TRACKING
    // ==========================================
    setupAnalytics() {
        const analytics = this.loadAPIKeys().analytics;
        
        // Initialize Google Analytics if configured
        if (analytics.googleAnalytics && !analytics.googleAnalytics.includes('YOUR_')) {
            this.initGoogleAnalytics(analytics.googleAnalytics);
        }

        // Initialize Mixpanel if configured
        if (analytics.mixpanel && !analytics.mixpanel.includes('YOUR_')) {
            this.initMixpanel(analytics.mixpanel);
        }

        // Set up built-in analytics
        this.initBuiltinAnalytics();
    }

    initGoogleAnalytics(measurementId) {
        // Google Analytics 4 implementation
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.textContent = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
        `;
        document.head.appendChild(script2);

        console.log('✅ Google Analytics initialized');
    }

    initMixpanel(projectToken) {
        // Mixpanel implementation
        const script = document.createElement('script');
        script.textContent = `
            (function(c,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,f=k.hash;d=function(a,b){return(m=a.match(RegExp(b+"=([^&]*)")))?m[1]:null};f&&d(f,"state")&&(j=JSON.parse(decodeURIComponent(d(f,"state"))),"mpeditor"===j.action&&(b.sessionStorage.setItem("_mpcehash",f),history.replaceState(j.desiredHash||"",c.title,k.pathname+k.search)))}catch(n){}var l,h;window.mixpanel=a;a._i=[];a.init=function(b,d,g){function c(b,i){var a=i.split(".");2==a.length&&(b=b[a[0]],i=a[1]);b[i]=function(){b.push([i].concat(Array.prototype.slice.call(arguments,0)))}}var e=a;"undefined"!==typeof g?e=a[g]=[]:g="mixpanel";e.people=e.people||[];e.toString=function(b){var a="mixpanel";"mixpanel"!==g&&(a+="."+g);b||(a+=" (stub)");return a};e.people.toString=function(){return e.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<l.length;h++)c(e,l[h]);var f="set set_once union unset remove delete".split(" ");e.get_group=function(){function a(c){b[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));e.push([d,call2])}}for(var b={},d=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<f.length;c++)a(f[c]);return b};a._i.push([b,d,g])};a.__SV=1.2;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===c.location.protocol&&"//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js";d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d)}})(document,window.mixpanel||[]);
            mixpanel.init('${projectToken}');
        `;
        document.head.appendChild(script);

        console.log('✅ Mixpanel initialized');
    }

    initBuiltinAnalytics() {
        // Initialize built-in analytics system
        window.cabinetAnalytics = {
            leads: JSON.parse(localStorage.getItem('cabinet_leads') || '[]'),
            sessions: JSON.parse(localStorage.getItem('cabinet_sessions') || '[]'),
            
            track: (event, data) => {
                const record = {
                    event,
                    data,
                    timestamp: new Date().toISOString(),
                    sessionId: this.getSessionId()
                };
                
                const sessions = JSON.parse(localStorage.getItem('cabinet_sessions') || '[]');
                sessions.push(record);
                localStorage.setItem('cabinet_sessions', JSON.stringify(sessions));
                
                // Send to external analytics if configured
                if (window.gtag) {
                    gtag('event', event, data);
                }
                if (window.mixpanel) {
                    mixpanel.track(event, data);
                }
            }
        };

        console.log('✅ Built-in analytics initialized');
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('cabinet_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('cabinet_session_id', sessionId);
        }
        return sessionId;
    }

    // ==========================================
    // 🎨 APPLY CONFIGURATION TO PAGE
    // ==========================================
    applyConfiguration() {
        try {
            const company = this.getCompanyInfo();
            
            // Update document title
            if (document.title.includes('Cabinet')) {
                document.title = document.title.replace(/.*Cabinet.*/, `${company.name} - Professional Cabinet Services`);
            }

            // Update company name throughout the page
            this.updateElementText('h1, .company-name, [data-company-name]', (text) => {
                return text.replace(/Foundry Cabinets Co|Your Cabinet Company|YOUR_COMPANY_NAME/gi, company.name);
            });

            // Update tagline
            this.updateElementText('.tagline, [data-tagline]', () => company.tagline);

            // Update contact information
            this.updateContactInfo(company);

            // Update pricing if elements exist
            this.updatePricing();

            console.log('✅ Page configuration applied');
        } catch (error) {
            console.error('❌ Error applying configuration:', error);
        }
    }

    updateElementText(selector, updateFunction) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const newText = typeof updateFunction === 'function' 
                ? updateFunction(element.textContent) 
                : updateFunction;
            
            if (newText && !newText.includes('YOUR_')) {
                element.textContent = newText;
            }
        });
    }

    updateContactInfo(company) {
        // Update email elements
        const emailElements = document.querySelectorAll('[data-contact-email], .contact-email');
        emailElements.forEach(el => {
            if (!company.email.includes('YOUR_')) {
                el.textContent = company.email;
                if (el.tagName === 'A') {
                    el.href = `mailto:${company.email}`;
                }
            }
        });

        // Update phone elements
        const phoneElements = document.querySelectorAll('[data-contact-phone], .contact-phone');
        phoneElements.forEach(el => {
            if (!company.phone.includes('YOUR_')) {
                el.textContent = company.phone;
                if (el.tagName === 'A') {
                    el.href = `tel:${company.phone.replace(/[^0-9]/g, '')}`;
                }
            }
        });
    }

    updatePricing() {
        const rules = this.loadBusinessRules();
        
        // Update pricing displays
        const kitchenPrice = document.querySelector('[data-kitchen-price]');
        if (kitchenPrice) {
            kitchenPrice.textContent = `Starting at $${rules.pricing.kitchen.toLocaleString()}`;
        }

        const bathroomPrice = document.querySelector('[data-bathroom-price]');
        if (bathroomPrice) {
            bathroomPrice.textContent = `Starting at $${rules.pricing.bathroom.toLocaleString()}`;
        }
    }

    // ==========================================
    // 🔗 INITIALIZE INTEGRATIONS
    // ==========================================
    initializeIntegrations() {
        this.initEmailJS();
        this.initStripe();
        console.log('✅ Integrations initialized');
    }

    initEmailJS() {
        const apiKeys = this.loadAPIKeys();
        
        if (!apiKeys.emailjs.userId.includes('YOUR_')) {
            // Load EmailJS library
            const script = document.createElement('script');
            script.src = 'https://cdn.emailjs.com/dist/email.min.js';
            script.onload = () => {
                emailjs.init(apiKeys.emailjs.userId);
                console.log('✅ EmailJS initialized');
            };
            document.head.appendChild(script);
        }
    }

    initStripe() {
        const apiKeys = this.loadAPIKeys();
        
        if (apiKeys.stripe.enabled && !apiKeys.stripe.publishableKey.includes('YOUR_')) {
            // Load Stripe library
            const script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/';
            script.onload = () => {
                window.stripe = Stripe(apiKeys.stripe.publishableKey);
                console.log('✅ Stripe initialized');
            };
            document.head.appendChild(script);
        }
    }

    // ==========================================
    // 📊 STATUS LOGGING
    // ==========================================
    logStatus() {
        const company = this.getCompanyInfo();
        const apiKeys = this.loadAPIKeys();
        
        console.log(`
🚀 CABINET BUSINESS SYSTEM - PRODUCTION STATUS
================================================
📅 Setup Date: ${this.setupDate}
🏢 Company: ${company.name}
📧 Email: ${company.email}
📞 Phone: ${company.phone}

🔌 INTEGRATIONS:
• EmailJS: ${!apiKeys.emailjs.userId.includes('YOUR_') ? '✅ Configured' : '❌ Not configured'}
• Stripe: ${apiKeys.stripe.enabled ? '✅ Enabled' : '❌ Disabled'}
• Analytics: ${!apiKeys.analytics.googleAnalytics.includes('YOUR_') ? '✅ GA4 Ready' : '❌ GA4 Not configured'}

🔒 SECURITY:
• HTTPS: ${window.location.protocol === 'https:' ? '✅ Secure' : '❌ SSL Required'}
• API Keys: ${this.validateConfiguration().length === 0 ? '✅ Valid' : '⚠️ Issues found'}

================================================
        `);
    }
}

// Initialize production configuration
const productionConfig = new ProductionConfiguration();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productionConfig;
}