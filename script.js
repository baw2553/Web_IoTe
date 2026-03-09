// =========================================
// --- ระบบ Navbar Scroll ---
// =========================================
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) { 
        if (window.scrollY > 10) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// =========================================
// --- ระบบ Dark Mode ---
// =========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        if(themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const themeIcon = themeToggleBtn.querySelector('i');
        const isDark = body.classList.contains('dark-mode');
        
        if (isDark) {
            if(themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            if(themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }

        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove('show');
        }
    });
}

// =========================================
// --- ระบบสไลด์โชว์รูปภาพ (Image Carousel) ---
// =========================================
const carouselSlide = document.querySelector('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// ✅ ตรวจสอบว่าหน้านี้มีสไลด์โชว์หรือไม่
if (carouselSlide && prevBtn && nextBtn) {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    let counter = 0;
    const size = 100; 
    let slideInterval;

    function updateSlide() {
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + '%)';
    }

    function nextSlide() {
        if (counter >= carouselImages.length - 1) {
            counter = 0;
        } else {
            counter++;
        }
        updateSlide();
        resetInterval(); 
    }

    function prevSlide() {
        if (counter <= 0) {
            counter = carouselImages.length - 1;
        } else {
            counter--;
        }
        updateSlide();
        resetInterval();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    function startInterval() {
        slideInterval = setInterval(nextSlide, 3000); 
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    startInterval();
}

// =========================================
// --- ระบบแบนเนอร์ข่าวสาร (News Banner) ---
// =========================================
const newsSlide = document.querySelector('.news-carousel-slide');
const prevNewsBtn = document.getElementById('prevNewsBtn');
const nextNewsBtn = document.getElementById('nextNewsBtn');

// ✅ ตรวจสอบว่าหน้านี้มีสไลด์ข่าวสารหรือไม่
if (newsSlide && prevNewsBtn && nextNewsBtn) {
    const newsImages = document.querySelectorAll('.news-carousel-slide img');
    let newsCounter = 0;
    let newsInterval;

    function updateNewsSlide() {
        newsSlide.style.transform = 'translateX(' + (-100 * newsCounter) + '%)';
    }

    function nextNews() {
        if (newsCounter >= newsImages.length - 1) {
            newsCounter = 0;
        } else {
            newsCounter++;
        }
        updateNewsSlide();
        resetNewsInterval();
    }

    function prevNews() {
        if (newsCounter <= 0) {
            newsCounter = newsImages.length - 1;
        } else {
            newsCounter--;
        }
        updateNewsSlide();
        resetNewsInterval();
    }

    nextNewsBtn.addEventListener('click', nextNews);
    prevNewsBtn.addEventListener('click', prevNews);

    function startNewsInterval() {
        newsInterval = setInterval(nextNews, 4000); 
    }

    function resetNewsInterval() {
        clearInterval(newsInterval);
        startNewsInterval();
    }

    startNewsInterval();
}

// =========================================
// --- ระบบนับเวลาถอยหลัง (Countdown) ---
// =========================================
const countdownContainer = document.getElementById("countdown");

// ✅ ตรวจสอบว่าหน้านี้มีกล่องนับเวลาหรือไม่
if (countdownContainer) {
    const targetDate = new Date("2026-07-31T23:59:59").getTime();

    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysElem = document.getElementById("days");
        const hoursElem = document.getElementById("hours");
        const minutesElem = document.getElementById("minutes");
        const secondsElem = document.getElementById("seconds");

        if (daysElem && hoursElem && minutesElem && secondsElem) {
            daysElem.innerHTML = days < 10 ? "0" + days : days;
            hoursElem.innerHTML = hours < 10 ? "0" + hours : hours;
            minutesElem.innerHTML = minutes < 10 ? "0" + minutes : minutes;
            secondsElem.innerHTML = seconds < 10 ? "0" + seconds : seconds;
        }

        if (distance < 0) {
            clearInterval(countdownInterval); 
            countdownContainer.style.display = "none";
            
            const titleElem = document.querySelector(".countdown-title");
            if (titleElem) titleElem.style.display = "none";
            
            const expiredElem = document.getElementById("countdown-expired");
            if (expiredElem) expiredElem.style.display = "block";
        }
    }, 1000);
}

// =========================================
// --- ระบบ Dropdown เมนู ---
// =========================================
function toggleMenu(event, menuId) {
    event.preventDefault();
    var targetMenu = document.getElementById(menuId);
    if (!targetMenu) return; // ✅ ป้องกัน Error ถ้าหาเมนูไม่เจอ

    var allDropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < allDropdowns.length; i++) {
        if (allDropdowns[i].id !== menuId) {
            allDropdowns[i].classList.remove("show");
        }
    }
    targetMenu.classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.parentElement.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove('show');
        }
    }
}

// =========================================
// --- ระบบ Hamburger Menu (มือถือ) ---
// =========================================
const menuToggle = document.getElementById('menu-toggle');
const navLinks   = document.querySelector('.nav-links');

// ✅ ตรวจสอบว่าหน้านี้มีปุ่มแฮมเบอร์เกอร์หรือไม่
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.addEventListener('click', e => {
        if (e.target.tagName === 'A' && window.innerWidth <= 992) {
            navLinks.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            navLinks.classList.remove('active');
        }
    });
}