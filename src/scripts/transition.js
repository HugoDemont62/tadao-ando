import barba from '@barba/core'
import gsap from 'gsap'
import Preloader from './component/preloader.js'

export default class Barba {
	constructor() {
		this.init()
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
						await preloader.init()

						console.log('Préloader terminé !')

						// Animation du container après le préloader
						return gsap.from(next.container, {
							opacity: 0,
							duration: 2,
						})
					},

					// Transition sortante
					leave: ({ current }) => {
						// Création d'un élément div simulant un rideau
						const overlay = document.createElement('div')
						overlay.style.position = 'fixed'
						overlay.style.top = 0
						overlay.style.left = 0
						overlay.style.width = '0%' // Départ à 0% de largeur
						overlay.style.height = '100%'
						overlay.style.backgroundColor = '#2323ff' // Rideau noir ou autre couleur
						overlay.style.zIndex = 9999 // Devant tout
						document.body.appendChild(overlay)

						// Animation progressive de gauche à droite
						const tl = gsap.timeline({
							onComplete: () => overlay.remove(), // Retire le rideau après l'animation
						})

						tl.to(overlay, {
							width: '100%', // Le rideau couvre toute la page progressivement
							duration: 1,
							ease: 'power2.inOut',
						}).to(current.container, {
							opacity: 0,
							duration: 0.5,
							ease: 'power1.out',
						})

						return tl
					},

					// Transition entrante
					enter: ({ next }) => {
						// Création d'un rideau qui part dans l'autre sens
						const overlay = document.createElement('div')
						overlay.style.position = 'fixed'
						overlay.style.top = 0
						overlay.style.left = 0
						overlay.style.width = '100%'
						overlay.style.height = '100%'
						overlay.style.backgroundColor = '#2323ff' // Même couleur que pour le leave
						overlay.style.zIndex = 9999
						document.body.appendChild(overlay)

						// Animation progressive d'ouverture (droite vers gauche)
						const tl = gsap.timeline({
							onComplete: () => overlay.remove(), // Retire le rideau après l'animation
						})

						tl.fromTo(
							overlay,
							{ width: '100%' }, // Commence avec le rideau complet visible
							{
								width: '0%', // Réduit le rideau vers la droite
								duration: 1,
								ease: 'power2.inOut',
							},
						).from(next.container, {
							opacity: 0,
							duration: 1,
							ease: 'power1.inOut',
						})

						return tl
					},
				},
			],
		})
	}
}