import Barba from './transition'
import Lenis from 'lenis'
import gsap from 'gsap'
import MouseFollower from 'mouse-follower'
import ScrollTrigger from 'gsap/ScrollTrigger'
import HomeAnimation from './component/homeAnimation.js'
import Close from './component/close.js'
import Parallax from './component/parallax.js'
import HomeHero from './component/homeHero.js'

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
		new HomeHero();
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