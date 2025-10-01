document.addEventListener('DOMContentLoaded', function() {



  // Smooth Scroll for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Add scroll animation to sections
  const sections = document.querySelectorAll('.services, .gallery, .contact');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.mobile-menu');
  
  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
      
      // Update aria-expanded attribute for accessibility
      const isExpanded = nav.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.mobile-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Close mobile menu when clicking smooth scroll links
  document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Close mobile menu if open
      if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Carousel Functionality
  const carousel = document.querySelector('.carousel');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const indicators = document.querySelectorAll('.indicator');
  let currentIndex = 0;
  let autoSlideInterval;

  // Fungsi untuk menampilkan slide tertentu
  function showSlide(index) {
    // Memperbarui posisi carousel
    carousel.style.transform = `translateX(-${index * 100}%)`;
    
    // Memperbarui indikator aktif
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
    
    currentIndex = index;
  }

  // Fungsi untuk pindah ke slide berikutnya
  function nextSlide() {
    const nextIndex = (currentIndex + 1) % carouselItems.length;
    showSlide(nextIndex);
  }

  // Fungsi untuk pindah ke slide sebelumnya
  function prevSlide() {
    const prevIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    showSlide(prevIndex);
  }

  // Event listener untuk tombol next
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  // Event listener untuk tombol prev
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  // Event listener untuk indikator
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
      resetAutoSlide();
    });
  });

  // Fungsi untuk mengatur carousel otomatis
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 3000); // Berganti setiap 3 detik
  }

  // Fungsi untuk mereset timer otomatis
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Mulai carousel otomatis
  startAutoSlide();

  // Pause carousel saat mouseover
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
      startAutoSlide();
    });
  }

  // Register service worker for PWA functionality
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(error => {
          console.log('ServiceWorker registration failed: ', error);
        });
    });
  }

  // PWA Install functionality
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show install button
    const installBtn = document.querySelector('.install-btn');
    if (installBtn) {
      installBtn.classList.add('show');
    }
  });

  // Add click event to install button
  const installBtn = document.querySelector('.install-btn');
  if (installBtn) {
    installBtn.addEventListener('click', () => {
      if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          // Reset the deferred prompt
          deferredPrompt = null;
          // Hide install button after installation attempt
          installBtn.classList.remove('show');
        });
      }
    });
  }

});