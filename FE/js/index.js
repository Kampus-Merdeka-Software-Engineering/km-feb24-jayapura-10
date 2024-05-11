document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const offsetTop = targetElement.offsetTop;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
});
