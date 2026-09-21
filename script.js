gsap.registerPlugin(ScrollTrigger);

/* ============== PRELOADER + SMOOTH SCROLL BOOT ============== */
let lenis;

function initSmoothScroll() {
  if (typeof Lenis === "undefined") return;

  lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

function preloader() {
  const pre = document.getElementById("preloader");
  const bar = document.getElementById("loader-bar-fill");
  if (!pre) return;

  const tl = gsap.timeline({
    onComplete: () => {
      pre.style.display = "none";
      document.body.style.overflow = "";
      page1();
      initSmoothScroll();
    },
  });

  document.body.style.overflow = "hidden";

  tl.to(bar, { width: "100%", duration: 1.1, ease: "power2.inOut" });
  tl.to(
    pre.querySelector(".loader-word"),
    { y: -30, opacity: 0, duration: 0.4, ease: "power2.in" },
    "-=0.15"
  );
  tl.to(
    pre,
    { yPercent: -100, duration: 0.7, ease: "power4.inOut" },
    "-=0.1"
  );
}

/* ============== CUSTOM CURSOR ============== */
function customCursor() {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring || window.matchMedia("(pointer: coarse)").matches) return;

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ringPos = { ...pos };

  window.addEventListener("mousemove", (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
    dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%,-50%)`;
  });

  gsap.ticker.add(() => {
    ringPos.x += (pos.x - ringPos.x) * 0.18;
    ringPos.y += (pos.y - ringPos.y) * 0.18;
    ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%,-50%)`;
  });

  const hoverTargets = document.querySelectorAll(
    "a, button, .project-card, .filter-pill"
  );
  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("is-active"));
    el.addEventListener("mouseleave", () => ring.classList.remove("is-active"));
  });
}

/* ============== MAGNETIC BUTTONS ============== */
function magneticButtons() {
  const items = document.querySelectorAll("[data-magnetic]");
  if (window.matchMedia("(pointer: coarse)").matches) return;

  items.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: relX * 0.35,
        y: relY * 0.35,
        duration: 0.4,
        ease: "power3.out",
      });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    });
  });
}

/* ============== SPOTLIGHT CARD GLOW ============== */
function spotlightCards() {
  const cards = document.querySelectorAll(".spotlight-card, .client-tile");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
  });
}

/* ============== ANIMATED COUNTERS ============== */
function statCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const state = { val: 0 };
    gsap.to(state, {
      val: target,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = Math.round(state.val);
      },
    });
  };

  if (typeof IntersectionObserver === "undefined") {
    counters.forEach(animateCounter);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach((el) => io.observe(el));
}

/* ============== PROJECT FILTER PILLS ============== */
function projectFilters() {
  const pills = document.querySelectorAll(".filter-pill");
  const groups = document.querySelectorAll(".filter-group");
  if (!pills.length || !groups.length) return;

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const filter = pill.getAttribute("data-filter");

      pills.forEach((p) => p.removeAttribute("data-active"));
      pill.setAttribute("data-active", "true");

      groups.forEach((group) => {
        const match = filter === "all" || group.getAttribute("data-category") === filter;
        if (match) {
          group.classList.remove("is-hidden");
          gsap.fromTo(
            group,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
          );
        } else {
          group.classList.add("is-hidden");
        }
      });

      ScrollTrigger.refresh();
    });
  });
}

/* ============== BACK TO TOP ============== */
function backToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  ScrollTrigger.create({
    start: "top -600",
    end: 99999,
    onUpdate: (self) => {
      btn.classList.toggle("hide", self.scroll() < 600);
    },
  });

  btn.addEventListener("click", () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

/* ============== FLOATING BLOBS PARALLAX ============== */
function blobParallax() {
  const blobs = [
    document.getElementById("blob-1"),
    document.getElementById("blob-2"),
    document.getElementById("blob-3"),
  ].filter(Boolean);
  if (!blobs.length || window.matchMedia("(pointer: coarse)").matches) return;

  window.addEventListener("mousemove", (e) => {
    const xRatio = e.clientX / window.innerWidth - 0.5;
    const yRatio = e.clientY / window.innerHeight - 0.5;

    blobs.forEach((blob, i) => {
      const strength = (i + 1) * 18;
      gsap.to(blob, {
        x: xRatio * strength,
        y: yRatio * strength,
        duration: 1.2,
        ease: "power2.out",
      });
    });
  });
}

// NAV + HERO ANIMATIONS
function page1() {
  const toggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  toggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");

    gsap.from(mobileMenu, {
      opacity: 0,
      y: -10,
      duration: 0.25,
      ease: "power2.out",
    });
  });

  let tl = gsap.timeline();
  tl.from(".logo", {
    y: -40,
    opacity: 0,
    duration: 0.5,
    ease: "power3.out",
  });
  tl.from(
    "nav ul li",
    {
      y: -20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out",
    },
    "-=0.2"
  );
  tl.from(
    "#desktop-menu button",
    {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    },
    "-=0.3"
  );
  tl.from(
    ".Home p, .Home .split-line > span, .Home img, .Home .flex.flex-wrap",
    {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
    },
    "-=0.1"
  );

  magneticButtons();
  customCursor();
  blobParallax();
}

