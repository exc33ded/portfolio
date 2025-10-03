// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });

 // Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
// Initialize AOS animations
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// Dark mode toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  body.classList.add('dark-mode');
  themeToggle.querySelector('.material-icons').textContent = 'light_mode';
}

// Toggle theme on click
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    themeToggle.querySelector('.material-icons').textContent = 'light_mode';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggle.querySelector('.material-icons').textContent = 'dark_mode';
  }
});

// Back to top button functionality
const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Project modal functionality
const showAllBtn = document.getElementById('showAllProjects');
const projectModal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');

if (showAllBtn && projectModal && closeModal) {
  showAllBtn.addEventListener('click', function() {
    projectModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
  });

  closeModal.addEventListener('click', function() {
    projectModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling again
  });

  // Close modal if clicked outside content
  window.addEventListener('click', function(event) {
    if (event.target === projectModal) {
      projectModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-grid-item');

if (filterBtns.length > 0 && projectItems.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      projectItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Log when DOM is ready
console.log("DOM loaded - Basic functionality initialized");
});

// Wait for all content to load before initializing sliders
window.addEventListener('load', function() {
console.log("Window fully loaded - initializing sliders");

// Initialize image sliders
initImageSliders();
});

// Function to initialize image sliders
function initImageSliders() {
// Get all sliders
const sliders = document.querySelectorAll('.image-slider');
console.log("Found", sliders.length, "sliders");

sliders.forEach((slider, i) => {
  console.log("Setting up slider", i);
  
  // Get parent container that holds both slider and controls
  const projectImage = slider.closest('.project-image');
  
  // Find controls within that container
  const prevBtn = projectImage.querySelector('.slider-prev');
  const nextBtn = projectImage.querySelector('.slider-next');
  
  if (!prevBtn || !nextBtn) {
    console.error("Slider controls not found for slider", i);
    return;
  }
  
  // Get images in this slider
  const images = slider.querySelectorAll('img');
  console.log("Slider", i, "has", images.length, "images");
  
  if (images.length <= 1) {
    console.log("Slider", i, "has only one image, disabling controls");
    return;
  }
  
  let currentIndex = 0;
  
  // Initially hide all images except the first one
  images.forEach((img, index) => {
    img.style.display = index === 0 ? 'block' : 'none';
  });
  
  // Add direct click handlers with debugging
  prevBtn.onclick = function(e) {
    console.log("Previous button clicked for slider", i);
    e.stopPropagation(); // Prevent event bubbling
    
    // Hide current image
    images[currentIndex].style.display = 'none';
    
    // Calculate new index (wrap around to end if at beginning)
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    
    // Show new image
    images[currentIndex].style.display = 'block';
  };
  
  nextBtn.onclick = function(e) {
    console.log("Next button clicked for slider", i);
    e.stopPropagation(); // Prevent event bubbling
    
    // Hide current image
    images[currentIndex].style.display = 'none';
    
    // Calculate new index (wrap around to beginning if at end)
    currentIndex = (currentIndex + 1) % images.length;
    
    // Show new image
    images[currentIndex].style.display = 'block';
  };
  
  console.log("Slider", i, "initialized successfully");
});
}

// Mobile navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-links a');
  const body = document.body;

  if (hamburger && navLinks) {
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeMenu();
      }
    });

    // Helper functions
    function toggleMenu() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      body.style.overflow = '';
    }
  }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    // Skip if it's just a # (often used for buttons)
    if (this.getAttribute('href') === '#') return;
    
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Smooth scroll to the element
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for fixed header
        behavior: 'smooth'
      });
    }
  });
});
});

// Publication modal functionality
document.addEventListener('DOMContentLoaded', function() {
  const pubModal = document.getElementById('pubModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalAuthors = document.getElementById('modalAuthors');
  const modalVenue = document.getElementById('modalVenue');
  const modalAbstract = document.getElementById('modalAbstract');
  const modalLinks = document.getElementById('modalLinks');
  const closeBtn = document.querySelector('.pub-modal-close');

  function openModal(data) {
    modalTitle.textContent = data.title || '';
    modalAuthors.textContent = data.authors || '';
    modalVenue.textContent = data.venue || '';
    modalAbstract.textContent = data.abstract || '';

    // Populate links
    modalLinks.innerHTML = '';
    if (data.link && data.link !== '#') {
      const a = document.createElement('a');
      a.href = data.link;
      a.target = '_blank';
      a.className = 'btn-text';
      a.textContent = 'Open Paper';
      modalLinks.appendChild(a);
    }

    pubModal.classList.add('open');
    pubModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    pubModal.classList.remove('open');
    pubModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Wire read buttons
  const readBtns = document.querySelectorAll('.pub-read');
  readBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      // If link points to external and has href, allow default
      const href = btn.getAttribute('href');
      const isPlaceholder = !href || href === '#';
      e.preventDefault();

      const data = {
        title: btn.dataset.title,
        authors: btn.dataset.authors,
        venue: btn.dataset.venue,
        abstract: btn.dataset.abstract,
        link: btn.dataset.link || href
      };

      // If the link is external and not placeholder, open in new tab directly
      if (data.link && data.link !== '#' && href && href !== '#') {
        // still open modal but keep link
      }

      openModal(data);
    });
  });

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  pubModal.addEventListener('click', function(e) {
    if (e.target === pubModal) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && pubModal.classList.contains('open')) closeModal();
  });
});