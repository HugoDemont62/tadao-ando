import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default class HomeAnimation {
	constructor() {
		gsap.registerPlugin(ScrollTrigger); // Enregistrement du plugin ScrollTrigger
		this._getElements(); // Récupération des éléments
		this.init(); // Initialisation des animations
	}

	_getElements() {
		// Récupérer tous les éléments <strong> dans la section .home-quote
		this.strongElements = document.querySelectorAll(".home-quote strong");
	}

	init() {
		// Vérifier que des éléments <strong> sont trouvés
		if (this.strongElements.length > 0) {
			this.strongElements.forEach((element) => {
				// Appliquer une animation sur chaque <strong>
				gsap.fromTo(
					element,
					{
						opacity: 0, // Point de départ : invisible
						rotationX: -90, // Départ : incliné autour de l'axe X
						transformPerspective: 1000, // Perspective pour l'effet 3D (doit être défini pour les rotations en 3D)
					},
					{
						opacity: 1, // Rendre visible
						rotationX: 0, // Retour à sa position normale
						duration: 1.5, // Durée totale (en secondes)
						ease: "power2.out", // Easing pour un effet fluide
						scrollTrigger: {
							trigger: element, // L'élément déclencheur
							start: "top 80%", // Commence quand l'élément est visible à 80%
							end: "top 60%", // Terminé lorsque 60% visible
							toggleActions: "play none none none", // Joue une seule fois
							markers: false, // Mettre à true si debug nécessaire
						},
					}
				);
			});
		}
	}
}