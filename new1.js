// ----- Improved UI JavaScript -----

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ----- Menu Toggle Function -----
    setupMobileMenu();
    
    // ----- Dark Mode Toggle -----
    setupDarkMode();
    
    // ----- Typing Effect -----
    setupTypingEffect();
    
    // ----- Scroll Animations -----
    setupScrollAnimations();
    
    // ----- Active Link on Scroll -----
    setupActiveLinks();
    
    // ----- Form Validation -----
    setupFormValidation();
    
    // ----- Scroll Progress Indicator -----
    setupScrollProgress();
    
    // ----- Back to Top Button -----
    setupBackToTop();
    
    // ----- Smooth Scrolling for Anchor Links -----
    setupSmoothScrolling();
    
    // ----- Update Year in Footer -----
    updateFooterYear();
});

// Mobile Menu Setup
function setupMobileMenu() {
    const menuBtn = document.querySelector('.nav-menu-btn i');
    const navMenu = document.getElementById('myNavmenu');
    
    // Create close button for mobile menu
    const closeBtn = document.createElement('div');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '<i class="uil uil-times"></i>';
    
    function openMenu() {
        navMenu.classList.add('responsive');
        if (!navMenu.querySelector('.close-btn')) {
            navMenu.appendChild(closeBtn);
        }
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        navMenu.classList.remove('responsive');
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners
    if (menuBtn) {
        menuBtn.addEventListener('click', openMenu);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navMenu.contains(event.target) || menuBtn.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('responsive')) {
            closeMenu();
        }
    });
}

// Dark Mode Setup
function setupDarkMode() {
    const toggleSwitch = document.getElementById('toggle-switch');
    const body = document.body;
    
    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark');
    }
    
    // Apply meta theme color based on mode
    function updateMetaThemeColor() {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', 
                body.classList.contains('dark') ? '#1f2937' : '#6d28d9');
        }
    }
    
    updateMetaThemeColor();
    
    // Toggle dark mode
    if (toggleSwitch) {
        toggleSwitch.addEventListener('click', () => {
            body.classList.toggle('dark');
            
            // Save preference
            localStorage.setItem('darkMode', body.classList.contains('dark'));
            
            // Update meta theme color
            updateMetaThemeColor();
            
            // Add animation effect to body
            body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        });
    }
}

// Typing Effect Setup
function setupTypingEffect() {
    const typedTextElement = document.querySelector('.typedText');
    
    if (typedTextElement && typeof Typed !== 'undefined') {
        var typingEffect = new Typed('.typedText', {
            strings: ["Designer", "Developer", "Programmer", "Web Creator"],
            loop: true,
            typeSpeed: 100,
            backSpeed: 80,
            backDelay: 2000,
            startDelay: 500,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }
}

// Scroll Animations Setup
function setupScrollAnimations() {
    if (typeof ScrollReveal !== 'undefined') {
        // Detect if mobile for performance optimizations
        const isMobile = window.innerWidth <= 768;
        const delayMultiplier = isMobile ? 1.2 : 1;
        const resetValue = isMobile ? false : true; // Don't reset on mobile for better performance
        
        // Base reveal configuration
        const sr = ScrollReveal({
            origin: 'top',
            distance: '60px',
            duration: 1500,
            delay: 200,
            reset: resetValue,
            mobile: true,
            easing: 'ease-out'
        });
        
        // Staggered reveal for elements
        sr.reveal('.featured-name', { delay: 100 * delayMultiplier });
        sr.reveal('.text-info', { delay: 200 * delayMultiplier });
        sr.reveal('.text-btn', { delay: 300 * delayMultiplier });
        sr.reveal('.social_icons', { delay: 400 * delayMultiplier });
        
        // Revealing the image with a special animation
        sr.reveal('.featured-image', { 
            delay: 300 * delayMultiplier,
            origin: 'right',
            distance: '80px'
        });
        
        // Section headers
        sr.reveal('.top-header', {
            distance: '40px',
            delay: 100
        });
        
        // Project boxes with interval
        sr.reveal('.project-box', { 
            interval: 200, 
            delay: 100,
            origin: 'bottom'
        });
        
        // Left side reveals
        const srLeft = ScrollReveal({
            origin: 'left',
            distance: '80px',
            duration: 1500,
            delay: 100,
            reset: resetValue,
            mobile: true,
            easing: 'ease-out'
        });
        
        srLeft.reveal('.about-info', { delay: 200 });
        srLeft.reveal('.contact-info', { delay: 200 });
        
        // Right side reveals
        const srRight = ScrollReveal({
            origin: 'right',
            distance: '80px',
            duration: 1500,
            delay: 100,
            reset: resetValue,
            mobile: true,
            easing: 'ease-out'
        });
        
        srRight.reveal('.skill', { delay: 200 });
        
        // Bottom reveals for skills
        const srBottom = ScrollReveal({
            origin: 'bottom',
            distance: '40px',
            duration: 1200,
            delay: 100,
            reset: false,
            mobile: true,
            easing: 'ease-out'
        });
        
        srBottom.reveal('.skill-box', { interval: 150 });
        srBottom.reveal('.form-control', { delay: 200 });
    }
}

// Active Link on Scroll Setup
function setupActiveLinks() {
    const sections = document.querySelectorAll(".section[id]");
    
    function scrollActive() {
        const scrollY = window.scrollY;
        
        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Adjusted offset for navbar
            const sectionId = current.getAttribute("id");
            
            // Check if there is a nav link for this section before manipulating classes
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    // Remove active-link class from all nav links
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active-link');
                    });
                    
                    // Add active-link class to current nav link
                    navLink.classList.add('active-link');
                }
            }
        });
        
        // Add active-link to Home when at the top
        if (scrollY < 100) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active-link');
            });
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) homeLink.classList.add('active-link');
        }
    }
    
    window.addEventListener("scroll", scrollActive);
    
    // Initial call to set the active link when page loads
    scrollActive();
}

