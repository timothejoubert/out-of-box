/*
var swiper = new Swiper(".carousel-container", {
  slidesPerView: 1,
  speed: 400,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 9000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    //prevEl: ".swiper-button-prev"
  },
  on: {
    slideChange: function () {
      console.log("slide change");
      let vid = this.slides[this.activeIndex].querySelector("video");
      vid.currentTime = 0;
      vid.play();
    },
  },
});
*/

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
