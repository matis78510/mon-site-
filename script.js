// Fonction pour changer de contenu en cliquant sur les onglets
document.querySelectorAll('.tablink').forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();

        // Retirer la classe active de tous les onglets
        document.querySelectorAll('.tablink').forEach(link => link.classList.remove('active'));

        // Ajouter la classe active à l'onglet cliqué
        this.classList.add('active');

        // Cacher tous les contenus des onglets
        document.querySelectorAll('.tabcontent').forEach(content => content.classList.remove('active'));

        // Afficher le contenu de l'onglet sélectionné
        const target = document.querySelector(this.getAttribute('href'));
        target.classList.add('active');
    });
});
