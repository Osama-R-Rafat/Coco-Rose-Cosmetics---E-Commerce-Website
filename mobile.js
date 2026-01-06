// ============================================
// MOBILE ENHANCEMENTS
// JavaScript for mobile menu and scroll features
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupScrollToTop();
    enhanceMobileNav();
});

// ============================================
// MOBILE MENU
// ============================================
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');

    // Open mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            if (mobileNav) mobileNav.classList.add('active');
            if (mobileNavOverlay) mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close mobile menu
    const closeMobileMenu = () => {
        if (mobileNav) mobileNav.classList.remove('active');
        if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function setupScrollToTop() {
    const scrollTop = document.getElementById('scrollTop');

    if (!scrollTop) return;

    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// ENHANCED MOBILE NAVIGATION
// ============================================
function enhanceMobileNav() {
    // Enhanced smooth scroll for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close mobile nav if open
                    const mobileNav = document.getElementById('mobileNav');
                    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
                    if (mobileNav && mobileNav.classList.contains('active')) {
                        mobileNav.classList.remove('active');
                        if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            }
        });
    });
}

// =====================================
// MOBILE PERFORMANCE OPTIMIZATIONS
// =====================================

// Lazy loading logic removed in favor of native loading="lazy" attribute
