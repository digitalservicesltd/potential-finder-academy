// ========================================
// Potential Finder Academy — Minimal JS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.getElementById('stats');
    let statsAnimated = false;

    // --- Navbar scroll ---
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile toggle ---
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Smooth scroll ---
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;
        e.preventDefault();
        const navH = navbar ? navbar.offsetHeight : 0;
        window.scrollTo({ top: targetEl.getBoundingClientRect().top + window.pageYOffset - navH, behavior: 'smooth' });
    });

    // --- Active nav highlight ---
    const navObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) link.classList.add('active');
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });
    sections.forEach(function(s) { navObserver.observe(s); });

    // --- Fade-in on scroll ---
    const fadeEls = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(function(el) { fadeObserver.observe(el); });

    // --- Counter animation ---
    if (statsSection && statNumbers.length) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    statNumbers.forEach(function(stat, i) {
                        const target = parseInt(stat.getAttribute('data-target'), 10);
                        const duration = 1800;
                        const start = performance.now();
                        setTimeout(function() {
                            function tick(now) {
                                const p = Math.min((now - start) / duration, 1);
                                const ease = 1 - Math.pow(1 - p, 3);
                                stat.textContent = Math.floor(target * ease);
                                if (p < 1) requestAnimationFrame(tick);
                                else stat.textContent = target;
                            }
                            requestAnimationFrame(tick);
                        }, i * 120);
                    });
                }
            });
        }, { threshold: 0.4 });
        statsObserver.observe(statsSection);
    }
});