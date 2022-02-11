class Marquee {
  constructor(selector, index) {
    this.parentSelector = selector;
    this.clone = this.parentSelector.innerHTML;
    this.firstElement = this.parentSelector.children[0];
    this.index = index;
    const speed = parseFloat(this.parentSelector.getAttribute("data-speed"));
    typeof speed == "number" ? (this.speed = speed) : (this.speed = 1.5);
    this.i = 0;
    this.stopMove = false;
    this.parentSelector.insertAdjacentHTML("beforeend", this.clone);
    this.parentSelector.insertAdjacentHTML("beforeend", this.clone);
    this.parentSelector.addEventListener("mouseenter", () => {
      this.stopMove = true;
      this.parentSelector.style.transition = "none";
    });
    this.parentSelector.addEventListener("mouseleave", () => {
      this.stopMove = false;
    });

    this.step();
  }
  step() {
    this.index % 2
      ? (this.parentSelector.style.transform = `translateX(-${this.i}px)`)
      : (this.parentSelector.style.transform = `translateX(${
          this.i - this.firstElement.clientWidth
        }px)`);
    if (this.i > this.firstElement.clientWidth * 2) {
      this.i = 0;
    }
    this.stopMove ? (this.i = this.i) : (this.i = this.i + this.speed);

    window.requestAnimationFrame(this.step.bind(this));
  }
}

export default Marquee;
