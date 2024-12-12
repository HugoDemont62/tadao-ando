import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default class Close {
	constructor() {
		gsap.registerPlugin(ScrollTrigger); // Enregistrer ScrollTrigger
		this._getElements(); // Récupérer les éléments
		this.init(); // Initialiser les animations
	}

	_getElements() {
		this.footer = document.querySelector(".footer"); // Sélection du footer principal
		if (this.footer) {
			// Chaque section contenue dans le footer
			this.sections = [
				this.footer.querySelector(".footer__contact"),
				this.footer.querySelector(".footer__logo"),
				...this.footer.querySelectorAll("nav"), // Les blocs de liens "Pages" et "Selected Works"
				this.footer.querySelector(".footer__contact-info"),
				this.footer.querySelector(".footer__social"),
				this.footer.querySelector(".footer__legal"),
			];
		}
	}

	init() {
		if (this.footer && this.sections.length > 0) {
			this._animateFooterSequentially();
		}
	}

	_animateFooterSequentially() {
		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: this.footer, // Trigger pour tout le footer
				start: "top 90%", // Déclenchement quand le footer entre dans le champ de vision
				toggleActions: "play none none none", // Lecture unique
			},
		});

		// Ajouter chaque section à la timeline avec un délai entre elles
		this.sections.forEach((section, index) => {
			if (section) {
				timeline.fromTo(
					section,
					{ opacity: 0, y: 50 }, // Départ : invisible, légèrement en bas
					{
						opacity: 1,
						y: 0, // Arrivée : visible et à sa position normale
						duration: 1, // Durée de 1 seconde pour chaque animation
						ease: "power3.out",
					},
					index * 0.5 // Décalage de 0.5 secondes entre chaque section
				);
			}
		});
	}
}