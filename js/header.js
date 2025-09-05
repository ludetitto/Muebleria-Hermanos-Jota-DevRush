function toggleMenu() {
  const navContainer = document.querySelector(".nav-container");
  navContainer.classList.toggle("active");
}

function updateHeaderLinksColor() {
  if (window.innerWidth > 768) {
    const header = document.querySelector("header");
    const sections = document.querySelectorAll("[data-bg]");
    const headerHeight = header.offsetHeight;

    let currentSection = null;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      //Si el header se esta interponiendo con una seccion
      if (rect.top <= headerHeight && rect.bottom >= 0) {
        currentSection = section;
      }
    });

    if (currentSection) {
      const bgType = currentSection.getAttribute("data-bg");
      if (bgType === "light") {
        header.classList.add("on-light-section");
      } else {
        header.classList.remove("on-light-section");
      }
    }
  }
}

/*document.addEventListener("click", function (event) {
  if (event.target.tagName === "A" && window.innerWidth <= 768) {
    document.querySelector(".nav-container").classList.remove("active");
  }
});*/

window.addEventListener("scroll", updateHeaderLinksColor);

updateHeaderLinksColor();
