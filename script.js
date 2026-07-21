document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animasyon bir kez çalışsın
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Contact Form Handling (Frontend Demo)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simüle edilmiş form gönderimi
        formStatus.style.color = 'var(--primary-neon)';
        formStatus.textContent = 'Mesajınız gönderiliyor...';

        setTimeout(() => {
            formStatus.style.color = '#27c93f';
            formStatus.textContent = 'Teşekkürler! Mesajınız başarıyla iletildi.';
            contactForm.reset();
        }, 1500);
    });

    // 5. Mock Status Checker (HomeOS Panel)
    const simulateLiveStatus = () => {
        const statuses = ['Online (200 OK)', 'Processing', 'Active'];
        const apiStatus = document.getElementById('api-status');
        
        setInterval(() => {
            // Canlı hissi vermek için rastgele ms değerleri güncellemesi simülasyonu
            const randomPing = Math.floor(Math.random() * 20) + 12;
            if(apiStatus) {
                apiStatus.textContent = `Online (200 OK) - ${randomPing}ms`;
            }
        }, 4000);
    };

    simulateLiveStatus();
});

// Modal Functions
function openModal(projectName) {
    const modal = document.getElementById('project-modal');
    const title = document.getElementById('modal-title');
    const desc = document.getElementById('modal-description');

    const details = {
        'HomeOS': 'HomeOS; backend katmanında ASP.NET Core Web API mimarisinden yararlanan, verilerini SQL Server üzerinde ilişkisel tablolarla tutan ve Python (FastAPI/WebSocket) yapay zeka servisiyle gerçek zamanlı haberleşen modüler bir akıllı ev yönetim portalıdır.',
        'Jarvis AI Assistant': 'Jarvis; sesli komutları işleyerek metne dönüştüren, doğal dil işleme katmanıyla anlamlandıran ve WebSockets protokolü vasıtasıyla HomeOS REST API servislerini tetikleyen Python tabanlı bir mikroservistir.',
        'Automation System': 'Cihazlar ve sensörlerden gelen asenkron verileri işleyen, kullanıcı tanımlı kuralları (If-This-Then-That) arka planda milisaniyeler içerisinde çalıştıran otomasyon motorudur.'
    };

    title.textContent = projectName;
    desc.textContent = details[projectName] || 'Proje detayları hazırlanıyor.';
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.style.display = 'none';
}

// Modal dışına tıklandığında kapatma
window.onclick = function(event) {
    const modal = document.getElementById('project-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};