import gsap from 'gsap'

export default class Preloader {
	constructor() {
		this._getElements();
		this._init().then(r => console.log('Préloader terminé!'));
	}

	_getElements() {
		this.preloader = document.querySelector('#preloader')
		this.svgLogo = this.preloader?.querySelector('svg')
		this.rect = this.svgLogo?.querySelector('rect')
		this.line = this.svgLogo?.querySelector('line')
	}
// TODO : block le scroll
	_init() {
		console.log('Préloader initialisé!')

		return new Promise(resolve => {
			// Verify selected elements
			if (!this.preloader || !this.rect || !this.line) {
				console.error('Préloader introuvable ou éléments absents!')
				resolve()
				return
			}

			const counter = document.querySelector('#loading-counter')
			if (!counter) {
				console.error('Élément du compteur introuvable!')
				resolve()
				return
			}

			document.body.classList.add('loading')
			console.log('Départ de l\'animation du préloader...')

			// Create GSAP timeline for smooth animation
			const tl = gsap.timeline({
				onComplete: () => {
					this._removePreloader()
					resolve()
				},
			})

			// Set initial states
			gsap.set([this.rect, this.line], { attr: { width: 0, x2: 5 } })
			gsap.set(counter, { textContent: '0%' })

			// Animate loading progress
			tl.to([this.rect, this.line], {
				duration: 2,
				attr: {
					width: 30, // Max width for rect
					x2: 35, // 5 + 30 for line
				},
				ease: 'power1.inOut',
				onUpdate: () => {
					const progress = Math.round(tl.progress() * 100)
					counter.textContent = `${progress}%`
				},
			})
		})
	}

	_removePreloader() {
		gsap.to(this.preloader, {
			autoAlpha: 0,
			duration: 0.5,
			onComplete: () => {
				document.body.classList.remove('loading')
				this.preloader.remove() // More modern than removeChild
			},
		})
	}
}