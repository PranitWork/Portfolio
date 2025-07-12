function page1() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  toggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    menu.style.transition = "all 1s ease-in";
  });

  let tl = gsap.timeline();
  tl.from(".logo", {
    x: -0,
    y: -50,
    opacity: 0,
    duration: 0.4,
  });
  tl.from("ul li", {
    y: -60,
    opacity: 0,
    duration: 0.5,
    stagger: 0.2,
  });

  tl.from(".Navbtn", {
    y: 10,
    opacity: 0,
    duration: 0.3,
  });
  tl.from(
    ".Home p",
    {
      y: 10,
      opacity: 0,
      duration: 0.5,
    },
    "-=1"
  );

  tl.from(".Home h1", {
    y: 10,
    opacity: 0,
    duration: 0.5,
  });

  tl.from(".Home img", {
    y: 10,
    opacity: 0,
    duration: 0.5,
  });
}
page1();

function page2() {
  let t1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page2",
      scroller: "body",

      start: "top 40%",
      end: "top -100%",
    },
  });
  t1.from(".page2-content h1", {
    x: -0,
    y: -50,
    opacity: 0,
    duration: 0.4,
  });
  t1.from(".page2-images", {
    x: -0,
    y: -50,
    opacity: 0,
    duration: 0.4,
  });
}
page2();

function page3() {
  let t2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page3",
      scroller: "body",

      start: "top 70%",
      end: "top -100%",
    },
  });

  t2.from(".page3", {
    x: 0,
    y: -50,
    opacity: 0,
    duration: 0.4,
  });
}
page3();

function page4() {
  let t3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page4",
      scroller: "body",
      start: "top 70%",
      end: "top -100%",
    },
  });
  t3.from(".page4-img1", {
    x: 0,
    y: -50,
    opacity: 0,
    duration: 0.4,
  });
  t3.from(".page4-img2 h3", {
    x: 0,
    y: -50,
    opacity: 0,
    duration: 0.4,
    stagger: 0.3,
  });
  t3.from(".page4-img2 img", {
    x: 0,
    y: -50,
    opacity: 0,
    duration: 0.4,
  });
  t3.from(".page4-img3", {
    x: 0,
    y: -50,
    opacity: 0,
    duration: 0.4,
  });
  t3.from(".page4-img4", {
    x: 0,
    y: -50,
    opacity: 0,
    duration: 0.4,
  });
  t3.from(".page4-img5", {
    x: 0,
    y: -50,
    opacity: 0,
    duration: 0.4,
  });
}
page4();

function page5() {
  let t4 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page5",
      scroller: "body",
      start: "top 70%",
      end: "top -100%",
    },
  });
  t4.from(".page5 h5", {
    x: 0,
    y: -50,
    opacity: 0,
    duration: 0.4,
  });
  t4.from(".page5 h3 a", {
    x: 0,
    y: -50,
    opacity: 0,
    duration: 0.4,
    stagger: 0.3,
  });
}
page5();

function page6() {
  let t5 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page6",
      scroller: "body",
      start: "top 70%",
      end: "top -100%",
    },
  });
  t5.from(".page6 h3", {
    x: 0,
    y: -50,
    opacity: 0,
    duration: 0.4,
    stagger: 0.3,
  });
  t5.from(".page6-content ,.page6-content p", {
    x: 0,
    y: -50,
    opacity: 0,
    duration: 0.4,
    stagger: 0.3,
  });
}
page6();

function footer() {
  let t6 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page7",
      scroller: "body",
      start: "top 70%",
      end: "top -100%",
    },
  });
  t6.from(".page7 h1,.page7 p,.page7 button a,.page7 h4, .page7 hr", {
    x: 0,
    y: -50,
    opacity: 0,
    duration: 0.4,
    stagger: 0.3,
  });
}
footer();

function hoverContent() {
  let hoverDiv = document.querySelector(".hoverdiv");
  let element = document.querySelectorAll("#project-elem");

  element.forEach((e) => {
    e.addEventListener("mouseenter", () => {
      let elementData = e.getAttribute("data-image");
      console.log(elementData);
      (hoverDiv.style.display = "block"),
        (hoverDiv.style.backgroundImage = `url(${elementData})`);
    });
    e.addEventListener("mouseleave", () => {
      let elementData = e.getAttribute("data-image");
      console.log(elementData);
      (hoverDiv.style.display = "none"),
        (hoverDiv.style.backgroundImage = `url(${elementData})`);
    });
    e.addEventListener("touchstart", () => {
      let elementData = e.getAttribute("data-image");
      console.log(elementData);
      (hoverDiv.style.display = "block"),
        (hoverDiv.style.backgroundImage = `url(${elementData})`);
    });
  });
}

hoverContent();

function stickytext() {
  gsap.to(".sticky-content h1", {
    x: "-100%",
    scrollTrigger: {
      trigger: ".sticky-content",
      scroller: "body",

      start: "top 0%",
      end: "top -100%",
      scrub: 2,
      pin: true,
    },
  });
}
stickytext();

function imagepopup() {
  const popup = document.querySelector(".imagepopup");
  const items = document.querySelectorAll(".popup-items");

  // Move popup with mouse
  document.body.addEventListener("mousemove", (e) => {
    popup.style.left = `${e.pageX + 20}px`; 
    popup.style.top = `${e.pageY + 20}px`;
  });

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const imagedata = item.getAttribute("data-image");
      popup.style.backgroundImage = `url(${imagedata})`;
      popup.style.display = "block";
    });

    item.addEventListener("mouseleave", () => {
      popup.style.display = "none";
    });
    item.addEventListener("touchstart", () => {
      const imagedata = item.getAttribute("data-image");
      popup.style.backgroundImage = `url(${imagedata})`;
      popup.style.display = "block";
    });

    item.addEventListener("touchmove", () => {
      popup.style.display = "none";
    });
  });
}

imagepopup();
