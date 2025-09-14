// 🧭 STANDARDIZED NAVIGATION SYSTEM
// Consistent navigation across all pages with dynamic updates

// 🔗 NAVIGATION STRUCTURE
window.NAVIGATION_CONFIG = {
    items: [
        { 
            id: 'home',
            label: 'Business Hub', 
            icon: '🏠', 
            href: 'index.html',
            description: 'Main dashboard and overview'
        },
        { 
            id: 'admin',
            label: 'Admin Dashboard', 
            icon: '📊', 
            href: 'admin-dashboard.html',
            description: 'Project management and analytics'
        },
        { 
            id: 'proposals',
            label: 'Client Proposals', 
            icon: '📋', 
            href: 'client-proposal.html',
            description: 'Professional client proposals'
        },
        { 
            id: 'pdf-generator',
            label: 'PDF Generator', 
            icon: '📄', 
            href: 'pdf-proposal-generator.html',
            description: 'Create branded PDF proposals'
        },
        { 
            id: 'client-portal',
            label: 'Client Portal', 
            icon: '👥', 
            href: 'client-portal.html',
            description: 'Client communication dashboard'
        },
        { 
            id: 'gallery',
            label: 'Photo Gallery', 
            icon: '📸', 
            href: 'multi-photo-gallery.html',
            description: 'Professional project showcase'
        },
        { 
            id: 'before-after',
            label: 'Before/After', 
            icon: '📄', 
            href: 'before-after-showcase.html',
            description: 'Interactive transformation demos'
        },
        { 
            id: 'virtual-tours',
            label: 'Virtual Tours', 
            icon: '🌐', 
            href: '360-project-viewer.html',
            description: 'Immersive 360° project views'
        },
        { 
            id: 'calculator',
            label: 'Calculator', 
            icon: '🧮', 
            href: 'interactive-estimate-calculator.html',
            description: 'Real-time pricing estimates'
        },
        { 
            id: 'demo',
            label: 'Live Demo', 
            icon: '🎭', 
            href: 'demo.html',
            description: 'Complete system demonstration'
        }
    ],
    
    // Mobile navigation settings
    mobile: {
        breakpoint: 768,
        hamburgerEnabled: true,
        collapsible: true
    },
    
    // Active page detection
    detection: {
        byUrl: true,
        byPageId: true,
        fallback: 'home'
    }
};

// 🎨 NAVIGATION STYLES
const NAVIGATION_STYLES = `
    /* Navigation Header */
    .nav-header {
        background: white;
        border-bottom: 1px solid var(--light-gray, #E8E8E8);
        padding: 1rem 0;
        position: sticky;
        top: 0;
        z-index: 100;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .nav-container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        gap: 1rem;
        padding: 0 2rem;
        flex-wrap: wrap;
    }

    .nav-item {
        color: var(--dark-gray, #4A4A4A);
        text-decoration: none;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        transition: all 0.3s ease;
        font-weight: 500;
        font-size: 0.85rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        white-space: nowrap;
    }

    .nav-item:hover {
        background: var(--light-gold, #F4E4A1);
        color: var(--charcoal, #2C2C2C);
        transform: translateY(-1px);
    }

    .nav-item.active {
        background: var(--primary-gold, #D4B062);
        color: white;
        font-weight: 600;
    }

    .nav-item-icon {
        font-size: 1rem;
    }

    /* Mobile Navigation */
    .nav-mobile-toggle {
        display: none;
        background: none;
        border: none;
        padding: 0.5rem;
        cursor: pointer;
        font-size: 1.5rem;
        color: var(--dark-gray, #4A4A4A);
    }

    @media (max-width: 768px) {
        .nav-container {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            position: relative;
        }
        
        .nav-mobile-toggle {
            display: block;
            align-self: flex-end;
        }
        
        .nav-items {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 0.25rem;
        }
        
        .nav-items.collapsed {
            display: none;
        }
        
        .nav-item {
            text-align: center;
            padding: 1rem;
            justify-content: center;
        }
        
        .nav-item-icon {
            font-size: 1.2rem;
        }
    }

    /* Accessibility */
    .nav-item:focus {
        outline: 2px solid var(--primary-gold, #D4B062);
        outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
        .nav-item {
            transition: none;
        }
        
        .nav-item:hover {
            transform: none;
        }
    }
`;

// 🗄️ NAVIGATION BUILDER
function createNavigationHTML() {
    const currentPage = detectActivePage();
    const isMobile = window.innerWidth <= NAVIGATION_CONFIG.mobile.breakpoint;
    
    let navHTML = `
        <nav class="nav-header" role="navigation" aria-label="Main navigation">
            <div class="nav-container">
    `;
    
    if (isMobile && NAVIGATION_CONFIG.mobile.hamburgerEnabled) {
        navHTML += `
            <button class="nav-mobile-toggle" 
                    onclick="toggleMobileNavigation()" 
                    aria-label="Toggle navigation menu"
                    aria-expanded="false">
                ☰
            </button>
        `;
    }
    
    navHTML += `<div class="nav-items${isMobile && NAVIGATION_CONFIG.mobile.collapsible ? ' collapsed' : ''}">`;
    
    NAVIGATION_CONFIG.items.forEach(item => {
        const isActive = currentPage === item.id;
        navHTML += `
            <a href="${item.href}" 
               class="nav-item${isActive ? ' active' : ''}"
               data-page-id="${item.id}"
               title="${item.description}"
               ${isActive ? 'aria-current="page"' : ''}>
                <span class="nav-item-icon" aria-hidden="true">${item.icon}</span>
                <span class="nav-item-label">${item.label}</span>
            </a>
        `;
    });
    
    navHTML += `
            </div>
        </div>
    </nav>`;
    
    return navHTML;
}

