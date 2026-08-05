document.addEventListener("DOMContentLoaded", () => {

/* =========================
   CONFIG CENTRAL
========================= */

const CONFIG = {
  coupleNames: "Noe & Gera",

  date: "2026-09-19T17:00:00",

  churchName: "Nuestra Señora del Valle",
  hallName: "Salón Villa Verde",

  churchMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7121.521590237448!2d-65.29601292528116!3d-26.815744189157844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942242d62123af13%3A0xaa2edb3420b1b358!2sParroquia%20Nuestra%20Se%C3%B1ora%20del%20Valle!5e0!3m2!1ses-419!2sar!4v1785937110380!5m2!1ses-419!2sar",
  hallMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.9483936280963!2d-65.32990892528147!3d-26.809771788909234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942242f73564c141%3A0xb643b77bf29ab6fe!2sVilla%20Verde%20Fiestas%20%26%20Eventos!5e0!3m2!1ses-419!2sar!4v1785936793581!5m2!1ses-419!2sar",

  churchDirections: "https://maps.google.com/?q=Parroquia+Nuestra+Señora+del+Valle+Tucumán",
  hallDirections: "https://maps.google.com/?q=Villa+Verde+Fiestas+%26+Eventos+Tucumán",

  spotify: "https://open.spotify.com/embed/playlist/37i9dQZEVXbNG2KDcFcKOF",

  // Música de fondo (autoplay controlado por el usuario).
  // Colocá el archivo en assets/audio/ y actualizá la ruta.
  backgroundMusic: "assets/audio/musica-fondo.mp3",

  whatsapp: "https://wa.me/5493813047790",

  // === Integración con Google Forms (RSVP) ===
  // 1) actionUrl: tomá el link de tu formulario y cambiá "/viewform" por "/formResponse"
  // 2) entries: los 4 números "entry.XXXXXXXXX" de tus campos
  googleForm: {
    actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdoigTS8X5CWeoriEvX68LGH8rSYTThCtP502A2pg_tFnAqfQ/formResponse",
    entries: {
      name: "entry.1498135098",       // Nombre completo
      guests: "entry.1424661284",     // Cantidad de invitados
      attendance: "entry.877086558",    // Sí/No asistiré
      message: "entry.2606285"      // Mensaje
    }
  },

  photos: [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg",
    "images/7.jpg",
    "images/8.jpg"
  ]
};

/* =========================
   HELPERS
========================= */

const $ = (id) => document.getElementById(id);

/* =========================
   HEADER
========================= */

if ($("coupleNames")) {
  $("coupleNames").textContent = CONFIG.coupleNames;
}

if ($("churchName")) $("churchName").textContent = CONFIG.churchName;
if ($("hallName")) $("hallName").textContent = CONFIG.hallName;

/* =========================
   MAPS
========================= */

if ($("churchMap")) $("churchMap").src = CONFIG.churchMaps;
if ($("hallMap")) $("hallMap").src = CONFIG.hallMaps;

if ($("churchBtn")) $("churchBtn").href = CONFIG.churchDirections;
if ($("hallBtn")) $("hallBtn").href = CONFIG.hallDirections;

/* =========================
   WHATSAPP
========================= */

if ($("whatsappBtn")) $("whatsappBtn").href = CONFIG.whatsapp;

/* =========================
   COUNTDOWN
========================= */

function updateCountdown() {
  const now = new Date();
  const target = new Date(CONFIG.date);
  const diff = target - now;

  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  if ($("days")) $("days").textContent = days;
  if ($("hours")) $("hours").textContent = hours;
  if ($("minutes")) $("minutes").textContent = minutes;
  if ($("seconds")) $("seconds").textContent = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* =========================
   GALLERY DINÁMICA
========================= */

const gallery = $("gallery");

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;

  if ($("lightbox") && $("lightboxImg")) {
    $("lightboxImg").src = CONFIG.photos[currentIndex];
    $("lightbox").style.display = "flex";
  }
}

if (gallery) {
  CONFIG.photos.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "foto boda";

    img.addEventListener("click", () => openLightbox(i));

    gallery.appendChild(img);
  });
}

