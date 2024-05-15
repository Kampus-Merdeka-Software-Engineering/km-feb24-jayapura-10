// JavaScript untuk scrolling menu mulus by id
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("#menu li a");
  
    navLinks.forEach(function(navLink) {
      navLink.addEventListener("click", function(event) {
        event.preventDefault();
  
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        const offsetTop = targetElement.offsetTop;
  
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      });
    });
  });

  /*  hampir sama dengan yang diatas, hanya saja ini utnuk yang footernya*/
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
  
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });


 
  
