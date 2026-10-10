document.addEventListener("DOMContentLoaded", () => {
  const btnComenzar = document.getElementById("letterBtn");
  const envelope = document.getElementById("envelope");
  const waxSealBtn = document.getElementById("waxSealBtn");
  const flapTop = document.getElementById("flapTop");
  const pantallaInicio = document.getElementById("pantalla-inicio");
  const carrusel = document.getElementById("carrusel");
  const cancion = document.getElementById("cancion");
  const pinguinoGuia = document.getElementById("pinguino-guia");
  const videoFondo = document.getElementById("camara-fondo");
  const assets = document.querySelector("a-assets");

  // Control de apertura y cierre del sobre
  function abrirSobre() {
    if (envelope) envelope.classList.add("open");
  }

  function cerrarSobre() {
    if (envelope) envelope.classList.remove("open");
  }

  if (waxSealBtn) {
    waxSealBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      abrirSobre();
    });
  }

  if (flapTop) {
    flapTop.addEventListener("click", (e) => {
      e.stopPropagation();
      if (envelope && envelope.classList.contains("open")) {
        cerrarSobre();
      } else {
        abrirSobre();
      }
    });
  }

  // Cronología de letras sincronizadas con la música
  const lineasLetra = [
    { id: "ent-letra1", inicio: 8, fin: 11 },
    { id: "ent-letra2", inicio: 12, fin: 15 },
    { id: "ent-letra3", inicio: 15, fin: 19 },
    { id: "ent-letra4", inicio: 20, fin: 23 },
    { id: "ent-letra5", inicio: 24, fin: 27 },
    { id: "ent-letra6", inicio: 28, fin: 31 },
    { id: "ent-letra7", inicio: 32, fin: 35 },
    { id: "ent-letra8", inicio: 36, fin: 39 },
    { id: "ent-letra9", inicio: 40, fin: 45 },
  ];

  let granFinalMostrado = false;
  let arIniciado = false;

  // Función principal para iniciar la experiencia AR
  const iniciarExperienciaAR = () => {
    if (arIniciado) return;
    arIniciado = true;

    // 1. Activar la cámara en segundo plano si está disponible
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      }).then((stream) => {
        if (videoFondo) videoFondo.srcObject = stream;
      }).catch((err) => {
        console.warn("Cámara no disponible o permisos denegados:", err);
      });
    }

    // 2. Transición suave de la pantalla de inicio
    if (pantallaInicio) {
      pantallaInicio.style.transition = "opacity 0.8s ease-in-out";
      pantallaInicio.style.opacity = "0";
    }

    // 3. Activar escena 3D, música y animación
    setTimeout(() => {
      if (pantallaInicio) pantallaInicio.style.display = "none";
      if (carrusel) carrusel.setAttribute("visible", "true");
      if (cancion) {
        cancion.play().catch((err) => console.log("Audio play error:", err));
      }
      if (pinguinoGuia) {
        pinguinoGuia.setAttribute(
          "animation-mixer",
          "clip: *; loop: once; clampWhenFinished: true;",
        );
      }
    }, 800);
  };

  // El botón dentro de la carta inicia el AR
  if (btnComenzar) {
    btnComenzar.addEventListener("click", (e) => {
      e.stopPropagation();
      iniciarExperienciaAR();
    });
  }

  // Supervisión del tiempo de la canción para mostrar letras
  if (cancion) {
    cancion.addEventListener("timeupdate", () => {
      const tiempoActual = cancion.currentTime;

      lineasLetra.forEach((linea) => {
        const elemento = document.getElementById(linea.id);
        if (elemento) {
          if (tiempoActual >= linea.inicio && tiempoActual <= linea.fin) {
            elemento.setAttribute("visible", "true");
          } else {
            elemento.setAttribute("visible", "false");
          }
        }
      });

      if (tiempoActual >= 46 && !granFinalMostrado) {
        granFinalMostrado = true;
      }
    });
  }
});
