// Elements
const navLinks = document.getElementById("nav-links");
const menuBtn = document.getElementById("menu-btn");
const menuBtnIcon = menuBtn.querySelector("i");

// Topbar dropdown elements (NEW behavior)
const topbarMenuBtn = document.getElementById("topbar-menu-btn");
const topbarDropdown = document.getElementById("topbar-dropdown");

// Helper: toggle menu open/close (for main nav)
function setMenuOpen(open) {
  if (open) {
    navLinks.classList.add("open");
    menuBtnIcon.setAttribute("class", "ri-close-line");
    menuBtn.setAttribute("aria-expanded", "true");
  } else {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-3-line");
    menuBtn.setAttribute("aria-expanded", "false");
  }
}

// Toggle menu (main btn)
menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.contains("open");
  setMenuOpen(!isOpen);
});

// --------------------
// TOPBAR DROPDOWN HANDLER (NEW)
// --------------------
function setTopbarOpen(open) {
  if (!topbarDropdown || !topbarMenuBtn) return;

  if (open) {
    topbarDropdown.classList.add("open");
    topbarDropdown.setAttribute("aria-hidden", "false");
    topbarMenuBtn.setAttribute("aria-expanded", "true");
    // focus first link for accessibility
    const first = topbarDropdown.querySelector("a");
    if (first) first.focus();
  } else {
    topbarDropdown.classList.remove("open");
    topbarDropdown.setAttribute("aria-hidden", "true");
    topbarMenuBtn.setAttribute("aria-expanded", "false");
  }
}

// Topbar menu button toggles the topbar dropdown (keeps main nav intact)
if (topbarMenuBtn && topbarDropdown) {
  topbarMenuBtn.addEventListener("click", (ev) => {
    ev.stopPropagation();
    const isOpen = topbarDropdown.classList.contains("open");
    setTopbarOpen(!isOpen);
  });
}

// Close topbar dropdown when clicking a link inside it
if (topbarDropdown) {
  topbarDropdown.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      setTopbarOpen(false);
    }
  });
}

// Close dropdowns when clicking outside (for convenience)
document.addEventListener("click", (e) => {
  // if click happened outside the topbar dropdown and the topbar button, close it
  if (topbarDropdown && !topbarDropdown.contains(e.target) && !topbarMenuBtn.contains(e.target)) {
    setTopbarOpen(false);
  }
});

// Close when link clicked in main nav (keeps behavior compact)
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    setMenuOpen(false);
  }
});

// Close navs with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (navLinks.classList.contains("open")) {
      setMenuOpen(false);
      menuBtn.focus();
    }
    if (topbarDropdown && topbarDropdown.classList.contains("open")) {
      setTopbarOpen(false);
      topbarMenuBtn.focus();
    }
  }
});

// Dynamic footer year
const footerYear = document.getElementById("footer-year");
if (footerYear) footerYear.textContent = new Date().getFullYear();

// Basic client-side contact form handler (demo only)
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = contactForm.elements["name"].value.trim();
    const email = contactForm.elements["email"].value.trim();
    const message = contactForm.elements["message"].value.trim();

    if (!name || !email || !message) {
      alert("Please fill all required fields.");
      return;
    }

    alert("Thanks! Your message has been received (demo).");
    contactForm.reset();
  });
}

// Optional ScrollReveal animations (if loaded)
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 900,
};
if (typeof ScrollReveal !== "undefined") {
  ScrollReveal().reveal(".topbar", { ...scrollRevealOption, origin: "top", distance: "20px", duration: 600 });
  ScrollReveal().reveal(".nav__bar", { ...scrollRevealOption, origin: "top", distance: "20px", duration: 700 });
  ScrollReveal().reveal(".header__content h1", scrollRevealOption);
  ScrollReveal().reveal(".portfolio__card", { ...scrollRevealOption, interval: 200 });
  ScrollReveal().reveal(".service__card", { ...scrollRevealOption, interval: 200 });
}
