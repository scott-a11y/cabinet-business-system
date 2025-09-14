// ðŸ›¡ï¸ ENHANCED ERROR HANDLING SYSTEM
// Comprehensive error tracking, reporting, and graceful degradation

// ðŸ"Š ERROR TRACKING SYSTEM
window.ERROR_TRACKER = {
    errors: [],
    warnings: [],
    info: [],
    maxEntries: 50,
    debugMode: false
};

// ðŸšš ENHANCED CONSOLE METHODS
const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

// Enhanced logging with tracking
console.log = function(...args) {
    originalLog.apply(console, args);
    if (window.ERROR_TRACKER.debugMode) {
        window.ERROR_TRACKER.info.push({
            timestamp: new Date().toISOString(),
            message: args.join(' '),
            stack: new Error().stack
        });
        if (window.ERROR_TRACKER.info.length > window.ERROR_TRACKER.maxEntries) {
            window.ERROR_TRACKER.info.shift();
        }
    }
};

console.warn = function(...args) {
    originalWarn.apply(console, args);
    window.ERROR_TRACKER.warnings.push({
        timestamp: new Date().toISOString(),
        message: args.join(' '),
        stack: new Error().stack
    });
    if (window.ERROR_TRACKER.warnings.length > window.ERROR_TRACKER.maxEntries) {
        window.ERROR_TRACKER.warnings.shift();
    }
};

console.error = function(...args) {
    originalError.apply(console, args);
    window.ERROR_TRACKER.errors.push({
        timestamp: new Date().toISOString(),
        message: args.join(' '),
        stack: new Error().stack
    });
    if (window.ERROR_TRACKER.errors.length > window.ERROR_TRACKER.maxEntries) {
        window.ERROR_TRACKER.errors.shift();
    }
};

// ðŸš¨ GLOBAL ERROR HANDLERS
window.addEventListener('error', function(event) {
    const error = {
        timestamp: new Date().toISOString(),
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error ? event.error.toString() : 'Unknown error',
        stack: event.error ? event.error.stack : 'No stack trace'
    };
    
    window.ERROR_TRACKER.errors.push(error);
    console.error('ðŸš¨ Global Error Caught:', error);
    
    // Handle specific error types
    if (event.filename && event.filename.includes('config.js')) {
        handleConfigError(error);
    }
    
    return false; // Don't suppress default browser error handling
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    const error = {
        timestamp: new Date().toISOString(),
        message: 'Unhandled Promise Rejection',
        reason: event.reason ? event.reason.toString() : 'Unknown reason',
        stack: event.reason && event.reason.stack ? event.reason.stack : 'No stack trace'
    };
    
    window.ERROR_TRACKER.errors.push(error);
    console.error('ðŸš¨ Unhandled Promise Rejection:', error);
    
    // Prevent console spam but log the error
    event.preventDefault();
});

// ðŸ"§ SPECIFIC ERROR HANDLERS

function handleConfigError(error) {
    console.warn('ðŸš¨ Configuration system error detected');
    
    // Try to recover
    if (typeof initializeConfig === 'function') {
        setTimeout(initializeConfig, 1000);
    }
    
    // Show user-friendly message
    showErrorNotification('Configuration issue detected. Attempting to recover...');
}

function handleNetworkError(error) {
    console.warn('ðŸŒ Network error detected:', error);
    showErrorNotification('Network connectivity issue. Some features may be limited.');
}

function handleMobileError(error) {
    console.warn('ðŸ"± Mobile-specific error:', error);
    // Handle mobile-specific issues like touch events
}

