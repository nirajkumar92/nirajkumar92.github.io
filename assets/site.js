(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = Array.from(document.querySelectorAll(
    ".section-heading, .credibility-row > div, .focus-panel, .featured-paper, .paper-rows a, .journey-track li, .press-tile, .info-card, .publication-list .paper-card, .misc-card"
  )).filter((element) => (
    !element.matches(".publications-page .content-main > .info-card:first-child")
  ));

  if (!reducedMotion && "IntersectionObserver" in window) {
    revealTargets.forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
    });

    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    revealTargets.forEach((element) => observer.observe(element));
  }

  const hero = document.querySelector(".hero-panel");
  if (hero && !reducedMotion) {
    hero.addEventListener("pointermove", (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;
      hero.style.setProperty("--mx", `${x.toFixed(1)}%`);
      hero.style.setProperty("--my", `${y.toFixed(1)}%`);
    });
  }
})();
