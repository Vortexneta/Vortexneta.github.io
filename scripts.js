  // 1. Configuración de la ventana modal (Fancybox)
  Fancybox.bind('[data-fancybox="galeria-panzano"]', {
    Toolbar: {
      display: {
        left: ["infobar"],
        middle: [],
        right: ["zoom", "slideshow", "fullscreen", "close"],
      },
    },
    Images: {
      Panzoom: {
        maxScale: 3,
      },
    },
  });

// 2. Lógica para Expandir y Contraer la Galería
const loadMoreBtn = document.getElementById('loadMoreBtn');
const imagesPerLoad = 8; // Fotos a revelar por cada clic
const allGalleryLinks = Array.from(document.querySelectorAll('.gallery-grid a'));
const initialVisibleCount = window.matchMedia('(max-width: 768px)').matches ? 4 : 8;

allGalleryLinks.forEach((link, index) => {
  if (index >= initialVisibleCount) {
    link.classList.add('hidden-img');
  }
});

loadMoreBtn.addEventListener('click', () => {
  const hiddenImages = document.querySelectorAll('.gallery-grid a.hidden-img');

      // SI EL BOTÓN DICE "VER MENOS": Contrae la galería al estado inicial
  if (loadMoreBtn.textContent === 'Ver menos') {
    allGalleryLinks.forEach((link, index) => {
      if (index >= initialVisibleCount) {
        link.classList.add('hidden-img');
      }
    });

        // Cambia el texto del botón y hace scroll suave de regreso al inicio de la galería
    loadMoreBtn.textContent = 'Ver más fotos';
    document.getElementById('galeria').scrollIntoView({ behavior: 'smooth' });
    return;
  }

      // SI EL BOTÓN DICE "VER MÁS FOTOS": Muestra el siguiente lote de imágenes
  for (let i = 0; i < imagesPerLoad && i < hiddenImages.length; i++) {
    hiddenImages[i].classList.remove('hidden-img');
  }

      // Si ya se mostraron todas las imágenes, cambia la función del botón a "Ver menos"
  if (document.querySelectorAll('.gallery-grid a.hidden-img').length === 0) {
    loadMoreBtn.textContent = 'Ver menos';
  }
});

// 3. Navegación rápida al salir de la portada
const hero = document.querySelector('.hero');
const quickNav = document.getElementById('quickNav');
const quickNavToggle = document.getElementById('quickNavToggle');
const quickNavLinks = document.getElementById('quickNavLinks');
const quickNavIcon = quickNavToggle.querySelector('.quick-nav-icon');

const updateQuickNav = () => {
  const shouldShow = window.scrollY > hero.offsetHeight - 120;
  quickNav.classList.toggle('is-visible', shouldShow);
};

quickNavToggle.addEventListener('click', () => {
  const isCollapsed = quickNav.classList.toggle('is-collapsed');
  quickNavToggle.setAttribute('aria-expanded', String(!isCollapsed));
  quickNavIcon.textContent = isCollapsed ? '▼' : '▲';
});

quickNavLinks.addEventListener('click', () => {
  quickNav.classList.remove('is-collapsed');
  quickNavToggle.setAttribute('aria-expanded', 'true');
  quickNavIcon.textContent = '▲';
});

window.addEventListener('scroll', updateQuickNav, { passive: true });
updateQuickNav();