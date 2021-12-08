// import SimpleLightbox from "./simple-lightbox.esm";

var lightbox = new SimpleLightbox('.container-project_item a', { 
	// nav: false
	captionSelector: "self",
});

// const openEls = document.querySelectorAll("[data-open]");
// const closeEls = document.querySelectorAll("[data-close]");
// const isVisible = "is-visible";

// for (const el of openEls) {
//   el.addEventListener("click", function() {
// 	  if(!document.getElementsByTagName("body")[0].classList.contains("no-scroll")){
// 		const modalId = this.dataset.open;
// 		document.getElementById(modalId).classList.add(isVisible);
// 		document.getElementsByTagName("body")[0].classList.add("no-scroll");
// 	  }
//   });
// }

// for (const el of closeEls) {
//   el.addEventListener("click", function() {
//     this.parentElement.parentElement.parentElement.classList.remove(isVisible);
// 	document.getElementsByTagName("body")[0].classList.remove("no-scroll");
//   });
// }

// document.addEventListener("click", e => {
// 	console.log(e.target, e.target !== document.querySelector(".modal.is-visible"));
//   if (e.target !== document.querySelector(".modal.is-visible") && !e.target.matches(".container-project_item, .container-project_item *")) {
// 	  console.log("close nav")
//     document.querySelector(".modal.is-visible").classList.remove(isVisible);
// 	document.getElementsByTagName("body")[0].classList.remove("no-scroll");
//   }
// });

// document.addEventListener("keyup", e => {
//   // if we press the ESC
//   if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
//     document.querySelector(".modal.is-visible").classList.remove(isVisible);
// 	document.getElementsByTagName("body")[0].classList.remove("no-scroll");
//   }
// });