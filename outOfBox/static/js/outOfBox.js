window.addEventListener("DOMContentLoaded", (event) => {
  // //font wordsCloud
  // const difDist = 200;
  // const keyWords = document.querySelectorAll("#wordscloud h4");
  // const detectFont = () => keyWords.forEach( txt => {
  // 	const top = txt.getBoundingClientRect().top;
  // 	const height = txt.getBoundingClientRect().height;
  // 	let scrollDist = window.innerHeight/2 - top + height/2;

  // 	if(scrollDist < difDist && scrollDist > -difDist){
  // 		let cap = clamp(scrollDist, -difDist, difDist);

  // 		let dist = map(Math.abs(cap), 0, difDist, 1, 0);
  // 		let oldDist = window.getComputedStyle(txt).getPropertyValue('--distLetter') || 0;
  // 		dist = lerp(dist, clamp(oldDist,-difDist, difDist), 0.1);

  // 		// let skew = map(cap, 0, difDist, -1, 1);
  // 		// let oldDistSkew = window.getComputedStyle(txt).getPropertyValue('--skewLetter') || 0;
  // 		// skew = lerp(skew, clamp(oldDistSkew,-difDist, difDist), 0.1);

  // 		txt.style.setProperty('--distLetter', dist);
  // 		// txt.style.setProperty('--skewLetter', skew);
  // 	}else{
  // 		txt.style.setProperty('--distLetter', 0);
  // 		txt.style.setProperty('--skewLetter', 0);
  // 	}
  // })
  // window.addEventListener("scroll", detectFont);

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
    // console.log('Futura state: ' + document.fonts.check('1em Futura-PT'));  // true
    hideCardInfo();
  });

  window.addEventListener("resize", hideCardInfo);

  //projets random pos
  const projets = document.querySelectorAll(".container-project_item");
  function rdPosProjet() {
    [...projets].map((projet) => {
      if (window.innerWidth > 1100) {
        const left = Math.random() * 120;
        const top = Math.random() * 250;
        projet.style.top = `${top}px`;
        projet.style.marginLeft = `${left}px`;
        projet.style.marginTop = `100px`;
      } else {
        projet.style.top = `inherit`;
        projet.style.marginTop = `inherit`;
        projet.style.marginLeft = `inherit`;
      }
    });
  }
  rdPosProjet();
  window.addEventListener("resize", rdPosProjet);

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

  let words = [...document.querySelectorAll(".container-words_cloud h4")];

  const minSize = window.innerWidth > 700 ? 1 : 0.25;
  const maxSize = window.innerWidth > 700 ? 4 : 1.5;
  const blurScale = window.innerWidth > 700 ? 3 : 0.0;
  function initWordStyle() {
    words.map((word, i) => {
      let fontS = randomRange(minSize, maxSize);
      let weight = randomRange(100, 900);
      let width = randomRange(60, 160);
      // var separator = document.createElement("span");
      // separator.innerHTML = "";
      // word.after(separator);

      const pct = clamp(
        normalize(fontS, minSize * 1.25, maxSize * 0.75),
        0.0,
        1.0,
      );
      word.style.filter = "blur(" + pct * blurScale + "px)";
      word.style.fontSize = `${fontS}rem`;
      word.style.fontVariationSettings = `'wght' ${weight}, 'wdth' ${width}`;
    });
  }

  initWordStyle();

  //window.addEventListener("load", initWordStyle);

  /*
  window.addEventListener("resize", () => {
    words.map((word, i) => {
      let fontS =
        window.innerWidth > 700 ? word.style.fontSize : randomInt(0.8, 2);
      word.style.fontSize = `${fontS}rem`;
    });
  });
	*/

  let mouseX = 0.0,
    mouseY = 0.0;
  let blurRate = 0.9;
  let pageX = 0,
    pageY = 0;

  let time = 0;
  const animate = () => {
    mouseX = blurRate * mouseX + (1.0 - blurRate) * pageX;
    mouseY = blurRate * mouseY + (1.0 - blurRate) * pageY;

    words.map((word, i) => {
      time++;
      const scale = 16.0;

      let size = parseFloat(word.style.fontSize) * scale;

      const pct = normalize(size / scale, minSize, maxSize);
      const cosPct = 0.5 + Math.cos(time * 0.00008 + i) * 0.5;
      word.style.opacity = (0.25 + pct * cosPct * 0.75).toFixed(2);
      //word.style.filter = "blur(" + (0.1 + (1.0 - pct) * 2) + "px)";

      word.style.transform = `translate(
		${mapRange(mouseX / window.innerWidth, 0, 1, 10 + size, 10 - size).toFixed(
      2,
    )}px,
		${mapRange(mouseY / window.innerHeight, 0, 1, 10 + size, 10 - size).toFixed(
      2,
    )}px
		)`;
    });

    requestAnimationFrame(animate);
  };

  animate();

  const setPagePos = (event) => {
    pageX = event.layerX ? event.layerX : event.pageX;
    pageY = event.layerY ? event.layerY : event.pageY;
  };
  document
    .getElementById("wordscloud")
    .addEventListener("touchmove", setPagePos, false);

  document
    .getElementById("wordscloud")
    .addEventListener("mousemove", setPagePos);
});
