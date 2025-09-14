// 🪵"± MOBILE PERFORMANCE OPTIMIZATION SYSTEM
// Comprehensive mobile performance enhancements and touch optimizations

// 🪵"Š PERFORMANCE TRACKING
window.MOBILE_PERFORMANCE = {
    metrics: {
        touchDelay: 0,
        scrollDelay: 0,
        animationFrames: 0,
        memoryUsage: 0,
        lastFrameTime: 0
    },
    settings: {
        maxTouchDelay: 100,
        targetFPS: 60,
        lazyLoadThreshold: 0.1,
        touchThreshold: 44
    },
    isEnabled: true
};

// 🪵Ž¯ DEVICE DETECTION AND OPTIMIZATION
function detectDeviceCapabilities() {
    const device = {
        isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isTablet: /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent),
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
        isAndroid: /Android/i.test(navigator.userAgent),
        hasTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        supportsPWA: 'serviceWorker' in navigator,
        supportsWebGL: (() => {
            try {
                const canvas = document.createElement('canvas');
                return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
            } catch (e) {
                return false;
            }
        })(),
        memoryLimit: navigator.deviceMemory || 4,
        connectionType: navigator.connection ? navigator.connection.effectiveType : 'unknown'
    };
    
    // Apply device-specific optimizations
    if (device.isMobile) {
        document.body.classList.add('mobile-device');
        applyMobileOptimizations();
    }
    
    if (device.isIOS) {
        document.body.classList.add('ios-device');
        applyIOSOptimizations();
    }
    
    if (device.isAndroid) {
        document.body.classList.add('android-device');
        applyAndroidOptimizations();
    }
    
    if (device.memoryLimit <= 2) {
        document.body.classList.add('low-memory-device');
        applyLowMemoryOptimizations();
    }
    
    return device;
}

// 🪵š€ MOBILE OPTIMIZATIONS
function applyMobileOptimizations() {
    // Disable hover states on mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (hover: none) and (pointer: coarse) {
            .nav-item:hover,
            .action-btn:hover,
            .config-btn:hover,
            button:hover {
                transform: none !important;
                background: inherit !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Optimize touch targets
    optimizeTouchTargets();
    
    // Disable text selection on interactive elements
    const noSelectStyle = document.createElement('style');
    noSelectStyle.textContent = `
        .nav-item,
        .action-btn,
        .config-btn,
        button,
        .slider-handle,
        .hotspot {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-touch-callout: none;
        }
    `;
    document.head.appendChild(noSelectStyle);
}

// 🪵 iOS SPECIFIC OPTIMIZATIONS
function applyIOSOptimizations() {
    // Fix iOS viewport scaling issues
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content', 
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        );
    }
    
    // Fix iOS scroll bounce
    const bounceStyle = document.createElement('style');
    bounceStyle.textContent = `
        body {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: none;
        }
        
        .scroll-container {
            -webkit-overflow-scrolling: touch;
        }
    `;
    document.head.appendChild(bounceStyle);
    
    // Handle iOS safe areas
    const safeAreaStyle = document.createElement('style');
    safeAreaStyle.textContent = `
        .nav-header {
            padding-top: max(1rem, env(safe-area-inset-top));
        }
        
        .action-section {
            padding-bottom: max(3rem, calc(3rem + env(safe-area-inset-bottom)));
        }
    `;
    document.head.appendChild(safeAreaStyle);
}

// 🪵¤– ANDROID OPTIMIZATIONS
function applyAndroidOptimizations() {
    // Optimize for Android Chrome
    const androidStyle = document.createElement('style');
    androidStyle.textContent = `
        /* Fix Android Chrome scroll performance */
        * {
            -webkit-tap-highlight-color: transparent;
        }
        
        .lightbox-overlay,
        .modal-overlay {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
        }
    `;
    document.head.appendChild(androidStyle);
}

// 🪵"‹ LOW MEMORY OPTIMIZATIONS
function applyLowMemoryOptimizations() {
    // Reduce animation complexity
    const lowMemStyle = document.createElement('style');
    lowMemStyle.textContent = `
        @media (max-device-width: 767px) and (max-device-memory: 2gb) {
            .animated,
            .transition-all {
                animation: none !important;
                transition: none !important;
            }
            
            .lightbox-image {
                max-width: 90vw !important;
                max-height: 90vh !important;
            }
        }
    `;
    document.head.appendChild(lowMemStyle);
    
    // Implement aggressive lazy loading
    enableAggressiveLazyLoading();
}

// 🪵Ž¯ TOUCH TARGET OPTIMIZATION
function optimizeTouchTargets() {
    const minTouchSize = MOBILE_PERFORMANCE.settings.touchThreshold;
    
    const style = document.createElement('style');
    style.textContent = `
        @media (hover: none) and (pointer: coarse) {
            .nav-item,
            .action-btn,
            .config-btn,
            button,
            .slider-handle {
                min-height: ${minTouchSize}px;
                min-width: ${minTouchSize}px;
                padding: max(0.75rem, ${minTouchSize/4}px) max(1rem, ${minTouchSize/3}px);
            }
            
            .nav-item {
                margin: 0.25rem;
            }
            
            .hotspot {
                width: ${minTouchSize}px;
                height: ${minTouchSize}px;
            }
        }
    `;
    document.head.appendChild(style);
}

