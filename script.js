const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    menu.style.transition = "all 1s ease-in";
  });

let tl = gsap.timeline();
tl.from(".logo",{
    x:-0,
    y:-50,
    opacity:0,
    duration:1,
    
})
tl.from("ul li",{
    y:-60,
    opacity:0,
    duration:1,
    stagger:0.2,
})

tl.from(".Navbtn",{
    y:70,
    opacity:0,
    duration:1,

})
