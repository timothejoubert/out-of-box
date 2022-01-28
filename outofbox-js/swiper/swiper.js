import Swiper from "../node_modules/swiper/swiper-bundle.esm.browser.min.js";

class SwiperManager {
  constructor() {
    this.videoMuted = true;
  }
  init() {
    var currentUpdate = null;
    var currentVideo = null;
    this.swiper = new Swiper(".carousel-container", {
      slidesPerView: 1,
      speed: 400,
      spaceBetween: 30,
      loop: true,

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        //prevEl: ".swiper-button-prev"
      },
      on: {
        slideChange: (swiper) => {
          let vid = swiper.slides[swiper.activeIndex].querySelector("video");
          vid.currentTime = 0;

          currentUpdate = null;
          currentUpdate = this.onUpdateVideoHandler.bind(swiper, vid, swiper);

          if (currentVideo) {
            swiper.slides.forEach((slide) => {
              let v = slide.querySelector("video");
              v.ontimeupdate = null;
              v.pause();
              v.muted = this.videoMuted;
              //v.currentTime = 0;
            });
          }
          vid.currentTime = 0;

          vid.play();

          vid.ontimeupdate = currentUpdate;
          currentVideo = vid;
        },
      },
    });

    this.initMute();
  }

  initMute() {
    const mute = document.getElementsByClassName("btn_mute")[0];
    mute.onclick = () => {
      let vid =
        this.swiper.slides[this.swiper.activeIndex].querySelector("video");
      vid.muted = !vid.muted;
      this.videoMuted = vid.muted;
      const muteicon = document.getElementById("mute-icon");
      const unmuteicon = document.getElementById("unmute-icon");
      muteicon.style.display = vid.muted ? "none" : "block";
      unmuteicon.style.display = vid.muted ? "block" : "none";
    };
  }

  onUpdateVideoHandler(video, swiper) {
    const pct = video.currentTime / video.duration;
    if (pct === 1.0) {
      swiper.slideNext(1000);
      video.pause();
      //video.currentTime = 0;
    }
  }
}
export default SwiperManager;
