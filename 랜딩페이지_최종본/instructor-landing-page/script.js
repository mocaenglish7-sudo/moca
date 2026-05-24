// Initialize Lucide Icons
lucide.createIcons();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Adjust scroll position for fixed header
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply initial state and observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Select elements to animate (excluding hero section which has its own CSS animation)
    const elementsToAnimate = document.querySelectorAll(`
        .section-header,
        .target-card,
        .service-card,
        .step,
        .stat-card,
        .project-item
    `);
    
    elementsToAnimate.forEach((el, index) => {
        // Set initial state via inline styles to not interfere with CSS classes
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Add a slight stagger effect based on flex/grid order if possible, or just index
        // For simplicity, we just observe them all
        observer.observe(el);
    });
    
    // Header shadow on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});

// Instructor Modal Logic
const modal = document.getElementById('instructor-modal');
const openBtn = document.getElementById('open-instructor-modal');
const closeBtn = document.getElementById('close-instructor-modal');

if (modal && openBtn && closeBtn) {
    // Open modal
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    });

    // Close modal via close button
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    });

    // Close modal by clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });

    // Close modal via Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
}

// KDTO Modal Logic
const kdtoModal = document.getElementById('kdto-modal');
const openKdtoBtn = document.getElementById('open-kdto-modal');
const closeKdtoBtn = document.getElementById('close-kdto-modal');

if (kdtoModal && openKdtoBtn && closeKdtoBtn) {
    // Open modal
    openKdtoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        kdtoModal.classList.add('active');
        document.body.classList.add('modal-open');
    });

    // Close modal via close button
    closeKdtoBtn.addEventListener('click', () => {
        kdtoModal.classList.remove('active');
    });

    // Close modal by clicking outside content
    kdtoModal.addEventListener('click', (e) => {
        if (e.target === kdtoModal) {
            kdtoModal.classList.remove('active');
        }
    });

    // Close modal via Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && kdtoModal.classList.contains('active')) {
            kdtoModal.classList.remove('active');
        }
    });
}