// 🕵️ ACTIVE PAGE DETECTION
function detectActivePage() {
    // Try URL-based detection first
    if (NAVIGATION_CONFIG.detection.byUrl) {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop() || 'index.html';
        
        const matchingItem = NAVIGATION_CONFIG.items.find(item => 
            item.href === currentFile || 
            item.href === currentPath
        );
        
        if (matchingItem) {
            return matchingItem.id;
        }
    }
    
    // Try page ID detection
    if (NAVIGATION_CONFIG.detection.byPageId) {
        const pageId = document.body.dataset.pageId;
        if (pageId && NAVIGATION_CONFIG.items.find(item => item.id === pageId)) {
            return pageId;
        }
    }
    
    // Fallback
    return NAVIGATION_CONFIG.detection.fallback;
}

// 📱 MOBILE NAVIGATION TOGGLE
function toggleMobileNavigation() {
    const navItems = document.querySelector('.nav-items');
    const toggle = document.querySelector('.nav-mobile-toggle');
    
    if (!navItems || !toggle) return;
    
    const isCollapsed = navItems.classList.contains('collapsed');
    
    if (isCollapsed) {
        navItems.classList.remove('collapsed');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.innerHTML = '✕';
    } else {
        navItems.classList.add('collapsed');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '☰';
    }
}

// 🎯 NAVIGATION INJECTION
function injectNavigation() {
    try {
        // Inject styles if not already present
        if (!document.getElementById('navigation-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'navigation-styles';
            styleSheet.textContent = NAVIGATION_STYLES;
            document.head.appendChild(styleSheet);
        }
        
        // Find existing navigation or create insertion point
        let navContainer = document.querySelector('.nav-header');
        
        if (navContainer) {
            // Replace existing navigation
            navContainer.outerHTML = createNavigationHTML();
        } else {
            // Insert at the beginning of body
            const navHTML = createNavigationHTML();
            document.body.insertAdjacentHTML('afterbegin', navHTML);
        }
        
        // Set up mobile event listeners
        setupMobileNavigation();
        
        console.log('âœ… Navigation injected successfully');
        return true;
        
    } catch (error) {
        console.error('🚨 Navigation injection failed:', error);
        return false;
    }
}

// 📱 MOBILE NAVIGATION SETUP
function setupMobileNavigation() {
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const wasMobile = document.querySelector('.nav-mobile-toggle') !== null;
            const isMobile = window.innerWidth <= NAVIGATION_CONFIG.mobile.breakpoint;
            
            if (wasMobile !== isMobile) {
                // Rebuild navigation for size change
                injectNavigation();
            }
        }, 250);
    });
    
    // Close mobile menu when clicking nav items
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-item')) {
            const navItems = document.querySelector('.nav-items');
            if (navItems && !navItems.classList.contains('collapsed')) {
                toggleMobileNavigation();
            }
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('.nav-header');
        const navItems = document.querySelector('.nav-items');
        
        if (nav && navItems && 
            !nav.contains(e.target) && 
            !navItems.classList.contains('collapsed')) {
            toggleMobileNavigation();
        }
    });
}

// 📄 NAVIGATION UPDATES
function updateNavigation() {
    const currentActive = document.querySelector('.nav-item.active');
    const correctActive = detectActivePage();
    
    // Remove current active state
    if (currentActive) {
        currentActive.classList.remove('active');
        currentActive.removeAttribute('aria-current');
    }
    
    // Set correct active state
    const newActive = document.querySelector(`[data-page-id="${correctActive}"]`);
    if (newActive) {
        newActive.classList.add('active');
        newActive.setAttribute('aria-current', 'page');
    }
}

// 🗂️ NAVIGATION MANAGEMENT
window.NAVIGATION = {
    inject: injectNavigation,
    update: updateNavigation,
    toggle: toggleMobileNavigation,
    detectActive: detectActivePage,
    rebuild: () => {
        const existing = document.querySelector('.nav-header');
        if (existing) existing.remove();
        injectNavigation();
    },
    addItem: (item) => {
        NAVIGATION_CONFIG.items.push(item);
        injectNavigation();
    },
    removeItem: (id) => {
        NAVIGATION_CONFIG.items = NAVIGATION_CONFIG.items.filter(item => item.id !== id);
        injectNavigation();
    }
};

// 🚀 AUTO-INITIALIZATION
function initializeNavigation() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectNavigation);
    } else {
        injectNavigation();
    }
    
    // Handle page transitions
    window.addEventListener('popstate', updateNavigation);
    
    // Handle hash changes
    window.addEventListener('hashchange', updateNavigation);
}

// Initialize navigation
initializeNavigation();

console.log('🧭 Standardized Navigation System loaded');

// Make toggle function globally available for onclick handlers
window.toggleMobileNavigation = toggleMobileNavigation;
