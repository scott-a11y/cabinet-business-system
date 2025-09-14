// Resource Loader with Fallback Support
// Handles loading of external libraries with graceful degradation

class ResourceLoader {
    constructor() {
        this.loadedResources = new Set();
        this.failedResources = new Set();
        this.retryAttempts = {};
        this.maxRetries = 3;
        this.timeout = 10000; // 10 seconds
    }

    // Load external script with fallback
    async loadScript(src, fallbackSrc = null, options = {}) {
        if (this.loadedResources.has(src)) {
            return Promise.resolve();
        }

        if (this.failedResources.has(src) && !fallbackSrc) {
            return Promise.reject(new Error(`Resource ${src} previously failed and no fallback provided`));
        }

        try {
            await this.loadSingleScript(src, options);
            this.loadedResources.add(src);
            console.log(`✅ Loaded: ${src}`);
            return Promise.resolve();
        } catch (error) {
            console.warn(`⚠️ Failed to load: ${src}`, error);
            this.failedResources.add(src);

            if (fallbackSrc) {
                console.log(`🔄 Trying fallback: ${fallbackSrc}`);
                try {
                    await this.loadSingleScript(fallbackSrc, options);
                    this.loadedResources.add(fallbackSrc);
                    console.log(`✅ Fallback loaded: ${fallbackSrc}`);
                    return Promise.resolve();
                } catch (fallbackError) {
                    console.error(`❌ Fallback also failed: ${fallbackSrc}`, fallbackError);
                    this.failedResources.add(fallbackSrc);
                    return Promise.reject(fallbackError);
                }
            }

            return Promise.reject(error);
        }
    }

    loadSingleScript(src, options = {}) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = options.async !== false;
            script.defer = options.defer || false;
            
            const timeoutId = setTimeout(() => {
                script.remove();
                reject(new Error(`Script loading timeout: ${src}`));
            }, this.timeout);

            script.onload = () => {
                clearTimeout(timeoutId);
                resolve();
            };

            script.onerror = () => {
                clearTimeout(timeoutId);
                script.remove();
                reject(new Error(`Script loading failed: ${src}`));
            };

