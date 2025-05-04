var navLinks = document.getElementById("navLinks");
function showMenu() {
  navLinks.style.right = "0";
}
function hideMenu() {
  navLinks.style.right = "-200px";
}

document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.getElementById("navLinks");

  document.addEventListener("click", function (event) {
    if (window.innerWidth <= 700) {
      if (
        navLinks &&
        navLinks.style.right === "0px" &&
        !navLinks.contains(event.target) &&
        !event.target.closest(".fa-bars")
      ) {
        hideMenu();
      }
    }
  });

  document.addEventListener("touchend", function (event) {
    if (window.innerWidth <= 700) {
      if (
        navLinks &&
        navLinks.style.right === "0px" &&
        !navLinks.contains(event.target) &&
        !event.target.closest(".fa-bars")
      ) {
        hideMenu();
      }
    }
  });

  if (navLinks) {
    navLinks.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    navLinks.addEventListener("touchend", function (event) {
      event.stopPropagation();
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const dots = document.querySelectorAll(".dot");
  const arrows = document.querySelectorAll(".arrow");

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setActiveDot(index);
    });
  });

  let currentIndex = 0;
  arrows[0].addEventListener("click", () => {
    currentIndex = currentIndex === 0 ? dots.length - 1 : currentIndex - 1;
    setActiveDot(currentIndex);
  });

  arrows[1].addEventListener("click", () => {
    currentIndex = currentIndex === dots.length - 1 ? 0 : currentIndex + 1;
    setActiveDot(currentIndex);
  });

  function setActiveDot(index) {
    dots.forEach((d) => d.classList.remove("active"));
    dots[index].classList.add("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot");
  const prevButton = document.querySelector(".arrow.prev");
  const nextButton = document.querySelector(".arrow.next");

  let currentIndex = 0;
  let interval;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentIndex = index;
  }

  function nextSlide() {
    let newIndex = currentIndex + 1;
    if (newIndex >= slides.length) {
      newIndex = 0;
    }
    showSlide(newIndex);
  }

  function prevSlide() {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = slides.length - 1;
    }
    showSlide(newIndex);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      showSlide(index);
      resetInterval();
    });
  });

  prevButton.addEventListener("click", function () {
    prevSlide();
    resetInterval();
  });

  nextButton.addEventListener("click", function () {
    nextSlide();
    resetInterval();
  });

  function startInterval() {
    interval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }

  startInterval();
});

const openPopupBtn = document.querySelector(".hero-btn");
const closePopupBtn = document.getElementById("close-popup-btn");
const popup = document.getElementById("newsletter-popup");
const newsletterForm = document.getElementById("newsletter-form");
const popupContainer = document.querySelector(".popup-container");

// Open Popup Function - Updated for all devices
function openPopup(e) {
  e.preventDefault();
  popup.style.display = "flex";
  document.body.style.overflow = "hidden"; // Prevent background scrolling on all devices

  // Reset scroll position of form to top when opening for all devices
  setTimeout(() => {
    const popupForm = document.querySelector(".popup-form");
    if (popupForm) popupForm.scrollTop = 0;

    // Mobile-specific animations
    if (isMobileDevice()) {
      popupContainer.style.transform = "translateY(0)";
      popupContainer.style.opacity = "1";
    }
  }, 10);
}

function closePopup() {
  popup.style.display = "none";
  document.body.style.overflow = "auto";

  popupContainer.style.transform = "";
  popupContainer.style.opacity = "";
}

function handleSubmit(e) {
  e.preventDefault();

  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;

  if (!firstName || !lastName || !email) {
    alert("Please fill in all fields");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address");
    return;
  }

  console.log("Form submitted:", { firstName, lastName, email });

  alert("Thank you for subscribing!");

  closePopup();
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isMobileDevice() {
  return window.innerWidth <= 576;
}

function initPopup() {
  if (isMobileDevice()) {
    popupContainer.style.transition =
      "transform 0.3s ease-out, opacity 0.3s ease-out";
    popupContainer.style.transform = "translateY(100%)";
    popupContainer.style.opacity = "0";
  }
}

openPopupBtn.addEventListener("click", openPopup);
closePopupBtn.addEventListener("click", closePopup);
newsletterForm.addEventListener("submit", handleSubmit);

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    closePopup();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && popup.style.display === "flex") {
    closePopup();
  }
});

popupContainer.addEventListener("click", function (e) {
  e.stopPropagation();
});

window.addEventListener("DOMContentLoaded", () => {
  initPopup();
  ensureFormScrollable();
});

window.addEventListener("resize", initPopup);

// Update ensureFormScrollable to handle all devices
function ensureFormScrollable() {
  const popupForm = document.querySelector(".popup-form");
  if (popupForm) {
    // Prevent touch events on the overlay from propagating (for touch devices)
    popup.addEventListener(
      "touchmove",
      function (e) {
        if (e.target === popup) {
          e.preventDefault();
        }
      },
      { passive: false }
    );

    // Allow scrolling within the form (for touch devices)
    popupForm.addEventListener(
      "touchmove",
      function (e) {
        e.stopPropagation();
      },
      { passive: true }
    );

    // For desktop/laptop: prevent wheel events from scrolling the background
    popup.addEventListener(
      "wheel",
      function (e) {
        if (e.target === popup) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }
}
