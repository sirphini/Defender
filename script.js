document.addEventListener('DOMContentLoaded', () => {

    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-menu a');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');

        document.body.style.overflow =
            nav.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});