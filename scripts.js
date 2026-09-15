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
    title: 'Plato Principal',
    description: 'Opciones de plato principal pensadas para cada ocasión y adaptadas a tu evento.',
    items: [
      { name: 'Ñoquis', description: 'Ñoquis suaves acompañados de salsa y queso rallado, una opción casera y reconfortante.', image: 'imagenes/interfaces/ñoquis.png' },
      { name: 'Pizza de jamón crudo y rúcula', description: 'Pizza con mozzarella, jamón crudo y rúcula fresca.', image: 'imagenes/interfaces/pizza jamon crudo y rucula.png' },
      { name: 'Pizza de morrones', description: 'Pizza horneada con mozzarella y morrones asados.', image: 'imagenes/interfaces/pizza morrones.jpg' },
    ],
  },
  salados: {
    title: 'Salados & Finger Food',
    description: 'Pinchos, bocados calientes y opciones saladas para compartir en recepciones, reuniones y celebraciones.',
    items: [
      { name: 'Bocados crujientes', description: 'Chicken tenders individuales acompañados de salsas dip.', image: 'imagenes/interfaces/Bocados crujientes.png' },
      { name: 'Brusqueta Caprese', description: 'Mozzarella, tomate y albahaca fresca.', image: 'imagenes/interfaces/Bruzqueta capprese.png', cropImage: true },
      { name: 'Brusqueta de berenjena', description: 'Berenjenas escabechadas o pasta de vegetales.', image: 'imagenes/interfaces/Bruzqueta de berenjena.png' },
      { name: 'Brusqueta de jamón', description: 'Jamón crudo o serrano, rúcula y pan tostado.', image: 'imagenes/interfaces/Bruzqueta de jamon crudo.png' },
      { name: 'Brusqueta de tomate', description: 'Concassé de tomates frescos, ajo y albahaca.', image: 'imagenes/interfaces/Bruzqueta de tomate.png', cropImage: true },
      { name: 'Canastitas de jamón y queso', description: 'Pequeñas canastitas horneadas con relleno cremoso de jamón y queso.', image: 'imagenes/interfaces/canastitas de jamon y queso.png' },
      { name: 'Chipa', description: 'Bocados horneados de almidón de mandioca y queso, dorados por fuera y tiernos por dentro.', image: 'imagenes/interfaces/chipa.png' },
      { name: 'Pinchos Caprese', description: 'Brochetas de tomate cherry, mozzarella y albahaca, terminadas con un toque de oliva.', image: 'imagenes/interfaces/pincho capresse.jpg' },
      { name: 'Roles de berenjena', description: 'Berenjena grillada enrollada con relleno cremoso, acompañada de rúcula y tomates secos.', image: 'imagenes/interfaces/roles de berenjena.jpg' },
      { name: 'Sanguchitos de jamón y queso', description: 'Pan tierno relleno con jamón cocido y queso, en tamaño ideal para servir como finger food.', image: 'imagenes/interfaces/sanguchito de jamon y queso.png' },
      { name: 'Sanguchitos de miga Caprese', description: 'Sándwiches de miga rellenos con tomate, mozzarella y albahaca fresca.', image: 'imagenes/interfaces/sanguchito de miga capresse.png' },
      { name: 'Sanguchitos de miga de jamón y queso', description: 'Clásicos sándwiches de miga con jamón cocido y queso, preparados en tamaño individual.', image: 'imagenes/interfaces/sanguchito de miga jamon y queso.png' },
      { name: 'Sanguchitos de pastrón y pepinillo', description: 'Pastrón, pepinillos y hojas verdes en pan suave, con un contraste fresco y sabroso.', image: 'imagenes/interfaces/sanguchito de pastrone y pepinillo.png' },
      { name: 'Sanguchitos de rúcula y jamón crudo', description: 'Pan suave con jamón crudo, rúcula fresca y un toque cremoso.', image: 'imagenes/interfaces/sanguchito rucula y jamon crudo.png' },
    ],
  },
  dulce: {
    title: 'Mesa Dulce & Pastelería',
    description: 'Brownies, tartas y bocados individuales decorados con merengue, chocolate y sabores caseros para cerrar cada encuentro.',
    items: [
      { name: 'Alfajores de maicena', description: 'Alfajorcitos de maicena rellenos de dulce de leche y coco rallado.', image: 'imagenes/interfaces/Alfajorcitos.jpg' },
      { name: 'Brownies', description: 'Brownies de chocolate con nuez, dulce de leche y merengue flameado.', image: 'imagenes/interfaces/brownie.jpg' },
      { name: 'Cheesecake', description: 'Cheesecake individual con cubierta de frutos rojos y crema chantilly.', image: 'imagenes/interfaces/cheesecake.png' },
      { name: 'Chocotorta', description: 'Squares de chocotorta elaborados con galletas de chocolate y dulce de leche.', image: 'imagenes/interfaces/chocotorta.jpg' },
      { name: 'Flan casero', description: 'Flan suave de huevo con caramelo, acompañado de dulce de leche.', image: 'imagenes/interfaces/flan.png' },
      { name: 'Lemon Pie', description: 'Tarta individual de crema de limón, base crocante y merengue flameado.', image: 'imagenes/interfaces/lemon pie.jpg' },
      { name: 'Medialunas', description: 'Medialunas de manteca.', image: 'imagenes/interfaces/medialunas.jpg' },
      { name: 'Muffins de chocolate', description: 'Muffins húmedos de chocolate con cobertura cremosa y granas.', image: 'imagenes/interfaces/muffins.png' },
      { name: 'Pinchos de fruta', description: 'Brochetas de frutilla, ananá y kiwi.' },
      { name: 'Pies de manzana', description: 'Bocados de masa crocante rellenos con manzana y un toque de canela.', image: 'imagenes/interfaces/pies de manzana.jpg' },
    ],
  },
  viandas: {
    title: 'Viandas',
    description: 'Boxes individuales con sándwiches, piezas de panadería, dulces y bebidas, listos para entregar y disfrutar.',
    items: [
      { name: 'Alfajorcitos', description: 'Alfajores de maicena envasados individualmente.' },
      { name: 'Bebida y branding', description: 'Bebida individual y tarjeta de bienvenida personalizada.' },
      { name: 'Sándwich de semillas', description: 'Pan de semillas, bagel o ciabatta pequeño con relleno a elección.' },
      { name: 'Sándwiches salados', description: 'Sándwiches de miga o croissants rellenos de jamón y queso.' },
    ],
  },
};

