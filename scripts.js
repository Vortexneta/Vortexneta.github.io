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
const initialVisibleCount = 8; // Cantidad de fotos que quedan visibles al retraer
const allGalleryLinks = Array.from(document.querySelectorAll('.gallery-grid a'));

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