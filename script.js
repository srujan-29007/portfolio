// --- LOADER LOGIC ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    const content = document.querySelector('.container');
    const body = document.body;

    if (loader && content && body) {
        setTimeout(() => {
            loader.classList.add('loader-fade-out');

            setTimeout(() => {
                loader.style.display = 'none';
                body.classList.remove('loading-state');
                content.classList.remove('content-hidden');
                content.classList.add('content-visible');
            }, 600); 

        }, 800); 
    } else {
        if(body) body.classList.remove('loading-state');
        if(content) content.classList.remove('content-hidden');
    }
});

// --- THEME TOGGLE & ANIMATIONS ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- THEME TOGGLE LOGIC ---
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
    const body = document.body;

    // Check localStorage or System Preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if(themeIcon) {
            themeIcon.classList.remove('ph-moon');
            themeIcon.classList.add('ph-sun');
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            
            const isDark = body.classList.contains('dark-theme');
            
            // Toggle Icon
            if(themeIcon) {
                if (isDark) {
                    themeIcon.classList.replace('ph-moon', 'ph-sun');
                } else {
                    themeIcon.classList.replace('ph-sun', 'ph-moon');
                }
            }

            // Save Preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }


    // --- INTERSECTION OBSERVER ---
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden').forEach((el) => {
        if(el) observer.observe(el);
    });

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = targetId ? document.querySelector(targetId) : null;
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

function initScrollPath() {
    const svg = document.getElementById('scroll-svg');
    const path = document.getElementById('scroll-path');
    const container = document.querySelector('.scroll-progress-container');
    
    const bodyH = document.body.scrollHeight;
    const htmlH = document.documentElement.scrollHeight;
    const docHeight = Math.max(bodyH, htmlH);
    
    container.style.height = `${docHeight}px`;

    const width = window.innerWidth;
    
    // --- FULL WIDTH CONFIGURATION ---
    const zigzagHeight = 400; 
    
    // Set to 0.55 to ensure it crosses the entire screen width
    const amplitude = width * 0.55; 
    
    const centerX = width / 2;

    let points = `M ${centerX} 0`; 
    let currentY = 0;
    let direction = -1; 

    // Generate Sharp Path
    while (currentY < docHeight + 500) {
        let nextY = currentY + zigzagHeight;
        let nextX = centerX + (direction * amplitude);
        
        points += ` L ${nextX} ${nextY}`;

        currentY = nextY;
        direction *= -1; 
    }

    path.setAttribute('d', points);

    // Animation Logic
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength; 

    const updateDraw = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const totalScroll = docHeight - windowHeight;
        
        let scrollPercentage = scrollTop / totalScroll;
        
        if (scrollPercentage < 0) scrollPercentage = 0;
        if (scrollPercentage > 1) scrollPercentage = 1;
        
        const drawLength = pathLength * scrollPercentage;
        path.style.strokeDashoffset = pathLength - drawLength;
    };

    window.removeEventListener('scroll', updateDraw);
    window.addEventListener('scroll', updateDraw);
    updateDraw();
}

window.addEventListener('load', initScrollPath);
window.addEventListener('resize', initScrollPath);

const observer = new ResizeObserver(() => initScrollPath());
observer.observe(document.body);