document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navWrapper = document.getElementById('navWrapper');

    if (menuToggle && navWrapper) {
        menuToggle.addEventListener('click', () => {
            navWrapper.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Services Carousel Logic
    // Services Carousel Logic
    const carouselTrack = document.getElementById('carouselTrack');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (carouselTrack && nextBtn && prevBtn) {
        const updateButtonState = () => {
            const isAtStart = carouselTrack.scrollLeft <= 5; // Tolerance
            const isAtEnd = carouselTrack.scrollLeft + carouselTrack.clientWidth >= carouselTrack.scrollWidth - 5;

            if (isAtStart) {
                prevBtn.classList.add('disabled');
            } else {
                prevBtn.classList.remove('disabled');
            }

            if (isAtEnd) {
                nextBtn.classList.add('disabled');
            } else {
                nextBtn.classList.remove('disabled');
            }
        };

        const scrollAmount = () => {
            return carouselTrack.firstElementChild.offsetWidth + 32; // width + gap
        };

        nextBtn.addEventListener('click', () => {
            if (nextBtn.classList.contains('disabled')) return;
            carouselTrack.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            if (prevBtn.classList.contains('disabled')) return;
            carouselTrack.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });

        // Update buttons on scroll
        carouselTrack.addEventListener('scroll', () => {
            // Debounce slightly if needed, but direct update is usually fine for UI
            window.requestAnimationFrame(updateButtonState);
        });

        // Services Carousel Logic
        // ... (existing code for carousel) ...
        // ...
        // Initial check
        updateButtonState();

        // Update on resize in case content width changes
        window.addEventListener('resize', updateButtonState);
    }

    // Pricing Toggle Logic
    const toggleOptions = document.querySelectorAll('.toggle-option');
    const priceAmounts = document.querySelectorAll('.amount');
    const pricePeriods = document.querySelectorAll('.period');

    if (toggleOptions.length > 0) {
        toggleOptions.forEach(option => {
            option.addEventListener('click', () => {
                // If already active, do nothing
                if (option.classList.contains('active')) return;

                // Toggle active class
                toggleOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');

                // Check functionality
                const isYearly = option.textContent.trim() === 'Yearly';

                priceAmounts.forEach(amount => {
                    const monthlyPrice = parseFloat(amount.getAttribute('data-monthly'));

                    if (isYearly) {
                        const yearlyPrice = (monthlyPrice * 12).toFixed(2);
                        amount.textContent = yearlyPrice;
                    } else {
                        amount.textContent = monthlyPrice.toFixed(2);
                    }
                });

                pricePeriods.forEach(period => {
                    period.textContent = isYearly ? '/Yearly' : '/Monthly';
                });
            });
        });
    }

    // Scroll Animation Logic
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible'); // Fade out when scrolling away
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
});
