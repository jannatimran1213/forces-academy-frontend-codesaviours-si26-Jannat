console.log("main.js loaded");
document.addEventListener("DOMContentLoaded", () => {
    // Navbar shadow on scroll
    const navbar = document.getElementById("navbar");

    function updateNavbar() {
        if (window.scrollY > 40) {
            navbar.style.padding = "10px 0";
            navbar.style.boxShadow = "0 8px 20px rgba(0,0,0,0.18)";
        } else {
            navbar.style.padding = "14px 0";
            navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
        }
    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar);

    // Close mobile menu after clicking
    const navLinks = document.querySelectorAll(".nav-link");
    const navCollapse = document.querySelector(".navbar-collapse");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (navCollapse.classList.contains("show")) {

                const bsCollapse =
                    bootstrap.Collapse.getInstance(navCollapse);

                if (bsCollapse) {
                    bsCollapse.hide();
                }

            }

        });

    });
    // Smooth fade animation
    const hero = document.querySelector(".hero-content");

    hero.style.opacity = "0";
    hero.style.transform = "translateY(25px)";
    hero.style.transition = "all 1s ease";

    setTimeout(() => {
        hero.style.opacity = "1";
        hero.style.transform = "translateY(0)";
    }, 250);

});


document.addEventListener("DOMContentLoaded", function () {
    // Navbar Scroll Effect

    const navbar = document.getElementById("navbar");

    function navbarEffect() {

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

    // Close Mobile Menu
    const navLinks = document.querySelectorAll(".nav-link");
    const navCollapse = document.querySelector(".navbar-collapse");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (navCollapse.classList.contains("show")) {

                const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);

                if (bsCollapse) {
                    bsCollapse.hide();
                }

            }

        });

    });

    // Hero Fade Animation
    const hero = document.querySelector(".hero-content");

    if (hero) {

        hero.style.opacity = "0";
        hero.style.transform = "translateY(30px)";
        hero.style.transition = "all 1s ease";

        setTimeout(() => {

            hero.style.opacity = "1";
            hero.style.transform = "translateY(0)";

        }, 200);

    }

    // Current Year in Footer

    const year = document.getElementById("currentYear");

    if (year) {

        year.textContent = new Date().getFullYear();

    }

});
const lightbox = GLightbox({
    selector: '.glightbox'
});
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll("#gallery [data-category]");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        const filter = this.dataset.filter;

        // Remove active style from ALL buttons
        filterButtons.forEach(btn => {
            btn.classList.remove("btn-warning");
            btn.classList.add("btn-outline-warning");
        });

        // Highlight the clicked button
        this.classList.remove("btn-outline-warning");
        this.classList.add("btn-warning");

        // Filter gallery items
        galleryItems.forEach(item => {

            if (filter === "all" || item.dataset.category === filter) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

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

            }

            else {

                counter.innerText = target;

            }

        };

        updateCounter();

    });

}
const statsCards = document.querySelectorAll(".stats-card");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
            started = true;
            startCounter();
        }
    });
}, {
    threshold: 0.5
});

statsCards.forEach(card => observer.observe(card));