// 🪵–¼ï¸ LAZY LOADING SYSTEM
function enableAggressiveLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    lazyImageObserver.unobserve(img);
                }
            });
        }, {
            threshold: MOBILE_PERFORMANCE.settings.lazyLoadThreshold
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            lazyImageObserver.observe(img);
        });
    }
}

// âš¡ TOUCH EVENT OPTIMIZATIONS
function optimizeTouchEvents() {
    let touchStartTime = 0;
    let scrolling = false;
    
    // Optimize touch events with passive listeners
    document.addEventListener('touchstart', (e) => {
        touchStartTime = performance.now();
        scrolling = false;
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        scrolling = true;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        const touchDelay = performance.now() - touchStartTime;
        MOBILE_PERFORMANCE.metrics.touchDelay = touchDelay;
        
        if (touchDelay > MOBILE_PERFORMANCE.settings.maxTouchDelay) {
            console.warn('âš ï¸ Touch delay detected:', touchDelay + 'ms');
        }
    }, { passive: true });
    
    // Prevent accidental touch actions
    document.addEventListener('touchend', (e) => {
        if (scrolling) return;
        
        const target = e.target.closest('a, button, .clickable');
        if (target && !target.disabled) {
            // Add visual feedback
            target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                target.style.transform = '';
            }, 100);
        }
    });
}

// 🪵"Š PERFORMANCE MONITORING
function startPerformanceMonitoring() {
    let lastFrameTime = performance.now();
    let frameCount = 0;
    
    function measureFrame() {
        const now = performance.now();
        const delta = now - lastFrameTime;
        lastFrameTime = now;
        frameCount++;
        
        MOBILE_PERFORMANCE.metrics.lastFrameTime = delta;
        MOBILE_PERFORMANCE.metrics.animationFrames = frameCount;
        
        // Warn about dropped frames
        if (delta > 1000 / 30) { // Less than 30 FPS
            console.warn('âš ï¸ Frame drop detected:', Math.round(1000 / delta) + ' FPS');
        }
        
        // Monitor memory usage
        if (performance.memory) {
            MOBILE_PERFORMANCE.metrics.memoryUsage = performance.memory.usedJSHeapSize;
        }
        
        requestAnimationFrame(measureFrame);
    }
    
    requestAnimationFrame(measureFrame);
}

// 🪵Ž¨ ANIMATION OPTIMIZATIONS
function optimizeAnimations() {
    // Use CSS transforms instead of changing layout properties
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @media (max-width: 768px) {
            .slide-in {
                transform: translateX(-100%);
                transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .slide-in.active {
                transform: translateX(0);
            }
            
            .fade-in {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            
            .fade-in.active {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Force hardware acceleration */
            .hardware-accelerated {
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
            }
        }
    `;
    document.head.appendChild(animationStyle);
}

// 🪵"± RESPONSIVE IMAGE LOADING
function setupResponsiveImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.srcset && img.dataset.mobile) {
            if (window.innerWidth <= 768) {
                img.src = img.dataset.mobile;
            }
        }
    });
}

// 🪵žï¸ MEMORY MANAGEMENT
function setupMemoryManagement() {
    let memoryCleanupInterval;
    
    function cleanupMemory() {
        // Remove unused event listeners
        const unusedElements = document.querySelectorAll('[data-cleanup="true"]');
        unusedElements.forEach(element => {
            element.remove();
        });
        
        // Force garbage collection if available
        if (window.gc) {
            window.gc();
        }
    }
    
    // Clean up memory periodically on mobile
    if (window.innerWidth <= 768) {
        memoryCleanupInterval = setInterval(cleanupMemory, 30000);
    }
    
    // Clean up on visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cleanupMemory();
        }
    });
}

// 🪵š€ INITIALIZATION
function initializeMobileOptimizations() {
    try {
        console.log('🪵"± Initializing mobile optimizations...');
        
        const device = detectDeviceCapabilities();
        
        optimizeTouchEvents();
        optimizeAnimations();
        setupResponsiveImages();
        setupMemoryManagement();
        
        if (MOBILE_PERFORMANCE.isEnabled) {
            startPerformanceMonitoring();
        }
        
        // Apply viewport optimizations
        const viewport = document.querySelector('meta[name="viewport"]') || 
                        document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
        document.head.appendChild(viewport);
        
        console.log('âœ… Mobile optimizations initialized', device);
        
    } catch (error) {
        console.error('🪵š¨ Mobile optimization initialization failed:', error);
    }
}

// 🪵"§ MOBILE UTILITIES
window.MOBILE_UTILS = {
    isMobile: () => window.innerWidth <= 768,
    isTouch: () => 'ontouchstart' in window,
    getPerformanceMetrics: () => MOBILE_PERFORMANCE.metrics,
    enableDebugMode: () => {
        MOBILE_PERFORMANCE.isEnabled = true;
        startPerformanceMonitoring();
    },
    disableAnimations: () => {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    },
    optimizeForLowMemory: applyLowMemoryOptimizations
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeMobileOptimizations);

console.log('🪵"± Mobile Performance Optimization System loaded');
