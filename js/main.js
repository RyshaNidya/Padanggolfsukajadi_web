//! hover navbar menu
// document.addEventListener("DOMContentLoaded", () => {
//   const navLinks = document.querySelectorAll("nav a[href^='#']");
//   const sections = document.querySelectorAll("div[id]");

//   function activateLink() {
//     let currentSection = null;
//     const buffer = window.innerHeight / 4; // supaya lebih sensitif deteksinya

//     sections.forEach((section) => {
//       const rect = section.getBoundingClientRect();
//       if (rect.top <= buffer && rect.bottom > buffer) {
//         currentSection = section.id;
//       }
//     });

//     navLinks.forEach((link) => {
//       link.classList.remove("font-bold", "bg-slate-600", "text-black");
//       if (
//         currentSection &&
//         link.getAttribute("href") === `#${currentSection}`
//       ) {
//         link.classList.add("font-bold", "bg-slate-600", "text-black");
//       }
//     });
//   }

//   window.addEventListener("scroll", activateLink);
//   activateLink(); // aktifkan pas halaman pertama kali dibuka

//   // Smooth scroll
//   navLinks.forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();
//       const target = document.querySelector(link.getAttribute("href"));
//       window.scrollTo({
//         top: target.offsetTop - 100, // biar ga ketutup navbar
//         behavior: "smooth",
//       });
//     });
//   });
// });

// ! navbar menu pages active
document.addEventListener("DOMContentLoaded", () => {

  //array nav
  const judulbyindex = {
    "HOME | Padang Golf Sukajadi" : 0,
    "GOLF | Padang Golf Sukajadi" : 1,
    "HOTEL | Padang Golf Sukajadi" : 2,
    "FACILITIES | Padang Golf Sukajadi" : 3,
    "MEMBERSHIP | Padang Golf Sukajadi" : 4,
    "GREEN FEES | Padang Golf Sukajadi" : 5,
    "CLUBS | Padang Golf Sukajadi" : 6,
    "LOCATION | Padang Golf Sukajadi" : 7,
    "CONTACT US | Padang Golf Sukajadi" : 8,
  }

  // judul halaman sekarng
  const nowPage = document.title;
  console.log(nowPage); 

  // ambil index halamannya
  const indexPageNow = judulbyindex[nowPage];
  console.log(indexPageNow); 
  

  // navbar menu semua
  const DaftarMenu = document.querySelectorAll("#navbar-besar ul li a");
  console.log(DaftarMenu); 

  //style
  if (indexPageNow !== undefined){

    // menu yg aktiv
    const aktifLink = DaftarMenu[indexPageNow];
    console.log(aktifLink)
    
    if(aktifLink){
      aktifLink.classList.add("font-bold", "bg-gray-600", "text-white")
    }
  }

  
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
