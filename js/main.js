// ===============================
// Forces Academy Website
// Week 1 - Custom JavaScript
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------
    // Navbar shadow on scroll
    // -------------------------------
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


    // -------------------------------
    // Close mobile menu after clicking
    // -------------------------------
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


    // -------------------------------
    // Smooth fade animation
    // -------------------------------
    const hero = document.querySelector(".hero-content");

    hero.style.opacity = "0";
    hero.style.transform = "translateY(25px)";
    hero.style.transition = "all 1s ease";

    setTimeout(() => {
        hero.style.opacity = "1";
        hero.style.transform = "translateY(0)";
    }, 250);

});