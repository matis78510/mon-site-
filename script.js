// Initialisation du carrousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

// Fonction pour aller à la slide suivante
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides; // Passe à la slide suivante (circular)
    updateCarousel();
}

// Fonction pour aller à la slide précédente
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Passe à la slide précédente (circular)
    updateCarousel();
}

// Fonction pour mettre à jour le carrousel avec la nouvelle slide
function updateCarousel() {
    const newTransformValue = -currentSlide * 100; // Calcule la position du carrousel
    document.querySelector('.carousel').style.transform = `translateX(${newTransformValue}%)`;
}

// Lancer le carrousel toutes les 5 secondes (5000ms)
setInterval(nextSlide, 5000);

// Ajouter des événements aux boutons de navigation
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

if (nextButton) {
    nextButton.addEventListener('click', nextSlide); // Aller à la slide suivante au clic
}

if (prevButton) {
    prevButton.addEventListener('click', prevSlide); // Aller à la slide précédente au clic
}
