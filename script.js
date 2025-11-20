/* script.js
   - Gère : onglets (nav), scroll lisse, activation du lien nav au scroll
*/

/* Smooth scroll et activation nav au clic */
document.querySelectorAll('.main-nav .nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    // retirer active
    document.querySelectorAll('.main-nav .nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    // scroll smooth vers la section
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // pour mobile, fermer menus si besoin (non présent ici)
    }
  });
});

/* Mettre à jour le lien actif selon le scroll */
const sections = document.querySelectorAll('main .panel, main section[id]');
const navLinks = document.querySelectorAll('.main-nav .nav-link');

function onScroll() {
  const scrollPos = window.scrollY || window.pageYOffset;
  let found = false;

  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const height = rect.height;
    // zone centrale pour déclencher
    if (scrollPos >= top - window.innerHeight / 3 && scrollPos < top + height - window.innerHeight / 3) {
      const id = sec.id;
      if (!id) return;
      document.querySelectorAll('.main-nav .nav-link').forEach(l => l.classList.remove('active'));
      const activeLink = document.querySelector('.main-nav .nav-link[href="#' + id + '"]');
      if (activeLink) activeLink.classList.add('active');
      found = true;
    }
  });
  // si aucune section trouvée, marque le premier
  if (!found) {
    document.querySelectorAll('.main-nav .nav-link').forEach(l => l.classList.remove('active'));
    if (navLinks[0]) navLinks[0].classList.add('active');
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('load', onScroll);
