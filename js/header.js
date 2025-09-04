function toggleMenu() {
  const navContainer = document.querySelector(".nav-container");
  navContainer.classList.toggle("active");
}

document.addEventListener("click", function (event) {
  if (event.target.tagName === "A" && window.innerWidth <= 768) {
    document.querySelector(".nav-container").classList.remove("active");
  }
});
