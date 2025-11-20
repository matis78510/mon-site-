document.querySelectorAll('.tablink').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelectorAll('.tablink').forEach(a => a.classList.remove('active'));
        this.classList.add('active');

        document.querySelectorAll('.tabcontent').forEach(tab => tab.classList.remove('active'));
        document.querySelector(this.getAttribute('href')).classList.add('active');
    });
});
