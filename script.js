window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContainer = document.querySelector('.main-container');
    const body = document.body;

    if (loadingScreen && mainContainer && body) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out-animation');

            setTimeout(() => {
                loadingScreen.style.display = 'none';
                body.classList.remove('page-loading');
                mainContainer.classList.remove('invisible');
                mainContainer.classList.add('visible');
            }, 600); 

        }, 800); 
    } else {
        if(body) body.classList.remove('page-loading');
        if(mainContainer) mainContainer.classList.remove('invisible');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    
    const darkModeButton = document.getElementById('dark-mode-button');
    const themeIcon = darkModeButton ? darkModeButton.querySelector('i') : null;
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if(themeIcon) {
            themeIcon.classList.remove('ph-moon');
            themeIcon.classList.add('ph-sun');
        }
    }

    if (darkModeButton) {
        darkModeButton.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            
            const isDark = body.classList.contains('dark-theme');
            
            if(themeIcon) {
                if (isDark) {
                    themeIcon.classList.replace('ph-moon', 'ph-sun');
                } else {
                    themeIcon.classList.replace('ph-sun', 'ph-moon');
                }
            }
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }


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
