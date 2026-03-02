// ===== HIDE/SHOW NAVIGATION ON SCROLL =====
let lastScrollTop = 0;
const navLinksElement = document.querySelector('.nav-links');
const burgerMenu = document.querySelector('.burger');
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
        // Scrolling DOWN - hide nav links and minimize header
        navLinksElement.classList.add('hide-nav');
        burgerMenu.classList.add('hide-nav');
        header.classList.add('minimal-header');
    } else {
        // Scrolling UP - show nav links and restore header
        navLinksElement.classList.remove('hide-nav');
        burgerMenu.classList.remove('hide-nav');
        header.classList.remove('minimal-header');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ===== HEADER BACKGROUND SLIDESHOW =====
// Add your header images into the /images/ folder and update paths below if needed.
const headerSlides = [
    'images/hero1.jpeg',
    'images/hero2.jpeg',
    'images/hero3.jpeg',
    'images/hero4.jpeg',
    'images/hero5.jpeg'
];
let slideIndex = 0;
const slideInterval = 5000; // 5 seconds
function showNextHeaderSlide() {
    if (!header) return;
    slideIndex = (slideIndex + 1) % headerSlides.length;
    header.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url("${headerSlides[slideIndex]}")`;
}

// Initialize first slide (images only)
if (headerSlides.length > 0 && header) {
    header.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url("${headerSlides[0]}")`;
    header.style.backgroundSize = 'cover';
    header.style.backgroundPosition = 'center';
    setInterval(showNextHeaderSlide, slideInterval);
}

// ===== MOBILE NAVIGATION TOGGLE =====
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    
    // Animate burger
    burger.querySelectorAll('div').forEach((line, index) => {
        if (nav.classList.contains('nav-active')) {
            if (index === 0) line.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            if (index === 1) line.style.opacity = '0';
            if (index === 2) line.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            line.style.transform = 'none';
            line.style.opacity = '1';
        }
    });
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.querySelectorAll('div').forEach(line => {
            line.style.transform = 'none';
            line.style.opacity = '1';
        });
    });
});

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            let current = 0;
            const increment = target / 30;
            
            const counting = setInterval(() => {
                current += increment;
                if (current >= target) {
                    entry.target.textContent = target;
                    entry.target.classList.add('counted');
                    clearInterval(counting);
                } else {
                    entry.target.textContent = Math.floor(current);
                }
            }, 30);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and project cards
document.querySelectorAll('.service-card, .project-card, .stat-card, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('BirdTech Systems - Website loaded successfully');
