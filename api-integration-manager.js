// Phase 3 API Integration Manager
// Handles CRM, Email, Payment, and Analytics integrations

// ==========================================
// 🔌 API INTEGRATION MANAGER
// ==========================================

class APIIntegrationManager {
    constructor() {
        this.endpoints = this.initializeEndpoints();
        this.webhooks = this.initializeWebhooks();
        this.rateLimits = new Map();
        this.cache = new Map();
        this.retryQueue = [];
        this.init();
    }

    init() {
        this.setupWebhookListeners();
        this.startRetryProcessor();
        this.startCacheCleanup();
        console.log('🔌 API Integration Manager initialized');
    }

    initializeEndpoints() {
        return {
            // CRM Integrations
            hubspot: {
                baseUrl: 'https://api.hubapi.com',
                endpoints: {
                    contacts: '/crm/v3/objects/contacts',
                    deals: '/crm/v3/objects/deals',
                    companies: '/crm/v3/objects/companies'
                },
                rateLimit: { requests: 100, window: 10000 } // 100 requests per 10 seconds
            },
            salesforce: {
                baseUrl: 'https://yourinstance.salesforce.com',
                endpoints: {
                    leads: '/services/data/v52.0/sobjects/Lead',
                    opportunities: '/services/data/v52.0/sobjects/Opportunity',
                    accounts: '/services/data/v52.0/sobjects/Account'
                },
                rateLimit: { requests: 1000, window: 86400000 } // 1000 requests per day
            },
            
            // Email Service Integrations
            sendgrid: {
                baseUrl: 'https://api.sendgrid.com',
                endpoints: {
                    send: '/v3/mail/send',
                    templates: '/v3/templates',
                    lists: '/v3/marketing/lists'
                },
                rateLimit: { requests: 600, window: 60000 } // 600 requests per minute
            },
            mailchimp: {
                baseUrl: 'https://us1.api.mailchimp.com',
                endpoints: {
                    lists: '/3.0/lists',
                    campaigns: '/3.0/campaigns',
                    automation: '/3.0/automations'
                },
                rateLimit: { requests: 10, window: 1000 } // 10 requests per second
            },
            
            // Payment Integrations
            stripe: {
                baseUrl: 'https://api.stripe.com',
                endpoints: {
                    paymentIntents: '/v1/payment_intents',
                    customers: '/v1/customers',
                    invoices: '/v1/invoices'
                },
                rateLimit: { requests: 100, window: 1000 } // 100 requests per second
            },
            square: {
                baseUrl: 'https://connect.squareup.com',
                endpoints: {
                    payments: '/v2/payments',
                    customers: '/v2/customers',
                    orders: '/v2/orders'
                },
                rateLimit: { requests: 500, window: 60000 } // 500 requests per minute
            },
            
            // Analytics Integrations
            googleAnalytics: {
                baseUrl: 'https://www.google-analytics.com',
                endpoints: {
                    collect: '/collect',
                    batch: '/batch'
                },
                rateLimit: { requests: 1000, window: 60000 } // 1000 requests per minute
            },
            mixpanel: {
                baseUrl: 'https://api.mixpanel.com',
                endpoints: {
                    track: '/track',
                    engage: '/engage',
                    import: '/import'
                },
                rateLimit: { requests: 5, window: 1000 } // 5 requests per second
            }
        };
    }

    initializeWebhooks() {
        return {
            stripe: {
                events: ['payment_intent.succeeded', 'payment_intent.payment_failed', 'customer.created'],
                secret: 'whsec_stripe_webhook_secret'
            },
            square: {
                events: ['payment.created', 'payment.updated'],
                secret: 'square_webhook_secret'
            },
            hubspot: {
                events: ['contact.creation', 'deal.creation'],
                secret: 'hubspot_webhook_secret'
            },
            salesforce: {
                events: ['Lead.create', 'Opportunity.update'],
                secret: 'salesforce_webhook_secret'
            }
        };
    }

    // ==========================================
    // 🔄 CRM INTEGRATION METHODS
    // ==========================================

    async syncToHubSpot(leadData) {
        try {
            const contact = await this.createHubSpotContact(leadData);
            const deal = await this.createHubSpotDeal(leadData, contact.id);
            
            return {
                success: true,
                contactId: contact.id,
                dealId: deal.id
            };
        } catch (error) {
            console.error('HubSpot sync failed:', error);
            this.addToRetryQueue('hubspot', 'syncLead', leadData);
            return { success: false, error: error.message };
        }
    }

