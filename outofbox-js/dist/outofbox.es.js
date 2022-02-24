var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Marquee {
  constructor(selector, index2) {
    this.parentSelector = selector;
    this.clone = this.parentSelector.innerHTML;
    this.firstElement = this.parentSelector.children[0];
    this.index = index2;
    const speed = parseFloat(this.parentSelector.getAttribute("data-speed"));
    typeof speed == "number" ? this.speed = speed : this.speed = 1.5;
    this.i = 0;
    this.parentSelector.insertAdjacentHTML("beforeend", this.clone);
    this.parentSelector.insertAdjacentHTML("beforeend", this.clone);
    this.step();
  }
  step() {
    this.index % 2 ? this.parentSelector.style.transform = `translateX(-${this.i}px)` : this.parentSelector.style.transform = `translateX(${this.i - this.firstElement.clientWidth}px)`;
    if (this.i > this.firstElement.clientWidth * 2) {
      this.i = 0;
    }
    this.i += this.speed;
    window.requestAnimationFrame(this.step.bind(this));
  }
}
class Reveal {
  constructor() {
  }
  init() {
    const firstLine = document.querySelector(".firstline h2");
    const secondline = document.querySelectorAll(".secondline h2");
    secondline.forEach((el) => {
      this.spanConverter(el);
    });
    this.spanConverter(firstLine);
    const loaderWp = document.querySelector("#loader_logo");
    loaderWp.classList.add("start");
    this.nodesReveal = document.querySelectorAll(".reveal");
    this.startLoad();
    setTimeout(() => {
      this.reveal();
    }, 1e3);
    window.addEventListener("scroll", (e) => {
      this.reveal(e);
    });
  }
  spanConverter(container) {
    if (!container)
      return;
    const [...letters] = container == null ? void 0 : container.innerHTML;
    container.innerHTML = "";
    letters.forEach((letter, i) => {
      const span = document.createElement("span");
      if (/\s/.test(letter)) {
        span.style.setProperty("--space", 1);
      }
      span.classList.add("reveal-delay");
      span.style.transitionDelay = i * 30 + "ms";
      span.innerHTML = letter;
      container.appendChild(span);
    });
  }
  startLoad() {
    setTimeout(() => {
      const loaderWp = document.querySelector("#loader_logo");
      loaderWp.classList.remove("start");
      this.videoAnimEnd();
    }, 1e3);
  }
  videoAnimEnd() {
    const video = document.querySelector(".carousel-container video");
    if (window.innerWidth > 700) {
      video.play().then(() => {
        console.log("video is playing");
      }).catch((error) => {
        console.log("error, video is not playing " + error);
      });
    }
    document.querySelector(".reseaux-icon").style.opacity = 1;
    document.querySelector("#main-container").classList.add("loading_stop");
    const firstLine = document.querySelector(".firstline h2");
    firstLine == null ? void 0 : firstLine.classList.add("reveal-visible");
    const secondline = document.querySelectorAll(".secondline h2");
    secondline.forEach((el) => {
      el.classList.add("reveal-visible");
    });
    document.getElementsByTagName("body")[0].classList.remove("no_scroll");
    document.querySelector(".btn_mute").classList.remove("hide-mute");
  }
  reveal(e) {
    const reveals = this.nodesReveal;
    reveals.forEach((el) => {
      var windowHeight = window.innerHeight;
      var revealPoint = 30;
      var revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - revealPoint) {
        el.classList.add("reveal-visible");
      } else {
        el.classList.remove("reveal-visible");
      }
      const childsDelay = document.querySelectorAll(".reveal-delay");
      if (childsDelay.length > 0) {
        childsDelay.forEach((child, i) => {
          const delay = el.getAttribute("child-delay");
          child.style.transitionDelay = i * delay + "ms";
        });
      }
    });
  }
}
function isObject$1(e) {
  return e !== null && typeof e == "object" && "constructor" in e && e.constructor === Object;
}
function extend$1(e = {}, t = {}) {
  Object.keys(t).forEach((s) => {
    e[s] === void 0 ? e[s] = t[s] : isObject$1(t[s]) && isObject$1(e[s]) && Object.keys(t[s]).length > 0 && extend$1(e[s], t[s]);
  });
}
const ssrDocument = { body: {}, addEventListener() {
}, removeEventListener() {
}, activeElement: { blur() {
}, nodeName: "" }, querySelector: () => null, querySelectorAll: () => [], getElementById: () => null, createEvent: () => ({ initEvent() {
} }), createElement: () => ({ children: [], childNodes: [], style: {}, setAttribute() {
}, getElementsByTagName: () => [] }), createElementNS: () => ({}), importNode: () => null, location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" } };
function getDocument() {
  const e = typeof document != "undefined" ? document : {};
  return extend$1(e, ssrDocument), e;
}
const ssrWindow = { document: ssrDocument, navigator: { userAgent: "" }, location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" }, history: { replaceState() {
}, pushState() {
}, go() {
}, back() {
} }, CustomEvent: function() {
  return this;
}, addEventListener() {
}, removeEventListener() {
}, getComputedStyle: () => ({ getPropertyValue: () => "" }), Image() {
}, Date() {
}, screen: {}, setTimeout() {
}, clearTimeout() {
}, matchMedia: () => ({}), requestAnimationFrame: (e) => typeof setTimeout == "undefined" ? (e(), null) : setTimeout(e, 0), cancelAnimationFrame(e) {
  typeof setTimeout != "undefined" && clearTimeout(e);
} };
function getWindow() {
  const e = typeof window != "undefined" ? window : {};
  return extend$1(e, ssrWindow), e;
}
function makeReactive(e) {
  const t = e.__proto__;
  Object.defineProperty(e, "__proto__", { get: () => t, set(e2) {
    t.__proto__ = e2;
  } });
}
class Dom7 extends Array {
  constructor(e) {
    super(...e || []), makeReactive(this);
  }
}
function arrayFlat(e = []) {
  const t = [];
  return e.forEach((e2) => {
    Array.isArray(e2) ? t.push(...arrayFlat(e2)) : t.push(e2);
  }), t;
}
function arrayFilter(e, t) {
  return Array.prototype.filter.call(e, t);
}
function arrayUnique(e) {
  const t = [];
  for (let s = 0; s < e.length; s += 1)
    t.indexOf(e[s]) === -1 && t.push(e[s]);
  return t;
}
function qsa(e, t) {
  if (typeof e != "string")
    return [e];
  const s = [], a = t.querySelectorAll(e);
  for (let e2 = 0; e2 < a.length; e2 += 1)
    s.push(a[e2]);
  return s;
}
function $(e, t) {
  const s = getWindow(), a = getDocument();
  let i = [];
  if (!t && e instanceof Dom7)
    return e;
  if (!e)
    return new Dom7(i);
  if (typeof e == "string") {
    const s2 = e.trim();
    if (s2.indexOf("<") >= 0 && s2.indexOf(">") >= 0) {
      let e2 = "div";
      s2.indexOf("<li") === 0 && (e2 = "ul"), s2.indexOf("<tr") === 0 && (e2 = "tbody"), s2.indexOf("<td") !== 0 && s2.indexOf("<th") !== 0 || (e2 = "tr"), s2.indexOf("<tbody") === 0 && (e2 = "table"), s2.indexOf("<option") === 0 && (e2 = "select");
      const t2 = a.createElement(e2);
      t2.innerHTML = s2;
      for (let e3 = 0; e3 < t2.childNodes.length; e3 += 1)
        i.push(t2.childNodes[e3]);
    } else
      i = qsa(e.trim(), t || a);
  } else if (e.nodeType || e === s || e === a)
    i.push(e);
  else if (Array.isArray(e)) {
    if (e instanceof Dom7)
      return e;
    i = e;
  }
  return new Dom7(arrayUnique(i));
}
function addClass(...e) {
  const t = arrayFlat(e.map((e2) => e2.split(" ")));
  return this.forEach((e2) => {
    e2.classList.add(...t);
  }), this;
}
function removeClass(...e) {
  const t = arrayFlat(e.map((e2) => e2.split(" ")));
  return this.forEach((e2) => {
    e2.classList.remove(...t);
  }), this;
}
function toggleClass(...e) {
  const t = arrayFlat(e.map((e2) => e2.split(" ")));
  this.forEach((e2) => {
    t.forEach((t2) => {
      e2.classList.toggle(t2);
    });
  });
}
function hasClass(...e) {
  const t = arrayFlat(e.map((e2) => e2.split(" ")));
  return arrayFilter(this, (e2) => t.filter((t2) => e2.classList.contains(t2)).length > 0).length > 0;
}
function attr(e, t) {
  if (arguments.length === 1 && typeof e == "string")
    return this[0] ? this[0].getAttribute(e) : void 0;
  for (let s = 0; s < this.length; s += 1)
    if (arguments.length === 2)
      this[s].setAttribute(e, t);
    else
      for (const t2 in e)
        this[s][t2] = e[t2], this[s].setAttribute(t2, e[t2]);
  return this;
}
function removeAttr(e) {
  for (let t = 0; t < this.length; t += 1)
    this[t].removeAttribute(e);
  return this;
}
function transform(e) {
  for (let t = 0; t < this.length; t += 1)
    this[t].style.transform = e;
  return this;
}
function transition$1(e) {
  for (let t = 0; t < this.length; t += 1)
    this[t].style.transitionDuration = typeof e != "string" ? `${e}ms` : e;
  return this;
}
function on(...e) {
  let [t, s, a, i] = e;
  function r(e2) {
    const t2 = e2.target;
    if (!t2)
      return;
    const i2 = e2.target.dom7EventData || [];
    if (i2.indexOf(e2) < 0 && i2.unshift(e2), $(t2).is(s))
      a.apply(t2, i2);
    else {
      const e3 = $(t2).parents();
      for (let t3 = 0; t3 < e3.length; t3 += 1)
        $(e3[t3]).is(s) && a.apply(e3[t3], i2);
    }
  }
  function n(e2) {
    const t2 = e2 && e2.target && e2.target.dom7EventData || [];
    t2.indexOf(e2) < 0 && t2.unshift(e2), a.apply(this, t2);
  }
  typeof e[1] == "function" && ([t, a, i] = e, s = void 0), i || (i = false);
  const l = t.split(" ");
  let o;
  for (let e2 = 0; e2 < this.length; e2 += 1) {
    const t2 = this[e2];
    if (s)
      for (o = 0; o < l.length; o += 1) {
        const e3 = l[o];
        t2.dom7LiveListeners || (t2.dom7LiveListeners = {}), t2.dom7LiveListeners[e3] || (t2.dom7LiveListeners[e3] = []), t2.dom7LiveListeners[e3].push({ listener: a, proxyListener: r }), t2.addEventListener(e3, r, i);
      }
    else
      for (o = 0; o < l.length; o += 1) {
        const e3 = l[o];
        t2.dom7Listeners || (t2.dom7Listeners = {}), t2.dom7Listeners[e3] || (t2.dom7Listeners[e3] = []), t2.dom7Listeners[e3].push({ listener: a, proxyListener: n }), t2.addEventListener(e3, n, i);
      }
  }
  return this;
}
function off(...e) {
  let [t, s, a, i] = e;
  typeof e[1] == "function" && ([t, a, i] = e, s = void 0), i || (i = false);
  const r = t.split(" ");
  for (let e2 = 0; e2 < r.length; e2 += 1) {
    const t2 = r[e2];
    for (let e3 = 0; e3 < this.length; e3 += 1) {
      const r2 = this[e3];
      let n;
      if (!s && r2.dom7Listeners ? n = r2.dom7Listeners[t2] : s && r2.dom7LiveListeners && (n = r2.dom7LiveListeners[t2]), n && n.length)
        for (let e4 = n.length - 1; e4 >= 0; e4 -= 1) {
          const s2 = n[e4];
          a && s2.listener === a || a && s2.listener && s2.listener.dom7proxy && s2.listener.dom7proxy === a ? (r2.removeEventListener(t2, s2.proxyListener, i), n.splice(e4, 1)) : a || (r2.removeEventListener(t2, s2.proxyListener, i), n.splice(e4, 1));
        }
    }
  }
  return this;
}
function trigger(...e) {
  const t = getWindow(), s = e[0].split(" "), a = e[1];
  for (let i = 0; i < s.length; i += 1) {
    const r = s[i];
    for (let s2 = 0; s2 < this.length; s2 += 1) {
      const i2 = this[s2];
      if (t.CustomEvent) {
        const s3 = new t.CustomEvent(r, { detail: a, bubbles: true, cancelable: true });
        i2.dom7EventData = e.filter((e2, t2) => t2 > 0), i2.dispatchEvent(s3), i2.dom7EventData = [], delete i2.dom7EventData;
      }
    }
  }
  return this;
}
function transitionEnd$1(e) {
  const t = this;
  return e && t.on("transitionend", function s(a) {
    a.target === this && (e.call(this, a), t.off("transitionend", s));
  }), this;
}
function outerWidth(e) {
  if (this.length > 0) {
    if (e) {
      const e2 = this.styles();
      return this[0].offsetWidth + parseFloat(e2.getPropertyValue("margin-right")) + parseFloat(e2.getPropertyValue("margin-left"));
    }
    return this[0].offsetWidth;
  }
  return null;
}
function outerHeight(e) {
  if (this.length > 0) {
    if (e) {
      const e2 = this.styles();
      return this[0].offsetHeight + parseFloat(e2.getPropertyValue("margin-top")) + parseFloat(e2.getPropertyValue("margin-bottom"));
    }
    return this[0].offsetHeight;
  }
  return null;
}
function offset() {
  if (this.length > 0) {
    const e = getWindow(), t = getDocument(), s = this[0], a = s.getBoundingClientRect(), i = t.body, r = s.clientTop || i.clientTop || 0, n = s.clientLeft || i.clientLeft || 0, l = s === e ? e.scrollY : s.scrollTop, o = s === e ? e.scrollX : s.scrollLeft;
    return { top: a.top + l - r, left: a.left + o - n };
  }
  return null;
}
function styles() {
  const e = getWindow();
  return this[0] ? e.getComputedStyle(this[0], null) : {};
}
function css(e, t) {
  const s = getWindow();
  let a;
  if (arguments.length === 1) {
    if (typeof e != "string") {
      for (a = 0; a < this.length; a += 1)
        for (const t2 in e)
          this[a].style[t2] = e[t2];
      return this;
    }
    if (this[0])
      return s.getComputedStyle(this[0], null).getPropertyValue(e);
  }
  if (arguments.length === 2 && typeof e == "string") {
    for (a = 0; a < this.length; a += 1)
      this[a].style[e] = t;
    return this;
  }
  return this;
}
function each(e) {
  return e ? (this.forEach((t, s) => {
    e.apply(t, [t, s]);
  }), this) : this;
}
function filter(e) {
  return $(arrayFilter(this, e));
}
function html(e) {
  if (e === void 0)
    return this[0] ? this[0].innerHTML : null;
  for (let t = 0; t < this.length; t += 1)
    this[t].innerHTML = e;
  return this;
}
function text(e) {
  if (e === void 0)
    return this[0] ? this[0].textContent.trim() : null;
  for (let t = 0; t < this.length; t += 1)
    this[t].textContent = e;
  return this;
}
function is(e) {
  const t = getWindow(), s = getDocument(), a = this[0];
  let i, r;
  if (!a || e === void 0)
    return false;
  if (typeof e == "string") {
    if (a.matches)
      return a.matches(e);
    if (a.webkitMatchesSelector)
      return a.webkitMatchesSelector(e);
    if (a.msMatchesSelector)
      return a.msMatchesSelector(e);
    for (i = $(e), r = 0; r < i.length; r += 1)
      if (i[r] === a)
        return true;
    return false;
  }
  if (e === s)
    return a === s;
  if (e === t)
    return a === t;
  if (e.nodeType || e instanceof Dom7) {
    for (i = e.nodeType ? [e] : e, r = 0; r < i.length; r += 1)
      if (i[r] === a)
        return true;
    return false;
  }
  return false;
}
function index() {
  let e, t = this[0];
  if (t) {
    for (e = 0; (t = t.previousSibling) !== null; )
      t.nodeType === 1 && (e += 1);
    return e;
  }
}
function eq(e) {
  if (e === void 0)
    return this;
  const t = this.length;
  if (e > t - 1)
    return $([]);
  if (e < 0) {
    const s = t + e;
    return $(s < 0 ? [] : [this[s]]);
  }
  return $([this[e]]);
}
function append(...e) {
  let t;
  const s = getDocument();
  for (let a = 0; a < e.length; a += 1) {
    t = e[a];
    for (let e2 = 0; e2 < this.length; e2 += 1)
      if (typeof t == "string") {
        const a2 = s.createElement("div");
        for (a2.innerHTML = t; a2.firstChild; )
          this[e2].appendChild(a2.firstChild);
      } else if (t instanceof Dom7)
        for (let s2 = 0; s2 < t.length; s2 += 1)
          this[e2].appendChild(t[s2]);
      else
        this[e2].appendChild(t);
  }
  return this;
}
function prepend(e) {
  const t = getDocument();
  let s, a;
  for (s = 0; s < this.length; s += 1)
    if (typeof e == "string") {
      const i = t.createElement("div");
      for (i.innerHTML = e, a = i.childNodes.length - 1; a >= 0; a -= 1)
        this[s].insertBefore(i.childNodes[a], this[s].childNodes[0]);
    } else if (e instanceof Dom7)
      for (a = 0; a < e.length; a += 1)
        this[s].insertBefore(e[a], this[s].childNodes[0]);
    else
      this[s].insertBefore(e, this[s].childNodes[0]);
  return this;
}
function next(e) {
  return this.length > 0 ? e ? this[0].nextElementSibling && $(this[0].nextElementSibling).is(e) ? $([this[0].nextElementSibling]) : $([]) : this[0].nextElementSibling ? $([this[0].nextElementSibling]) : $([]) : $([]);
}
function nextAll(e) {
  const t = [];
  let s = this[0];
  if (!s)
    return $([]);
  for (; s.nextElementSibling; ) {
    const a = s.nextElementSibling;
    e ? $(a).is(e) && t.push(a) : t.push(a), s = a;
  }
  return $(t);
}
function prev(e) {
  if (this.length > 0) {
    const t = this[0];
    return e ? t.previousElementSibling && $(t.previousElementSibling).is(e) ? $([t.previousElementSibling]) : $([]) : t.previousElementSibling ? $([t.previousElementSibling]) : $([]);
  }
  return $([]);
}
function prevAll(e) {
  const t = [];
  let s = this[0];
  if (!s)
    return $([]);
  for (; s.previousElementSibling; ) {
    const a = s.previousElementSibling;
    e ? $(a).is(e) && t.push(a) : t.push(a), s = a;
  }
  return $(t);
}
function parent(e) {
  const t = [];
  for (let s = 0; s < this.length; s += 1)
    this[s].parentNode !== null && (e ? $(this[s].parentNode).is(e) && t.push(this[s].parentNode) : t.push(this[s].parentNode));
  return $(t);
}
function parents(e) {
  const t = [];
  for (let s = 0; s < this.length; s += 1) {
    let a = this[s].parentNode;
    for (; a; )
      e ? $(a).is(e) && t.push(a) : t.push(a), a = a.parentNode;
  }
  return $(t);
}
function closest(e) {
  let t = this;
  return e === void 0 ? $([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
}
function find(e) {
  const t = [];
  for (let s = 0; s < this.length; s += 1) {
    const a = this[s].querySelectorAll(e);
    for (let e2 = 0; e2 < a.length; e2 += 1)
      t.push(a[e2]);
  }
  return $(t);
}
function children(e) {
  const t = [];
  for (let s = 0; s < this.length; s += 1) {
    const a = this[s].children;
    for (let s2 = 0; s2 < a.length; s2 += 1)
      e && !$(a[s2]).is(e) || t.push(a[s2]);
  }
  return $(t);
}
function remove() {
  for (let e = 0; e < this.length; e += 1)
    this[e].parentNode && this[e].parentNode.removeChild(this[e]);
  return this;
}
$.fn = Dom7.prototype;
const Methods = { addClass, removeClass, hasClass, toggleClass, attr, removeAttr, transform, transition: transition$1, on, off, trigger, transitionEnd: transitionEnd$1, outerWidth, outerHeight, styles, offset, css, each, html, text, is, index, eq, append, prepend, next, nextAll, prev, prevAll, parent, parents, closest, find, children, filter, remove };
function deleteProps(e) {
  const t = e;
  Object.keys(t).forEach((e2) => {
    try {
      t[e2] = null;
    } catch (e3) {
    }
    try {
      delete t[e2];
    } catch (e3) {
    }
  });
}
function nextTick(e, t = 0) {
  return setTimeout(e, t);
}
function now() {
  return Date.now();
}
function getComputedStyle$1(e) {
  const t = getWindow();
  let s;
  return t.getComputedStyle && (s = t.getComputedStyle(e, null)), !s && e.currentStyle && (s = e.currentStyle), s || (s = e.style), s;
}
function getTranslate(e, t = "x") {
  const s = getWindow();
  let a, i, r;
  const n = getComputedStyle$1(e);
  return s.WebKitCSSMatrix ? (i = n.transform || n.webkitTransform, i.split(",").length > 6 && (i = i.split(", ").map((e2) => e2.replace(",", ".")).join(", ")), r = new s.WebKitCSSMatrix(i === "none" ? "" : i)) : (r = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), a = r.toString().split(",")), t === "x" && (i = s.WebKitCSSMatrix ? r.m41 : a.length === 16 ? parseFloat(a[12]) : parseFloat(a[4])), t === "y" && (i = s.WebKitCSSMatrix ? r.m42 : a.length === 16 ? parseFloat(a[13]) : parseFloat(a[5])), i || 0;
}
function isObject(e) {
  return typeof e == "object" && e !== null && e.constructor && Object.prototype.toString.call(e).slice(8, -1) === "Object";
}
function isNode(e) {
  return typeof window != "undefined" && window.HTMLElement !== void 0 ? e instanceof HTMLElement : e && (e.nodeType === 1 || e.nodeType === 11);
}
function extend(...e) {
  const t = Object(e[0]), s = ["__proto__", "constructor", "prototype"];
  for (let a = 1; a < e.length; a += 1) {
    const i = e[a];
    if (i != null && !isNode(i)) {
      const e2 = Object.keys(Object(i)).filter((e3) => s.indexOf(e3) < 0);
      for (let s2 = 0, a2 = e2.length; s2 < a2; s2 += 1) {
        const a3 = e2[s2], r = Object.getOwnPropertyDescriptor(i, a3);
        r !== void 0 && r.enumerable && (isObject(t[a3]) && isObject(i[a3]) ? i[a3].__swiper__ ? t[a3] = i[a3] : extend(t[a3], i[a3]) : !isObject(t[a3]) && isObject(i[a3]) ? (t[a3] = {}, i[a3].__swiper__ ? t[a3] = i[a3] : extend(t[a3], i[a3])) : t[a3] = i[a3]);
      }
    }
  }
  return t;
}
function setCSSProperty(e, t, s) {
  e.style.setProperty(t, s);
}
function animateCSSModeScroll({ swiper: e, targetPosition: t, side: s }) {
  const a = getWindow(), i = -e.translate;
  let r, n = null;
  const l = e.params.speed;
  e.wrapperEl.style.scrollSnapType = "none", a.cancelAnimationFrame(e.cssModeFrameID);
  const o = t > i ? "next" : "prev", d = (e2, t2) => o === "next" && e2 >= t2 || o === "prev" && e2 <= t2, c = () => {
    r = new Date().getTime(), n === null && (n = r);
    const o2 = Math.max(Math.min((r - n) / l, 1), 0), p = 0.5 - Math.cos(o2 * Math.PI) / 2;
    let u = i + p * (t - i);
    if (d(u, t) && (u = t), e.wrapperEl.scrollTo({ [s]: u }), d(u, t))
      return e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
        e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({ [s]: u });
      }), void a.cancelAnimationFrame(e.cssModeFrameID);
    e.cssModeFrameID = a.requestAnimationFrame(c);
  };
  c();
}
let support, deviceCached, browser;
function calcSupport() {
  const e = getWindow(), t = getDocument();
  return { smoothScroll: t.documentElement && "scrollBehavior" in t.documentElement.style, touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch), passiveListener: function() {
    let t2 = false;
    try {
      const s = Object.defineProperty({}, "passive", { get() {
        t2 = true;
      } });
      e.addEventListener("testPassiveListener", null, s);
    } catch (e2) {
    }
    return t2;
  }(), gestures: "ongesturestart" in e };
}
function getSupport() {
  return support || (support = calcSupport()), support;
}
function calcDevice({ userAgent: e } = {}) {
  const t = getSupport(), s = getWindow(), a = s.navigator.platform, i = e || s.navigator.userAgent, r = { ios: false, android: false }, n = s.screen.width, l = s.screen.height, o = i.match(/(Android);?[\s\/]+([\d.]+)?/);
  let d = i.match(/(iPad).*OS\s([\d_]+)/);
  const c = i.match(/(iPod)(.*OS\s([\d_]+))?/), p = !d && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/), u = a === "Win32";
  let h = a === "MacIntel";
  return !d && h && t.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${n}x${l}`) >= 0 && (d = i.match(/(Version)\/([\d.]+)/), d || (d = [0, 1, "13_0_0"]), h = false), o && !u && (r.os = "android", r.android = true), (d || p || c) && (r.os = "ios", r.ios = true), r;
}
function getDevice(e = {}) {
  return deviceCached || (deviceCached = calcDevice(e)), deviceCached;
}
function calcBrowser() {
  const e = getWindow();
  return { isSafari: function() {
    const t = e.navigator.userAgent.toLowerCase();
    return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0;
  }(), isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent) };
}
function getBrowser() {
  return browser || (browser = calcBrowser()), browser;
}
function Resize({ swiper: e, on: t, emit: s }) {
  const a = getWindow();
  let i = null;
  const r = () => {
    e && !e.destroyed && e.initialized && (s("beforeResize"), s("resize"));
  }, n = () => {
    e && !e.destroyed && e.initialized && s("orientationchange");
  };
  t("init", () => {
    e.params.resizeObserver && a.ResizeObserver !== void 0 ? e && !e.destroyed && e.initialized && (i = new ResizeObserver((t2) => {
      const { width: s2, height: a2 } = e;
      let i2 = s2, n2 = a2;
      t2.forEach(({ contentBoxSize: t3, contentRect: s3, target: a3 }) => {
        a3 && a3 !== e.el || (i2 = s3 ? s3.width : (t3[0] || t3).inlineSize, n2 = s3 ? s3.height : (t3[0] || t3).blockSize);
      }), i2 === s2 && n2 === a2 || r();
    }), i.observe(e.el)) : (a.addEventListener("resize", r), a.addEventListener("orientationchange", n));
  }), t("destroy", () => {
    i && i.unobserve && e.el && (i.unobserve(e.el), i = null), a.removeEventListener("resize", r), a.removeEventListener("orientationchange", n);
  });
}
function Observer({ swiper: e, extendParams: t, on: s, emit: a }) {
  const i = [], r = getWindow(), n = (e2, t2 = {}) => {
    const s2 = new (r.MutationObserver || r.WebkitMutationObserver)((e3) => {
      if (e3.length === 1)
        return void a("observerUpdate", e3[0]);
      const t3 = function() {
        a("observerUpdate", e3[0]);
      };
      r.requestAnimationFrame ? r.requestAnimationFrame(t3) : r.setTimeout(t3, 0);
    });
    s2.observe(e2, { attributes: t2.attributes === void 0 || t2.attributes, childList: t2.childList === void 0 || t2.childList, characterData: t2.characterData === void 0 || t2.characterData }), i.push(s2);
  };
  t({ observer: false, observeParents: false, observeSlideChildren: false }), s("init", () => {
    if (e.params.observer) {
      if (e.params.observeParents) {
        const t2 = e.$el.parents();
        for (let e2 = 0; e2 < t2.length; e2 += 1)
          n(t2[e2]);
      }
      n(e.$el[0], { childList: e.params.observeSlideChildren }), n(e.$wrapperEl[0], { attributes: false });
    }
  }), s("destroy", () => {
    i.forEach((e2) => {
      e2.disconnect();
    }), i.splice(0, i.length);
  });
}
Object.keys(Methods).forEach((e) => {
  Object.defineProperty($.fn, e, { value: Methods[e], writable: true });
});
var eventsEmitter = { on(e, t, s) {
  const a = this;
  if (typeof t != "function")
    return a;
  const i = s ? "unshift" : "push";
  return e.split(" ").forEach((e2) => {
    a.eventsListeners[e2] || (a.eventsListeners[e2] = []), a.eventsListeners[e2][i](t);
  }), a;
}, once(e, t, s) {
  const a = this;
  if (typeof t != "function")
    return a;
  function i(...s2) {
    a.off(e, i), i.__emitterProxy && delete i.__emitterProxy, t.apply(a, s2);
  }
  return i.__emitterProxy = t, a.on(e, i, s);
}, onAny(e, t) {
  const s = this;
  if (typeof e != "function")
    return s;
  const a = t ? "unshift" : "push";
  return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[a](e), s;
}, offAny(e) {
  const t = this;
  if (!t.eventsAnyListeners)
    return t;
  const s = t.eventsAnyListeners.indexOf(e);
  return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
}, off(e, t) {
  const s = this;
  return s.eventsListeners ? (e.split(" ").forEach((e2) => {
    t === void 0 ? s.eventsListeners[e2] = [] : s.eventsListeners[e2] && s.eventsListeners[e2].forEach((a, i) => {
      (a === t || a.__emitterProxy && a.__emitterProxy === t) && s.eventsListeners[e2].splice(i, 1);
    });
  }), s) : s;
}, emit(...e) {
  const t = this;
  if (!t.eventsListeners)
    return t;
  let s, a, i;
  typeof e[0] == "string" || Array.isArray(e[0]) ? (s = e[0], a = e.slice(1, e.length), i = t) : (s = e[0].events, a = e[0].data, i = e[0].context || t), a.unshift(i);
  return (Array.isArray(s) ? s : s.split(" ")).forEach((e2) => {
    t.eventsAnyListeners && t.eventsAnyListeners.length && t.eventsAnyListeners.forEach((t2) => {
      t2.apply(i, [e2, ...a]);
    }), t.eventsListeners && t.eventsListeners[e2] && t.eventsListeners[e2].forEach((e3) => {
      e3.apply(i, a);
    });
  }), t;
} };
function updateSize() {
  const e = this;
  let t, s;
  const a = e.$el;
  t = e.params.width !== void 0 && e.params.width !== null ? e.params.width : a[0].clientWidth, s = e.params.height !== void 0 && e.params.height !== null ? e.params.height : a[0].clientHeight, t === 0 && e.isHorizontal() || s === 0 && e.isVertical() || (t = t - parseInt(a.css("padding-left") || 0, 10) - parseInt(a.css("padding-right") || 0, 10), s = s - parseInt(a.css("padding-top") || 0, 10) - parseInt(a.css("padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(s) && (s = 0), Object.assign(e, { width: t, height: s, size: e.isHorizontal() ? t : s }));
}
function updateSlides() {
  const e = this;
  function t(t2) {
    return e.isHorizontal() ? t2 : { width: "height", "margin-top": "margin-left", "margin-bottom ": "margin-right", "margin-left": "margin-top", "margin-right": "margin-bottom", "padding-left": "padding-top", "padding-right": "padding-bottom", marginRight: "marginBottom" }[t2];
  }
  function s(e2, s2) {
    return parseFloat(e2.getPropertyValue(t(s2)) || 0);
  }
  const a = e.params, { $wrapperEl: i, size: r, rtlTranslate: n, wrongRTL: l } = e, o = e.virtual && a.virtual.enabled, d = o ? e.virtual.slides.length : e.slides.length, c = i.children(`.${e.params.slideClass}`), p = o ? e.virtual.slides.length : c.length;
  let u = [];
  const h = [], m = [];
  let f = a.slidesOffsetBefore;
  typeof f == "function" && (f = a.slidesOffsetBefore.call(e));
  let g = a.slidesOffsetAfter;
  typeof g == "function" && (g = a.slidesOffsetAfter.call(e));
  const v = e.snapGrid.length, w = e.slidesGrid.length;
  let b = a.spaceBetween, x = -f, y = 0, E = 0;
  if (r === void 0)
    return;
  typeof b == "string" && b.indexOf("%") >= 0 && (b = parseFloat(b.replace("%", "")) / 100 * r), e.virtualSize = -b, n ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" }) : c.css({ marginRight: "", marginBottom: "", marginTop: "" }), a.centeredSlides && a.cssMode && (setCSSProperty(e.wrapperEl, "--swiper-centered-offset-before", ""), setCSSProperty(e.wrapperEl, "--swiper-centered-offset-after", ""));
  const $2 = a.grid && a.grid.rows > 1 && e.grid;
  let T;
  $2 && e.grid.initSlides(p);
  const S = a.slidesPerView === "auto" && a.breakpoints && Object.keys(a.breakpoints).filter((e2) => a.breakpoints[e2].slidesPerView !== void 0).length > 0;
  for (let i2 = 0; i2 < p; i2 += 1) {
    T = 0;
    const n2 = c.eq(i2);
    if ($2 && e.grid.updateSlide(i2, n2, p, t), n2.css("display") !== "none") {
      if (a.slidesPerView === "auto") {
        S && (c[i2].style[t("width")] = "");
        const r2 = getComputedStyle(n2[0]), l2 = n2[0].style.transform, o2 = n2[0].style.webkitTransform;
        if (l2 && (n2[0].style.transform = "none"), o2 && (n2[0].style.webkitTransform = "none"), a.roundLengths)
          T = e.isHorizontal() ? n2.outerWidth(true) : n2.outerHeight(true);
        else {
          const e2 = s(r2, "width"), t2 = s(r2, "padding-left"), a2 = s(r2, "padding-right"), i3 = s(r2, "margin-left"), l3 = s(r2, "margin-right"), o3 = r2.getPropertyValue("box-sizing");
          if (o3 && o3 === "border-box")
            T = e2 + i3 + l3;
          else {
            const { clientWidth: s2, offsetWidth: r3 } = n2[0];
            T = e2 + t2 + a2 + i3 + l3 + (r3 - s2);
          }
        }
        l2 && (n2[0].style.transform = l2), o2 && (n2[0].style.webkitTransform = o2), a.roundLengths && (T = Math.floor(T));
      } else
        T = (r - (a.slidesPerView - 1) * b) / a.slidesPerView, a.roundLengths && (T = Math.floor(T)), c[i2] && (c[i2].style[t("width")] = `${T}px`);
      c[i2] && (c[i2].swiperSlideSize = T), m.push(T), a.centeredSlides ? (x = x + T / 2 + y / 2 + b, y === 0 && i2 !== 0 && (x = x - r / 2 - b), i2 === 0 && (x = x - r / 2 - b), Math.abs(x) < 1e-3 && (x = 0), a.roundLengths && (x = Math.floor(x)), E % a.slidesPerGroup == 0 && u.push(x), h.push(x)) : (a.roundLengths && (x = Math.floor(x)), (E - Math.min(e.params.slidesPerGroupSkip, E)) % e.params.slidesPerGroup == 0 && u.push(x), h.push(x), x = x + T + b), e.virtualSize += T + b, y = T, E += 1;
    }
  }
  if (e.virtualSize = Math.max(e.virtualSize, r) + g, n && l && (a.effect === "slide" || a.effect === "coverflow") && i.css({ width: `${e.virtualSize + a.spaceBetween}px` }), a.setWrapperSize && i.css({ [t("width")]: `${e.virtualSize + a.spaceBetween}px` }), $2 && e.grid.updateWrapperSize(T, u, t), !a.centeredSlides) {
    const t2 = [];
    for (let s2 = 0; s2 < u.length; s2 += 1) {
      let i2 = u[s2];
      a.roundLengths && (i2 = Math.floor(i2)), u[s2] <= e.virtualSize - r && t2.push(i2);
    }
    u = t2, Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - r);
  }
  if (u.length === 0 && (u = [0]), a.spaceBetween !== 0) {
    const s2 = e.isHorizontal() && n ? "marginLeft" : t("marginRight");
    c.filter((e2, t2) => !a.cssMode || t2 !== c.length - 1).css({ [s2]: `${b}px` });
  }
  if (a.centeredSlides && a.centeredSlidesBounds) {
    let e2 = 0;
    m.forEach((t3) => {
      e2 += t3 + (a.spaceBetween ? a.spaceBetween : 0);
    }), e2 -= a.spaceBetween;
    const t2 = e2 - r;
    u = u.map((e3) => e3 < 0 ? -f : e3 > t2 ? t2 + g : e3);
  }
  if (a.centerInsufficientSlides) {
    let e2 = 0;
    if (m.forEach((t2) => {
      e2 += t2 + (a.spaceBetween ? a.spaceBetween : 0);
    }), e2 -= a.spaceBetween, e2 < r) {
      const t2 = (r - e2) / 2;
      u.forEach((e3, s2) => {
        u[s2] = e3 - t2;
      }), h.forEach((e3, s2) => {
        h[s2] = e3 + t2;
      });
    }
  }
  if (Object.assign(e, { slides: c, snapGrid: u, slidesGrid: h, slidesSizesGrid: m }), a.centeredSlides && a.cssMode && !a.centeredSlidesBounds) {
    setCSSProperty(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"), setCSSProperty(e.wrapperEl, "--swiper-centered-offset-after", e.size / 2 - m[m.length - 1] / 2 + "px");
    const t2 = -e.snapGrid[0], s2 = -e.slidesGrid[0];
    e.snapGrid = e.snapGrid.map((e2) => e2 + t2), e.slidesGrid = e.slidesGrid.map((e2) => e2 + s2);
  }
  p !== d && e.emit("slidesLengthChange"), u.length !== v && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), h.length !== w && e.emit("slidesGridLengthChange"), a.watchSlidesProgress && e.updateSlidesOffset();
}
function updateAutoHeight(e) {
  const t = this, s = [], a = t.virtual && t.params.virtual.enabled;
  let i, r = 0;
  typeof e == "number" ? t.setTransition(e) : e === true && t.setTransition(t.params.speed);
  const n = (e2) => a ? t.slides.filter((t2) => parseInt(t2.getAttribute("data-swiper-slide-index"), 10) === e2)[0] : t.slides.eq(e2)[0];
  if (t.params.slidesPerView !== "auto" && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      t.visibleSlides.each((e2) => {
        s.push(e2);
      });
    else
      for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
        const e2 = t.activeIndex + i;
        if (e2 > t.slides.length && !a)
          break;
        s.push(n(e2));
      }
  else
    s.push(n(t.activeIndex));
  for (i = 0; i < s.length; i += 1)
    if (s[i] !== void 0) {
      const e2 = s[i].offsetHeight;
      r = e2 > r ? e2 : r;
    }
  (r || r === 0) && t.$wrapperEl.css("height", `${r}px`);
}
function updateSlidesOffset() {
  const e = this, t = e.slides;
  for (let s = 0; s < t.length; s += 1)
    t[s].swiperSlideOffset = e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop;
}
function updateSlidesProgress(e = this && this.translate || 0) {
  const t = this, s = t.params, { slides: a, rtlTranslate: i, snapGrid: r } = t;
  if (a.length === 0)
    return;
  a[0].swiperSlideOffset === void 0 && t.updateSlidesOffset();
  let n = -e;
  i && (n = e), a.removeClass(s.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
  for (let e2 = 0; e2 < a.length; e2 += 1) {
    const l = a[e2];
    let o = l.swiperSlideOffset;
    s.cssMode && s.centeredSlides && (o -= a[0].swiperSlideOffset);
    const d = (n + (s.centeredSlides ? t.minTranslate() : 0) - o) / (l.swiperSlideSize + s.spaceBetween), c = (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) / (l.swiperSlideSize + s.spaceBetween), p = -(n - o), u = p + t.slidesSizesGrid[e2];
    (p >= 0 && p < t.size - 1 || u > 1 && u <= t.size || p <= 0 && u >= t.size) && (t.visibleSlides.push(l), t.visibleSlidesIndexes.push(e2), a.eq(e2).addClass(s.slideVisibleClass)), l.progress = i ? -d : d, l.originalProgress = i ? -c : c;
  }
  t.visibleSlides = $(t.visibleSlides);
}
function updateProgress(e) {
  const t = this;
  if (e === void 0) {
    const s2 = t.rtlTranslate ? -1 : 1;
    e = t && t.translate && t.translate * s2 || 0;
  }
  const s = t.params, a = t.maxTranslate() - t.minTranslate();
  let { progress: i, isBeginning: r, isEnd: n } = t;
  const l = r, o = n;
  a === 0 ? (i = 0, r = true, n = true) : (i = (e - t.minTranslate()) / a, r = i <= 0, n = i >= 1), Object.assign(t, { progress: i, isBeginning: r, isEnd: n }), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e), r && !l && t.emit("reachBeginning toEdge"), n && !o && t.emit("reachEnd toEdge"), (l && !r || o && !n) && t.emit("fromEdge"), t.emit("progress", i);
}
function updateSlidesClasses() {
  const e = this, { slides: t, params: s, $wrapperEl: a, activeIndex: i, realIndex: r } = e, n = e.virtual && s.virtual.enabled;
  let l;
  t.removeClass(`${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`), l = n ? e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${i}"]`) : t.eq(i), l.addClass(s.slideActiveClass), s.loop && (l.hasClass(s.slideDuplicateClass) ? a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass) : a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass));
  let o = l.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
  s.loop && o.length === 0 && (o = t.eq(0), o.addClass(s.slideNextClass));
  let d = l.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
  s.loop && d.length === 0 && (d = t.eq(-1), d.addClass(s.slidePrevClass)), s.loop && (o.hasClass(s.slideDuplicateClass) ? a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass) : a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass), d.hasClass(s.slideDuplicateClass) ? a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass) : a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass)), e.emitSlidesClasses();
}
function updateActiveIndex(e) {
  const t = this, s = t.rtlTranslate ? t.translate : -t.translate, { slidesGrid: a, snapGrid: i, params: r, activeIndex: n, realIndex: l, snapIndex: o } = t;
  let d, c = e;
  if (c === void 0) {
    for (let e2 = 0; e2 < a.length; e2 += 1)
      a[e2 + 1] !== void 0 ? s >= a[e2] && s < a[e2 + 1] - (a[e2 + 1] - a[e2]) / 2 ? c = e2 : s >= a[e2] && s < a[e2 + 1] && (c = e2 + 1) : s >= a[e2] && (c = e2);
    r.normalizeSlideIndex && (c < 0 || c === void 0) && (c = 0);
  }
  if (i.indexOf(s) >= 0)
    d = i.indexOf(s);
  else {
    const e2 = Math.min(r.slidesPerGroupSkip, c);
    d = e2 + Math.floor((c - e2) / r.slidesPerGroup);
  }
  if (d >= i.length && (d = i.length - 1), c === n)
    return void (d !== o && (t.snapIndex = d, t.emit("snapIndexChange")));
  const p = parseInt(t.slides.eq(c).attr("data-swiper-slide-index") || c, 10);
  Object.assign(t, { snapIndex: d, realIndex: p, previousIndex: n, activeIndex: c }), t.emit("activeIndexChange"), t.emit("snapIndexChange"), l !== p && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
}
function updateClickedSlide(e) {
  const t = this, s = t.params, a = $(e).closest(`.${s.slideClass}`)[0];
  let i, r = false;
  if (a) {
    for (let e2 = 0; e2 < t.slides.length; e2 += 1)
      if (t.slides[e2] === a) {
        r = true, i = e2;
        break;
      }
  }
  if (!a || !r)
    return t.clickedSlide = void 0, void (t.clickedIndex = void 0);
  t.clickedSlide = a, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt($(a).attr("data-swiper-slide-index"), 10) : t.clickedIndex = i, s.slideToClickedSlide && t.clickedIndex !== void 0 && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
}
var update = { updateSize, updateSlides, updateAutoHeight, updateSlidesOffset, updateSlidesProgress, updateProgress, updateSlidesClasses, updateActiveIndex, updateClickedSlide };
function getSwiperTranslate(e = this.isHorizontal() ? "x" : "y") {
  const { params: t, rtlTranslate: s, translate: a, $wrapperEl: i } = this;
  if (t.virtualTranslate)
    return s ? -a : a;
  if (t.cssMode)
    return a;
  let r = getTranslate(i[0], e);
  return s && (r = -r), r || 0;
}
function setTranslate(e, t) {
  const s = this, { rtlTranslate: a, params: i, $wrapperEl: r, wrapperEl: n, progress: l } = s;
  let o = 0, d = 0;
  let c;
  s.isHorizontal() ? o = a ? -e : e : d = e, i.roundLengths && (o = Math.floor(o), d = Math.floor(d)), i.cssMode ? n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -o : -d : i.virtualTranslate || r.transform(`translate3d(${o}px, ${d}px, 0px)`), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? o : d;
  const p = s.maxTranslate() - s.minTranslate();
  c = p === 0 ? 0 : (e - s.minTranslate()) / p, c !== l && s.updateProgress(e), s.emit("setTranslate", s.translate, t);
}
function minTranslate() {
  return -this.snapGrid[0];
}
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function translateTo(e = 0, t = this.params.speed, s = true, a = true, i) {
  const r = this, { params: n, wrapperEl: l } = r;
  if (r.animating && n.preventInteractionOnTransition)
    return false;
  const o = r.minTranslate(), d = r.maxTranslate();
  let c;
  if (c = a && e > o ? o : a && e < d ? d : e, r.updateProgress(c), n.cssMode) {
    const e2 = r.isHorizontal();
    if (t === 0)
      l[e2 ? "scrollLeft" : "scrollTop"] = -c;
    else {
      if (!r.support.smoothScroll)
        return animateCSSModeScroll({ swiper: r, targetPosition: -c, side: e2 ? "left" : "top" }), true;
      l.scrollTo({ [e2 ? "left" : "top"]: -c, behavior: "smooth" });
    }
    return true;
  }
  return t === 0 ? (r.setTransition(0), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionStart")), r.animating || (r.animating = true, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(e2) {
    r && !r.destroyed && e2.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, s && r.emit("transitionEnd"));
  }), r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd))), true;
}
var translate = { getTranslate: getSwiperTranslate, setTranslate, minTranslate, maxTranslate, translateTo };
function setTransition(e, t) {
  const s = this;
  s.params.cssMode || s.$wrapperEl.transition(e), s.emit("setTransition", e, t);
}
function transitionEmit({ swiper: e, runCallbacks: t, direction: s, step: a }) {
  const { activeIndex: i, previousIndex: r } = e;
  let n = s;
  if (n || (n = i > r ? "next" : i < r ? "prev" : "reset"), e.emit(`transition${a}`), t && i !== r) {
    if (n === "reset")
      return void e.emit(`slideResetTransition${a}`);
    e.emit(`slideChangeTransition${a}`), n === "next" ? e.emit(`slideNextTransition${a}`) : e.emit(`slidePrevTransition${a}`);
  }
}
function transitionStart(e = true, t) {
  const s = this, { params: a } = s;
  a.cssMode || (a.autoHeight && s.updateAutoHeight(), transitionEmit({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
}
function transitionEnd(e = true, t) {
  const s = this, { params: a } = s;
  s.animating = false, a.cssMode || (s.setTransition(0), transitionEmit({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
}
var transition = { setTransition, transitionStart, transitionEnd };
function slideTo(e = 0, t = this.params.speed, s = true, a, i) {
  if (typeof e != "number" && typeof e != "string")
    throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
  if (typeof e == "string") {
    const t2 = parseInt(e, 10);
    if (!isFinite(t2))
      throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
    e = t2;
  }
  const r = this;
  let n = e;
  n < 0 && (n = 0);
  const { params: l, snapGrid: o, slidesGrid: d, previousIndex: c, activeIndex: p, rtlTranslate: u, wrapperEl: h, enabled: m } = r;
  if (r.animating && l.preventInteractionOnTransition || !m && !a && !i)
    return false;
  const f = Math.min(r.params.slidesPerGroupSkip, n);
  let g = f + Math.floor((n - f) / r.params.slidesPerGroup);
  g >= o.length && (g = o.length - 1), (p || l.initialSlide || 0) === (c || 0) && s && r.emit("beforeSlideChangeStart");
  const v = -o[g];
  if (r.updateProgress(v), l.normalizeSlideIndex)
    for (let e2 = 0; e2 < d.length; e2 += 1) {
      const t2 = -Math.floor(100 * v), s2 = Math.floor(100 * d[e2]), a2 = Math.floor(100 * d[e2 + 1]);
      d[e2 + 1] !== void 0 ? t2 >= s2 && t2 < a2 - (a2 - s2) / 2 ? n = e2 : t2 >= s2 && t2 < a2 && (n = e2 + 1) : t2 >= s2 && (n = e2);
    }
  if (r.initialized && n !== p) {
    if (!r.allowSlideNext && v < r.translate && v < r.minTranslate())
      return false;
    if (!r.allowSlidePrev && v > r.translate && v > r.maxTranslate() && (p || 0) !== n)
      return false;
  }
  let w;
  if (w = n > p ? "next" : n < p ? "prev" : "reset", u && -v === r.translate || !u && v === r.translate)
    return r.updateActiveIndex(n), l.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), l.effect !== "slide" && r.setTranslate(v), w !== "reset" && (r.transitionStart(s, w), r.transitionEnd(s, w)), false;
  if (l.cssMode) {
    const e2 = r.isHorizontal(), s2 = u ? v : -v;
    if (t === 0) {
      const t2 = r.virtual && r.params.virtual.enabled;
      t2 && (r.wrapperEl.style.scrollSnapType = "none", r._immediateVirtual = true), h[e2 ? "scrollLeft" : "scrollTop"] = s2, t2 && requestAnimationFrame(() => {
        r.wrapperEl.style.scrollSnapType = "", r._swiperImmediateVirtual = false;
      });
    } else {
      if (!r.support.smoothScroll)
        return animateCSSModeScroll({ swiper: r, targetPosition: s2, side: e2 ? "left" : "top" }), true;
      h.scrollTo({ [e2 ? "left" : "top"]: s2, behavior: "smooth" });
    }
    return true;
  }
  return r.setTransition(t), r.setTranslate(v), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, a), r.transitionStart(s, w), t === 0 ? r.transitionEnd(s, w) : r.animating || (r.animating = true, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e2) {
    r && !r.destroyed && e2.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(s, w));
  }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd)), true;
}
function slideToLoop(e = 0, t = this.params.speed, s = true, a) {
  const i = this;
  let r = e;
  return i.params.loop && (r += i.loopedSlides), i.slideTo(r, t, s, a);
}
function slideNext(e = this.params.speed, t = true, s) {
  const a = this, { animating: i, enabled: r, params: n } = a;
  if (!r)
    return a;
  let l = n.slidesPerGroup;
  n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (l = Math.max(a.slidesPerViewDynamic("current", true), 1));
  const o = a.activeIndex < n.slidesPerGroupSkip ? 1 : l;
  if (n.loop) {
    if (i && n.loopPreventsSlide)
      return false;
    a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft;
  }
  return n.rewind && a.isEnd ? a.slideTo(0, e, t, s) : a.slideTo(a.activeIndex + o, e, t, s);
}
function slidePrev(e = this.params.speed, t = true, s) {
  const a = this, { params: i, animating: r, snapGrid: n, slidesGrid: l, rtlTranslate: o, enabled: d } = a;
  if (!d)
    return a;
  if (i.loop) {
    if (r && i.loopPreventsSlide)
      return false;
    a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft;
  }
  function c(e2) {
    return e2 < 0 ? -Math.floor(Math.abs(e2)) : Math.floor(e2);
  }
  const p = c(o ? a.translate : -a.translate), u = n.map((e2) => c(e2));
  let h = n[u.indexOf(p) - 1];
  if (h === void 0 && i.cssMode) {
    let e2;
    n.forEach((t2, s2) => {
      p >= t2 && (e2 = s2);
    }), e2 !== void 0 && (h = n[e2 > 0 ? e2 - 1 : e2]);
  }
  let m = 0;
  return h !== void 0 && (m = l.indexOf(h), m < 0 && (m = a.activeIndex - 1), i.slidesPerView === "auto" && i.slidesPerGroup === 1 && i.slidesPerGroupAuto && (m = m - a.slidesPerViewDynamic("previous", true) + 1, m = Math.max(m, 0))), i.rewind && a.isBeginning ? a.slideTo(a.slides.length - 1, e, t, s) : a.slideTo(m, e, t, s);
}
function slideReset(e = this.params.speed, t = true, s) {
  return this.slideTo(this.activeIndex, e, t, s);
}
function slideToClosest(e = this.params.speed, t = true, s, a = 0.5) {
  const i = this;
  let r = i.activeIndex;
  const n = Math.min(i.params.slidesPerGroupSkip, r), l = n + Math.floor((r - n) / i.params.slidesPerGroup), o = i.rtlTranslate ? i.translate : -i.translate;
  if (o >= i.snapGrid[l]) {
    const e2 = i.snapGrid[l];
    o - e2 > (i.snapGrid[l + 1] - e2) * a && (r += i.params.slidesPerGroup);
  } else {
    const e2 = i.snapGrid[l - 1];
    o - e2 <= (i.snapGrid[l] - e2) * a && (r -= i.params.slidesPerGroup);
  }
  return r = Math.max(r, 0), r = Math.min(r, i.slidesGrid.length - 1), i.slideTo(r, e, t, s);
}
function slideToClickedSlide() {
  const e = this, { params: t, $wrapperEl: s } = e, a = t.slidesPerView === "auto" ? e.slidesPerViewDynamic() : t.slidesPerView;
  let i, r = e.clickedIndex;
  if (t.loop) {
    if (e.animating)
      return;
    i = parseInt($(e.clickedSlide).attr("data-swiper-slide-index"), 10), t.centeredSlides ? r < e.loopedSlides - a / 2 || r > e.slides.length - e.loopedSlides + a / 2 ? (e.loopFix(), r = s.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), nextTick(() => {
      e.slideTo(r);
    })) : e.slideTo(r) : r > e.slides.length - a ? (e.loopFix(), r = s.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), nextTick(() => {
      e.slideTo(r);
    })) : e.slideTo(r);
  } else
    e.slideTo(r);
}
var slide = { slideTo, slideToLoop, slideNext, slidePrev, slideReset, slideToClosest, slideToClickedSlide };
function loopCreate() {
  const e = this, t = getDocument(), { params: s, $wrapperEl: a } = e, i = a.children().length > 0 ? $(a.children()[0].parentNode) : a;
  i.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
  let r = i.children(`.${s.slideClass}`);
  if (s.loopFillGroupWithBlank) {
    const e2 = s.slidesPerGroup - r.length % s.slidesPerGroup;
    if (e2 !== s.slidesPerGroup) {
      for (let a2 = 0; a2 < e2; a2 += 1) {
        const e3 = $(t.createElement("div")).addClass(`${s.slideClass} ${s.slideBlankClass}`);
        i.append(e3);
      }
      r = i.children(`.${s.slideClass}`);
    }
  }
  s.slidesPerView !== "auto" || s.loopedSlides || (s.loopedSlides = r.length), e.loopedSlides = Math.ceil(parseFloat(s.loopedSlides || s.slidesPerView, 10)), e.loopedSlides += s.loopAdditionalSlides, e.loopedSlides > r.length && (e.loopedSlides = r.length);
  const n = [], l = [];
  r.each((t2, s2) => {
    const a2 = $(t2);
    s2 < e.loopedSlides && l.push(t2), s2 < r.length && s2 >= r.length - e.loopedSlides && n.push(t2), a2.attr("data-swiper-slide-index", s2);
  });
  for (let e2 = 0; e2 < l.length; e2 += 1)
    i.append($(l[e2].cloneNode(true)).addClass(s.slideDuplicateClass));
  for (let e2 = n.length - 1; e2 >= 0; e2 -= 1)
    i.prepend($(n[e2].cloneNode(true)).addClass(s.slideDuplicateClass));
}
function loopFix() {
  const e = this;
  e.emit("beforeLoopFix");
  const { activeIndex: t, slides: s, loopedSlides: a, allowSlidePrev: i, allowSlideNext: r, snapGrid: n, rtlTranslate: l } = e;
  let o;
  e.allowSlidePrev = true, e.allowSlideNext = true;
  const d = -n[t] - e.getTranslate();
  if (t < a) {
    o = s.length - 3 * a + t, o += a;
    e.slideTo(o, 0, false, true) && d !== 0 && e.setTranslate((l ? -e.translate : e.translate) - d);
  } else if (t >= s.length - a) {
    o = -s.length + t + a, o += a;
    e.slideTo(o, 0, false, true) && d !== 0 && e.setTranslate((l ? -e.translate : e.translate) - d);
  }
  e.allowSlidePrev = i, e.allowSlideNext = r, e.emit("loopFix");
}
function loopDestroy() {
  const { $wrapperEl: e, params: t, slides: s } = this;
  e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(), s.removeAttr("data-swiper-slide-index");
}
var loop = { loopCreate, loopFix, loopDestroy };
function setGrabCursor(e) {
  const t = this;
  if (t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)
    return;
  const s = t.params.touchEventsTarget === "container" ? t.el : t.wrapperEl;
  s.style.cursor = "move", s.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", s.style.cursor = e ? "-moz-grabbin" : "-moz-grab", s.style.cursor = e ? "grabbing" : "grab";
}
function unsetGrabCursor() {
  const e = this;
  e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e[e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "");
}
var grabCursor = { setGrabCursor, unsetGrabCursor };
function closestElement(e, t = this) {
  return function t2(s) {
    return s && s !== getDocument() && s !== getWindow() ? (s.assignedSlot && (s = s.assignedSlot), s.closest(e) || t2(s.getRootNode().host)) : null;
  }(t);
}
function onTouchStart(e) {
  const t = this, s = getDocument(), a = getWindow(), i = t.touchEventsData, { params: r, touches: n, enabled: l } = t;
  if (!l)
    return;
  if (t.animating && r.preventInteractionOnTransition)
    return;
  !t.animating && r.cssMode && r.loop && t.loopFix();
  let o = e;
  o.originalEvent && (o = o.originalEvent);
  let d = $(o.target);
  if (r.touchEventsTarget === "wrapper" && !d.closest(t.wrapperEl).length)
    return;
  if (i.isTouchEvent = o.type === "touchstart", !i.isTouchEvent && "which" in o && o.which === 3)
    return;
  if (!i.isTouchEvent && "button" in o && o.button > 0)
    return;
  if (i.isTouched && i.isMoved)
    return;
  !!r.noSwipingClass && r.noSwipingClass !== "" && o.target && o.target.shadowRoot && e.path && e.path[0] && (d = $(e.path[0]));
  const c = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`, p = !(!o.target || !o.target.shadowRoot);
  if (r.noSwiping && (p ? closestElement(c, o.target) : d.closest(c)[0]))
    return void (t.allowClick = true);
  if (r.swipeHandler && !d.closest(r.swipeHandler)[0])
    return;
  n.currentX = o.type === "touchstart" ? o.targetTouches[0].pageX : o.pageX, n.currentY = o.type === "touchstart" ? o.targetTouches[0].pageY : o.pageY;
  const u = n.currentX, h = n.currentY, m = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection, f = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
  if (m && (u <= f || u >= a.innerWidth - f)) {
    if (m !== "prevent")
      return;
    e.preventDefault();
  }
  if (Object.assign(i, { isTouched: true, isMoved: false, allowTouchCallbacks: true, isScrolling: void 0, startMoving: void 0 }), n.startX = u, n.startY = h, i.touchStartTime = now(), t.allowClick = true, t.updateSize(), t.swipeDirection = void 0, r.threshold > 0 && (i.allowThresholdMove = false), o.type !== "touchstart") {
    let e2 = true;
    d.is(i.focusableElements) && (e2 = false), s.activeElement && $(s.activeElement).is(i.focusableElements) && s.activeElement !== d[0] && s.activeElement.blur();
    const a2 = e2 && t.allowTouchMove && r.touchStartPreventDefault;
    !r.touchStartForcePreventDefault && !a2 || d[0].isContentEditable || o.preventDefault();
  }
  t.emit("touchStart", o);
}
function onTouchMove(e) {
  const t = getDocument(), s = this, a = s.touchEventsData, { params: i, touches: r, rtlTranslate: n, enabled: l } = s;
  if (!l)
    return;
  let o = e;
  if (o.originalEvent && (o = o.originalEvent), !a.isTouched)
    return void (a.startMoving && a.isScrolling && s.emit("touchMoveOpposite", o));
  if (a.isTouchEvent && o.type !== "touchmove")
    return;
  const d = o.type === "touchmove" && o.targetTouches && (o.targetTouches[0] || o.changedTouches[0]), c = o.type === "touchmove" ? d.pageX : o.pageX, p = o.type === "touchmove" ? d.pageY : o.pageY;
  if (o.preventedByNestedSwiper)
    return r.startX = c, void (r.startY = p);
  if (!s.allowTouchMove)
    return s.allowClick = false, void (a.isTouched && (Object.assign(r, { startX: c, startY: p, currentX: c, currentY: p }), a.touchStartTime = now()));
  if (a.isTouchEvent && i.touchReleaseOnEdges && !i.loop) {
    if (s.isVertical()) {
      if (p < r.startY && s.translate <= s.maxTranslate() || p > r.startY && s.translate >= s.minTranslate())
        return a.isTouched = false, void (a.isMoved = false);
    } else if (c < r.startX && s.translate <= s.maxTranslate() || c > r.startX && s.translate >= s.minTranslate())
      return;
  }
  if (a.isTouchEvent && t.activeElement && o.target === t.activeElement && $(o.target).is(a.focusableElements))
    return a.isMoved = true, void (s.allowClick = false);
  if (a.allowTouchCallbacks && s.emit("touchMove", o), o.targetTouches && o.targetTouches.length > 1)
    return;
  r.currentX = c, r.currentY = p;
  const u = r.currentX - r.startX, h = r.currentY - r.startY;
  if (s.params.threshold && Math.sqrt(u ** 2 + h ** 2) < s.params.threshold)
    return;
  if (a.isScrolling === void 0) {
    let e2;
    s.isHorizontal() && r.currentY === r.startY || s.isVertical() && r.currentX === r.startX ? a.isScrolling = false : u * u + h * h >= 25 && (e2 = 180 * Math.atan2(Math.abs(h), Math.abs(u)) / Math.PI, a.isScrolling = s.isHorizontal() ? e2 > i.touchAngle : 90 - e2 > i.touchAngle);
  }
  if (a.isScrolling && s.emit("touchMoveOpposite", o), a.startMoving === void 0 && (r.currentX === r.startX && r.currentY === r.startY || (a.startMoving = true)), a.isScrolling)
    return void (a.isTouched = false);
  if (!a.startMoving)
    return;
  s.allowClick = false, !i.cssMode && o.cancelable && o.preventDefault(), i.touchMoveStopPropagation && !i.nested && o.stopPropagation(), a.isMoved || (i.loop && !i.cssMode && s.loopFix(), a.startTranslate = s.getTranslate(), s.setTransition(0), s.animating && s.$wrapperEl.trigger("webkitTransitionEnd transitionend"), a.allowMomentumBounce = false, !i.grabCursor || s.allowSlideNext !== true && s.allowSlidePrev !== true || s.setGrabCursor(true), s.emit("sliderFirstMove", o)), s.emit("sliderMove", o), a.isMoved = true;
  let m = s.isHorizontal() ? u : h;
  r.diff = m, m *= i.touchRatio, n && (m = -m), s.swipeDirection = m > 0 ? "prev" : "next", a.currentTranslate = m + a.startTranslate;
  let f = true, g = i.resistanceRatio;
  if (i.touchReleaseOnEdges && (g = 0), m > 0 && a.currentTranslate > s.minTranslate() ? (f = false, i.resistance && (a.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + a.startTranslate + m) ** g)) : m < 0 && a.currentTranslate < s.maxTranslate() && (f = false, i.resistance && (a.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - a.startTranslate - m) ** g)), f && (o.preventedByNestedSwiper = true), !s.allowSlideNext && s.swipeDirection === "next" && a.currentTranslate < a.startTranslate && (a.currentTranslate = a.startTranslate), !s.allowSlidePrev && s.swipeDirection === "prev" && a.currentTranslate > a.startTranslate && (a.currentTranslate = a.startTranslate), s.allowSlidePrev || s.allowSlideNext || (a.currentTranslate = a.startTranslate), i.threshold > 0) {
    if (!(Math.abs(m) > i.threshold || a.allowThresholdMove))
      return void (a.currentTranslate = a.startTranslate);
    if (!a.allowThresholdMove)
      return a.allowThresholdMove = true, r.startX = r.currentX, r.startY = r.currentY, a.currentTranslate = a.startTranslate, void (r.diff = s.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY);
  }
  i.followFinger && !i.cssMode && ((i.freeMode && i.freeMode.enabled && s.freeMode || i.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()), s.params.freeMode && i.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(), s.updateProgress(a.currentTranslate), s.setTranslate(a.currentTranslate));
}
function onTouchEnd(e) {
  const t = this, s = t.touchEventsData, { params: a, touches: i, rtlTranslate: r, slidesGrid: n, enabled: l } = t;
  if (!l)
    return;
  let o = e;
  if (o.originalEvent && (o = o.originalEvent), s.allowTouchCallbacks && t.emit("touchEnd", o), s.allowTouchCallbacks = false, !s.isTouched)
    return s.isMoved && a.grabCursor && t.setGrabCursor(false), s.isMoved = false, void (s.startMoving = false);
  a.grabCursor && s.isMoved && s.isTouched && (t.allowSlideNext === true || t.allowSlidePrev === true) && t.setGrabCursor(false);
  const d = now(), c = d - s.touchStartTime;
  if (t.allowClick) {
    const e2 = o.path || o.composedPath && o.composedPath();
    t.updateClickedSlide(e2 && e2[0] || o.target), t.emit("tap click", o), c < 300 && d - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", o);
  }
  if (s.lastClickTime = now(), nextTick(() => {
    t.destroyed || (t.allowClick = true);
  }), !s.isTouched || !s.isMoved || !t.swipeDirection || i.diff === 0 || s.currentTranslate === s.startTranslate)
    return s.isTouched = false, s.isMoved = false, void (s.startMoving = false);
  let p;
  if (s.isTouched = false, s.isMoved = false, s.startMoving = false, p = a.followFinger ? r ? t.translate : -t.translate : -s.currentTranslate, a.cssMode)
    return;
  if (t.params.freeMode && a.freeMode.enabled)
    return void t.freeMode.onTouchEnd({ currentPos: p });
  let u = 0, h = t.slidesSizesGrid[0];
  for (let e2 = 0; e2 < n.length; e2 += e2 < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup) {
    const t2 = e2 < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    n[e2 + t2] !== void 0 ? p >= n[e2] && p < n[e2 + t2] && (u = e2, h = n[e2 + t2] - n[e2]) : p >= n[e2] && (u = e2, h = n[n.length - 1] - n[n.length - 2]);
  }
  const m = (p - n[u]) / h, f = u < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
  if (c > a.longSwipesMs) {
    if (!a.longSwipes)
      return void t.slideTo(t.activeIndex);
    t.swipeDirection === "next" && (m >= a.longSwipesRatio ? t.slideTo(u + f) : t.slideTo(u)), t.swipeDirection === "prev" && (m > 1 - a.longSwipesRatio ? t.slideTo(u + f) : t.slideTo(u));
  } else {
    if (!a.shortSwipes)
      return void t.slideTo(t.activeIndex);
    t.navigation && (o.target === t.navigation.nextEl || o.target === t.navigation.prevEl) ? o.target === t.navigation.nextEl ? t.slideTo(u + f) : t.slideTo(u) : (t.swipeDirection === "next" && t.slideTo(u + f), t.swipeDirection === "prev" && t.slideTo(u));
  }
}
function onResize() {
  const e = this, { params: t, el: s } = e;
  if (s && s.offsetWidth === 0)
    return;
  t.breakpoints && e.setBreakpoint();
  const { allowSlideNext: a, allowSlidePrev: i, snapGrid: r } = e;
  e.allowSlideNext = true, e.allowSlidePrev = true, e.updateSize(), e.updateSlides(), e.updateSlidesClasses(), (t.slidesPerView === "auto" || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, false, true) : e.slideTo(e.activeIndex, 0, false, true), e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(), e.allowSlidePrev = i, e.allowSlideNext = a, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
}
function onClick(e) {
  const t = this;
  t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
}
function onScroll() {
  const e = this, { wrapperEl: t, rtlTranslate: s, enabled: a } = e;
  if (!a)
    return;
  let i;
  e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, e.translate === -0 && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
  const r = e.maxTranslate() - e.minTranslate();
  i = r === 0 ? 0 : (e.translate - e.minTranslate()) / r, i !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, false);
}
let dummyEventAttached = false;
function dummyEventListener() {
}
const events = (e, t) => {
  const s = getDocument(), { params: a, touchEvents: i, el: r, wrapperEl: n, device: l, support: o } = e, d = !!a.nested, c = t === "on" ? "addEventListener" : "removeEventListener", p = t;
  if (o.touch) {
    const t2 = !(i.start !== "touchstart" || !o.passiveListener || !a.passiveListeners) && { passive: true, capture: false };
    r[c](i.start, e.onTouchStart, t2), r[c](i.move, e.onTouchMove, o.passiveListener ? { passive: false, capture: d } : d), r[c](i.end, e.onTouchEnd, t2), i.cancel && r[c](i.cancel, e.onTouchEnd, t2);
  } else
    r[c](i.start, e.onTouchStart, false), s[c](i.move, e.onTouchMove, d), s[c](i.end, e.onTouchEnd, false);
  (a.preventClicks || a.preventClicksPropagation) && r[c]("click", e.onClick, true), a.cssMode && n[c]("scroll", e.onScroll), a.updateOnWindowResize ? e[p](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true) : e[p]("observerUpdate", onResize, true);
};
function attachEvents() {
  const e = this, t = getDocument(), { params: s, support: a } = e;
  e.onTouchStart = onTouchStart.bind(e), e.onTouchMove = onTouchMove.bind(e), e.onTouchEnd = onTouchEnd.bind(e), s.cssMode && (e.onScroll = onScroll.bind(e)), e.onClick = onClick.bind(e), a.touch && !dummyEventAttached && (t.addEventListener("touchstart", dummyEventListener), dummyEventAttached = true), events(e, "on");
}
function detachEvents() {
  events(this, "off");
}
var events$1 = { attachEvents, detachEvents };
const isGridEnabled = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function setBreakpoint() {
  const e = this, { activeIndex: t, initialized: s, loopedSlides: a = 0, params: i, $el: r } = e, n = i.breakpoints;
  if (!n || n && Object.keys(n).length === 0)
    return;
  const l = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
  if (!l || e.currentBreakpoint === l)
    return;
  const o = (l in n ? n[l] : void 0) || e.originalParams, d = isGridEnabled(e, i), c = isGridEnabled(e, o), p = i.enabled;
  d && !c ? (r.removeClass(`${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`), e.emitContainerClasses()) : !d && c && (r.addClass(`${i.containerModifierClass}grid`), (o.grid.fill && o.grid.fill === "column" || !o.grid.fill && i.grid.fill === "column") && r.addClass(`${i.containerModifierClass}grid-column`), e.emitContainerClasses());
  const u = o.direction && o.direction !== i.direction, h = i.loop && (o.slidesPerView !== i.slidesPerView || u);
  u && s && e.changeDirection(), extend(e.params, o);
  const m = e.params.enabled;
  Object.assign(e, { allowTouchMove: e.params.allowTouchMove, allowSlideNext: e.params.allowSlideNext, allowSlidePrev: e.params.allowSlidePrev }), p && !m ? e.disable() : !p && m && e.enable(), e.currentBreakpoint = l, e.emit("_beforeBreakpoint", o), h && s && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - a + e.loopedSlides, 0, false)), e.emit("breakpoint", o);
}
function getBreakpoint(e, t = "window", s) {
  if (!e || t === "container" && !s)
    return;
  let a = false;
  const i = getWindow(), r = t === "window" ? i.innerHeight : s.clientHeight, n = Object.keys(e).map((e2) => {
    if (typeof e2 == "string" && e2.indexOf("@") === 0) {
      const t2 = parseFloat(e2.substr(1));
      return { value: r * t2, point: e2 };
    }
    return { value: e2, point: e2 };
  });
  n.sort((e2, t2) => parseInt(e2.value, 10) - parseInt(t2.value, 10));
  for (let e2 = 0; e2 < n.length; e2 += 1) {
    const { point: r2, value: l } = n[e2];
    t === "window" ? i.matchMedia(`(min-width: ${l}px)`).matches && (a = r2) : l <= s.clientWidth && (a = r2);
  }
  return a || "max";
}
var breakpoints = { setBreakpoint, getBreakpoint };
function prepareClasses(e, t) {
  const s = [];
  return e.forEach((e2) => {
    typeof e2 == "object" ? Object.keys(e2).forEach((a) => {
      e2[a] && s.push(t + a);
    }) : typeof e2 == "string" && s.push(t + e2);
  }), s;
}
function addClasses() {
  const e = this, { classNames: t, params: s, rtl: a, $el: i, device: r, support: n } = e, l = prepareClasses(["initialized", s.direction, { "pointer-events": !n.touch }, { "free-mode": e.params.freeMode && s.freeMode.enabled }, { autoheight: s.autoHeight }, { rtl: a }, { grid: s.grid && s.grid.rows > 1 }, { "grid-column": s.grid && s.grid.rows > 1 && s.grid.fill === "column" }, { android: r.android }, { ios: r.ios }, { "css-mode": s.cssMode }, { centered: s.cssMode && s.centeredSlides }], s.containerModifierClass);
  t.push(...l), i.addClass([...t].join(" ")), e.emitContainerClasses();
}
function removeClasses() {
  const { $el: e, classNames: t } = this;
  e.removeClass(t.join(" ")), this.emitContainerClasses();
}
var classes = { addClasses, removeClasses };
function loadImage(e, t, s, a, i, r) {
  const n = getWindow();
  let l;
  function o() {
    r && r();
  }
  $(e).parent("picture")[0] || e.complete && i ? o() : t ? (l = new n.Image(), l.onload = o, l.onerror = o, a && (l.sizes = a), s && (l.srcset = s), t && (l.src = t)) : o();
}
function preloadImages() {
  const e = this;
  function t() {
    e != null && e && !e.destroyed && (e.imagesLoaded !== void 0 && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")));
  }
  e.imagesToLoad = e.$el.find("img");
  for (let s = 0; s < e.imagesToLoad.length; s += 1) {
    const a = e.imagesToLoad[s];
    e.loadImage(a, a.currentSrc || a.getAttribute("src"), a.srcset || a.getAttribute("srcset"), a.sizes || a.getAttribute("sizes"), true, t);
  }
}
var images = { loadImage, preloadImages };
function checkOverflow() {
  const e = this, { isLocked: t, params: s } = e, { slidesOffsetBefore: a } = s;
  if (a) {
    const t2 = e.slides.length - 1, s2 = e.slidesGrid[t2] + e.slidesSizesGrid[t2] + 2 * a;
    e.isLocked = e.size > s2;
  } else
    e.isLocked = e.snapGrid.length === 1;
  s.allowSlideNext === true && (e.allowSlideNext = !e.isLocked), s.allowSlidePrev === true && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = false), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
var checkOverflow$1 = { checkOverflow }, defaults = { init: true, direction: "horizontal", touchEventsTarget: "wrapper", initialSlide: 0, speed: 300, cssMode: false, updateOnWindowResize: true, resizeObserver: true, nested: false, createElements: false, enabled: true, focusableElements: "input, select, option, textarea, button, video, label", width: null, height: null, preventInteractionOnTransition: false, userAgent: null, url: null, edgeSwipeDetection: false, edgeSwipeThreshold: 20, autoHeight: false, setWrapperSize: false, virtualTranslate: false, effect: "slide", breakpoints: void 0, breakpointsBase: "window", spaceBetween: 0, slidesPerView: 1, slidesPerGroup: 1, slidesPerGroupSkip: 0, slidesPerGroupAuto: false, centeredSlides: false, centeredSlidesBounds: false, slidesOffsetBefore: 0, slidesOffsetAfter: 0, normalizeSlideIndex: true, centerInsufficientSlides: false, watchOverflow: true, roundLengths: false, touchRatio: 1, touchAngle: 45, simulateTouch: true, shortSwipes: true, longSwipes: true, longSwipesRatio: 0.5, longSwipesMs: 300, followFinger: true, allowTouchMove: true, threshold: 0, touchMoveStopPropagation: false, touchStartPreventDefault: true, touchStartForcePreventDefault: false, touchReleaseOnEdges: false, uniqueNavElements: true, resistance: true, resistanceRatio: 0.85, watchSlidesProgress: false, grabCursor: false, preventClicks: true, preventClicksPropagation: true, slideToClickedSlide: false, preloadImages: true, updateOnImagesReady: true, loop: false, loopAdditionalSlides: 0, loopedSlides: null, loopFillGroupWithBlank: false, loopPreventsSlide: true, rewind: false, allowSlidePrev: true, allowSlideNext: true, swipeHandler: null, noSwiping: true, noSwipingClass: "swiper-no-swiping", noSwipingSelector: null, passiveListeners: true, containerModifierClass: "swiper-", slideClass: "swiper-slide", slideBlankClass: "swiper-slide-invisible-blank", slideActiveClass: "swiper-slide-active", slideDuplicateActiveClass: "swiper-slide-duplicate-active", slideVisibleClass: "swiper-slide-visible", slideDuplicateClass: "swiper-slide-duplicate", slideNextClass: "swiper-slide-next", slideDuplicateNextClass: "swiper-slide-duplicate-next", slidePrevClass: "swiper-slide-prev", slideDuplicatePrevClass: "swiper-slide-duplicate-prev", wrapperClass: "swiper-wrapper", runCallbacksOnInit: true, _emitClasses: false };
function moduleExtendParams(e, t) {
  return function(s = {}) {
    const a = Object.keys(s)[0], i = s[a];
    typeof i == "object" && i !== null ? (["navigation", "pagination", "scrollbar"].indexOf(a) >= 0 && e[a] === true && (e[a] = { auto: true }), a in e && "enabled" in i ? (e[a] === true && (e[a] = { enabled: true }), typeof e[a] != "object" || "enabled" in e[a] || (e[a].enabled = true), e[a] || (e[a] = { enabled: false }), extend(t, s)) : extend(t, s)) : extend(t, s);
  };
}
const prototypes = { eventsEmitter, update, translate, transition, slide, loop, grabCursor, events: events$1, breakpoints, checkOverflow: checkOverflow$1, classes, images }, extendedDefaults = {};
class Swiper {
  constructor(...e) {
    let t, s;
    if (e.length === 1 && e[0].constructor && Object.prototype.toString.call(e[0]).slice(8, -1) === "Object" ? s = e[0] : [t, s] = e, s || (s = {}), s = extend({}, s), t && !s.el && (s.el = t), s.el && $(s.el).length > 1) {
      const e2 = [];
      return $(s.el).each((t2) => {
        const a2 = extend({}, s, { el: t2 });
        e2.push(new Swiper(a2));
      }), e2;
    }
    const a = this;
    a.__swiper__ = true, a.support = getSupport(), a.device = getDevice({ userAgent: s.userAgent }), a.browser = getBrowser(), a.eventsListeners = {}, a.eventsAnyListeners = [], a.modules = [...a.__modules__], s.modules && Array.isArray(s.modules) && a.modules.push(...s.modules);
    const i = {};
    a.modules.forEach((e2) => {
      e2({ swiper: a, extendParams: moduleExtendParams(s, i), on: a.on.bind(a), once: a.once.bind(a), off: a.off.bind(a), emit: a.emit.bind(a) });
    });
    const r = extend({}, defaults, i);
    return a.params = extend({}, r, extendedDefaults, s), a.originalParams = extend({}, a.params), a.passedParams = extend({}, s), a.params && a.params.on && Object.keys(a.params.on).forEach((e2) => {
      a.on(e2, a.params.on[e2]);
    }), a.params && a.params.onAny && a.onAny(a.params.onAny), a.$ = $, Object.assign(a, { enabled: a.params.enabled, el: t, classNames: [], slides: $(), slidesGrid: [], snapGrid: [], slidesSizesGrid: [], isHorizontal: () => a.params.direction === "horizontal", isVertical: () => a.params.direction === "vertical", activeIndex: 0, realIndex: 0, isBeginning: true, isEnd: false, translate: 0, previousTranslate: 0, progress: 0, velocity: 0, animating: false, allowSlideNext: a.params.allowSlideNext, allowSlidePrev: a.params.allowSlidePrev, touchEvents: function() {
      const e2 = ["touchstart", "touchmove", "touchend", "touchcancel"], t2 = ["pointerdown", "pointermove", "pointerup"];
      return a.touchEventsTouch = { start: e2[0], move: e2[1], end: e2[2], cancel: e2[3] }, a.touchEventsDesktop = { start: t2[0], move: t2[1], end: t2[2] }, a.support.touch || !a.params.simulateTouch ? a.touchEventsTouch : a.touchEventsDesktop;
    }(), touchEventsData: { isTouched: void 0, isMoved: void 0, allowTouchCallbacks: void 0, touchStartTime: void 0, isScrolling: void 0, currentTranslate: void 0, startTranslate: void 0, allowThresholdMove: void 0, focusableElements: a.params.focusableElements, lastClickTime: now(), clickTimeout: void 0, velocities: [], allowMomentumBounce: void 0, isTouchEvent: void 0, startMoving: void 0 }, allowClick: true, allowTouchMove: a.params.allowTouchMove, touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 }, imagesToLoad: [], imagesLoaded: 0 }), a.emit("_swiper"), a.params.init && a.init(), a;
  }
  enable() {
    const e = this;
    e.enabled || (e.enabled = true, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
  }
  disable() {
    const e = this;
    e.enabled && (e.enabled = false, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
  }
  setProgress(e, t) {
    const s = this;
    e = Math.min(Math.max(e, 0), 1);
    const a = s.minTranslate(), i = (s.maxTranslate() - a) * e + a;
    s.translateTo(i, t === void 0 ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el)
      return;
    const t = e.el.className.split(" ").filter((t2) => t2.indexOf("swiper") === 0 || t2.indexOf(e.params.containerModifierClass) === 0);
    e.emit("_containerClasses", t.join(" "));
  }
  getSlideClasses(e) {
    const t = this;
    return e.className.split(" ").filter((e2) => e2.indexOf("swiper-slide") === 0 || e2.indexOf(t.params.slideClass) === 0).join(" ");
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el)
      return;
    const t = [];
    e.slides.each((s) => {
      const a = e.getSlideClasses(s);
      t.push({ slideEl: s, classNames: a }), e.emit("_slideClass", s, a);
    }), e.emit("_slideClasses", t);
  }
  slidesPerViewDynamic(e = "current", t = false) {
    const { params: s, slides: a, slidesGrid: i, slidesSizesGrid: r, size: n, activeIndex: l } = this;
    let o = 1;
    if (s.centeredSlides) {
      let e2, t2 = a[l].swiperSlideSize;
      for (let s2 = l + 1; s2 < a.length; s2 += 1)
        a[s2] && !e2 && (t2 += a[s2].swiperSlideSize, o += 1, t2 > n && (e2 = true));
      for (let s2 = l - 1; s2 >= 0; s2 -= 1)
        a[s2] && !e2 && (t2 += a[s2].swiperSlideSize, o += 1, t2 > n && (e2 = true));
    } else if (e === "current")
      for (let e2 = l + 1; e2 < a.length; e2 += 1) {
        (t ? i[e2] + r[e2] - i[l] < n : i[e2] - i[l] < n) && (o += 1);
      }
    else
      for (let e2 = l - 1; e2 >= 0; e2 -= 1) {
        i[l] - i[e2] < n && (o += 1);
      }
    return o;
  }
  update() {
    const e = this;
    if (!e || e.destroyed)
      return;
    const { snapGrid: t, params: s } = e;
    function a() {
      const t2 = e.rtlTranslate ? -1 * e.translate : e.translate, s2 = Math.min(Math.max(t2, e.maxTranslate()), e.minTranslate());
      e.setTranslate(s2), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let i;
    s.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode && e.params.freeMode.enabled ? (a(), e.params.autoHeight && e.updateAutoHeight()) : (i = (e.params.slidesPerView === "auto" || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, false, true) : e.slideTo(e.activeIndex, 0, false, true), i || a()), s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
  }
  changeDirection(e, t = true) {
    const s = this, a = s.params.direction;
    return e || (e = a === "horizontal" ? "vertical" : "horizontal"), e === a || e !== "horizontal" && e !== "vertical" || (s.$el.removeClass(`${s.params.containerModifierClass}${a}`).addClass(`${s.params.containerModifierClass}${e}`), s.emitContainerClasses(), s.params.direction = e, s.slides.each((t2) => {
      e === "vertical" ? t2.style.width = "" : t2.style.height = "";
    }), s.emit("changeDirection"), t && s.update()), s;
  }
  mount(e) {
    const t = this;
    if (t.mounted)
      return true;
    const s = $(e || t.params.el);
    if (!(e = s[0]))
      return false;
    e.swiper = t;
    const a = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let i = (() => {
      if (e && e.shadowRoot && e.shadowRoot.querySelector) {
        const t2 = $(e.shadowRoot.querySelector(a()));
        return t2.children = (e2) => s.children(e2), t2;
      }
      return s.children(a());
    })();
    if (i.length === 0 && t.params.createElements) {
      const e2 = getDocument().createElement("div");
      i = $(e2), e2.className = t.params.wrapperClass, s.append(e2), s.children(`.${t.params.slideClass}`).each((e3) => {
        i.append(e3);
      });
    }
    return Object.assign(t, { $el: s, el: e, $wrapperEl: i, wrapperEl: i[0], mounted: true, rtl: e.dir.toLowerCase() === "rtl" || s.css("direction") === "rtl", rtlTranslate: t.params.direction === "horizontal" && (e.dir.toLowerCase() === "rtl" || s.css("direction") === "rtl"), wrongRTL: i.css("display") === "-webkit-box" }), true;
  }
  init(e) {
    const t = this;
    if (t.initialized)
      return t;
    return t.mount(e) === false || (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.params.loop && t.loopCreate(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.preloadImages && t.preloadImages(), t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, false, true) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, false, true), t.attachEvents(), t.initialized = true, t.emit("init"), t.emit("afterInit")), t;
  }
  destroy(e = true, t = true) {
    const s = this, { params: a, $el: i, $wrapperEl: r, slides: n } = s;
    return s.params === void 0 || s.destroyed || (s.emit("beforeDestroy"), s.initialized = false, s.detachEvents(), a.loop && s.loopDestroy(), t && (s.removeClasses(), i.removeAttr("style"), r.removeAttr("style"), n && n.length && n.removeClass([a.slideVisibleClass, a.slideActiveClass, a.slideNextClass, a.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((e2) => {
      s.off(e2);
    }), e !== false && (s.$el[0].swiper = null, deleteProps(s)), s.destroyed = true), null;
  }
  static extendDefaults(e) {
    extend(extendedDefaults, e);
  }
  static get extendedDefaults() {
    return extendedDefaults;
  }
  static get defaults() {
    return defaults;
  }
  static installModule(e) {
    Swiper.prototype.__modules__ || (Swiper.prototype.__modules__ = []);
    const t = Swiper.prototype.__modules__;
    typeof e == "function" && t.indexOf(e) < 0 && t.push(e);
  }
  static use(e) {
    return Array.isArray(e) ? (e.forEach((e2) => Swiper.installModule(e2)), Swiper) : (Swiper.installModule(e), Swiper);
  }
}
function Virtual({ swiper: e, extendParams: t, on: s }) {
  let a;
  function i(t2, s2) {
    const a2 = e.params.virtual;
    if (a2.cache && e.virtual.cache[s2])
      return e.virtual.cache[s2];
    const i2 = a2.renderSlide ? $(a2.renderSlide.call(e, t2, s2)) : $(`<div class="${e.params.slideClass}" data-swiper-slide-index="${s2}">${t2}</div>`);
    return i2.attr("data-swiper-slide-index") || i2.attr("data-swiper-slide-index", s2), a2.cache && (e.virtual.cache[s2] = i2), i2;
  }
  function r(t2) {
    const { slidesPerView: s2, slidesPerGroup: a2, centeredSlides: r2 } = e.params, { addSlidesBefore: n, addSlidesAfter: l } = e.params.virtual, { from: o, to: d, slides: c, slidesGrid: p, offset: u } = e.virtual;
    e.params.cssMode || e.updateActiveIndex();
    const h = e.activeIndex || 0;
    let m, f, g;
    m = e.rtlTranslate ? "right" : e.isHorizontal() ? "left" : "top", r2 ? (f = Math.floor(s2 / 2) + a2 + l, g = Math.floor(s2 / 2) + a2 + n) : (f = s2 + (a2 - 1) + l, g = a2 + n);
    const v = Math.max((h || 0) - g, 0), w = Math.min((h || 0) + f, c.length - 1), b = (e.slidesGrid[v] || 0) - (e.slidesGrid[0] || 0);
    function x() {
      e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.lazy && e.params.lazy.enabled && e.lazy.load();
    }
    if (Object.assign(e.virtual, { from: v, to: w, offset: b, slidesGrid: e.slidesGrid }), o === v && d === w && !t2)
      return e.slidesGrid !== p && b !== u && e.slides.css(m, `${b}px`), void e.updateProgress();
    if (e.params.virtual.renderExternal)
      return e.params.virtual.renderExternal.call(e, { offset: b, from: v, to: w, slides: function() {
        const e2 = [];
        for (let t3 = v; t3 <= w; t3 += 1)
          e2.push(c[t3]);
        return e2;
      }() }), void (e.params.virtual.renderExternalUpdate && x());
    const y = [], E = [];
    if (t2)
      e.$wrapperEl.find(`.${e.params.slideClass}`).remove();
    else
      for (let t3 = o; t3 <= d; t3 += 1)
        (t3 < v || t3 > w) && e.$wrapperEl.find(`.${e.params.slideClass}[data-swiper-slide-index="${t3}"]`).remove();
    for (let e2 = 0; e2 < c.length; e2 += 1)
      e2 >= v && e2 <= w && (d === void 0 || t2 ? E.push(e2) : (e2 > d && E.push(e2), e2 < o && y.push(e2)));
    E.forEach((t3) => {
      e.$wrapperEl.append(i(c[t3], t3));
    }), y.sort((e2, t3) => t3 - e2).forEach((t3) => {
      e.$wrapperEl.prepend(i(c[t3], t3));
    }), e.$wrapperEl.children(".swiper-slide").css(m, `${b}px`), x();
  }
  t({ virtual: { enabled: false, slides: [], cache: true, renderSlide: null, renderExternal: null, renderExternalUpdate: true, addSlidesBefore: 0, addSlidesAfter: 0 } }), e.virtual = { cache: {}, from: void 0, to: void 0, slides: [], offset: 0, slidesGrid: [] }, s("beforeInit", () => {
    e.params.virtual.enabled && (e.virtual.slides = e.params.virtual.slides, e.classNames.push(`${e.params.containerModifierClass}virtual`), e.params.watchSlidesProgress = true, e.originalParams.watchSlidesProgress = true, e.params.initialSlide || r());
  }), s("setTranslate", () => {
    e.params.virtual.enabled && (e.params.cssMode && !e._immediateVirtual ? (clearTimeout(a), a = setTimeout(() => {
      r();
    }, 100)) : r());
  }), s("init update resize", () => {
    e.params.virtual.enabled && e.params.cssMode && setCSSProperty(e.wrapperEl, "--swiper-virtual-size", `${e.virtualSize}px`);
  }), Object.assign(e.virtual, { appendSlide: function(t2) {
    if (typeof t2 == "object" && "length" in t2)
      for (let s2 = 0; s2 < t2.length; s2 += 1)
        t2[s2] && e.virtual.slides.push(t2[s2]);
    else
      e.virtual.slides.push(t2);
    r(true);
  }, prependSlide: function(t2) {
    const s2 = e.activeIndex;
    let a2 = s2 + 1, i2 = 1;
    if (Array.isArray(t2)) {
      for (let s3 = 0; s3 < t2.length; s3 += 1)
        t2[s3] && e.virtual.slides.unshift(t2[s3]);
      a2 = s2 + t2.length, i2 = t2.length;
    } else
      e.virtual.slides.unshift(t2);
    if (e.params.virtual.cache) {
      const t3 = e.virtual.cache, s3 = {};
      Object.keys(t3).forEach((e2) => {
        const a3 = t3[e2], r2 = a3.attr("data-swiper-slide-index");
        r2 && a3.attr("data-swiper-slide-index", parseInt(r2, 10) + i2), s3[parseInt(e2, 10) + i2] = a3;
      }), e.virtual.cache = s3;
    }
    r(true), e.slideTo(a2, 0);
  }, removeSlide: function(t2) {
    if (t2 == null)
      return;
    let s2 = e.activeIndex;
    if (Array.isArray(t2))
      for (let a2 = t2.length - 1; a2 >= 0; a2 -= 1)
        e.virtual.slides.splice(t2[a2], 1), e.params.virtual.cache && delete e.virtual.cache[t2[a2]], t2[a2] < s2 && (s2 -= 1), s2 = Math.max(s2, 0);
    else
      e.virtual.slides.splice(t2, 1), e.params.virtual.cache && delete e.virtual.cache[t2], t2 < s2 && (s2 -= 1), s2 = Math.max(s2, 0);
    r(true), e.slideTo(s2, 0);
  }, removeAllSlides: function() {
    e.virtual.slides = [], e.params.virtual.cache && (e.virtual.cache = {}), r(true), e.slideTo(0, 0);
  }, update: r });
}
function Keyboard({ swiper: e, extendParams: t, on: s, emit: a }) {
  const i = getDocument(), r = getWindow();
  function n(t2) {
    if (!e.enabled)
      return;
    const { rtlTranslate: s2 } = e;
    let n2 = t2;
    n2.originalEvent && (n2 = n2.originalEvent);
    const l2 = n2.keyCode || n2.charCode, o2 = e.params.keyboard.pageUpDown, d = o2 && l2 === 33, c = o2 && l2 === 34, p = l2 === 37, u = l2 === 39, h = l2 === 38, m = l2 === 40;
    if (!e.allowSlideNext && (e.isHorizontal() && u || e.isVertical() && m || c))
      return false;
    if (!e.allowSlidePrev && (e.isHorizontal() && p || e.isVertical() && h || d))
      return false;
    if (!(n2.shiftKey || n2.altKey || n2.ctrlKey || n2.metaKey || i.activeElement && i.activeElement.nodeName && (i.activeElement.nodeName.toLowerCase() === "input" || i.activeElement.nodeName.toLowerCase() === "textarea"))) {
      if (e.params.keyboard.onlyInViewport && (d || c || p || u || h || m)) {
        let t3 = false;
        if (e.$el.parents(`.${e.params.slideClass}`).length > 0 && e.$el.parents(`.${e.params.slideActiveClass}`).length === 0)
          return;
        const a2 = e.$el, i2 = a2[0].clientWidth, n3 = a2[0].clientHeight, l3 = r.innerWidth, o3 = r.innerHeight, d2 = e.$el.offset();
        s2 && (d2.left -= e.$el[0].scrollLeft);
        const c2 = [[d2.left, d2.top], [d2.left + i2, d2.top], [d2.left, d2.top + n3], [d2.left + i2, d2.top + n3]];
        for (let e2 = 0; e2 < c2.length; e2 += 1) {
          const s3 = c2[e2];
          if (s3[0] >= 0 && s3[0] <= l3 && s3[1] >= 0 && s3[1] <= o3) {
            if (s3[0] === 0 && s3[1] === 0)
              continue;
            t3 = true;
          }
        }
        if (!t3)
          return;
      }
      e.isHorizontal() ? ((d || c || p || u) && (n2.preventDefault ? n2.preventDefault() : n2.returnValue = false), ((c || u) && !s2 || (d || p) && s2) && e.slideNext(), ((d || p) && !s2 || (c || u) && s2) && e.slidePrev()) : ((d || c || h || m) && (n2.preventDefault ? n2.preventDefault() : n2.returnValue = false), (c || m) && e.slideNext(), (d || h) && e.slidePrev()), a("keyPress", l2);
    }
  }
  function l() {
    e.keyboard.enabled || ($(i).on("keydown", n), e.keyboard.enabled = true);
  }
  function o() {
    e.keyboard.enabled && ($(i).off("keydown", n), e.keyboard.enabled = false);
  }
  e.keyboard = { enabled: false }, t({ keyboard: { enabled: false, onlyInViewport: true, pageUpDown: true } }), s("init", () => {
    e.params.keyboard.enabled && l();
  }), s("destroy", () => {
    e.keyboard.enabled && o();
  }), Object.assign(e.keyboard, { enable: l, disable: o });
}
function Mousewheel({ swiper: e, extendParams: t, on: s, emit: a }) {
  const i = getWindow();
  let r;
  t({ mousewheel: { enabled: false, releaseOnEdges: false, invert: false, forceToAxis: false, sensitivity: 1, eventsTarget: "container", thresholdDelta: null, thresholdTime: null } }), e.mousewheel = { enabled: false };
  let n, l = now();
  const o = [];
  function d() {
    e.enabled && (e.mouseEntered = true);
  }
  function c() {
    e.enabled && (e.mouseEntered = false);
  }
  function p(t2) {
    return !(e.params.mousewheel.thresholdDelta && t2.delta < e.params.mousewheel.thresholdDelta) && (!(e.params.mousewheel.thresholdTime && now() - l < e.params.mousewheel.thresholdTime) && (t2.delta >= 6 && now() - l < 60 || (t2.direction < 0 ? e.isEnd && !e.params.loop || e.animating || (e.slideNext(), a("scroll", t2.raw)) : e.isBeginning && !e.params.loop || e.animating || (e.slidePrev(), a("scroll", t2.raw)), l = new i.Date().getTime(), false)));
  }
  function u(t2) {
    let s2 = t2, i2 = true;
    if (!e.enabled)
      return;
    const l2 = e.params.mousewheel;
    e.params.cssMode && s2.preventDefault();
    let d2 = e.$el;
    if (e.params.mousewheel.eventsTarget !== "container" && (d2 = $(e.params.mousewheel.eventsTarget)), !e.mouseEntered && !d2[0].contains(s2.target) && !l2.releaseOnEdges)
      return true;
    s2.originalEvent && (s2 = s2.originalEvent);
    let c2 = 0;
    const u2 = e.rtlTranslate ? -1 : 1, h2 = function(e2) {
      let t3 = 0, s3 = 0, a2 = 0, i3 = 0;
      return "detail" in e2 && (s3 = e2.detail), "wheelDelta" in e2 && (s3 = -e2.wheelDelta / 120), "wheelDeltaY" in e2 && (s3 = -e2.wheelDeltaY / 120), "wheelDeltaX" in e2 && (t3 = -e2.wheelDeltaX / 120), "axis" in e2 && e2.axis === e2.HORIZONTAL_AXIS && (t3 = s3, s3 = 0), a2 = 10 * t3, i3 = 10 * s3, "deltaY" in e2 && (i3 = e2.deltaY), "deltaX" in e2 && (a2 = e2.deltaX), e2.shiftKey && !a2 && (a2 = i3, i3 = 0), (a2 || i3) && e2.deltaMode && (e2.deltaMode === 1 ? (a2 *= 40, i3 *= 40) : (a2 *= 800, i3 *= 800)), a2 && !t3 && (t3 = a2 < 1 ? -1 : 1), i3 && !s3 && (s3 = i3 < 1 ? -1 : 1), { spinX: t3, spinY: s3, pixelX: a2, pixelY: i3 };
    }(s2);
    if (l2.forceToAxis)
      if (e.isHorizontal()) {
        if (!(Math.abs(h2.pixelX) > Math.abs(h2.pixelY)))
          return true;
        c2 = -h2.pixelX * u2;
      } else {
        if (!(Math.abs(h2.pixelY) > Math.abs(h2.pixelX)))
          return true;
        c2 = -h2.pixelY;
      }
    else
      c2 = Math.abs(h2.pixelX) > Math.abs(h2.pixelY) ? -h2.pixelX * u2 : -h2.pixelY;
    if (c2 === 0)
      return true;
    l2.invert && (c2 = -c2);
    let m2 = e.getTranslate() + c2 * l2.sensitivity;
    if (m2 >= e.minTranslate() && (m2 = e.minTranslate()), m2 <= e.maxTranslate() && (m2 = e.maxTranslate()), i2 = !!e.params.loop || !(m2 === e.minTranslate() || m2 === e.maxTranslate()), i2 && e.params.nested && s2.stopPropagation(), e.params.freeMode && e.params.freeMode.enabled) {
      const t3 = { time: now(), delta: Math.abs(c2), direction: Math.sign(c2) }, i3 = n && t3.time < n.time + 500 && t3.delta <= n.delta && t3.direction === n.direction;
      if (!i3) {
        n = void 0, e.params.loop && e.loopFix();
        let d3 = e.getTranslate() + c2 * l2.sensitivity;
        const p2 = e.isBeginning, u3 = e.isEnd;
        if (d3 >= e.minTranslate() && (d3 = e.minTranslate()), d3 <= e.maxTranslate() && (d3 = e.maxTranslate()), e.setTransition(0), e.setTranslate(d3), e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses(), (!p2 && e.isBeginning || !u3 && e.isEnd) && e.updateSlidesClasses(), e.params.freeMode.sticky) {
          clearTimeout(r), r = void 0, o.length >= 15 && o.shift();
          const s3 = o.length ? o[o.length - 1] : void 0, a2 = o[0];
          if (o.push(t3), s3 && (t3.delta > s3.delta || t3.direction !== s3.direction))
            o.splice(0);
          else if (o.length >= 15 && t3.time - a2.time < 500 && a2.delta - t3.delta >= 1 && t3.delta <= 6) {
            const s4 = c2 > 0 ? 0.8 : 0.2;
            n = t3, o.splice(0), r = nextTick(() => {
              e.slideToClosest(e.params.speed, true, void 0, s4);
            }, 0);
          }
          r || (r = nextTick(() => {
            n = t3, o.splice(0), e.slideToClosest(e.params.speed, true, void 0, 0.5);
          }, 500));
        }
        if (i3 || a("scroll", s2), e.params.autoplay && e.params.autoplayDisableOnInteraction && e.autoplay.stop(), d3 === e.minTranslate() || d3 === e.maxTranslate())
          return true;
      }
    } else {
      const s3 = { time: now(), delta: Math.abs(c2), direction: Math.sign(c2), raw: t2 };
      o.length >= 2 && o.shift();
      const a2 = o.length ? o[o.length - 1] : void 0;
      if (o.push(s3), a2 ? (s3.direction !== a2.direction || s3.delta > a2.delta || s3.time > a2.time + 150) && p(s3) : p(s3), function(t3) {
        const s4 = e.params.mousewheel;
        if (t3.direction < 0) {
          if (e.isEnd && !e.params.loop && s4.releaseOnEdges)
            return true;
        } else if (e.isBeginning && !e.params.loop && s4.releaseOnEdges)
          return true;
        return false;
      }(s3))
        return true;
    }
    return s2.preventDefault ? s2.preventDefault() : s2.returnValue = false, false;
  }
  function h(t2) {
    let s2 = e.$el;
    e.params.mousewheel.eventsTarget !== "container" && (s2 = $(e.params.mousewheel.eventsTarget)), s2[t2]("mouseenter", d), s2[t2]("mouseleave", c), s2[t2]("wheel", u);
  }
  function m() {
    return e.params.cssMode ? (e.wrapperEl.removeEventListener("wheel", u), true) : !e.mousewheel.enabled && (h("on"), e.mousewheel.enabled = true, true);
  }
  function f() {
    return e.params.cssMode ? (e.wrapperEl.addEventListener(event, u), true) : !!e.mousewheel.enabled && (h("off"), e.mousewheel.enabled = false, true);
  }
  s("init", () => {
    !e.params.mousewheel.enabled && e.params.cssMode && f(), e.params.mousewheel.enabled && m();
  }), s("destroy", () => {
    e.params.cssMode && m(), e.mousewheel.enabled && f();
  }), Object.assign(e.mousewheel, { enable: m, disable: f });
}
function createElementIfNotDefined(e, t, s, a) {
  const i = getDocument();
  return e.params.createElements && Object.keys(a).forEach((r) => {
    if (!s[r] && s.auto === true) {
      let n = e.$el.children(`.${a[r]}`)[0];
      n || (n = i.createElement("div"), n.className = a[r], e.$el.append(n)), s[r] = n, t[r] = n;
    }
  }), s;
}
function Navigation({ swiper: e, extendParams: t, on: s, emit: a }) {
  function i(t2) {
    let s2;
    return t2 && (s2 = $(t2), e.params.uniqueNavElements && typeof t2 == "string" && s2.length > 1 && e.$el.find(t2).length === 1 && (s2 = e.$el.find(t2))), s2;
  }
  function r(t2, s2) {
    const a2 = e.params.navigation;
    t2 && t2.length > 0 && (t2[s2 ? "addClass" : "removeClass"](a2.disabledClass), t2[0] && t2[0].tagName === "BUTTON" && (t2[0].disabled = s2), e.params.watchOverflow && e.enabled && t2[e.isLocked ? "addClass" : "removeClass"](a2.lockClass));
  }
  function n() {
    if (e.params.loop)
      return;
    const { $nextEl: t2, $prevEl: s2 } = e.navigation;
    r(s2, e.isBeginning && !e.params.rewind), r(t2, e.isEnd && !e.params.rewind);
  }
  function l(t2) {
    t2.preventDefault(), (!e.isBeginning || e.params.loop || e.params.rewind) && e.slidePrev();
  }
  function o(t2) {
    t2.preventDefault(), (!e.isEnd || e.params.loop || e.params.rewind) && e.slideNext();
  }
  function d() {
    const t2 = e.params.navigation;
    if (e.params.navigation = createElementIfNotDefined(e, e.originalParams.navigation, e.params.navigation, { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }), !t2.nextEl && !t2.prevEl)
      return;
    const s2 = i(t2.nextEl), a2 = i(t2.prevEl);
    s2 && s2.length > 0 && s2.on("click", o), a2 && a2.length > 0 && a2.on("click", l), Object.assign(e.navigation, { $nextEl: s2, nextEl: s2 && s2[0], $prevEl: a2, prevEl: a2 && a2[0] }), e.enabled || (s2 && s2.addClass(t2.lockClass), a2 && a2.addClass(t2.lockClass));
  }
  function c() {
    const { $nextEl: t2, $prevEl: s2 } = e.navigation;
    t2 && t2.length && (t2.off("click", o), t2.removeClass(e.params.navigation.disabledClass)), s2 && s2.length && (s2.off("click", l), s2.removeClass(e.params.navigation.disabledClass));
  }
  t({ navigation: { nextEl: null, prevEl: null, hideOnClick: false, disabledClass: "swiper-button-disabled", hiddenClass: "swiper-button-hidden", lockClass: "swiper-button-lock" } }), e.navigation = { nextEl: null, $nextEl: null, prevEl: null, $prevEl: null }, s("init", () => {
    d(), n();
  }), s("toEdge fromEdge lock unlock", () => {
    n();
  }), s("destroy", () => {
    c();
  }), s("enable disable", () => {
    const { $nextEl: t2, $prevEl: s2 } = e.navigation;
    t2 && t2[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass), s2 && s2[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass);
  }), s("click", (t2, s2) => {
    const { $nextEl: i2, $prevEl: r2 } = e.navigation, n2 = s2.target;
    if (e.params.navigation.hideOnClick && !$(n2).is(r2) && !$(n2).is(i2)) {
      if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === n2 || e.pagination.el.contains(n2)))
        return;
      let t3;
      i2 ? t3 = i2.hasClass(e.params.navigation.hiddenClass) : r2 && (t3 = r2.hasClass(e.params.navigation.hiddenClass)), a(t3 === true ? "navigationShow" : "navigationHide"), i2 && i2.toggleClass(e.params.navigation.hiddenClass), r2 && r2.toggleClass(e.params.navigation.hiddenClass);
    }
  }), Object.assign(e.navigation, { update: n, init: d, destroy: c });
}
function classesToSelector(e = "") {
  return `.${e.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`;
}
function Pagination({ swiper: e, extendParams: t, on: s, emit: a }) {
  const i = "swiper-pagination";
  let r;
  t({ pagination: { el: null, bulletElement: "span", clickable: false, hideOnClick: false, renderBullet: null, renderProgressbar: null, renderFraction: null, renderCustom: null, progressbarOpposite: false, type: "bullets", dynamicBullets: false, dynamicMainBullets: 1, formatFractionCurrent: (e2) => e2, formatFractionTotal: (e2) => e2, bulletClass: `${i}-bullet`, bulletActiveClass: `${i}-bullet-active`, modifierClass: `${i}-`, currentClass: `${i}-current`, totalClass: `${i}-total`, hiddenClass: `${i}-hidden`, progressbarFillClass: `${i}-progressbar-fill`, progressbarOppositeClass: `${i}-progressbar-opposite`, clickableClass: `${i}-clickable`, lockClass: `${i}-lock`, horizontalClass: `${i}-horizontal`, verticalClass: `${i}-vertical` } }), e.pagination = { el: null, $el: null, bullets: [] };
  let n = 0;
  function l() {
    return !e.params.pagination.el || !e.pagination.el || !e.pagination.$el || e.pagination.$el.length === 0;
  }
  function o(t2, s2) {
    const { bulletActiveClass: a2 } = e.params.pagination;
    t2[s2]().addClass(`${a2}-${s2}`)[s2]().addClass(`${a2}-${s2}-${s2}`);
  }
  function d() {
    const t2 = e.rtl, s2 = e.params.pagination;
    if (l())
      return;
    const i2 = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length, d2 = e.pagination.$el;
    let c2;
    const p2 = e.params.loop ? Math.ceil((i2 - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
    if (e.params.loop ? (c2 = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup), c2 > i2 - 1 - 2 * e.loopedSlides && (c2 -= i2 - 2 * e.loopedSlides), c2 > p2 - 1 && (c2 -= p2), c2 < 0 && e.params.paginationType !== "bullets" && (c2 = p2 + c2)) : c2 = e.snapIndex !== void 0 ? e.snapIndex : e.activeIndex || 0, s2.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
      const a2 = e.pagination.bullets;
      let i3, l2, p3;
      if (s2.dynamicBullets && (r = a2.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](true), d2.css(e.isHorizontal() ? "width" : "height", r * (s2.dynamicMainBullets + 4) + "px"), s2.dynamicMainBullets > 1 && e.previousIndex !== void 0 && (n += c2 - (e.previousIndex - e.loopedSlides || 0), n > s2.dynamicMainBullets - 1 ? n = s2.dynamicMainBullets - 1 : n < 0 && (n = 0)), i3 = Math.max(c2 - n, 0), l2 = i3 + (Math.min(a2.length, s2.dynamicMainBullets) - 1), p3 = (l2 + i3) / 2), a2.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((e2) => `${s2.bulletActiveClass}${e2}`).join(" ")), d2.length > 1)
        a2.each((e2) => {
          const t3 = $(e2), a3 = t3.index();
          a3 === c2 && t3.addClass(s2.bulletActiveClass), s2.dynamicBullets && (a3 >= i3 && a3 <= l2 && t3.addClass(`${s2.bulletActiveClass}-main`), a3 === i3 && o(t3, "prev"), a3 === l2 && o(t3, "next"));
        });
      else {
        const t3 = a2.eq(c2), r2 = t3.index();
        if (t3.addClass(s2.bulletActiveClass), s2.dynamicBullets) {
          const t4 = a2.eq(i3), n2 = a2.eq(l2);
          for (let e2 = i3; e2 <= l2; e2 += 1)
            a2.eq(e2).addClass(`${s2.bulletActiveClass}-main`);
          if (e.params.loop)
            if (r2 >= a2.length) {
              for (let e2 = s2.dynamicMainBullets; e2 >= 0; e2 -= 1)
                a2.eq(a2.length - e2).addClass(`${s2.bulletActiveClass}-main`);
              a2.eq(a2.length - s2.dynamicMainBullets - 1).addClass(`${s2.bulletActiveClass}-prev`);
            } else
              o(t4, "prev"), o(n2, "next");
          else
            o(t4, "prev"), o(n2, "next");
        }
      }
      if (s2.dynamicBullets) {
        const i4 = Math.min(a2.length, s2.dynamicMainBullets + 4), n2 = (r * i4 - r) / 2 - p3 * r, l3 = t2 ? "right" : "left";
        a2.css(e.isHorizontal() ? l3 : "top", `${n2}px`);
      }
    }
    if (s2.type === "fraction" && (d2.find(classesToSelector(s2.currentClass)).text(s2.formatFractionCurrent(c2 + 1)), d2.find(classesToSelector(s2.totalClass)).text(s2.formatFractionTotal(p2))), s2.type === "progressbar") {
      let t3;
      t3 = s2.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
      const a2 = (c2 + 1) / p2;
      let i3 = 1, r2 = 1;
      t3 === "horizontal" ? i3 = a2 : r2 = a2, d2.find(classesToSelector(s2.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${i3}) scaleY(${r2})`).transition(e.params.speed);
    }
    s2.type === "custom" && s2.renderCustom ? (d2.html(s2.renderCustom(e, c2 + 1, p2)), a("paginationRender", d2[0])) : a("paginationUpdate", d2[0]), e.params.watchOverflow && e.enabled && d2[e.isLocked ? "addClass" : "removeClass"](s2.lockClass);
  }
  function c() {
    const t2 = e.params.pagination;
    if (l())
      return;
    const s2 = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length, i2 = e.pagination.$el;
    let r2 = "";
    if (t2.type === "bullets") {
      let a2 = e.params.loop ? Math.ceil((s2 - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
      e.params.freeMode && e.params.freeMode.enabled && !e.params.loop && a2 > s2 && (a2 = s2);
      for (let s3 = 0; s3 < a2; s3 += 1)
        t2.renderBullet ? r2 += t2.renderBullet.call(e, s3, t2.bulletClass) : r2 += `<${t2.bulletElement} class="${t2.bulletClass}"></${t2.bulletElement}>`;
      i2.html(r2), e.pagination.bullets = i2.find(classesToSelector(t2.bulletClass));
    }
    t2.type === "fraction" && (r2 = t2.renderFraction ? t2.renderFraction.call(e, t2.currentClass, t2.totalClass) : `<span class="${t2.currentClass}"></span> / <span class="${t2.totalClass}"></span>`, i2.html(r2)), t2.type === "progressbar" && (r2 = t2.renderProgressbar ? t2.renderProgressbar.call(e, t2.progressbarFillClass) : `<span class="${t2.progressbarFillClass}"></span>`, i2.html(r2)), t2.type !== "custom" && a("paginationRender", e.pagination.$el[0]);
  }
  function p() {
    e.params.pagination = createElementIfNotDefined(e, e.originalParams.pagination, e.params.pagination, { el: "swiper-pagination" });
    const t2 = e.params.pagination;
    if (!t2.el)
      return;
    let s2 = $(t2.el);
    s2.length !== 0 && (e.params.uniqueNavElements && typeof t2.el == "string" && s2.length > 1 && (s2 = e.$el.find(t2.el), s2.length > 1 && (s2 = s2.filter((t3) => $(t3).parents(".swiper")[0] === e.el))), t2.type === "bullets" && t2.clickable && s2.addClass(t2.clickableClass), s2.addClass(t2.modifierClass + t2.type), s2.addClass(t2.modifierClass + e.params.direction), t2.type === "bullets" && t2.dynamicBullets && (s2.addClass(`${t2.modifierClass}${t2.type}-dynamic`), n = 0, t2.dynamicMainBullets < 1 && (t2.dynamicMainBullets = 1)), t2.type === "progressbar" && t2.progressbarOpposite && s2.addClass(t2.progressbarOppositeClass), t2.clickable && s2.on("click", classesToSelector(t2.bulletClass), function(t3) {
      t3.preventDefault();
      let s3 = $(this).index() * e.params.slidesPerGroup;
      e.params.loop && (s3 += e.loopedSlides), e.slideTo(s3);
    }), Object.assign(e.pagination, { $el: s2, el: s2[0] }), e.enabled || s2.addClass(t2.lockClass));
  }
  function u() {
    const t2 = e.params.pagination;
    if (l())
      return;
    const s2 = e.pagination.$el;
    s2.removeClass(t2.hiddenClass), s2.removeClass(t2.modifierClass + t2.type), s2.removeClass(t2.modifierClass + e.params.direction), e.pagination.bullets && e.pagination.bullets.removeClass && e.pagination.bullets.removeClass(t2.bulletActiveClass), t2.clickable && s2.off("click", classesToSelector(t2.bulletClass));
  }
  s("init", () => {
    p(), c(), d();
  }), s("activeIndexChange", () => {
    (e.params.loop || e.snapIndex === void 0) && d();
  }), s("snapIndexChange", () => {
    e.params.loop || d();
  }), s("slidesLengthChange", () => {
    e.params.loop && (c(), d());
  }), s("snapGridLengthChange", () => {
    e.params.loop || (c(), d());
  }), s("destroy", () => {
    u();
  }), s("enable disable", () => {
    const { $el: t2 } = e.pagination;
    t2 && t2[e.enabled ? "removeClass" : "addClass"](e.params.pagination.lockClass);
  }), s("lock unlock", () => {
    d();
  }), s("click", (t2, s2) => {
    const i2 = s2.target, { $el: r2 } = e.pagination;
    if (e.params.pagination.el && e.params.pagination.hideOnClick && r2.length > 0 && !$(i2).hasClass(e.params.pagination.bulletClass)) {
      if (e.navigation && (e.navigation.nextEl && i2 === e.navigation.nextEl || e.navigation.prevEl && i2 === e.navigation.prevEl))
        return;
      const t3 = r2.hasClass(e.params.pagination.hiddenClass);
      a(t3 === true ? "paginationShow" : "paginationHide"), r2.toggleClass(e.params.pagination.hiddenClass);
    }
  }), Object.assign(e.pagination, { render: c, update: d, init: p, destroy: u });
}
function Scrollbar({ swiper: e, extendParams: t, on: s, emit: a }) {
  const i = getDocument();
  let r, n, l, o, d = false, c = null, p = null;
  function u() {
    if (!e.params.scrollbar.el || !e.scrollbar.el)
      return;
    const { scrollbar: t2, rtlTranslate: s2, progress: a2 } = e, { $dragEl: i2, $el: r2 } = t2, o2 = e.params.scrollbar;
    let d2 = n, p2 = (l - n) * a2;
    s2 ? (p2 = -p2, p2 > 0 ? (d2 = n - p2, p2 = 0) : -p2 + n > l && (d2 = l + p2)) : p2 < 0 ? (d2 = n + p2, p2 = 0) : p2 + n > l && (d2 = l - p2), e.isHorizontal() ? (i2.transform(`translate3d(${p2}px, 0, 0)`), i2[0].style.width = `${d2}px`) : (i2.transform(`translate3d(0px, ${p2}px, 0)`), i2[0].style.height = `${d2}px`), o2.hide && (clearTimeout(c), r2[0].style.opacity = 1, c = setTimeout(() => {
      r2[0].style.opacity = 0, r2.transition(400);
    }, 1e3));
  }
  function h() {
    if (!e.params.scrollbar.el || !e.scrollbar.el)
      return;
    const { scrollbar: t2 } = e, { $dragEl: s2, $el: a2 } = t2;
    s2[0].style.width = "", s2[0].style.height = "", l = e.isHorizontal() ? a2[0].offsetWidth : a2[0].offsetHeight, o = e.size / (e.virtualSize + e.params.slidesOffsetBefore - (e.params.centeredSlides ? e.snapGrid[0] : 0)), n = e.params.scrollbar.dragSize === "auto" ? l * o : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? s2[0].style.width = `${n}px` : s2[0].style.height = `${n}px`, a2[0].style.display = o >= 1 ? "none" : "", e.params.scrollbar.hide && (a2[0].style.opacity = 0), e.params.watchOverflow && e.enabled && t2.$el[e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass);
  }
  function m(t2) {
    return e.isHorizontal() ? t2.type === "touchstart" || t2.type === "touchmove" ? t2.targetTouches[0].clientX : t2.clientX : t2.type === "touchstart" || t2.type === "touchmove" ? t2.targetTouches[0].clientY : t2.clientY;
  }
  function f(t2) {
    const { scrollbar: s2, rtlTranslate: a2 } = e, { $el: i2 } = s2;
    let o2;
    o2 = (m(t2) - i2.offset()[e.isHorizontal() ? "left" : "top"] - (r !== null ? r : n / 2)) / (l - n), o2 = Math.max(Math.min(o2, 1), 0), a2 && (o2 = 1 - o2);
    const d2 = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * o2;
    e.updateProgress(d2), e.setTranslate(d2), e.updateActiveIndex(), e.updateSlidesClasses();
  }
  function g(t2) {
    const s2 = e.params.scrollbar, { scrollbar: i2, $wrapperEl: n2 } = e, { $el: l2, $dragEl: o2 } = i2;
    d = true, r = t2.target === o2[0] || t2.target === o2 ? m(t2) - t2.target.getBoundingClientRect()[e.isHorizontal() ? "left" : "top"] : null, t2.preventDefault(), t2.stopPropagation(), n2.transition(100), o2.transition(100), f(t2), clearTimeout(p), l2.transition(0), s2.hide && l2.css("opacity", 1), e.params.cssMode && e.$wrapperEl.css("scroll-snap-type", "none"), a("scrollbarDragStart", t2);
  }
  function v(t2) {
    const { scrollbar: s2, $wrapperEl: i2 } = e, { $el: r2, $dragEl: n2 } = s2;
    d && (t2.preventDefault ? t2.preventDefault() : t2.returnValue = false, f(t2), i2.transition(0), r2.transition(0), n2.transition(0), a("scrollbarDragMove", t2));
  }
  function w(t2) {
    const s2 = e.params.scrollbar, { scrollbar: i2, $wrapperEl: r2 } = e, { $el: n2 } = i2;
    d && (d = false, e.params.cssMode && (e.$wrapperEl.css("scroll-snap-type", ""), r2.transition("")), s2.hide && (clearTimeout(p), p = nextTick(() => {
      n2.css("opacity", 0), n2.transition(400);
    }, 1e3)), a("scrollbarDragEnd", t2), s2.snapOnRelease && e.slideToClosest());
  }
  function b(t2) {
    const { scrollbar: s2, touchEventsTouch: a2, touchEventsDesktop: r2, params: n2, support: l2 } = e, o2 = s2.$el[0], d2 = !(!l2.passiveListener || !n2.passiveListeners) && { passive: false, capture: false }, c2 = !(!l2.passiveListener || !n2.passiveListeners) && { passive: true, capture: false };
    if (!o2)
      return;
    const p2 = t2 === "on" ? "addEventListener" : "removeEventListener";
    l2.touch ? (o2[p2](a2.start, g, d2), o2[p2](a2.move, v, d2), o2[p2](a2.end, w, c2)) : (o2[p2](r2.start, g, d2), i[p2](r2.move, v, d2), i[p2](r2.end, w, c2));
  }
  function x() {
    const { scrollbar: t2, $el: s2 } = e;
    e.params.scrollbar = createElementIfNotDefined(e, e.originalParams.scrollbar, e.params.scrollbar, { el: "swiper-scrollbar" });
    const a2 = e.params.scrollbar;
    if (!a2.el)
      return;
    let i2 = $(a2.el);
    e.params.uniqueNavElements && typeof a2.el == "string" && i2.length > 1 && s2.find(a2.el).length === 1 && (i2 = s2.find(a2.el));
    let r2 = i2.find(`.${e.params.scrollbar.dragClass}`);
    r2.length === 0 && (r2 = $(`<div class="${e.params.scrollbar.dragClass}"></div>`), i2.append(r2)), Object.assign(t2, { $el: i2, el: i2[0], $dragEl: r2, dragEl: r2[0] }), a2.draggable && e.params.scrollbar.el && b("on"), i2 && i2[e.enabled ? "removeClass" : "addClass"](e.params.scrollbar.lockClass);
  }
  function y() {
    e.params.scrollbar.el && b("off");
  }
  t({ scrollbar: { el: null, dragSize: "auto", hide: false, draggable: false, snapOnRelease: true, lockClass: "swiper-scrollbar-lock", dragClass: "swiper-scrollbar-drag" } }), e.scrollbar = { el: null, dragEl: null, $el: null, $dragEl: null }, s("init", () => {
    x(), h(), u();
  }), s("update resize observerUpdate lock unlock", () => {
    h();
  }), s("setTranslate", () => {
    u();
  }), s("setTransition", (t2, s2) => {
    !function(t3) {
      e.params.scrollbar.el && e.scrollbar.el && e.scrollbar.$dragEl.transition(t3);
    }(s2);
  }), s("enable disable", () => {
    const { $el: t2 } = e.scrollbar;
    t2 && t2[e.enabled ? "removeClass" : "addClass"](e.params.scrollbar.lockClass);
  }), s("destroy", () => {
    y();
  }), Object.assign(e.scrollbar, { updateSize: h, setTranslate: u, init: x, destroy: y });
}
function Parallax({ swiper: e, extendParams: t, on: s }) {
  t({ parallax: { enabled: false } });
  const a = (t2, s2) => {
    const { rtl: a2 } = e, i2 = $(t2), r = a2 ? -1 : 1, n = i2.attr("data-swiper-parallax") || "0";
    let l = i2.attr("data-swiper-parallax-x"), o = i2.attr("data-swiper-parallax-y");
    const d = i2.attr("data-swiper-parallax-scale"), c = i2.attr("data-swiper-parallax-opacity");
    if (l || o ? (l = l || "0", o = o || "0") : e.isHorizontal() ? (l = n, o = "0") : (o = n, l = "0"), l = l.indexOf("%") >= 0 ? parseInt(l, 10) * s2 * r + "%" : l * s2 * r + "px", o = o.indexOf("%") >= 0 ? parseInt(o, 10) * s2 + "%" : o * s2 + "px", c != null) {
      const e2 = c - (c - 1) * (1 - Math.abs(s2));
      i2[0].style.opacity = e2;
    }
    if (d == null)
      i2.transform(`translate3d(${l}, ${o}, 0px)`);
    else {
      const e2 = d - (d - 1) * (1 - Math.abs(s2));
      i2.transform(`translate3d(${l}, ${o}, 0px) scale(${e2})`);
    }
  }, i = () => {
    const { $el: t2, slides: s2, progress: i2, snapGrid: r } = e;
    t2.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e2) => {
      a(e2, i2);
    }), s2.each((t3, s3) => {
      let n = t3.progress;
      e.params.slidesPerGroup > 1 && e.params.slidesPerView !== "auto" && (n += Math.ceil(s3 / 2) - i2 * (r.length - 1)), n = Math.min(Math.max(n, -1), 1), $(t3).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e2) => {
        a(e2, n);
      });
    });
  };
  s("beforeInit", () => {
    e.params.parallax.enabled && (e.params.watchSlidesProgress = true, e.originalParams.watchSlidesProgress = true);
  }), s("init", () => {
    e.params.parallax.enabled && i();
  }), s("setTranslate", () => {
    e.params.parallax.enabled && i();
  }), s("setTransition", (t2, s2) => {
    e.params.parallax.enabled && ((t3 = e.params.speed) => {
      const { $el: s3 } = e;
      s3.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e2) => {
        const s4 = $(e2);
        let a2 = parseInt(s4.attr("data-swiper-parallax-duration"), 10) || t3;
        t3 === 0 && (a2 = 0), s4.transition(a2);
      });
    })(s2);
  });
}
function Zoom({ swiper: e, extendParams: t, on: s, emit: a }) {
  const i = getWindow();
  t({ zoom: { enabled: false, maxRatio: 3, minRatio: 1, toggle: true, containerClass: "swiper-zoom-container", zoomedSlideClass: "swiper-slide-zoomed" } }), e.zoom = { enabled: false };
  let r, n, l, o = 1, d = false;
  const c = { $slideEl: void 0, slideWidth: void 0, slideHeight: void 0, $imageEl: void 0, $imageWrapEl: void 0, maxRatio: 3 }, p = { isTouched: void 0, isMoved: void 0, currentX: void 0, currentY: void 0, minX: void 0, minY: void 0, maxX: void 0, maxY: void 0, width: void 0, height: void 0, startX: void 0, startY: void 0, touchesStart: {}, touchesCurrent: {} }, u = { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 };
  let h = 1;
  function m(e2) {
    if (e2.targetTouches.length < 2)
      return 1;
    const t2 = e2.targetTouches[0].pageX, s2 = e2.targetTouches[0].pageY, a2 = e2.targetTouches[1].pageX, i2 = e2.targetTouches[1].pageY;
    return Math.sqrt((a2 - t2) ** 2 + (i2 - s2) ** 2);
  }
  function f(t2) {
    const s2 = e.support, a2 = e.params.zoom;
    if (n = false, l = false, !s2.gestures) {
      if (t2.type !== "touchstart" || t2.type === "touchstart" && t2.targetTouches.length < 2)
        return;
      n = true, c.scaleStart = m(t2);
    }
    c.$slideEl && c.$slideEl.length || (c.$slideEl = $(t2.target).closest(`.${e.params.slideClass}`), c.$slideEl.length === 0 && (c.$slideEl = e.slides.eq(e.activeIndex)), c.$imageEl = c.$slideEl.find(`.${a2.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), c.$imageWrapEl = c.$imageEl.parent(`.${a2.containerClass}`), c.maxRatio = c.$imageWrapEl.attr("data-swiper-zoom") || a2.maxRatio, c.$imageWrapEl.length !== 0) ? (c.$imageEl && c.$imageEl.transition(0), d = true) : c.$imageEl = void 0;
  }
  function g(t2) {
    const s2 = e.support, a2 = e.params.zoom, i2 = e.zoom;
    if (!s2.gestures) {
      if (t2.type !== "touchmove" || t2.type === "touchmove" && t2.targetTouches.length < 2)
        return;
      l = true, c.scaleMove = m(t2);
    }
    c.$imageEl && c.$imageEl.length !== 0 ? (s2.gestures ? i2.scale = t2.scale * o : i2.scale = c.scaleMove / c.scaleStart * o, i2.scale > c.maxRatio && (i2.scale = c.maxRatio - 1 + (i2.scale - c.maxRatio + 1) ** 0.5), i2.scale < a2.minRatio && (i2.scale = a2.minRatio + 1 - (a2.minRatio - i2.scale + 1) ** 0.5), c.$imageEl.transform(`translate3d(0,0,0) scale(${i2.scale})`)) : t2.type === "gesturechange" && f(t2);
  }
  function v(t2) {
    const s2 = e.device, a2 = e.support, i2 = e.params.zoom, r2 = e.zoom;
    if (!a2.gestures) {
      if (!n || !l)
        return;
      if (t2.type !== "touchend" || t2.type === "touchend" && t2.changedTouches.length < 2 && !s2.android)
        return;
      n = false, l = false;
    }
    c.$imageEl && c.$imageEl.length !== 0 && (r2.scale = Math.max(Math.min(r2.scale, c.maxRatio), i2.minRatio), c.$imageEl.transition(e.params.speed).transform(`translate3d(0,0,0) scale(${r2.scale})`), o = r2.scale, d = false, r2.scale === 1 && (c.$slideEl = void 0));
  }
  function w(t2) {
    const s2 = e.zoom;
    if (!c.$imageEl || c.$imageEl.length === 0)
      return;
    if (e.allowClick = false, !p.isTouched || !c.$slideEl)
      return;
    p.isMoved || (p.width = c.$imageEl[0].offsetWidth, p.height = c.$imageEl[0].offsetHeight, p.startX = getTranslate(c.$imageWrapEl[0], "x") || 0, p.startY = getTranslate(c.$imageWrapEl[0], "y") || 0, c.slideWidth = c.$slideEl[0].offsetWidth, c.slideHeight = c.$slideEl[0].offsetHeight, c.$imageWrapEl.transition(0));
    const a2 = p.width * s2.scale, i2 = p.height * s2.scale;
    if (!(a2 < c.slideWidth && i2 < c.slideHeight)) {
      if (p.minX = Math.min(c.slideWidth / 2 - a2 / 2, 0), p.maxX = -p.minX, p.minY = Math.min(c.slideHeight / 2 - i2 / 2, 0), p.maxY = -p.minY, p.touchesCurrent.x = t2.type === "touchmove" ? t2.targetTouches[0].pageX : t2.pageX, p.touchesCurrent.y = t2.type === "touchmove" ? t2.targetTouches[0].pageY : t2.pageY, !p.isMoved && !d) {
        if (e.isHorizontal() && (Math.floor(p.minX) === Math.floor(p.startX) && p.touchesCurrent.x < p.touchesStart.x || Math.floor(p.maxX) === Math.floor(p.startX) && p.touchesCurrent.x > p.touchesStart.x))
          return void (p.isTouched = false);
        if (!e.isHorizontal() && (Math.floor(p.minY) === Math.floor(p.startY) && p.touchesCurrent.y < p.touchesStart.y || Math.floor(p.maxY) === Math.floor(p.startY) && p.touchesCurrent.y > p.touchesStart.y))
          return void (p.isTouched = false);
      }
      t2.cancelable && t2.preventDefault(), t2.stopPropagation(), p.isMoved = true, p.currentX = p.touchesCurrent.x - p.touchesStart.x + p.startX, p.currentY = p.touchesCurrent.y - p.touchesStart.y + p.startY, p.currentX < p.minX && (p.currentX = p.minX + 1 - (p.minX - p.currentX + 1) ** 0.8), p.currentX > p.maxX && (p.currentX = p.maxX - 1 + (p.currentX - p.maxX + 1) ** 0.8), p.currentY < p.minY && (p.currentY = p.minY + 1 - (p.minY - p.currentY + 1) ** 0.8), p.currentY > p.maxY && (p.currentY = p.maxY - 1 + (p.currentY - p.maxY + 1) ** 0.8), u.prevPositionX || (u.prevPositionX = p.touchesCurrent.x), u.prevPositionY || (u.prevPositionY = p.touchesCurrent.y), u.prevTime || (u.prevTime = Date.now()), u.x = (p.touchesCurrent.x - u.prevPositionX) / (Date.now() - u.prevTime) / 2, u.y = (p.touchesCurrent.y - u.prevPositionY) / (Date.now() - u.prevTime) / 2, Math.abs(p.touchesCurrent.x - u.prevPositionX) < 2 && (u.x = 0), Math.abs(p.touchesCurrent.y - u.prevPositionY) < 2 && (u.y = 0), u.prevPositionX = p.touchesCurrent.x, u.prevPositionY = p.touchesCurrent.y, u.prevTime = Date.now(), c.$imageWrapEl.transform(`translate3d(${p.currentX}px, ${p.currentY}px,0)`);
    }
  }
  function b() {
    const t2 = e.zoom;
    c.$slideEl && e.previousIndex !== e.activeIndex && (c.$imageEl && c.$imageEl.transform("translate3d(0,0,0) scale(1)"), c.$imageWrapEl && c.$imageWrapEl.transform("translate3d(0,0,0)"), t2.scale = 1, o = 1, c.$slideEl = void 0, c.$imageEl = void 0, c.$imageWrapEl = void 0);
  }
  function x(t2) {
    const s2 = e.zoom, a2 = e.params.zoom;
    if (c.$slideEl || (t2 && t2.target && (c.$slideEl = $(t2.target).closest(`.${e.params.slideClass}`)), c.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? c.$slideEl = e.$wrapperEl.children(`.${e.params.slideActiveClass}`) : c.$slideEl = e.slides.eq(e.activeIndex)), c.$imageEl = c.$slideEl.find(`.${a2.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), c.$imageWrapEl = c.$imageEl.parent(`.${a2.containerClass}`)), !c.$imageEl || c.$imageEl.length === 0 || !c.$imageWrapEl || c.$imageWrapEl.length === 0)
      return;
    let r2, n2, l2, d2, u2, h2, m2, f2, g2, v2, w2, b2, x2, y2, E2, T2, S2, C2;
    e.params.cssMode && (e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.touchAction = "none"), c.$slideEl.addClass(`${a2.zoomedSlideClass}`), p.touchesStart.x === void 0 && t2 ? (r2 = t2.type === "touchend" ? t2.changedTouches[0].pageX : t2.pageX, n2 = t2.type === "touchend" ? t2.changedTouches[0].pageY : t2.pageY) : (r2 = p.touchesStart.x, n2 = p.touchesStart.y), s2.scale = c.$imageWrapEl.attr("data-swiper-zoom") || a2.maxRatio, o = c.$imageWrapEl.attr("data-swiper-zoom") || a2.maxRatio, t2 ? (S2 = c.$slideEl[0].offsetWidth, C2 = c.$slideEl[0].offsetHeight, l2 = c.$slideEl.offset().left + i.scrollX, d2 = c.$slideEl.offset().top + i.scrollY, u2 = l2 + S2 / 2 - r2, h2 = d2 + C2 / 2 - n2, g2 = c.$imageEl[0].offsetWidth, v2 = c.$imageEl[0].offsetHeight, w2 = g2 * s2.scale, b2 = v2 * s2.scale, x2 = Math.min(S2 / 2 - w2 / 2, 0), y2 = Math.min(C2 / 2 - b2 / 2, 0), E2 = -x2, T2 = -y2, m2 = u2 * s2.scale, f2 = h2 * s2.scale, m2 < x2 && (m2 = x2), m2 > E2 && (m2 = E2), f2 < y2 && (f2 = y2), f2 > T2 && (f2 = T2)) : (m2 = 0, f2 = 0), c.$imageWrapEl.transition(300).transform(`translate3d(${m2}px, ${f2}px,0)`), c.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${s2.scale})`);
  }
  function y() {
    const t2 = e.zoom, s2 = e.params.zoom;
    c.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? c.$slideEl = e.$wrapperEl.children(`.${e.params.slideActiveClass}`) : c.$slideEl = e.slides.eq(e.activeIndex), c.$imageEl = c.$slideEl.find(`.${s2.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), c.$imageWrapEl = c.$imageEl.parent(`.${s2.containerClass}`)), c.$imageEl && c.$imageEl.length !== 0 && c.$imageWrapEl && c.$imageWrapEl.length !== 0 && (e.params.cssMode && (e.wrapperEl.style.overflow = "", e.wrapperEl.style.touchAction = ""), t2.scale = 1, o = 1, c.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), c.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), c.$slideEl.removeClass(`${s2.zoomedSlideClass}`), c.$slideEl = void 0);
  }
  function E(t2) {
    const s2 = e.zoom;
    s2.scale && s2.scale !== 1 ? y() : x(t2);
  }
  function T() {
    const t2 = e.support;
    return { passiveListener: !(e.touchEvents.start !== "touchstart" || !t2.passiveListener || !e.params.passiveListeners) && { passive: true, capture: false }, activeListenerWithCapture: !t2.passiveListener || { passive: false, capture: true } };
  }
  function S() {
    return `.${e.params.slideClass}`;
  }
  function C(t2) {
    const { passiveListener: s2 } = T(), a2 = S();
    e.$wrapperEl[t2]("gesturestart", a2, f, s2), e.$wrapperEl[t2]("gesturechange", a2, g, s2), e.$wrapperEl[t2]("gestureend", a2, v, s2);
  }
  function M() {
    r || (r = true, C("on"));
  }
  function P() {
    r && (r = false, C("off"));
  }
  function k() {
    const t2 = e.zoom;
    if (t2.enabled)
      return;
    t2.enabled = true;
    const s2 = e.support, { passiveListener: a2, activeListenerWithCapture: i2 } = T(), r2 = S();
    s2.gestures ? (e.$wrapperEl.on(e.touchEvents.start, M, a2), e.$wrapperEl.on(e.touchEvents.end, P, a2)) : e.touchEvents.start === "touchstart" && (e.$wrapperEl.on(e.touchEvents.start, r2, f, a2), e.$wrapperEl.on(e.touchEvents.move, r2, g, i2), e.$wrapperEl.on(e.touchEvents.end, r2, v, a2), e.touchEvents.cancel && e.$wrapperEl.on(e.touchEvents.cancel, r2, v, a2)), e.$wrapperEl.on(e.touchEvents.move, `.${e.params.zoom.containerClass}`, w, i2);
  }
  function z() {
    const t2 = e.zoom;
    if (!t2.enabled)
      return;
    const s2 = e.support;
    t2.enabled = false;
    const { passiveListener: a2, activeListenerWithCapture: i2 } = T(), r2 = S();
    s2.gestures ? (e.$wrapperEl.off(e.touchEvents.start, M, a2), e.$wrapperEl.off(e.touchEvents.end, P, a2)) : e.touchEvents.start === "touchstart" && (e.$wrapperEl.off(e.touchEvents.start, r2, f, a2), e.$wrapperEl.off(e.touchEvents.move, r2, g, i2), e.$wrapperEl.off(e.touchEvents.end, r2, v, a2), e.touchEvents.cancel && e.$wrapperEl.off(e.touchEvents.cancel, r2, v, a2)), e.$wrapperEl.off(e.touchEvents.move, `.${e.params.zoom.containerClass}`, w, i2);
  }
  Object.defineProperty(e.zoom, "scale", { get: () => h, set(e2) {
    if (h !== e2) {
      const t2 = c.$imageEl ? c.$imageEl[0] : void 0, s2 = c.$slideEl ? c.$slideEl[0] : void 0;
      a("zoomChange", e2, t2, s2);
    }
    h = e2;
  } }), s("init", () => {
    e.params.zoom.enabled && k();
  }), s("destroy", () => {
    z();
  }), s("touchStart", (t2, s2) => {
    e.zoom.enabled && function(t3) {
      const s3 = e.device;
      c.$imageEl && c.$imageEl.length !== 0 && (p.isTouched || (s3.android && t3.cancelable && t3.preventDefault(), p.isTouched = true, p.touchesStart.x = t3.type === "touchstart" ? t3.targetTouches[0].pageX : t3.pageX, p.touchesStart.y = t3.type === "touchstart" ? t3.targetTouches[0].pageY : t3.pageY));
    }(s2);
  }), s("touchEnd", (t2, s2) => {
    e.zoom.enabled && function() {
      const t3 = e.zoom;
      if (!c.$imageEl || c.$imageEl.length === 0)
        return;
      if (!p.isTouched || !p.isMoved)
        return p.isTouched = false, void (p.isMoved = false);
      p.isTouched = false, p.isMoved = false;
      let s3 = 300, a2 = 300;
      const i2 = u.x * s3, r2 = p.currentX + i2, n2 = u.y * a2, l2 = p.currentY + n2;
      u.x !== 0 && (s3 = Math.abs((r2 - p.currentX) / u.x)), u.y !== 0 && (a2 = Math.abs((l2 - p.currentY) / u.y));
      const o2 = Math.max(s3, a2);
      p.currentX = r2, p.currentY = l2;
      const d2 = p.width * t3.scale, h2 = p.height * t3.scale;
      p.minX = Math.min(c.slideWidth / 2 - d2 / 2, 0), p.maxX = -p.minX, p.minY = Math.min(c.slideHeight / 2 - h2 / 2, 0), p.maxY = -p.minY, p.currentX = Math.max(Math.min(p.currentX, p.maxX), p.minX), p.currentY = Math.max(Math.min(p.currentY, p.maxY), p.minY), c.$imageWrapEl.transition(o2).transform(`translate3d(${p.currentX}px, ${p.currentY}px,0)`);
    }();
  }), s("doubleTap", (t2, s2) => {
    !e.animating && e.params.zoom.enabled && e.zoom.enabled && e.params.zoom.toggle && E(s2);
  }), s("transitionEnd", () => {
    e.zoom.enabled && e.params.zoom.enabled && b();
  }), s("slideChange", () => {
    e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && b();
  }), Object.assign(e.zoom, { enable: k, disable: z, in: x, out: y, toggle: E });
}
function Lazy({ swiper: e, extendParams: t, on: s, emit: a }) {
  t({ lazy: { checkInView: false, enabled: false, loadPrevNext: false, loadPrevNextAmount: 1, loadOnTransitionStart: false, scrollingElement: "", elementClass: "swiper-lazy", loadingClass: "swiper-lazy-loading", loadedClass: "swiper-lazy-loaded", preloaderClass: "swiper-lazy-preloader" } }), e.lazy = {};
  let i = false, r = false;
  function n(t2, s2 = true) {
    const i2 = e.params.lazy;
    if (t2 === void 0)
      return;
    if (e.slides.length === 0)
      return;
    const r2 = e.virtual && e.params.virtual.enabled ? e.$wrapperEl.children(`.${e.params.slideClass}[data-swiper-slide-index="${t2}"]`) : e.slides.eq(t2), l2 = r2.find(`.${i2.elementClass}:not(.${i2.loadedClass}):not(.${i2.loadingClass})`);
    !r2.hasClass(i2.elementClass) || r2.hasClass(i2.loadedClass) || r2.hasClass(i2.loadingClass) || l2.push(r2[0]), l2.length !== 0 && l2.each((t3) => {
      const l3 = $(t3);
      l3.addClass(i2.loadingClass);
      const o2 = l3.attr("data-background"), d = l3.attr("data-src"), c = l3.attr("data-srcset"), p = l3.attr("data-sizes"), u = l3.parent("picture");
      e.loadImage(l3[0], d || o2, c, p, false, () => {
        if (e != null && e && (!e || e.params) && !e.destroyed) {
          if (o2 ? (l3.css("background-image", `url("${o2}")`), l3.removeAttr("data-background")) : (c && (l3.attr("srcset", c), l3.removeAttr("data-srcset")), p && (l3.attr("sizes", p), l3.removeAttr("data-sizes")), u.length && u.children("source").each((e2) => {
            const t4 = $(e2);
            t4.attr("data-srcset") && (t4.attr("srcset", t4.attr("data-srcset")), t4.removeAttr("data-srcset"));
          }), d && (l3.attr("src", d), l3.removeAttr("data-src"))), l3.addClass(i2.loadedClass).removeClass(i2.loadingClass), r2.find(`.${i2.preloaderClass}`).remove(), e.params.loop && s2) {
            const t4 = r2.attr("data-swiper-slide-index");
            if (r2.hasClass(e.params.slideDuplicateClass)) {
              n(e.$wrapperEl.children(`[data-swiper-slide-index="${t4}"]:not(.${e.params.slideDuplicateClass})`).index(), false);
            } else {
              n(e.$wrapperEl.children(`.${e.params.slideDuplicateClass}[data-swiper-slide-index="${t4}"]`).index(), false);
            }
          }
          a("lazyImageReady", r2[0], l3[0]), e.params.autoHeight && e.updateAutoHeight();
        }
      }), a("lazyImageLoad", r2[0], l3[0]);
    });
  }
  function l() {
    const { $wrapperEl: t2, params: s2, slides: a2, activeIndex: i2 } = e, l2 = e.virtual && s2.virtual.enabled, o2 = s2.lazy;
    let d = s2.slidesPerView;
    function c(e2) {
      if (l2) {
        if (t2.children(`.${s2.slideClass}[data-swiper-slide-index="${e2}"]`).length)
          return true;
      } else if (a2[e2])
        return true;
      return false;
    }
    function p(e2) {
      return l2 ? $(e2).attr("data-swiper-slide-index") : $(e2).index();
    }
    if (d === "auto" && (d = 0), r || (r = true), e.params.watchSlidesProgress)
      t2.children(`.${s2.slideVisibleClass}`).each((e2) => {
        n(l2 ? $(e2).attr("data-swiper-slide-index") : $(e2).index());
      });
    else if (d > 1)
      for (let e2 = i2; e2 < i2 + d; e2 += 1)
        c(e2) && n(e2);
    else
      n(i2);
    if (o2.loadPrevNext)
      if (d > 1 || o2.loadPrevNextAmount && o2.loadPrevNextAmount > 1) {
        const e2 = o2.loadPrevNextAmount, t3 = d, s3 = Math.min(i2 + t3 + Math.max(e2, t3), a2.length), r2 = Math.max(i2 - Math.max(t3, e2), 0);
        for (let e3 = i2 + d; e3 < s3; e3 += 1)
          c(e3) && n(e3);
        for (let e3 = r2; e3 < i2; e3 += 1)
          c(e3) && n(e3);
      } else {
        const e2 = t2.children(`.${s2.slideNextClass}`);
        e2.length > 0 && n(p(e2));
        const a3 = t2.children(`.${s2.slidePrevClass}`);
        a3.length > 0 && n(p(a3));
      }
  }
  function o() {
    const t2 = getWindow();
    if (!e || e.destroyed)
      return;
    const s2 = e.params.lazy.scrollingElement ? $(e.params.lazy.scrollingElement) : $(t2), a2 = s2[0] === t2, r2 = a2 ? t2.innerWidth : s2[0].offsetWidth, n2 = a2 ? t2.innerHeight : s2[0].offsetHeight, d = e.$el.offset(), { rtlTranslate: c } = e;
    let p = false;
    c && (d.left -= e.$el[0].scrollLeft);
    const u = [[d.left, d.top], [d.left + e.width, d.top], [d.left, d.top + e.height], [d.left + e.width, d.top + e.height]];
    for (let e2 = 0; e2 < u.length; e2 += 1) {
      const t3 = u[e2];
      if (t3[0] >= 0 && t3[0] <= r2 && t3[1] >= 0 && t3[1] <= n2) {
        if (t3[0] === 0 && t3[1] === 0)
          continue;
        p = true;
      }
    }
    const h = !(e.touchEvents.start !== "touchstart" || !e.support.passiveListener || !e.params.passiveListeners) && { passive: true, capture: false };
    p ? (l(), s2.off("scroll", o, h)) : i || (i = true, s2.on("scroll", o, h));
  }
  s("beforeInit", () => {
    e.params.lazy.enabled && e.params.preloadImages && (e.params.preloadImages = false);
  }), s("init", () => {
    e.params.lazy.enabled && (e.params.lazy.checkInView ? o() : l());
  }), s("scroll", () => {
    e.params.freeMode && e.params.freeMode.enabled && !e.params.freeMode.sticky && l();
  }), s("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
    e.params.lazy.enabled && (e.params.lazy.checkInView ? o() : l());
  }), s("transitionStart", () => {
    e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !r) && (e.params.lazy.checkInView ? o() : l());
  }), s("transitionEnd", () => {
    e.params.lazy.enabled && !e.params.lazy.loadOnTransitionStart && (e.params.lazy.checkInView ? o() : l());
  }), s("slideChange", () => {
    const { lazy: t2, cssMode: s2, watchSlidesProgress: a2, touchReleaseOnEdges: i2, resistanceRatio: r2 } = e.params;
    t2.enabled && (s2 || a2 && (i2 || r2 === 0)) && l();
  }), Object.assign(e.lazy, { load: l, loadInSlide: n });
}
function Controller({ swiper: e, extendParams: t, on: s }) {
  function a(e2, t2) {
    const s2 = function() {
      let e3, t3, s3;
      return (a3, i3) => {
        for (t3 = -1, e3 = a3.length; e3 - t3 > 1; )
          s3 = e3 + t3 >> 1, a3[s3] <= i3 ? t3 = s3 : e3 = s3;
        return e3;
      };
    }();
    let a2, i2;
    return this.x = e2, this.y = t2, this.lastIndex = e2.length - 1, this.interpolate = function(e3) {
      return e3 ? (i2 = s2(this.x, e3), a2 = i2 - 1, (e3 - this.x[a2]) * (this.y[i2] - this.y[a2]) / (this.x[i2] - this.x[a2]) + this.y[a2]) : 0;
    }, this;
  }
  function i() {
    e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline);
  }
  t({ controller: { control: void 0, inverse: false, by: "slide" } }), e.controller = { control: void 0 }, s("beforeInit", () => {
    e.controller.control = e.params.controller.control;
  }), s("update", () => {
    i();
  }), s("resize", () => {
    i();
  }), s("observerUpdate", () => {
    i();
  }), s("setTranslate", (t2, s2, a2) => {
    e.controller.control && e.controller.setTranslate(s2, a2);
  }), s("setTransition", (t2, s2, a2) => {
    e.controller.control && e.controller.setTransition(s2, a2);
  }), Object.assign(e.controller, { setTranslate: function(t2, s2) {
    const i2 = e.controller.control;
    let r, n;
    const l = e.constructor;
    function o(t3) {
      const s3 = e.rtlTranslate ? -e.translate : e.translate;
      e.params.controller.by === "slide" && (!function(t4) {
        e.controller.spline || (e.controller.spline = e.params.loop ? new a(e.slidesGrid, t4.slidesGrid) : new a(e.snapGrid, t4.snapGrid));
      }(t3), n = -e.controller.spline.interpolate(-s3)), n && e.params.controller.by !== "container" || (r = (t3.maxTranslate() - t3.minTranslate()) / (e.maxTranslate() - e.minTranslate()), n = (s3 - e.minTranslate()) * r + t3.minTranslate()), e.params.controller.inverse && (n = t3.maxTranslate() - n), t3.updateProgress(n), t3.setTranslate(n, e), t3.updateActiveIndex(), t3.updateSlidesClasses();
    }
    if (Array.isArray(i2))
      for (let e2 = 0; e2 < i2.length; e2 += 1)
        i2[e2] !== s2 && i2[e2] instanceof l && o(i2[e2]);
    else
      i2 instanceof l && s2 !== i2 && o(i2);
  }, setTransition: function(t2, s2) {
    const a2 = e.constructor, i2 = e.controller.control;
    let r;
    function n(s3) {
      s3.setTransition(t2, e), t2 !== 0 && (s3.transitionStart(), s3.params.autoHeight && nextTick(() => {
        s3.updateAutoHeight();
      }), s3.$wrapperEl.transitionEnd(() => {
        i2 && (s3.params.loop && e.params.controller.by === "slide" && s3.loopFix(), s3.transitionEnd());
      }));
    }
    if (Array.isArray(i2))
      for (r = 0; r < i2.length; r += 1)
        i2[r] !== s2 && i2[r] instanceof a2 && n(i2[r]);
    else
      i2 instanceof a2 && s2 !== i2 && n(i2);
  } });
}
function A11y({ swiper: e, extendParams: t, on: s }) {
  t({ a11y: { enabled: true, notificationClass: "swiper-notification", prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}", slideLabelMessage: "{{index}} / {{slidesLength}}", containerMessage: null, containerRoleDescriptionMessage: null, itemRoleDescriptionMessage: null, slideRole: "group" } });
  let a = null;
  function i(e2) {
    const t2 = a;
    t2.length !== 0 && (t2.html(""), t2.html(e2));
  }
  function r(e2) {
    e2.attr("tabIndex", "0");
  }
  function n(e2) {
    e2.attr("tabIndex", "-1");
  }
  function l(e2, t2) {
    e2.attr("role", t2);
  }
  function o(e2, t2) {
    e2.attr("aria-roledescription", t2);
  }
  function d(e2, t2) {
    e2.attr("aria-label", t2);
  }
  function c(e2) {
    e2.attr("aria-disabled", true);
  }
  function p(e2) {
    e2.attr("aria-disabled", false);
  }
  function u(t2) {
    if (t2.keyCode !== 13 && t2.keyCode !== 32)
      return;
    const s2 = e.params.a11y, a2 = $(t2.target);
    e.navigation && e.navigation.$nextEl && a2.is(e.navigation.$nextEl) && (e.isEnd && !e.params.loop || e.slideNext(), e.isEnd ? i(s2.lastSlideMessage) : i(s2.nextSlideMessage)), e.navigation && e.navigation.$prevEl && a2.is(e.navigation.$prevEl) && (e.isBeginning && !e.params.loop || e.slidePrev(), e.isBeginning ? i(s2.firstSlideMessage) : i(s2.prevSlideMessage)), e.pagination && a2.is(classesToSelector(e.params.pagination.bulletClass)) && a2[0].click();
  }
  function h() {
    if (e.params.loop || e.params.rewind || !e.navigation)
      return;
    const { $nextEl: t2, $prevEl: s2 } = e.navigation;
    s2 && s2.length > 0 && (e.isBeginning ? (c(s2), n(s2)) : (p(s2), r(s2))), t2 && t2.length > 0 && (e.isEnd ? (c(t2), n(t2)) : (p(t2), r(t2)));
  }
  function m() {
    return e.pagination && e.pagination.bullets && e.pagination.bullets.length;
  }
  function f() {
    return m() && e.params.pagination.clickable;
  }
  const g = (e2, t2, s2) => {
    r(e2), e2[0].tagName !== "BUTTON" && (l(e2, "button"), e2.on("keydown", u)), d(e2, s2), function(e3, t3) {
      e3.attr("aria-controls", t3);
    }(e2, t2);
  };
  function v() {
    const t2 = e.params.a11y;
    e.$el.append(a);
    const s2 = e.$el;
    t2.containerRoleDescriptionMessage && o(s2, t2.containerRoleDescriptionMessage), t2.containerMessage && d(s2, t2.containerMessage);
    const i2 = e.$wrapperEl, r2 = i2.attr("id") || `swiper-wrapper-${function(e2 = 16) {
      return "x".repeat(e2).replace(/x/g, () => Math.round(16 * Math.random()).toString(16));
    }(16)}`, n2 = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
    var c2;
    c2 = r2, i2.attr("id", c2), function(e2, t3) {
      e2.attr("aria-live", t3);
    }(i2, n2), t2.itemRoleDescriptionMessage && o($(e.slides), t2.itemRoleDescriptionMessage), l($(e.slides), t2.slideRole);
    const p2 = e.params.loop ? e.slides.filter((t3) => !t3.classList.contains(e.params.slideDuplicateClass)).length : e.slides.length;
    let h2, m2;
    e.slides.each((s3, a2) => {
      const i3 = $(s3), r3 = e.params.loop ? parseInt(i3.attr("data-swiper-slide-index"), 10) : a2;
      d(i3, t2.slideLabelMessage.replace(/\{\{index\}\}/, r3 + 1).replace(/\{\{slidesLength\}\}/, p2));
    }), e.navigation && e.navigation.$nextEl && (h2 = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (m2 = e.navigation.$prevEl), h2 && h2.length && g(h2, r2, t2.nextSlideMessage), m2 && m2.length && g(m2, r2, t2.prevSlideMessage), f() && e.pagination.$el.on("keydown", classesToSelector(e.params.pagination.bulletClass), u);
  }
  s("beforeInit", () => {
    a = $(`<span class="${e.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`);
  }), s("afterInit", () => {
    e.params.a11y.enabled && (v(), h());
  }), s("toEdge", () => {
    e.params.a11y.enabled && h();
  }), s("fromEdge", () => {
    e.params.a11y.enabled && h();
  }), s("paginationUpdate", () => {
    e.params.a11y.enabled && function() {
      const t2 = e.params.a11y;
      m() && e.pagination.bullets.each((s2) => {
        const a2 = $(s2);
        e.params.pagination.clickable && (r(a2), e.params.pagination.renderBullet || (l(a2, "button"), d(a2, t2.paginationBulletMessage.replace(/\{\{index\}\}/, a2.index() + 1)))), a2.is(`.${e.params.pagination.bulletActiveClass}`) ? a2.attr("aria-current", "true") : a2.removeAttr("aria-current");
      });
    }();
  }), s("destroy", () => {
    e.params.a11y.enabled && function() {
      let t2, s2;
      a && a.length > 0 && a.remove(), e.navigation && e.navigation.$nextEl && (t2 = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (s2 = e.navigation.$prevEl), t2 && t2.off("keydown", u), s2 && s2.off("keydown", u), f() && e.pagination.$el.off("keydown", classesToSelector(e.params.pagination.bulletClass), u);
    }();
  });
}
function History({ swiper: e, extendParams: t, on: s }) {
  t({ history: { enabled: false, root: "", replaceState: false, key: "slides" } });
  let a = false, i = {};
  const r = (e2) => e2.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""), n = (e2) => {
    const t2 = getWindow();
    let s2;
    s2 = e2 ? new URL(e2) : t2.location;
    const a2 = s2.pathname.slice(1).split("/").filter((e3) => e3 !== ""), i2 = a2.length;
    return { key: a2[i2 - 2], value: a2[i2 - 1] };
  }, l = (t2, s2) => {
    const i2 = getWindow();
    if (!a || !e.params.history.enabled)
      return;
    let n2;
    n2 = e.params.url ? new URL(e.params.url) : i2.location;
    const l2 = e.slides.eq(s2);
    let o2 = r(l2.attr("data-history"));
    if (e.params.history.root.length > 0) {
      let s3 = e.params.history.root;
      s3[s3.length - 1] === "/" && (s3 = s3.slice(0, s3.length - 1)), o2 = `${s3}/${t2}/${o2}`;
    } else
      n2.pathname.includes(t2) || (o2 = `${t2}/${o2}`);
    const d2 = i2.history.state;
    d2 && d2.value === o2 || (e.params.history.replaceState ? i2.history.replaceState({ value: o2 }, null, o2) : i2.history.pushState({ value: o2 }, null, o2));
  }, o = (t2, s2, a2) => {
    if (s2)
      for (let i2 = 0, n2 = e.slides.length; i2 < n2; i2 += 1) {
        const n3 = e.slides.eq(i2);
        if (r(n3.attr("data-history")) === s2 && !n3.hasClass(e.params.slideDuplicateClass)) {
          const s3 = n3.index();
          e.slideTo(s3, t2, a2);
        }
      }
    else
      e.slideTo(0, t2, a2);
  }, d = () => {
    i = n(e.params.url), o(e.params.speed, e.paths.value, false);
  };
  s("init", () => {
    e.params.history.enabled && (() => {
      const t2 = getWindow();
      if (e.params.history) {
        if (!t2.history || !t2.history.pushState)
          return e.params.history.enabled = false, void (e.params.hashNavigation.enabled = true);
        a = true, i = n(e.params.url), (i.key || i.value) && (o(0, i.value, e.params.runCallbacksOnInit), e.params.history.replaceState || t2.addEventListener("popstate", d));
      }
    })();
  }), s("destroy", () => {
    e.params.history.enabled && (() => {
      const t2 = getWindow();
      e.params.history.replaceState || t2.removeEventListener("popstate", d);
    })();
  }), s("transitionEnd _freeModeNoMomentumRelease", () => {
    a && l(e.params.history.key, e.activeIndex);
  }), s("slideChange", () => {
    a && e.params.cssMode && l(e.params.history.key, e.activeIndex);
  });
}
function HashNavigation({ swiper: e, extendParams: t, emit: s, on: a }) {
  let i = false;
  const r = getDocument(), n = getWindow();
  t({ hashNavigation: { enabled: false, replaceState: false, watchState: false } });
  const l = () => {
    s("hashChange");
    const t2 = r.location.hash.replace("#", "");
    if (t2 !== e.slides.eq(e.activeIndex).attr("data-hash")) {
      const s2 = e.$wrapperEl.children(`.${e.params.slideClass}[data-hash="${t2}"]`).index();
      if (s2 === void 0)
        return;
      e.slideTo(s2);
    }
  }, o = () => {
    if (i && e.params.hashNavigation.enabled)
      if (e.params.hashNavigation.replaceState && n.history && n.history.replaceState)
        n.history.replaceState(null, null, `#${e.slides.eq(e.activeIndex).attr("data-hash")}` || ""), s("hashSet");
      else {
        const t2 = e.slides.eq(e.activeIndex), a2 = t2.attr("data-hash") || t2.attr("data-history");
        r.location.hash = a2 || "", s("hashSet");
      }
  };
  a("init", () => {
    e.params.hashNavigation.enabled && (() => {
      if (!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)
        return;
      i = true;
      const t2 = r.location.hash.replace("#", "");
      if (t2) {
        const s2 = 0;
        for (let a2 = 0, i2 = e.slides.length; a2 < i2; a2 += 1) {
          const i3 = e.slides.eq(a2);
          if ((i3.attr("data-hash") || i3.attr("data-history")) === t2 && !i3.hasClass(e.params.slideDuplicateClass)) {
            const t3 = i3.index();
            e.slideTo(t3, s2, e.params.runCallbacksOnInit, true);
          }
        }
      }
      e.params.hashNavigation.watchState && $(n).on("hashchange", l);
    })();
  }), a("destroy", () => {
    e.params.hashNavigation.enabled && e.params.hashNavigation.watchState && $(n).off("hashchange", l);
  }), a("transitionEnd _freeModeNoMomentumRelease", () => {
    i && o();
  }), a("slideChange", () => {
    i && e.params.cssMode && o();
  });
}
function Autoplay({ swiper: e, extendParams: t, on: s, emit: a }) {
  let i;
  function r() {
    const t2 = e.slides.eq(e.activeIndex);
    let s2 = e.params.autoplay.delay;
    t2.attr("data-swiper-autoplay") && (s2 = t2.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(i), i = nextTick(() => {
      let t3;
      e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), t3 = e.slidePrev(e.params.speed, true, true), a("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? l() : (t3 = e.slideTo(e.slides.length - 1, e.params.speed, true, true), a("autoplay")) : (t3 = e.slidePrev(e.params.speed, true, true), a("autoplay")) : e.params.loop ? (e.loopFix(), t3 = e.slideNext(e.params.speed, true, true), a("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? l() : (t3 = e.slideTo(0, e.params.speed, true, true), a("autoplay")) : (t3 = e.slideNext(e.params.speed, true, true), a("autoplay")), (e.params.cssMode && e.autoplay.running || t3 === false) && r();
    }, s2);
  }
  function n() {
    return i === void 0 && (!e.autoplay.running && (e.autoplay.running = true, a("autoplayStart"), r(), true));
  }
  function l() {
    return !!e.autoplay.running && (i !== void 0 && (i && (clearTimeout(i), i = void 0), e.autoplay.running = false, a("autoplayStop"), true));
  }
  function o(t2) {
    e.autoplay.running && (e.autoplay.paused || (i && clearTimeout(i), e.autoplay.paused = true, t2 !== 0 && e.params.autoplay.waitForTransition ? ["transitionend", "webkitTransitionEnd"].forEach((t3) => {
      e.$wrapperEl[0].addEventListener(t3, c);
    }) : (e.autoplay.paused = false, r())));
  }
  function d() {
    const t2 = getDocument();
    t2.visibilityState === "hidden" && e.autoplay.running && o(), t2.visibilityState === "visible" && e.autoplay.paused && (r(), e.autoplay.paused = false);
  }
  function c(t2) {
    e && !e.destroyed && e.$wrapperEl && t2.target === e.$wrapperEl[0] && (["transitionend", "webkitTransitionEnd"].forEach((t3) => {
      e.$wrapperEl[0].removeEventListener(t3, c);
    }), e.autoplay.paused = false, e.autoplay.running ? r() : l());
  }
  function p() {
    e.params.autoplay.disableOnInteraction ? l() : o(), ["transitionend", "webkitTransitionEnd"].forEach((t2) => {
      e.$wrapperEl[0].removeEventListener(t2, c);
    });
  }
  function u() {
    e.params.autoplay.disableOnInteraction || (e.autoplay.paused = false, r());
  }
  e.autoplay = { running: false, paused: false }, t({ autoplay: { enabled: false, delay: 3e3, waitForTransition: true, disableOnInteraction: true, stopOnLastSlide: false, reverseDirection: false, pauseOnMouseEnter: false } }), s("init", () => {
    if (e.params.autoplay.enabled) {
      n();
      getDocument().addEventListener("visibilitychange", d), e.params.autoplay.pauseOnMouseEnter && (e.$el.on("mouseenter", p), e.$el.on("mouseleave", u));
    }
  }), s("beforeTransitionStart", (t2, s2, a2) => {
    e.autoplay.running && (a2 || !e.params.autoplay.disableOnInteraction ? e.autoplay.pause(s2) : l());
  }), s("sliderFirstMove", () => {
    e.autoplay.running && (e.params.autoplay.disableOnInteraction ? l() : o());
  }), s("touchEnd", () => {
    e.params.cssMode && e.autoplay.paused && !e.params.autoplay.disableOnInteraction && r();
  }), s("destroy", () => {
    e.$el.off("mouseenter", p), e.$el.off("mouseleave", u), e.autoplay.running && l();
    getDocument().removeEventListener("visibilitychange", d);
  }), Object.assign(e.autoplay, { pause: o, run: r, start: n, stop: l });
}
function Thumb({ swiper: e, extendParams: t, on: s }) {
  t({ thumbs: { swiper: null, multipleActiveThumbs: true, autoScrollOffset: 0, slideThumbActiveClass: "swiper-slide-thumb-active", thumbsContainerClass: "swiper-thumbs" } });
  let a = false, i = false;
  function r() {
    const t2 = e.thumbs.swiper;
    if (!t2)
      return;
    const s2 = t2.clickedIndex, a2 = t2.clickedSlide;
    if (a2 && $(a2).hasClass(e.params.thumbs.slideThumbActiveClass))
      return;
    if (s2 == null)
      return;
    let i2;
    if (i2 = t2.params.loop ? parseInt($(t2.clickedSlide).attr("data-swiper-slide-index"), 10) : s2, e.params.loop) {
      let t3 = e.activeIndex;
      e.slides.eq(t3).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, t3 = e.activeIndex);
      const s3 = e.slides.eq(t3).prevAll(`[data-swiper-slide-index="${i2}"]`).eq(0).index(), a3 = e.slides.eq(t3).nextAll(`[data-swiper-slide-index="${i2}"]`).eq(0).index();
      i2 = s3 === void 0 ? a3 : a3 === void 0 ? s3 : a3 - t3 < t3 - s3 ? a3 : s3;
    }
    e.slideTo(i2);
  }
  function n() {
    const { thumbs: t2 } = e.params;
    if (a)
      return false;
    a = true;
    const s2 = e.constructor;
    if (t2.swiper instanceof s2)
      e.thumbs.swiper = t2.swiper, Object.assign(e.thumbs.swiper.originalParams, { watchSlidesProgress: true, slideToClickedSlide: false }), Object.assign(e.thumbs.swiper.params, { watchSlidesProgress: true, slideToClickedSlide: false });
    else if (isObject(t2.swiper)) {
      const a2 = Object.assign({}, t2.swiper);
      Object.assign(a2, { watchSlidesProgress: true, slideToClickedSlide: false }), e.thumbs.swiper = new s2(a2), i = true;
    }
    return e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", r), true;
  }
  function l(t2) {
    const s2 = e.thumbs.swiper;
    if (!s2)
      return;
    const a2 = s2.params.slidesPerView === "auto" ? s2.slidesPerViewDynamic() : s2.params.slidesPerView, i2 = e.params.thumbs.autoScrollOffset, r2 = i2 && !s2.params.loop;
    if (e.realIndex !== s2.realIndex || r2) {
      let n3, l3, o = s2.activeIndex;
      if (s2.params.loop) {
        s2.slides.eq(o).hasClass(s2.params.slideDuplicateClass) && (s2.loopFix(), s2._clientLeft = s2.$wrapperEl[0].clientLeft, o = s2.activeIndex);
        const t3 = s2.slides.eq(o).prevAll(`[data-swiper-slide-index="${e.realIndex}"]`).eq(0).index(), a3 = s2.slides.eq(o).nextAll(`[data-swiper-slide-index="${e.realIndex}"]`).eq(0).index();
        n3 = t3 === void 0 ? a3 : a3 === void 0 ? t3 : a3 - o == o - t3 ? s2.params.slidesPerGroup > 1 ? a3 : o : a3 - o < o - t3 ? a3 : t3, l3 = e.activeIndex > e.previousIndex ? "next" : "prev";
      } else
        n3 = e.realIndex, l3 = n3 > e.previousIndex ? "next" : "prev";
      r2 && (n3 += l3 === "next" ? i2 : -1 * i2), s2.visibleSlidesIndexes && s2.visibleSlidesIndexes.indexOf(n3) < 0 && (s2.params.centeredSlides ? n3 = n3 > o ? n3 - Math.floor(a2 / 2) + 1 : n3 + Math.floor(a2 / 2) - 1 : n3 > o && s2.params.slidesPerGroup, s2.slideTo(n3, t2 ? 0 : void 0));
    }
    let n2 = 1;
    const l2 = e.params.thumbs.slideThumbActiveClass;
    if (e.params.slidesPerView > 1 && !e.params.centeredSlides && (n2 = e.params.slidesPerView), e.params.thumbs.multipleActiveThumbs || (n2 = 1), n2 = Math.floor(n2), s2.slides.removeClass(l2), s2.params.loop || s2.params.virtual && s2.params.virtual.enabled)
      for (let t3 = 0; t3 < n2; t3 += 1)
        s2.$wrapperEl.children(`[data-swiper-slide-index="${e.realIndex + t3}"]`).addClass(l2);
    else
      for (let t3 = 0; t3 < n2; t3 += 1)
        s2.slides.eq(e.realIndex + t3).addClass(l2);
  }
  e.thumbs = { swiper: null }, s("beforeInit", () => {
    const { thumbs: t2 } = e.params;
    t2 && t2.swiper && (n(), l(true));
  }), s("slideChange update resize observerUpdate", () => {
    e.thumbs.swiper && l();
  }), s("setTransition", (t2, s2) => {
    const a2 = e.thumbs.swiper;
    a2 && a2.setTransition(s2);
  }), s("beforeDestroy", () => {
    const t2 = e.thumbs.swiper;
    t2 && i && t2 && t2.destroy();
  }), Object.assign(e.thumbs, { init: n, update: l });
}
function freeMode({ swiper: e, extendParams: t, emit: s, once: a }) {
  t({ freeMode: { enabled: false, momentum: true, momentumRatio: 1, momentumBounce: true, momentumBounceRatio: 1, momentumVelocityRatio: 1, sticky: false, minimumVelocity: 0.02 } }), Object.assign(e, { freeMode: { onTouchMove: function() {
    const { touchEventsData: t2, touches: s2 } = e;
    t2.velocities.length === 0 && t2.velocities.push({ position: s2[e.isHorizontal() ? "startX" : "startY"], time: t2.touchStartTime }), t2.velocities.push({ position: s2[e.isHorizontal() ? "currentX" : "currentY"], time: now() });
  }, onTouchEnd: function({ currentPos: t2 }) {
    const { params: i, $wrapperEl: r, rtlTranslate: n, snapGrid: l, touchEventsData: o } = e, d = now() - o.touchStartTime;
    if (t2 < -e.minTranslate())
      e.slideTo(e.activeIndex);
    else if (t2 > -e.maxTranslate())
      e.slides.length < l.length ? e.slideTo(l.length - 1) : e.slideTo(e.slides.length - 1);
    else {
      if (i.freeMode.momentum) {
        if (o.velocities.length > 1) {
          const t4 = o.velocities.pop(), s2 = o.velocities.pop(), a2 = t4.position - s2.position, r2 = t4.time - s2.time;
          e.velocity = a2 / r2, e.velocity /= 2, Math.abs(e.velocity) < i.freeMode.minimumVelocity && (e.velocity = 0), (r2 > 150 || now() - t4.time > 300) && (e.velocity = 0);
        } else
          e.velocity = 0;
        e.velocity *= i.freeMode.momentumVelocityRatio, o.velocities.length = 0;
        let t3 = 1e3 * i.freeMode.momentumRatio;
        const d2 = e.velocity * t3;
        let c = e.translate + d2;
        n && (c = -c);
        let p, u = false;
        const h = 20 * Math.abs(e.velocity) * i.freeMode.momentumBounceRatio;
        let m;
        if (c < e.maxTranslate())
          i.freeMode.momentumBounce ? (c + e.maxTranslate() < -h && (c = e.maxTranslate() - h), p = e.maxTranslate(), u = true, o.allowMomentumBounce = true) : c = e.maxTranslate(), i.loop && i.centeredSlides && (m = true);
        else if (c > e.minTranslate())
          i.freeMode.momentumBounce ? (c - e.minTranslate() > h && (c = e.minTranslate() + h), p = e.minTranslate(), u = true, o.allowMomentumBounce = true) : c = e.minTranslate(), i.loop && i.centeredSlides && (m = true);
        else if (i.freeMode.sticky) {
          let t4;
          for (let e2 = 0; e2 < l.length; e2 += 1)
            if (l[e2] > -c) {
              t4 = e2;
              break;
            }
          c = Math.abs(l[t4] - c) < Math.abs(l[t4 - 1] - c) || e.swipeDirection === "next" ? l[t4] : l[t4 - 1], c = -c;
        }
        if (m && a("transitionEnd", () => {
          e.loopFix();
        }), e.velocity !== 0) {
          if (t3 = n ? Math.abs((-c - e.translate) / e.velocity) : Math.abs((c - e.translate) / e.velocity), i.freeMode.sticky) {
            const s2 = Math.abs((n ? -c : c) - e.translate), a2 = e.slidesSizesGrid[e.activeIndex];
            t3 = s2 < a2 ? i.speed : s2 < 2 * a2 ? 1.5 * i.speed : 2.5 * i.speed;
          }
        } else if (i.freeMode.sticky)
          return void e.slideToClosest();
        i.freeMode.momentumBounce && u ? (e.updateProgress(p), e.setTransition(t3), e.setTranslate(c), e.transitionStart(true, e.swipeDirection), e.animating = true, r.transitionEnd(() => {
          e && !e.destroyed && o.allowMomentumBounce && (s("momentumBounce"), e.setTransition(i.speed), setTimeout(() => {
            e.setTranslate(p), r.transitionEnd(() => {
              e && !e.destroyed && e.transitionEnd();
            });
          }, 0));
        })) : e.velocity ? (s("_freeModeNoMomentumRelease"), e.updateProgress(c), e.setTransition(t3), e.setTranslate(c), e.transitionStart(true, e.swipeDirection), e.animating || (e.animating = true, r.transitionEnd(() => {
          e && !e.destroyed && e.transitionEnd();
        }))) : e.updateProgress(c), e.updateActiveIndex(), e.updateSlidesClasses();
      } else {
        if (i.freeMode.sticky)
          return void e.slideToClosest();
        i.freeMode && s("_freeModeNoMomentumRelease");
      }
      (!i.freeMode.momentum || d >= i.longSwipesMs) && (e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses());
    }
  } } });
}
function Grid({ swiper: e, extendParams: t }) {
  let s, a, i;
  t({ grid: { rows: 1, fill: "column" } });
  e.grid = { initSlides: (t2) => {
    const { slidesPerView: r } = e.params, { rows: n, fill: l } = e.params.grid;
    a = s / n, i = Math.floor(t2 / n), s = Math.floor(t2 / n) === t2 / n ? t2 : Math.ceil(t2 / n) * n, r !== "auto" && l === "row" && (s = Math.max(s, r * n));
  }, updateSlide: (t2, r, n, l) => {
    const { slidesPerGroup: o, spaceBetween: d } = e.params, { rows: c, fill: p } = e.params.grid;
    let u, h, m;
    if (p === "row" && o > 1) {
      const e2 = Math.floor(t2 / (o * c)), a2 = t2 - c * o * e2, i2 = e2 === 0 ? o : Math.min(Math.ceil((n - e2 * c * o) / c), o);
      m = Math.floor(a2 / i2), h = a2 - m * i2 + e2 * o, u = h + m * s / c, r.css({ "-webkit-order": u, order: u });
    } else
      p === "column" ? (h = Math.floor(t2 / c), m = t2 - h * c, (h > i || h === i && m === c - 1) && (m += 1, m >= c && (m = 0, h += 1))) : (m = Math.floor(t2 / a), h = t2 - m * a);
    r.css(l("margin-top"), m !== 0 ? d && `${d}px` : "");
  }, updateWrapperSize: (t2, a2, i2) => {
    const { spaceBetween: r, centeredSlides: n, roundLengths: l } = e.params, { rows: o } = e.params.grid;
    if (e.virtualSize = (t2 + r) * s, e.virtualSize = Math.ceil(e.virtualSize / o) - r, e.$wrapperEl.css({ [i2("width")]: `${e.virtualSize + r}px` }), n) {
      a2.splice(0, a2.length);
      const t3 = [];
      for (let s2 = 0; s2 < a2.length; s2 += 1) {
        let i3 = a2[s2];
        l && (i3 = Math.floor(i3)), a2[s2] < e.virtualSize + a2[0] && t3.push(i3);
      }
      a2.push(...t3);
    }
  } };
}
function appendSlide(e) {
  const t = this, { $wrapperEl: s, params: a } = t;
  if (a.loop && t.loopDestroy(), typeof e == "object" && "length" in e)
    for (let t2 = 0; t2 < e.length; t2 += 1)
      e[t2] && s.append(e[t2]);
  else
    s.append(e);
  a.loop && t.loopCreate(), a.observer || t.update();
}
function prependSlide(e) {
  const t = this, { params: s, $wrapperEl: a, activeIndex: i } = t;
  s.loop && t.loopDestroy();
  let r = i + 1;
  if (typeof e == "object" && "length" in e) {
    for (let t2 = 0; t2 < e.length; t2 += 1)
      e[t2] && a.prepend(e[t2]);
    r = i + e.length;
  } else
    a.prepend(e);
  s.loop && t.loopCreate(), s.observer || t.update(), t.slideTo(r, 0, false);
}
function addSlide(e, t) {
  const s = this, { $wrapperEl: a, params: i, activeIndex: r } = s;
  let n = r;
  i.loop && (n -= s.loopedSlides, s.loopDestroy(), s.slides = a.children(`.${i.slideClass}`));
  const l = s.slides.length;
  if (e <= 0)
    return void s.prependSlide(t);
  if (e >= l)
    return void s.appendSlide(t);
  let o = n > e ? n + 1 : n;
  const d = [];
  for (let t2 = l - 1; t2 >= e; t2 -= 1) {
    const e2 = s.slides.eq(t2);
    e2.remove(), d.unshift(e2);
  }
  if (typeof t == "object" && "length" in t) {
    for (let e2 = 0; e2 < t.length; e2 += 1)
      t[e2] && a.append(t[e2]);
    o = n > e ? n + t.length : n;
  } else
    a.append(t);
  for (let e2 = 0; e2 < d.length; e2 += 1)
    a.append(d[e2]);
  i.loop && s.loopCreate(), i.observer || s.update(), i.loop ? s.slideTo(o + s.loopedSlides, 0, false) : s.slideTo(o, 0, false);
}
function removeSlide(e) {
  const t = this, { params: s, $wrapperEl: a, activeIndex: i } = t;
  let r = i;
  s.loop && (r -= t.loopedSlides, t.loopDestroy(), t.slides = a.children(`.${s.slideClass}`));
  let n, l = r;
  if (typeof e == "object" && "length" in e) {
    for (let s2 = 0; s2 < e.length; s2 += 1)
      n = e[s2], t.slides[n] && t.slides.eq(n).remove(), n < l && (l -= 1);
    l = Math.max(l, 0);
  } else
    n = e, t.slides[n] && t.slides.eq(n).remove(), n < l && (l -= 1), l = Math.max(l, 0);
  s.loop && t.loopCreate(), s.observer || t.update(), s.loop ? t.slideTo(l + t.loopedSlides, 0, false) : t.slideTo(l, 0, false);
}
function removeAllSlides() {
  const e = this, t = [];
  for (let s = 0; s < e.slides.length; s += 1)
    t.push(s);
  e.removeSlide(t);
}
function Manipulation({ swiper: e }) {
  Object.assign(e, { appendSlide: appendSlide.bind(e), prependSlide: prependSlide.bind(e), addSlide: addSlide.bind(e), removeSlide: removeSlide.bind(e), removeAllSlides: removeAllSlides.bind(e) });
}
function effectInit(e) {
  const { effect: t, swiper: s, on: a, setTranslate: i, setTransition: r, overwriteParams: n, perspective: l } = e;
  a("beforeInit", () => {
    if (s.params.effect !== t)
      return;
    s.classNames.push(`${s.params.containerModifierClass}${t}`), l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`);
    const e2 = n ? n() : {};
    Object.assign(s.params, e2), Object.assign(s.originalParams, e2);
  }), a("setTranslate", () => {
    s.params.effect === t && i();
  }), a("setTransition", (e2, a2) => {
    s.params.effect === t && r(a2);
  });
}
function effectTarget(e, t) {
  return e.transformEl ? t.find(e.transformEl).css({ "backface-visibility": "hidden", "-webkit-backface-visibility": "hidden" }) : t;
}
function effectVirtualTransitionEnd({ swiper: e, duration: t, transformEl: s, allSlides: a }) {
  const { slides: i, activeIndex: r, $wrapperEl: n } = e;
  if (e.params.virtualTranslate && t !== 0) {
    let t2, l = false;
    t2 = a ? s ? i.find(s) : i : s ? i.eq(r).find(s) : i.eq(r), t2.transitionEnd(() => {
      if (l)
        return;
      if (!e || e.destroyed)
        return;
      l = true, e.animating = false;
      const t3 = ["webkitTransitionEnd", "transitionend"];
      for (let e2 = 0; e2 < t3.length; e2 += 1)
        n.trigger(t3[e2]);
    });
  }
}
function EffectFade({ swiper: e, extendParams: t, on: s }) {
  t({ fadeEffect: { crossFade: false, transformEl: null } });
  effectInit({ effect: "fade", swiper: e, on: s, setTranslate: () => {
    const { slides: t2 } = e, s2 = e.params.fadeEffect;
    for (let a = 0; a < t2.length; a += 1) {
      const t3 = e.slides.eq(a);
      let i = -t3[0].swiperSlideOffset;
      e.params.virtualTranslate || (i -= e.translate);
      let r = 0;
      e.isHorizontal() || (r = i, i = 0);
      const n = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(t3[0].progress), 0) : 1 + Math.min(Math.max(t3[0].progress, -1), 0);
      effectTarget(s2, t3).css({ opacity: n }).transform(`translate3d(${i}px, ${r}px, 0px)`);
    }
  }, setTransition: (t2) => {
    const { transformEl: s2 } = e.params.fadeEffect;
    (s2 ? e.slides.find(s2) : e.slides).transition(t2), effectVirtualTransitionEnd({ swiper: e, duration: t2, transformEl: s2, allSlides: true });
  }, overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: true, spaceBetween: 0, virtualTranslate: !e.params.cssMode }) });
}
function EffectCube({ swiper: e, extendParams: t, on: s }) {
  t({ cubeEffect: { slideShadows: true, shadow: true, shadowOffset: 20, shadowScale: 0.94 } });
  effectInit({ effect: "cube", swiper: e, on: s, setTranslate: () => {
    const { $el: t2, $wrapperEl: s2, slides: a, width: i, height: r, rtlTranslate: n, size: l, browser: o } = e, d = e.params.cubeEffect, c = e.isHorizontal(), p = e.virtual && e.params.virtual.enabled;
    let u, h = 0;
    d.shadow && (c ? (u = s2.find(".swiper-cube-shadow"), u.length === 0 && (u = $('<div class="swiper-cube-shadow"></div>'), s2.append(u)), u.css({ height: `${i}px` })) : (u = t2.find(".swiper-cube-shadow"), u.length === 0 && (u = $('<div class="swiper-cube-shadow"></div>'), t2.append(u))));
    for (let e2 = 0; e2 < a.length; e2 += 1) {
      const t3 = a.eq(e2);
      let s3 = e2;
      p && (s3 = parseInt(t3.attr("data-swiper-slide-index"), 10));
      let i2 = 90 * s3, r2 = Math.floor(i2 / 360);
      n && (i2 = -i2, r2 = Math.floor(-i2 / 360));
      const o2 = Math.max(Math.min(t3[0].progress, 1), -1);
      let u2 = 0, m2 = 0, f = 0;
      s3 % 4 == 0 ? (u2 = 4 * -r2 * l, f = 0) : (s3 - 1) % 4 == 0 ? (u2 = 0, f = 4 * -r2 * l) : (s3 - 2) % 4 == 0 ? (u2 = l + 4 * r2 * l, f = l) : (s3 - 3) % 4 == 0 && (u2 = -l, f = 3 * l + 4 * l * r2), n && (u2 = -u2), c || (m2 = u2, u2 = 0);
      const g = `rotateX(${c ? 0 : -i2}deg) rotateY(${c ? i2 : 0}deg) translate3d(${u2}px, ${m2}px, ${f}px)`;
      if (o2 <= 1 && o2 > -1 && (h = 90 * s3 + 90 * o2, n && (h = 90 * -s3 - 90 * o2)), t3.transform(g), d.slideShadows) {
        let e3 = c ? t3.find(".swiper-slide-shadow-left") : t3.find(".swiper-slide-shadow-top"), s4 = c ? t3.find(".swiper-slide-shadow-right") : t3.find(".swiper-slide-shadow-bottom");
        e3.length === 0 && (e3 = $(`<div class="swiper-slide-shadow-${c ? "left" : "top"}"></div>`), t3.append(e3)), s4.length === 0 && (s4 = $(`<div class="swiper-slide-shadow-${c ? "right" : "bottom"}"></div>`), t3.append(s4)), e3.length && (e3[0].style.opacity = Math.max(-o2, 0)), s4.length && (s4[0].style.opacity = Math.max(o2, 0));
      }
    }
    if (s2.css({ "-webkit-transform-origin": `50% 50% -${l / 2}px`, "transform-origin": `50% 50% -${l / 2}px` }), d.shadow)
      if (c)
        u.transform(`translate3d(0px, ${i / 2 + d.shadowOffset}px, ${-i / 2}px) rotateX(90deg) rotateZ(0deg) scale(${d.shadowScale})`);
      else {
        const e2 = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90), t3 = 1.5 - (Math.sin(2 * e2 * Math.PI / 360) / 2 + Math.cos(2 * e2 * Math.PI / 360) / 2), s3 = d.shadowScale, a2 = d.shadowScale / t3, i2 = d.shadowOffset;
        u.transform(`scale3d(${s3}, 1, ${a2}) translate3d(0px, ${r / 2 + i2}px, ${-r / 2 / a2}px) rotateX(-90deg)`);
      }
    const m = o.isSafari || o.isWebView ? -l / 2 : 0;
    s2.transform(`translate3d(0px,0,${m}px) rotateX(${e.isHorizontal() ? 0 : h}deg) rotateY(${e.isHorizontal() ? -h : 0}deg)`);
  }, setTransition: (t2) => {
    const { $el: s2, slides: a } = e;
    a.transition(t2).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t2), e.params.cubeEffect.shadow && !e.isHorizontal() && s2.find(".swiper-cube-shadow").transition(t2);
  }, perspective: () => true, overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: true, resistanceRatio: 0, spaceBetween: 0, centeredSlides: false, virtualTranslate: true }) });
}
function createShadow(e, t, s) {
  const a = "swiper-slide-shadow" + (s ? `-${s}` : ""), i = e.transformEl ? t.find(e.transformEl) : t;
  let r = i.children(`.${a}`);
  return r.length || (r = $(`<div class="swiper-slide-shadow${s ? `-${s}` : ""}"></div>`), i.append(r)), r;
}
function EffectFlip({ swiper: e, extendParams: t, on: s }) {
  t({ flipEffect: { slideShadows: true, limitRotation: true, transformEl: null } });
  effectInit({ effect: "flip", swiper: e, on: s, setTranslate: () => {
    const { slides: t2, rtlTranslate: s2 } = e, a = e.params.flipEffect;
    for (let i = 0; i < t2.length; i += 1) {
      const r = t2.eq(i);
      let n = r[0].progress;
      e.params.flipEffect.limitRotation && (n = Math.max(Math.min(r[0].progress, 1), -1));
      const l = r[0].swiperSlideOffset;
      let o = -180 * n, d = 0, c = e.params.cssMode ? -l - e.translate : -l, p = 0;
      if (e.isHorizontal() ? s2 && (o = -o) : (p = c, c = 0, d = -o, o = 0), r[0].style.zIndex = -Math.abs(Math.round(n)) + t2.length, a.slideShadows) {
        let t3 = e.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"), s3 = e.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
        t3.length === 0 && (t3 = createShadow(a, r, e.isHorizontal() ? "left" : "top")), s3.length === 0 && (s3 = createShadow(a, r, e.isHorizontal() ? "right" : "bottom")), t3.length && (t3[0].style.opacity = Math.max(-n, 0)), s3.length && (s3[0].style.opacity = Math.max(n, 0));
      }
      const u = `translate3d(${c}px, ${p}px, 0px) rotateX(${d}deg) rotateY(${o}deg)`;
      effectTarget(a, r).transform(u);
    }
  }, setTransition: (t2) => {
    const { transformEl: s2 } = e.params.flipEffect;
    (s2 ? e.slides.find(s2) : e.slides).transition(t2).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t2), effectVirtualTransitionEnd({ swiper: e, duration: t2, transformEl: s2 });
  }, perspective: () => true, overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: true, spaceBetween: 0, virtualTranslate: !e.params.cssMode }) });
}
function EffectCoverflow({ swiper: e, extendParams: t, on: s }) {
  t({ coverflowEffect: { rotate: 50, stretch: 0, depth: 100, scale: 1, modifier: 1, slideShadows: true, transformEl: null } });
  effectInit({ effect: "coverflow", swiper: e, on: s, setTranslate: () => {
    const { width: t2, height: s2, slides: a, slidesSizesGrid: i } = e, r = e.params.coverflowEffect, n = e.isHorizontal(), l = e.translate, o = n ? t2 / 2 - l : s2 / 2 - l, d = n ? r.rotate : -r.rotate, c = r.depth;
    for (let e2 = 0, t3 = a.length; e2 < t3; e2 += 1) {
      const t4 = a.eq(e2), s3 = i[e2], l2 = (o - t4[0].swiperSlideOffset - s3 / 2) / s3 * r.modifier;
      let p = n ? d * l2 : 0, u = n ? 0 : d * l2, h = -c * Math.abs(l2), m = r.stretch;
      typeof m == "string" && m.indexOf("%") !== -1 && (m = parseFloat(r.stretch) / 100 * s3);
      let f = n ? 0 : m * l2, g = n ? m * l2 : 0, v = 1 - (1 - r.scale) * Math.abs(l2);
      Math.abs(g) < 1e-3 && (g = 0), Math.abs(f) < 1e-3 && (f = 0), Math.abs(h) < 1e-3 && (h = 0), Math.abs(p) < 1e-3 && (p = 0), Math.abs(u) < 1e-3 && (u = 0), Math.abs(v) < 1e-3 && (v = 0);
      const w = `translate3d(${g}px,${f}px,${h}px)  rotateX(${u}deg) rotateY(${p}deg) scale(${v})`;
      if (effectTarget(r, t4).transform(w), t4[0].style.zIndex = 1 - Math.abs(Math.round(l2)), r.slideShadows) {
        let e3 = n ? t4.find(".swiper-slide-shadow-left") : t4.find(".swiper-slide-shadow-top"), s4 = n ? t4.find(".swiper-slide-shadow-right") : t4.find(".swiper-slide-shadow-bottom");
        e3.length === 0 && (e3 = createShadow(r, t4, n ? "left" : "top")), s4.length === 0 && (s4 = createShadow(r, t4, n ? "right" : "bottom")), e3.length && (e3[0].style.opacity = l2 > 0 ? l2 : 0), s4.length && (s4[0].style.opacity = -l2 > 0 ? -l2 : 0);
      }
    }
  }, setTransition: (t2) => {
    const { transformEl: s2 } = e.params.coverflowEffect;
    (s2 ? e.slides.find(s2) : e.slides).transition(t2).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t2);
  }, perspective: () => true, overwriteParams: () => ({ watchSlidesProgress: true }) });
}
function EffectCreative({ swiper: e, extendParams: t, on: s }) {
  t({ creativeEffect: { transformEl: null, limitProgress: 1, shadowPerProgress: false, progressMultiplier: 1, perspective: true, prev: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 }, next: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 } } });
  const a = (e2) => typeof e2 == "string" ? e2 : `${e2}px`;
  effectInit({ effect: "creative", swiper: e, on: s, setTranslate: () => {
    const { slides: t2, $wrapperEl: s2, slidesSizesGrid: i } = e, r = e.params.creativeEffect, { progressMultiplier: n } = r, l = e.params.centeredSlides;
    if (l) {
      const t3 = i[0] / 2 - e.params.slidesOffsetBefore || 0;
      s2.transform(`translateX(calc(50% - ${t3}px))`);
    }
    for (let s3 = 0; s3 < t2.length; s3 += 1) {
      const i2 = t2.eq(s3), o = i2[0].progress, d = Math.min(Math.max(i2[0].progress, -r.limitProgress), r.limitProgress);
      let c = d;
      l || (c = Math.min(Math.max(i2[0].originalProgress, -r.limitProgress), r.limitProgress));
      const p = i2[0].swiperSlideOffset, u = [e.params.cssMode ? -p - e.translate : -p, 0, 0], h = [0, 0, 0];
      let m = false;
      e.isHorizontal() || (u[1] = u[0], u[0] = 0);
      let f = { translate: [0, 0, 0], rotate: [0, 0, 0], scale: 1, opacity: 1 };
      d < 0 ? (f = r.next, m = true) : d > 0 && (f = r.prev, m = true), u.forEach((e2, t3) => {
        u[t3] = `calc(${e2}px + (${a(f.translate[t3])} * ${Math.abs(d * n)}))`;
      }), h.forEach((e2, t3) => {
        h[t3] = f.rotate[t3] * Math.abs(d * n);
      }), i2[0].style.zIndex = -Math.abs(Math.round(o)) + t2.length;
      const g = u.join(", "), v = `rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`, w = c < 0 ? `scale(${1 + (1 - f.scale) * c * n})` : `scale(${1 - (1 - f.scale) * c * n})`, b = c < 0 ? 1 + (1 - f.opacity) * c * n : 1 - (1 - f.opacity) * c * n, x = `translate3d(${g}) ${v} ${w}`;
      if (m && f.shadow || !m) {
        let e2 = i2.children(".swiper-slide-shadow");
        if (e2.length === 0 && f.shadow && (e2 = createShadow(r, i2)), e2.length) {
          const t3 = r.shadowPerProgress ? d * (1 / r.limitProgress) : d;
          e2[0].style.opacity = Math.min(Math.max(Math.abs(t3), 0), 1);
        }
      }
      const y = effectTarget(r, i2);
      y.transform(x).css({ opacity: b }), f.origin && y.css("transform-origin", f.origin);
    }
  }, setTransition: (t2) => {
    const { transformEl: s2 } = e.params.creativeEffect;
    (s2 ? e.slides.find(s2) : e.slides).transition(t2).find(".swiper-slide-shadow").transition(t2), effectVirtualTransitionEnd({ swiper: e, duration: t2, transformEl: s2, allSlides: true });
  }, perspective: () => e.params.creativeEffect.perspective, overwriteParams: () => ({ watchSlidesProgress: true, virtualTranslate: !e.params.cssMode }) });
}
function EffectCards({ swiper: e, extendParams: t, on: s }) {
  t({ cardsEffect: { slideShadows: true, transformEl: null } });
  effectInit({ effect: "cards", swiper: e, on: s, setTranslate: () => {
    const { slides: t2, activeIndex: s2 } = e, a = e.params.cardsEffect, { startTranslate: i, isTouched: r } = e.touchEventsData, n = e.translate;
    for (let l = 0; l < t2.length; l += 1) {
      const o = t2.eq(l), d = o[0].progress, c = Math.min(Math.max(d, -4), 4);
      let p = o[0].swiperSlideOffset;
      e.params.centeredSlides && !e.params.cssMode && e.$wrapperEl.transform(`translateX(${e.minTranslate()}px)`), e.params.centeredSlides && e.params.cssMode && (p -= t2[0].swiperSlideOffset);
      let u = e.params.cssMode ? -p - e.translate : -p, h = 0;
      const m = -100 * Math.abs(c);
      let f = 1, g = -2 * c, v = 8 - 0.75 * Math.abs(c);
      const w = (l === s2 || l === s2 - 1) && c > 0 && c < 1 && (r || e.params.cssMode) && n < i, b = (l === s2 || l === s2 + 1) && c < 0 && c > -1 && (r || e.params.cssMode) && n > i;
      if (w || b) {
        const e2 = (1 - Math.abs((Math.abs(c) - 0.5) / 0.5)) ** 0.5;
        g += -28 * c * e2, f += -0.5 * e2, v += 96 * e2, h = -25 * e2 * Math.abs(c) + "%";
      }
      if (u = c < 0 ? `calc(${u}px + (${v * Math.abs(c)}%))` : c > 0 ? `calc(${u}px + (-${v * Math.abs(c)}%))` : `${u}px`, !e.isHorizontal()) {
        const e2 = h;
        h = u, u = e2;
      }
      const x = `
        translate3d(${u}, ${h}, ${m}px)
        rotateZ(${g}deg)
        scale(${c < 0 ? "" + (1 + (1 - f) * c) : "" + (1 - (1 - f) * c)})
      `;
      if (a.slideShadows) {
        let e2 = o.find(".swiper-slide-shadow");
        e2.length === 0 && (e2 = createShadow(a, o)), e2.length && (e2[0].style.opacity = Math.min(Math.max((Math.abs(c) - 0.5) / 0.5, 0), 1));
      }
      o[0].style.zIndex = -Math.abs(Math.round(d)) + t2.length;
      effectTarget(a, o).transform(x);
    }
  }, setTransition: (t2) => {
    const { transformEl: s2 } = e.params.cardsEffect;
    (s2 ? e.slides.find(s2) : e.slides).transition(t2).find(".swiper-slide-shadow").transition(t2), effectVirtualTransitionEnd({ swiper: e, duration: t2, transformEl: s2 });
  }, perspective: () => true, overwriteParams: () => ({ watchSlidesProgress: true, virtualTranslate: !e.params.cssMode }) });
}
Object.keys(prototypes).forEach((e) => {
  Object.keys(prototypes[e]).forEach((t) => {
    Swiper.prototype[t] = prototypes[e][t];
  });
}), Swiper.use([Resize, Observer]);
const modules = [Virtual, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, Parallax, Zoom, Lazy, Controller, A11y, History, HashNavigation, Autoplay, Thumb, freeMode, Grid, Manipulation, EffectFade, EffectCube, EffectFlip, EffectCoverflow, EffectCreative, EffectCards];
Swiper.use(modules);
class SwiperManager {
  constructor() {
    this.videoMuted = true;
  }
  init() {
    var currentUpdate = null;
    var currentVideo = null;
    this.swiper = new Swiper(".carousel-container", {
      slidesPerView: 1,
      speed: 400,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next"
      },
      on: {
        slideChange: (swiper) => {
          let vid = swiper.slides[swiper.activeIndex].querySelector("video");
          vid.currentTime = 0;
          currentUpdate = null;
          currentUpdate = this.onUpdateVideoHandler.bind(swiper, vid, swiper);
          if (currentVideo) {
            swiper.slides.forEach((slide2) => {
              let v = slide2.querySelector("video");
              v.ontimeupdate = null;
              v.pause();
              v.muted = this.videoMuted;
            });
          }
          vid.currentTime = 0;
          vid.play();
          vid.ontimeupdate = currentUpdate;
          currentVideo = vid;
        }
      }
    });
    this.initMute();
  }
  initMute() {
    const mute = document.getElementsByClassName("btn_mute")[0];
    mute.onclick = () => {
      let vid = this.swiper.slides[this.swiper.activeIndex].querySelector("video");
      vid.muted = !vid.muted;
      this.videoMuted = vid.muted;
      const muteicon = document.getElementById("mute-icon");
      const unmuteicon = document.getElementById("unmute-icon");
      muteicon.style.display = vid.muted ? "none" : "block";
      unmuteicon.style.display = vid.muted ? "block" : "none";
    };
  }
  onUpdateVideoHandler(video, swiper) {
    const pct = video.currentTime / video.duration;
    if (pct === 1) {
      swiper.slideNext(1e3);
      video.pause();
    }
  }
}
/*!
	By André Rinas, www.andrerinas.de
	Documentation, www.simplelightbox.de
	Available for use under the MIT License
	Version 2.10.2
*/
class SimpleLightbox {
  constructor(elements, options) {
    __publicField(this, "defaultOptions", {
      sourceAttr: "href",
      overlay: true,
      overlayOpacity: 0.7,
      spinner: true,
      nav: true,
      navText: ["&lsaquo;", "&rsaquo;"],
      captions: true,
      captionDelay: 0,
      captionSelector: "img",
      captionType: "attr",
      captionsData: "title",
      captionPosition: "bottom",
      captionClass: "",
      close: true,
      closeText: "&times;",
      swipeClose: true,
      showCounter: true,
      fileExt: "png|jpg|jpeg|gif|webp",
      animationSlide: true,
      animationSpeed: 250,
      preloading: true,
      enableKeyboard: true,
      loop: true,
      rel: false,
      docClose: true,
      swipeTolerance: 50,
      className: "simple-lightbox",
      widthRatio: 0.8,
      heightRatio: 0.9,
      scaleImageToRatio: false,
      disableRightClick: false,
      disableScroll: true,
      alertError: true,
      alertErrorMessage: "Image not found, next image will be loaded",
      additionalHtml: false,
      history: true,
      throttleInterval: 0,
      doubleTapZoom: 2,
      maxZoom: 10,
      htmlClass: "has-lightbox",
      rtl: false,
      fixedClass: "sl-fixed",
      fadeSpeed: 300,
      uniqueImages: true,
      focus: true,
      scrollZoom: true,
      scrollZoomFactor: 0.5
    });
    __publicField(this, "transitionPrefix");
    __publicField(this, "isPassiveEventsSupported");
    __publicField(this, "transitionCapable", false);
    __publicField(this, "isTouchDevice", "ontouchstart" in window);
    __publicField(this, "isAppleDevice", /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));
    __publicField(this, "initialLocationHash");
    __publicField(this, "pushStateSupport", "pushState" in history);
    __publicField(this, "isOpen", false);
    __publicField(this, "isAnimating", false);
    __publicField(this, "isClosing", false);
    __publicField(this, "isFadeIn", false);
    __publicField(this, "urlChangedOnce", false);
    __publicField(this, "hashReseted", false);
    __publicField(this, "historyHasChanges", false);
    __publicField(this, "historyUpdateTimeout", null);
    __publicField(this, "currentImage");
    __publicField(this, "eventNamespace", "simplelightbox");
    __publicField(this, "domNodes", {});
    __publicField(this, "loadedImages", []);
    __publicField(this, "initialImageIndex", 0);
    __publicField(this, "currentImageIndex", 0);
    __publicField(this, "initialSelector", null);
    __publicField(this, "globalScrollbarWidth", 0);
    __publicField(this, "controlCoordinates", {
      swipeDiff: 0,
      swipeYDiff: 0,
      swipeStart: 0,
      swipeEnd: 0,
      swipeYStart: 0,
      swipeYEnd: 0,
      mousedown: false,
      imageLeft: 0,
      zoomed: false,
      containerHeight: 0,
      containerWidth: 0,
      containerOffsetX: 0,
      containerOffsetY: 0,
      imgHeight: 0,
      imgWidth: 0,
      capture: false,
      initialOffsetX: 0,
      initialOffsetY: 0,
      initialPointerOffsetX: 0,
      initialPointerOffsetY: 0,
      initialPointerOffsetX2: 0,
      initialPointerOffsetY2: 0,
      initialScale: 1,
      initialPinchDistance: 0,
      pointerOffsetX: 0,
      pointerOffsetY: 0,
      pointerOffsetX2: 0,
      pointerOffsetY2: 0,
      targetOffsetX: 0,
      targetOffsetY: 0,
      targetScale: 0,
      pinchOffsetX: 0,
      pinchOffsetY: 0,
      limitOffsetX: 0,
      limitOffsetY: 0,
      scaleDifference: 0,
      targetPinchDistance: 0,
      touchCount: 0,
      doubleTapped: false,
      touchmoveCount: 0
    });
    this.options = Object.assign(this.defaultOptions, options);
    this.isPassiveEventsSupported = this.checkPassiveEventsSupport();
    if (typeof elements === "string") {
      this.initialSelector = elements;
      this.elements = Array.from(document.querySelectorAll(elements));
    } else {
      this.elements = typeof elements.length !== "undefined" && elements.length > 0 ? Array.from(elements) : [elements];
    }
    this.relatedElements = [];
    this.transitionPrefix = this.calculateTransitionPrefix();
    this.transitionCapable = this.transitionPrefix !== false;
    this.initialLocationHash = this.hash;
    if (this.options.rel) {
      this.elements = this.getRelated(this.options.rel);
    }
    if (this.options.uniqueImages) {
      let imgArr = [];
      this.elements = Array.from(this.elements).filter((element) => {
        let src = element.getAttribute(this.options.sourceAttr);
        if (imgArr.indexOf(src) === -1) {
          imgArr.push(src);
          return true;
        }
        return false;
      });
    }
    this.createDomNodes();
    if (this.options.close) {
      this.domNodes.wrapper.appendChild(this.domNodes.closeButton);
    }
    if (this.options.nav) {
      this.domNodes.wrapper.appendChild(this.domNodes.navigation);
    }
    if (this.options.spinner) {
      this.domNodes.wrapper.appendChild(this.domNodes.spinner);
    }
    this.addEventListener(this.elements, "click." + this.eventNamespace, (event2) => {
      if (this.isValidLink(event2.currentTarget)) {
        event2.preventDefault();
        if (this.isAnimating) {
          return false;
        }
        this.initialImageIndex = this.elements.indexOf(event2.currentTarget);
        this.openImage(event2.currentTarget);
      }
    });
    if (this.options.docClose) {
      this.addEventListener(this.domNodes.wrapper, ["click." + this.eventNamespace, "touchstart." + this.eventNamespace], (event2) => {
        if (this.isOpen && event2.target === event2.currentTarget) {
          this.close();
        }
      });
    }
    if (this.options.disableRightClick) {
      this.addEventListener(document.body, "contextmenu." + this.eventNamespace, (event2) => {
        if (event2.target.parentElement.classList.contains("sl-image")) {
          event2.preventDefault();
        }
      });
    }
    if (this.options.enableKeyboard) {
      this.addEventListener(document.body, "keyup." + this.eventNamespace, this.throttle((event2) => {
        this.controlCoordinates.swipeDiff = 0;
        if (this.isAnimating && event2.key === "Escape") {
          this.currentImage.setAttribute("src", "");
          this.isAnimating = false;
          return this.close();
        }
        if (this.isOpen) {
          event2.preventDefault();
          if (event2.key === "Escape") {
            this.close();
          }
          if (!this.isAnimating && ["ArrowLeft", "ArrowRight"].indexOf(event2.key) > -1) {
            this.loadImage(event2.key === "ArrowRight" ? 1 : -1);
          }
        }
      }, this.options.throttleInterval));
    }
    this.addEvents();
  }
  checkPassiveEventsSupport() {
    let supportsPassive = false;
    try {
      let opts = Object.defineProperty({}, "passive", {
        get: function() {
          supportsPassive = true;
        }
      });
      window.addEventListener("testPassive", null, opts);
      window.removeEventListener("testPassive", null, opts);
    } catch (e) {
    }
    return supportsPassive;
  }
  createDomNodes() {
    this.domNodes.overlay = document.createElement("div");
    this.domNodes.overlay.classList.add("sl-overlay");
    this.domNodes.overlay.dataset.opacityTarget = this.options.overlayOpacity;
    this.domNodes.closeButton = document.createElement("button");
    this.domNodes.closeButton.classList.add("sl-close");
    this.domNodes.closeButton.innerHTML = this.options.closeText;
    this.domNodes.spinner = document.createElement("div");
    this.domNodes.spinner.classList.add("sl-spinner");
    this.domNodes.spinner.innerHTML = "<div></div>";
    this.domNodes.navigation = document.createElement("div");
    this.domNodes.navigation.classList.add("sl-navigation");
    this.domNodes.navigation.innerHTML = `<button class="sl-prev">${this.options.navText[0]}</button><button class="sl-next">${this.options.navText[1]}</button>`;
    this.domNodes.counter = document.createElement("div");
    this.domNodes.counter.classList.add("sl-counter");
    this.domNodes.counter.innerHTML = '<span class="sl-current"></span>/<span class="sl-total"></span>';
    this.domNodes.caption = document.createElement("div");
    this.domNodes.caption.classList.add("sl-caption", "pos-" + this.options.captionPosition);
    if (this.options.captionClass) {
      this.domNodes.caption.classList.add(this.options.captionClass);
    }
    this.domNodes.image = document.createElement("div");
    this.domNodes.image.classList.add("sl-image");
    this.domNodes.wrapper = document.createElement("div");
    this.domNodes.wrapper.classList.add("sl-wrapper");
    this.domNodes.wrapper.setAttribute("tabindex", -1);
    this.domNodes.wrapper.setAttribute("role", "dialog");
    this.domNodes.wrapper.setAttribute("aria-hidden", false);
    if (this.options.className) {
      this.domNodes.wrapper.classList.add(this.options.className);
    }
    if (this.options.rtl) {
      this.domNodes.wrapper.classList.add("sl-dir-rtl");
    }
  }
  throttle(func, limit) {
    let inThrottle;
    return function() {
      if (!inThrottle) {
        func.apply(this, arguments);
        inThrottle = true;
        setTimeout(function() {
          return inThrottle = false;
        }, limit);
      }
    };
  }
  isValidLink(element) {
    return !this.options.fileExt || element.getAttribute(this.options.sourceAttr) && new RegExp("(" + this.options.fileExt + ")$", "i").test(element.getAttribute(this.options.sourceAttr));
  }
  calculateTransitionPrefix() {
    let s = (document.body || document.documentElement).style;
    return "transition" in s ? "" : "WebkitTransition" in s ? "-webkit-" : "MozTransition" in s ? "-moz-" : "OTransition" in s ? "-o" : false;
  }
  toggleScrollbar(type) {
    let scrollbarWidth = 0;
    let fixedElements = [].slice.call(document.querySelectorAll("." + this.options.fixedClass));
    if (type === "hide") {
      let fullWindowWidth = window.innerWidth;
      if (!fullWindowWidth) {
        let documentElementRect = document.documentElement.getBoundingClientRect();
        fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
      }
      if (document.body.clientWidth < fullWindowWidth || this.isAppleDevice) {
        let scrollDiv = document.createElement("div"), paddingRight = parseInt(document.body.style.paddingRight || 0, 10);
        scrollDiv.classList.add("sl-scrollbar-measure");
        document.body.appendChild(scrollDiv);
        scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        document.body.dataset.originalPaddingRight = paddingRight;
        if (scrollbarWidth > 0 || scrollbarWidth == 0 && this.isAppleDevice) {
          document.body.classList.add("hidden-scroll");
          document.body.style.paddingRight = paddingRight + scrollbarWidth + "px";
          fixedElements.forEach((element) => {
            const actualPadding = element.style.paddingRight;
            const calculatedPadding = window.getComputedStyle(element)["padding-right"];
            element.dataset.originalPaddingRight = actualPadding;
            element.style.paddingRight = `${parseFloat(calculatedPadding) + scrollbarWidth}px`;
          });
        }
      }
    } else {
      document.body.classList.remove("hidden-scroll");
      document.body.style.paddingRight = document.body.dataset.originalPaddingRight;
      fixedElements.forEach((element) => {
        const padding = element.dataset.originalPaddingRight;
        if (typeof padding !== "undefined") {
          element.style.paddingRight = padding;
        }
      });
    }
    return scrollbarWidth;
  }
  close() {
    if (!this.isOpen || this.isAnimating || this.isClosing) {
      return false;
    }
    this.isClosing = true;
    let element = this.relatedElements[this.currentImageIndex];
    element.dispatchEvent(new Event("close.simplelightbox"));
    if (this.options.history) {
      this.historyHasChanges = false;
      if (!this.hashReseted) {
        this.resetHash();
      }
    }
    this.removeEventListener(document, "focusin." + this.eventNamespace);
    this.fadeOut(this.domNodes.overlay, this.options.fadeSpeed);
    this.fadeOut(document.querySelectorAll(".sl-image img,  .sl-close, .sl-navigation, .sl-image .sl-caption, .sl-counter"), this.options.fadeSpeed, () => {
      if (this.options.disableScroll) {
        this.toggleScrollbar("show");
      }
      if (this.options.htmlClass && this.options.htmlClass !== "") {
        document.querySelector("html").classList.remove(this.options.htmlClass);
      }
      document.body.removeChild(this.domNodes.wrapper);
      document.body.removeChild(this.domNodes.overlay);
      this.domNodes.additionalHtml = null;
      element.dispatchEvent(new Event("closed.simplelightbox"));
      this.isClosing = false;
    });
    this.currentImage = null;
    this.isOpen = false;
    this.isAnimating = false;
    for (let key in this.controlCoordinates) {
      this.controlCoordinates[key] = 0;
    }
    this.controlCoordinates.mousedown = false;
    this.controlCoordinates.zoomed = false;
    this.controlCoordinates.capture = false;
    this.controlCoordinates.initialScale = this.minMax(1, 1, this.options.maxZoom);
    this.controlCoordinates.doubleTapped = false;
  }
  get hash() {
    return window.location.hash.substring(1);
  }
  preload() {
    let index2 = this.currentImageIndex, length = this.relatedElements.length, next2 = index2 + 1 < 0 ? length - 1 : index2 + 1 >= length - 1 ? 0 : index2 + 1, prev2 = index2 - 1 < 0 ? length - 1 : index2 - 1 >= length - 1 ? 0 : index2 - 1, nextImage = new Image(), prevImage = new Image();
    nextImage.addEventListener("load", (event2) => {
      let src = event2.target.getAttribute("src");
      if (this.loadedImages.indexOf(src) === -1) {
        this.loadedImages.push(src);
      }
      this.relatedElements[index2].dispatchEvent(new Event("nextImageLoaded." + this.eventNamespace));
    });
    nextImage.setAttribute("src", this.relatedElements[next2].getAttribute(this.options.sourceAttr));
    prevImage.addEventListener("load", (event2) => {
      let src = event2.target.getAttribute("src");
      if (this.loadedImages.indexOf(src) === -1) {
        this.loadedImages.push(src);
      }
      this.relatedElements[index2].dispatchEvent(new Event("prevImageLoaded." + this.eventNamespace));
    });
    prevImage.setAttribute("src", this.relatedElements[prev2].getAttribute(this.options.sourceAttr));
  }
  loadImage(direction) {
    let slideDirection = direction;
    if (this.options.rtl) {
      direction = -direction;
    }
    this.relatedElements[this.currentImageIndex].dispatchEvent(new Event("change." + this.eventNamespace));
    this.relatedElements[this.currentImageIndex].dispatchEvent(new Event((direction === 1 ? "next" : "prev") + "." + this.eventNamespace));
    let newIndex = this.currentImageIndex + direction;
    if (this.isAnimating || (newIndex < 0 || newIndex >= this.relatedElements.length) && this.options.loop === false) {
      return false;
    }
    this.currentImageIndex = newIndex < 0 ? this.relatedElements.length - 1 : newIndex > this.relatedElements.length - 1 ? 0 : newIndex;
    this.domNodes.counter.querySelector(".sl-current").innerHTML = this.currentImageIndex + 1;
    if (this.options.animationSlide) {
      this.slide(this.options.animationSpeed / 1e3, -100 * slideDirection - this.controlCoordinates.swipeDiff + "px");
    }
    this.fadeOut(this.domNodes.image, this.options.fadeSpeed, () => {
      this.isAnimating = true;
      if (!this.isClosing) {
        setTimeout(() => {
          let element = this.relatedElements[this.currentImageIndex];
          this.currentImage.setAttribute("src", element.getAttribute(this.options.sourceAttr));
          if (this.loadedImages.indexOf(element.getAttribute(this.options.sourceAttr)) === -1) {
            this.show(this.domNodes.spinner);
          }
          if (this.domNodes.image.contains(this.domNodes.caption)) {
            this.domNodes.image.removeChild(this.domNodes.caption);
          }
          this.adjustImage(slideDirection);
          if (this.options.preloading)
            this.preload();
        }, 100);
      } else {
        this.isAnimating = false;
      }
    });
  }
  adjustImage(direction) {
    if (!this.currentImage) {
      return false;
    }
    let tmpImage = new Image(), windowWidth = window.innerWidth * this.options.widthRatio, windowHeight = window.innerHeight * this.options.heightRatio;
    tmpImage.setAttribute("src", this.currentImage.getAttribute("src"));
    this.currentImage.dataset.scale = 1;
    this.currentImage.dataset.translateX = 0;
    this.currentImage.dataset.translateY = 0;
    this.zoomPanElement(0, 0, 1);
    tmpImage.addEventListener("error", (event2) => {
      this.relatedElements[this.currentImageIndex].dispatchEvent(new Event("error." + this.eventNamespace));
      this.isAnimating = false;
      this.isOpen = true;
      this.domNodes.spinner.style.display = "none";
      let dirIsDefined = direction === 1 || direction === -1;
      if (this.initialImageIndex === this.currentImageIndex && dirIsDefined) {
        return this.close();
      }
      if (this.options.alertError) {
        alert(this.options.alertErrorMessage);
      }
      this.loadImage(dirIsDefined ? direction : 1);
    });
    tmpImage.addEventListener("load", (event2) => {
      if (typeof direction !== "undefined") {
        this.relatedElements[this.currentImageIndex].dispatchEvent(new Event("changed." + this.eventNamespace));
        this.relatedElements[this.currentImageIndex].dispatchEvent(new Event((direction === 1 ? "nextDone" : "prevDone") + "." + this.eventNamespace));
      }
      if (this.options.history) {
        this.updateURL();
      }
      if (this.loadedImages.indexOf(this.currentImage.getAttribute("src")) === -1) {
        this.loadedImages.push(this.currentImage.getAttribute("src"));
      }
      let imageWidth = event2.target.width, imageHeight = event2.target.height;
      if (this.options.scaleImageToRatio || imageWidth > windowWidth || imageHeight > windowHeight) {
        let ratio = imageWidth / imageHeight > windowWidth / windowHeight ? imageWidth / windowWidth : imageHeight / windowHeight;
        imageWidth /= ratio;
        imageHeight /= ratio;
      }
      this.domNodes.image.style.top = (window.innerHeight - imageHeight) / 2 + "px";
      this.domNodes.image.style.left = (window.innerWidth - imageWidth - this.globalScrollbarWidth) / 2 + "px";
      this.domNodes.image.style.width = imageWidth + "px";
      this.domNodes.image.style.height = imageHeight + "px";
      this.domNodes.spinner.style.display = "none";
      if (this.options.focus) {
        this.forceFocus();
      }
      this.fadeIn(this.currentImage, this.options.fadeSpeed, () => {
        if (this.options.focus) {
          this.domNodes.wrapper.focus();
        }
      });
      this.isOpen = true;
      let captionContainer, captionText;
      if (typeof this.options.captionSelector === "string") {
        captionContainer = this.options.captionSelector === "self" ? this.relatedElements[this.currentImageIndex] : this.relatedElements[this.currentImageIndex].querySelector(this.options.captionSelector);
      } else if (typeof this.options.captionSelector === "function") {
        captionContainer = this.options.captionSelector(this.relatedElements[this.currentImageIndex]);
      }
      if (this.options.captions && captionContainer) {
        if (this.options.captionType === "data") {
          captionText = captionContainer.dataset[this.options.captionsData];
        } else if (this.options.captionType === "text") {
          captionText = captionContainer.innerHTML;
        } else {
          captionText = captionContainer.getAttribute(this.options.captionsData);
        }
      }
      if (!this.options.loop) {
        if (this.currentImageIndex === 0) {
          this.hide(this.domNodes.navigation.querySelector(".sl-prev"));
        }
        if (this.currentImageIndex >= this.relatedElements.length - 1) {
          this.hide(this.domNodes.navigation.querySelector(".sl-next"));
        }
        if (this.currentImageIndex > 0) {
          this.show(this.domNodes.navigation.querySelector(".sl-prev"));
        }
        if (this.currentImageIndex < this.relatedElements.length - 1) {
          this.show(this.domNodes.navigation.querySelector(".sl-next"));
        }
      } else {
        if (this.relatedElements.length === 1) {
          this.hide(this.domNodes.navigation.querySelectorAll(".sl-prev, .sl-next"));
        } else {
          this.show(this.domNodes.navigation.querySelectorAll(".sl-prev, .sl-next"));
        }
      }
      if (direction === 1 || direction === -1) {
        if (this.options.animationSlide) {
          this.slide(0, 100 * direction + "px");
          setTimeout(() => {
            this.slide(this.options.animationSpeed / 1e3, 0 + "px");
          }, 50);
        }
        this.fadeIn(this.domNodes.image, this.options.fadeSpeed, () => {
          this.isAnimating = false;
          this.setCaption(captionText, imageWidth);
        });
      } else {
        this.isAnimating = false;
        this.setCaption(captionText, imageWidth);
      }
      if (this.options.additionalHtml && !this.domNodes.additionalHtml) {
        this.domNodes.additionalHtml = document.createElement("div");
        this.domNodes.additionalHtml.classList.add("sl-additional-html");
        this.domNodes.additionalHtml.innerHTML = this.options.additionalHtml;
        this.domNodes.image.appendChild(this.domNodes.additionalHtml);
      }
    });
  }
  zoomPanElement(targetOffsetX, targetOffsetY, targetScale) {
    this.currentImage.style[this.transitionPrefix + "transform"] = "translate(" + targetOffsetX + "," + targetOffsetY + ") scale(" + targetScale + ")";
  }
  minMax(value, min, max) {
    return value < min ? min : value > max ? max : value;
  }
  setZoomData(initialScale, targetOffsetX, targetOffsetY) {
    this.currentImage.dataset.scale = initialScale;
    this.currentImage.dataset.translateX = targetOffsetX;
    this.currentImage.dataset.translateY = targetOffsetY;
  }
  hashchangeHandler() {
    if (this.isOpen && this.hash === this.initialLocationHash) {
      this.hashReseted = true;
      this.close();
    }
  }
  addEvents() {
    this.addEventListener(window, "resize." + this.eventNamespace, (event2) => {
      if (this.isOpen) {
        this.adjustImage();
      }
    });
    this.addEventListener(this.domNodes.closeButton, ["click." + this.eventNamespace, "touchstart." + this.eventNamespace], this.close.bind(this));
    if (this.options.history) {
      setTimeout(() => {
        this.addEventListener(window, "hashchange." + this.eventNamespace, (event2) => {
          if (this.isOpen) {
            this.hashchangeHandler();
          }
        });
      }, 40);
    }
    this.addEventListener(this.domNodes.navigation.getElementsByTagName("button"), "click." + this.eventNamespace, (event2) => {
      if (!event2.currentTarget.tagName.match(/button/i)) {
        return true;
      }
      event2.preventDefault();
      this.controlCoordinates.swipeDiff = 0;
      this.loadImage(event2.currentTarget.classList.contains("sl-next") ? 1 : -1);
    });
    if (this.options.scrollZoom) {
      let scale = 1;
      this.addEventListener(this.domNodes.image, ["mousewheel", "DOMMouseScroll"], (event2) => {
        if (this.controlCoordinates.mousedown || this.isAnimating || this.isClosing || !this.isOpen) {
          return true;
        }
        if (this.controlCoordinates.containerHeight == 0) {
          this.controlCoordinates.containerHeight = this.getDimensions(this.domNodes.image).height;
          this.controlCoordinates.containerWidth = this.getDimensions(this.domNodes.image).width;
          this.controlCoordinates.imgHeight = this.getDimensions(this.currentImage).height;
          this.controlCoordinates.imgWidth = this.getDimensions(this.currentImage).width;
          this.controlCoordinates.containerOffsetX = this.domNodes.image.offsetLeft;
          this.controlCoordinates.containerOffsetY = this.domNodes.image.offsetTop;
          this.controlCoordinates.initialOffsetX = parseFloat(this.currentImage.dataset.translateX);
          this.controlCoordinates.initialOffsetY = parseFloat(this.currentImage.dataset.translateY);
        }
        event2.preventDefault();
        let delta = event2.delta || event2.wheelDelta;
        if (delta === void 0) {
          delta = event2.detail;
        }
        delta = Math.max(-1, Math.min(1, delta));
        scale += delta * this.options.scrollZoomFactor * scale;
        scale = Math.max(1, Math.min(this.options.maxZoom, scale));
        this.controlCoordinates.targetScale = scale;
        this.controlCoordinates.pinchOffsetX = event2.pageX;
        this.controlCoordinates.pinchOffsetY = event2.pageY;
        this.controlCoordinates.limitOffsetX = (this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale - this.controlCoordinates.containerWidth) / 2;
        this.controlCoordinates.limitOffsetY = (this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale - this.controlCoordinates.containerHeight) / 2;
        this.controlCoordinates.scaleDifference = this.controlCoordinates.targetScale - this.controlCoordinates.initialScale;
        this.controlCoordinates.targetOffsetX = this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale <= this.controlCoordinates.containerWidth ? 0 : this.minMax(this.controlCoordinates.initialOffsetX - (this.controlCoordinates.pinchOffsetX - this.controlCoordinates.containerOffsetX - this.controlCoordinates.containerWidth / 2 - this.controlCoordinates.initialOffsetX) / (this.controlCoordinates.targetScale - this.controlCoordinates.scaleDifference) * this.controlCoordinates.scaleDifference, this.controlCoordinates.limitOffsetX * -1, this.controlCoordinates.limitOffsetX);
        this.controlCoordinates.targetOffsetY = this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale <= this.controlCoordinates.containerHeight ? 0 : this.minMax(this.controlCoordinates.initialOffsetY - (this.controlCoordinates.pinchOffsetY - this.controlCoordinates.containerOffsetY - this.controlCoordinates.containerHeight / 2 - this.controlCoordinates.initialOffsetY) / (this.controlCoordinates.targetScale - this.controlCoordinates.scaleDifference) * this.controlCoordinates.scaleDifference, this.controlCoordinates.limitOffsetY * -1, this.controlCoordinates.limitOffsetY);
        this.zoomPanElement(this.controlCoordinates.targetOffsetX + "px", this.controlCoordinates.targetOffsetY + "px", this.controlCoordinates.targetScale);
        if (this.controlCoordinates.targetScale > 1) {
          this.controlCoordinates.zoomed = true;
          if (!this.domNodes.caption.style.opacity && this.domNodes.caption.style.display !== "none") {
            this.fadeOut(this.domNodes.caption, this.options.fadeSpeed);
          }
        } else {
          if (this.controlCoordinates.initialScale === 1) {
            this.controlCoordinates.zoomed = false;
            if (this.domNodes.caption.style.display === "none") {
              this.fadeIn(this.domNodes.caption, this.options.fadeSpeed);
            }
          }
          this.controlCoordinates.initialPinchDistance = null;
          this.controlCoordinates.capture = false;
        }
        this.controlCoordinates.initialPinchDistance = this.controlCoordinates.targetPinchDistance;
        this.controlCoordinates.initialScale = this.controlCoordinates.targetScale;
        this.controlCoordinates.initialOffsetX = this.controlCoordinates.targetOffsetX;
        this.controlCoordinates.initialOffsetY = this.controlCoordinates.targetOffsetY;
        this.setZoomData(this.controlCoordinates.targetScale, this.controlCoordinates.targetOffsetX, this.controlCoordinates.targetOffsetY);
        this.zoomPanElement(this.controlCoordinates.targetOffsetX + "px", this.controlCoordinates.targetOffsetY + "px", this.controlCoordinates.targetScale);
      });
    }
    this.addEventListener(this.domNodes.image, ["touchstart." + this.eventNamespace, "mousedown." + this.eventNamespace], (event2) => {
      if (event2.target.tagName === "A" && event2.type === "touchstart") {
        return true;
      }
      if (event2.type === "mousedown") {
        event2.preventDefault();
        this.controlCoordinates.initialPointerOffsetX = event2.clientX;
        this.controlCoordinates.initialPointerOffsetY = event2.clientY;
        this.controlCoordinates.containerHeight = this.getDimensions(this.domNodes.image).height;
        this.controlCoordinates.containerWidth = this.getDimensions(this.domNodes.image).width;
        this.controlCoordinates.imgHeight = this.getDimensions(this.currentImage).height;
        this.controlCoordinates.imgWidth = this.getDimensions(this.currentImage).width;
        this.controlCoordinates.containerOffsetX = this.domNodes.image.offsetLeft;
        this.controlCoordinates.containerOffsetY = this.domNodes.image.offsetTop;
        this.controlCoordinates.initialOffsetX = parseFloat(this.currentImage.dataset.translateX);
        this.controlCoordinates.initialOffsetY = parseFloat(this.currentImage.dataset.translateY);
        this.controlCoordinates.capture = true;
      } else {
        this.controlCoordinates.touchCount = event2.touches.length;
        this.controlCoordinates.initialPointerOffsetX = event2.touches[0].clientX;
        this.controlCoordinates.initialPointerOffsetY = event2.touches[0].clientY;
        this.controlCoordinates.containerHeight = this.getDimensions(this.domNodes.image).height;
        this.controlCoordinates.containerWidth = this.getDimensions(this.domNodes.image).width;
        this.controlCoordinates.imgHeight = this.getDimensions(this.currentImage).height;
        this.controlCoordinates.imgWidth = this.getDimensions(this.currentImage).width;
        this.controlCoordinates.containerOffsetX = this.domNodes.image.offsetLeft;
        this.controlCoordinates.containerOffsetY = this.domNodes.image.offsetTop;
        if (this.controlCoordinates.touchCount === 1) {
          if (!this.controlCoordinates.doubleTapped) {
            this.controlCoordinates.doubleTapped = true;
            setTimeout(() => {
              this.controlCoordinates.doubleTapped = false;
            }, 300);
          } else {
            this.currentImage.classList.add("sl-transition");
            if (!this.controlCoordinates.zoomed) {
              this.controlCoordinates.initialScale = this.options.doubleTapZoom;
              this.setZoomData(this.controlCoordinates.initialScale, 0, 0);
              this.zoomPanElement(0 + "px", 0 + "px", this.controlCoordinates.initialScale);
              if (!this.domNodes.caption.style.opacity && this.domNodes.caption.style.display !== "none") {
                this.fadeOut(this.domNodes.caption, this.options.fadeSpeed);
              }
              this.controlCoordinates.zoomed = true;
            } else {
              this.controlCoordinates.initialScale = 1;
              this.setZoomData(this.controlCoordinates.initialScale, 0, 0);
              this.zoomPanElement(0 + "px", 0 + "px", this.controlCoordinates.initialScale);
              this.controlCoordinates.zoomed = false;
            }
            setTimeout(() => {
              if (this.currentImage) {
                this.currentImage.classList.remove("sl-transition");
              }
            }, 200);
            return false;
          }
          this.controlCoordinates.initialOffsetX = parseFloat(this.currentImage.dataset.translateX);
          this.controlCoordinates.initialOffsetY = parseFloat(this.currentImage.dataset.translateY);
        } else if (this.controlCoordinates.touchCount === 2) {
          this.controlCoordinates.initialPointerOffsetX2 = event2.touches[1].clientX;
          this.controlCoordinates.initialPointerOffsetY2 = event2.touches[1].clientY;
          this.controlCoordinates.initialOffsetX = parseFloat(this.currentImage.dataset.translateX);
          this.controlCoordinates.initialOffsetY = parseFloat(this.currentImage.dataset.translateY);
          this.controlCoordinates.pinchOffsetX = (this.controlCoordinates.initialPointerOffsetX + this.controlCoordinates.initialPointerOffsetX2) / 2;
          this.controlCoordinates.pinchOffsetY = (this.controlCoordinates.initialPointerOffsetY + this.controlCoordinates.initialPointerOffsetY2) / 2;
          this.controlCoordinates.initialPinchDistance = Math.sqrt((this.controlCoordinates.initialPointerOffsetX - this.controlCoordinates.initialPointerOffsetX2) * (this.controlCoordinates.initialPointerOffsetX - this.controlCoordinates.initialPointerOffsetX2) + (this.controlCoordinates.initialPointerOffsetY - this.controlCoordinates.initialPointerOffsetY2) * (this.controlCoordinates.initialPointerOffsetY - this.controlCoordinates.initialPointerOffsetY2));
        }
        this.controlCoordinates.capture = true;
      }
      if (this.controlCoordinates.mousedown)
        return true;
      if (this.transitionCapable) {
        this.controlCoordinates.imageLeft = parseInt(this.domNodes.image.style.left, 10);
      }
      this.controlCoordinates.mousedown = true;
      this.controlCoordinates.swipeDiff = 0;
      this.controlCoordinates.swipeYDiff = 0;
      this.controlCoordinates.swipeStart = event2.pageX || event2.touches[0].pageX;
      this.controlCoordinates.swipeYStart = event2.pageY || event2.touches[0].pageY;
      return false;
    });
    this.addEventListener(this.domNodes.image, ["touchmove." + this.eventNamespace, "mousemove." + this.eventNamespace, "MSPointerMove"], (event2) => {
      if (!this.controlCoordinates.mousedown) {
        return true;
      }
      if (event2.type === "touchmove") {
        if (this.controlCoordinates.capture === false) {
          return false;
        }
        this.controlCoordinates.pointerOffsetX = event2.touches[0].clientX;
        this.controlCoordinates.pointerOffsetY = event2.touches[0].clientY;
        this.controlCoordinates.touchCount = event2.touches.length;
        this.controlCoordinates.touchmoveCount++;
        if (this.controlCoordinates.touchCount > 1) {
          this.controlCoordinates.pointerOffsetX2 = event2.touches[1].clientX;
          this.controlCoordinates.pointerOffsetY2 = event2.touches[1].clientY;
          this.controlCoordinates.targetPinchDistance = Math.sqrt((this.controlCoordinates.pointerOffsetX - this.controlCoordinates.pointerOffsetX2) * (this.controlCoordinates.pointerOffsetX - this.controlCoordinates.pointerOffsetX2) + (this.controlCoordinates.pointerOffsetY - this.controlCoordinates.pointerOffsetY2) * (this.controlCoordinates.pointerOffsetY - this.controlCoordinates.pointerOffsetY2));
          if (this.controlCoordinates.initialPinchDistance === null) {
            this.controlCoordinates.initialPinchDistance = this.controlCoordinates.targetPinchDistance;
          }
          if (Math.abs(this.controlCoordinates.initialPinchDistance - this.controlCoordinates.targetPinchDistance) >= 1) {
            this.controlCoordinates.targetScale = this.minMax(this.controlCoordinates.targetPinchDistance / this.controlCoordinates.initialPinchDistance * this.controlCoordinates.initialScale, 1, this.options.maxZoom);
            this.controlCoordinates.limitOffsetX = (this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale - this.controlCoordinates.containerWidth) / 2;
            this.controlCoordinates.limitOffsetY = (this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale - this.controlCoordinates.containerHeight) / 2;
            this.controlCoordinates.scaleDifference = this.controlCoordinates.targetScale - this.controlCoordinates.initialScale;
            this.controlCoordinates.targetOffsetX = this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale <= this.controlCoordinates.containerWidth ? 0 : this.minMax(this.controlCoordinates.initialOffsetX - (this.controlCoordinates.pinchOffsetX - this.controlCoordinates.containerOffsetX - this.controlCoordinates.containerWidth / 2 - this.controlCoordinates.initialOffsetX) / (this.controlCoordinates.targetScale - this.controlCoordinates.scaleDifference) * this.controlCoordinates.scaleDifference, this.controlCoordinates.limitOffsetX * -1, this.controlCoordinates.limitOffsetX);
            this.controlCoordinates.targetOffsetY = this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale <= this.controlCoordinates.containerHeight ? 0 : this.minMax(this.controlCoordinates.initialOffsetY - (this.controlCoordinates.pinchOffsetY - this.controlCoordinates.containerOffsetY - this.controlCoordinates.containerHeight / 2 - this.controlCoordinates.initialOffsetY) / (this.controlCoordinates.targetScale - this.controlCoordinates.scaleDifference) * this.controlCoordinates.scaleDifference, this.controlCoordinates.limitOffsetY * -1, this.controlCoordinates.limitOffsetY);
            this.zoomPanElement(this.controlCoordinates.targetOffsetX + "px", this.controlCoordinates.targetOffsetY + "px", this.controlCoordinates.targetScale);
            if (this.controlCoordinates.targetScale > 1) {
              this.controlCoordinates.zoomed = true;
              if (!this.domNodes.caption.style.opacity && this.domNodes.caption.style.display !== "none") {
                this.fadeOut(this.domNodes.caption, this.options.fadeSpeed);
              }
            }
            this.controlCoordinates.initialPinchDistance = this.controlCoordinates.targetPinchDistance;
            this.controlCoordinates.initialScale = this.controlCoordinates.targetScale;
            this.controlCoordinates.initialOffsetX = this.controlCoordinates.targetOffsetX;
            this.controlCoordinates.initialOffsetY = this.controlCoordinates.targetOffsetY;
          }
        } else {
          this.controlCoordinates.targetScale = this.controlCoordinates.initialScale;
          this.controlCoordinates.limitOffsetX = (this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale - this.controlCoordinates.containerWidth) / 2;
          this.controlCoordinates.limitOffsetY = (this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale - this.controlCoordinates.containerHeight) / 2;
          this.controlCoordinates.targetOffsetX = this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale <= this.controlCoordinates.containerWidth ? 0 : this.minMax(this.controlCoordinates.pointerOffsetX - (this.controlCoordinates.initialPointerOffsetX - this.controlCoordinates.initialOffsetX), this.controlCoordinates.limitOffsetX * -1, this.controlCoordinates.limitOffsetX);
          this.controlCoordinates.targetOffsetY = this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale <= this.controlCoordinates.containerHeight ? 0 : this.minMax(this.controlCoordinates.pointerOffsetY - (this.controlCoordinates.initialPointerOffsetY - this.controlCoordinates.initialOffsetY), this.controlCoordinates.limitOffsetY * -1, this.controlCoordinates.limitOffsetY);
          if (Math.abs(this.controlCoordinates.targetOffsetX) === Math.abs(this.controlCoordinates.limitOffsetX)) {
            this.controlCoordinates.initialOffsetX = this.controlCoordinates.targetOffsetX;
            this.controlCoordinates.initialPointerOffsetX = this.controlCoordinates.pointerOffsetX;
          }
          if (Math.abs(this.controlCoordinates.targetOffsetY) === Math.abs(this.controlCoordinates.limitOffsetY)) {
            this.controlCoordinates.initialOffsetY = this.controlCoordinates.targetOffsetY;
            this.controlCoordinates.initialPointerOffsetY = this.controlCoordinates.pointerOffsetY;
          }
          this.setZoomData(this.controlCoordinates.initialScale, this.controlCoordinates.targetOffsetX, this.controlCoordinates.targetOffsetY);
          this.zoomPanElement(this.controlCoordinates.targetOffsetX + "px", this.controlCoordinates.targetOffsetY + "px", this.controlCoordinates.targetScale);
        }
      }
      if (event2.type === "mousemove" && this.controlCoordinates.mousedown) {
        if (event2.type == "touchmove")
          return true;
        event2.preventDefault();
        if (this.controlCoordinates.capture === false)
          return false;
        this.controlCoordinates.pointerOffsetX = event2.clientX;
        this.controlCoordinates.pointerOffsetY = event2.clientY;
        this.controlCoordinates.targetScale = this.controlCoordinates.initialScale;
        this.controlCoordinates.limitOffsetX = (this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale - this.controlCoordinates.containerWidth) / 2;
        this.controlCoordinates.limitOffsetY = (this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale - this.controlCoordinates.containerHeight) / 2;
        this.controlCoordinates.targetOffsetX = this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale <= this.controlCoordinates.containerWidth ? 0 : this.minMax(this.controlCoordinates.pointerOffsetX - (this.controlCoordinates.initialPointerOffsetX - this.controlCoordinates.initialOffsetX), this.controlCoordinates.limitOffsetX * -1, this.controlCoordinates.limitOffsetX);
        this.controlCoordinates.targetOffsetY = this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale <= this.controlCoordinates.containerHeight ? 0 : this.minMax(this.controlCoordinates.pointerOffsetY - (this.controlCoordinates.initialPointerOffsetY - this.controlCoordinates.initialOffsetY), this.controlCoordinates.limitOffsetY * -1, this.controlCoordinates.limitOffsetY);
        if (Math.abs(this.controlCoordinates.targetOffsetX) === Math.abs(this.controlCoordinates.limitOffsetX)) {
          this.controlCoordinates.initialOffsetX = this.controlCoordinates.targetOffsetX;
          this.controlCoordinates.initialPointerOffsetX = this.controlCoordinates.pointerOffsetX;
        }
        if (Math.abs(this.controlCoordinates.targetOffsetY) === Math.abs(this.controlCoordinates.limitOffsetY)) {
          this.controlCoordinates.initialOffsetY = this.controlCoordinates.targetOffsetY;
          this.controlCoordinates.initialPointerOffsetY = this.controlCoordinates.pointerOffsetY;
        }
        this.setZoomData(this.controlCoordinates.initialScale, this.controlCoordinates.targetOffsetX, this.controlCoordinates.targetOffsetY);
        this.zoomPanElement(this.controlCoordinates.targetOffsetX + "px", this.controlCoordinates.targetOffsetY + "px", this.controlCoordinates.targetScale);
      }
      if (!this.controlCoordinates.zoomed) {
        this.controlCoordinates.swipeEnd = event2.pageX || event2.touches[0].pageX;
        this.controlCoordinates.swipeYEnd = event2.pageY || event2.touches[0].pageY;
        this.controlCoordinates.swipeDiff = this.controlCoordinates.swipeStart - this.controlCoordinates.swipeEnd;
        this.controlCoordinates.swipeYDiff = this.controlCoordinates.swipeYStart - this.controlCoordinates.swipeYEnd;
        if (this.options.animationSlide) {
          this.slide(0, -this.controlCoordinates.swipeDiff + "px");
        }
      }
    });
    this.addEventListener(this.domNodes.image, ["touchend." + this.eventNamespace, "mouseup." + this.eventNamespace, "touchcancel." + this.eventNamespace, "mouseleave." + this.eventNamespace, "pointerup", "pointercancel", "MSPointerUp", "MSPointerCancel"], (event2) => {
      if (this.isTouchDevice && event2.type === "touchend") {
        this.controlCoordinates.touchCount = event2.touches.length;
        if (this.controlCoordinates.touchCount === 0) {
          if (this.currentImage) {
            this.setZoomData(this.controlCoordinates.initialScale, this.controlCoordinates.targetOffsetX, this.controlCoordinates.targetOffsetY);
          }
          if (this.controlCoordinates.initialScale === 1) {
            this.controlCoordinates.zoomed = false;
            if (this.domNodes.caption.style.display === "none") {
              this.fadeIn(this.domNodes.caption, this.options.fadeSpeed);
            }
          }
          this.controlCoordinates.initialPinchDistance = null;
          this.controlCoordinates.capture = false;
        } else if (this.controlCoordinates.touchCount === 1) {
          this.controlCoordinates.initialPointerOffsetX = event2.touches[0].clientX;
          this.controlCoordinates.initialPointerOffsetY = event2.touches[0].clientY;
        } else if (this.controlCoordinates.touchCount > 1) {
          this.controlCoordinates.initialPinchDistance = null;
        }
      }
      if (this.controlCoordinates.mousedown) {
        this.controlCoordinates.mousedown = false;
        let possibleDir = true;
        if (!this.options.loop) {
          if (this.currentImageIndex === 0 && this.controlCoordinates.swipeDiff < 0) {
            possibleDir = false;
          }
          if (this.currentImageIndex >= this.relatedElements.length - 1 && this.controlCoordinates.swipeDiff > 0) {
            possibleDir = false;
          }
        }
        if (Math.abs(this.controlCoordinates.swipeDiff) > this.options.swipeTolerance && possibleDir) {
          this.loadImage(this.controlCoordinates.swipeDiff > 0 ? 1 : -1);
        } else if (this.options.animationSlide) {
          this.slide(this.options.animationSpeed / 1e3, 0 + "px");
        }
        if (this.options.swipeClose && Math.abs(this.controlCoordinates.swipeYDiff) > 50 && Math.abs(this.controlCoordinates.swipeDiff) < this.options.swipeTolerance) {
          this.close();
        }
      }
    });
    this.addEventListener(this.domNodes.image, ["dblclick"], (event2) => {
      if (this.isTouchDevice)
        return;
      this.controlCoordinates.initialPointerOffsetX = event2.clientX;
      this.controlCoordinates.initialPointerOffsetY = event2.clientY;
      this.controlCoordinates.containerHeight = this.getDimensions(this.domNodes.image).height;
      this.controlCoordinates.containerWidth = this.getDimensions(this.domNodes.image).width;
      this.controlCoordinates.imgHeight = this.getDimensions(this.currentImage).height;
      this.controlCoordinates.imgWidth = this.getDimensions(this.currentImage).width;
      this.controlCoordinates.containerOffsetX = this.domNodes.image.offsetLeft;
      this.controlCoordinates.containerOffsetY = this.domNodes.image.offsetTop;
      this.currentImage.classList.add("sl-transition");
      if (!this.controlCoordinates.zoomed) {
        this.controlCoordinates.initialScale = this.options.doubleTapZoom;
        this.setZoomData(this.controlCoordinates.initialScale, 0, 0);
        this.zoomPanElement(0 + "px", 0 + "px", this.controlCoordinates.initialScale);
        if (!this.domNodes.caption.style.opacity && this.domNodes.caption.style.display !== "none") {
          this.fadeOut(this.domNodes.caption, this.options.fadeSpeed);
        }
        this.controlCoordinates.zoomed = true;
      } else {
        this.controlCoordinates.initialScale = 1;
        this.setZoomData(this.controlCoordinates.initialScale, 0, 0);
        this.zoomPanElement(0 + "px", 0 + "px", this.controlCoordinates.initialScale);
        this.controlCoordinates.zoomed = false;
        if (this.domNodes.caption.style.display === "none") {
          this.fadeIn(this.domNodes.caption, this.options.fadeSpeed);
        }
      }
      setTimeout(() => {
        if (this.currentImage) {
          this.currentImage.classList.remove("sl-transition");
          this.currentImage.style[this.transitionPrefix + "transform-origin"] = null;
        }
      }, 200);
      this.controlCoordinates.capture = true;
      return false;
    });
  }
  getDimensions(element) {
    let styles2 = window.getComputedStyle(element), height = element.offsetHeight, width = element.offsetWidth, borderTopWidth = parseFloat(styles2.borderTopWidth), borderBottomWidth = parseFloat(styles2.borderBottomWidth), paddingTop = parseFloat(styles2.paddingTop), paddingBottom = parseFloat(styles2.paddingBottom), borderLeftWidth = parseFloat(styles2.borderLeftWidth), borderRightWidth = parseFloat(styles2.borderRightWidth), paddingLeft = parseFloat(styles2.paddingLeft), paddingRight = parseFloat(styles2.paddingRight);
    return {
      height: height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom,
      width: width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight
    };
  }
  updateHash() {
    let newHash = "pid=" + (this.currentImageIndex + 1), newURL = window.location.href.split("#")[0] + "#" + newHash;
    this.hashReseted = false;
    if (this.pushStateSupport) {
      window.history[this.historyHasChanges ? "replaceState" : "pushState"]("", document.title, newURL);
    } else {
      if (this.historyHasChanges) {
        window.location.replace(newURL);
      } else {
        window.location.hash = newHash;
      }
    }
    if (!this.historyHasChanges) {
      this.urlChangedOnce = true;
    }
    this.historyHasChanges = true;
  }
  resetHash() {
    this.hashReseted = true;
    if (this.urlChangedOnce) {
      history.back();
    } else {
      if (this.pushStateSupport) {
        history.pushState("", document.title, window.location.pathname + window.location.search);
      } else {
        window.location.hash = "";
      }
    }
    clearTimeout(this.historyUpdateTimeout);
  }
  updateURL() {
    clearTimeout(this.historyUpdateTimeout);
    if (!this.historyHasChanges) {
      this.updateHash();
    } else {
      this.historyUpdateTimeout = setTimeout(this.updateHash.bind(this), 800);
    }
  }
  setCaption(captionText, imageWidth) {
    if (this.options.captions && captionText && captionText !== "" && typeof captionText !== "undefined") {
      this.hide(this.domNodes.caption);
      this.domNodes.caption.style.width = imageWidth + "px";
      this.domNodes.caption.innerHTML = captionText;
      this.domNodes.image.appendChild(this.domNodes.caption);
      setTimeout(() => {
        this.fadeIn(this.domNodes.caption, this.options.fadeSpeed);
      }, this.options.captionDelay);
    }
  }
  slide(speed, pos) {
    if (!this.transitionCapable) {
      return this.domNodes.image.style.left = pos;
    }
    this.domNodes.image.style[this.transitionPrefix + "transform"] = "translateX(" + pos + ")";
    this.domNodes.image.style[this.transitionPrefix + "transition"] = this.transitionPrefix + "transform " + speed + "s linear";
  }
  getRelated(rel) {
    let elems;
    if (rel && rel !== false && rel !== "nofollow") {
      elems = Array.from(this.elements).filter((element) => element.getAttribute("rel") === rel);
    } else {
      elems = this.elements;
    }
    return elems;
  }
  openImage(element) {
    element.dispatchEvent(new Event("show." + this.eventNamespace));
    if (this.options.disableScroll) {
      this.globalScrollbarWidth = this.toggleScrollbar("hide");
    }
    if (this.options.htmlClass && this.options.htmlClass !== "") {
      document.querySelector("html").classList.add(this.options.htmlClass);
    }
    document.body.appendChild(this.domNodes.wrapper);
    this.domNodes.wrapper.appendChild(this.domNodes.image);
    if (this.options.overlay) {
      document.body.appendChild(this.domNodes.overlay);
    }
    this.relatedElements = this.getRelated(element.rel);
    if (this.options.showCounter) {
      if (this.relatedElements.length == 1 && this.domNodes.wrapper.contains(this.domNodes.counter)) {
        this.domNodes.wrapper.removeChild(this.domNodes.counter);
      } else if (this.relatedElements.length > 1 && !this.domNodes.wrapper.contains(this.domNodes.counter)) {
        this.domNodes.wrapper.appendChild(this.domNodes.counter);
      }
    }
    this.isAnimating = true;
    this.currentImageIndex = this.relatedElements.indexOf(element);
    let targetURL = element.getAttribute(this.options.sourceAttr);
    this.currentImage = document.createElement("img");
    this.currentImage.style.display = "none";
    this.currentImage.setAttribute("src", targetURL);
    this.currentImage.dataset.scale = 1;
    this.currentImage.dataset.translateX = 0;
    this.currentImage.dataset.translateY = 0;
    if (this.loadedImages.indexOf(targetURL) === -1) {
      this.loadedImages.push(targetURL);
    }
    this.domNodes.image.innerHTML = "";
    this.domNodes.image.setAttribute("style", "");
    this.domNodes.image.appendChild(this.currentImage);
    this.fadeIn(this.domNodes.overlay, this.options.fadeSpeed);
    this.fadeIn([this.domNodes.counter, this.domNodes.navigation, this.domNodes.closeButton], this.options.fadeSpeed);
    this.show(this.domNodes.spinner);
    this.domNodes.counter.querySelector(".sl-current").innerHTML = this.currentImageIndex + 1;
    this.domNodes.counter.querySelector(".sl-total").innerHTML = this.relatedElements.length;
    this.adjustImage();
    if (this.options.preloading) {
      this.preload();
    }
    setTimeout(() => {
      element.dispatchEvent(new Event("shown." + this.eventNamespace));
    }, this.options.animationSpeed);
  }
  forceFocus() {
    this.removeEventListener(document, "focusin." + this.eventNamespace);
    this.addEventListener(document, "focusin." + this.eventNamespace, (event2) => {
      if (document !== event2.target && this.domNodes.wrapper !== event2.target && !this.domNodes.wrapper.contains(event2.target)) {
        this.domNodes.wrapper.focus();
      }
    });
  }
  addEventListener(elements, events2, callback, opts) {
    elements = this.wrap(elements);
    events2 = this.wrap(events2);
    for (let element of elements) {
      if (!element.namespaces) {
        element.namespaces = {};
      }
      for (let event2 of events2) {
        let options = opts || false;
        let needsPassiveFix = ["touchstart", "touchmove"].indexOf(event2.split(".")[0]) >= 0;
        if (needsPassiveFix && this.isPassiveEventsSupported) {
          if (typeof options === "object") {
            options.passive = true;
          } else {
            options = { passive: true };
          }
        }
        element.namespaces[event2] = callback;
        element.addEventListener(event2.split(".")[0], callback, options);
      }
    }
  }
  removeEventListener(elements, events2) {
    elements = this.wrap(elements);
    events2 = this.wrap(events2);
    for (let element of elements) {
      for (let event2 of events2) {
        if (element.namespaces && element.namespaces[event2]) {
          element.removeEventListener(event2.split(".")[0], element.namespaces[event2]);
          delete element.namespaces[event2];
        }
      }
    }
  }
  fadeOut(elements, duration, callback) {
    elements = this.wrap(elements);
    for (let element of elements) {
      element.style.opacity = parseFloat(element) || window.getComputedStyle(element).getPropertyValue("opacity");
    }
    this.isFadeIn = false;
    let step = 16.66666 / (duration || this.options.fadeSpeed), fade = () => {
      let currentOpacity = parseFloat(elements[0].style.opacity);
      if ((currentOpacity -= step) < 0) {
        for (let element of elements) {
          element.style.display = "none";
          element.style.opacity = 1;
        }
        callback && callback.call(this, elements);
      } else {
        for (let element of elements) {
          element.style.opacity = currentOpacity;
        }
        requestAnimationFrame(fade);
      }
    };
    fade();
  }
  fadeIn(elements, duration, callback, display) {
    elements = this.wrap(elements);
    for (let element of elements) {
      element.style.opacity = 0;
      element.style.display = display || "block";
    }
    this.isFadeIn = true;
    let opacityTarget = parseFloat(elements[0].dataset.opacityTarget || 1), step = 16.66666 * opacityTarget / (duration || this.options.fadeSpeed), fade = () => {
      let currentOpacity = parseFloat(elements[0].style.opacity);
      if (!((currentOpacity += step) > opacityTarget)) {
        for (let element of elements) {
          element.style.opacity = currentOpacity;
        }
        if (!this.isFadeIn)
          return;
        requestAnimationFrame(fade);
      } else {
        for (let element of elements) {
          element.style.opacity = opacityTarget;
        }
        callback && callback.call(this, elements);
      }
    };
    fade();
  }
  hide(elements) {
    elements = this.wrap(elements);
    for (let element of elements) {
      if (element.style.display != "none") {
        element.dataset.initialDisplay = element.style.display;
      }
      element.style.display = "none";
    }
  }
  show(elements, display) {
    elements = this.wrap(elements);
    for (let element of elements) {
      element.style.display = element.dataset.initialDisplay || display || "block";
    }
  }
  wrap(input) {
    return typeof input[Symbol.iterator] === "function" && typeof input !== "string" ? input : [input];
  }
  on(events2, callback) {
    events2 = this.wrap(events2);
    for (let element of this.elements) {
      if (!element.fullyNamespacedEvents) {
        element.fullyNamespacedEvents = {};
      }
      for (let event2 of events2) {
        element.fullyNamespacedEvents[event2] = callback;
        element.addEventListener(event2, callback);
      }
    }
    return this;
  }
  off(events2) {
    events2 = this.wrap(events2);
    for (let element of this.elements) {
      for (let event2 of events2) {
        if (typeof element.fullyNamespacedEvents !== "undefined" && event2 in element.fullyNamespacedEvents) {
          element.removeEventListener(event2, element.fullyNamespacedEvents[event2]);
        }
      }
    }
    return this;
  }
  open(elem) {
    elem = elem || this.elements[0];
    if (typeof jQuery !== "undefined" && elem instanceof jQuery) {
      elem = elem.get(0);
    }
    this.initialImageIndex = this.elements.indexOf(elem);
    if (this.initialImageIndex > -1) {
      this.openImage(elem);
    }
  }
  next() {
    this.loadImage(1);
  }
  prev() {
    this.loadImage(-1);
  }
  getLighboxData() {
    return {
      currentImageIndex: this.currentImageIndex,
      currentImage: this.currentImage,
      globalScrollbarWidth: this.globalScrollbarWidth
    };
  }
  destroy() {
    this.off([
      "close." + this.eventNamespace,
      "closed." + this.eventNamespace,
      "nextImageLoaded." + this.eventNamespace,
      "prevImageLoaded." + this.eventNamespace,
      "change." + this.eventNamespace,
      "nextDone." + this.eventNamespace,
      "prevDone." + this.eventNamespace,
      "error." + this.eventNamespace,
      "changed." + this.eventNamespace,
      "next." + this.eventNamespace,
      "prev." + this.eventNamespace,
      "show." + this.eventNamespace,
      "shown." + this.eventNamespace
    ]);
    this.removeEventListener(this.elements, "click." + this.eventNamespace);
    this.removeEventListener(document, "focusin." + this.eventNamespace);
    this.removeEventListener(document.body, "contextmenu." + this.eventNamespace);
    this.removeEventListener(document.body, "keyup." + this.eventNamespace);
    this.removeEventListener(this.domNodes.navigation.getElementsByTagName("button"), "click." + this.eventNamespace);
    this.removeEventListener(this.domNodes.closeButton, "click." + this.eventNamespace);
    this.removeEventListener(window, "resize." + this.eventNamespace);
    this.removeEventListener(window, "hashchange." + this.eventNamespace);
    this.close();
    if (this.isOpen) {
      document.body.removeChild(this.domNodes.wrapper);
      document.body.removeChild(this.domNodes.overlay);
    }
    this.elements = null;
  }
  refresh() {
    if (!this.initialSelector) {
      throw "refreshing only works when you initialize using a selector!";
    }
    let options = this.options, selector = this.initialSelector;
    this.destroy();
    this.constructor(selector, options);
    return this;
  }
}
global.SimpleLightbox = SimpleLightbox;
const initLightBox = () => {
  document.getElementsByClassName("project_item-a");
  new SimpleLightbox(".project_item-a", {
    captionSelector: "self"
  });
};
const initBurger = () => {
  const burger = document.querySelector(".burger-icon");
  document.querySelector("nav");
  burger.addEventListener("click", () => {
    toggleNav();
  });
  if (window.innerWidth < 700) {
    closeNav();
  }
};
const toggleNav = () => {
  const mainNav = document.querySelector("nav");
  mainNav.classList.toggle("hide");
};
const closeNav = () => {
  const mainNav = document.querySelector("nav");
  mainNav.classList.add("hide");
};
const closeNavOnClick = () => {
  const linksMenu = document.querySelectorAll("nav a");
  linksMenu.forEach((link) => {
    if (window.innerWidth < 700) {
      link.addEventListener("click", closeNav);
    } else {
      link.removeEventListener("click", closeNav);
    }
  });
};
const projects = document.querySelectorAll(".container-project_info");
const imgs = document.querySelectorAll(".container-project_img");
const darkColor = getComputedStyle(document.documentElement).getPropertyValue("--dark-color");
const lightColor = getComputedStyle(document.documentElement).getPropertyValue("--light-color");
const hideAllImages = () => {
  imgs.forEach((e) => {
    e.style.opacity = 0;
  });
  projects.forEach((e) => {
    e.style.color = lightColor;
    e.style.backgroundColor = darkColor;
  });
};
const initImages = () => {
  projects.forEach((p) => {
    p.addEventListener("mouseover", (event2) => {
      if (window.innerWidth > 1100) {
        hideAllImages();
        p.style.color = darkColor;
        p.style.backgroundColor = lightColor;
        const img = p.parentNode.getElementsByClassName("container-project_img")[0];
        img.style.opacity = 1;
      }
    });
  });
  hideAllImages();
  imgs[0].style.opacity = 1;
  projects[0].style.color = darkColor;
  projects[0].style.backgroundColor = lightColor;
};
const displayImgState = () => {
  if (window.innerWidth > 1100) {
    initImages();
  } else {
    imgs.forEach((e) => {
      e.style.opacity = 1;
    });
  }
};
window.addEventListener("DOMContentLoaded", (event2) => {
  initLightBox();
  initBurger();
  closeNavOnClick();
  displayImgState();
  new Marquee(document.querySelector(".marquee-row"), 0);
  const r = new Reveal();
  r.init();
  const s = new SwiperManager();
  s.init();
  document.fonts.onloadingdone = function(fontFaceSetEvent) {
    console.log(fontFaceSetEvent.fontfaces, "futura load : " + document.fonts.check("0.9rem Futura-PT"));
  };
});
window.addEventListener("resize", () => {
  closeNav();
  closeNavOnClick();
  displayImgState();
});
