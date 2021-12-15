function clamp(number, min, max) {
	return Math.max(min, Math.min(number, max));
}
function map(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
function lerp (start, end, amt){
	return (1-amt)*start+amt*end;
}
