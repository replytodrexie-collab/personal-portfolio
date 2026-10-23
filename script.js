const root = document.documentElement;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const weakDevice = (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
                   (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
if (weakDevice) root.classList.add("lite");

/* Scroll reveal (skipped only if the OS asks for reduced motion) */
if ("IntersectionObserver" in window && !reduceMotion) {
  root.classList.add("has-js");
  const reveal = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

  /* Pause looping animations while their section is off screen */
  const pauser = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.classList.toggle("is-offscreen", !e.isIntersecting));
  });
  document.querySelectorAll(".hero-copy, .hero-card-wrap, .timeline, .tags").forEach((el) => pauser.observe(el));
}

/* Pause everything when the tab is in the background */
document.addEventListener("visibilitychange", () => {
  root.classList.toggle("tab-hidden", document.hidden);
});

/* Mouse parallax, cursor glow and card tilt (desktop only, skipped on weak devices) */
if (!reduceMotion && !weakDevice && matchMedia("(pointer: fine)").matches) {
  const scene = document.querySelector(".scene");
  const cardWrap = document.querySelector(".hero-card-wrap");
  const card = document.querySelector(".id-card");

  // Each floating item stores its depth once; moving the mouse then updates just two variables per container
  document.querySelectorAll("[data-depth]").forEach((el) => el.style.setProperty("--k", el.dataset.depth));

  let frame = 0;
  addEventListener("pointermove", (e) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      scene.style.setProperty("--mx", x.toFixed(3));
      scene.style.setProperty("--my", y.toFixed(3));
      scene.style.setProperty("--gx", `${e.clientX}px`);
      scene.style.setProperty("--gy", `${e.clientY}px`);
      cardWrap.style.setProperty("--mx", x.toFixed(3));
      cardWrap.style.setProperty("--my", y.toFixed(3));
      card.style.setProperty("--ry", `${-8 + x * 14}deg`);
      card.style.setProperty("--rx", `${4 - y * 14}deg`);
    });
  }, { passive: true });
}