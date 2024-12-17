import Lenis from 'lenis';

export function initLenis() {
	const lenis = new Lenis({
		autoRaf: true, // Auto-rendering
	});
	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
}