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

const serviceDetails = {
  menu: {
    title: 'Menú',
    description: 'Propuestas gastronómicas pensadas para cada ocasión, con opciones de entrada, plato principal y postre adaptadas a tu evento.',
  },
  salados: {
    title: 'Salados & Finger Food',
    description: 'Mini sándwiches, pinchos, empanadas y bocados calientes para compartir en recepciones, reuniones y celebraciones.',
  },
  dulce: {
    title: 'Mesa Dulce & Pastelería',
    description: 'Brownies, tartas y bocados individuales decorados con merengue, chocolate y sabores caseros para cerrar cada encuentro.',
  },
  viandas: {
    title: 'Viandas',
    description: 'Boxes individuales con sándwiches, piezas de panadería, dulces y bebidas, listos para entregar y disfrutar.',
  },
};

const serviceCards = document.querySelectorAll('.service-card');
const serviceModal = document.getElementById('serviceModal');
const serviceModalTitle = document.getElementById('serviceModalTitle');
const serviceModalDescription = document.getElementById('serviceModalDescription');
const serviceModalClose = document.getElementById('serviceModalClose');

const closeServiceModal = () => {
  serviceModal.classList.remove('is-open');
  serviceModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

const openServiceModal = (serviceKey) => {
  const service = serviceDetails[serviceKey];
  if (!service) return;

  serviceModalTitle.textContent = service.title;
  serviceModalDescription.textContent = service.description;
  serviceModal.classList.add('is-open');
  serviceModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  serviceModalClose.focus();
};

serviceCards.forEach((card) => {
  card.addEventListener('click', () => openServiceModal(card.dataset.service));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openServiceModal(card.dataset.service);
    }
  });
});

serviceModalClose.addEventListener('click', closeServiceModal);
serviceModal.addEventListener('click', (event) => {
  if (event.target === serviceModal) closeServiceModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && serviceModal.classList.contains('is-open')) {
    closeServiceModal();
  }
});

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