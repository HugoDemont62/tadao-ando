import Barba from './transition';
import Lenis from 'lenis';
import gsap from 'gsap';
import MouseFollower from 'mouse-follower';
import ScrollTrigger from 'gsap/ScrollTrigger'

class App {
	constructor() {
		gsap.registerPlugin(ScrollTrigger)
		this._getElements();
		this._initBarba();
		this._initLenis();

		this._initPreloader();
		this._initCursor();
		this._initHero();
	}

	_getElements() {
		this.preloader = document.querySelector('#preloader');
		this.svgLogo = this.preloader?.querySelector('svg');
		this.rect = this.svgLogo?.querySelector('rect');
		this.line = this.svgLogo?.querySelector('line');
		this.strongElements = document.querySelectorAll('strong');
		this.homeHero = document.querySelector('.home-hero');
		this.mediaElements = document.querySelectorAll('.home-hero .media');
		this.heroTitle = document.querySelector('.home-hero h1');

	}

	_initCursor() {
		MouseFollower.registerGSAP(gsap);
		const cursor = new MouseFollower();

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

	_initLenis() {
			const lenis = new Lenis({
				autoRaf: true,
			});
	}

	_initPreloader() {
		if (!this.preloader || !this.rect || !this.line) {
			console.error("Preloader elements missing!");
			return;
		}

		document.body.classList.add('loading');
		let progress = 0;
		const progressElement = document.createElement('div');
		progressElement.classList.add('preloader-progress');
		this.preloader.appendChild(progressElement);

		const interval = setInterval(() => {
			progress += progress < 50 ? 3 : 1;
			progress = Math.min(progress, 100);
			progressElement.textContent = `${progress}%`;

			this.rect.setAttribute('width', progress + '%');
			this.line.setAttribute('x2', progress + '%');

			if (progress === 100) {
				clearInterval(interval);
				this.removePreloader();
			}
		}, 20);
	}

	removePreloader() {
		gsap.to(this.preloader, {
			opacity: 0,
			duration: 0.5,
			onComplete: () => {
				this.preloader.style.display = 'none';
				document.body.classList.remove('loading');
			}
		});
	}

	_initBarba() {
		new Barba();
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

}

new App();