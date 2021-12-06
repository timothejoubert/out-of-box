
window.addEventListener("DOMContentLoaded", (event) => {
var topScroll = window.pageYOffset || document.documentElement.scrollTop;

const header = document.getElementById("wordscloud").getBoundingClientRect().height + document.getElementById("wordscloud").getBoundingClientRect().top;
const nav = document.getElementsByTagName("nav")[0].getBoundingClientRect().height;

const handleScroll = () => {
	topScroll = window.pageYOffset;
	// document.documentElement.style.setProperty('--scrollValue', topScroll);
	// console.log(topScroll);
	if(topScroll > header - nav/2){
		document.querySelector(".main-nav").classList.add("dark-color");
	}else{
		document.querySelector(".main-nav").classList.remove("dark-color");
	}
}

window.addEventListener("scroll", handleScroll);


const allImage = document.querySelectorAll('.container-project_img');
let oddImg = [];
let evenImg = [];
allImage.forEach( (el, i) => {
	if(i % 2 === 0){
		addParallax(el, 'odd');
	}else{
		addParallax(el, 'even');
	}
})
function addParallax(els, order){
	new simpleParallax(els, {
		delay: 0.5,
		orientation: order === 'even' ? 'down right': 'up left',
		scale: 1.3,
		overflow: true,
	});
}


const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";

for (const el of openEls) {
  el.addEventListener("click", function() {
	  if(!document.getElementsByTagName("body")[0].classList.contains("no-scroll")){
		const modalId = this.dataset.open;
		document.getElementById(modalId).classList.add(isVisible);
		document.getElementsByTagName("body")[0].classList.add("no-scroll");
	  }
  });
}

for (const el of closeEls) {
  el.addEventListener("click", function() {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
	document.getElementsByTagName("body")[0].classList.remove("no-scroll");
  });
}

document.addEventListener("click", e => {
	console.log(e.target, e.target !== document.querySelector(".modal.is-visible"));
  if (e.target !== document.querySelector(".modal.is-visible") && !e.target.matches(".container-project_item, .container-project_item *")) {
	  console.log("close nav")
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
	document.getElementsByTagName("body")[0].classList.remove("no-scroll");
  }
});

document.addEventListener("keyup", e => {
  // if we press the ESC
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
	document.getElementsByTagName("body")[0].classList.remove("no-scroll");
  }
});

function clamp(number, min, max) {
	return Math.max(min, Math.min(number, max));
}
function map(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
function lerp (start, end, amt){
	return (1-amt)*start+amt*end;
}

const difDist = 200;
const keyWords = document.querySelectorAll("#wordscloud h4");

const detectFont = () => keyWords.forEach( txt => {
	const top = txt.getBoundingClientRect().top;
	const height = txt.getBoundingClientRect().height;
	let scrollDist = window.innerHeight/2 - top + height/2;

	if(scrollDist < difDist && scrollDist > -difDist){
		let cap = clamp(scrollDist, -difDist, difDist);
		
		let dist = map(Math.abs(cap), 0, difDist, 1, 0);
		let oldDist = window.getComputedStyle(txt).getPropertyValue('--distLetter') || 0;
		dist = lerp(dist, clamp(oldDist,-difDist, difDist), 0.1);
		
		let skew = map(cap, 0, difDist, -1, 1);
		let oldDistSkew = window.getComputedStyle(txt).getPropertyValue('--skewLetter') || 0;
		skew = lerp(skew, clamp(oldDistSkew,-difDist, difDist), 0.1);

		txt.style.setProperty('--distLetter', dist);
		txt.style.setProperty('--skewLetter', skew);
	}else{
		txt.style.setProperty('--distLetter', 0);
		txt.style.setProperty('--skewLetter', 0);
	}
})

window.addEventListener("scroll", detectFont);

});