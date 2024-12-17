import gsap from 'gsap';

export default class HomeHero {
	constructor() {
		// Récupérer les listes ou éléments ciblés et initialiser GSAP
		this._getElements();
		this._init();
	}

	_getElements() {
		this.homeHero = document.querySelector('.home-hero');
		this.mediaElements = document.querySelectorAll('.home-hero .media');
		this.heroTitle = document.querySelector('.home-hero h1');
	}

	_init() {
		gsap.from(this.mediaElements, {
			opacity: 0,
			y: 50,
			duration: 1,
			stagger: 0.2,
			ease: 'power2.out',
			delay: 3,
			scrollTrigger: {
				trigger: this.homeHero,
				start: 'top 80%',
			},
		});

		gsap.from(this.heroTitle, {
			opacity: 0,
			y: 20,
			duration: 1,
			ease: 'power2.out',
			delay: 3,
			scrollTrigger: {
				trigger: this.homeHero,
				start: 'top 80%',
			},
		});
	}
}