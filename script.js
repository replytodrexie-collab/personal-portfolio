const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Scroll reveal (skipped only if the OS asks for reduced motion) */
if ("IntersectionObserver" in window && !reduceMotion) {
  root.classList.add("has-js");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/* Mouse parallax for floating objects, cursor glow, and card tilt */
if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  const floaters = document.querySelectorAll("[data-depth]");
  const card = document.querySelector(".id-card");
  let frame;

  window.addEventListener("pointermove", (e) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      root.style.setProperty("--gx", `${e.clientX}px`);
      root.style.setProperty("--gy", `${e.clientY}px`);
      floaters.forEach((el) => {
        const d = parseFloat(el.dataset.depth);
        el.style.setProperty("--px", `${-x * d * 60}px`);
        el.style.setProperty("--py", `${-y * d * 60}px`);
      });
      if (card) {
        card.style.setProperty("--ry", `${-8 + x * 14}deg`);
        card.style.setProperty("--rx", `${4 - y * 14}deg`);
      }
    });
  });
}