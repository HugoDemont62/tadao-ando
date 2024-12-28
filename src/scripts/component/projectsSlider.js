import gsap from 'gsap';

export default class ProjectsSlider {
  constructor() {
    this._getElements();
    this._initObserver();
  }

  _getElements() {
    this.slides = document.querySelectorAll('.projects-slider__slide');
    this.totalSlides = this.slides.length;
    this.numberContainer = document.querySelector('.projects-slider__content__number .prefix');
    this.nameContainer = document.querySelector('.projects-slider__content__name .names');
    this.yearContainer = document.querySelector('.projects-slider__content__year .years');
    this.sliderSection = document.querySelector('.projects-slider');
  }

  _initObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this._init();
          observer.unobserve(this.sliderSection);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.sliderSection);
  }

  _init() {
    // Configuration initiale des images de fond
    this.slides.forEach((slide, index) => {
      const img = slide.querySelector('img');
      if (img) {
        const imageUrl = img.src; // Récupère l'URL de l'image
        console.log(`Slide ${index + 1}: ${imageUrl}`); // Debug
        slide.style.backgroundImage = `url(${imageUrl})`; // Applique comme fond
        gsap.set(slide, {
          scale: 1.6,
          opacity: 0,
          backgroundSize: "cover", // Assurez-vous que l'image couvre toute la zone
          backgroundPosition: "center"
        });
      } else {
        console.error(`Image non trouvée pour le slide ${index + 1}`);
      }
    });


    // Afficher la première image de fond
    gsap.set(this.slides[0], {
      scale: 1,
      opacity: 1
    });

    // Timeline infinie
    const wholeTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 3 // Ajoute un délai entre chaque cycle
    });

    // Initialiser les slides
    for (let index = 0; index < this.totalSlides - 1; index++) {
      wholeTimeline.set(
        this.slides[index],
        { zIndex: this.totalSlides - index },
        "<"
      );
      wholeTimeline.add(this._animateSlide(index), "+=1");
    }
  }

  _animateSlide(index) {
    const slideTimeline = gsap.timeline();

    const currentSlide = this.slides[index];
    const nextSlide = this.slides[index + 1];

    if (currentSlide && nextSlide) {
      // Révéler le prochain slide
      slideTimeline.to(
        nextSlide,
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          onStart: () => {
            nextSlide.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
          },
        },
        0
      );

      // Masquer le slide actuel
      slideTimeline.to(
        currentSlide,
        {
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          onComplete: () => {
            currentSlide.style.clipPath = "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)";
          },
        },
        0
      );

      // Animer les textes
      [this.numberContainer, this.nameContainer, this.yearContainer].forEach(element => {
        slideTimeline.to(
          element,
          {
            y: (-element.clientHeight * (index + 1)) / this.totalSlides,
            duration: 0.3,
          },
          0
        );
      });
    } else {
      console.error('Slides or images not found for index:', index);
    }

    return slideTimeline;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ProjectsSlider();
});
