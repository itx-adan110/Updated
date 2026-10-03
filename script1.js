document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const body = document.body;

  /* =========================================================
     THEME
     Light is the default. A saved choice is respected.
     ========================================================= */
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");
  const logoSwitches = document.querySelectorAll(".logo-switch");

  const applyTheme = (theme, save = false) => {
    root.dataset.theme = theme;
    if (save) localStorage.setItem("portfolio-theme", theme);

    const light = theme === "light";
    if (themeIcon) themeIcon.textContent = light ? "☾" : "☼";
    themeToggle?.setAttribute("aria-pressed", String(light));
    themeToggle?.setAttribute(
      "aria-label",
      light ? "Switch to dark theme" : "Switch to light theme"
    );

    logoSwitches.forEach((logo) => {
      logo.classList.remove("is-changing");
      void logo.offsetWidth;
      logo.classList.add("is-changing");
      setTimeout(() => logo.classList.remove("is-changing"), 420);
    });
  };

  const savedTheme = localStorage.getItem("portfolio-theme");
  applyTheme(savedTheme === "dark" ? "dark" : "light");

  themeToggle?.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "light" ? "dark" : "light", true);
  });

  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  const closeMenu = () => {
    nav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open menu");
  };

  menuToggle?.addEventListener("click", () => {
    const open = !nav?.classList.contains("open");
    nav?.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav?.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* =========================================================
     SMOOTH NAV + ACTIVE SECTION
     ========================================================= */
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sections = [...document.querySelectorAll("main section[id]")];

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      const target = id && document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });

  const setActiveNav = () => {
    const marker = window.scrollY + window.innerHeight * 0.35;
    let current = "home";

    sections.forEach((section) => {
      if (marker >= section.offsetTop) current = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  /* =========================================================
     REVEAL + SCROLL PROGRESS
     ========================================================= */
  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const progress = document.querySelector(".scroll-progress");
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* =========================================================
     MODALS
     ========================================================= */
  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    if (!document.querySelector(".modal.open")) body.classList.remove("modal-open");
  };

  document.querySelectorAll(".modal-close, .modal-backdrop").forEach((button) => {
    button.addEventListener("click", () => closeModal(button.closest(".modal")));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const open = document.querySelector(".modal.open");
    if (open) closeModal(open);
    else closeMenu();
  });

  /* Hire Me */
  document.querySelector("#hireMeButton")?.addEventListener("click", () => {
    openModal(document.querySelector("#hireModal"));
  });

  /* Learn More */
  document.querySelector("#learnMore")?.addEventListener("click", () => {
    const skills = document.querySelector("#skills");
    skills?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* =========================================================
     SERVICES FILTER
     ========================================================= */
  const filters = document.querySelectorAll(".filter");
  const serviceCards = document.querySelectorAll(".service-card");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.dataset.filter || "all";

      filters.forEach((item) => item.classList.toggle("active", item === filter));

      serviceCards.forEach((card) => {
        const show = category === "all" || card.dataset.category === category;
        card.classList.toggle("is-hidden", !show);
        card.setAttribute("aria-hidden", String(!show));
      });
    });
  });

  /* =========================================================
     SERVICE + SKILL DETAILS
     ========================================================= */
  const serviceModal = document.querySelector("#serviceModal");
  const modalKicker = document.querySelector("#modalKicker");
  const modalTitle = document.querySelector("#modalTitle");
  const modalText = document.querySelector("#modalText");
  const modalSubsections = document.querySelector("#modalSubsections");
  const modalResources = document.querySelector("#modalResources");

  const showDetails = ({ title, kicker = "SERVICE", text, file = "", link = "" }) => {
    if (modalKicker) modalKicker.textContent = kicker;
    if (modalTitle) modalTitle.textContent = title;
    if (modalText) modalText.textContent = text || "Explore the available work, links and files.";

    if (modalSubsections) {
      modalSubsections.innerHTML = "";
      const note = document.createElement("p");
      note.textContent = file
        ? `Portfolio file: ${file}`
        : "You can add a portfolio link or local sample file to this item later.";
      modalSubsections.appendChild(note);
    }

    if (modalResources) {
      modalResources.innerHTML = "";

      if (link) {
        const a = document.createElement("a");
        a.className = "btn btn-primary";
        a.href = link;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = "Open link ↗";
        modalResources.appendChild(a);
      }

      if (file) {
        const a = document.createElement("button");
        a.className = "btn btn-ghost";
        a.type = "button";
        a.textContent = "Preview file";
        a.addEventListener("click", () => openFile(file, title));
        modalResources.appendChild(a);
      }
    }

    openModal(serviceModal);
  };

  document.querySelectorAll(".card-link").forEach((button) => {
    button.addEventListener("click", () => {
      showDetails({
        title: button.dataset.service || "Service",
        kicker: "SERVICE",
        text: button.closest(".service-card")?.querySelector(":scope > p:not(.card-label)")?.textContent
          || "Explore the available work, links and files."
      });
    });
  });

  document.querySelectorAll(".skill-action").forEach((card) => {
    const activate = () => {
      showDetails({
        title: card.dataset.skill || "Skill",
        kicker: "SKILL",
        text: card.dataset.skillDescription || "",
        file: card.dataset.skillFile || "",
        link: card.dataset.skillLink || ""
      });
    };

    card.addEventListener("click", activate);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });

  document.querySelectorAll(".tool-action").forEach((tool) => {
    tool.addEventListener("click", () => {
      showDetails({
        title: tool.dataset.tool || "Tool",
        kicker: "TOOL",
        text: `Use of ${tool.dataset.tool || "this tool"} can be linked to a portfolio sample or resource later.`
      });
    });
  });

  /* =========================================================
     CERTIFICATES
     ========================================================= */
  const certificateModal = document.querySelector("#certificateModal");
  const certificateGallery = document.querySelector("#certificateGallery");

  const openCertificate = (card) => {
    const title = card.dataset.certificate || "Certificate";
    const info = card.dataset.certificateInfo || "";
    const file = card.dataset.file || "";

    if (!certificateGallery) return;

    certificateGallery.innerHTML = "";

    const item = document.createElement("button");
    item.className = "certificate-placeholder";
    item.type = "button";
    item.innerHTML = `
      <span>OPEN</span>
      <small>${title}${info ? ` — ${info}` : ""}</small>
    `;
    item.addEventListener("click", () => openFile(file, title));

    certificateGallery.appendChild(item);
    openModal(certificateModal);
  };

  document.querySelectorAll(".certificate-action").forEach((card) => {
    card.addEventListener("click", () => openCertificate(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCertificate(card);
      }
    });
  });

  document.querySelector("#viewCertificates")?.addEventListener("click", () => {
    const cards = [...document.querySelectorAll(".certificate-action")];
    if (!certificateGallery) return;

    certificateGallery.innerHTML = "";
    cards.forEach((card) => {
      const item = document.createElement("button");
      item.className = "certificate-placeholder";
      item.type = "button";
      item.innerHTML = `
        <span>OPEN</span>
        <small>${card.dataset.certificate || "Certificate"}</small>
      `;
      item.addEventListener("click", () => openFile(card.dataset.file || "", card.dataset.certificate || "Certificate"));
      certificateGallery.appendChild(item);
    });

    openModal(certificateModal);
  });

  /* =========================================================
     FILE PREVIEW / LOCAL FILE INPUT
     ========================================================= */
  const fileModal = document.querySelector("#fileViewerModal");
  const fileBody = document.querySelector("#fileViewerBody");
  const fileTitle = document.querySelector("#fileViewerTitle");
  const fileOpenExternal = document.querySelector("#fileOpenExternal");
  const hiddenFileInput = document.querySelector("#hiddenFileInput");

  const openFile = (file, title = "Preview") => {
    if (!file) {
      fileBody.innerHTML = `<div class="file-preview-generic"><span>FILE</span><strong>No file path added yet.</strong><small>Add the exact filename in the HTML when the asset is ready.</small></div>`;
      fileOpenExternal?.removeAttribute("href");
      if (fileTitle) fileTitle.textContent = title;
      openModal(fileModal);
      return;
    }

    const src = `./${file}`;
    if (fileTitle) fileTitle.textContent = title;
    if (fileOpenExternal) fileOpenExternal.href = src;

    const ext = file.split(".").pop()?.toLowerCase();
    fileBody.innerHTML = "";

    if (["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(ext)) {
      const img = document.createElement("img");
      img.className = "file-preview-image";
      img.src = src;
      img.alt = title;
      img.addEventListener("error", () => {
        fileBody.innerHTML = `<div class="file-preview-generic"><span>FILE</span><strong>Preview file not found.</strong><small>Check that “${file}” is uploaded beside index.html.</small></div>`;
      });
      fileBody.appendChild(img);
    } else if (ext === "pdf") {
      const frame = document.createElement("iframe");
      frame.className = "file-preview-frame";
      frame.src = src;
      frame.title = title;
      fileBody.appendChild(frame);
    } else {
      fileBody.innerHTML = `<div class="file-preview-generic"><span>FILE</span><strong>${file}</strong><small>This file type can be opened from the button below.</small></div>`;
    }

    openModal(fileModal);
  };

  document.querySelector("#downloadCV")?.addEventListener("click", () => {
    hiddenFileInput?.click();
  });

  hiddenFileInput?.addEventListener("change", () => {
    const file = hiddenFileInput.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    if (fileTitle) fileTitle.textContent = file.name;
    if (fileOpenExternal) fileOpenExternal.href = url;

    fileBody.innerHTML = "";
    if (file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.className = "file-preview-image";
      img.src = url;
      img.alt = file.name;
      fileBody.appendChild(img);
    } else {
      fileBody.innerHTML = `<div class="file-preview-generic"><span>FILE</span><strong>${file.name}</strong><small>Selected locally.</small></div>`;
    }
    openModal(fileModal);
  });

  /* =========================================================
     BACK TO TOP
     ========================================================= */
  const backTop = document.querySelector(".back-top");
  const updateBackTop = () => backTop?.classList.toggle("show", window.scrollY > 500);

  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", updateBackTop, { passive: true });
  updateBackTop();

  /* =========================================================
     SOCIAL CLICK FEEDBACK
     ========================================================= */
  document.querySelectorAll(".social").forEach((social) => {
    social.addEventListener("click", () => {
      social.classList.remove("social-pulse");
      void social.offsetWidth;
      social.classList.add("social-pulse");
    });
  });

  /* =========================================================
     DESKTOP CURSOR TRAIL + MOBILE TOUCH RIPPLE
     ========================================================= */
  if (window.matchMedia("(pointer: fine)").matches) {
    const trail = document.createElement("div");
    const click = document.createElement("div");
    trail.className = "cursor-trail";
    click.className = "cursor-click";
    body.append(trail, click);

    let x = -100, y = -100, tx = -100, ty = -100;

    const frame = () => {
      x += (tx - x) * 0.24;
      y += (ty - y) * 0.24;
      const angle = Math.atan2(ty - y, tx - x) * 180 / Math.PI + 90;
      trail.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`;
      requestAnimationFrame(frame);
    };

    window.addEventListener("pointermove", (event) => {
      tx = event.clientX;
      ty = event.clientY;
      trail.style.opacity = ".72";
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

    frame();
  }

  window.addEventListener("pointerdown", (event) => {
    if (!window.matchMedia("(pointer: coarse)").matches) return;
    const ripple = document.createElement("span");
    ripple.className = "touch-ripple";
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;
    body.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
  }, { passive: true });
});
