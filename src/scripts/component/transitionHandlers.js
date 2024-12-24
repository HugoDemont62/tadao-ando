import gsap from 'gsap';

const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '0%';
overlay.style.height = '100%';
overlay.style.backgroundColor = '#2323ff';
overlay.style.zIndex = 9999;



export function leave({ current }) {
  document.body.appendChild(overlay);

  const tl = gsap.timeline({
    onComplete: () => overlay.remove(),
  });

  tl.to(overlay, {
    width: '100%',
    duration: 1,
    ease: 'power2.inOut',
  }).to(current.container, {
    opacity: 0,
    duration: 0.5,
    ease: 'power1.out',
  });

  return tl;
}

export function enter({ next }) {
  document.body.appendChild(overlay);

  const tl = gsap.timeline({
    onComplete: () => overlay.remove(),
  });

  tl.fromTo(
    overlay,
    { width: '100%' },
    {
      width: '0%',
      duration: 1,
      ease: 'power2.inOut',
    }
  ).from(next.container, {
    opacity: 0,
    duration: 1,
    ease: 'power1.inOut',
  });

  return tl;
}

export function beforeEnter({ next }) {
  // Bloquer le défilement avant l'animation
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  window.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });

  document.body.appendChild(overlay);

  const tl = gsap.timeline({
    onComplete: () => {
      overlay.remove();
      // Réactiver le défilement après l'animation
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
      window.removeEventListener('wheel', (e) => e.preventDefault());
    },
  });

  return tl;
}