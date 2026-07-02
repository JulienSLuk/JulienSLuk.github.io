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
    img.classList.add("achievement-img");

    img.addEventListener("click", () => {
      openLightbox(basePath + file, file);
    });

    container.appendChild(img);
  });
}

loadAchievements();

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");
const zoomResetBtn = document.getElementById("zoomReset");

let currentZoom = 1;

function openLightbox(src, alt) {
  currentZoom = 1;

  lightboxImage.src = src;
  lightboxImage.alt = alt || "Expanded image";
  lightboxImage.style.transform = "scale(1)";

  lightbox.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("show");
  document.body.style.overflow = "";

  currentZoom = 1;
  lightboxImage.style.transform = "scale(1)";
}

function updateZoom() {
  lightboxImage.style.transform = `scale(${currentZoom})`;
}

zoomInBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentZoom += 0.25;
  updateZoom();
});

zoomOutBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentZoom = Math.max(0.5, currentZoom - 0.25);
  updateZoom();
});

zoomResetBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentZoom = 1;
  updateZoom();
});

lightboxClose.addEventListener("click", (e) => {
  e.stopPropagation();
  closeLightbox();
});

lightboxImage.addEventListener("click", (e) => {
  e.stopPropagation();
});

lightbox.addEventListener("click", () => {
  closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("show")) return;

  if (e.key === "Escape") {
    closeLightbox();
  }

  if (e.key === "+" || e.key === "=") {
    currentZoom += 0.25;
    updateZoom();
  }

  if (e.key === "-") {
    currentZoom = Math.max(0.5, currentZoom - 0.25);
    updateZoom();
  }
});