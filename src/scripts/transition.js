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
					leave({ current }) {
						return gsap.to(current.container, {
							opacity: 0,
							duration: 2,
						})
					},
					once: async ({ next }) => {
						console.log('First page load!')

						// new Preloader()

						// Animation GSAP
						return gsap.from(next.container, {
							opacity: 0,
							duration: 2,
						});
					},
					enter({ next, current }) {
						return gsap.from(next.container, {
							opacity: 0,
							duration: 2,
						})
					},
				},
			],
		})
	}
}
