// Mengatur latar belakang untuk setiap elemen .team-item
document.querySelectorAll('.team-item').forEach(item => {
  const background = item.getAttribute('data-background');
  item.style.backgroundImage = `url(${background})`;
});

// Mengatur event listener untuk tombol next dan prev
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

next.addEventListener('click', function() {
  let items = document.querySelectorAll('.team-item');
  document.querySelector('.team-slide').appendChild(items[0]);
});

prev.addEventListener('click', function() {
  let items = document.querySelectorAll('.team-item');
  document.querySelector('.team-slide').prepend(items[items.length - 1]);
});

document.addEventListener('keydown', function(event) {
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
