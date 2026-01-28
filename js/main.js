/**
 * The Security Specialist - Main JavaScript
 * Handles all interactive functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    // ==========================================
    // Navbar Scroll Effect
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ==========================================
    // Active Navigation Link on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                } else if (scrollY === 0) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    document.querySelector('.nav-link[href="#home"]')?.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // ==========================================
    // Smooth Scrolling for Anchor Links
    // ==========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore if it's just a hash
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                e.preventDefault();
                
                const offsetTop = targetSection.offsetTop - 80; // Offset for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // Contact Form Handling
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                service: document.getElementById('service').value,
                message: document.getElementById('message').value.trim()
            };
            
            // Validate form
            if (!validateForm(formData)) {
                return;
            }
            
            // Simulate form submission (in production, this would be an API call)
            submitForm(formData);
        });
    }
    
    /**
     * Validate form data
     */
    function validateForm(data) {
        let isValid = true;
        
        // Name validation
        if (data.name.length < 2) {
            showError('name', 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        } else {
            clearError('name');
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError('email');
        }
        
        // Phone validation
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(data.phone)) {
            showError('phone', 'Please enter a valid phone number (at least 10 digits)');
            isValid = false;
        } else {
            clearError('phone');
        }
        
        // Message validation
        if (data.message.length < 10) {
            showError('message', 'Please enter a message (at least 10 characters)');
            isValid = false;
        } else {
            clearError('message');
        }
        
        return isValid;
    }
    
    /**
     * Show validation error
     */
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        
        // Remove existing error
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error styling
        field.style.borderColor = '#ca3b37';
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ca3b37';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '4px';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }
    
    /**
     * Clear validation error
     */
    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        
        // Remove error styling
        field.style.borderColor = '#444444';
        
        // Remove error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    /**
     * Submit form (simulated)
     */
    function submitForm(data) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Log form data (in production, this would be sent to a server)
            console.log('Form submitted with data:', data);
            
            // Hide form and show success message
            contactForm.style.display = 'none';
            formSuccess.classList.add('active');
            
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            // Reset form after 5 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'flex';
                formSuccess.classList.remove('active');
            }, 5000);
            
            // Optional: Send email notification or store in database
            // This would typically be done on the server side
        }, 1500);
    }
    
    // ==========================================
    // Scroll to Top Button
    // ==========================================
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==========================================
    // Intersection Observer for Animations
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateOnScroll = document.querySelectorAll('.service-card, .why-card, .contact-card, .about-feature');
    
    animateOnScroll.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // ==========================================
    // Hero Stats Counter Animation
    // ==========================================
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-content h3');
        
        statNumbers.forEach((stat, index) => {
            const text = stat.textContent;
            const hasNumber = /\d+/.test(text);
            
            if (hasNumber) {
                const number = parseInt(text.match(/\d+/)[0]);
                const suffix = text.replace(/\d+/, '');
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        stat.textContent = number + suffix;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, 30);
            }
        });
    }
    
    // ==========================================
    // Dynamic Year in Footer
    // ==========================================
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.footer-bottom p');
    if (yearElements.length > 0) {
        yearElements[0].innerHTML = yearElements[0].innerHTML.replace('2026', currentYear);
    }
    
    // ==========================================
    // Service Card Hover Effect Enhancement
    // ==========================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#ca3b37';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'transparent';
        });
    });
    
    // ==========================================
    // Phone Number Click to Call Tracking
    // ==========================================
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone call initiated:', this.getAttribute('href'));
            // You can add analytics tracking here
        });
    });
    
    // ==========================================
    // Email Click Tracking
    // ==========================================
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Email link clicked:', this.getAttribute('href'));
            // You can add analytics tracking here
        });
    });
    
    // ==========================================
    // Lazy Loading for Images (if needed in future)
    // ==========================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // ==========================================
    // Console Welcome Message
    // ==========================================
    console.log('%c🛡️ The Security Specialist', 'font-size: 20px; font-weight: bold; color: #ca3b37;');
    console.log('%cWebsite loaded successfully!', 'font-size: 14px; color: #f9f7f2;');
    console.log('%cContact: 067 918 0373 | lohrmanndenzil@gmail.com', 'font-size: 12px; color: #999;');
    
});

// ==========================================
// Handle window resize
// ==========================================
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Close mobile menu if window is resized to desktop size
        if (window.innerWidth > 768) {
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            const navMenu = document.getElementById('navMenu');
            
            if (mobileMenuToggle && navMenu) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }, 250);
});

// ==========================================
// Prevent default behavior for empty hash links
// ==========================================
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
        e.preventDefault();
    }
});
