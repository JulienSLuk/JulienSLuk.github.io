// Add animations and interactions using JavaScript
// Example: Scroll-triggered animations using the Intersection Observer API
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => {
  sectionObserver.observe(section);
});