/* =========================
   LIGHTBOX
========================= */

if ($("lightbox")) {
  $("lightbox").addEventListener("click", () => {
    $("lightbox").style.display = "none";
  });
}

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =========================
   TOP BUTTON
========================= */

if ($("topBtn")) {
  $("topBtn").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* =========================
   MÚSICA DE FONDO
========================= */

const musicBtn = $("musicBtn");
const musicBtnText = $("musicBtnText");
const bgMusic = $("bgMusic");

if (musicBtn && bgMusic && CONFIG.backgroundMusic) {

  bgMusic.src = CONFIG.backgroundMusic;
  bgMusic.volume = 0.5;

  let isPlaying = false;

  musicBtn.addEventListener("click", () => {

    if (!isPlaying) {
      bgMusic.play()
        .then(() => {
          isPlaying = true;
          musicBtn.classList.add("playing");
          musicBtn.setAttribute("aria-pressed", "true");
          if (musicBtnText) musicBtnText.textContent = "Pausar música";
        })
        .catch(() => {
          // El navegador bloqueó la reproducción; se requiere otro toque.
          isPlaying = false;
        });
    } else {
      bgMusic.pause();
      isPlaying = false;
      musicBtn.classList.remove("playing");
      musicBtn.setAttribute("aria-pressed", "false");
      if (musicBtnText) musicBtnText.textContent = "Activar música";
    }
  });
}

/* =========================
   RSVP → GOOGLE FORMS
========================= */

const rsvpForm = $("rsvpForm");

if (rsvpForm && CONFIG.googleForm) {

  rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const status = $("rsvpStatus");
    const submitBtn = $("rsvpSubmitBtn");

    const name = $("rsvpName") ? $("rsvpName").value.trim() : "";
    const guestsRaw = $("rsvpGuests") ? $("rsvpGuests").value.trim() : "";
    const guests = parseInt(guestsRaw, 10);
    const attendance = $("rsvpAttendance") ? $("rsvpAttendance").value : "";
    const message = $("rsvpMessage") ? $("rsvpMessage").value.trim() : "";

    if (!name) {
      if (status) {
        status.textContent = "Por favor, ingresá tu nombre completo.";
        status.className = "rsvp-status error";
      }
      return;
    }

    if (!guestsRaw || isNaN(guests) || guests < 1) {
      if (status) {
        status.textContent = "Indicá la cantidad de invitados (mínimo 1).";
        status.className = "rsvp-status error";
      }
      return;
    }

    const data = new FormData();
    data.append(CONFIG.googleForm.entries.name, name);
    data.append(CONFIG.googleForm.entries.guests, guests);
    data.append(CONFIG.googleForm.entries.attendance, attendance);
    data.append(CONFIG.googleForm.entries.message, message);

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";
    }

    if (status) {
      status.textContent = "";
      status.className = "rsvp-status";
    }

    fetch(CONFIG.googleForm.actionUrl, {
      method: "POST",
      mode: "no-cors",
      body: data
    })
      .then(() => {
        // Google Forms responde de forma "opaca" (no-cors),
        // así que si no hubo error de red, asumimos éxito.
        if (status) {
          status.textContent = "¡Gracias! Tu confirmación fue enviada ✓";
          status.className = "rsvp-status success";
        }
        rsvpForm.reset();
      })
      .catch(() => {
        if (status) {
          status.textContent = "Hubo un error de conexión. Intentá de nuevo.";
          status.className = "rsvp-status error";
        }
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Enviar";
        }
      });
  });
}

/* =========================
   COPY ALIAS
========================= */

if ($("copyAlias") && $("aliasText")) {
  $("copyAlias").addEventListener("click", () => {
    navigator.clipboard.writeText($("aliasText").textContent);

    $("copyAlias").textContent = "Copiado ✓";

    setTimeout(() => {
      $("copyAlias").textContent = "Copiar alias";
    }, 2000);
  });
}

});
