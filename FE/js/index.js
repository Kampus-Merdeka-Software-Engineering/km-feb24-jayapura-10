// JavaScript untuk scrolling menu mulus by id
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
  
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
  
        targetElement.scrollIntoView({ behavior: 'smooth' });
      });
    });
  });
  
  

  /* rezie ukuran dashboard*/ 
  // document.addEventListener('DOMContentLoaded', function() {
  //   var iframe = document.querySelector('iframe');
  //   function resizeIframe() {
  //     var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  //     iframe.style.height = height + 'px';
  //   }
  
  //   window.addEventListener('resize', resizeIframe);
  //   resizeIframe(); // Adjust height on load
  // });

  /*  hampir sama dengan yang diatas, hanya saja ini utnuk yang footernya*/
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
  
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });


 
  
