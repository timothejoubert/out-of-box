export function mapRange(value, a, b, c, d) {
  value = (value - a) / (b - a);
  return c + value * (d - c);
}
export function randomRange(min, max) {
  return min + Math.random() * (max - min);
}
export function normalize(val, max, min) {
  return (val - min) / (max - min);
}
export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
export function map(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
export function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}
