// 🛡️ BULLETPROOF CONFIGURATION SYSTEM
// Original configuration system for Phase 1 files

(function() {
    'use strict';

    // 🔧 BUSINESS CONFIGURATIONS
    const BUSINESS_CONFIGS = {
        foundry_cabinets: {
            companyName: 'Foundry Cabinets Co',
            companySubtitle: 'by District Design Build, LLC',
            companyTagline: 'Driven by Precision. Evolved by Design.',
            location: 'Portland, OR',
            phone: '360-606-1106',
            email: 'scott@ddbteam.com',
            website: 'www.ddb503.com',
            
            // Pricing tiers (per linear foot)
            pricing: {
                economy: { min: 800, max: 1200, avg: 965 },
                standard: { min: 1000, max: 1500, avg: 1225 },
                premium: { min: 1400, max: 1900, avg: 1630 },
                luxury: { min: 1900, max: 2600, avg: 2250 }
            },
            
            // Visual branding
            primaryColor: '#D4B062',
            secondaryColor: '#F4E4A1',
            accentColor: '#C5A055',
            
            // Business specifics
            specialties: ['Custom Kitchen Cabinets', 'Built-in Storage', 'Bathroom Vanities'],
            targetMarket: 'Mid to High-end Residential',
            yearEstablished: '2018',
            
            // Sample projects for demos
            sampleProjects: [
                {
                    name: 'Modern Farmhouse Kitchen',
                    client: 'Thompson Family',
                    value: '$45,500',
                    image: '🏡'
                },
                {
                    name: 'Industrial Loft Storage',
                    client: 'Urban Residence',
                    value: '$28,200',
                    image: '🏭'
                }
            ]
        },

        seattle_cabinets: {
            companyName: 'Seattle Premium Cabinets',
            companySubtitle: 'Pacific Northwest Craftsmanship',
            companyTagline: 'Where Nature Meets Craftsmanship.',
            location: 'Seattle, WA',
            phone: '206-555-0142',
            email: 'info@seattlecabinets.com',
            website: 'www.seattlecabinets.com',
            
            pricing: {
                economy: { min: 850, max: 1300, avg: 1060 },
                standard: { min: 1100, max: 1600, avg: 1340 },
                premium: { min: 1500, max: 2100, avg: 1785 },
                luxury: { min: 2100, max: 2900, avg: 2475 }
            },
            
            primaryColor: '#2E4A62',
            secondaryColor: '#A8C4D6',
            accentColor: '#1A3A52',
            
            specialties: ['Sustainable Materials', 'Pacific NW Design', 'Rain-Resistant Finishes'],
            targetMarket: 'Eco-Conscious High-end Residential',
            yearEstablished: '2016',
            
            sampleProjects: [
                {
                    name: 'Sustainable Seattle Kitchen',
                    client: 'Green Living Family',
                    value: '$52,800',
                    image: '🌲'
                },
                {
                    name: 'Waterfront Condo Remodel',
                    client: 'City Executive',
                    value: '$38,900',
                    image: '🏢'
                }
            ]
        },

        district_design: {
            companyName: 'District Design Build',
            companySubtitle: 'Architectural Millwork Specialists',
            companyTagline: 'Precision Architecture. Masterful Execution.',
            location: 'Portland, OR',
            phone: '503-555-0198',
            email: 'projects@districtdesign.com',
            website: 'www.districtdesign.com',
            
            pricing: {
                economy: { min: 1000, max: 1400, avg: 1200 },
                standard: { min: 1300, max: 1800, avg: 1550 },
                premium: { min: 1700, max: 2400, avg: 2050 },
                luxury: { min: 2400, max: 3300, avg: 2850 }
            },
            
            primaryColor: '#8B4513',
            secondaryColor: '#DEB887',
            accentColor: '#654321',
            
            specialties: ['Architectural Millwork', 'Commercial Fit-outs', 'Historic Restoration'],
            targetMarket: 'Commercial & High-end Residential',
            yearEstablished: '2012',
            
            sampleProjects: [
                {
                    name: 'Historic Home Restoration',
                    client: 'Heritage Foundation',
                    value: '$67,500',
                    image: '🏛️'
                },
                {
                    name: 'Corporate Office Build-out',
                    client: 'Tech Company',
                    value: '$125,000',
                    image: '🏢'
                }
            ]
        },

        luxury_kitchens: {
            companyName: 'Prestige Kitchen Studios',
            companySubtitle: 'Ultra-Luxury Kitchen Design',
            companyTagline: 'Where Culinary Dreams Become Reality.',
            location: 'Lake Oswego, OR',
            phone: '503-555-0287',
            email: 'concierge@prestigekitchens.com',
            website: 'www.prestigekitchens.com',
            
            pricing: {
                economy: { min: 1500, max: 2200, avg: 1800 },
                standard: { min: 2200, max: 3000, avg: 2600 },
                premium: { min: 3000, max: 4000, avg: 3500 },
                luxury: { min: 4000, max: 6000, avg: 4500 }
            },
            
            primaryColor: '#B8860B',
            secondaryColor: '#FFD700',
            accentColor: '#9A7B0A',
            
            specialties: ['Ultra-Luxury Kitchens', 'Smart Home Integration', 'European Imports'],
            targetMarket: 'Ultra High-end Residential',
            yearEstablished: '2010',
            
            sampleProjects: [
                {
                    name: 'Celebrity Chef Kitchen',
                    client: 'Private Client',
                    value: '$185,000',
                    image: '👑'
                },
                {
                    name: 'Smart Home Integration',
                    client: 'Tech Executive',
                    value: '$95,500',
                    image: '🤖'
                }
            ]
        }
    };

    // 🎯 CURRENT CONFIGURATION
    let currentConfig = 'foundry_cabinets';

    // 🔧 CONFIGURATION MANAGEMENT
    function switchConfig(configName) {
        try {
            if (!BUSINESS_CONFIGS[configName]) {
                console.error('🚨 Invalid configuration:', configName);
                return false;
            }

            currentConfig = configName;
            window.CONFIG = BUSINESS_CONFIGS[configName];
            
            // Update active button
            document.querySelectorAll('.config-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            const activeBtn = document.getElementById(`btn-${configName}`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }

            // Apply configuration to page
            if (typeof applyConfiguration === 'function') {
                applyConfiguration();
            }

            // Store selection
            try {
                localStorage.setItem('selectedConfig', configName);
            } catch(e) {
                console.warn('⚠️ Could not save to localStorage:', e.message);
            }

            console.log('✅ Configuration switched to:', configName);
            return true;

        } catch (error) {
            console.error('🚨 Error switching configuration:', error);
            return false;
        }
    }

    // 📱 RESPONSIVE UTILITIES
    function isMobile() {
        return window.innerWidth <= 768;
    }

    function isTablet() {
        return window.innerWidth > 768 && window.innerWidth <= 1024;
    }

    function isDesktop() {
        return window.innerWidth > 1024;
    }

    // 🎨 THEME UTILITIES
    function updateThemeColors(config) {
        if (!config) return;
        
        const root = document.documentElement;
        if (config.primaryColor) {
            root.style.setProperty('--primary-color', config.primaryColor);
            root.style.setProperty('--primary-gold', config.primaryColor);
        }
        if (config.secondaryColor) {
            root.style.setProperty('--secondary-color', config.secondaryColor);
            root.style.setProperty('--light-gold', config.secondaryColor);
        }
        if (config.accentColor) {
            root.style.setProperty('--accent-color', config.accentColor);
        }
    }

    // 💰 PRICING UTILITIES
    function formatPrice(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    function calculateEstimate(linearFeet, tier = 'standard') {
        const config = window.CONFIG;
        if (!config || !config.pricing[tier]) {
            return { min: 0, max: 0, avg: 0 };
        }

        const pricing = config.pricing[tier];
        return {
            min: linearFeet * pricing.min,
            max: linearFeet * pricing.max,
            avg: linearFeet * pricing.avg
        };
    }

    // 📊 ANALYTICS UTILITIES
    function trackConfigSwitch(configName) {
        try {
            console.log('📊 Analytics: Configuration switched to', configName);
            // Integrate with Google Analytics or other analytics platforms
            if (typeof gtag !== 'undefined') {
                gtag('event', 'config_switch', {
                    'event_category': 'Configuration',
                    'event_label': configName
                });
            }
        } catch (error) {
            console.warn('⚠️ Analytics tracking failed:', error);
        }
    }

    // 🚀 INITIALIZATION
    function initializeConfig() {
        try {
            // Try to load saved configuration
            let savedConfig = 'foundry_cabinets'; // default
            
            try {
                const stored = localStorage.getItem('selectedConfig');
                if (stored && BUSINESS_CONFIGS[stored]) {
                    savedConfig = stored;
                }
            } catch(e) {
                console.warn('⚠️ Could not load from localStorage:', e.message);
            }

            // Set initial configuration
            switchConfig(savedConfig);

            console.log('✅ Configuration system initialized');

        } catch (error) {
            console.error('🚨 Error initializing configuration:', error);
            // Fallback to default
            window.CONFIG = BUSINESS_CONFIGS.foundry_cabinets;
        }
    }

    // 🌐 GLOBAL EXPORTS
    window.BUSINESS_CONFIGS = BUSINESS_CONFIGS;
    window.switchConfig = switchConfig;
    window.formatPrice = formatPrice;
    window.calculateEstimate = calculateEstimate;
    window.isMobile = isMobile;
    window.isTablet = isTablet;
    window.isDesktop = isDesktop;
    window.updateThemeColors = updateThemeColors;
    window.trackConfigSwitch = trackConfigSwitch;

    // 🎬 AUTO-INITIALIZE
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeConfig);
    } else {
        initializeConfig();
    }

    console.log('🛡️ Bulletproof Configuration System loaded successfully');

})();