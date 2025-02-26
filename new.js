// ----- Menu Toggle Function -----
function myMenufunction() {
    var menuBtn = document.getElementById("myNavmenu");
    if (menuBtn.className === "nav-menu") {
        menuBtn.className += " responsive";
        // Add close button to the menu when it's open
        if (!document.querySelector('.close-btn')) {
            const closeBtn = document.createElement('div');
            closeBtn.className = 'close-btn';
            closeBtn.innerHTML = '<i class="uil uil-times"></i>';
            closeBtn.onclick = closeMenu;
            menuBtn.appendChild(closeBtn);
        }
        // Prevent background scrolling when menu is open
        document.body.style.overflow = 'hidden';
    } else {
        closeMenu();
    }
}

// Close menu function
function closeMenu() {
    var menuBtn = document.getElementById("myNavmenu");
    menuBtn.className = "nav-menu";
    document.body.style.overflow = 'auto';
}

// Close menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
});

// ----- Dark Mode Toggle -----
const toggleSwitch = document.getElementById('toggle-switch');
const body = document.body;

// Check for saved theme preference
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark');
}

toggleSwitch.addEventListener('click', () => {
    body.classList.toggle('dark');
    // Save preference
    localStorage.setItem('darkMode', body.classList.contains('dark'));
});

// ----- Typing Effect -----
var typingEffect = new Typed(".typedText", {
    strings: ["Designer", "Coder", "Developer", "Programmer"],
    loop: true,
    typeSpeed: 150,
    backSpeed: 80,
    backDelay: 2000,
});

// ----- Scroll Animation -----
const sr = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 2000,
    reset: true,
    mobile: true, // Explicitly enable on mobile
});

// Add a small delay for mobile to ensure elements are loaded
const isMobile = window.innerWidth <= 768;
const delayMultiplier = isMobile ? 1.5 : 1;

sr.reveal(".featured-name", { delay: 100 * delayMultiplier });
sr.reveal(".text-info", { delay: 200 * delayMultiplier });
sr.reveal(".text-btn", { delay: 200 * delayMultiplier });
sr.reveal(".social_icons", { delay: 200 * delayMultiplier });
sr.reveal(".featured-image", { delay: 320 * delayMultiplier });

sr.reveal(".project-box", { interval: 200 * delayMultiplier });
sr.reveal(".top-header", {});

const srleft = ScrollReveal({
    origin: "left",
    distance: "80px",
    duration: 2000,
    reset: true,
    mobile: true, // Explicitly enable on mobile
});

srleft.reveal(".about-info", { delay: 100 * delayMultiplier });
srleft.reveal(".contact-info", { delay: 100 * delayMultiplier });

const srRight = ScrollReveal({
    origin: "right",
    distance: "80px",
    duration: 2000,
    reset: true,
    mobile: true, // Explicitly enable on mobile
});

srRight.reveal(".skill", { delay: 100 * delayMultiplier });
srRight.reveal(".skill-box", { delay: 100 * delayMultiplier });

// On mobile, use a simpler animation for better performance
if (isMobile) {
    const srSimple = ScrollReveal({
        origin: "bottom",
        distance: "40px",
        duration: 1500,
        reset: false, // Don't reset on mobile for better performance
    });
    
    srSimple.reveal(".project-box", { interval: 150 });
    srSimple.reveal(".skill-box", { interval: 150 });
}

// ----- Active Link on Scroll ----
const sections = document.querySelectorAll(".section[id]");

function scrollActive() {
    const scrollY = window.scrollY;
    
    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100; // Adjusted offset for mobile
        const sectionId = current.getAttribute("id");
        
        // Check if there is a nav link for this section before manipulating classes
        const navLink = document.querySelector(".nav-menu a[href='#" + sectionId + "']");
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add("active-link");
            } else {
                navLink.classList.remove("active-link");
            }
        }
    });
}

window.addEventListener("scroll", scrollActive);

// ----- Form Validation -----
const contactForm = document.querySelector('.form-control');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameField = document.querySelector('input[placeholder="Your Name"]');
        const emailField = document.querySelector('input[placeholder="Your Email"]');
        const messageField = document.querySelector('textarea');
        
        // Simple validation
        let isValid = true;
        if (!nameField.value.trim()) {
            nameField.style.borderColor = 'red';
            isValid = false;
        } else {
            nameField.style.borderColor = '';
        }
        
        if (!emailField.value.trim() || !emailField.value.includes('@')) {
            emailField.style.borderColor = 'red';
            isValid = false;
        } else {
            emailField.style.borderColor = '';
        }
        
        if (!messageField.value.trim()) {
            messageField.style.borderColor = 'red';
            isValid = false;
        } else {
            messageField.style.borderColor = '';
        }
        
        if (isValid) {
            // Here you would typically send the form data
            alert('Thanks for your message! I will get back to you soon.');
            contactForm.reset();
        }
    });
}

// ----- Page Load Optimization -----
// Defer non-critical operations
window.addEventListener('load', function() {
    // Fix any layout shifts after images load
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            imgLoaded();
        } else {
            img.addEventListener('load', imgLoaded);
        }
        
        function imgLoaded() {
            img.style.opacity = '1';
        }
    });
    
    // Check viewport height for mobile browsers (address bar issues)
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
});