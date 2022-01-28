import { mapRange, randomRange, normalize, clamp } from "./utils/Math-Utils.js";
import WordCloud from "./words/wordcloud.js";
import Reveal from "./reveal/reveal.js";
import SwiperManager from "./swiper/swiper.js";
import SimpleLightbox from "./node_modules/simplelightbox/dist/simple-lightbox.esm.js";
const initLightBox = () => {
  const lightBoxElements = document.getElementsByClassName("project_item-a");
  Array.from(lightBoxElements).forEach((el) => {
    const l = new SimpleLightbox(el, {
      captionSelector: "self",
    });

    l.on("show.simplelightbox", function () {
      if (document.getElementsByClassName("simple-lightbox").length) {
        l.close();
        document.getElementsByClassName("simple-lightbox")[0].remove();
      }
    });

    l.on("error.simplelightbox", function (e) {
      console.log(e); // some usefull information
    });
  });
};

// ----------------------- nav
const initBurger = () => {
  const burger = document.querySelector(".burger-icon");
  const mainNav = document.querySelector("nav");
  burger.addEventListener("click", () => {
    toggleNav();
  });

  if (window.innerWidth < 700) {
    closeNav();
  }
};

const toggleNav = () => {
  const mainNav = document.querySelector("nav");
  mainNav.classList.toggle("hide");
};
const closeNav = () => {
  const mainNav = document.querySelector("nav");
  mainNav.classList.add("hide");
};

const closeNavOnClick = () => {
  const linksMenu = document.querySelectorAll("nav a");
  linksMenu.forEach((link) => {
    if (window.innerWidth < 700) {
      link.addEventListener("click", closeNav);
    } else {
      link.removeEventListener("click", closeNav);
    }
  });
};

// equipe

const hideCardInfo = () => {
  if (window.innerWidth > 700) {
    const cardEquipeInfo = document.querySelectorAll(".container-user_info");

    cardEquipeInfo.forEach((el) => {
      const infoHeight = el.querySelector(".user_info_hide").offsetHeight;
      el.style.transform = `translateY(${infoHeight}px)`;
    });
  }
};

const onResizeHandler = () => {
  closeNav();
  closeNavOnClick();
  hideCardInfo();
};

window.addEventListener("DOMContentLoaded", (event) => {
  initLightBox();

  initBurger();
  closeNavOnClick();
  window.addEventListener("resize", () => {
    onResizeHandler();
  });

  //equipe hover
  document.fonts.ready.then(() => {
    hideCardInfo();
  });

  const wc = new WordCloud();
  wc.init();

  const r = new Reveal();
  r.init();

  const s = new SwiperManager();
  s.init();
});
