
window.addEventListener("DOMContentLoaded", (event) => {

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

	// second nav
	const burger = document.querySelector(".burger-icon");
	const mainNav = document.querySelector("nav")
	burger.addEventListener("click", toggleNav);
	window.addEventListener("resize", closeNav);
	if(window.innerWidth < 700){
		closeNav();
	}
	function toggleNav(){
		mainNav.classList.toggle("hide");
	}
	function closeNav(){
		mainNav.classList.add("hide");
	}

	window.addEventListener("scroll", detectFont);
});





