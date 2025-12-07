// Active l'année dynamique dans le footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Menu burger (mobile)
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    // Ferme le menu quand on clique sur un lien
    navLinks.addEventListener("click", (e) => {
        if (e.target.classList.contains("nav-link")) {
            navLinks.classList.remove("open");
        }
    });
}

// Met à jour le lien actif dans la navbar au scroll
const sections = document.querySelectorAll("section[id]");
const navLinkEls = document.querySelectorAll(".nav-link");

function onScroll() {
    const scrollPos = window.scrollY + 120; // marge pour le header

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollPos >= top && scrollPos < top + height) {
            navLinkEls.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

window.addEventListener("scroll", onScroll);
