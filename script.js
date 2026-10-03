/* =========================================================
   SYED MOHIB ABBAS — PORTFOLIO
   Static GitHub Pages version
   Static GitHub Pages version.
========================================================= */

const root = document.documentElement;

/* =========================================================
   THEME
========================================================= */

const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light" || savedTheme === "dark") {
  root.dataset.theme = savedTheme;
}

function updateThemeButton() {
  if (!themeToggle) return;

  const light = root.dataset.theme === "light";

  themeToggle.setAttribute("aria-pressed", String(light));
  themeToggle.setAttribute(
    "aria-label",
    light ? "Switch to dark theme" : "Switch to light theme"
  );

  const icon = themeToggle.querySelector(".theme-icon");
  if (!icon) return;

  icon.innerHTML = light
    ? `
      <svg class="theme-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" fill="currentColor"/>
      </svg>
    `
    : `
      <svg class="theme-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="12" r="4" fill="currentColor"/>
        <path d="M12 2V4M12 20V22M4.93 4.93L6.35 6.35M17.65 17.65L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.35 17.65M17.65 6.35L19.07 4.93" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
      </svg>
    `;
}

updateThemeButton();

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";

  themeToggle.classList.remove("is-switching");
  void themeToggle.offsetWidth;
  themeToggle.classList.add("is-switching");

  root.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);

  window.setTimeout(() => {
    updateThemeButton();
    themeToggle.classList.remove("is-switching");
  }, 420);
});

/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle?.addEventListener("click", () => {
  if (!nav) return;

  const open = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

/* =========================================================
   NAVIGATION OBSERVER
========================================================= */

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach(section => navObserver.observe(section));
}

/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach(element => revealObserver.observe(element));
} else {
  revealItems.forEach(element => element.classList.add("visible"));
}

/* =========================================================
   MODAL SYSTEM
========================================================= */

function openModal(modal) {
  if (!modal) return;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  if (!document.querySelector(".modal.open")) {
    document.body.classList.remove("modal-open");
  }
}

document.querySelectorAll(".modal-close, .modal-backdrop").forEach(el => {
  el.addEventListener("click", () => {
    closeModal(el.closest(".modal"));
  });
});

document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;

  document.querySelectorAll(".modal.open").forEach(closeModal);
});

const hireMeButton = document.getElementById("hireMeButton");
const hireModal = document.getElementById("hireModal");
hireMeButton?.addEventListener("click", () => openModal(hireModal));

document.querySelectorAll(".social").forEach(icon => {
  icon.addEventListener("click", () => {
    icon.classList.remove("is-looping");
    void icon.offsetWidth;
    icon.classList.add("is-looping");
  });
});

/* =========================================================
   PRESS / TAP ANIMATION
========================================================= */

const pressSelector =
  ".btn, .text-button, .card-link, .filter, .skill-action, " +
  ".certificate-action, .social, .tool-action, .back-top, .nav-link, .theme-toggle";

document.addEventListener("pointerdown", event => {
  const target = event.target.closest(pressSelector);
  if (target) target.classList.add("pressed");
});

document.addEventListener("pointerup", event => {
  const target = event.target.closest(pressSelector);
  if (!target) return;

  setTimeout(() => target.classList.remove("pressed"), 120);
});

document.addEventListener("pointercancel", event => {
  const target = event.target.closest(pressSelector);
  if (target) target.classList.remove("pressed");
});

/* =========================================================
   SERVICE FILTERS
========================================================= */

const filters = document.querySelectorAll(".filter");
const serviceCards = document.querySelectorAll(".service-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    filter.classList.add("active");

    const selected = filter.dataset.filter;

    serviceCards.forEach(card => {
      const hidden =
        selected !== "all" &&
        card.dataset.category !== selected;

      card.classList.toggle("is-hidden", hidden);
    });
  });
});

/* =========================================================
   TOOL LINKS
   Official links open in a new tab.
========================================================= */

