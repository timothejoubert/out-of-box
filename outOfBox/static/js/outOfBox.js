
window.addEventListener("DOMContentLoaded", (event) => {

	// //font wordsCloud
	// const difDist = 200;
	// const keyWords = document.querySelectorAll("#wordscloud h4");
	// const detectFont = () => keyWords.forEach( txt => {
	// 	const top = txt.getBoundingClientRect().top;
	// 	const height = txt.getBoundingClientRect().height;
	// 	let scrollDist = window.innerHeight/2 - top + height/2;

	// 	if(scrollDist < difDist && scrollDist > -difDist){
	// 		let cap = clamp(scrollDist, -difDist, difDist);
			
	// 		let dist = map(Math.abs(cap), 0, difDist, 1, 0);
	// 		let oldDist = window.getComputedStyle(txt).getPropertyValue('--distLetter') || 0;
	// 		dist = lerp(dist, clamp(oldDist,-difDist, difDist), 0.1);
			
	// 		// let skew = map(cap, 0, difDist, -1, 1);
	// 		// let oldDistSkew = window.getComputedStyle(txt).getPropertyValue('--skewLetter') || 0;
	// 		// skew = lerp(skew, clamp(oldDistSkew,-difDist, difDist), 0.1);

	// 		txt.style.setProperty('--distLetter', dist);
	// 		// txt.style.setProperty('--skewLetter', skew);
	// 	}else{
	// 		txt.style.setProperty('--distLetter', 0);
	// 		txt.style.setProperty('--skewLetter', 0);
	// 	}
	// })
	// window.addEventListener("scroll", detectFont);

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
	const linksMenu = document.querySelectorAll("nav a");
	function closeNavOnClick(){
		linksMenu.forEach(link => {
			if(window.innerWidth < 700){
				link.addEventListener("click", closeNav);
			}else{
				link.removeEventListener("click", closeNav);
			}
		})
	}
	closeNavOnClick();
	window.addEventListener("resize", closeNavOnClick);

	//equipe hover
	const cardEquipeInfo = document.querySelectorAll(".container-user_info");
	function hideCardInfo(){
		if(window.innerWidth > 700){
			cardEquipeInfo.forEach( (el) => {
				const infoHeight = el.querySelector(".user_info_hide").offsetHeight;
				el.style.transform = `translateY(${infoHeight}px)`;
			})
		}
	}
	document.fonts.ready.then(function () {
		// console.log('Futura state: ' + document.fonts.check('1em Futura-PT'));  // true
		hideCardInfo();
	});
	
	
	window.addEventListener("resize", hideCardInfo);

	//projets random pos
	const projets = document.querySelectorAll(".container-project_item");
	function rdPosProjet (){
		[...projets].map( (projet) => {
			if(window.innerWidth > 1100){
				const left = Math.random() * 120;
				const top = Math.random() * 250;
				projet.style.top = `${top}px`;
				projet.style.marginLeft = `${left}px`;
				projet.style.marginTop = `100px`;
			}else{
				projet.style.top = `inherit`;
				projet.style.marginTop = `inherit`;
				projet.style.marginLeft = `inherit`;
			}
		})
	}
	rdPosProjet();
	window.addEventListener("resize", rdPosProjet);


	function mapRange(value, a, b, c, d) {
		value = (value - a) / (b - a);
		return c + value * (d - c);
	}
	function randomInt(min, max) {
	  return Math.random() * (max - min) + min;
	}
	
	let words = [...document.querySelectorAll(".container-words_cloud h4")];
	
	window.addEventListener('load', () => {
	  words.map( (word, i) => {
		let fontS = randomInt(1, 4);
		let weight = randomInt(100, 900);
		let width = randomInt(60, 160);
		var separator = document.createElement('span')
		separator.innerHTML = " - ";
		word.after(separator);
		word.style.fontSize = `${fontS}rem`;
		word.style.fontVariationSettings = `'wght' ${weight}, 'wdth' ${width}`;
	  })
	});
	
	window.addEventListener('mousemove', (e) => {
	  words.map( (word, i) => {
		let size = parseFloat(word.style.fontSize) * 2;
		word.style.transform = `translate(
		${mapRange(e.pageX/window.innerWidth, 0,1, 10 + size, 10 - size)}px,
		${mapRange(e.pageY/window.innerHeight, 0,1, 10 + size, 10 - size)}px
		)`
	  }); 
	});

});

