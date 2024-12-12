import gsap from 'gsap';

export default class Parallax {
	constructor() {
		// Récupérer les listes ou éléments ciblés et initialiser GSAP
		this._getElements();
		this.init();
	}

	_getElements() {
		// Récupération des listes (3 listes au total)
		this.elements = [
			{
				element: document.querySelector('section.home-projects > ul:nth-child(1)'), // Première liste
				speed: 0.5, // Vitesse normale
			},
			{
				element: document.querySelector('section.home-projects > ul:nth-child(2)'), // Deuxième liste
				speed: 0.2, // Liste du milieu - beaucoup plus lente
			},
			{
				element: document.querySelector('section.home-projects > ul:nth-child(3)'), // Troisième liste
				speed: 0.5, // Même vitesse que la première
			},
		];
	}

	init() {
		// Vérifier que la structure existe avant de tout initialiser
		if (!this.elements.length) return;

		// Boucler sur chaque élément et créer les animations GSAP
		this.elements.forEach(({ element, speed }) => {
			if (element) {
				gsap.to(element, {
					y: () => -(window.scrollY * speed), // Ajuster le mouvement Y
					ease: 'none', // Pas d'accélération pour des mouvements fluides
					scrollTrigger: {
						trigger: element, // Élément déclencheur
						start: 'top +=20%', // Animation démarre quand l'élément entre dans la vue
						end: 'bottom +=20%', // Animation termine quand il quitte la vue
						scrub: true, // Synchronisation fluide avec la scrolling
					},
				});
			}
		});
	}
}