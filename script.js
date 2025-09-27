// Hiệu ứng khi cuộn xuống mới hiện phần "About"
const aboutSection = document.querySelector(".about");
window.addEventListener("scroll", () => {
  const rect = aboutSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    aboutSection.classList.add("visible");
  }
});
// Toggle menu mobile
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});
