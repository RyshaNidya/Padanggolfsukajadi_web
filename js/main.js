//! hover navbar menu
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a[href^='#']");
  const sections = document.querySelectorAll("div[id]");

  function activateLink() {
    let currentSection = null;
    const buffer = window.innerHeight / 4; // supaya lebih sensitif deteksinya

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= buffer && rect.bottom > buffer) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("font-bold", "bg-slate-600", "text-black");
      if (
        currentSection &&
        link.getAttribute("href") === `#${currentSection}`
      ) {
        link.classList.add("font-bold", "bg-slate-600", "text-black");
      }
    });
  }

  window.addEventListener("scroll", activateLink);
  activateLink(); // aktifkan pas halaman pertama kali dibuka

  // Smooth scroll
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      window.scrollTo({
        top: target.offsetTop - 100, // biar ga ketutup navbar
        behavior: "smooth",
      });
    });
  });
});

// ! scroll behave
window.addEventListener("beforeunload", () => {
  localStorage.setItem("scrollPos", window.scrollY);
});

// Balikin posisi scroll setelah reload
window.addEventListener("load", () => {
  const scrollPos = localStorage.getItem("scrollPos");
  if (scrollPos) {
    window.scrollTo(0, parseInt(scrollPos));
  }
});

// ! link menu navbar
const navMenu = document.getElementById("navbar-default");
const navLinks = navMenu.querySelectorAll("a"); // semua link di dalam menu
const toggleButton = document.querySelector(
  "[data-collapse-toggle='navbar-default']"
);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Tutup menu kalau sedang terbuka (hanya di mobile)
    if (!navMenu.classList.contains("hidden")) {
      navMenu.classList.add("hidden");
    }
  });
});
