// Fonction pour faire défiler la page en douceur vers les sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fonction pour ajouter une classe "active" lorsque l'utilisateur fait défiler la page
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    
    sections.forEach(section => {
        if (section.offsetTop <= scrollPosition + 100 && section.offsetTop + section.offsetHeight > scrollPosition) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
});
