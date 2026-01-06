// ============================================
// ADVANCED ANIMATIONS & FEATURES
// Premium interactions and animations
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    setupLoadingScreen();
    setupScrollAnimations();
    setupFAQAccordion();
    setupCounterAnimations();
    setupNewsletterForm();
    setupParallaxEffect();
    setupTypingEffect();
});

// ============================================
// TYPING EFFECT
// ============================================
function setupTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.innerHTML = '<span class="typing-text"></span><span class="typing-cursor"></span>';

    const typingText = heroTitle.querySelector('.typing-text');
    let i = 0;

    function type() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            // Remove cursor after a delay
            setTimeout(() => {
                const cursor = heroTitle.querySelector('.typing-cursor');
                if (cursor) cursor.style.opacity = '0';
            }, 2000);
        }
    }

    // Start typing after loading screen
    setTimeout(type, 1500);
}

// ============================================
// CONFETTI CELEBRATION
// ============================================
function celebrateOrder() {
    const duration = 3000;
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    const colors = ['#a8577d', '#d097b3', '#FFD700', '#FFF', '#25D366'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(confetti);

            // Cleanup individual confetti
            setTimeout(() => confetti.remove(), 4000);
        }, Math.random() * duration);
    }

    // Cleanup container
    setTimeout(() => container.remove(), duration + 4000);
}

// Global access for checkout
window.celebrateOrder = celebrateOrder;

// ============================================
// LOADING SCREEN
// ============================================
function setupLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');

    if (!loadingScreen) return;

    // Hide loading screen when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');

            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 300); // Show for at least 300ms
    });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function setupScrollAnimations() {
    // Intersection Observer configuration
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-reveal classes
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(el => {
        observer.observe(el);
    });

    // Add scroll reveal class to product cards
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);
}

// ============================================
// FAQ ACCORDION
// ============================================
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (!question) return;

        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ============================================
// COUNTER ANIMATIONS
// ============================================
function setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateCounters = () => {
        if (animated) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;

                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;

                    // Add "+" for certain counters
                    const label = counter.nextElementSibling?.textContent;
                    if (label && label.includes('+')) {
                        counter.textContent = target + '+';
                    }
                    if (label && label.includes('%')) {
                        counter.textContent = target + '%';
                    }
                }
            };

            updateCounter();
        });

        animated = true;
    };

    // Observe stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }
}

// ============================================
// NEWSLETTER FORM
// ============================================
function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = form.querySelector('.newsletter-input').value;

        // Show success message
        showAnimatedNotification('شكراً لاشتراكك! سنرسل لك أحدث العروض قريباً 💌', 'success');

        // Reset form
        form.reset();

        // Here you can add actual newsletter subscription logic
        console.log('Newsletter subscription:', email);
    });
}

// ============================================
// PARALLAX EFFECT 
// ============================================
function setupParallaxEffect() {
    const hero = document.querySelector('.hero');

    if (!hero) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;

                if (hero) {
                    hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                }

                ticking = false;
            });

            ticking = true;
        }
    });
}

// ============================================
// ENHANCED NOTIFICATIONS
// ============================================
function showAnimatedNotification(message, type = 'info') {
    const notification = document.createElement('div');

    const colors = {
        success: 'linear-gradient(135deg, #25D366, #20ba5a)',
        info: 'linear-gradient(135deg, #a8577d, #d097b3)',
        error: 'linear-gradient(135deg, #dc3545, #c82333)'
    };

    const icons = {
        success: 'fa-check-circle',
        info: 'fa-info-circle',
        error: 'fa-exclamation-circle'
    };

    notification.innerHTML = `
        <i class="fas ${icons[type]}" style="margin-left: 10px;"></i>
        ${message}
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        font-weight: 500;
        max-width: 350px;
        display: flex;
        align-items: center;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
}

// Make notification function globally available
window.showAnimatedNotification = showAnimatedNotification;

// ============================================
// ENHANCED PRODUCT INTERACTIONS
// ============================================
// Add zoom effect on product images
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const productImages = document.querySelectorAll('.product-image');

        productImages.forEach(img => {
            img.parentElement.style.overflow = 'hidden';
            img.style.transition = 'transform 0.5s ease';

            img.parentElement.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.1)';
            });

            img.parentElement.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        });
    }, 500);
});

// ============================================
// SMOOTH CART ANIMATIONS
// ============================================
// Override cart update to add animations
const originalUpdateCartUI = window.updateCartUI;
if (originalUpdateCartUI) {
    window.updateCartUI = function () {
        // Call original function
        originalUpdateCartUI.call(this);

        // Add entrance animations to cart items
        setTimeout(() => {
            const cartItems = document.querySelectorAll('.cart-item');
            cartItems.forEach((item, index) => {
                item.style.animation = `slideInRight 0.3s ease ${index * 0.05}s backwards`;
            });
        }, 50);
    };
}

// ============================================
// PERFORMANCE MONITORING
// ============================================
if ('PerformanceObserver' in window) {
    // Monitor long tasks
    try {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 50) {
                    console.warn('Long task detected:', entry);
                }
            }
        });
        perfObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
        // Feature not supported in some browsers
    }
}

console.log('✨ Advanced animations loaded successfully!');
