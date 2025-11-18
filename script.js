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
    ".Navbtn",
    {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    },
    "-=0.3"
  );
  tl.from(
    ".Home p, .Home h1, .Home img, .Home .flex.flex-wrap",
    {
      y: 20,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: "power3.out",
    },
    "-=0.1"
  );
}
page1();

// PAGE 2 SCROLL ANIMATION
function page2() {
  let t1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page2",
      scroller: "body",
      start: "top 70%",
      end: "top 10%",
    },
  });
  t1.from(".page2-content h2", {
    y: 40,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
  });
  t1.from(
    ".page2-images img",
    {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
    },
    "-=0.3"
  );
}
page2();

// SERVICES TAGLINE
function page3() {
  let t2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page3",
      scroller: "body",
      start: "top 80%",
      end: "top 30%",
    },
  });

  t2.from(".page3-info-content", {
    y: 30,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  });
}
page3();

// PROJECTS
function page4() {
  let t3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page4",
      scroller: "body",
      start: "top 75%",
      end: "top 10%",
    },
  });

  t3.from(".page4 h2, .page4 > div > div > p", {
    y: 20,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  });

  t3.from(
    ".project-card",
    {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
    },
    "-=0.2"
  );
}
page4();

// MORE PROJECTS
function page5() {
  let t4 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page5",
      scroller: "body",
      start: "top 80%",
      end: "top 30%",
    },
  });
  t4.from(".page5 h5", {
    y: 20,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  });
  t4.from(".page5 h3 a", {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out",
  });
}
page5();

// ABOUT
function page6() {
  let t5 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page6",
      scroller: "body",
      start: "top 80%",
      end: "top 30%",
    },
  });
  t5.from(".page6 h3", {
    y: 20,
    opacity: 0,
    duration: 0.4,
    stagger: 0.15,
    ease: "power2.out",
  });
  t5.from(
    ".page6-content",
    {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",
    },
    "-=0.2"
  );
}
page6();

// FOOTER
function footer() {
  let t6 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page7",
      scroller: "body",
      start: "top 85%",
      end: "top 20%",
    },
  });
  t6.from(".page7 h1, .page7 p, .page7 button, .page7 h4, .page7 hr", {
    y: 30,
    opacity: 0,
    duration: 0.5,
    stagger: 0.15,
    ease: "power2.out",
  });
}
footer();

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
});