const toolLinks = {
  "Photoshop": "https://www.adobe.com/products/photoshop.html",
  "Illustrator": "https://www.adobe.com/products/illustrator.html",
  "Canva": "https://www.canva.com/",
  "Premiere Pro": "https://www.adobe.com/products/premiere.html",
  "Meta Ads": "https://www.facebook.com/business/ads",
  "Google Tools": "https://ads.google.com/"
};

document.querySelectorAll(".tool-action").forEach(button => {
  button.setAttribute("title", "Open official website");

  button.addEventListener("click", () => {
    const name = button.dataset.tool;
    const url = toolLinks[name];

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  });

  button.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    button.click();
  });
});

/* =========================================================
   FILE VIEWER
========================================================= */

const fileViewerModal = document.getElementById("fileViewerModal");
const fileViewerTitle = document.getElementById("fileViewerTitle");
const fileViewerBody = document.getElementById("fileViewerBody");
const fileOpenExternal = document.getElementById("fileOpenExternal");

function showFilePlaceholder(title, path, kind = "FILE") {
  if (!fileViewerBody) return;

  fileViewerBody.innerHTML = `
    <div class="file-placeholder">
      <span class="mini-icon">${kind === "CERTIFICATE" ? "▣" : "FILE"}</span>
      <strong>${escapeHtml(title)}</strong>
      <small>
        Placeholder is ready. Add your real file at:
        <br><b>${escapeHtml(path)}</b>
      </small>
    </div>
  `;

  if (fileOpenExternal) {
    fileOpenExternal.href = path;
    fileOpenExternal.style.display = "inline-flex";
    fileOpenExternal.textContent = "Open original ↗";
  }
}

function openFileViewer(url, fileName = "Portfolio file", kind = "FILE") {
  if (!fileViewerModal || !fileViewerBody) return;

  if (fileViewerTitle) {
    fileViewerTitle.textContent = fileName;
  }

  fileViewerBody.innerHTML = "";

  if (!url) {
    showFilePlaceholder(fileName, "Add your file path here", kind);
    openModal(fileViewerModal);
    return;
  }

  if (fileOpenExternal) {
    fileOpenExternal.href = url;
    fileOpenExternal.style.display = "inline-flex";
  }

  const lower = url.toLowerCase();

  if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(lower)) {
    const image = document.createElement("img");

    image.className = "file-preview-image";
    image.src = url;
    image.alt = fileName;

    image.onerror = () => {
      showFilePlaceholder(fileName, url, kind);
    };

    fileViewerBody.appendChild(image);
  } else if (/\.pdf$/i.test(lower)) {
    const frame = document.createElement("iframe");

    frame.className = "file-preview-frame";
    frame.src = url;
    frame.title = fileName;

    frame.onerror = () => {
      showFilePlaceholder(fileName, url, kind);
    };

    fileViewerBody.appendChild(frame);
  } else {
    fileViewerBody.innerHTML = `
      <div class="file-placeholder">
        <strong>${escapeHtml(fileName)}</strong>
        <small>Use the Open original button to view this document.</small>
      </div>
    `;
  }

  openModal(fileViewerModal);
}

/* =========================================================
   SERVICE DETAILS
   These are local placeholders. Replace/add real work files
   in the HTML service-media blocks when ready.
========================================================= */

const serviceDescriptions = {
  "YouTube Thumbnails":
    "Eye-catching thumbnail designs for YouTube videos and channels.",
  "Logo Design":
    "Professional logo concepts and brand identity work.",
  "Passport Size Photo Editing":
    "Clean, professional and high-quality photo editing.",
  "YouTube Automation":
    "Channel workflow, production support and repeatable content systems.",
  "Social Media Designs":
    "Posts, banners and creative assets for social platforms.",
  "SEO Optimization":
    "On-page SEO, keyword research and search visibility support."
};