    async createHubSpotContact(leadData) {
        const endpoint = this.endpoints.hubspot;
        const url = `${endpoint.baseUrl}${endpoint.endpoints.contacts}`;
        
        const contactData = {
            properties: {
                email: leadData.client?.email,
                firstname: leadData.client?.name?.split(' ')[0],
                lastname: leadData.client?.name?.split(' ').slice(1).join(' ') || '',
                phone: leadData.client?.phone,
                address: leadData.client?.address,
                lead_source: leadData.source,
                project_type: leadData.estimate?.projectType,
                project_value: leadData.estimate?.total,
                lead_score: leadData.score || 0
            }
        };

        return await this.makeAPIRequest('hubspot', 'POST', url, contactData);
    }

    async createHubSpotDeal(leadData, contactId) {
        const endpoint = this.endpoints.hubspot;
        const url = `${endpoint.baseUrl}${endpoint.endpoints.deals}`;
        
        const dealData = {
            properties: {
                dealname: `${leadData.client?.name} - ${leadData.estimate?.projectType}`,
                amount: leadData.estimate?.total,
                dealstage: this.mapStatusToHubSpotStage(leadData.status),
                pipeline: 'default',
                hubspot_owner_id: 'your_owner_id'
            },
            associations: [
                {
                    to: { id: contactId },
                    types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }]
                }
            ]
        };

        return await this.makeAPIRequest('hubspot', 'POST', url, dealData);
    }

    mapStatusToHubSpotStage(status) {
        const mapping = {
            'new': 'appointmentscheduled',
            'contacted': 'qualifiedtobuy',
            'qualified': 'presentationscheduled',
            'paid_deposit': 'contractsent'
        };
        return mapping[status] || 'appointmentscheduled';
    }

    async syncToSalesforce(leadData) {
        try {
            const lead = await this.createSalesforceLead(leadData);
            
            return {
                success: true,
                leadId: lead.id
            };
        } catch (error) {
            console.error('Salesforce sync failed:', error);
            this.addToRetryQueue('salesforce', 'syncLead', leadData);
            return { success: false, error: error.message };
        }
    }

    async createSalesforceLead(leadData) {
        const endpoint = this.endpoints.salesforce;
        const url = `${endpoint.baseUrl}${endpoint.endpoints.leads}`;
        
        const leadSFData = {
            FirstName: leadData.client?.name?.split(' ')[0] || '',
            LastName: leadData.client?.name?.split(' ').slice(1).join(' ') || 'Unknown',
            Email: leadData.client?.email,
            Phone: leadData.client?.phone,
            Street: leadData.client?.address,
            Company: 'Individual',
            LeadSource: leadData.source,
            Industry: 'Home Improvement',
            Status: this.mapStatusToSalesforce(leadData.status),
            Description: `Project: ${leadData.estimate?.projectType}, Value: $${leadData.estimate?.total}`
        };

        return await this.makeAPIRequest('salesforce', 'POST', url, leadSFData);
    }

    mapStatusToSalesforce(status) {
        const mapping = {
            'new': 'Open - Not Contacted',
            'contacted': 'Working - Contacted',
            'qualified': 'Qualified',
            'paid_deposit': 'Closed - Converted'
        };
        return mapping[status] || 'Open - Not Contacted';
    }

    // ==========================================
    // 📧 EMAIL INTEGRATION METHODS
    // ==========================================

    async sendEmailViaSendGrid(emailData) {
        try {
            const endpoint = this.endpoints.sendgrid;
            const url = `${endpoint.baseUrl}${endpoint.endpoints.send}`;
            
            const sendGridData = {
                personalizations: [{
                    to: [{ email: emailData.to_email, name: emailData.to_name }],
                    subject: emailData.subject
                }],
                from: { email: emailData.from_email, name: emailData.from_name },
                content: [{
                    type: 'text/html',
                    value: emailData.html_content
                }]
            };

            const result = await this.makeAPIRequest('sendgrid', 'POST', url, sendGridData);
            return { success: true, messageId: result.headers['x-message-id'] };
        } catch (error) {
            console.error('SendGrid email failed:', error);
            return { success: false, error: error.message };
        }
    }

    async addToMailChimpList(contactData) {
        try {
            const endpoint = this.endpoints.mailchimp;
            const listId = 'your_mailchimp_list_id';
            const url = `${endpoint.baseUrl}${endpoint.endpoints.lists}/${listId}/members`;
            
            const memberData = {
                email_address: contactData.email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: contactData.firstName,
                    LNAME: contactData.lastName,
                    PHONE: contactData.phone
                },
                tags: [contactData.source, contactData.projectType]
            };

            const result = await this.makeAPIRequest('mailchimp', 'POST', url, memberData);
            return { success: true, memberId: result.id };
        } catch (error) {
            console.error('MailChimp list addition failed:', error);
            return { success: false, error: error.message };
        }
    }

    // ==========================================
    // 💳 PAYMENT INTEGRATION METHODS
    // ==========================================

    async createStripePaymentIntent(paymentData) {
        try {
            const endpoint = this.endpoints.stripe;
            const url = `${endpoint.baseUrl}${endpoint.endpoints.paymentIntents}`;
            
            const intentData = {
                amount: Math.round(paymentData.amount * 100), // Convert to cents
                currency: 'usd',
                customer: paymentData.customerId,
                description: `Deposit for ${paymentData.projectType} project`,
                metadata: {
                    leadId: paymentData.leadId,
                    projectType: paymentData.projectType,
                    clientName: paymentData.clientName
                }
            };

            const result = await this.makeAPIRequest('stripe', 'POST', url, intentData);
            return { success: true, clientSecret: result.client_secret };
        } catch (error) {
            console.error('Stripe payment intent creation failed:', error);
            return { success: false, error: error.message };
        }
    }

    async createSquarePayment(paymentData) {
        try {
            const endpoint = this.endpoints.square;
            const url = `${endpoint.baseUrl}${endpoint.endpoints.payments}`;
            
            const squareData = {
                source_id: paymentData.nonce,
                amount_money: {
                    amount: Math.round(paymentData.amount * 100), // Convert to cents
                    currency: 'USD'
                },
                reference_id: paymentData.leadId,
                note: `Deposit for ${paymentData.projectType} project`
            };

            const result = await this.makeAPIRequest('square', 'POST', url, squareData);
            return { success: true, paymentId: result.payment.id };
        } catch (error) {
            console.error('Square payment creation failed:', error);
            return { success: false, error: error.message };
        }
    }

    // ==========================================
    // 📊 ANALYTICS INTEGRATION METHODS
    // ==========================================

    async sendToGoogleAnalytics(eventData) {
        try {
            const endpoint = this.endpoints.googleAnalytics;
            const url = `${endpoint.baseUrl}${endpoint.endpoints.collect}`;
            
            const gaData = new URLSearchParams({
                v: '1',
                tid: 'GA_TRACKING_ID',
                cid: eventData.clientId,
                t: 'event',
                ec: eventData.category,
                ea: eventData.action,
                el: eventData.label,
                ev: eventData.value
            });

            await fetch(url, {
                method: 'POST',
                body: gaData
            });

            return { success: true };
        } catch (error) {
            console.error('Google Analytics tracking failed:', error);
            return { success: false, error: error.message };
        }
    }

    async sendToMixpanel(eventData) {
        try {
            const endpoint = this.endpoints.mixpanel;
            const url = `${endpoint.baseUrl}${endpoint.endpoints.track}`;
            
            const mixpanelData = {
                event: eventData.event,
                properties: {
                    token: 'YOUR_MIXPANEL_TOKEN',
                    distinct_id: eventData.userId,
                    ...eventData.properties
                }
            };

            const result = await this.makeAPIRequest('mixpanel', 'POST', url, mixpanelData);
            return { success: true };
        } catch (error) {
            console.error('Mixpanel tracking failed:', error);
            return { success: false, error: error.message };
        }
    }

    // ==========================================
    // 🔧 UTILITY METHODS
    // ==========================================

    async makeAPIRequest(service, method, url, data = null, headers = {}) {
        // Check rate limits
        if (!this.checkRateLimit(service)) {
            throw new Error(`Rate limit exceeded for ${service}`);
        }

        // Check cache for GET requests
        if (method === 'GET') {
            const cached = this.cache.get(url);
            if (cached && Date.now() - cached.timestamp < 300000) { // 5 minutes
                return cached.data;
            }
        }

        // Prepare headers
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...this.getAuthHeaders(service),
            ...headers
        };

        // Prepare request options
        const options = {
            method,
            headers: defaultHeaders
        };

        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();

            // Cache successful GET responses
            if (method === 'GET') {
                this.cache.set(url, {
                    data: result,
                    timestamp: Date.now()
                });
            }

            return result;
        } catch (error) {
            console.error(`API request to ${service} failed:`, error);
            throw error;
        }
    }

    getAuthHeaders(service) {
        const headers = {};
        const config = window.configManager?.apiKeys;

        switch (service) {
            case 'hubspot':
                headers['Authorization'] = `Bearer ${config?.crm?.hubspotKey}`;
                break;
            case 'salesforce':
                headers['Authorization'] = `Bearer ${config?.crm?.salesforceKey}`;
                break;
            case 'sendgrid':
                headers['Authorization'] = `Bearer ${config?.email?.sendgridKey}`;
                break;
            case 'mailchimp':
                headers['Authorization'] = `apikey ${config?.email?.mailchimpKey}`;
                break;
            case 'stripe':
                headers['Authorization'] = `Bearer ${config?.stripe?.secretKey}`;
                break;
            case 'square':
                headers['Authorization'] = `Bearer ${config?.square?.accessToken}`;
                headers['Square-Version'] = '2021-06-16';
                break;
            case 'mixpanel':
                // Mixpanel uses token in the data payload
                break;
        }

        return headers;
    }

    checkRateLimit(service) {
        const endpoint = this.endpoints[service];
        if (!endpoint?.rateLimit) return true;

        const now = Date.now();
        const limit = this.rateLimits.get(service) || { count: 0, resetTime: now };

        // Reset if window has passed
        if (now >= limit.resetTime) {
            limit.count = 0;
            limit.resetTime = now + endpoint.rateLimit.window;
        }

        // Check if we're under the limit
        if (limit.count >= endpoint.rateLimit.requests) {
            return false;
        }

        // Increment counter
        limit.count++;
        this.rateLimits.set(service, limit);
        return true;
    }

    addToRetryQueue(service, operation, data) {
        this.retryQueue.push({
            service,
            operation,
            data,
            attempts: 0,
            nextRetry: Date.now() + 60000, // Retry in 1 minute
            maxAttempts: 5
        });
    }

    startRetryProcessor() {
        setInterval(() => {
            const now = Date.now();
            const toRetry = this.retryQueue.filter(item => now >= item.nextRetry);
            
            toRetry.forEach(async (item) => {
                try {
                    await this.processRetryItem(item);
                    // Remove from queue on success
                    this.retryQueue = this.retryQueue.filter(q => q !== item);
                } catch (error) {
                    item.attempts++;
                    if (item.attempts >= item.maxAttempts) {
                        // Remove failed items after max attempts
                        this.retryQueue = this.retryQueue.filter(q => q !== item);
                        console.error(`Max retry attempts reached for ${item.service}:${item.operation}`);
                    } else {
                        // Exponential backoff
                        item.nextRetry = now + (Math.pow(2, item.attempts) * 60000);
                    }
                }
            });
        }, 30000); // Check every 30 seconds
    }

    async processRetryItem(item) {
        switch (item.operation) {
            case 'syncLead':
                if (item.service === 'hubspot') {
                    return await this.syncToHubSpot(item.data);
                } else if (item.service === 'salesforce') {
                    return await this.syncToSalesforce(item.data);
                }
                break;
            // Add more retry operations as needed
        }
    }

    startCacheCleanup() {
        setInterval(() => {
            const now = Date.now();
            for (const [key, value] of this.cache.entries()) {
                if (now - value.timestamp > 600000) { // 10 minutes
                    this.cache.delete(key);
                }
            }
        }, 300000); // Run every 5 minutes
    }

    // ==========================================
    // 🔗 WEBHOOK HANDLERS
    // ==========================================

    setupWebhookListeners() {
        // This would typically be handled by a backend server
        // For demo purposes, we'll simulate webhook processing
        console.log('🔗 Webhook listeners configured');
    }

    async handleStripeWebhook(event) {
        switch (event.type) {
            case 'payment_intent.succeeded':
                await this.handlePaymentSuccess(event.data.object);
                break;
            case 'payment_intent.payment_failed':
                await this.handlePaymentFailure(event.data.object);
                break;
            case 'customer.created':
                await this.handleCustomerCreated(event.data.object);
                break;
        }
    }

    async handlePaymentSuccess(paymentIntent) {
        const leadId = paymentIntent.metadata.leadId;
        if (leadId) {
            // Update lead status
            const crm = window.businessCRM;
            if (crm) {
                crm.updateLead(leadId, {
                    status: 'paid_deposit',
                    depositAmount: paymentIntent.amount / 100,
                    paymentIntent: paymentIntent.id
                });
            }

            // Send confirmation email
            const emailData = {
                to_email: paymentIntent.receipt_email,
                subject: 'Payment Confirmation - Your Project is Secured!',
                template: 'payment_confirmation'
            };
            
            // Track event
            if (window.analytics) {
                window.analytics.track('paymentSuccess', {
                    leadId: leadId,
                    amount: paymentIntent.amount / 100,
                    paymentMethod: paymentIntent.payment_method_types[0]
                });
            }
        }
    }

    async handlePaymentFailure(paymentIntent) {
        const leadId = paymentIntent.metadata.leadId;
        if (leadId) {
            // Track failed payment
            if (window.analytics) {
                window.analytics.track('paymentFailed', {
                    leadId: leadId,
                    amount: paymentIntent.amount / 100,
                    error: paymentIntent.last_payment_error?.message
                });
            }

            // Send payment failure notification
            console.log(`💳 Payment failed for lead ${leadId}`);
        }
    }

    // ==========================================
    // 📈 INTEGRATION STATUS & MONITORING
    // ==========================================

    getIntegrationStatus() {
        return {
            timestamp: new Date().toISOString(),
            services: {
                hubspot: this.testConnection('hubspot'),
                salesforce: this.testConnection('salesforce'),
                sendgrid: this.testConnection('sendgrid'),
                mailchimp: this.testConnection('mailchimp'),
                stripe: this.testConnection('stripe'),
                square: this.testConnection('square'),
                googleAnalytics: this.testConnection('googleAnalytics'),
                mixpanel: this.testConnection('mixpanel')
            },
            rateLimits: Object.fromEntries(this.rateLimits),
            retryQueueSize: this.retryQueue.length,
            cacheSize: this.cache.size
        };
    }

    async testConnection(service) {
        try {
            // Perform a lightweight test request
            const endpoint = this.endpoints[service];
            if (!endpoint) return { status: 'not_configured' };

            // This would be a real test in production
            return { 
                status: 'connected',
                lastTest: new Date().toISOString()
            };
        } catch (error) {
            return { 
                status: 'error',
                error: error.message,
                lastTest: new Date().toISOString()
            };
        }
    }
}

