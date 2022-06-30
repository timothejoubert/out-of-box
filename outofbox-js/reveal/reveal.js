class Reveal {
  constructor() {}

  init() {
    //convert tagline header to span
    const firstLine = document.querySelector(".firstline h2");
    const secondline = document.querySelectorAll(".secondline h2");

    //init tagline span
    secondline.forEach((el) => {
      this.spanConverter(el);
    });
    this.spanConverter(firstLine);

    const loaderWp = document.querySelector("#loader_logo");
    loaderWp.classList.add("start");

    this.nodesReveal = document.querySelectorAll(".reveal");

    this.startLoad();

    setTimeout(() => {
      this.reveal();
    }, 1000);

    //init animation for all section
    window.addEventListener("scroll", (e) => {
      this.reveal(e);
    });
  }

  spanConverter(container) {
    if (!container) return;
    const [...letters] = container?.innerHTML;
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
  }

  startLoad() {
    setTimeout(() => {
      const loaderWp = document.querySelector("#loader_logo");
      loaderWp.classList.remove("start");
      this.videoAnimEnd();
    }, 1000);
  }

  videoAnimEnd() {
    console.log("hello");
    /*
    const video = document.querySelector(".carousel-container video");
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
    */
    document.querySelector(".reseaux-icon").style.opacity = 1;
    document.querySelector("#main-container").classList.add("loading_stop");

    const firstLine = document.querySelector(".firstline h2");
    firstLine?.classList.add("reveal-visible");

    const secondline = document.querySelectorAll(".secondline h2");
    secondline.forEach((el) => {
      el.classList.add("reveal-visible");
    });
    document.getElementsByTagName("body")[0].classList.remove("no_scroll");

    document.querySelector(".btn_mute").classList.remove("hide-mute");
  }

  //animation for all section
  reveal(e) {
    const reveals = this.nodesReveal;
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
}

export default Reveal;

//animation header
