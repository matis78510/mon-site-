// Année dans le footer
document.getElementById("year").textContent = new Date().getFullYear();

// Barre de progression au scroll
const progressBar = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY || window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;
  progressBar.style.transform = `scaleX(${progress})`;
});

// Animation "reveal" des cartes
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.25,
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Highlight de la nav selon la section visible
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  },
  {
    threshold: 0.4,
  }
);

sections.forEach((section) => sectionObserver.observe(section));
