// ============================================
// Gambit Invest AS - Main Application Logic
// Requires: translations.js loaded first
// ============================================

// ============================================
// Language / i18n
// ============================================
let currentLang = localStorage.getItem('gambit-lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;

    document.title = 'Gambit Invest AS';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    localStorage.setItem('gambit-lang', lang);
}

// Language switcher click handlers
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
    });
});

// ============================================
// Hero Slideshow
// ============================================
const heroImages = [
    // Ona Fyr lighthouse, Norwegian coast
    { url: 'https://images.unsplash.com/photo-1577625371769-0cf4d2de8c16?q=80&w=2070&auto=format&fit=crop', photographer: 'Tobias Lystad', profileUrl: 'https://unsplash.com/@tobiaslystad' },
    // Aerial coastal Norway
    { url: 'https://images.unsplash.com/photo-1475066392170-59d55d96fe51?q=80&w=2070&auto=format&fit=crop', photographer: 'Jarand K. L\u00F8keland', profileUrl: 'https://unsplash.com/@jarandlokeland' },
    // Harbor fishing boats with snowy mountains, Lofoten
    { url: 'https://images.unsplash.com/photo-1681027100047-371629c0855c?q=80&w=2070&auto=format&fit=crop', photographer: 'Daniel Diemer', profileUrl: 'https://unsplash.com/@ddiemer' },
    // Boats in Norwegian fishing village
    { url: 'https://images.unsplash.com/photo-1761237319657-5d2d43494dc9?q=80&w=2070&auto=format&fit=crop', photographer: 'Ingrid Martinussen', profileUrl: 'https://unsplash.com/@ingridmartinussen' },
    // Fishing boat on calm Norwegian ocean
    { url: 'https://images.unsplash.com/photo-1751130837849-09525bfd7560?q=80&w=2070&auto=format&fit=crop', photographer: 'Philipp D\u00FCsel', profileUrl: 'https://unsplash.com/@philippduesel' },
    // Boat at sunset, Norwegian coast
    { url: 'https://images.unsplash.com/photo-1469903130378-57b1170cf901?q=80&w=2070&auto=format&fit=crop', photographer: 'Steinar Engeland', profileUrl: 'https://unsplash.com/@steinart' },
    // Snowy mountains, Senja, Norway
    { url: 'https://images.unsplash.com/photo-1743376272672-c130603a3af2?q=80&w=2070&auto=format&fit=crop', photographer: 'Lukas Seitz', profileUrl: 'https://unsplash.com/@lukasseitz' },
    // Northern lights over Norway
    { url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop', photographer: 'Anders Jild\u00E9n', profileUrl: 'https://unsplash.com/@andersjilden' },
    // N\u00E6r\u00F8yfjord, Norway
    { url: 'https://images.unsplash.com/photo-1520769945061-0a448c463865?q=80&w=2070&auto=format&fit=crop', photographer: 'Johny Goerend', profileUrl: 'https://unsplash.com/@johnygoerend' },
    // Sognefjord, Norway
    { url: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=2070&auto=format&fit=crop', photographer: 'Daniil Vnoutchkov', profileUrl: 'https://unsplash.com/@daniilvnoutchkov' },
    // Snowy mountain peaks
    { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop', photographer: 'Benjamin Voros', profileUrl: 'https://unsplash.com/@vorosbenisop' },
    // Mountain peaks in clouds
    { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop', photographer: 'Kym Ellis', profileUrl: 'https://unsplash.com/@kymellis' }
];

const heroSlideshow = document.querySelector('.hero-slideshow');
const photographerCredit = document.getElementById('current-photographer');
let currentImageIndex = 0;
let slideshowInterval;

function initSlideshow() {
    for (let i = 0; i < 2; i++) {
        const slide = document.createElement('div');
        slide.className = 'hero-slide';
        if (i === 0) slide.classList.add('active');
        heroSlideshow.appendChild(slide);
    }

    const slides = document.querySelectorAll('.hero-slide');
    slides[0].style.backgroundImage = `url('${heroImages[0].url}')`;
    updateCredit(0);

    preloadImage(1);
    slideshowInterval = setInterval(nextSlide, 45000);
}

function preloadImage(index) {
    const img = new Image();
    img.src = heroImages[index % heroImages.length].url;
}

function updateCredit(index) {
    const image = heroImages[index];
    photographerCredit.innerHTML = `<a href="${image.profileUrl}" target="_blank" rel="noopener">${image.photographer}</a>`;
}

function nextSlide() {
    const slides = document.querySelectorAll('.hero-slide');
    const currentSlide = document.querySelector('.hero-slide.active');
    const nextSlideEl = currentSlide === slides[0] ? slides[1] : slides[0];

    currentImageIndex = (currentImageIndex + 1) % heroImages.length;
    nextSlideEl.style.backgroundImage = `url('${heroImages[currentImageIndex].url}')`;

    currentSlide.classList.remove('active');
    nextSlideEl.classList.add('active');

    photographerCredit.style.opacity = '0';
    setTimeout(() => {
        updateCredit(currentImageIndex);
        photographerCredit.style.opacity = '1';
    }, 500);

    preloadImage(currentImageIndex + 1);
}

initSlideshow();

// ============================================
// Portfolio Filters
// ============================================
const filterState = {
    industry: 'all',
    status: 'all',
    country: 'all'
};

const portfolioCards = document.querySelectorAll('.portfolio-card');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioGridMain = document.querySelector('.portfolio-grid:not(.portfolio-grid-other)');
const portfolioGridOther = document.querySelector('.portfolio-grid-other');
const sectionTitle = document.querySelector('.portfolio-section-title');

function applyFilters() {
    let mainVisible = 0;
    let otherVisible = 0;

    portfolioCards.forEach(card => {
        const industry = card.dataset.industry;
        const status = card.dataset.status;
        const country = card.dataset.country;
        const isOther = card.closest('.portfolio-grid-other') !== null;

        const matchIndustry = filterState.industry === 'all' || industry === filterState.industry;
        const matchStatus = filterState.status === 'all' || status === filterState.status;
        const matchCountry = filterState.country === 'all' || country === filterState.country;

        if (matchIndustry && matchStatus && matchCountry) {
            card.classList.remove('hidden');
            if (isOther) otherVisible++;
            else mainVisible++;
        } else {
            card.classList.add('hidden');
        }
    });

    // Hide "Other" section title and grid when no cards match
    if (sectionTitle) {
        sectionTitle.style.display = otherVisible === 0 ? 'none' : '';
    }
    if (portfolioGridOther) {
        portfolioGridOther.style.display = otherVisible === 0 ? 'none' : '';
    }

    const totalVisible = mainVisible + otherVisible;
    let emptyMsg = portfolioGridMain.querySelector('.portfolio-empty');
    if (totalVisible === 0) {
        if (!emptyMsg) {
            emptyMsg = document.createElement('div');
            emptyMsg.className = 'portfolio-empty';
            emptyMsg.dataset.i18n = 'portfolio.empty';
            emptyMsg.textContent = translations[currentLang]['portfolio.empty'];
            portfolioGridMain.appendChild(emptyMsg);
        }
    } else if (emptyMsg) {
        emptyMsg.remove();
    }
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterType = btn.dataset.filter;
        const filterValue = btn.dataset.value;

        filterState[filterType] = filterValue;

        document.querySelectorAll(`.filter-btn[data-filter="${filterType}"]`).forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        applyFilters();
    });
});

// ============================================
// Mobile menu toggle
// ============================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ============================================
// Portfolio Stats Counter
// ============================================
function updatePortfolioStats() {
    const allCards = document.querySelectorAll('.portfolio-card');
    let total = 0, active = 0, exited = 0, closed = 0;

    allCards.forEach(card => {
        total++;
        const status = card.dataset.status;
        if (status === 'growth' || status === 'expansion') active++;
        else if (status === 'exited') exited++;
        else if (status === 'closed') closed++;
    });

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-active').textContent = active;
    document.getElementById('stat-exited').textContent = exited;
    document.getElementById('stat-closed').textContent = closed;
}

updatePortfolioStats();

// ============================================
// Custom Image/Logo System
// ============================================
// Naming convention: images/logos/{company}.png for transparent logos
// Naming convention: images/{company}.jpg for cover photos
// Add data-logo="company-name" to portfolio-card to use local image
// Add class "logo-contain" to portfolio-logo for transparent logo display
//
// Example usage in HTML:
//   <div class="portfolio-card" data-logo="pixavi">
//     <div class="portfolio-logo logo-contain">
//       <img src="images/logos/pixavi.png" alt="Pixavi">
//     </div>
//   </div>
//
// The CSS class "logo-contain" switches from cover to contain mode
// with padding and a clean white background for transparent logos.

// ============================================
// Apply saved language on load
// ============================================
if (currentLang !== 'en') {
    setLanguage(currentLang);
}
