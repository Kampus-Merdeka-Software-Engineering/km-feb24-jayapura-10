let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
  let items = document.querySelectorAll('.team-item')
  document.querySelector('.team-slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
  let items = document.querySelectorAll('.team-item')
  document.querySelector('.team-slide').prepend(items[items.length - 1])
})

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





/* menambahkan lazy loading*/
document.addEventListener("DOMContentLoaded", function() {
  var lazyBgImages = document.querySelectorAll('.team-item');

  function lazyLoadBgImages() {
      lazyBgImages.forEach(function(bgImage) {
          if (isElementInViewport(bgImage)) {
              bgImage.style.backgroundImage = "url('" + bgImage.dataset.bg + "')";
              bgImage.classList.remove('team-item');
          }
      });
  }

  function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }

  lazyLoadBgImages();

  window.addEventListener('scroll', lazyLoadBgImages);
});
