import MouseFollower from 'mouse-follower';
import gsap from 'gsap';

export function initCursor(strongElements) {
	MouseFollower.registerGSAP(gsap);
	const cursor = new MouseFollower();

	// Gestion des éléments existants
	strongElements.forEach(element => {
		element.addEventListener('mouseenter', () => {
			gsap.to(cursor.el, {
				scale: 1.5,
				duration: 0.3,
				ease: 'power2.out',
				onStart: () => cursor.addState('-highlight')
			});
		});

		element.addEventListener('mouseleave', () => {
			gsap.to(cursor.el, {
				scale: 1,
				duration: 0.3,
				ease: 'power2.out',
				onComplete: () => cursor.removeState('-highlight')
			});
		});
	});
}