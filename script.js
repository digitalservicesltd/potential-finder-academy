// ══════════════════════════════════════════════════════════════
// Potential Finder Academy — Enhanced Green & Gold
// ══════════════════════════════════════════════════════════════

(function () {
    'use strict';

    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];

    // ── Refs ──
    const nav          = $('#nav');
    const navToggle    = $('#navToggle');
    const navMenu      = $('#navMenu');
    const navLinks     = $$('.nav__link');
    const sections     = $$('section[id]');
    const statsSection = $('#results');
    const statNums     = $$('.stat__num');
    const heroEl       = $('#hero');
    const heroBgVideo  = $('#heroBgVideo');
    const heroContent  = $('#heroContent');

    let statsAnimated = false;
    let scrollTick    = false;

    // ══════════════════════════════════════════════
    // Navbar scroll
    // ══════════════════════════════════════════════
    function handleScroll() {
        if (!scrollTick) {
            requestAnimationFrame(() => {
                nav.classList.toggle('scrolled', window.scrollY > 50);
                scrollTick = false;
            });
            scrollTick = true;
        }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ══════════════════════════════════════════════
    // Mobile menu
    // ══════════════════════════════════════════════
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (
                navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !navToggle.contains(e.target)
            ) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ══════════════════════════════════════════════
    // Smooth scroll
    // ══════════════════════════════════════════════
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = $(href);
        if (!target) return;
        e.preventDefault();
        const offset = nav ? nav.offsetHeight : 0;
        window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset,
            behavior: 'smooth'
        });
    });

    // ══════════════════════════════════════════════
    // Active nav link
    // ══════════════════════════════════════════════
    const navObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === '#' + id
                    );
                });
            }
        });
    }, { threshold: 0.25, rootMargin: '-80px 0px -50% 0px' });
    sections.forEach(s => navObs.observe(s));

    // ══════════════════════════════════════════════
    // Reveal on scroll
    // ══════════════════════════════════════════════
    const reveals = $$('.reveal, .reveal-left, .reveal-right');
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => revealObs.observe(el));

    // ══════════════════════════════════════════════
    // Hero staggered reveal on load
    // ══════════════════════════════════════════════
    const heroReveals = $$('.hero .reveal');
    heroReveals.forEach((el, i) => {
        el.style.transitionDelay = `${0.3 + i * 0.13}s`;
    });
    requestAnimationFrame(() => {
        setTimeout(() => {
            heroReveals.forEach(el => el.classList.add('is-visible'));
        }, 100);
    });

    // ══════════════════════════════════════════════
    // Hero background video — autoplay muted in BG
    // ══════════════════════════════════════════════
    if (heroBgVideo && heroEl) {
        function tryPlay() {
            heroBgVideo.play()
                .then(() => { heroEl.classList.add('video-active'); })
                .catch(() => { heroEl.classList.remove('video-active'); });
        }

        // Play when video is ready
        if (heroBgVideo.readyState >= 3) {
            tryPlay();
        } else {
            heroBgVideo.addEventListener('canplay', tryPlay, { once: true });
            // Timeout fallback
            setTimeout(tryPlay, 2500);
        }

        // Pause when hero is off-screen for performance
        const heroVidObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroBgVideo.play().catch(() => {});
                } else {
                    heroBgVideo.pause();
                }
            });
        }, { threshold: 0.05 });
        heroVidObs.observe(heroEl);
    }

    // ══════════════════════════════════════════════
    // Counter animation
    // ══════════════════════════════════════════════
    if (statsSection && statNums.length) {
        const statsObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    statNums.forEach((el, i) => {
                        const target = parseInt(el.dataset.target, 10);
                        const duration = 2400;
                        const delay = i * 160;
                        setTimeout(() => {
                            const start = performance.now();
                            function tick(now) {
                                const elapsed = now - start;
                                const p = Math.min(elapsed / duration, 1);
                                // ease-out cubic
                                const eased = 1 - Math.pow(1 - p, 3);
                                el.textContent = Math.round(target * eased);
                                if (p < 1) {
                                    requestAnimationFrame(tick);
                                } else {
                                    el.textContent = target;
                                }
                            }
                            requestAnimationFrame(tick);
                        }, delay);
                    });
                    statsObs.disconnect();
                }
            });
        }, { threshold: 0.3 });
        statsObs.observe(statsSection);
    }

    // ══════════════════════════════════════════════
    // Hero parallax — subtle mouse depth (desktop)
    // ══════════════════════════════════════════════
    if (heroContent && window.matchMedia('(min-width: 901px)').matches) {
        let mx = 0, my = 0, cx = 0, cy = 0;

        document.addEventListener('mousemove', (e) => {
            mx = (e.clientX / window.innerWidth - 0.5) * 2;
            my = (e.clientY / window.innerHeight - 0.5) * 2;
        }, { passive: true });

        function parallaxLoop() {
            cx += (mx - cx) * 0.035;
            cy += (my - cy) * 0.035;
            heroContent.style.transform =
                `translate(${cx * 8}px, ${cy * 5}px)`;
            requestAnimationFrame(parallaxLoop);
        }
        requestAnimationFrame(parallaxLoop);
    }

    // ══════════════════════════════════════════════
    // Magnetic buttons (subtle pull effect on hover)
    // ══════════════════════════════════════════════
    if (window.matchMedia('(min-width: 901px)').matches) {
        const magneticBtns = $$('.btn--gold, .nav__cta');

        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform =
                    `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
                btn.style.transition = 'transform .4s cubic-bezier(.4,0,.2,1)';
                setTimeout(() => {
                    btn.style.transition = '';
                }, 400);
            });
        });
    }

})();