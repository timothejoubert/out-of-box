import {
  randomRange,
  normalize,
  mapRange,
  clamp,
} from "../utils/Math-Utils.js";
class WordCloud {
  constructor() {
    (this.mouseX = 0.0), (this.mouseY = 0.0);
    this.blurRate = 0.92;
    this.pageX = window.innerWidth * 0.5;
    this.pageY = window.innerHeight * 0.5;
    this.time = 0;

    this.minSize = window.innerWidth > 700 ? 3 : 1;
    this.maxSize = window.innerWidth > 700 ? 8 : 3;
    this.blurScale = window.innerWidth > 700 ? 2 : 0.0;

    this.words = [...document.querySelectorAll(".container-words_cloud h4")];
  }

  init() {
    this.words.map((word, i) => {
      let fontS = randomRange(this.minSize, this.maxSize);
      let weight = randomRange(100, 900);
      let width = randomRange(60, 160);
      const pct = clamp(
        normalize(fontS, this.minSize * 1.25, this.maxSize * 0.75),
        0.0,
        1.0,
      );

      word.style.zIndex = 1 + Math.ceil((1.0 - pct) * this.words.length);
      word.style.filter = "blur(" + Math.ceil(pct * this.blurScale) + "px)";
      word.style.opacity = 1.0;
      word.style.fontSize = `${fontS}rem`;
      word.style.fontVariationSettings = `'wght' ${weight}, 'wdth' ${width}`;
    });

    document.getElementById("wordscloud").addEventListener(
      "touchmove",
      (e) => {
        this.setPagePos(e);
      },
      false,
    );

    document.getElementById("wordscloud").addEventListener("mousemove", (e) => {
      this.setPagePos(e);
    });

    this.animate();
  }

  setPagePos(event) {
    this.pageX = event.layerX ? window.innerWidth - event.layerX : event.pageX;
    this.pageY = event.layerY ? event.layerY : event.pageY;
  }

  animate() {
    this.mouseX =
      this.blurRate * this.mouseX + (1.0 - this.blurRate) * this.pageX;
    this.mouseY =
      this.blurRate * this.mouseY + (1.0 - this.blurRate) * this.pageY;

    this.time++;

    this.words.map((word, i) => {
      const scale = 16.0;

      let size = parseFloat(word.style.fontSize) * scale;
      const pct = normalize(size / scale, this.minSize, this.maxSize);
      const cosPct = 0.5 + Math.cos(this.time * 0.008 + i) * 0.5;
      const col = (0.25 + pct * cosPct * 0.75) * 255;
      word.style.color = "rgb(" + col + "," + col + "," + col + ")";

      //word.style.filter = "blur(" + (0.1 + (1.0 - pct) * 2) + "px)";

      word.style.transform = `translate(
		${mapRange(
      (this.mouseX / window.innerWidth) * 1.5,
      0,
      1,
      10 + size,
      10 - size,
    ).toFixed(2)}px,
		${mapRange(
      this.mouseY / window.innerHeight,
      0,
      1,
      10 + size,
      10 - size,
    ).toFixed(2)}px
		)`;
    });

    requestAnimationFrame(() => {
      this.animate();
    });
  }
}

export default WordCloud;
