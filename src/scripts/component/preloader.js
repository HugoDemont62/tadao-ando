import gsap from 'gsap'

export default class Preloader {
	constructor() {
		this._getElements();
		this.init()
	}

	_getElements() {
		this.preloader = document.querySelector('#preloader');
		this.svgLogo = this.preloader?.querySelector('svg');
		this.rect = this.svgLogo?.querySelector('rect');
		this.line = this.svgLogo?.querySelector('line');
	}

	init() {
		console.log("Préloader initialisé !");

		return new Promise((resolve) => {
			// Vérifie les éléments sélectionnés
			if (!this.preloader || !this.rect || !this.line) {
				console.error("Préloader introuvable ou éléments absents !");
				resolve();
				return;
			}

			// Récupère l'élément du compteur
			const counter = document.querySelector('#loading-counter');
			if (!counter) {
				console.error("Élément du compteur introuvable !");
				resolve();
				return;
			}

			document.body.classList.add('loading');
			let progress = 0;
			console.log("Départ de l'animation du préloader...");

			// Démarre l'intervalle
			const interval = setInterval(() => {
				progress += 2; // Incrémente le progrès
				progress = Math.min(progress, 100); // Bloque à 100 % max

				// Animation du rectangle et de la ligne
				const width = (progress / 100) * 30; // Largeur max = 30
				this.rect.setAttribute('width', width);
				this.line.setAttribute('x2', 5 + width);

				// Mise à jour du compteur
				counter.textContent = `${progress}%`;

				if (progress === 100) {
					clearInterval(interval) // Termine l'animation
					this._removePreloader() // Supprime le préloader
					resolve() // Transition vers le chargement suivant
				}
			}, 50); // Mise à jour toutes les 50ms
		});
	}

	_removePreloader() {
		gsap.to(this.preloader, {
			opacity: 0, // Fait disparaître le préloader
			duration: 0.5,
			onComplete: () => {
				this.preloader.style.display = 'none'; // Cache complètement
				document.body.classList.remove('loading');
			},
		});
	}
}