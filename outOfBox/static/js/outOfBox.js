

var topScroll = window.pageYOffset || document.documentElement.scrollTop;

const header = document.getElementById("accueil").getBoundingClientRect().height;
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