const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const init = () => {
  const targets = document.querySelectorAll<HTMLElement>(".reveal, .reveal-left, .reveal-right");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
  );

  targets.forEach((el) => observer.observe(el));
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

// oxlint-disable-next-line unicorn/require-module-specifiers -- forces module scope so this script can be dynamically imported in tests
export {};