document.querySelectorAll(".service-card").forEach(card => {
  const button = card.querySelector(".card-link");

  button?.addEventListener("click", event => {
    event.preventDefault();

    const title =
      card.querySelector("h3")?.textContent?.trim() || "Service";

    const modal = document.getElementById("serviceModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");
    const resources = document.getElementById("modalResources");

    if (!modal) return;

    if (modalTitle) modalTitle.textContent = title;

    if (modalText) {
      modalText.textContent =
        serviceDescriptions[title] ||
        "Portfolio work and information for this service.";
    }

    if (resources) {
      resources.innerHTML = `
        <div class="file-placeholder">
          <strong>ADD YOUR WORK HERE</strong>
          <small>
            Add your project image, PDF or portfolio link in this service's
            HTML block. The card layout will keep the media area at the same size.
          </small>
        </div>
      `;
    }

    openModal(modal);
  });
});

/* =========================================================
   SKILL CARDS
========================================================= */

document.querySelectorAll(".skill-action").forEach(card => {
  card.addEventListener("click", () => {
    const title =
      card.querySelector("h3")?.textContent?.trim() || "Skill";

    const modal = document.getElementById("serviceModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");
    const resources = document.getElementById("modalResources");

    if (!modal) return;

    if (modalTitle) modalTitle.textContent = title;

    if (modalText) {
      modalText.textContent =
        card.dataset.skillDescription ||
        "Portfolio samples and links for this skill.";
    }

    if (resources) {
      resources.innerHTML = `
        <div class="file-placeholder">
          <strong>ADD PORTFOLIO LINK / SAMPLE</strong>
          <small>
            Add your real portfolio URL or local sample file here later.
          </small>
        </div>
      `;
    }

    openModal(modal);
  });

  card.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    card.click();
  });
});

/* =========================================================
   CERTIFICATES
   Click a certificate → real file if present, otherwise a
   clean placeholder explaining exactly where to add it.
========================================================= */

const certificateCards = document.querySelectorAll(".certificate-action");

certificateCards.forEach(card => {
  card.addEventListener("click", () => {
    const title =
      card.dataset.certificate ||
      card.querySelector("b")?.textContent?.trim() ||
      "Certificate";

    const file =
      card.dataset.file ||
      "";

    openFileViewer(file, title, "CERTIFICATE");
  });

  card.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    card.click();
  });
});

const viewCertificates = document.getElementById("viewCertificates");

viewCertificates?.addEventListener("click", () => {
  const modal = document.getElementById("certificateModal");
  const gallery = document.getElementById("certificateGallery");

  if (!modal || !gallery) return;

  gallery.innerHTML = "";

  certificateCards.forEach(card => {
    const title =
      card.dataset.certificate ||
      card.querySelector("b")?.textContent?.trim() ||
      "Certificate";

    const file = card.dataset.file || "";

    const item = document.createElement("button");
    item.type = "button";
    item.className = "certificate-placeholder";
    item.innerHTML = `
      <span>CERTIFICATE</span>
      <small>${escapeHtml(title)}</small>
      <small>Tap to open</small>
    `;

    item.addEventListener("click", () => {
      closeModal(modal);
      openFileViewer(file, title, "CERTIFICATE");
    });

    gallery.appendChild(item);
  });

  openModal(modal);
});

/* =========================================================
   CV
========================================================= */

const downloadCV = document.getElementById("downloadCV");

downloadCV?.addEventListener("click", () => {
  const cvPath = "assets/documents/Syed-Mohib-Abbas-CV.pdf";

  const link = document.createElement("a");
  link.href = cvPath;
  link.download = "Syed-Mohib-Abbas-CV.pdf";
  link.target = "_blank";
  link.rel = "noopener";

  document.body.appendChild(link);
  link.click();
  link.remove();
});

/* =========================================================
   LEARN MORE
========================================================= */

const learnMore = document.getElementById("learnMore");

