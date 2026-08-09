document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     HELPERS
  ========================================================= */

  const $ = (id) => document.getElementById(id);


  /* =========================================================
     CONFIG CENTRAL
  ========================================================= */

  const CONFIG = {

    coupleNames: "Noe & Gera",

    date: "2026-09-19T17:00:00",

    churchName: "Parroquia Ntra. Señora del Valle",

    hallName: "Salón Villa Verde",


    /* =========================
       MAPAS
    ========================= */

    churchMaps:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7121.521590237448!2d-65.29601292528116!3d-26.815744189157844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942242d62123af13%3A0xaa2edb3420b1b358!2sParroquia%20Nuestra%20Se%C3%B1ora%20del%20Valle!5e0!3m2!1ses-419!2sar!4v1785937110380!5m2!1ses-419!2sar",

    hallMaps:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.9483936280963!2d-65.32990892528147!3d-26.809771788909234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942242f73564c141%3A0xb643b77bf29ab6fe!2sVilla%20Verde%20Fiestas%20%26%20Eventos!5e0!3m2!1ses-419!2sar!4v1785936793581!5m2!1ses-419!2sar",


    /* =========================
       DIRECCIONES
    ========================= */

    churchDirections:
      "https://maps.google.com/?q=Parroquia+Nuestra+Señora+del+Valle+Tucumán",

    hallDirections:
      "https://maps.google.com/?q=Villa+Verde+Fiestas+%26+Eventos+Tucumán",


    /* =========================
       MÚSICA / WHATSAPP
    ========================= */

    spotify:
      "https://open.spotify.com/embed/playlist/37i9dQZEVXbNG2KDcFcKOF",

    backgroundMusic:
      "assets/audio/musica-fondo.mp3",

    whatsapp:
      "https://wa.me/5493813047790",


    /* =========================
       GOOGLE FORMS
    ========================= */

    googleForm: {

      actionUrl:
        "https://docs.google.com/forms/d/e/1FAIpQLSdoigTS8X5CWeoriEvX68LGH8rSYTThCtP502A2pg_tFnAqfQ/formResponse",

      entries: {

        name:
          "entry.1498135098",

        attendance:
          "entry.877086558",

        message:
          "entry.2606285"
      }
    },


    /* =========================================================
       FOTOS DE LA GALERÍA
    ========================================================= */

    photos: [

      "images/1.png",
      "images/2.jpg",
      "images/3.jpg",
      "images/4.jpg",
      "images/5.jpg",
      "images/6.jpg",
      "images/7.jpg",
      "images/8.jpg",
      "images/9.jpg",
      "images/10.jpg",
      "images/11.jpg",
      "images/12.jpg"

    ]

  };

  /* =================================
TARJETAS DE DETALLES
================================= */

document.querySelectorAll(".detail-button").forEach(button => {

button.addEventListener("click", () => {


const card = button.closest(".detail-card");

card.classList.toggle("active");


});

});

/* =================================
ACORDEÓN - REGALOS
================================= */

