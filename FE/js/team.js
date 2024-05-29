// Mengatur latar belakang untuk setiap elemen .team-item
document.querySelectorAll('.team-item').forEach((item, index) => {
  const background = item.getAttribute('data-background');
  if (background) {
    item.style.backgroundImage = `url(${background})`;
  }

  const fourthItem = document.querySelector('.team-item:nth-child(4)');
  if (fourthItem) {
    fourthItem.style.backgroundPosition = '50% 55%';
  }

});

// Mengatur event listener untuk tombol next dan prev
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

next.addEventListener('click', function () {
  slideNext();
});

prev.addEventListener('click', function () {
  slidePrev();
});

document.addEventListener('keydown', function (event) {
  if (event.key === "ArrowRight") {
    slideNext();
  } else if (event.key === "ArrowLeft") {
    slidePrev();
  }
});

function slideNext() {
  let items = document.querySelectorAll('.team-item');
  document.querySelector('.team-slide').appendChild(items[0]);
}

function slidePrev() {
  let items = document.querySelectorAll('.team-item');
  document.querySelector('.team-slide').prepend(items[items.length - 1]);
}

// Menunda pemuatan skrip tambahan hingga diperlukan
window.addEventListener('load', function () {
  // Memuat skrip tambahan hanya saat tombol next atau prev di-klik
  next.addEventListener('click', loadAdditionalScripts);
  prev.addEventListener('click', loadAdditionalScripts);

  function loadAdditionalScripts() {
    // Tuliskan kode yang memuat skrip tambahan di sini
  }
});