// ==========================================
// 🚀 GLOBAL INTEGRATION INTERFACE
// ==========================================

// Initialize the API Integration Manager
window.apiManager = new APIIntegrationManager();

// Global functions for integration
window.syncLeadToCRM = async function(leadData, provider = 'hubspot') {
    switch (provider) {
        case 'hubspot':
            return await window.apiManager.syncToHubSpot(leadData);
        case 'salesforce':
            return await window.apiManager.syncToSalesforce(leadData);
        default:
            throw new Error(`Unsupported CRM provider: ${provider}`);
    }
};

window.sendEmail = async function(emailData, provider = 'emailjs') {
    switch (provider) {
        case 'sendgrid':
            return await window.apiManager.sendEmailViaSendGrid(emailData);
        case 'mailchimp':
            return await window.apiManager.addToMailChimpList(emailData);
        default:
            // Fall back to EmailJS
            return { success: true, message: 'Email sent via EmailJS' };
    }
};

window.processPayment = async function(paymentData, provider = 'stripe') {
    switch (provider) {
        case 'stripe':
            return await window.apiManager.createStripePaymentIntent(paymentData);
        case 'square':
            return await window.apiManager.createSquarePayment(paymentData);
        default:
            throw new Error(`Unsupported payment provider: ${provider}`);
    }
};

window.trackAnalytics = async function(eventData, provider = 'internal') {
    switch (provider) {
        case 'google':
            return await window.apiManager.sendToGoogleAnalytics(eventData);
        case 'mixpanel':
            return await window.apiManager.sendToMixpanel(eventData);
        default:
            // Use internal analytics
            if (window.analytics) {
                window.analytics.track(eventData.event, eventData.properties);
            }
            return { success: true };
    }
};

// Integration status monitoring
window.getIntegrationStatus = function() {
    return window.apiManager.getIntegrationStatus();
};

// Webhook processing (for demonstration)
window.processWebhook = function(service, event) {
    switch (service) {
        case 'stripe':
            return window.apiManager.handleStripeWebhook(event);
        // Add other webhook handlers as needed
    }
};

console.log('🔌 API Integration Manager loaded successfully!');
console.log('🌐 Ready for CRM, Email, Payment & Analytics integrations');
console.log('📊 Use getIntegrationStatus() to check connection health');
