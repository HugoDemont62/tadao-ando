import gsap from 'gsap';

export default class Parallax {
	constructor() {
		// Récupérer les listes ou éléments ciblés et initialiser GSAP
		this._getElements();
		this._init();
	}

	_getElements() {
		this.container = document.querySelector('section.home-projects'); // Conteneur principal

		// Récupération des listes (3 listes au total)
		this.elements = [
			{
				element: document.querySelector('section.home-projects > ul:nth-child(1)'), // Première liste
				// speed: 0.5, // Vitesse normale
				direction: -1,
			},
			{
				element: document.querySelector('section.home-projects > ul:nth-child(2)'), // Deuxième liste
				// speed: 0.2, // Liste du milieu - beaucoup plus lente
				direction: 1,
			},
			{
				element: document.querySelector('section.home-projects > ul:nth-child(3)'), // Troisième liste
				// speed: 0.5, // Même vitesse que la première
				direction: -1,
			},
		];
	}
// TODO : l'anj
	_init() {
		// Vérifier que la structure existe avant de tout initialiser
		if (!this.elements.length) return;

		// Boucler sur chaque élément et créer les animations GSAP
		this.elements.forEach(({ element, direction }) => {
			if (element) {
				gsap.set(element, { y: 600 * direction * -1}); // Réinitialiser la position Y
				gsap.to(element, {
					y: 600 * direction, // Ajuster le mouvement Y
					ease: 'none', // Pas d'accélération pour des mouvements fluides
					scrollTrigger: {
						markers: true,
						trigger: this.container, // Élément déclencheur
						start: 'top bottom', // Animation démarre quand l'élément entre dans la vue
						end: 'bottom top', // Animation termine quand il quitte la vue
						scrub: true, // Synchronisation fluide avec la scrolling
					},
				});
			}
		});
	}
}