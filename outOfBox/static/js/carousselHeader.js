// document.addEventListener("DOMContentLoaded", () => {

// 	document.querySelector(".btn_play_mobile").addEventListener("click", currentItemClick);

// 	document.querySelectorAll(".carousel-container").forEach((carousel) => {
// 		//insertNumbers(carousel);
// 		//carousel.querySelector(".prev").addEventListener("click", (e) => {minusItem(carousel); });

// 		carousel.querySelector(".next").addEventListener("click", () => {
// 			plusItem(carousel);
// 		});
	
// 		insertDots(carousel);
// 		showItems(carousel, 0);
	
// 		carousel.querySelectorAll(".dot").forEach((dot) => {
// 			dot.addEventListener("click", (e) => {
// 				let item = Array.prototype.indexOf.call(
// 					e.target.parentNode.children,
// 					e.target
// 				);
// 				showItems(carousel, item);
// 			});
// 		});
// 	});
//   });
  
//   function insertNumbers(carousel) {
// 	const length = carousel.querySelectorAll(".item").length;
// 	for (let i = 0; i < length; i++) {
// 	  const nmbr = document.createElement("div");
// 	  nmbr.classList.add("numbertext");
// 	  nmbr.innerText = i + 1 + " / " + length;
  
// 	  carousel.querySelectorAll(".item")[i].append(nmbr);
// 	}
//   }
  
//   function insertDots(carousel) {
// 	const dots = document.createElement("div");
// 	dots.classList.add("dots");
  
// 	carousel.append(dots);
  
// 	carousel.querySelectorAll(".item").forEach((elem) => {
// 	  const dot = document.createElement("div");
// 	  dot.classList.add("dot");
  
// 	  carousel.querySelector(".dots").append(dot);
// 	});
//   }
  
//   function plusItem(carousel) {
// 	let item = currentItem(carousel);
// 	carousel.querySelectorAll(".item")[item].nextElementSibling.classList.contains("item")
// 	  ? showItems(carousel, item + 1)
// 	  : showItems(carousel, 0);
//   }
  
//   function minusItem(carousel) {
// 	let item = currentItem(carousel);
  
// 	carousel.querySelectorAll(".item")[item].previousElementSibling != null
// 	  ? showItems(carousel, item - 1)
// 	  : showItems(carousel, carousel.querySelectorAll(".item").length - 1);
//   }
  
//   function currentItemClick() {
// 	console.log("play vid on mobile");
// 	const myItm = [...document.querySelectorAll(".carousel-container .item")].findIndex(
// 		(item) => item.style.display == "block"
//   	);
// 	myItm !== undefined ? document.getElementsByTagName("video")[myItm].play() : console.log("can't find current vid to play");
  	
// }

//   function currentItem(carousel) {
// 	  return [...carousel.querySelectorAll(".item")].findIndex(
// 	  (item) => item.style.display == "block" 
// 	);
//   }

//   function showItems(carousel, item) {
// 	if (carousel.querySelectorAll(".item")[currentItem(carousel)] != undefined)
// 		carousel.querySelectorAll(".item")[currentItem(carousel)].style.display = "none";
// 		carousel.querySelectorAll(".item")[item].style.display = "block";

// 	if (carousel.querySelectorAll(".item")[currentItem(carousel)] != undefined && window.innerWidth > 700){
// 		let currentVid = carousel.querySelectorAll(".item")[currentItem(carousel)].querySelector("video");
// 		currentVid.currentTime = 0;
// 		currentVid.play();
// 	}

// 	if (carousel.querySelector(".dot.active") != null)
// 		carousel.querySelector(".dot.active").classList.remove("active");
// 		carousel.querySelectorAll(".dot")[item].classList.add("active");

// 		carousel.querySelectorAll(".item")[currentItem(carousel)].querySelector("video").addEventListener('ended', (e) => {
// 			console.log("switch video when current end", e.target);
// 			plusItem(carousel);
// 		})
//   }

