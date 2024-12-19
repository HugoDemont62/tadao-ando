import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class Intro {
	constructor() {
		this._getElements();
		this._init();
	}

	_getElements() {
		this.textRows = document.querySelectorAll('.home-intro__text__row');
		this.images = document.querySelectorAll('.home-intro__text__row .image');
	}

	_init() {
		gsap.from(this.images, {
			scaleX: 0,
			width: 0,
			duration: 1,
			stagger: 0.3,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: this.images,
				start: 'top 80%',
				end: 'bottom 10%',
				scrub: true,
			},
		});
	}
}