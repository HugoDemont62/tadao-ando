import barba from '@barba/core'
import gsap from 'gsap'

export default class Barba {
	constructor() {
		this.init()
	}

	init() {
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
					once({ next }) {
						console.log('First page load!')

						// TODO : mettre ici le preloader
						return gsap.from(next.container, {
							opacity: 0,
							duration: 2,
						})
					},
					enter({ next, current }) {
						if (!current) {
							console.log('First load!')
						} else {
							console.log('Not first load')
						}

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
