
window.addEventListener("DOMContentLoaded", (event) => {

var topScroll = window.pageYOffset || document.documentElement.scrollTop;

const header = document.getElementById("wordscloud").getBoundingClientRect().height + document.getElementById("wordscloud").getBoundingClientRect().top;
const nav = document.getElementsByTagName("nav")[0].getBoundingClientRect().height;

const handleScroll = () => {
	topScroll = window.pageYOffset;
	// document.documentElement.style.setProperty('--scrollValue', topScroll);
	if(topScroll > header - nav/2){
		document.querySelector(".main-nav").classList.add("dark-color");
	}else{
		document.querySelector(".main-nav").classList.remove("dark-color");
	}
}

// window.addEventListener("scroll", handleScroll);


const allImage = document.querySelectorAll('.container-project_img');
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




//convert to span
const spanConverter = ( container ) => {
	const [...letters] = container.innerHTML;
	container.innerHTML= "";
	letters.map( (letter, i) => {
		const span = document.createElement('span');
		span.classList.add("reveal-delay");
		span.innerHTML = letter;
		container.appendChild(span);
	})
}
const firstLine = document.querySelector(".firstline h2");
const secondline = document.querySelector(".secondline h2");
spanConverter(firstLine);
spanConverter(secondline);

//video is ready
document.querySelector("#myVideo")?.addEventListener("canplay", () => setTimeout( () => {videoLoad()}, 1000) );
function videoLoad(){
	console.log("load finish");
}

// second nav
const burger = document.querySelector(".burger-icon");
const mainNav = document.querySelector("nav")
burger.addEventListener("click", toggleNav);

function toggleNav(){
	mainNav.classList.toggle("hide");
}


// apparition el transi
const ratio = 0.9;
const options = {
	root: null,
	rootMargin: '0px',
	threshold: ratio
}

const handleIntersect = function(entries, observer) {
	entries.forEach( (entry) => {
		const el = entry.target;
		//console.log(entry.boundingClientRect.top > entry.boundingClientRect.height);
		
		if(entry.intersectionRatio > ratio){
			el.classList.add('reveal-visible');
			el.querySelectorAll('.reveal-delay').forEach( (item, i) => {
				item.style.transitionDelay = i * 30 + "ms";
			});
			observer.unobserve(el);
		}
		else{
			el.classList.remove('reveal-visible');
		}
	});
}

if(!!window.IntersectionObserver){
	const observer = new IntersectionObserver(handleIntersect, options);
	document.querySelectorAll('.reveal').forEach( (el) => {
		observer.observe(el);
	});
}else{
	console.log("IntersectionObserver not supported");
	document.querySelectorAll('.reveal').forEach( (el) => {
		el.classList.add("reveal-visible")
	});
}



// animation 
function lerp (start, end, amt){
	return (1-amt)*start+amt*end
  }

function firstLineAnim(el){
	let grow = 0;
	for(let i = 0; i < 100; i++){
		grow++;
		el.style.setProperty('--first-height', lerp(grow, 100, 0.0001) +'%');
	}
	// while(grow < 100){
	// 	grow = grow + 0.001;
	// 	el.style.setProperty('--first-height', grow +'%');
	// }
}

// setTimeout( () => {
// 	firstLineAnim();
	
// }, 1000);

function clamp(number, min, max) {
	return Math.max(min, Math.min(number, max));
}

const clip = document.querySelector(".container-img_header");
let loop = null;
let progress = 0;
let progress2 = 0;
let progress3 = 100;

const frame = () => {
	if (progress >= 100 && progress2 >= 100 && progress3 <= 70) {
		cancelAnimationFrame(loop);
        rafID = null;
		return;
	}
	if(progress <= 100){
		progress+=2;
		clip.style.setProperty('--first-height', progress+'%');
	} 
	if(progress2 <= 100 ){
		progress2+=4;
		clip.style.setProperty('--second-height', progress2 +'%');
	}
	if(progress3 >= 70){
		progress3-=1;
		clip.style.setProperty('--third-width', progress3 +'%');
	} 
	loop = requestAnimationFrame(frame); 
};

window.addEventListener("DOMContentLoaded", (event) => {
	setTimeout( () => {
		loop = requestAnimationFrame(frame);
	}, 1000);
});