!(function(d){
var itemClassName = "carousel-item-wp";
	items = d.getElementsByClassName(itemClassName),
	totalItems = items.length,
	slide = 0,
	moving = true,
	dots = [],
	timerEnd = 0; 

function setInitialClasses() {
	items[totalItems - 1].classList.add("prev");
	items[0].classList.add("active");
	items[1].classList.add("next");
}
function insertDots() {
	const dotsWp = document.createElement("div");
	dotsWp.classList.add("dots");
	document.querySelector(".switch-wp").insertBefore(dotsWp, document.querySelector(".switch-wp .next"));
	Array.from(items).map( () => {
		const dot = document.createElement("div");
		dot.classList.add("dot");
		dots.push(dot);
		dotsWp.append(dot);
	});
}
function setEventListeners() {
	var next = d.querySelector('.switch-wp .next'),
		prev = d.querySelector('.switch-wp .prev');

	next.addEventListener('click', moveNext);
	prev.addEventListener('click', movePrev);

	dots.forEach( (dot, i) => {
		dot.addEventListener('click', () => {
			moveCarouselTo(i);
		});
	})
}

// Disable interaction by setting 'moving' to true for the same duration as our transition (0.5s = 500ms)
function disableInteraction() {
	moving = true;
	setTimeout(function(){
		moving = false
	}, 500);
}

function initDots(slide){
	Array.from(items).map( (dot, i) => {
		dots[i].classList.remove("active");
	});
	dots[slide].classList.add("active");
}
function moveCarouselTo(slide) {
	if(!moving) {
	disableInteraction();
	var newPrevious = slide - 1,
		newNext = slide + 1,
		oldPrevious = slide - 2,
		oldNext = slide + 2;

	// Test if carousel has more than three items
	// if (totalItems >= 3) {
		// Checks if the new potential slide is out of bounds and sets slide numbers
		if (newPrevious <= 0) {
		oldPrevious = (totalItems - 1);
		} else if (newNext >= (totalItems - 1)){
		oldNext = 0;
		}
		
		// Check if current slide is at the beginning or end and sets slide numbers
		if (slide === 0) {
		newPrevious = (totalItems - 1);
		oldPrevious = (totalItems - 2);
		oldNext = (slide + 1);	
		} else if (slide === (totalItems -1)) {
		newPrevious = (slide - 1);
		newNext = 0;
		oldNext = 1;
		}
		//if only 3 slide
		if(totalItems === 3 && slide ===1){
		oldNext = totalItems -1;
		}
		// Based on the current slide, reset to default classes.
		items[oldPrevious].className = itemClassName;
		items[oldNext].className = itemClassName;
		// Add the new classes
		items[newPrevious].className = itemClassName + " prev";
		items[slide].className = itemClassName + " active";
		items[newNext].className = itemClassName + " next";

		loadVid(slide);
	// }
	}
}
function loadVid(slide){
	initDots(slide);
	let currentVid = items[slide].querySelector("video");
	let switchTimer = currentVid.duration % 60 * 1000;
	currentVid.currentTime = 0;
	currentVid.play();

	// console.log("1",timerEnd);
	clearTimeout(timerEnd);
	// console.log("2",timerEnd);
	timerEnd = setTimeout(moveNext, switchTimer);
	// console.log("3", timerEnd)
	

}

function moveNext() {
	// console.log("next vid, current slide:", slide);
	if (!moving) {
		if (slide === (totalItems - 1)) {
			slide = 0;
		} else {
			slide++;
		}
		moveCarouselTo(slide);
	}
}
function movePrev() {
	if (!moving) {
		if (slide === 0) {
			slide = (totalItems - 1);
		} else {
			slide--;
		}
		moveCarouselTo(slide);
	}
}

// Initialise carousel
function initCarousel() {
	setInitialClasses();
	insertDots();
	setEventListeners();
	
	loadVid(slide);

	moving = false;

}

// make it rain
initCarousel();

}(document));