/* ============== SCROLL REVEAL (IntersectionObserver) ==============
   Plain CSS-transition reveals driven by IntersectionObserver instead of
   GSAP ScrollTrigger. More predictable across layout shifts (webfonts,
   images, Tailwind's runtime CDN build) than a scroll-position-cached
   scroll-triggered tween, and fails open (content stays visible) if JS
   never runs, since [data-reveal] only gets its hidden starting state
   once this function actually attaches it. */
function scrollReveal() {
  const groups = [
    { selector: ".stat-card", stagger: 0.1 },
    { selector: ".process-step", stagger: 0.12 },
    { selector: ".filter-pill", stagger: 0.06 },
    { selector: ".page6-content", stagger: 0.15 },
  ];

  groups.forEach(({ selector, stagger }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.setProperty("--reveal-delay", `${i * stagger}s`);
    });
  });

  // stagger project cards per filter-group so switching filters still looks staggered
  document.querySelectorAll(".filter-group").forEach((group) => {
    group.querySelectorAll(".project-card").forEach((card, i) => {
      card.style.setProperty("--reveal-delay", `${i * 0.08}s`);
    });
  });

  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  if (typeof IntersectionObserver === "undefined") {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el) => io.observe(el));
}
scrollReveal();

statCounters();
projectFilters();
spotlightCards();

// HOVER PREVIEW FOR TEXT PROJECT LIST
function hoverContent() {
  let hoverDiv = document.querySelector(".hoverdiv");
  let elements = document.querySelectorAll("#project-elem");

  if (!hoverDiv || !elements.length) return;

  elements.forEach((el) => {
    const showPreview = () => {
      const img = el.getAttribute("data-image");
      if (!img) return;
      hoverDiv.style.display = "block";
      hoverDiv.style.backgroundImage = `url(${img})`;
    };
    const hidePreview = () => {
      hoverDiv.style.display = "none";
    };

    el.addEventListener("mouseenter", showPreview);
    el.addEventListener("mouseleave", hidePreview);
    el.addEventListener("touchstart", showPreview);
    el.addEventListener("touchend", hidePreview);
  });
}
hoverContent();

// STICKY USER EXPERIENCE TEXT
function stickytext() {
  gsap.to(".sticky-content h1", {
    x: "-80%",
    scrollTrigger: {
      trigger: ".sticky-content",
      scroller: "body",
      start: "top 0%",
      end: "top -80%",
      scrub: 2,
      pin: true,
    },
  });
}
stickytext();

// IMAGE POPUP FOLLOWING MOUSE
function imagepopup() {
  const popup = document.querySelector(".imagepopup");
  const items = document.querySelectorAll(".popup-items");

  if (!popup || !items.length) return;

  document.body.addEventListener("mousemove", (e) => {
    const offset = 24;
    popup.style.left = `${e.pageX + offset}px`;
    popup.style.top = `${e.pageY + offset}px`;
  });

  items.forEach((item) => {
    const showPopup = () => {
      const imagedata = item.getAttribute("data-image");
      if (!imagedata) return;
      popup.style.backgroundImage = `url(${imagedata})`;
      popup.style.display = "block";
    };
    const hidePopup = () => {
      popup.style.display = "none";
    };

    item.addEventListener("mouseenter", showPopup);
    item.addEventListener("mouseleave", hidePopup);
    item.addEventListener("touchstart", showPopup);
    item.addEventListener("touchmove", hidePopup);
  });
}
imagepopup();

// SCHEDULE CALL OVERLAY
document.addEventListener("DOMContentLoaded", function () {
  function schedulecall() {
    let schedulegmeet = document.querySelectorAll("#schedulegmeet");
    let scheduleCall = document.querySelector("#schedule-open");
    let scheduleClose = document.querySelector("#schedule-close");

    if (!scheduleCall) return;

    schedulegmeet.forEach((btn) => {
      btn.addEventListener("click", () => {
        scheduleCall.style.display = "flex";

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        document.body.style.overflow = "hidden";
      });
    });

    if (scheduleClose) {
      scheduleClose.addEventListener("click", () => {
        scheduleCall.style.display = "none";
        document.body.style.overflow = "auto";
      });
    }
  }
  schedulecall();

  backToTop();
  preloader();
});
