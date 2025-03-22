let mockUsers = JSON.parse(localStorage.getItem('mockUsers')) || [
  { name: 'rabbit', email: 'rabbit@rabbit.com', password: 'password123' },
  { name: 'bikesh', email: 'bikesh@bikesh.com', password: 'password456' }
];

// Store mockUsers in localStorage if it doesn't exist
if (!localStorage.getItem('mockUsers')) {
  localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
}
// Dark Mode Toggle
const darkModeCheckbox = document.getElementById('dark-mode-checkbox');//on the webpage that has the name
const body = document.body;//art where all the colors and stuff show up.

if (darkModeCheckbox) {//This checks if we actually found the checkbox
  darkModeCheckbox.addEventListener('change', () => {
    body.classList.toggle('dark-mode');//This flips the webpage’s look
    if (body.classList.contains('dark-mode')) {//This checks if the webpage has the "dark-mode"
      localStorage.setItem('dark-mode', 'enabled');
    } else {//: If the page isn’t dark
      localStorage.setItem('dark-mode', 'disabled');
    }
  });

  if (localStorage.getItem('dark-mode') === 'enabled') {//dark mode is on," do the next stuff.
    body.classList.add('dark-mode');
    darkModeCheckbox.checked = true;//the checkbox is ticked (on) to match the dark mode
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
/*document.addEventListener('DOMContentLoaded', function() {
  const authCard = document.getElementById('authCard');
  if (authCard) {//Checks if we found the card
    authCard.addEventListener('transitionend', function() {//the card finishes flipping
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
});*/

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
              
              // Check if user exists and password matches
              const user = mockUsers.find(u => u.email === email && u.password === password);
              
              if (user) {
                  localStorage.setItem('loggedInUser', JSON.stringify(user));
                  alert('Login successful!');
                  window.location.href = 'gallery.html'; // Redirect to Gallery
              } else {
                  alert('Invalid email or password');
              }
          });
      }

      const signupForm = document.getElementById('signupForm');
      if (signupForm) {
          signupForm.addEventListener('submit', function(e) {
              e.preventDefault();
              const email = document.getElementById('signup-email').value;
              const password = document.getElementById('signup-password').value;

              // Check if email already exists
              if (mockUsers.some(u => u.email === email)) {
                  alert('Email already registered.');
                  return;
              }

              // Add new user
              const newUser = { name: email.split('@')[0], email, password };
              mockUsers.push(newUser);
              localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
              localStorage.setItem('loggedInUser', JSON.stringify(newUser));
              alert('Signup successful!');
              window.location.href = 'gallery.html'; // Redirect to Gallery
          });
      }
  }

  // Check for logged-in user on Gallery page
  if (window.location.pathname.includes('gallery.html')) {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (loggedInUser) {
          const gallerySection = document.querySelector('.gallery');
          if (gallerySection) {
              const welcomeMessage = document.createElement('p');
              welcomeMessage.textContent = `Hello, ${loggedInUser.name}!`;
              welcomeMessage.style.cssText = 'color: #3498db; font-size: 1.5rem; margin-bottom: 2rem;';
              gallerySection.insertBefore(welcomeMessage, gallerySection.querySelector('h1'));
          }
      }
  }
});

function flipCard() {
    console.log("flipCard function called");
    const card = document.getElementById('authCard');
    if (card) {
      console.log("Card found, toggling flipped class"); 
      card.classList.toggle('flipped');
      console.log("Current classList:", card.classList); 
    } else {
      console.error("authCard element not found"); 
    }
  }


  // 3D Carousel Functionality
const carousel3d = document.getElementById('carousel3d');
if (carousel3d) {
    const slides = document.querySelectorAll('.carousel-3d-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function updateCarousel() {
        const angle = 360 / totalSlides;
        slides.forEach((slide, index) => {
            const slideAngle = (index - currentIndex) * angle;
            slide.style.transform = `
                rotateY(${slideAngle}deg)
                translateZ(400px)
                scale(${Math.abs(slideAngle) < 90 ? 1 : 0.8})
            `;
            slide.style.opacity = Math.abs(slideAngle) < 90 ? 1 : 0.5;
            slide.style.zIndex = Math.abs(slideAngle) < 90 ? 1 : 0;
        });
    }

    // Drag Functionality
    carousel3d.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        prevTranslate = currentTranslate;
        carousel3d.style.cursor = 'grabbing';
    });

    carousel3d.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const diffX = e.clientX - startX;
            currentTranslate = prevTranslate + diffX;
            currentIndex = Math.round(currentTranslate / 100) % totalSlides;
            if (currentIndex < 0) currentIndex += totalSlides;
            updateCarousel();
        }
    });

    carousel3d.addEventListener('mouseup', () => {
        isDragging = false;
        carousel3d.style.cursor = 'grab';
    });

    carousel3d.addEventListener('mouseleave', () => {
        isDragging = false;
        carousel3d.style.cursor = 'grab';
    });

    // Wheel Functionality
    carousel3d.addEventListener('wheel', (e) => {
        e.preventDefault();
        currentIndex += e.deltaY > 0 ? 1 : -1;
        if (currentIndex < 0) currentIndex = totalSlides - 1;
        if (currentIndex >= totalSlides) currentIndex = 0;
        currentTranslate = currentIndex * 100;
        updateCarousel();
    });

    // Touch Support for Mobile
    carousel3d.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        prevTranslate = currentTranslate;
    });

    carousel3d.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const diffX = e.touches[0].clientX - startX;
            currentTranslate = prevTranslate + diffX;
            currentIndex = Math.round(currentTranslate / 100) % totalSlides;
            if (currentIndex < 0) currentIndex += totalSlides;
            updateCarousel();
        }
    });

    carousel3d.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Initial Setup
    updateCarousel();
}