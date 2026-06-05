const revealTargets = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.18
});

revealTargets.forEach((target, index) => {
  target.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
  observer.observe(target);
});
