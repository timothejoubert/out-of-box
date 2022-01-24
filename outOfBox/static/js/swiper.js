var swiper = new Swiper(".carousel-container", {
	slidesPerView: 1,
	speed: 400,
	spaceBetween: 30,
	loop: true,
	// autoplay: {
	// 	delay: 9000,
	// 	disableOnInteraction: false,
	// },
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
			for (var vid of document.querySelectorAll(".swiper-slide video")) {
				if(vid === this.slides[this.activeIndex].querySelector("video")){
					console.log(vid, vid.duration % 60 * 1000);
					vid.currentTime = 0;
					vid.play();
					vid.addEventListener('ended', function(e) { 
						swiper.slideNext();
						console.log(e, "switch end");
					});
				}
			}
		},
	},
  });
  
//   swiper.on("activeIndexChange", function (){
// 	const currentVid = this.slides[this.activeIndex].querySelector("video");
// 	swiper.autoplay.delay = currentVid.duration % 60 * 1000;
// 	currentVid.currentTime = 0;
// 	currentVid.play();
// 	console.log("change index", this.autoplay.delay);
// }, )