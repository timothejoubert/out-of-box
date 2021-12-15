
//header
const clip = document.querySelector(".container-img_header");
let loop = null;
let progress = 0;
let progress2 = 0;
let progress3 = 100;

const frame = () => {
	if (progress >= 100 && progress2 >= 100 && progress3 <= 70) {
		cancelAnimationFrame(loop);
		videoAnimEnd();
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

function videoAnimEnd(){
	document.querySelector("#main-container").classList.add("loading_stop");
	document.getElementsByTagName("body")[0].classList.remove("no_scroll");

}


//convert to span
const firstLine = document.querySelector(".firstline h2");
const secondline = document.querySelector(".secondline h2");
const spanConverter = ( container ) => {
	const [...letters] = container.innerHTML;
	container.innerHTML= "";
	letters.forEach( (letter, i) => {
		const span = document.createElement('span');
		console.log(letter.length, letter)
		if(/\s/.test(letter)){
			console.log("espace")
			span.style.setProperty('--space', 1);
		}
		span.classList.add("reveal-delay");
		span.style.transitionDelay = i * 30 + "ms";
		span.innerHTML = letter;
		container.appendChild(span);
	})
}


function reveal(e){
	const reveals = e.currentTarget.nodesReveal;
	reveals.forEach( el => {
		var windowHeight = window.innerHeight;
		var revealPoint = 100;
		var revealTop = el.getBoundingClientRect().top;
		// console.log(el, revealTop, windowHeight - revealPoint);
		if(revealTop < windowHeight - revealPoint){
			el.classList.add("reveal-visible");
		}else{
			el.classList.remove("reveal-visible");
		}

		const childsDelay = document.querySelectorAll(".reveal-delay");
		if(childsDelay.length > 0){
			childsDelay.forEach( (child, i) => {
				const delay = el.getAttribute("child-delay");
				child.style.transitionDelay = i * delay + "ms";
			});
		}
	})
}


//load function after loading 
window.addEventListener("DOMContentLoaded", (e) => {
	console.log(e.type);

	//init tagline span
	spanConverter(firstLine);
	spanConverter(secondline);

	//header animation
	setTimeout( () => {
		document.querySelector(".reseaux-icon").style.opacity = 1;
		loop = requestAnimationFrame(frame);
		firstLine.classList.add("reveal-visible");
		secondline.classList.add("reveal-visible");
	}, 1000);

	//init animation for all section 
	window.nodesReveal = document.querySelectorAll(".reveal");
	window.addEventListener("scroll", reveal);

});


