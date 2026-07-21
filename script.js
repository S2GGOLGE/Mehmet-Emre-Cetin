// ==========================================================
// PORTFOLIO - INTERACTIVE FEATURES & ANIMATIONS
// ==========================================================

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initStatusSimulation();
    initSmoothScroll();
    updateYear();
});

// ==========================================================
// NAVIGATION
// ==========================================================

function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
    
    // Highlight active nav link
    highlightActiveNavLink();
    window.addEventListener('scroll', highlightActiveNavLink, { passive: true });
}

function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// ==========================================================
// SCROLL ANIMATIONS & REVEAL
// ==========================================================

function initScrollAnimations() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Stagger animation for multiple elements
                const delay = entry.target.dataset.delay || 0;
                if (delay) {
                    entry.target.style.animationDelay = delay + 'ms';
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach((el, index) => {
        el.dataset.delay = index * 100;
        revealObserver.observe(el);
    });
}

// ==========================================================
// CONTACT FORM
// ==========================================================

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formStatus = document.getElementById('form-status');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        if (!validateForm(formData)) {
            showFormStatus('Please fill in all required fields correctly.', 'error', formStatus);
            return;
        }
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            // Simulate form submission (replace with actual backend call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showFormStatus('✓ Message sent successfully! I\'ll get back to you soon.', 'success', formStatus);
            form.reset();
            
            // Log submission for demonstration
            console.log('Form submitted:', formData);
            
        } catch (error) {
            showFormStatus('Error sending message. Please try again.', 'error', formStatus);
            console.error('Form error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return (
        data.name.trim().length > 0 &&
        emailRegex.test(data.email) &&
        data.message.trim().length > 10
    );
}

function showFormStatus(message, type, element) {
    element.textContent = message;
    element.className = `form-status show ${type}`;
    
    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            element.classList.remove('show');
        }, 5000);
    }
}

// ==========================================================
// STATUS SIMULATION (HomeOS)
// ==========================================================

function initStatusSimulation() {
    const apiStatus = document.getElementById('api-status');
    const dbStatus = document.getElementById('db-status');
    const aiStatus = document.getElementById('ai-status');
    
    if (!apiStatus) return;
    
    // Simulate live status updates
    setInterval(() => {
        const responses = {
            api: ['Online (200 OK)', 'API Ready', 'Processing', 'Connected'],
            db: ['Connected', 'Syncing', 'Connected', 'Ready'],
            ai: ['Active', 'Listening', 'Processing', 'Active']
        };
        
        const getRandomStatus = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const getRandomPing = () => Math.floor(Math.random() * 25) + 8;
        
        if (apiStatus) apiStatus.textContent = getRandomStatus(responses.api) + ` (${getRandomPing()}ms)`;
        if (dbStatus) dbStatus.textContent = getRandomStatus(responses.db);
        if (aiStatus) aiStatus.textContent = getRandomStatus(responses.ai);
        
    }, 5000);
}

// ==========================================================
// SMOOTH SCROLL
// ==========================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================
// UTILITIES
// ==========================================================

function updateYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Scroll to top button functionality
function scrollToTop() {
    const topBtn = document.querySelector('.footer-top-btn');
    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

scrollToTop();

// ==========================================================
// PERFORMANCE OPTIMIZATION
// ==========================================================

// Lazy load images when needed
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce function for scroll events
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

// ==========================================================
// KEYBOARD NAVIGATION
// ==========================================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
        if (navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
    
    // Skip to main content (accessibility)
    if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        document.querySelector('main, section').focus();
    }
});

// ==========================================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================================

// Add ARIA labels and roles where needed
document.addEventListener('DOMContentLoaded', () => {
    // Ensure main content has proper structure
    const mainSections = document.querySelectorAll('section');
    mainSections.forEach(section => {
        if (!section.getAttribute('role')) {
            section.setAttribute('role', 'region');
        }
    });
});

// ==========================================================
// MOBILE VIEWPORT OPTIMIZATION
// ==========================================================

// Prevent zoom on input focus for better UX
const viewportMeta = document.querySelector('meta[name="viewport"]');
let isIOSChrome = /CriOS/.test(navigator.userAgent);

// ==========================================================
// ERROR HANDLING & LOGGING
// ==========================================================

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ==========================================================
// PERFORMANCE MONITORING
// ==========================================================

// Log performance metrics (for development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    });
}

// ==========================================================
// MODAL FUNCTIONALITY (Future use)
// ==========================================================

function showFeaturedDetails() {
    alert('Featured project architecture details:\n\n' +
        '• Voice Input → AI Engine (Python FastAPI)\n' +
        '• AI Engine → ASP.NET Core REST API\n' +
        '• REST API → SQL Server Database\n' +
        '• Database → IoT Device Control\n\n' +
        'This demonstrates a complete backend architecture with AI integration.');
}

// ==========================================================
// EASTER EGG
// ==========================================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerEasterEgg();
    }
});

function triggerEasterEgg() {
    const body = document.body;
    body.style.filter = 'hue-rotate(360deg)';
    
    setTimeout(() => {
        body.style.transition = 'filter 0.5s ease';
        body.style.filter = 'hue-rotate(0deg)';
    }, 100);
    
    console.log('🎮 Easter egg activated! You\'ve discovered the secret.');
}
