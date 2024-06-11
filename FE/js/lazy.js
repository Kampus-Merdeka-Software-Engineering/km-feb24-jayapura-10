  // scripts.js
  document.addEventListener("DOMContentLoaded", function() {
    const homeSection = document.querySelector('.home');
  
    // Membuat elemen gambar baru untuk memuat gambar
    const img = new Image();
    img.src = 'https://i.ibb.co.com/ccTfnrL/NYC-01after.webp'; // Ganti dengan URL gambar Anda
    img.onload = () => {
        // Setelah gambar dimuat, atur background-image dan tambahkan kelas 'loaded'
        homeSection.style.backgroundImage = `url('${img.src}')`;
        homeSection.classList.add('loaded');
    };
  });