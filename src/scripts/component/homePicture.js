import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class HomePicture {
	constructor() {
		this._getElements();
		this._init();
	}

	_getElements() {
		this.mediaInner = document.querySelector('.home-picture .media__inner img');
	}

	_init() {
		if (this.mediaInner) {
			gsap.to(this.mediaInner, {
				scale: 1.5,
				scrollTrigger: {
					trigger: this.mediaInner,
					start: 'top top',
					end: 'bottom+=150vh top',
					scrub: true,
				}
			});
		}
	}
}