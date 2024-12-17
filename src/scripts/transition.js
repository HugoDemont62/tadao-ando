import barba from '@barba/core';
import gsap from 'gsap';
import Preloader from './component/preloader.js';
import { leave, enter } from './component/transitionHandlers.js';

export default class Barba {
	constructor() {
		this.init();
	}

	init() {
		// Configuration de Barba.js
		barba.init({
			transitions: [
				{
					name: 'progressive-left-to-right-curtain',

					// Animation au premier chargement
					once: async ({ next }) => {
						console.log('First page load!')

						// Instanciation et attente du préloader
						const preloader = new Preloader()
						await preloader._init()

						console.log('Préloader terminé !')

						// Animation du container après le préloader
						return gsap.from(next.container, {
							opacity: 0,
							duration: 2,
						});
					},
					leave,
					enter,
				},
			],
		});
	}
}