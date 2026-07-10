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
                const isYearly = option.getAttribute('data-period') === 'yearly';

                priceAmounts.forEach(amount => {
                    const monthlyPrice = parseFloat(amount.getAttribute('data-monthly'));

                    if (isYearly) {
                        const yearlyPrice = (monthlyPrice * 12);
                        amount.textContent = yearlyPrice.toLocaleString('en-US');
                    } else {
                        amount.textContent = monthlyPrice.toLocaleString('en-US');
                    }
                });

                const isThai = document.getElementById('langToggleCheckbox') && document.getElementById('langToggleCheckbox').checked;
                pricePeriods.forEach(period => {
                    const newPeriod = isYearly ? '/Yearly' : '/Monthly';
                    period.dataset.en = newPeriod;
                    if (isThai && typeof translations !== 'undefined' && translations['th']) {
                        period.textContent = translations['th'][newPeriod] || newPeriod;
                    } else {
                        period.textContent = newPeriod;
                    }
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

    // Language Toggle Logic
    const langToggle = document.getElementById('langToggle');
    let currentLang = 'en';

    const translations = {
        th: {
            "Home": "หน้าแรก",
            "About": "เกี่ยวกับเรา",
            "Services": "บริการ",
            "Team": "ทีมงาน",
            "Pricing": "ราคา",
            "Contact": "ติดต่อ",
            "Get Start Now": "เริ่มต้นใช้งาน",
            "hero-subtitle": "ทำความสะอาดคุณภาพเยี่ยม<br class=\"mobile-br\">ในราคายุติธรรม",
            "hero-title": "บริการทำความสะอาด<br class=\"mobile-br\">ที่เชี่ยวชาญ<br class=\"mobile-br\">มีประสิทธิภาพ<br class=\"mobile-br\">และหมดจด",
            "hero-description": "เราให้บริการทำความสะอาดโดยใช้เวลา แรงงาน<br class=\"mobile-br\">และงบประมาณให้น้อยที่สุด<br class=\"mobile-br\">เพื่อประโยชน์สูงสุดของคุณ",
            "Specialized, efficient, and thorough cleaning services": "บริการทำความสะอาดที่เชี่ยวชาญ มีประสิทธิภาพ และหมดจด",
            "We provide Performing cleaning tasks using the least amount of time, energy, and money.": "เราให้บริการทำความสะอาดโดยใช้เวลา แรงงาน และงบประมาณให้น้อยที่สุดเพื่อประโยชน์สูงสุดของคุณ",
            "View all Services": "ดูบริการทั้งหมด",
            "We Always Provide The Best Service": "เรามอบบริการที่ดีที่สุดเสมอ",
            "Book Now": "จองเลย",
            "Effective Cleaning Requires": "การทำความสะอาดที่มีประสิทธิภาพต้องใช้",
            "an Expert Cleaning Team": "ทีมงานทำความสะอาดที่เชี่ยวชาญ",
            "Our Pricing": "ราคาของเรา",
            "Choose From Our Lowest": "เลือกจากราคาต่ำสุดของเรา",
            "Plans and Prices": "แพ็กเกจและราคา",
            "Monthly": "รายเดือน",
            "Yearly": "รายปี",
            "Get In Touch": "ติดต่อเรา",
            "Send Message": "ส่งข้อความ",
            "Office Cleaning": "ทำความสะอาดสำนักงาน",
            "Spring Cleaning": "ทำความสะอาดใหญ่ (Big Clean)",
            "House Cleaning": "ทำความสะอาดบ้าน",
            "Deep Cleaning": "ทำความสะอาดล้ำลึก",
            "For spaces that need extra attention, our deep cleaning service tackles hard-to-reach areas and stubborn dirt.": "สำหรับพื้นที่ที่ต้องการการดูแลเป็นพิเศษ บริการทำความสะอาดล้ำลึกของเราจะช่วยจัดการกับจุดที่เข้าถึงยากและคราบฝังแน่น",
            "While we can customize your cleaning plan to suit your needs, most clients schedule regular cleaning services:": "แม้ว่าเราจะสามารถปรับแต่งบริการให้เหมาะกับความต้องการของคุณได้ แต่ลูกค้าส่วนใหญ่มักเลือกใช้บริการทำความสะอาดเป็นประจำดังนี้:",
            "Expert Team": "ทีมงานมืออาชีพ",
            "We have professional expert cleaning staff ensuring top-notch cleanliness and hygiene for your space.": "เรามีทีมงานทำความสะอาดมืออาชีพที่พร้อมดูแลความสะอาดและสุขอนามัยในพื้นที่ของคุณอย่างสมบูรณ์แบบ",
            "Somsri Raksa": "สมศรี รักษา",
            "Sombat Jaidee": "สมบัติ ใจดี",
            "Malee Saejong": "มาลี แซ่จง",
            "He is an expert cleaning staff member who provides thorough cleaning with precision,": "เป็นพนักงานทำความสะอาดผู้เชี่ยวชาญที่ให้บริการอย่างละเอียดและแม่นยำ",
            "Welcome To Our Pro-cleaning Company!": "ยินดีต้อนรับสู่บริษัททำความสะอาดระดับมืออาชีพของเรา!",
            "We make your space shine! Professional and reliable cleaning service company providing top-notch solutions for homes and businesses. Satisfaction guaranteed!": "เราทำให้พื้นที่ของคุณสะอาดหมดจด! บริษัทรับทำความสะอาดมืออาชีพที่เชื่อถือได้ พร้อมให้บริการที่ดีที่สุดสำหรับบ้านและธุรกิจของคุณ รับประกันความพึงพอใจ 100%!",
            "Vetted professionals": "ทีมงานผ่านการตรวจสอบประวัติ",
            "Affordable Prices": "ราคาย่อมเยา เข้าถึงได้",
            "Next day availability": "พร้อมให้บริการในวันถัดไป",
            "Best Quality": "คุณภาพดีเยี่ยม",
            "Standard cleaning tasks": "บริการทำความสะอาดมาตรฐาน",
            "100% Satisfaction": "รับประกันความพึงพอใจ 100%",
            "Know More": "ดูรายละเอียดเพิ่มเติม",
            "Choose From Our Lowest Plans and Prices": "เลือกแพ็กเกจและราคาที่คุ้มค่าที่สุดของเรา",
            "Basic Package": "แพ็กเกจเริ่มต้น",
            "Enterprise Package": "แพ็กเกจองค์กร",
            "Premium Package": "แพ็กเกจพรีเมียม",
            "/Monthly": "/เดือน",
            "/Yearly": "/ปี",
            "Dusting of all surfaces": "ปัดฝุ่นทุกพื้นผิว",
            "Sweeping and mopping floors": "กวาดและถูพื้น",
            "Vacuuming carpets and rugs": "ดูดฝุ่นพรมและพรมเช็ดเท้า",
            "Cleaning of kitchen surfaces": "ทำความสะอาดพื้นผิวห้องครัว",
            "Cleaning of bathroom surfaces": "ทำความสะอาดพื้นผิวห้องน้ำ",
            "Emptying trash bins": "ทิ้งขยะ",
            "All services in the Basic Plan": "รวมบริการทั้งหมดในแพ็กเกจเริ่มต้น",
            "Detailed dusting": "ปัดฝุ่นอย่างละเอียด",
            "Wiping down of kitchen appt": "เช็ดทำความสะอาดเครื่องใช้ในครัว",
            "Cleaning inside the microwave": "ทำความสะอาดภายในไมโครเวฟ",
            "Changing bed linens": "เปลี่ยนผ้าปูที่นอน",
            "Spot cleaning walls and doors": "เช็ดคราบเฉพาะจุดบนผนังและประตู",
            "All services in the Clean Plan": "รวมบริการทั้งหมดในแพ็กเกจองค์กร",
            "Deep cleaning of kitchen appt": "ทำความสะอาดเครื่องใช้ในครัวเชิงลึก",
            "baseboards, door frames, & vents": "ทำความสะอาดขอบบัวผนัง วงกบประตู และช่องระบายอากาศ",
            "Organization of closets pantries": "จัดระเบียบตู้เสื้อผ้าและตู้เก็บของ",
            "Carpet, upholstery spot cleaning": "ขจัดคราบเฉพาะจุดบนพรมและเบาะ",
            "Detailed bathroom cleaning": "ทำความสะอาดห้องน้ำอย่างละเอียด"
        },
        en: {
            "hero-subtitle": "Quality cleaning<br class=\"mobile-br\">at a fair price.",
            "hero-title": "Specialized,<br class=\"mobile-br\">efficient,<br class=\"mobile-br\">and thorough<br class=\"mobile-br\">cleaning services",
            "hero-description": "We provide Performing cleaning tasks<br class=\"mobile-br\">using the least amount of time, energy,<br class=\"mobile-br\">and money."
        }
    };

    function translatePage(lang) {
        // Simple DOM traversal for text nodes
        const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while(node = walk.nextNode()) {
            const text = node.nodeValue.trim();
            if(text !== "") {
                if(!node.parentElement.dataset.en) {
                    node.parentElement.dataset.en = text;
                }
                const originalText = node.parentElement.dataset.en;
                if(lang === 'th' && translations['th'][originalText]) {
                    node.nodeValue = translations['th'][originalText];
                } else if(lang === 'en') {
                    node.nodeValue = originalText;
                }
            }
        }
        
        // Handle explicit data-i18n attributes
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(lang === 'th' && translations['th'][key]) {
                el.innerHTML = translations['th'][key];
            } else if (lang === 'en') {
                if (translations['en'] && translations['en'][key]) {
                    el.innerHTML = translations['en'][key];
                } else {
                    el.innerHTML = key;
                }
            }
        });
    }

    const langToggleCheckbox = document.getElementById('langToggleCheckbox');
    if (langToggleCheckbox) {
        langToggleCheckbox.addEventListener('change', (e) => {
            currentLang = e.target.checked ? 'th' : 'en';
            translatePage(currentLang);
        });
    }
});
