console.log("main.js loaded");

document.addEventListener("DOMContentLoaded", function () {

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById("navbar");

    function navbarEffect() {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.style.padding = "10px 0";
            navbar.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
        } else {
            navbar.style.padding = "14px 0";
            navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
        }
    }

    navbarEffect();
    window.addEventListener("scroll", navbarEffect);

    // ===== CLOSE MOBILE MENU ON LINK CLICK =====
    const navLinks = document.querySelectorAll(".nav-link");
    const navCollapse = document.querySelector(".navbar-collapse");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navCollapse && navCollapse.classList.contains("show")) {
                const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });

    // ===== CURRENT YEAR IN FOOTER =====
    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // ===== GLIGHTBOX (Gallery page only) =====
    if (typeof GLightbox !== "undefined") {
        GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true
        });
    }

    // ===== GALLERY FILTER BUTTONS =====
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll("#gallery [data-category]");

    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener("click", function () {
                const filter = this.dataset.filter;

                filterButtons.forEach(btn => {
                    btn.classList.remove("btn-warning");
                    btn.classList.add("btn-outline-warning");
                });

                this.classList.remove("btn-outline-warning");
                this.classList.add("btn-warning");

                galleryItems.forEach(item => {
                    if (filter === "all" || item.dataset.category === filter) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                });
            });
        });
    }

    // ===== CONTACT FORM (fallback validation) =====
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name")?.value.trim();
            const email = document.getElementById("email")?.value.trim();
            const phone = document.getElementById("phone")?.value.trim();
            const subject = document.getElementById("subject")?.value.trim();
            const message = document.getElementById("message")?.value.trim();

            if (!name || !email || !phone || !subject || !message) {
                alert("Please fill in all required fields.");
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            alert("Form submitted successfully!");
            contactForm.reset();
        });
    }

    // ===== STATS COUNTER ANIMATION =====
    const counters = document.querySelectorAll(".counter");
    let started = false;

    function startCounter() {
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            let count = 0;
            const increment = target / 100;

            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };

            updateCounter();
        });
    }

    const statsCards = document.querySelectorAll(".stats-card");

    if (statsCards.length) {
        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !started) {
                    started = true;
                    startCounter();
                }
            });
        }, { threshold: 0.5 });

        statsCards.forEach(card => counterObserver.observe(card));
    }

   // ===== SCROLL-TRIGGERED ANIMATIONS (all card types, site-wide) =====
    const cardSelectors = [
        ".stats-card",
        ".course-preview-card",
        ".announcement-card",
        ".mission-card",
        ".vision-card",
        ".feature-card",
        ".faculty-card",
        ".course-card",
        ".contact-card",
        ".testimonial-card"
    ];

    const cardSections = document.querySelectorAll("section");

    cardSections.forEach(section => {
        const cards = section.querySelectorAll(cardSelectors.join(","));
        if (!cards.length) return;

        cards.forEach((card, index) => {
            card.dataset.staggerDelay = `${Math.min(index * 0.12, 0.6)}s`;
        });
    });

    const allAnimatedCards = document.querySelectorAll(cardSelectors.join(","));

    if (allAnimatedCards.length) {
        const cardObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.staggerDelay || "0s";
                    entry.target.style.animationDelay = delay;
                    entry.target.classList.add("in-view");
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        allAnimatedCards.forEach(el => cardObserver.observe(el));
    }
    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                backToTop.style.display = "block";
            } else {
                backToTop.style.display = "none";
            }
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ===== AOS ANIMATION LIBRARY =====
    if (typeof AOS !== "undefined") {
        AOS.init({ duration: 800, once: true });
    }

    // ===== ROTATING QUOTES / MOTTOS (Home page only) =====
    const quotes = [
        { text: "Discipline is the soul of an army.", author: "George Washington" },
        { text: "The more you sweat in training, the less you bleed in battle.", author: "Military Proverb" },
        { text: "Courage is not the absence of fear, but the triumph over it.", author: "Nelson Mandela" },
        { text: "Success is where preparation and opportunity meet.", author: "Bobby Unser" }
    ];

    const quoteEl = document.getElementById("rotatingQuote");

    if (quoteEl) {
        let quoteIndex = 0;

        setInterval(() => {
            quoteEl.classList.add("slide-out");

            setTimeout(() => {
                quoteIndex = (quoteIndex + 1) % quotes.length;
                const q = quotes[quoteIndex];
                quoteEl.innerHTML = `"${q.text}" <span class="quote-author">— ${q.author}</span>`;

                quoteEl.classList.remove("slide-out");
                quoteEl.classList.add("slide-in-start");

                void quoteEl.offsetWidth;

                quoteEl.classList.remove("slide-in-start");
            }, 600);

        }, 5000);
    }

    // ===== DARK / LIGHT MODE TOGGLE =====
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const rootHtml = document.documentElement;

    const savedTheme = localStorage.getItem('forces-academy-theme');
    if (savedTheme === 'dark') {
        rootHtml.classList.add('dark-mode');
        updateIcon(true);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function () {
            const isDark = rootHtml.classList.toggle('dark-mode');
            localStorage.setItem('forces-academy-theme', isDark ? 'dark' : 'light');
            updateIcon(isDark);
        });
    } else {
        console.warn('Theme toggle button not found on this page.');
    }

    function updateIcon(isDark) {
        if (!themeIcon) return;
        themeIcon.classList.toggle('bi-moon-stars-fill', !isDark);
        themeIcon.classList.toggle('bi-sun-fill', isDark);
    }

});

  
(function () {
    // Initialize with your Public Key
    emailjs.init({ publicKey: "ml3NA4wXQwfZ3DTin" });

    const form = document.getElementById("enquiryForm");
    const alertBox = document.getElementById("enquiryFormAlert");
    const submitBtn = document.getElementById("enquirySubmitBtn");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnSpinner = submitBtn.querySelector(".btn-spinner");

    function showAlert(type, message) {
        alertBox.className = `alert alert-${type}`;
        alertBox.textContent = message;
        alertBox.classList.remove("d-none");
    }

    function setLoading(isLoading) {
        submitBtn.disabled = isLoading;
        btnText.classList.toggle("d-none", isLoading);
        btnSpinner.classList.toggle("d-none", !isLoading);
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Bootstrap-style validation
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        setLoading(true);
        alertBox.classList.add("d-none");

        emailjs.sendForm("service_sg3bruq", "template_1av2qt4", form)
            .then(function () {
                showAlert("success", "Thank you! Your enquiry has been sent. Our admissions team will contact you shortly.");
                form.reset();
                form.classList.remove("was-validated");
            })
       .catch(function (error) {
    console.error("EmailJS status:", error.status);
    console.error("EmailJS text:", error.text);
    showAlert("danger", "Something went wrong. Please try again or contact us directly by phone.");
})
            .finally(function () {
                setLoading(false);
            });
    });
})();
