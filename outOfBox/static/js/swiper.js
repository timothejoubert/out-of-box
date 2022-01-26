const onUpdateVideoHandler = (video, swiper) => {
  const pct = video.currentTime / video.duration;

  if (pct === 1.0) {
    swiper.slideNext(1000);
    video.pause();
    video.currentTime = 0;
  }
};

var currentUpdate = null;
var currentVideo = null;
var swiper = new Swiper(".carousel-container", {
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
      currentUpdate = onUpdateVideoHandler.bind(swiper, vid, swiper);

      if (currentVideo) {
        swiper.slides.forEach((slide) => {
          let v = slide.querySelector("video");
          v.ontimeupdate = null;
          v.pause();
          v.currentTime = 0;
        });
      }
      vid.play();

      vid.ontimeupdate = currentUpdate;
      currentVideo = vid;
    },
  },
});

window.addEventListener("DOMContentLoaded", (e) => {
  const el = document.getElementsByClassName("btn_play_mobile")[0];
  el.onclick = () => {
    let vid = swiper.slides[swiper.activeIndex].querySelector("video");
    //vid.play();
    el.remove();
  };
});

// const updateTime = (vid, index) => {
// 	const pct = vid.currentTime / vid.duration;
// 	console.log(index, pct);
// 	if (pct === 1.0){
// 		swiper.slideNext();
// 	}
// }

// swiper.on("slideChange", function (){
// 	let vid = this.slides[this.activeIndex].querySelector("video");
// 	console.log(vid, vid.duration % 60 * 1000);

// 	vid.currentTime = 0;
// 	const playPromise = vid.play();

// 	if (playPromise !== undefined) {
// 		playPromise
// 		.then((e) => {
// 			vid.play();
// 			vid.addEventListener("timeupdate", () => updateTime(vid, this.activeIndex));
// 		})
// 		.catch((error) => {
// 		console.warn("auto play not working");
// 		});
// 	}
// });
