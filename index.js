/* ===========================================================================
   CAFE DE MELLE - MAIN JAVASCRIPT FILE (index.js)
   =========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initHamburgerMenu();
  initOpenClosedBadge();
  initMenuFiltersAndSearch();
  initHeroSlider();
  initAboutCarousel();
  initScrollHighlighting();
  
  /* ✏️ FIX / LESSON: Explicitly call initCounters() so animated stats fire properly */
  initCounters();
});


/* ---------------------------------------------------------------------------
   FEATURE 1: MOBILE HAMBURGER MENU TOGGLE & AUTO-CLOSE
   --------------------------------------------------------------------------- */
function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-item");

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    });
  });
}


/* ---------------------------------------------------------------------------
   FEATURE 2: STORE OPERATING HOURS BADGE
   --------------------------------------------------------------------------- */
function initOpenClosedBadge() {
  const statusBadge = document.getElementById("store-status");
  if (!statusBadge) return;

  const currentHour = new Date().getHours(); 

  /* ✏️ FIX / LESSON: Operating Hours Logic Fix
     Hours are 9 AM (9) to 2 AM (2). Since 2 AM is numerically smaller, 
     we check if current hour is greater/equal to 9 OR strictly less than 2. */
  const isOpen = currentHour >= 9 || currentHour < 2;

  if (isOpen) {
    statusBadge.textContent = "🟢 We're Open!";
    statusBadge.classList.add("open");
    statusBadge.classList.remove("closed");
  } else {
    statusBadge.textContent = "🔴 Closed • Opens 9 AM";
    statusBadge.classList.add("closed");
    statusBadge.classList.remove("open");
  }
}


/* ---------------------------------------------------------------------------
   FEATURE 3 & 4: UNIFIED LIVE SEARCH BAR & CATEGORY FILTERS
   --------------------------------------------------------------------------- */
function initMenuFiltersAndSearch() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("menu-search");

  function updateMenu() {
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const activeBtn = document.querySelector(".filter-btn.active");
    const activeCategory = activeBtn ? activeBtn.getAttribute("data-category") : "all";
    const cards = document.querySelectorAll("#menu-grid .card");

    cards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");
      const title = card.querySelector("h4") ? card.querySelector("h4").textContent.toLowerCase() : "";

      const matchesCategory = (activeCategory === "all" || cardCategory === activeCategory);
      const matchesSearch = title.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      updateMenu();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", updateMenu);
  }
}


/* ---------------------------------------------------------------------------
   FEATURE 5: HERO ANNOUNCEMENT CAROUSEL SLIDER
   --------------------------------------------------------------------------- */
const slides = [
  {
    title: "Good coffee, great bread, even better moments",
    subtitle: "Specialty coffee, artisanal pastries, and fruit sodas where you can enjoy your quality time.",
    image: "url('images/hero2.jpeg')"
  },
  {
    title: "We are officially on GrabFood! 🛵",
    subtitle: "Craving your favorite coffee? Order online and get it delivered in minutes.",
    image: "url('images/On Grab announcement.jpg')"
  },
  {
    title: "Try Our Fresh Korean Garlic Buns 🥐",
    subtitle: "Freshly baked every morning. Pairs perfectly with our Spanish Latte.",
    image: "url('images/kgbhero.jpeg')"
  }
];

let currentSlide = 0;

function initHeroSlider() {
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateHeroSlide(currentSlide);
  }, 5000);
}

window.setSlide = function(index) {
  currentSlide = index;
  updateHeroSlide(currentSlide);
};

function updateHeroSlide(index) {
  const heroSection = document.querySelector(".hero-section");
  const heroTitle = document.getElementById("hero-title");
  const heroSubtitle = document.getElementById("hero-subtitle");
  const dots = document.querySelectorAll(".slider-dots .dot");

  if (heroTitle && heroSubtitle && heroSection) {
    heroTitle.textContent = slides[index].title;
    heroSubtitle.textContent = slides[index].subtitle;
    heroSection.style.backgroundImage = slides[index].image;

    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }
}


/* ---------------------------------------------------------------------------
   FEATURE 6: ABOUT SECTION CAROUSEL CONTROLLER
   --------------------------------------------------------------------------- */
let currentAboutSlide = 0;

function initAboutCarousel() {
  const prevBtn = document.getElementById("about-prev");
  const nextBtn = document.getElementById("about-next");
  const slides = document.querySelectorAll(".about-slide");

  if (!slides.length) return;

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentAboutSlide = (currentAboutSlide - 1 + slides.length) % slides.length;
      updateAboutSlide(currentAboutSlide);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentAboutSlide = (currentAboutSlide + 1) % slides.length;
      updateAboutSlide(currentAboutSlide);
    });
  }
}

window.setAboutSlide = function(index) {
  currentAboutSlide = index;
  updateAboutSlide(currentAboutSlide);
};

function updateAboutSlide(index) {
  const slides = document.querySelectorAll(".about-slide");
  const dots = document.querySelectorAll(".about-dot");

  slides.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === index);
  });

  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === index);
  });
}


/* ---------------------------------------------------------------------------
   FEATURE 7: ACTIVE NAVBAR HIGHLIGHTING ON SCROLL
   --------------------------------------------------------------------------- */
function initScrollHighlighting() {
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-item");

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentSection}`) {
        item.classList.add("active");
      }
    });
  });
}


/* ---------------------------------------------------------------------------
   FEATURE 8: SCROLL-TRIGGERED ANIMATED NUMERIC COUNTERS
   --------------------------------------------------------------------------- */
function initCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        
        statNumbers.forEach((counter) => {
          const target = +counter.getAttribute("data-target");
          const duration = 1500;
          const increment = target / (duration / 16);

          let current = 0;
          const updateCount = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.ceil(current);
              requestAnimationFrame(updateCount);
            } else {
              counter.textContent = target;
            }
          };

          updateCount();
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector(".stats-grid");
  if (statsSection) observer.observe(statsSection);
}