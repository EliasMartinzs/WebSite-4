"use strict";

const header = document.querySelector("header");

const links = document.querySelectorAll(".nav-link");

const toggle_btn = document.querySelector(".toggle-btn");

const hamburger = document.querySelector(".hamburger");

/* --------------- Sticky Navbar --------------- */

function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickyNavbar();

window.addEventListener("scroll", () => {
  stickyNavbar();
  activeLink();
});

/* --------------- Scroll Reveal --------------- */

ScrollReveal().reveal(".showcase-info", {
  delay: 600,
  duration: 2500,
  distance: "60px",
});
ScrollReveal().reveal(".showcase-image", {
  origin: "top",
  delay: 700,
  duration: 2500,
  distance: "60px",
});

/* --------------- Portfolio Filter Animation  --------------- */

let mixer = mixitup(".portfolio-gallery", {
  selectors: {
    target: ".prt-card",
  },
  animation: {
    duration: 500,
  },
});

/* --------------- Change Active NavBar Animation  --------------- */

function activeLink() {
  let sections = document.querySelectorAll("section[id]");
  let passedSections = Array.from(sections)
    .map((sct, i) => {
      return {
        y: sct.getBoundingClientRect().top - header.offsetHeight,
        id: i,
      };
    })
    .filter((sct) => sct.y <= 0);

  let currSectionId = passedSections.at(-1).id;
  console.log(currSectionId);

  links.forEach((l) => l.classList.remove("active"));
  links[currSectionId].classList.add("active");
}

activeLink();

/* --------------- Change Page Theme  --------------- */

let firstTheme = localStorage.getItem("dark");

change_theme(+firstTheme);

function change_theme(isDark) {
  if (isDark) {
    document.body.classList.add("dark");
    toggle_btn.classList.replace("uil-moon", "uil-sun");
    localStorage.setItem("dark", 1);
  } else {
    document.body.classList.remove("dark");
    toggle_btn.classList.replace("uil-sun", "uil-moon");
    localStorage.setItem("dark", 0);
  }
}

toggle_btn.addEventListener("click", () => {
  change_theme(!document.body.classList.contains("dark"));
});

/* --------------- Open & Close Navbar Menu --------------- */

hamburger.addEventListener("click", () => {
  document.body.classList.toggle("open");
  document.body.classList.toggle("stopScrolling");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("open");
    document.body.classList.remove("stopScrolling");
  });
});
