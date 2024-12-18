import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class Intro {
	constructor() {
		// Récupérer les listes ou éléments ciblés et initialiser GSAP
		this._getElements();
		this._init();
	}

	_getElements() {
		this.textRows = document.querySelectorAll('.home-intro__text__row');
		this.images = document.querySelectorAll('.home-intro__text__row .image img');
	}

	_init() {
		gsap.from(this.textRows, {
			opacity: 0,
			y: 20,
			duration: 1,
			stagger: 0.3,
			ease: 'power2.out',
			delay: 1,
		});

		gsap.from(this.images, {
			opacity: 0,
			x: -100,
			scale: 0.5,
			duration: 1,
			stagger: 0.3,
			ease: 'elastic.out(1, 0.3)',
			delay: 1.5,
			scrollTrigger: {
				trigger: this.images,
				start: 'top 80%',
				end: 'bottom 10%',
				toggleActions: 'play none none reverse',
			},
		});
	}
}