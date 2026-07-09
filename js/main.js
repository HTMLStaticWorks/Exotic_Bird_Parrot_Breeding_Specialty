/**
 * Main JavaScript for Indus Aviary
 * Optimized: observer cleanup, theme persistence
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const target = current === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', target);
            localStorage.setItem('theme', target);
            updateThemeIcon(target);
        });
    });

    function updateThemeIcon(theme) {
        themeToggles.forEach(toggle => {
            if (theme === 'dark') {
                toggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
            } else {
                toggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
            }
        });
    }

    // 2. RTL Toggle Logic
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    const currentDir = localStorage.getItem('dir') || 'ltr';

    // Set initial dir
    document.documentElement.setAttribute('dir', currentDir);

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('dir');
            const target = current === 'ltr' ? 'rtl' : 'ltr';

            document.documentElement.setAttribute('dir', target);
            localStorage.setItem('dir', target);
            updateRtlText(target);
        });
    });

    function updateRtlText(dir) {
        rtlToggles.forEach(toggle => {
            toggle.innerHTML = dir === 'rtl' ? 'LTR' : 'RTL';
        });
    }

    // 3. Scroll Reveal Animations (Intersection Observer)
    const animElements = document.querySelectorAll('.fade-up, .zoom-in, .fade-left, .fade-right');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // free resources after animation
            }
        });
    }, { threshold: 0.1 });

    animElements.forEach(el => observer.observe(el));

    // 4. Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Update active nav link based on URL
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 6. Dynamic icon replacement from Bootstrap Icons to FontAwesome 6 for a sleek, premium, professional look
    replaceBootstrapIconsWithFontAwesome();
});

function replaceBootstrapIconsWithFontAwesome() {
    const icons = document.querySelectorAll('i[class*="bi-"]');
    const mapping = {
        'bi-feather': 'fa-solid fa-feather-pointed',
        'bi-moon-fill': 'fa-solid fa-moon',
        'bi-sun-fill': 'fa-solid fa-sun',
        'bi-list': 'fa-solid fa-bars',
        'bi-heart-pulse-fill': 'fa-solid fa-heart-pulse',
        'bi-patch-check-fill': 'fa-solid fa-circle-check',
        'bi-volume-up-fill': 'fa-solid fa-volume-high',
        'bi-egg-fill': 'fa-solid fa-egg',
        'bi-file-earmark-text': 'fa-solid fa-file-invoice',
        'bi-check-circle-fill': 'fa-solid fa-circle-check',
        'bi-facebook': 'fa-brands fa-facebook',
        'bi-instagram': 'fa-brands fa-instagram',
        'bi-youtube': 'fa-brands fa-youtube',
        'bi-arrow-up': 'fa-solid fa-arrow-up',
        'bi-arrow-right': 'fa-solid fa-arrow-right',
        'bi-clock-history': 'fa-solid fa-clock-rotate-left',
        'bi-eye-slash-fill': 'fa-solid fa-eye-slash',
        'bi-eye-fill': 'fa-solid fa-eye',
        'bi-google': 'fa-brands fa-google',
        'bi-apple': 'fa-brands fa-apple',
        'bi-envelope': 'fa-solid fa-envelope',
        'bi-phone': 'fa-solid fa-phone',
        'bi-geo-alt': 'fa-solid fa-location-dot',
        'bi-shield-check': 'fa-solid fa-shield-halved',
        'bi-star-fill': 'fa-solid fa-star',
        'bi-search': 'fa-solid fa-magnifying-glass',
        'bi-info-circle': 'fa-solid fa-circle-info',
        'bi-plus-circle': 'fa-solid fa-circle-plus',
        'bi-x-circle': 'fa-solid fa-circle-xmark',
        'bi-house': 'fa-solid fa-house',
        'bi-people': 'fa-solid fa-users',
        'bi-images': 'fa-solid fa-images',
        'bi-journal-text': 'fa-solid fa-book-open',
        'bi-chat-dots': 'fa-solid fa-comments',
        'bi-award': 'fa-solid fa-award',
        'bi-heart': 'fa-solid fa-heart',
        'bi-calendar-check': 'fa-solid fa-calendar-check',
        'bi-activity': 'fa-solid fa-chart-line',
        'bi-clipboard-pulse': 'fa-solid fa-clipboard-list',
        'bi-shield-shaded': 'fa-solid fa-shield',
        'bi-gem': 'fa-solid fa-gem',
        'bi-percent': 'fa-solid fa-percent',
        'bi-share': 'fa-solid fa-share-nodes',
        'bi-twitter': 'fa-brands fa-twitter'
    };

    icons.forEach(icon => {
        const classes = Array.from(icon.classList);
        const biClass = classes.find(c => c.startsWith('bi-'));
        if (biClass) {
            let faClass = mapping[biClass];
            if (!faClass) {
                // Fallback translation
                const cleanName = biClass.replace('bi-', '').replace('-fill', '');
                faClass = `fa-solid fa-${cleanName}`;
            }
            icon.classList.remove('bi', biClass);
            faClass.split(' ').forEach(c => icon.classList.add(c));
        }
    });
}
