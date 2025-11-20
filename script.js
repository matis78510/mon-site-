// Carrousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function updateCarousel() {
    const newTransformValue = -currentSlide * 100;
    document.querySelector('.carousel').style.transform = `translateX(${newTransformValue}%)`;
}

// Lancer le carrousel toutes les 5 secondes
setInterval(nextSlide, 5000);