// ðŸ'¬ USER-FRIENDLY ERROR NOTIFICATIONS
function showErrorNotification(message, type = 'warning', duration = 5000) {
    // Remove existing notifications
    const existing = document.querySelectorAll('.error-notification');
    existing.forEach(el => el.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `error-notification error-notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#4caf50'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-size: 14px;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add CSS animation if not exists
    if (!document.getElementById('error-notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'error-notification-styles';
        styles.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto-remove after duration
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, duration);
}

// ðŸ"Š ERROR REPORTING AND DEBUGGING
function getErrorReport() {
    return {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        errors: window.ERROR_TRACKER.errors,
        warnings: window.ERROR_TRACKER.warnings,
        configStatus: window.CONFIG_STATUS || 'Not available',
        performance: {
            memory: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB',
                total: Math.round(performance.memory.totalJSHeapSize / 1048576) + 'MB',
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) + 'MB'
            } : 'Not available',
            timing: performance.timing ? {
                loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart + 'ms',
                domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart + 'ms'
            } : 'Not available'
        }
    };
}

function downloadErrorReport() {
    const report = getErrorReport();
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `error-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ðŸ"± MOBILE-SPECIFIC ERROR HANDLING
function setupMobileErrorHandling() {
    // Handle touch events errors
    document.addEventListener('touchstart', function(e) {
        try {
            // Validate touch events
        } catch (error) {
            handleMobileError(error);
        }
    }, { passive: true });
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Trigger layout recalculation
            try {
                if (typeof applyConfiguration === 'function') {
                    applyConfiguration();
                }
            } catch (error) {
                console.warn('âš ï¸ Orientation change error:', error);
            }
        }, 500);
    });
    
    // Handle viewport changes
    window.addEventListener('resize', debounce(function() {
        try {
            // Trigger responsive adjustments
            document.body.classList.remove('mobile', 'tablet', 'desktop');
            if (window.innerWidth <= 768) {
                document.body.classList.add('mobile');
            } else if (window.innerWidth <= 1024) {
                document.body.classList.add('tablet');
            } else {
                document.body.classList.add('desktop');
            }
        } catch (error) {
            console.warn('âš ï¸ Resize error:', error);
        }
    }, 250));
}

// ðŸ•° UTILITY FUNCTIONS
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ðŸŽ¯ PERFORMANCE MONITORING
function monitorPerformance() {
    // Monitor memory usage (Chrome only)
    if (performance.memory) {
        setInterval(() => {
            const used = performance.memory.usedJSHeapSize;
            const limit = performance.memory.jsHeapSizeLimit;
            const usage = (used / limit) * 100;
            
            if (usage > 80) {
                console.warn('âš ï¸ High memory usage:', Math.round(usage) + '%');
                // Trigger garbage collection hints
                if (window.gc) {
                    window.gc();
                }
            }
        }, 30000);
    }
    
    // Monitor long tasks
    if ('PerformanceObserver' in window) {
        try {
            const observer = new PerformanceObserver(list => {
                list.getEntries().forEach(entry => {
                    if (entry.duration > 50) {
                        console.warn('âš ï¸ Long task detected:', entry.duration + 'ms');
                    }
                });
            });
            observer.observe({ entryTypes: ['longtask'] });
        } catch (error) {
            console.warn('âš ï¸ Performance monitoring not supported');
        }
    }
}

// ðŸšš INITIALIZATION
function initializeErrorHandling() {
    try {
        setupMobileErrorHandling();
        monitorPerformance();
        
        // Set initial viewport class
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile');
        } else if (window.innerWidth <= 1024) {
            document.body.classList.add('tablet');
        } else {
            document.body.classList.add('desktop');
        }
        
        console.log('âœ… Enhanced error handling system initialized');
        
    } catch (error) {
        console.error('ðŸš¨ Error handling initialization failed:', error);
    }
}

// ðŸ"§ DEBUG HELPERS (Development only)
window.DEBUG = {
    enableDebugMode: () => { window.ERROR_TRACKER.debugMode = true; },
    disableDebugMode: () => { window.ERROR_TRACKER.debugMode = false; },
    getErrors: () => window.ERROR_TRACKER.errors,
    getWarnings: () => window.ERROR_TRACKER.warnings,
    clearErrors: () => { 
        window.ERROR_TRACKER.errors = [];
        window.ERROR_TRACKER.warnings = [];
        window.ERROR_TRACKER.info = [];
    },
    downloadReport: downloadErrorReport,
    showTestNotification: (type = 'info') => showErrorNotification('Test notification', type),
    getReport: getErrorReport
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeErrorHandling);

console.log('ðŸ›¡ï¸ Enhanced Error Handling System loaded');
