
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // Jika href tidak dimulai dengan '#', biarkan default action terjadi
        });
    });
});
//untuk burger menu
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('#menu');

    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      menu.classList.toggle('active');
    });

    // Optional: menu otomatis tertutup setelah di klik
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('active');
      });
    });
  });


  //lazy loading home sec


  //responsife paragraf home

  document.addEventListener('DOMContentLoaded', () => {
    const paragraph = document.querySelector('.home-content p');
  
    // Fungsi untuk menampilkan teks penuh pada klik
    function expandText() {
      paragraph.style.webkitLineClamp = 'initial'; // Menghapus batasan jumlah baris
      paragraph.removeEventListener('click', expandText); // Menghapus event listener agar tidak terus berulang
    }
  
    // Event listener untuk memanggil fungsi saat teks di klik
    paragraph.addEventListener('click', expandText);
  });
  
  
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('button-home');
    button.addEventListener('click', (event) => {
        event.preventDefault();  // Prevents the default action
        window.location.href = './dashboard/dashboard.html';  // Change to your desired link
    });
  });
