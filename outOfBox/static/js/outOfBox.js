

var topScroll = window.pageYOffset || document.documentElement.scrollTop;

const header = document.getElementById("wordscloud").getBoundingClientRect().height + document.getElementById("wordscloud").getBoundingClientRect().top;
const nav = document.getElementsByTagName("nav")[0].getBoundingClientRect().height;

const handleScroll = () => {
	topScroll = window.pageYOffset;
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