// Form Validation Setup
function setupFormValidation() {
    const contactForm = document.querySelector('.form-control');
    
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameField = document.querySelector('input[placeholder="Your Name"]');
            const emailField = document.querySelector('input[placeholder="Your Email"]');
            const subjectField = document.querySelector('input[placeholder="Subject"]');
            const messageField = document.querySelector('textarea');
            
            // Simple validation
            let isValid = true;
            
            // Validate name
            if (!nameField.value.trim()) {
                showError(nameField, 'Please enter your name');
                isValid = false;
            } else {
                clearError(nameField);
            }
            
            // Validate email
            if (!emailField.value.trim() || !isValidEmail(emailField.value)) {
                showError(emailField, 'Please enter a valid email');
                isValid = false;
            } else {
                clearError(emailField);
            }
            
            // Validate message
            if (!messageField.value.trim()) {
                showError(messageField, 'Please enter your message');
                isValid = false;
            } else {
                clearError(messageField);
            }
            
            if (isValid) {
                // Show loading state
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                
                // Simulate form submission (you would replace this with your actual form submission)
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.style.backgroundColor = '#10b981';
                    successMessage.style.color = 'white';
                    successMessage.style.padding = '1rem';
                    successMessage.style.borderRadius = '8px';
                    successMessage.style.marginTop = '1rem';
                    successMessage.style.textAlign = 'center';
                    successMessage.innerText = 'Thank you! Your message has been sent successfully.';
                    
                    contactForm.appendChild(successMessage);
                    contactForm.reset();
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        successMessage.style.transition = 'opacity 0.5s ease';
                        
                        setTimeout(() => {
                            contactForm.removeChild(successMessage);
                        }, 500);
                    }, 5000);
                }, 2000);
            }
        });
        
        // Helper functions for form validation
        function showError(field, message) {
            field.style.borderColor = 'var(--error-color)';
            
            // Check if error message exists
            let errorMessage = field.parentElement.querySelector('.error-message');
            
            if (!errorMessage) {
                errorMessage = document.createElement('small');
                errorMessage.className = 'error-message';
                errorMessage.style.color = 'var(--error-color)';
                errorMessage.style.fontSize = '0.8rem';
                errorMessage.style.marginTop = '5px';
                errorMessage.style.display = 'block';
                field.parentElement.appendChild(errorMessage);
            }
            
            errorMessage.textContent = message;
        }
        
        function clearError(field) {
            field.style.borderColor = '';
            
            const errorMessage = field.parentElement.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
}

// Scroll Progress Indicator Setup
function setupScrollProgress() {
    // Create scroll progress bar
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    // Update progress bar width on scroll
    window.addEventListener('scroll', function() {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = progress + '%';
    });
}

// Back to Top Button Setup
function setupBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="uil uil-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scrolling for Anchor Links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update Year in Footer
function updateFooterYear() {
    const yearElement = document.querySelector('.bottom-footer p');
    if (yearElement) {
        const year = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace(/\d{4}/, year);
    }
}

// Add skill percentage data attributes
function updateSkillPercentages() {
    const skillBoxes = document.querySelectorAll('.skill-box');
    
    skillBoxes.forEach(box => {
        const title = box.querySelector('.title');
        const skillPer = box.querySelector('.skill-per');
        
        if (title && skillPer) {
            // Get width percentage from the tooltip
            const tooltip = skillPer.querySelector('.tooltip');
            if (tooltip) {
                const percent = tooltip.textContent;
                title.setAttribute('data-percent', percent);
            }
        }
    });
}

// Call this function after DOM is loaded
document.addEventListener('DOMContentLoaded', updateSkillPercentages);

// Function to be called from HTML (keep for compatibility)
function myMenufunction() {
    var menuBtn = document.getElementById("myNavmenu");
    if (menuBtn.className === "nav-menu") {
        menuBtn.className += " responsive";
        
        // Add close button if it doesn't exist
        if (!menuBtn.querySelector('.close-btn')) {
            const closeBtn = document.createElement('div');
            closeBtn.className = 'close-btn';
            closeBtn.innerHTML = '<i class="uil uil-times"></i>';
            closeBtn.onclick = function() {
                menuBtn.className = "nav-menu";
                document.body.style.overflow = 'auto';
            };
            menuBtn.appendChild(closeBtn);
        }
        
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    } else {
        menuBtn.className = "nav-menu";
        document.body.style.overflow = 'auto';
    }
}