learnMore?.addEventListener("click", () => {
  const modal = document.getElementById("serviceModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const resources = document.getElementById("modalResources");

  if (!modal) return;

  if (modalTitle) modalTitle.textContent = "About Me";

  if (modalText) {
    modalText.textContent =
      "Graphic design, digital marketing and SEO work focused on practical, clean and useful results.";
  }

  if (resources) {
    resources.innerHTML = `
      <div class="file-placeholder">
        <strong>PORTFOLIO PROFILE</strong>
        <small>
          Replace this section with any additional profile document,
          introduction PDF or portfolio link you want to show.
        </small>
      </div>
    `;
  }

  openModal(modal);
});

/* =========================================================
   BACK TO TOP
========================================================= */

const backTop = document.querySelector(".back-top");

window.addEventListener(
  "scroll",
  () => {
    if (!backTop) return;

    backTop.classList.toggle("show", window.scrollY > 500);
  },
  { passive: true }
);

backTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* =========================================================
   HELPER
========================================================= */

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   SERVICE IMAGE AUTO-LOADER
   If you create the path stored in data-image-slot, the
   image is loaded automatically. Otherwise the placeholder
   remains visible.
========================================================= */

document.querySelectorAll(".service-media[data-image-slot]").forEach(media => {
  const path = media.dataset.imageSlot;

  if (!path) return;

  const image = new Image();

  image.className = "service-image";
  image.alt = "Portfolio work";
  image.src = path;

  image.onload = () => {
    media.innerHTML = "";
    media.appendChild(image);
  };

  image.onerror = () => {
    /* Keep the HTML placeholder visible. */
  };
});

/* =========================================================
   READY
========================================================= */

document.body.classList.add("js-ready");
console.log("Portfolio initialized — static GitHub Pages mode.");


/* =========================================================
   FINAL CURSOR TRAIL + HERO LETTER INTERACTION
   Added without replacing existing portfolio functionality.
========================================================= */
(() => {
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  /* -------------------------------------------------------
     TAP / CLICK RIPPLE
  ------------------------------------------------------- */
  function createInteractionRipple(x, y, isTouch) {
    const ripple = document.createElement("span");
    ripple.className = isTouch ? "touch-ripple" : "cursor-click";
    if (!isTouch) ripple.classList.add("show");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);

    window.setTimeout(() => ripple.remove(), isTouch ? 600 : 520);
  }

  if (finePointer) {
    document.addEventListener("pointerdown", event => {
      if (event.pointerType !== "mouse") return;
      createInteractionRipple(event.clientX, event.clientY, false);
    }, { passive: true });
  }

  if (coarsePointer) {
    document.addEventListener("pointerdown", event => {
      if (event.pointerType !== "touch") return;
      createInteractionRipple(event.clientX, event.clientY, true);
    }, { passive: true });
  }

  /* -------------------------------------------------------
     DESKTOP CURSOR CIRCLE TRAIL
  ------------------------------------------------------- */
  if (finePointer) {
    const canvas = document.createElement("canvas");
    canvas.className = "cursor-effect-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (ctx) {
      const particles = [];
      const MAX_PARTICLES = 140;
      const SPAWN_DISTANCE = 7;
      const PARTICLE_LIFE = 520;

      let width = window.innerWidth;
      let height = window.innerHeight;
      let lastX = null;
      let lastY = null;
      let lastSpawnX = null;
      let lastSpawnY = null;
      let animationId = null;

      function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      function distance(x1, y1, x2, y2) {
        return Math.hypot(x2 - x1, y2 - y1);
      }

      function addCircle(x, y) {
        if (particles.length >= MAX_PARTICLES) particles.shift();

        particles.push({
          x,
          y,
          radius: 3 + Math.random() * 5,
          maxRadius: 18 + Math.random() * 22,
          alpha: 0.72,
          born: performance.now(),
          life: PARTICLE_LIFE + Math.random() * 180
        });

        startAnimation();
      }

      function handlePointerMove(event) {
        const x = event.clientX;
        const y = event.clientY;

        if (lastX === null) {
          lastX = x;
          lastY = y;
          lastSpawnX = x;
          lastSpawnY = y;
          addCircle(x, y);
          return;
        }

        const d = distance(lastX, lastY, x, y);
        if (d < SPAWN_DISTANCE) return;

        const steps = Math.min(Math.ceil(d / SPAWN_DISTANCE), 5);

        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          const px = lastX + (x - lastX) * t;
          const py = lastY + (y - lastY) * t;

          if (
            lastSpawnX === null ||
            distance(lastSpawnX, lastSpawnY, px, py) >= SPAWN_DISTANCE
          ) {
            addCircle(px, py);
            lastSpawnX = px;
            lastSpawnY = py;
          }
        }

        lastX = x;
        lastY = y;
      }

      function handlePointerDown(event) {
        if (event.pointerType !== "mouse") return;
        lastX = event.clientX;
        lastY = event.clientY;
        lastSpawnX = event.clientX;
        lastSpawnY = event.clientY;
        addCircle(event.clientX, event.clientY);
      }

      function render(now) {
        ctx.clearRect(0, 0, width, height);
        let alive = 0;

        for (let i = 0; i < particles.length; i++) {
          const particle = particles[i];
          const progress = (now - particle.born) / particle.life;

          if (progress >= 1) continue;

          particles[alive++] = particle;

          const eased = 1 - Math.pow(1 - progress, 2);
          const radius = particle.radius +
            (particle.maxRadius - particle.radius) * eased;
          const alpha = (1 - progress) * particle.alpha;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.stroke();
        }

        particles.length = alive;
        animationId = particles.length
          ? requestAnimationFrame(render)
          : null;
      }

      function startAnimation() {
        if (animationId === null) {
          animationId = requestAnimationFrame(render);
        }
      }

      window.addEventListener("resize", resizeCanvas, { passive: true });
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerdown", handlePointerDown, { passive: true });
      resizeCanvas();
    }
  }

  /* -------------------------------------------------------
     HERO LETTER EFFECT
  ------------------------------------------------------- */
  if (finePointer) {
    const heroLetters = [...document.querySelectorAll(".hero-name .hero-letter")];
    if (!heroLetters.length) return;

    const colors = [
      "#FF5C8A",
      "#FF7A59",
      "#FFD166",
      "#06D6A0",
      "#00C2FF",
      "#4D96FF",
      "#8A7CFF",
      "#C77DFF",
      "#FF4DDE",
      "#00E5FF"
    ];

    let activeLetter = null;
    let fadeTimer = null;

    function randomColor(previous) {
      if (colors.length === 1) return colors[0];

      let next = previous || "";
      while (next === previous) {
        next = colors[Math.floor(Math.random() * colors.length)];
      }
      return next;
    }

    function findLetterAt(x, y) {
      for (const letter of heroLetters) {
        const rect = letter.getBoundingClientRect();
        const padding = 3;

        if (
          x >= rect.left - padding &&
          x <= rect.right + padding &&
          y >= rect.top - padding &&
          y <= rect.bottom + padding
        ) {
          return letter;
        }
      }
      return null;
    }

    function activateLetter(letter) {
      if (!letter || letter === activeLetter) return;

      if (activeLetter) {
        activeLetter.classList.remove("is-letter-active");
        activeLetter.classList.add("is-letter-visited");
      }

      const previousColor = letter.dataset.letterColor || "";
      const color = randomColor(previousColor);

      letter.dataset.letterColor = color;
      letter.style.color = color;

      letter.classList.remove("is-letter-active");
      void letter.offsetWidth;
      letter.classList.add("is-letter-active");

      activeLetter = letter;

      window.clearTimeout(fadeTimer);
      fadeTimer = window.setTimeout(() => {
        heroLetters.forEach(item => {
          if (item !== activeLetter) {
            item.style.color = "";
            item.classList.remove("is-letter-visited");
          }
        });
      }, 900);
    }

    document.addEventListener("pointermove", event => {
      const letter = findLetterAt(event.clientX, event.clientY);
      if (letter) activateLetter(letter);
    }, { passive: true });

    const heroName = document.querySelector(".hero-name");
    heroName?.addEventListener("pointerleave", () => {
      if (activeLetter) activeLetter.classList.remove("is-letter-active");
      activeLetter = null;
    });
  }
})();