document.querySelectorAll(".gift-button").forEach(button => {

button.addEventListener("click", () => {

const card = button.closest(".gift-card");

card.classList.toggle("active");


});

});



  /* =========================================================
     HEADER
  ========================================================= */

  if ($("coupleNames")) {
    $("coupleNames").textContent =
      CONFIG.coupleNames;
  }

  if ($("churchName")) {
    $("churchName").textContent =
      CONFIG.churchName;
  }

  if ($("hallName")) {
    $("hallName").textContent =
      CONFIG.hallName;
  }


  /* =========================================================
     MAPAS
  ========================================================= */

  if ($("churchMap")) {
    $("churchMap").src =
      CONFIG.churchMaps;
  }

  if ($("hallMap")) {
    $("hallMap").src =
      CONFIG.hallMaps;
  }

  if ($("churchBtn")) {
    $("churchBtn").href =
      CONFIG.churchDirections;
  }

  if ($("hallBtn")) {
    $("hallBtn").href =
      CONFIG.hallDirections;
  }


  /* =========================================================
     WHATSAPP
  ========================================================= */

  if ($("whatsappBtn")) {
    $("whatsappBtn").href =
      CONFIG.whatsapp;
  }


  /* =========================================================
     COUNTDOWN
  ========================================================= */

  function updateCountdown() {

    const now =
      new Date();

    const target =
      new Date(CONFIG.date);

    const diff =
      target - now;

    if (diff <= 0) {
      return;
    }

    const days =
      Math.floor(
        diff /
        (1000 * 60 * 60 * 24)
      );

    const hours =
      Math.floor(
        (diff /
          (1000 * 60 * 60)) % 24
      );

    const minutes =
      Math.floor(
        (diff /
          (1000 * 60)) % 60
      );

    const seconds =
      Math.floor(
        (diff / 1000) % 60
      );


    if ($("days")) {
      $("days").textContent =
        days;
    }

    if ($("hours")) {
      $("hours").textContent =
        hours;
    }

    if ($("minutes")) {
      $("minutes").textContent =
        minutes;
    }

    if ($("seconds")) {
      $("seconds").textContent =
        seconds;
    }

  }

  setInterval(
    updateCountdown,
    1000
  );

  updateCountdown();


  /* =========================================================
     GALERÍA / SLIDER
  ========================================================= */

  const galleryPrev =
    $("galleryPrev");

  const galleryNext =
    $("galleryNext");

  const galleryDots =
    $("galleryDots");

  /*
     Buscamos directamente
     .gallery-slide.

     Esto coincide con tu HTML:
     
     <div class="gallery-slide"></div>
  */

  const gallerySlide =
    document.querySelector(
      ".gallery-slide"
    );


  /*
     Índice de la foto actual.
  */

  let currentIndex = 0;


  /* =========================================================
     LIGHTBOX
  ========================================================= */

  function openLightbox(index) {

    const lightbox =
      $("lightbox");

    const lightboxImg =
      $("lightboxImg");

    if (
      !lightbox ||
      !lightboxImg ||
      !CONFIG.photos.length
    ) {
      return;
    }

    if (index < 0) {
      index =
        CONFIG.photos.length - 1;
    }

    if (
      index >=
      CONFIG.photos.length
    ) {
      index = 0;
    }

    lightboxImg.src =
      CONFIG.photos[index];

    lightboxImg.alt =
      `Fotografía ${index + 1} de Noe y Gera`;

    lightbox.style.display =
      "flex";
  }


  /* =========================================================
     MOSTRAR FOTO
  ========================================================= */

  function showGalleryImage(index) {

    /*
       Verificamos que exista
       el slider y las fotos.
    */

    if (
      !gallerySlide ||
      !CONFIG.photos.length
    ) {
      return;
    }


    /*
       Volver al principio.
    */

    if (index < 0) {
      index =
        CONFIG.photos.length - 1;
    }


    /*
       Volver a la primera
       después de la última.
    */

    if (
      index >=
      CONFIG.photos.length
    ) {
      index = 0;
    }


    currentIndex =
      index;


    /*
       Buscamos la imagen.
    */

    let img =
      gallerySlide.querySelector(
        "img"
      );


    /*
       Si todavía no existe,
       la creamos.
    */

    if (!img) {

      img =
        document.createElement(
          "img"
        );

      img.alt =
        "Fotografía de Noe y Gera";


      /*
         Al tocar la foto,
         abrimos el lightbox.
      */

      img.addEventListener(
        "click",
        () => {

          openLightbox(
            currentIndex
          );

        }
      );


      gallerySlide.appendChild(
        img
      );
    }


    /*
       Cambiamos la imagen.
    */

    img.src =
      CONFIG.photos[
        currentIndex
      ];


    img.alt =
      `Fotografía ${
        currentIndex + 1
      } de Noe y Gera`;


    /*
       Actualizamos los puntos.
    */

    updateGalleryDots();

  }


  /* =========================================================
     CREAR PUNTOS
  ========================================================= */

  function createGalleryDots() {

    if (!galleryDots) {
      return;
    }

    galleryDots.innerHTML =
      "";


    CONFIG.photos.forEach(
      (_, index) => {

        const dot =
          document.createElement(
            "button"
          );

        dot.className =
          "gallery-dot";

        dot.type =
          "button";


        dot.setAttribute(
          "aria-label",
          `Ver fotografía ${
            index + 1
          }`
        );


        dot.addEventListener(
          "click",
          () => {

            showGalleryImage(
              index
            );

          }
        );


        galleryDots.appendChild(
          dot
        );

      }
    );


    updateGalleryDots();

  }


  /* =========================================================
     ACTUALIZAR PUNTOS
  ========================================================= */

  function updateGalleryDots() {

    if (!galleryDots) {
      return;
    }


    const dots =
      galleryDots.querySelectorAll(
        ".gallery-dot"
      );


    dots.forEach(
      (dot, index) => {

        dot.classList.toggle(
          "active",
          index === currentIndex
        );

      }
    );

  }


  /* =========================================================
     BOTÓN ANTERIOR
  ========================================================= */

  if (galleryPrev) {

    galleryPrev.addEventListener(
      "click",
      () => {

        showGalleryImage(
          currentIndex - 1
        );

      }
    );

  }


  /* =========================================================
     BOTÓN SIGUIENTE
  ========================================================= */

  if (galleryNext) {

    galleryNext.addEventListener(
      "click",
      () => {

        showGalleryImage(
          currentIndex + 1
        );

      }
    );

  }


  /* =========================================================
     INICIALIZAR GALERÍA
  ========================================================= */

  if (
    gallerySlide &&
    CONFIG.photos.length
  ) {

    /*
       Creamos los indicadores
       solamente si existe
       #galleryDots en el HTML.
    */

    createGalleryDots();


    /*
       Mostramos la primera foto.
    */

    showGalleryImage(0);

  }


  /* =========================================================
     DESLIZAR EN CELULAR
  ========================================================= */

  let touchStartX = 0;

  let touchEndX = 0;


  if (gallerySlide) {

    /*
       Comienza el gesto.
    */

    gallerySlide.addEventListener(
      "touchstart",
      (event) => {

        touchStartX =
          event.changedTouches[0]
            .screenX;

      },
      {
        passive: true
      }
    );


    /*
       Termina el gesto.
    */

    gallerySlide.addEventListener(
      "touchend",
      (event) => {

        touchEndX =
          event.changedTouches[0]
            .screenX;


        const difference =
          touchStartX -
          touchEndX;


        /*
           Menos de 50px:
           no hacemos nada.
        */

        if (
          Math.abs(difference) < 50
        ) {
          return;
        }


        /*
           Deslizar hacia izquierda:
           siguiente foto.
        */

        if (difference > 0) {

          showGalleryImage(
            currentIndex + 1
          );

        }


        /*
           Deslizar hacia derecha:
           foto anterior.
        */

        else {

          showGalleryImage(
            currentIndex - 1
          );

        }

      },
      {
        passive: true
      }
    );

  }


  /* =========================================================
     LIGHTBOX - CERRAR
  ========================================================= */

  if ($("lightbox")) {

    $("lightbox").addEventListener(
      "click",
      () => {

        $("lightbox").style.display =
          "none";

      }
    );

  }


  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );


  function revealOnScroll() {

    revealElements.forEach(
      (el) => {

        const top =
          el.getBoundingClientRect()
            .top;


        if (
          top <
          window.innerHeight - 100
        ) {

          el.classList.add(
            "active"
          );

        }

      }
    );

  }


  window.addEventListener(
    "scroll",
    revealOnScroll
  );

  revealOnScroll();


  /* =========================================================
     BOTÓN TOP
  ========================================================= */

  if ($("topBtn")) {

    $("topBtn").addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  /* =========================================================
     MÚSICA DE FONDO
  ========================================================= */

  const musicBtn =
    $("musicBtn");

  const musicBtnText =
    $("musicBtnText");

  const bgMusic =
    $("bgMusic");


  if (
    musicBtn &&
    bgMusic &&
    CONFIG.backgroundMusic
  ) {

    bgMusic.src =
      CONFIG.backgroundMusic;

    bgMusic.volume =
      0.5;


    let isPlaying =
      false;


    musicBtn.addEventListener(
      "click",
      () => {

        if (!isPlaying) {

          bgMusic
            .play()
            .then(() => {

              isPlaying =
                true;

              musicBtn.classList.add(
                "playing"
              );

              musicBtn.setAttribute(
                "aria-pressed",
                "true"
              );


              if (musicBtnText) {

                musicBtnText.textContent =
                  "Pausar música";

              }

            })
            .catch(() => {

              isPlaying =
                false;

            });

        }

        else {

          bgMusic.pause();

          isPlaying =
            false;

          musicBtn.classList.remove(
            "playing"
          );

          musicBtn.setAttribute(
            "aria-pressed",
            "false"
          );


          if (musicBtnText) {

            musicBtnText.textContent =
              "Activar música";

          }

        }

      }
    );

  }


  /* =========================================================
RSVP → GOOGLE FORMS
========================================================= */

const rsvpForm = $("rsvpForm");

if (rsvpForm && CONFIG.googleForm) {

rsvpForm.addEventListener("submit", (e) => {

e.preventDefault();

const status = $("rsvpStatus");
const submitBtn = $("rsvpSubmitBtn");

const name =
  $("rsvpName")
    ? $("rsvpName").value.trim()
    : "";

const attendance =
  $("rsvpAttendance")
    ? $("rsvpAttendance").value
    : "";

const message =
  $("rsvpMessage")
    ? $("rsvpMessage").value.trim()
    : "";


/* =========================
   VALIDAR NOMBRE
========================= */

if (!name) {

  if (status) {

    status.textContent =
      "Por favor, ingresá tu nombre completo.";

    status.className =
      "rsvp-status error";
  }

  return;
}


/* =========================
   PREPARAR DATOS
========================= */

const data = new FormData();

data.append(
  CONFIG.googleForm.entries.name,
  name
);

data.append(
  CONFIG.googleForm.entries.attendance,
  attendance
);

data.append(
  CONFIG.googleForm.entries.message,
  message
);


/* =========================
   BOTÓN ENVIANDO
========================= */

if (submitBtn) {

  submitBtn.disabled = true;

  submitBtn.textContent =
    "Enviando...";
}


if (status) {

  status.textContent = "";

  status.className =
    "rsvp-status";
}


/* =========================
   ENVIAR A GOOGLE FORMS
========================= */

fetch(
  CONFIG.googleForm.actionUrl,
  {
    method: "POST",
    mode: "no-cors",
    body: data
  }
)

  .then(() => {

    if (status) {

      status.textContent =
        "¡Gracias! Tu confirmación fue enviada ✓";

      status.className =
        "rsvp-status success";
    }

    rsvpForm.reset();

  })

  .catch(() => {

    if (status) {

      status.textContent =
        "Hubo un error de conexión. Intentá de nuevo.";

      status.className =
        "rsvp-status error";
    }

  })

  .finally(() => {

    if (submitBtn) {

      submitBtn.disabled = false;

      submitBtn.textContent =
        "Enviar";
    }

  });

});

}



  /* =========================================================
     COPY ALIAS
  ========================================================= */

  if (
    $("copyAlias") &&
    $("aliasText")
  ) {

    $("copyAlias").addEventListener(
      "click",
      () => {

        navigator.clipboard.writeText(
          $("aliasText").textContent
        );


        $("copyAlias").textContent =
          "Copiado ✓";


        setTimeout(() => {

          $("copyAlias").textContent =
            "Copiar alias";

        }, 2000);

      }
    );

  }


  if (
    $("copyAlias2") &&
    $("aliasText2")
  ) {

    $("copyAlias2").addEventListener(
      "click",
      () => {

        navigator.clipboard.writeText(
          $("aliasText2").textContent
        );


        $("copyAlias2").textContent =
          "Copiado ✓";


        setTimeout(() => {

          $("copyAlias2").textContent =
            "Copiar alias";

        }, 2000);

      }
    );

  }

});