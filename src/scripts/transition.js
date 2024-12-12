import barba from '@barba/core';
import gsap from 'gsap';
import Preloader from './component/preloader.js';

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
					// Animation au premier chargement
					once: async ({ next }) => {
						console.log('First page load!');

						// Instanciation et attente du préloader
						const preloader = new Preloader();
						await preloader.init();

						console.log('Préloader terminé !');

						// Animation du container après le préloader
						return gsap.from(next.container, {
							opacity: 0,
							duration: 2,
						});
					},

					// Transition sortante
					leave: ({ current }) => {
						// Création d'une timeline pour combiner plusieurs animations
						const tl = gsap.timeline();
						tl.to(current.container, {
							opacity: 0,
							y: 50, // Déplace la page vers le bas en sortant
							duration: 0.8,
							ease: 'power1.inOut',
						});
						return tl;
					},

					// Transition entrante
					enter: ({ next }) => {
						// Nouvelle timeline pour l'entrée
						const tl = gsap.timeline();
						tl.from(next.container, {
							opacity: 0,
							y: -50, // Fait apparaître la nouvelle page par le haut
							duration: 0.8,
							ease: 'power1.inOut',
						});
						return tl;
					},
				},
			],
		});
	}
}