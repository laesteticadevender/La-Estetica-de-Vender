document.addEventListener('DOMContentLoaded', () => {
    // Language Toggle logic
    const langToggles = document.querySelectorAll('.lang-btn');
    let currentLang = 'es';

    function switchLanguage() {
        currentLang = currentLang === 'en' ? 'es' : 'en';

        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        });

        // Update all button texts to reflect the current state with flags
        langToggles.forEach(toggle => {
            toggle.textContent = currentLang === 'es' ? '🇪🇸 ES / 🇺🇸 EN' : '🇺🇸 EN / 🇪🇸 ES';
        });
    }

    langToggles.forEach(toggle => {
        toggle.addEventListener('click', switchLanguage);
    });

    // Hamburger Menu Logic
    const hamburger = document.getElementById('hamburger');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-dropdown-links a');

    if (hamburger && navOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animate
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Parallax Effect for Hero
    document.addEventListener('mousemove', (e) => {
        const heroBook = document.querySelector('.hero-book');
        const heroGlow = document.querySelector('.hero-glow');

        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;

        if (heroBook) {
            heroBook.style.transform = `rotateY(${-15 + moveX}deg) rotateX(${5 + moveY}deg)`;
        }

        if (heroGlow) {
            heroGlow.style.transform = `translate(${-50 + moveX}% , ${-50 + moveY}%)`;
        }
    });

    // Bio expansion logic
    const bioToggle = document.getElementById('bio-toggle');
    const authorBio = document.getElementById('author-bio');

    if (bioToggle && authorBio) {
        bioToggle.addEventListener('click', () => {
            const isCollapsed = authorBio.classList.contains('bio-collapsed');
            authorBio.classList.toggle('bio-collapsed');
            authorBio.classList.toggle('bio-expanded');

            const toggleText = bioToggle.querySelector('span:not(.dots)');

            if (isCollapsed) {
                // Expanding
                toggleText.setAttribute('data-en', 'Read less');
                toggleText.setAttribute('data-es', 'Leer menos');

                // Smoothly scroll to center the toggle point so the reader follows the text
                setTimeout(() => {
                    bioToggle.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 50);
            } else {
                // Collapsing
                toggleText.setAttribute('data-en', 'Read more');
                toggleText.setAttribute('data-es', 'Leer más');
            }

            // Immediately update current text based on current language
            toggleText.textContent = toggleText.getAttribute(`data-${currentLang}`);
        });
    }
});
