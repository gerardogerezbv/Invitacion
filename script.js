document.addEventListener("DOMContentLoaded", () => {

/* =========================
   CONFIG CENTRAL
========================= */

const CONFIG = {
  coupleNames: "Noe & Gera",

  date: "2026-09-19T17:00:00",

  churchName: "Iglesia San José",
  hallName: "Salón Los Álamos",

  churchMaps: "https://www.google.com/maps?q=iglesia&output=embed",
  hallMaps: "https://www.google.com/maps?q=salon&output=embed",

  churchDirections: "https://maps.google.com",
  hallDirections: "https://maps.google.com",

  spotify: "https://open.spotify.com/embed/playlist/37i9dQZEVXbNG2KDcFcKOF",

  // Música de fondo (autoplay controlado por el usuario).
  // Colocá el archivo en assets/audio/ y actualizá la ruta.
  backgroundMusic: "assets/audio/musica-fondo.mp3",

  whatsapp: "https://wa.me/5493813047790",

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