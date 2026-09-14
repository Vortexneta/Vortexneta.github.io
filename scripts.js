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
    items: [
      { name: 'Brusqueta de jamón', description: 'Jamón crudo o serrano, rúcula y pan tostado.' },
      { name: 'Brusqueta Caprese', description: 'Mozzarella, tomate y albahaca fresca.' },
      { name: 'Tostón de tomate', description: 'Concassé de tomates frescos, ajo y albahaca.' },
      { name: 'Tostón de berenjena', description: 'Berenjenas escabechadas o pasta de vegetales.' },
    ],
  },
  salados: {
    title: 'Salados & Finger Food',
    description: 'Mini sándwiches, pinchos, empanadas y bocados calientes para compartir en recepciones, reuniones y celebraciones.',
    items: [
      { name: 'Mini sándwiches', description: 'Sándwiches de miga y mini burgers en panes brioche, ciabatta y sésamo.' },
      { name: 'Bocados crujientes', description: 'Chicken tenders individuales acompañados de salsas dip.' },
      { name: 'Pinchos', description: 'Brochetas Caprese, albóndigas y croquetas en escarbadientes.' },
      { name: 'Empanadas y canastitas', description: 'Mini empanadas de carne o pollo y canastitas saladas de vegetales.' },
    ],
  },
  dulce: {
    title: 'Mesa Dulce & Pastelería',
    description: 'Brownies, tartas y bocados individuales decorados con merengue, chocolate y sabores caseros para cerrar cada encuentro.',
    items: [
      { name: 'Brownies y squares', description: 'Chocolate, nuez, dulce de leche y merengue flameado.' },
      { name: 'Lingotes y mini Lemon Pie', description: 'Marquise, mousse de chocolate y tartas individuales con merengue.' },
      { name: 'Muffins y alfajores', description: 'Muffins, cupcakes, alfajores de maicena y de masa sableé.' },
      { name: 'Panadería dulce', description: 'Croissants, medialunas, churros, budines, mini scons y shots de postre.' },
      { name: 'Pinchos de fruta', description: 'Brochetas de frutilla, ananá y kiwi.' },
    ],
  },
  viandas: {
    title: 'Viandas',
    description: 'Boxes individuales con sándwiches, piezas de panadería, dulces y bebidas, listos para entregar y disfrutar.',
    items: [
      { name: 'Sándwiches salados', description: 'Sándwiches de miga o croissants rellenos de jamón y queso.' },
      { name: 'Sándwich de semillas', description: 'Pan de semillas, bagel o ciabatta pequeño con relleno a elección.' },
      { name: 'Alfajorcitos', description: 'Alfajores de maicena envasados individualmente.' },
      { name: 'Bebida y branding', description: 'Bebida individual y tarjeta de bienvenida personalizada.' },
    ],
  },
};

const serviceCards = document.querySelectorAll('.service-card');
const serviceModal = document.getElementById('serviceModal');
const serviceModalTitle = document.getElementById('serviceModalTitle');
const serviceModalDescription = document.getElementById('serviceModalDescription');
const serviceModalItems = document.getElementById('serviceModalItems');
const serviceModalClose = document.getElementById('serviceModalClose');
const serviceModalPrev = document.getElementById('serviceModalPrev');
const serviceModalNext = document.getElementById('serviceModalNext');
const serviceOrder = ['menu', 'salados', 'dulce', 'viandas'];
let currentServiceIndex = 0;

const closeServiceModal = () => {
  serviceModal.classList.remove('is-open');
  serviceModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

const renderService = (serviceKey) => {
  const service = serviceDetails[serviceKey];
  if (!service) return;

  serviceModalTitle.textContent = service.title;
  serviceModalDescription.textContent = service.description;
  serviceModalItems.replaceChildren(...service.items.map((item) => {
    const row = document.createElement('article');
    row.className = 'service-modal-item';
    row.innerHTML = `<div class="service-modal-item-media" aria-label="Espacio para imagen de ${item.name}"><span>Imagen</span></div><div><h3>${item.name}</h3><p>${item.description}</p></div>`;
    return row;
  }));
  serviceModalPrev.hidden = currentServiceIndex === 0;
  serviceModalNext.hidden = currentServiceIndex === serviceOrder.length - 1;
};

const openServiceModal = (serviceKey) => {
  currentServiceIndex = serviceOrder.indexOf(serviceKey);
  renderService(serviceKey);
  serviceModal.classList.add('is-open');
  serviceModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  serviceModalClose.focus();
};

const showAdjacentService = (direction) => {
  const nextIndex = currentServiceIndex + direction;
  if (nextIndex < 0 || nextIndex >= serviceOrder.length) return;

  currentServiceIndex = nextIndex;
  renderService(serviceOrder[currentServiceIndex]);
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
serviceModalPrev.addEventListener('click', () => showAdjacentService(-1));
serviceModalNext.addEventListener('click', () => showAdjacentService(1));
serviceModal.addEventListener('click', (event) => {
  if (event.target === serviceModal) closeServiceModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && serviceModal.classList.contains('is-open')) {
    closeServiceModal();
  }
  if (event.key === 'ArrowLeft' && serviceModal.classList.contains('is-open')) {
    showAdjacentService(-1);
  }
  if (event.key === 'ArrowRight' && serviceModal.classList.contains('is-open')) {
    showAdjacentService(1);
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