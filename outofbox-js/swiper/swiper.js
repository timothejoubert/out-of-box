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
              //console.log("trying to mute here");

              //v.currentTime = 0;
            });
          }
          vid.currentTime = 0;

          //console.log("playing here");
          vid.controls = false;
          vid.playsinline = true;
          vid.muted = true;
          vid.setAttribute("muted", ""); // leave no stones unturned :)
          vid.autoplay = true;

          setTimeout(() => {
            // player.play() might return a promise but it's not guaranteed crossbrowser.
            const promise = vid.play();
            console.log(vid);
            // let's play safe to ensure that if we do have a promise
            if (promise.then) {
              promise
                .then(() => {})
                .catch((e) => {
                  console.log(e);
                  // if promise fails, hide the video and fallback to <img> tag
                  //.current.style.display = "none";
                  //setShouldUseImage(true);
                });
            }
          }, 1);

          // vid.play();

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
    //console.log(pct);
    if (pct > 0.98) {
      swiper.slideNext(1000);
      video.pause();
      //video.currentTime = 0;
    }
  }
}
export default SwiperManager;
