import barba from '@barba/core'
import gsap from 'gsap'
import Preloader from './component/preloader.js'

export default class Barba {
	constructor() {
		this.init();
	}

	init() {
		// Configuration de Barba.js
		barba.init({
			transitions: [
				{
					name: 'opacity-transition',
					// Transition de la première page
					once: async ({ next }) => {
						console.log('First page load!');

						// Instanciation et attente du préloader
						const preloader = new Preloader();
						await preloader.init(); // Attend que le préloader soit terminé

						console.log('Préloader terminé !');

						// Lance l'animation Hero une fois le préloader terminé
						this.app._initHero();

						// Animation du container de la page
						return gsap.from(next.container, {
							opacity: 0,
							duration: 2,
						});
					},
					// Transition au changement de page
					leave: ({ current }) => {
						return gsap.to(current.container, {
							opacity: 0,
							duration: 1,
						});
					},
					enter: ({ next }) => {
						// Animation d'entrée du nouveau container
						return gsap.from(next.container, {
							opacity: 0,
							duration: 1,
						});
					},
				},
			],
		})
	}
}
