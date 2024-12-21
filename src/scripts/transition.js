import barba from '@barba/core'
import gsap from 'gsap'
import Preloader from './component/preloader.js'
import { beforeEnter, enter, leave } from './component/transitionHandlers.js'

export default class Barba {
	constructor() {
		this.init()
	}

	init() {
		// Bloquer le défilement avant le chargement de la page
		document.documentElement.style.overflow = 'hidden'
		document.body.style.overflow = 'hidden'

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

						// Réactiver le défilement après le préloader
						document.documentElement.style.overflow = 'auto'
						document.body.style.overflow = 'auto'

						// Animation du container après le préloader
						return gsap.from(next.container, {
							opacity: 0,
							duration: 2,
						})
					},
					leave,
					enter,
					beforeEnter,
				},
			],
		});
	}
}