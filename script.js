/* ==========================================================================
   bar こうりん - Interactive JavaScript Features
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation Menu Toggle ---
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('#mainNav a');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isActive = menuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
      
      // Prevent background scrolling when menu is open
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable background scrolling
      });
    });
  }

  // --- Snack Menu Drawer Modal ---
  const snackOverlay = document.getElementById('snackOverlay');
  const btnOpenSnack = document.getElementById('btnOpenSnack');
  const btnCloseSnack = document.getElementById('btnCloseSnack');

  if (snackOverlay && btnOpenSnack && btnCloseSnack) {
    // Open drawer
    btnOpenSnack.addEventListener('click', (e) => {
      e.preventDefault();
      snackOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Disable background scrolling
    });

    // Close drawer
    const closeDrawer = () => {
      snackOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable background scrolling
    };

    btnCloseSnack.addEventListener('click', closeDrawer);

    // Close drawer when clicking outside the panel
    snackOverlay.addEventListener('click', (e) => {
      if (e.target === snackOverlay) {
        closeDrawer();
      }
    });

    // Close drawer on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && snackOverlay.classList.contains('active')) {
        closeDrawer();
      }
    });
  }

  // --- Toilet Image Peek Toggle (Curiosity Spark) ---
  const toiletWrapper = document.getElementById('toiletWrapper');
  const blurOverlayText = document.getElementById('blurOverlayText');

  if (toiletWrapper) {
    const toggleToiletPeek = () => {
      const isPeeked = toiletWrapper.classList.toggle('peeked');
      
      if (blurOverlayText) {
        if (isPeeked) {
          blurOverlayText.style.opacity = '0';
          blurOverlayText.style.transition = 'opacity 0.4s ease';
        } else {
          blurOverlayText.style.opacity = '1';
        }
      }
    };
    
    // Allow clicking directly on the image wrapper to peek
    toiletWrapper.style.cursor = 'pointer';
    toiletWrapper.addEventListener('click', toggleToiletPeek);
  }

  // --- Gallery & Hero Slider Logic ---
  const initSlider = (sliderId, intervalMs = 4000) => {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.hero-slide, .gallery-slide');
    if (slides.length <= 1) return;
    
    let currentIndex = 0;
    
    setInterval(() => {
      // Remove active class from current slide
      slides[currentIndex].classList.remove('active');
      
      // Calculate next index
      currentIndex = (currentIndex + 1) % slides.length;
      
      // Add active class to next slide
      slides[currentIndex].classList.add('active');
    }, intervalMs);
  };

  // Initialize all sliders with 4-second intervals
  initSlider('heroSlider', 4000);
  initSlider('counterSlider', 4000);
  initSlider('tableSlider', 4000);

  // --- Opening Splash Screen Animation ---
  const openingOverlay = document.getElementById('openingOverlay');
  if (openingOverlay) {
    // Lock scroll initially during intro
    document.body.style.overflow = 'hidden';
    
    // Step 1: Trigger split curtain reveal at 3.4 seconds
    setTimeout(() => {
      openingOverlay.classList.add('reveal');
      document.body.classList.add('reveal-site');
      document.body.style.overflow = ''; // Re-enable background scrolling
    }, 3400);
    
    // Step 2: Completely remove overlay from pointer-events/layout flow at 4.6 seconds
    setTimeout(() => {
      openingOverlay.style.display = 'none';
    }, 4600);
  }

});
