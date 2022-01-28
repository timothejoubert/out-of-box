window.addEventListener("DOMContentLoaded", (event) => {
  function mapRange(value, a, b, c, d) {
    value = (value - a) / (b - a);
    return c + value * (d - c);
  }
  function randomRange(min, max) {
    return min + Math.random() * (max - min);
  }
  function normalize(val, max, min) {
    return (val - min) / (max - min);
  }
  function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  console.log("init SimpleLightbox");
  const lightBoxElements = document.getElementsByClassName("project_item-a");

  console.log(Array.from(lightBoxElements).length);
  console.log(lightBoxElements);

  Array.from(lightBoxElements).forEach((el) => {
    const l = new SimpleLightbox(el, {
      captionSelector: "self",
    });

    console.log(l);

    l.on("show.simplelightbox", function () {
      console.log("showing lightbox");
      console.log(l);
      console.log(l.isOpen);
      if (l.isOpen) l.close(); // BOURRIN

      if (document.getElementsByClassName("simple-lightbox").length) {
        l.close();
        console.log("closing");
      }
    });

    l.on("error.simplelightbox", function (e) {
      console.log(e); // some usefull information
    });
  });

  // second nav
  const burger = document.querySelector(".burger-icon");
  const mainNav = document.querySelector("nav");
  burger.addEventListener("click", toggleNav);
  window.addEventListener("resize", closeNav);
  if (window.innerWidth < 700) {
    closeNav();
  }
  function toggleNav() {
    mainNav.classList.toggle("hide");
  }
  function closeNav() {
    mainNav.classList.add("hide");
  }
  const linksMenu = document.querySelectorAll("nav a");
  function closeNavOnClick() {
    linksMenu.forEach((link) => {
      if (window.innerWidth < 700) {
        link.addEventListener("click", closeNav);
      } else {
        link.removeEventListener("click", closeNav);
      }
    });
  }
  closeNavOnClick();
  window.addEventListener("resize", closeNavOnClick);

  //equipe hover
  const cardEquipeInfo = document.querySelectorAll(".container-user_info");
  function hideCardInfo() {
    if (window.innerWidth > 700) {
      cardEquipeInfo.forEach((el) => {
        const infoHeight = el.querySelector(".user_info_hide").offsetHeight;
        el.style.transform = `translateY(${infoHeight}px)`;
      });
    }
  }
  document.fonts.ready.then(function () {
    hideCardInfo();
  });

  window.addEventListener("resize", hideCardInfo);

  let words = [...document.querySelectorAll(".container-words_cloud h4")];

  const minSize = window.innerWidth > 700 ? 3 : 1;
  const maxSize = window.innerWidth > 700 ? 8 : 3;
  const blurScale = window.innerWidth > 700 ? 2 : 0.0;
  function initWordStyle() {
    words.map((word, i) => {
      let fontS = randomRange(minSize, maxSize);
      let weight = randomRange(100, 900);
      let width = randomRange(60, 160);
      const pct = clamp(
        normalize(fontS, minSize * 1.25, maxSize * 0.75),
        0.0,
        1.0,
      );

      word.style.zIndex = 1 + Math.ceil(pct * words.length);
      word.style.filter = "blur(" + Math.ceil(pct * blurScale) + "px)";
      word.style.fontSize = `${fontS}rem`;
      word.style.fontVariationSettings = `'wght' ${weight}, 'wdth' ${width}`;
    });
  }

  initWordStyle();

  let mouseX = 0.0,
    mouseY = 0.0;
  let blurRate = 0.92;
  let pageX = window.innerWidth * 0.5,
    pageY = window.innerHeight * 0.5;

  let time = 0;
  const animate = () => {
    mouseX = blurRate * mouseX + (1.0 - blurRate) * pageX;
    mouseY = blurRate * mouseY + (1.0 - blurRate) * pageY;

    words.map((word, i) => {
      time++;
      const scale = 16.0;

      let size = parseFloat(word.style.fontSize) * scale;

      const pct = normalize(size / scale, minSize, maxSize);
      const cosPct = 0.5 + Math.cos(time * 0.0002 + i) * 0.5;
      word.style.opacity = (0.25 + pct * cosPct * 0.75).toFixed(2);
      //word.style.filter = "blur(" + (0.1 + (1.0 - pct) * 2) + "px)";

      word.style.transform = `translate(
		${mapRange(
      (mouseX / window.innerWidth) * 1.5,
      0,
      1,
      10 + size,
      10 - size,
    ).toFixed(2)}px,
		${mapRange(mouseY / window.innerHeight, 0, 1, 10 + size, 10 - size).toFixed(
      2,
    )}px
		)`;
    });

    requestAnimationFrame(animate);
  };

  animate();

  const setPagePos = (event) => {
    pageX = event.layerX ? window.innerWidth - event.layerX : event.pageX;
    pageY = event.layerY ? event.layerY : event.pageY;
  };
  document
    .getElementById("wordscloud")
    .addEventListener("touchmove", setPagePos, false);

  document
    .getElementById("wordscloud")
    .addEventListener("mousemove", setPagePos);
});
