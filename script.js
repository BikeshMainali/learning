// Dark Mode Toggle
const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
const body = document.body;

if (darkModeCheckbox) {
  darkModeCheckbox.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      localStorage.setItem('dark-mode', 'disabled');
    }
  });

  if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeCheckbox.checked = true;
  }
}

// Gallery Functionality
const galleryGrid = document.getElementById('gallery-grid');
const showMoreBtn = document.getElementById('showMoreBtn');
const showLessBtn = document.getElementById('showLessBtn');

if (galleryGrid && showMoreBtn && showLessBtn) {
  const hiddenImages = galleryGrid.querySelectorAll('.gallery-item img.hidden');

  showMoreBtn.addEventListener('click', () => {
    hiddenImages.forEach(img => img.parentElement.style.display = 'block');
    showMoreBtn.style.display = 'none';
    showLessBtn.style.display = 'block';
  });

  showLessBtn.addEventListener('click', () => {
    hiddenImages.forEach(img => img.parentElement.style.display = 'none');
    showLessBtn.style.display = 'none';
    showMoreBtn.style.display = 'inline-block';
  });

  // Additional Show Less Logic
  showLessBtn.addEventListener('click', () => {
    const galleryItems = galleryGrid.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      if (index > 1) {
        item.style.display = 'none';
      }
    });
    showLessBtn.style.display = 'none';
    showMoreBtn.style.display = 'inline-block';
  });

  showMoreBtn.addEventListener('click', () => {
    const galleryItems = galleryGrid.querySelectorAll('.gallery-item');
    galleryItems.forEach((item) => {
      item.style.display = 'block';
    });
    showMoreBtn.style.display = 'none';
    showLessBtn.style.display = 'inline-block';
  });
}

// Lightbox Modal
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
  if (modalImage) modalImage.src = galleryData[index].src;
  if (modal) modal.style.display = "flex";
}

function closeModalFunc() {
  if (modal) modal.style.display = "none";
}

function navigate(direction) {
  currentImageIndex = (currentImageIndex + direction + galleryData.length) % galleryData.length;
  if (modalImage) modalImage.src = galleryData[currentImageIndex].src;
}

if (galleryGrid) {
  galleryGrid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (item) {
      const index = Array.from(galleryGrid.children).indexOf(item);
      openModal(index);
    }
  });
}

if (closeModal) closeModal.addEventListener("click", closeModalFunc);
if (prevBtn) prevBtn.addEventListener("click", () => navigate(-1));
if (nextBtn) nextBtn.addEventListener("click", () => navigate(1));

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModalFunc();
  }
});

// Auth Toggle Logic
document.addEventListener('DOMContentLoaded', function() {
  const authCard = document.getElementById('authCard');
  if (authCard) {
    authCard.addEventListener('transitionend', function() {
      const isFlipped = authCard.classList.contains('flipped');
      authCard.querySelectorAll('input').forEach(input => {
        input.disabled = isFlipped ? (input.closest('.auth-front') !== null) : (input.closest('.auth-back') !== null);
      });
    });

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        console.log('Login attempt:', { email, password });
        alert('Login functionality to be implemented!');
      });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        if (password === confirmPassword) {
          console.log('Signup attempt:', { email, password });
          alert('Signup functionality to be implemented!');
        } else {
          alert('Passwords do not match!');
        }
      });
    }
  }
});

function flipCard() {
    console.log("flipCard function called"); // Debug log
    const card = document.getElementById('authCard');
    if (card) {
      console.log("Card found, toggling flipped class"); // Debug log
      card.classList.toggle('flipped');
      console.log("Current classList:", card.classList); // Debug log
    } else {
      console.error("authCard element not found"); // Debug log
    }
  }