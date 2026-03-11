// ========================================
// Initialize Variables First
// ========================================
let cursorDot = null;
let cursorRing = null;
let navbar = null;
let navToggle = null;
let navMenu = null;
let navLinks = null;
let sections = null;
let statNumbers = null;
let statsSection = null;
let statsAnimated = false;

// ========================================
// DOM Ready Handler
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM references
    cursorDot = document.querySelector('.cursor-dot');
    cursorRing = document.querySelector('.cursor-ring');
    navbar = document.getElementById('navbar');
    navToggle = document.getElementById('navToggle');
    navMenu = document.getElementById('navMenu');
    navLinks = document.querySelectorAll('.nav-link');
    sections = document.querySelectorAll('section[id]');
    statNumbers = document.querySelectorAll('.stat-number');
    statsSection = document.getElementById('stats');
    
    // Initialize all features
    initCursor();
    initParticles();
    initNavbar();
    initTyped();
    initHeroAnimations();
    initScrollAnimations();
    initCounters();
    initNavHighlight();
});

// ========================================
// Custom Cursor
// ========================================
function initCursor() {
    if (!cursorDot || !cursorRing) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Smooth ring follow with lag
    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        
        requestAnimationFrame(animateRing);
    }
    animateRing();
    
    // Hover effects on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .course-card, .stat-card, .contact-card, .qual-badge');
    
    hoverElements.forEach(function(el) {
        el.addEventListener('mouseenter', function() {
            cursorDot.classList.add('hover');
            cursorRing.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', function() {
            cursorDot.classList.remove('hover');
            cursorRing.classList.remove('hover');
        });
    });
}

// ========================================
// Particles.js Configuration
// ========================================
function initParticles() {
    if (typeof particlesJS === 'undefined') return;
    
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 120,
                density: {
                    enable: true,
                    value_area: 1500
                }
            },
            color: {
                value: ['#ffffff', '#7c3aed', '#a855f7', '#3b82f6']
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 2,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.5,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#7c3aed',
                opacity: 0.15,
                width: 1
            },
            move: {
                enable: true,
                speed: 0.8,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// ========================================
// Navbar Functionality
// ========================================
function initNavbar() {
    if (!navbar || !navToggle || !navMenu) return;
    
    // Scroll behavior - darken on scroll
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile hamburger toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu on link click
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========================================
// Typed.js Configuration
// ========================================
function initTyped() {
    if (typeof Typed === 'undefined') return;
    
    const typedElement = document.getElementById('typed');
    if (!typedElement) return;
    
    new Typed('#typed', {
        strings: [
            'Turning Potential into Performance',
            'Where Excellence Becomes Habit',
            'Science Made Simple, Success Made Certain',
            'Your Journey to Academic Greatness Starts Here'
        ],
        typeSpeed: 55,
        backSpeed: 30,
        backDelay: 2500,
        loop: true,
        cursorChar: '|',
        smartBackspace: true
    });
}

// ========================================
// Hero Animations (GSAP)
// ========================================
function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Navbar slides down
    tl.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 0.8
    })
    // Badge fades in
    .to('.hero-badge', {
        opacity: 1,
        duration: 0.6
    }, '-=0.3')
    // Title words stagger up
    .to('.title-line', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15
    }, '-=0.4')
    // Tagline fades
    .to('.hero-tagline', {
        opacity: 1,
        duration: 0.6
    }, '-=0.4')
    // Buttons fade in
    .to('.hero-buttons', {
        opacity: 1,
        duration: 0.6
    }, '-=0.3')
    // Scroll indicator
    .to('.hero-scroll', {
        opacity: 0.7,
        duration: 0.6
    }, '-=0.2');
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    if (typeof gsap === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // About section - video frame slides in from left
    gsap.to('.video-frame', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.video-frame', {
        x: -60,
        opacity: 0
    });
    
    // About content slides in from right
    gsap.to('.about-content', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });
    
    // Course cards stagger flip in
    gsap.to('.course-card', {
        scrollTrigger: {
            trigger: '.courses-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Contact cards stagger
    gsap.to('.contact-card', {
        scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    // Stats cards stagger
    gsap.to('.stat-card', {
        scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // Section headers animation
    gsap.utils.toArray('.section-header').forEach(function(header) {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}

// ========================================
// Animated Counters
// ========================================
function initCounters() {
    if (!statNumbers || !statsSection) return;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateCounters();
            }
        });
    }, observerOptions);
    
    statsObserver.observe(statsSection);
}

function animateCounters() {
    statNumbers.forEach(function(stat, index) {
        const target = parseInt(stat.getAttribute('data-target'), 10);
        const duration = 2000;
        const startTime = performance.now();
        
        // Delay each counter slightly for stagger effect
        setTimeout(function() {
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out-cubic)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(target * easeOut);
                
                stat.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            }
            
            requestAnimationFrame(updateCounter);
        }, index * 150);
    });
}

// ========================================
// Active Nav Link Highlight
// ========================================
function initNavHighlight() {
    if (!sections || !navLinks) return;
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    };
    
    const navObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(function(section) {
        navObserver.observe(section);
    });
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    e.preventDefault();
    
    const navHeight = navbar ? navbar.offsetHeight : 0;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
});