const serviceCards = document.querySelectorAll('.service-card');
const serviceModal = document.getElementById('serviceModal');
const serviceModalTitle = document.getElementById('serviceModalTitle');
const serviceModalDescription = document.getElementById('serviceModalDescription');
const serviceModalItems = document.getElementById('serviceModalItems');
const serviceModalCta = document.getElementById('serviceModalCta');
const serviceModalClose = document.getElementById('serviceModalClose');
const serviceModalPrev = document.getElementById('serviceModalPrev');
const serviceModalNext = document.getElementById('serviceModalNext');
const contactSection = document.getElementById('contacto');
const contactLinks = document.querySelectorAll('a[href="#contacto"]');
const whatsappButton = document.querySelector('.btn-whatsapp');
const serviceOrder = ['menu', 'salados', 'dulce', 'viandas'];
let currentServiceIndex = 0;
let contactHighlightTimeout;
let whatsappBounceTimeout;

const highlightContactSection = (event) => {
  clearTimeout(whatsappBounceTimeout);
  whatsappButton.classList.remove('whatsapp-attention');
  void whatsappButton.offsetWidth;
  whatsappButton.classList.add('whatsapp-attention');
  whatsappBounceTimeout = setTimeout(() => {
    whatsappButton.classList.remove('whatsapp-attention');
  }, 4000);

  clearTimeout(contactHighlightTimeout);
  contactSection.classList.remove('contact-highlight');
  void contactSection.offsetWidth;
  contactSection.classList.add('contact-highlight');
  contactHighlightTimeout = setTimeout(() => {
    contactSection.classList.remove('contact-highlight');
    }, 4000);
};

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
    const media = document.createElement('div');
    media.className = 'service-modal-item-media';
    media.setAttribute('aria-label', item.image ? `Imagen de ${item.name}` : `Espacio para imagen de ${item.name}`);

    if (item.image) {
      media.classList.add('has-image');
      if (item.cropImage) media.classList.add('crop-image');
      const image = document.createElement('img');
      image.src = item.image;
      image.alt = item.name;
      media.appendChild(image);
    } else {
      media.innerHTML = '<span>Imagen</span>';
    }

    const copy = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = item.name;
    const description = document.createElement('p');
    description.textContent = item.description;
    copy.append(title, description);
    row.append(media, copy);
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
serviceModalCta.addEventListener('click', closeServiceModal);
serviceModalPrev.addEventListener('click', () => showAdjacentService(-1));
serviceModalNext.addEventListener('click', () => showAdjacentService(1));
contactLinks.forEach((link) => link.addEventListener('click', highlightContactSection));
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