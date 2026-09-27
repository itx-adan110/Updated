document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const icon = document.querySelector(".theme-icon");
  const logoSwitches = document.querySelectorAll(".logo-switch");

  // Light is the default. A saved user choice still wins on later visits.
  const savedTheme = localStorage.getItem("portfolio-theme");
  const initialTheme = savedTheme === "dark" ? "dark" : "light";

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    const isLight = theme === "light";

    if (toggle) {
      toggle.setAttribute("aria-pressed", String(isLight));
      toggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
      );
    }

    if (icon) icon.textContent = isLight ? "☾" : "☼";

    logoSwitches.forEach((logo) => {
      logo.classList.remove("is-changing");
      void logo.offsetWidth;
      logo.classList.add("is-changing");
      window.setTimeout(() => logo.classList.remove("is-changing"), 420);
    });
  };

  setTheme(initialTheme);

  toggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  });

  // Short pencil-like cursor trail for mouse devices.
  if (window.matchMedia("(pointer: fine)").matches) {
    const trail = document.createElement("div");
    const click = document.createElement("div");

    trail.className = "cursor-trail";
    click.className = "cursor-click";
    document.body.append(trail, click);

    let x = -100;
    let y = -100;
    let targetX = -100;
    let targetY = -100;

    const renderTrail = () => {
      x += (targetX - x) * 0.24;
      y += (targetY - y) * 0.24;

      const angle = Math.atan2(targetY - y, targetX - x) * 180 / Math.PI + 90;
      trail.style.transform =
        `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`;

      requestAnimationFrame(renderTrail);
    };

    window.addEventListener("pointermove", (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      trail.style.opacity = "0.72";
    }, { passive: true });

    window.addEventListener("pointerleave", () => {
      trail.style.opacity = "0";
    });

    window.addEventListener("pointerdown", (event) => {
      click.style.left = `${event.clientX}px`;
      click.style.top = `${event.clientY}px`;
      click.classList.remove("show");
      void click.offsetWidth;
      click.classList.add("show");
    });

    renderTrail();
  }

  // Touch feedback for phones/tablets.
  window.addEventListener("pointerdown", (event) => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      const ripple = document.createElement("span");
      ripple.className = "touch-ripple";
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    }
  }, { passive: true });

  // Existing social links remain unchanged; this only adds click feedback.
  document.querySelectorAll(".social").forEach((social) => {
    social.addEventListener("click", () => {
      social.classList.remove("social-pulse");
      void social.offsetWidth;
      social.classList.add("social-pulse");
    });
  });
});
