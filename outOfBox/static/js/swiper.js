const onUpdateVideoHandler = (video, swiper) => {
  const pct = video.currentTime / video.duration;
  if (pct === 1.0) {
    swiper.slideNext(1000);
    video.pause();
    video.currentTime = 0;
  }
};

var currentUpdate = null;

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
      console.log("swipe");

      let vid = swiper.slides[swiper.activeIndex].querySelector("video");
      vid.currentTime = 0;
      vid.play();

      currentUpdate = null;
      currentUpdate = onUpdateVideoHandler.bind(swiper, vid, swiper);
      vid.removeEventListener("timeupdate", currentUpdate, true);
      vid.addEventListener("timeupdate", currentUpdate, true);
    },
  },
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
