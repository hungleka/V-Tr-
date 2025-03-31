// Component loading with lazy loading
const loadComponent = async (containerId, componentPath) => {
  try {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Check if component is already loaded
    if (container.dataset.loaded === "true") return;

    const response = await fetch(componentPath);
    const html = await response.text();
    container.innerHTML = html;
    container.dataset.loaded = "true";
  } catch (error) {
    console.error(`Error loading component ${componentPath}:`, error);
  }
};

// Lazy load components based on scroll position
const lazyLoadComponents = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const containerId = entry.target.id;
          const componentPath = `components/${containerId.replace(
            "-container",
            ""
          )}.html`;
          loadComponent(containerId, componentPath);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "50px",
      threshold: 0.1,
    }
  );

  // Observe all component containers
  document.querySelectorAll('[id$="-container"]').forEach((container) => {
    observer.observe(container);
  });
};

// Modal functionality
const modalFunctions = {
  open: (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  },

  close: (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  },

  closeOnOutsideClick: (event) => {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none";
      document.body.style.overflow = "auto";
    }
  },
};

// Menu toggle functionality
const initMenuToggle = () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }
};

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Load header immediately as it's above the fold
  loadComponent("header-container", "components/header.html");

  // Initialize lazy loading for other components
  lazyLoadComponents();

  // Initialize menu toggle
  initMenuToggle();

  // Add modal click handler
  window.addEventListener("click", modalFunctions.closeOnOutsideClick);
});

// Export functions for use in HTML
window.openModal = modalFunctions.open;
window.closeModal = modalFunctions.close;
