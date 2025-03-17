// script.js

const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
const body = document.body;

if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeCheckbox.checked = true;
}

darkModeCheckbox.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
});

const galleryGrid = document.getElementById('gallery-grid');
const showMoreBtn = document.getElementById('showMoreBtn');
const showLessBtn = document.getElementById('showLessBtn');
const hiddenImages = galleryGrid.querySelectorAll('.gallery-item img.hidden');

showMoreBtn.addEventListener('click', () => {
    hiddenImages.forEach(img => img.parentElement.style.display = 'block');
    showMoreBtn.style.display = 'none';
    showLessBtn.style.display = 'inline-block';
});

showLessBtn.addEventListener('click', () => {
    hiddenImages.forEach(img => img.parentElement.style.display = 'none');
    showLessBtn.style.display = 'none';
    showMoreBtn.style.display = 'inline-block';
});

const modal = document.getElementById("lightbox-modal");
const modalImage = document.getElementById("modal-image");
const closeModal = document.getElementById("close-modal");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentImageIndex = 0;

const galleryData = [
  { src: "image/a.jpg", caption: "Scene 1" },
  { src: "image/a.jpg", caption: "Scene 2" },
  { src: "image/b.jpg", caption: "Scene 3" },
  { src: "image/c.jpg", caption: "Scene 4" },
  { src: "image/d.jpg", caption: "Scene 5" },
  { src: "image/e.jpg", caption: "Scene 6" },
  { src: "image/a.jpg", caption: "Scene 7" },
  { src: "image/a.jpg", caption: "Scene 8" },
  { src: "image/a.jpg", caption: "Scene 9" },
  { src: "image/a.jpg", caption: "Scene 10" },
];

function openModal(index) {
    currentImageIndex = index;
    modalImage.src = galleryData[index].src;
    modal.style.display = "flex";
}

function closeModalFunc() {
    modal.style.display = "none";
}

function navigate(direction) {
    currentImageIndex = (currentImageIndex + direction + galleryData.length) % galleryData.length;
    modalImage.src = galleryData[currentImageIndex].src;
}

galleryGrid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (item) {
        const index = Array.from(galleryGrid.children).indexOf(item);
        openModal(index);
    }
});

closeModal.addEventListener("click", closeModalFunc);
prevBtn.addEventListener("click", () => navigate(-1));
nextBtn.addEventListener("click", () => navigate(1));

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

showLessBtn.addEventListener('click', () => {
  const galleryGrid = document.getElementById('gallery-grid');
  const galleryItems = galleryGrid.querySelectorAll('.gallery-item');

  // Hide all gallery-items except the first two
  galleryItems.forEach((item, index) => {
      if (index > 1) { // Hide items after the first two
          item.style.display = 'none';
      }
  });

  showLessBtn.style.display = 'none';
  showMoreBtn.style.display = 'inline-block';
});

showMoreBtn.addEventListener('click', () => {
  const galleryGrid = document.getElementById('gallery-grid');
  const galleryItems = galleryGrid.querySelectorAll('.gallery-item');

  // Show all gallery items
  galleryItems.forEach((item) => {
      item.style.display = 'block';
  });

  showMoreBtn.style.display = 'none';
  showLessBtn.style.display = 'inline-block';
});