// Simple slideshow logic for project images
function showPrevSlide(containerId) {
    const container = document.getElementById(containerId);
    const slides = container.getElementsByClassName('slide');
    let current = 0;
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.display === 'block') {
            current = i;
            slides[i].style.display = 'none';
        }
    }
    let prev = (current - 1 + slides.length) % slides.length;
    slides[prev].style.display = 'block';
}

function showNextSlide(containerId) {
    const container = document.getElementById(containerId);
    const slides = container.getElementsByClassName('slide');
    let current = 0;
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.display === 'block') {
            current = i;
            slides[i].style.display = 'none';
        }
    }
    let next = (current + 1) % slides.length;
    slides[next].style.display = 'block';
}
// ===== PROFESSIONAL PORTFOLIO JAVASCRIPT =====
// High-end, luxury interactions and animations

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupLoadingScreen();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupFormHandling();
        this.setupSkillsAnimation();
        this.setupStatCounters();
        this.setupIntersectionObserver();
        this.setupParticleSystem();
    }

    // ===== LOADING SCREEN =====
    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        // Simulate loading time with realistic delay
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Trigger entrance animations after loading
            this.triggerEntranceAnimations();
        }, 2500);
    }

    triggerEntranceAnimations() {
        // Animate hero elements in sequence
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCTA = document.querySelector('.hero-cta');
        const heroStats = document.querySelector('.hero-stats');
        const scrollIndicator = document.querySelector('.scroll-indicator');

        if (heroTitle) heroTitle.style.animation = 'titleReveal 1s ease-out forwards';
        if (heroSubtitle) heroSubtitle.style.animation = 'fadeInUp 1s ease-out 0.3s forwards';
        if (heroCTA) heroCTA.style.animation = 'fadeInUp 1s ease-out 0.6s forwards';
        if (heroStats) heroStats.style.animation = 'fadeInUp 1s ease-out 0.9s forwards';
        if (scrollIndicator) scrollIndicator.style.animation = 'fadeInUp 1s ease-out 1.2s forwards';
    }

    // ===== NAVIGATION =====
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        });

        // Mobile menu toggle
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Smooth scrolling and active link highlighting
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Update active link on scroll
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (correspondingLink) correspondingLink.classList.add('active');
                }
            });
        });
    }

    // ===== SCROLL EFFECTS =====
    setupScrollEffects() {
        // Parallax effects
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.circuit-pattern');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Reveal animations on scroll
        this.setupScrollRevealAnimations();
    }

    setupScrollRevealAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(`
            .about-content,
            .skill-category,
            .project-card,
            .contact-item,
            .section-header
        `);

        animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });

        // Add CSS for scroll animations
        this.addScrollAnimationStyles();
    }

    addScrollAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .animate-on-scroll.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .skill-category.animate-on-scroll {
                transform: translateY(50px) scale(0.95);
            }
            
            .skill-category.animate-in {
                transform: translateY(0) scale(1);
            }
            
            .project-card.animate-on-scroll {
                transform: translateY(50px) rotateX(10deg);
            }
            
            .project-card.animate-in {
                transform: translateY(0) rotateX(0);
            }
        `;
        document.head.appendChild(style);
    }

    // ===== ANIMATIONS =====
    setupAnimations() {
        // Hover effects for buttons
        this.setupButtonHoverEffects();
        
        // Project card interactions
        this.setupProjectCardAnimations();
        
        // Skill bar animations
        this.setupSkillBarAnimations();
    }

    setupButtonHoverEffects() {
        const buttons = document.querySelectorAll('.cta-button, .submit-button');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.createRippleEffect(button);
            });
        });
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple-effect');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = rect.width / 2 - size / 2;
        const y = rect.height / 2 - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        // Add ripple animation keyframes
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => ripple.remove(), 600);
    }

    setupProjectCardAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateProjectCard(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateProjectCard(card, false);
            });
        });
    }

    animateProjectCard(card, isHover) {
        const image = card.querySelector('.project-image img');
        const overlay = card.querySelector('.project-overlay');
        const links = card.querySelectorAll('.project-link');
        
        if (isHover) {
            // Stagger animation for project links
            links.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = 'scale(1.1) rotate(360deg)';
                    link.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                }, index * 100);
            });
        } else {
            links.forEach(link => {
                link.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    }

    setupSkillBarAnimations() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        progressBar.style.width = `${targetWidth}%`;
                    }, 200);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    }

    // ===== SKILLS ANIMATION =====
    setupSkillsAnimation() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillCategory(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        skillCategories.forEach(category => observer.observe(category));
    }

    animateSkillCategory(category) {
        const skillItems = category.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-30px)';
                item.style.transition = 'all 0.5s ease-out';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 50);
            }, index * 150);
        });
    }

    // ===== STAT COUNTERS =====
    setupStatCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // ===== FORM HANDLING =====
    setupFormHandling() {
        const contactForm = document.getElementById('contactForm');
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        // Form validation and submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(contactForm);
        });
        
        // Enhanced form interactions
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                this.animateFormField(input, true);
            });
            
            input.addEventListener('blur', () => {
                this.animateFormField(input, false);
            });
            
            input.addEventListener('input', () => {
                this.validateField(input);
            });
        });
    }

    animateFormField(field, isFocused) {
        const formGroup = field.closest('.form-group');
        
        if (isFocused) {
            formGroup.style.transform = 'translateY(-2px)';
            formGroup.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.15)';
        } else {
            formGroup.style.transform = 'translateY(0)';
            formGroup.style.boxShadow = 'none';
        }
    }

    validateField(field) {
        const formGroup = field.closest('.form-group');
        const isValid = field.checkValidity();
        
        if (field.value.length > 0) {
            if (isValid) {
                formGroup.style.borderColor = '#28a745';
                this.showFieldFeedback(formGroup, 'valid');
            } else {
                formGroup.style.borderColor = '#dc3545';
                this.showFieldFeedback(formGroup, 'invalid');
            }
        } else {
            formGroup.style.borderColor = '';
            this.removeFieldFeedback(formGroup);
        }
    }

    showFieldFeedback(formGroup, type) {
        this.removeFieldFeedback(formGroup);
        
        const feedback = document.createElement('div');
        feedback.className = `field-feedback ${type}`;
        feedback.innerHTML = type === 'valid' 
            ? '<i class="fas fa-check"></i>' 
            : '<i class="fas fa-times"></i>';
        
        feedback.style.cssText = `
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: ${type === 'valid' ? '#28a745' : '#dc3545'};
            font-size: 1.2rem;
        `;
        
        formGroup.appendChild(feedback);
    }

    removeFieldFeedback(formGroup) {
        const existingFeedback = formGroup.querySelector('.field-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
    }

    async handleFormSubmission(form) {
        const submitButton = form.querySelector('.submit-button');
        const buttonText = submitButton.querySelector('.button-text');
        const originalText = buttonText.textContent;
        
        // Show loading state
        submitButton.disabled = true;
        buttonText.textContent = 'Sending...';
        submitButton.style.background = 'linear-gradient(135deg, #6c757d 0%, #495057 100%)';
        
        // Simulate form submission (replace with actual API call)
        try {
            await this.simulateFormSubmission(new FormData(form));
            
            // Success state
            buttonText.textContent = 'Message Sent!';
            submitButton.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            
            // Reset form
            setTimeout(() => {
                form.reset();
                buttonText.textContent = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
                
                // Remove all field feedback
                form.querySelectorAll('.field-feedback').forEach(feedback => {
                    feedback.remove();
                });
            }, 3000);
            
        } catch (error) {
            // Error state
            buttonText.textContent = 'Error - Try Again';
            submitButton.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
            
            setTimeout(() => {
                buttonText.textContent = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }
    }

    simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    // ===== INTERSECTION OBSERVER =====
    setupIntersectionObserver() {
        // Create a more sophisticated intersection observer for complex animations
        const complexObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerComplexAnimation(entry.target);
                }
            });
        }, {
            threshold: [0.1, 0.3, 0.5, 0.7],
            rootMargin: '-10% 0px -10% 0px'
        });

        // Observe sections for complex animations
        const sectionsToObserve = document.querySelectorAll(`
            .hero-section,
            .about-section,
            .skills-section,
            .projects-section,
            .contact-section
        `);

        sectionsToObserve.forEach(section => {
            complexObserver.observe(section);
        });
    }

    triggerComplexAnimation(section) {
        const sectionId = section.id;
        
        switch (sectionId) {
            case 'home':
                this.animateHeroSection(section);
                break;
            case 'about':
                this.animateAboutSection(section);
                break;
            case 'skills':
                this.animateSkillsSection(section);
                break;
            case 'projects':
                this.animateProjectsSection(section);
                break;
            case 'contact':
                this.animateContactSection(section);
                break;
        }
    }

    animateHeroSection(section) {
        const particles = section.querySelector('.floating-particles');
        if (particles && !particles.classList.contains('animated')) {
            particles.classList.add('animated');
            this.createFloatingParticles(particles);
        }
    }

    animateAboutSection(section) {
        const highlights = section.querySelectorAll('.highlight-item');
        highlights.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.opacity = '1';
            }, index * 200);
        });
    }

    animateSkillsSection(section) {
        const categories = section.querySelectorAll('.skill-category');
        categories.forEach((category, index) => {
            setTimeout(() => {
                category.style.transform = 'translateY(0) rotateX(0)';
                category.style.opacity = '1';
            }, index * 300);
        });
    }

    animateProjectsSection(section) {
        const projects = section.querySelectorAll('.project-card');
        projects.forEach((project, index) => {
            setTimeout(() => {
                project.style.transform = 'translateY(0) rotateY(0)';
                project.style.opacity = '1';
            }, index * 200);
        });
    }

    animateContactSection(section) {
        const contactItems = section.querySelectorAll('.contact-item');
        const form = section.querySelector('.contact-form');
        
        contactItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, index * 150);
        });
        
        setTimeout(() => {
            if (form) {
                form.style.transform = 'scale(1)';
                form.style.opacity = '1';
            }
        }, 500);
    }

    // ===== PARTICLE SYSTEM =====
    setupParticleSystem() {
        this.createBackgroundParticles();
    }

    createBackgroundParticles() {
        const hero = document.querySelector('.hero-section');
        if (!hero) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'background-particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;

        hero.appendChild(particleContainer);

        // Create particles
        for (let i = 0; i < 50; i++) {
            this.createParticle(particleContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, #00d4ff, #0099cc);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            opacity: 0.6;
            animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
        `;

        container.appendChild(particle);

        // Add particle animation if not exists
        if (!document.querySelector('#particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes particleFloat {
                    0%, 100% {
                        transform: translateY(0) translateX(0) rotate(0deg);
                        opacity: 0.3;
                    }
                    50% {
                        transform: translateY(-100px) translateX(50px) rotate(180deg);
                        opacity: 0.8;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createFloatingParticles(container) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 3 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 3;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: #00d4ff;
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                animation: enhancedFloat 6s ease-in-out ${delay}s infinite;
            `;

            container.appendChild(particle);
        }

        // Add enhanced float animation
        if (!document.querySelector('#enhanced-float-animation')) {
            const style = document.createElement('style');
            style.id = 'enhanced-float-animation';
            style.textContent = `
                @keyframes enhancedFloat {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0.4;
                    }
                    33% {
                        transform: translateY(-30px) rotate(120deg);
                        opacity: 0.8;
                    }
                    66% {
                        transform: translateY(-60px) rotate(240deg);
                        opacity: 0.6;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('navMenu');
                
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });

        // Resize handler
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Mouse tracking for subtle effects
        document.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
    }

    handleResize() {
        // Recalculate particle positions
        const particles = document.querySelectorAll('.background-particles div');
        particles.forEach(particle => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
        });
    }

    handleMouseMove(e) {
        // Subtle mouse tracking effect for hero section
        const hero = document.querySelector('.hero-section');
        if (!hero) return;

        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const circuitPattern = hero.querySelector('.circuit-pattern');
        if (circuitPattern) {
            const translateX = (x - 0.5) * 20;
            const translateY = (y - 0.5) * 20;
            circuitPattern.style.transform = `translate(${translateX}px, ${translateY}px)`;
        }
    }

    // ===== UTILITY FUNCTIONS =====
    debounce(func, wait) {
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

    // ===== PERFORMANCE OPTIMIZATION =====
    optimizePerformance() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // Preload critical resources
        this.preloadCriticalResources();
    }

    preloadCriticalResources() {
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }
}

// ===== INITIALIZE APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    app.optimizePerformance();
});

// ===== ADDITIONAL ENHANCEMENTS =====

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    import('https://cdn.jsdelivr.net/npm/smooth-scroll@16.1.3/dist/smooth-scroll.polyfills.min.js')
        .then(() => {
            new SmoothScroll('a[href*="#"]');
        });
}

// Enhanced console branding
console.log(`
    %c██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
    %c██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
    %c██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
    %c██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
    %c██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
    %c╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
    
    %cProfessional IoT & Embedded Systems Engineer Portfolio
    %cDesigned & Built with precision • Made with ❤️ in VS Code
`, 
    'color: #00d4ff; font-weight: bold;',
    'color: #00d4ff; font-weight: bold;',
    'color: #00d4ff; font-weight: bold;',
    'color: #00d4ff; font-weight: bold;',
    'color: #00d4ff; font-weight: bold;',
    'color: #00d4ff; font-weight: bold;',
    'color: #ffffff; font-size: 16px; font-weight: bold; margin-top: 10px;',
    'color: #6c757d; font-size: 12px; margin-top: 5px;'
);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`🚀 Portfolio loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
        }, 0);
    });
}
