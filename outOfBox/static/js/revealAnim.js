//convert tagline header to span
const firstLine = document.querySelector(".firstline h2");
const secondline = document.querySelectorAll(".secondline h2");
const spanConverter = (container) => {
  const [...letters] = container.innerHTML;
  container.innerHTML = "";
  letters.forEach((letter, i) => {
    const span = document.createElement("span");
    if (/\s/.test(letter)) {
      span.style.setProperty("--space", 1);
    }
    span.classList.add("reveal-delay");
    span.style.transitionDelay = i * 30 + "ms";
    span.innerHTML = letter;
    container.appendChild(span);
  });
};

//animation header
const video = document.querySelector(".carousel-container video");
const loaderWp = document.querySelector("#loader_logo");

function startLoad() {
  setTimeout(() => {
    loaderWp.classList.remove("start");
    videoAnimEnd();
  }, 1000);
}

function videoAnimEnd() {
  if (window.innerWidth > 700) {
    video
      .play()
      .then(() => {
        console.log("video is playing");
      })
      .catch((error) => {
        console.log("error, video is not playing " + error);
      });
  }
  document.querySelector(".reseaux-icon").style.opacity = 1;
  document.querySelector("#main-container").classList.add("loading_stop");
  firstLine.classList.add("reveal-visible");
  secondline.forEach((el) => {
    el.classList.add("reveal-visible");
  });
  document.getElementsByTagName("body")[0].classList.remove("no_scroll");
}

//animation for all section
function reveal(e) {
  const reveals = e.currentTarget.nodesReveal;
  reveals.forEach((el) => {
    var windowHeight = window.innerHeight;
    var revealPoint = 30;
    var revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - revealPoint) {
      el.classList.add("reveal-visible");
    } else {
      el.classList.remove("reveal-visible");
    }

    const childsDelay = document.querySelectorAll(".reveal-delay");
    if (childsDelay.length > 0) {
      childsDelay.forEach((child, i) => {
        const delay = el.getAttribute("child-delay");
        child.style.transitionDelay = i * delay + "ms";
      });
    }
  });
}

//load function after loading
window.addEventListener("DOMContentLoaded", (e) => {
  //init tagline span
  secondline.forEach((el) => {
    spanConverter(el);
  });
  spanConverter(firstLine);

  //header animation
  loaderWp.classList.add("start");

  console.log("wait for video ready");
  //video.addEventListener('loadeddata', function() {
  startLoad();
  //}, false)

  //init animation for all section
  window.nodesReveal = document.querySelectorAll(".reveal");
  window.addEventListener("scroll", reveal);
});
window.addEventListener("DOMContentLoaded", reveal);