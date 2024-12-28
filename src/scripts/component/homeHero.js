import gsap from 'gsap'

export default class HomeHero {
	constructor() {
		this._getElements()
		this._init()
	}

	_getElements() {
		this.homeHero = document.querySelector('.home-hero')
		this.mediaLeft = document.querySelector('.home-hero .media.--left')
		this.mediaCenter = document.querySelector('.home-hero .media.--center')
		this.mediaRight = document.querySelector('.home-hero .media.--right')
		this.heroTitle = document.querySelector('.home-hero h1')
		this.header = document.querySelector('.header')
	}

	_init() {
		gsap.timeline()
			.from([this.mediaLeft, this.mediaRight], {
				x: (index) => index === 0 ? '-100%' : '100%',
				opacity: 0,
				duration: .5,
				ease: 'power2.out',
				delay: 2.7,
			}, '-=0.5')
			.from(this.header, {
				opacity: 0,
				duration: 1,
				ease: 'power2.out',
			})
			.from(this.mediaCenter, {
				opacity: 0,
				duration: 1,
				ease: 'power2.out',
			}, '-=0.5')
			.from(this.heroTitle, {
				opacity: 0,
				y: 20,
				duration: 1,
				ease: 'power2.out',
			}, '-=0.5')
	}
}