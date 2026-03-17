const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      element.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.display = "none";
  });
});


async function loadAchievements() {
  try {
    const response = await fetch("assets/achievements/manifest.json");
    const data = await response.json();

    renderAchievementGroup(
      "certificatesGrid",
      "assets/achievements/certificates/",
      data.certificates || []
    );

    renderAchievementGroup(
      "awardsGrid",
      "assets/achievements/awards/",
      data.awards || []
    );

    renderAchievementGroup(
      "testimonialsGrid",
      "assets/achievements/testimonials/",
      data.testimonials || []
    );
  } catch (error) {
    console.error("Failed to load achievements manifest:", error);
  }
}

function renderAchievementGroup(containerId, basePath, files) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  files.forEach((file) => {
    const img = document.createElement("img");
    img.src = basePath + file;
    img.alt = file;
    container.appendChild(img);
  });
}

loadAchievements();