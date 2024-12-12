import Barba from './transition'
import Lenis from 'lenis'
import gsap from 'gsap'
import MouseFollower from 'mouse-follower'
import ScrollTrigger from 'gsap/ScrollTrigger'
import HomeAnimation from './component/homeAnimation.js'
import Close from './component/close.js'
import Parallax from './component/parallax.js'

export default class App {
	constructor() {
		// Enregistre GSAP avec ScrollTrigger
		gsap.registerPlugin(ScrollTrigger);

		// Initialise les fonctions principales
		this._getElements();
		this._initBarba();
		this._initLenis();
		this._initClose();
		this._initParallax();
		this._initCursor();
		this._initHero();
		this._initHomeAnimation();

	}

	// Récupération des éléments HTML
	_getElements() {
		this.strongElements = document.querySelectorAll('strong');
		this.homeHero = document.querySelector('.home-hero');
		this.mediaElements = document.querySelectorAll('.home-hero .media');
		this.heroTitle = document.querySelector('.home-hero h1');
	}

	_initCursor() {
		MouseFollower.registerGSAP(gsap);
		const cursor = new MouseFollower();

		// Gestion des éléments existants
		this.strongElements.forEach(element => {
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

	// Initialise le scroll fluide avec Lenis
	_initLenis() {
		const lenis = new Lenis({
			autoRaf: true, // Auto-rendering
		});
		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
	}

	_initBarba() {
		new Barba();
	}

	_initHomeAnimation() {
		new HomeAnimation();
	}

	_initHero() {
		gsap.from(this.mediaElements, {
			opacity: 0,
			y: 50,
			duration: 1,
			stagger: 0.2,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: this.homeHero,
				start: 'top 80%',
			},
		});

		gsap.from(this.heroTitle, {
			opacity: 0,
			y: 20,
			duration: 1,
			delay: 0.5,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: this.homeHero,
				start: 'top 80%',
			},
		});
	}

	_initClose() {
		new Close();
	}

	_initParallax() {
		new Parallax();
	}

}

// Initialise l'application au chargement
new App();