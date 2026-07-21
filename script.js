document.addEventListener('DOMContentLoaded', () => {

    // --- 1. STICKY NAVBAR & SCROLL DETECTOR ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        activateNavOnScroll();
    });

    // --- 2. MOBILE HAMBURGER MENU ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    // Menü elemanına tıklandığında mobilde menüyü kapat
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- 3. ACTIVE NAV LINK ON SCROLL ---
    const sections = document.querySelectorAll('section[id]');

    function activateNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });
    }

    // --- 4. FRONTEND FORM VALIDATION ---
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        // Reset errors
        document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));

        // Validate Name
        if (nameInput.value.trim() === '') {
            showError(nameInput);
            isValid = false;
        }

        // Validate Email
        if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput);
            isValid = false;
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            showError(messageInput);
            isValid = false;
        }

        if (isValid) {
            formStatus.style.color = '#27c93f';
            formStatus.textContent = 'Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağım.';
            contactForm.reset();

            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        }
    });

    function showError(inputElement) {
        inputElement.parentElement.classList.add('error');
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});