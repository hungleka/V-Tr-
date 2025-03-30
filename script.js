// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};

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
