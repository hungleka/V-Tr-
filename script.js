// Function to close modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
    // Reset scroll position
    modal.scrollTop = 0;
  }
}

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
    // Reset scroll position
    event.target.scrollTop = 0;
  }
};

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const modals = document.getElementsByClassName("modal");
    for (let modal of modals) {
      if (modal.style.display === "block") {
        modal.style.display = "none";
        // Reset scroll position
        modal.scrollTop = 0;
      }
    }
  }
});

// Create stars
function createStars() {
  const starsContainer = document.createElement("div");
  starsContainer.className = "stars";

  for (let i = 0; i < 200; i++) {
    const star = document.createElement("div");
    star.className = "star";

    // Random position
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    // Random size
    const size = Math.random() * 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random twinkle duration
    star.style.setProperty("--duration", `${2 + Math.random() * 3}s`);

    starsContainer.appendChild(star);
  }

  document.body.appendChild(starsContainer);
}

// Scroll Animation
function handleScrollAnimation() {
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Handle view more functionality for universe components
document.addEventListener("DOMContentLoaded", function () {
  const viewMoreButtons = document.querySelectorAll(".view-more-btn");

  viewMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".component-card");
      card.classList.toggle("expanded");
      this.textContent = card.classList.contains("expanded")
        ? "Thu gọn"
        : "Xem thêm";
    });
  });
});

// Initialize animations
document.addEventListener("DOMContentLoaded", () => {
  createStars();
  handleScrollAnimation();
});

// Initialize Swiper
document.addEventListener("DOMContentLoaded", function () {
  const solarSystemSwiper = new Swiper(".solar-system-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
});

// Header scroll behavior
let lastScroll = 0;
const header = document.querySelector(".main-header");
const scrollThreshold = 100; // Minimum scroll amount before hiding header

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Show/hide header based on scroll direction and amount
  if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
    // Scrolling down & past threshold
    header.classList.add("hidden");
  } else {
    // Scrolling up
    header.classList.remove("hidden");
  }

  lastScroll = currentScroll;
});

// Mobile menu functionality
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  mainNav.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
    menuToggle.classList.remove("active");
    mainNav.classList.remove("active");
  }
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    mainNav.classList.remove("active");
  });
});

// Initialize orbital cards collapse/expand functionality
document.addEventListener("DOMContentLoaded", function () {
  const orbitalCards = document.querySelectorAll(".orbital-card");

  orbitalCards.forEach((card) => {
    // Create toggle button if it doesn't exist
    if (!card.querySelector(".orbital-toggle")) {
      const toggleBtn = document.createElement("button");
      toggleBtn.className = "orbital-toggle";
      toggleBtn.innerHTML =
        '<span>Xem thêm</span><i class="fas fa-chevron-down"></i>';

      // Add toggle button after content
      card.querySelector(".orbital-content").appendChild(toggleBtn);

      // Add click event listener
      toggleBtn.addEventListener("click", function () {
        const details = card.querySelector(".orbital-details");

        // Toggle the expanded class
        card.classList.toggle("expanded");

        // Update button text and icon
        if (card.classList.contains("expanded")) {
          this.innerHTML =
            '<span>Thu gọn</span><i class="fas fa-chevron-up"></i>';
          details.style.maxHeight = details.scrollHeight + "px";
        } else {
          this.innerHTML =
            '<span>Xem thêm</span><i class="fas fa-chevron-down"></i>';
          details.style.maxHeight = "0";
        }
      });
    }
  });
});

// Horizontal scroll functionality for orbital section
document.addEventListener("DOMContentLoaded", function () {
  const orbitalCards = document.querySelector(".orbital-cards");
  const prevBtn = document.querySelector(".orbital-scroll-btn.prev");
  const nextBtn = document.querySelector(".orbital-scroll-btn.next");

  if (orbitalCards && prevBtn && nextBtn) {
    const scrollAmount = 300; // Width of one card plus gap

    prevBtn.addEventListener("click", () => {
      orbitalCards.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });

    nextBtn.addEventListener("click", () => {
      orbitalCards.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    // Show/hide scroll buttons based on scroll position
    orbitalCards.addEventListener("scroll", () => {
      const isAtStart = orbitalCards.scrollLeft === 0;
      const isAtEnd =
        orbitalCards.scrollLeft + orbitalCards.clientWidth >=
        orbitalCards.scrollWidth;

      prevBtn.style.opacity = isAtStart ? "0.5" : "1";
      prevBtn.style.pointerEvents = isAtStart ? "none" : "auto";

      nextBtn.style.opacity = isAtEnd ? "0.5" : "1";
      nextBtn.style.pointerEvents = isAtEnd ? "none" : "auto";
    });

    // Initial button state
    orbitalCards.dispatchEvent(new Event("scroll"));
  }
});
