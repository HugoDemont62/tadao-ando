import Barba from './transition';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import HomeAnimation from './component/homeAnimation.js';
import Close from './component/close.js';
import Parallax from './component/parallax.js';
import HomeHero from './component/homeHero.js';
import { initCursor } from './component/cursor.js';
import { initLenis } from './component/lenis.js';
import Intro from './component/intro.js';

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
		this._initIntro();
	}

	// Récupération des éléments HTML
	_getElements() {
		this.strongElements = document.querySelectorAll('strong');
	}

	_initCursor() {
		initCursor(this.strongElements);
	}

	_initLenis() {
		initLenis();
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

	_initIntro() {
		console.log('init intro');
		new Intro();
	}
}

// Initialise l'application au chargement
new App();