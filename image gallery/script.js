let images = document.querySelectorAll(".gallery img");
let lightbox = document.getElementById("lightbox");
let lightboxImg = document.getElementById("lightbox-img");
let currentIndex = 0;

// Open Lightbox
function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  showImage();
}

// Close Lightbox
function closeLightbox() {
  lightbox.style.display = "none";
}

// Show Image
function showImage() {
  lightboxImg.src = images[currentIndex].src;
}

// Next/Prev Navigation
function changeSlide(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  } else if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  showImage();
}

// Filter Images
function filterImages(category) {
  images.forEach(img => {
    if (category === "all" || img.classList.contains(category)) {
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  });
}