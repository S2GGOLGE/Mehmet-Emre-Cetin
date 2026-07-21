// ==========================================================
// MEHMET EMRE ÇETİN PORTFOLIO - INTERACTIVE ENGINE
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initStatusSimulation();
    initSmoothScroll();
    initArchitectureModal();
    updateYear();
});

// ==========================================================
// NAVIGATION & NAVBAR
// ==========================================================

function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            const expanded = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', expanded);
        });

        // Close menu when clicking a navigation link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Navbar scroll background effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightActiveNavLink();
    }, { passive: true });
}

function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');

    let currentSection = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// ==========================================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ==========================================================

function initScrollAnimations() {
    const revealElements = document.querySelectorAll('[data-reveal]');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger effect
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, (index % 4) * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('revealed'));
    }
}

// ==========================================================
// CONTACT FORM VALIDATION & SUBMISSION
// ==========================================================

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const formStatus = document.getElementById('form-status');
        const submitBtn = form.querySelector('button[type="submit"]');

        // Reset errors
        document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));

        let isValid = true;

        if (!nameInput.value.trim()) {
            showFieldError(nameInput);
            isValid = false;
        }

        if (!validateEmail(emailInput.value.trim())) {
            showFieldError(emailInput);
            isValid = false;
        }

        if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
            showFieldError(messageInput);
            isValid = false;
        }

        if (!isValid) {
            showFormStatus('Lütfen kırmızı ile işaretlenen alanları kontrol ediniz.', 'error', formStatus);
            return;
        }

        // Loading state
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';

        try {
            // Simulate backend async request delay
            await new Promise(resolve => setTimeout(resolve, 1200));

            showFormStatus('✓ Mesajınız başarıyla iletildi! En kısa sürede geri dönüş yapacağım.', 'success', formStatus);
            form.reset();
        } catch (error) {
            showFormStatus('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.', 'error', formStatus);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

function showFieldError(inputElement) {
    if (inputElement && inputElement.parentElement) {
        inputElement.parentElement.classList.add('error');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFormStatus(message, type, element) {
    if (!element) return;
    element.textContent = message;
    element.className = `form-status show ${type}`;

    if (type === 'success') {
        setTimeout(() => {
            element.classList.remove('show');
        }, 6000);
    }
}

// ==========================================================
// HOMEOS SYSTEM STATUS SIMULATION
// ==========================================================

function initStatusSimulation() {
    const apiStatus = document.getElementById('api-status');
    const dbStatus = document.getElementById('db-status');
    const aiStatus = document.getElementById('ai-status');

    if (!apiStatus) return;

    setInterval(() => {
        const ping = Math.floor(Math.random() * 15) + 8;
        apiStatus.textContent = `Online (200 OK) (${ping}ms)`;

        const dbStates = ['Bağlandı', 'Senkronize', 'Hazır'];
        dbStatus.textContent = dbStates[Math.floor(Math.random() * dbStates.length)];

        const aiStates = ['Aktif', 'Dinliyor', 'İşliyor'];
        aiStatus.textContent = aiStates[Math.floor(Math.random() * aiStates.length)];
    }, 4500);
}

// ==========================================================
// SMOOTH SCROLLING
// ==========================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 75;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================
// ARCHITECTURE MODAL / INFORMATION
// ==========================================================

function initArchitectureModal() {
    const archBtn = document.getElementById('architecture-btn');
    if (archBtn) {
        archBtn.addEventListener('click', () => {
            alert(
                '📌 HomeOS Ekosistemi Mimari Detayları:\n\n' +
                '• Sesli / Metinsel Girdi → AI Motoru (Python FastAPI)\n' +
                '• AI Motoru → ASP.NET Core REST API Servisleri\n' +
                '• REST API → SQL Server Veritabanı & JWT Doğrulama\n' +
                '• Veritabanı & API → Gerçek Zamanlı IoT Cihaz Yönetimi\n\n' +
                'Clean Architecture ve SOLID prensiplerine uygun, ölçeklenebilir altyapı.'
            );
        });
    }
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

// Keyboard shortcuts (Escape key closes mobile menu)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
});