            document.head.appendChild(script);
        });
    }

    // Load external CSS with fallback
    async loadCSS(href, fallbackHref = null) {
        if (this.loadedResources.has(href)) {
            return Promise.resolve();
        }

        try {
            await this.loadSingleCSS(href);
            this.loadedResources.add(href);
            console.log(`✅ CSS Loaded: ${href}`);
            return Promise.resolve();
        } catch (error) {
            console.warn(`⚠️ Failed to load CSS: ${href}`, error);
            this.failedResources.add(href);

            if (fallbackHref) {
                try {
                    await this.loadSingleCSS(fallbackHref);
                    this.loadedResources.add(fallbackHref);
                    console.log(`✅ CSS Fallback loaded: ${fallbackHref}`);
                    return Promise.resolve();
                } catch (fallbackError) {
                    return Promise.reject(fallbackError);
                }
            }

            return Promise.reject(error);
        }
    }

    loadSingleCSS(href) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            
            const timeoutId = setTimeout(() => {
                link.remove();
                reject(new Error(`CSS loading timeout: ${href}`));
            }, this.timeout);

            link.onload = () => {
                clearTimeout(timeoutId);
                resolve();
            };

            link.onerror = () => {
                clearTimeout(timeoutId);
                link.remove();
                reject(new Error(`CSS loading failed: ${href}`));
            };

            document.head.appendChild(link);
        });
    }

    // Initialize essential services with fallbacks
    async initializeServices() {
        console.log('🔄 Initializing external services...');
        
        const services = [
            {
                name: 'Stripe',
                primary: 'https://js.stripe.com/v3/',
                fallback: null, // Stripe doesn't have a good fallback
                test: () => typeof Stripe !== 'undefined',
                fallbackAction: () => {
                    console.warn('⚠️ Stripe not available - Payment processing disabled');
                    window.stripeUnavailable = true;
                }
            },
            {
                name: 'EmailJS',
                primary: 'https://cdn.emailjs.com/dist/email.min.js',
                fallback: 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js',
                test: () => typeof emailjs !== 'undefined',
                fallbackAction: () => {
                    console.warn('⚠️ EmailJS not available - Email automation disabled');
                    window.emailjsUnavailable = true;
                }
            },
            {
                name: 'jsPDF',
                primary: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
                fallback: 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js',
                test: () => typeof window.jsPDF !== 'undefined',
                fallbackAction: () => {
                    console.warn('⚠️ jsPDF not available - PDF generation disabled');
                    window.jsPDFUnavailable = true;
                }
            }
        ];

        const results = await Promise.allSettled(
            services.map(async (service) => {
                try {
                    await this.loadScript(service.primary, service.fallback);
                    
                    // Wait a bit for the library to initialize
                    await new Promise(resolve => setTimeout(resolve, 100));
                    
                    if (service.test && !service.test()) {
                        throw new Error(`${service.name} test failed after loading`);
                    }
                    
                    console.log(`✅ ${service.name} ready`);
                    return { service: service.name, status: 'success' };
                } catch (error) {
                    console.error(`❌ ${service.name} failed:`, error);
                    if (service.fallbackAction) {
                        service.fallbackAction();
                    }
                    return { service: service.name, status: 'failed', error };
                }
            })
        );

        // Summary
        const successful = results.filter(r => r.value?.status === 'success').length;
        const total = services.length;
        
        console.log(`📊 Services Status: ${successful}/${total} loaded successfully`);
        
        if (successful === 0) {
            console.warn('⚠️ All external services failed - System running in offline mode');
            this.showOfflineNotice();
        } else if (successful < total) {
            console.warn('⚠️ Some services unavailable - Limited functionality');
            this.showLimitedFunctionalityNotice();
        }

        return results;
    }

    showOfflineNotice() {
        const notice = document.createElement('div');
        notice.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            right: 20px;
            background: #fed7d7;
            border: 1px solid #fc8181;
            color: #742a2a;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        `;
        
        notice.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 8px;">⚠️ Limited Connectivity</div>
            <div style="font-size: 14px;">
                Some features may be unavailable due to connectivity issues. 
                The configurator will still work for basic functionality.
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="float: right; background: none; border: none; color: #742a2a; cursor: pointer; font-size: 18px;">×</button>
            </div>
        `;
        
        document.body.appendChild(notice);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (notice.parentElement) {
                notice.remove();
            }
        }, 10000);
    }

    showLimitedFunctionalityNotice() {
        const notice = document.createElement('div');
        notice.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            right: 20px;
            background: #fef5e7;
            border: 1px solid #f6e05e;
            color: #744210;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        `;
        
        notice.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 8px;">ℹ️ Some Features Limited</div>
            <div style="font-size: 14px;">
                External services are partially available. Core functionality is working.
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="float: right; background: none; border: none; color: #744210; cursor: pointer; font-size: 18px;">×</button>
            </div>
        `;
        
        document.body.appendChild(notice);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (notice.parentElement) {
                notice.remove();
            }
        }, 5000);
    }

    // Check if a service is available
    isServiceAvailable(serviceName) {
        switch (serviceName.toLowerCase()) {
            case 'stripe':
                return typeof Stripe !== 'undefined' && !window.stripeUnavailable;
            case 'emailjs':
                return typeof emailjs !== 'undefined' && !window.emailjsUnavailable;
            case 'jspdf':
                return typeof window.jsPDF !== 'undefined' && !window.jsPDFUnavailable;
            default:
                return false;
        }
    }

    // Graceful degradation helpers
    withService(serviceName, callback, fallback = null) {
        if (this.isServiceAvailable(serviceName)) {
            try {
                return callback();
            } catch (error) {
                console.error(`Error using ${serviceName}:`, error);
                return fallback ? fallback() : null;
            }
        } else {
            console.warn(`${serviceName} not available`);
            return fallback ? fallback() : null;
        }
    }
}

// Initialize global resource loader
const resourceLoader = new ResourceLoader();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        resourceLoader.initializeServices();
    });
} else {
    resourceLoader.initializeServices();
}

// Export for use in other files
window.resourceLoader = resourceLoader;