// JavaScript
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
  


// Toggle Menu Icon ========================================
// let toggleIcon = document.querySelector('.menuIcon');

// toggleIcon.addEventListener('click', () => {
//     if (toggleIcon.className != 'menuIcon toggle') {
//         toggleIcon.className += ' toggle';
//     } else {
//         toggleIcon.className = 'menuIcon';
//     }
// });

// /*  batas */
// document.addEventListener("DOMContentLoaded", function() {
//     const navLinks = document.querySelectorAll('.link');
  
//     navLinks.forEach(link => {
//       link.addEventListener('click', scrollToSection);
//     });
  
//     function scrollToSection(event) {
//       event.preventDefault();
//       const targetId = this.getAttribute('href').substring(1);
//       const targetSection = document.getElementById(targetId);
//       const distanceToTop = targetSection.offsetTop;
  
//       window.scrollTo({
//         top: distanceToTop,
//         behavior: 'smooth'
//       });
//     }
//   });
  
