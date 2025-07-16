document.addEventListener("DOMContentLoaded", function() {
    // --- Image Slider (index.html) ---
    const slider = document.querySelector('.image-slider');
    if (slider) {
        const slides = slider.querySelectorAll('img');
        let current = 0;
        slides.forEach((img, idx) => {
            img.style.display = idx === 0 ? 'block' : 'none';
        });
        setInterval(() => {
            slides[current].style.display = 'none';
            current = (current + 1) % slides.length;
            slides[current].style.display = 'block';
        }, 3000);
    }

    // --- Gallery Roll-in Animation (about-me.html) ---
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    if (galleryImages.length > 0) {
        const options = { threshold: 0.2 };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('roll-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        galleryImages.forEach(img => {
            observer.observe(img);
        });
    }

    // --- Hamburger Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }

    // --- Smooth Scroll for Internal Nav Links ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// --- ScrollSpy Active Nav Highlight ---
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navlinks = document.querySelectorAll('nav a');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 80) {
            current = section.getAttribute('id');
        }
    });

    navlinks.forEach(link => {
        link.classList.remove('active');
        if (current && link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});