document.addEventListener("DOMContentLoaded", () => {
  const btnComenzar = document.getElementById("btn-comenzar");
  const textoCarga = document.getElementById("texto-carga");
  const pantallaInicio = document.getElementById("pantalla-inicio");
  const carrusel = document.getElementById("carrusel");
  const cancion = document.getElementById("cancion");
  const pinguinoGuia = document.getElementById("pinguino-guia");
  const videoFondo = document.getElementById("camara-fondo");
  const assets = document.querySelector("a-assets");

  // Liberar el botón solo cuando todos los archivos estén descargados
  assets.addEventListener("loaded", () => {
    textoCarga.style.display = "none";
    btnComenzar.style.display = "block";
  });

  // Cronología estricta de las letras de la canción
  const lineasLetra = [
    { id: "ent-letra1", inicio: 8, fin: 11 },
    { id: "ent-letra2", inicio: 12, fin: 14 },
    { id: "ent-letra3", inicio: 15, fin: 19 },
    { id: "ent-letra4", inicio: 20, fin: 23 },
    { id: "ent-letra5", inicio: 24, fin: 27 },
    { id: "ent-letra6", inicio: 28, fin: 31 },
    { id: "ent-letra7", inicio: 32, fin: 35 },
    { id: "ent-letra8", inicio: 36, fin: 39 },
    { id: "ent-letra9", inicio: 40, fin: 45 },
  ];

  let granFinalMostrado = false;

  btnComenzar.addEventListener("click", async () => {
    // 1. Iniciar la cámara pura en el fondo
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoFondo.srcObject = stream;
    } catch (err) {
      alert("Por favor, acepta los permisos de la cámara para la sorpresa.");
      return;
    }

    // 2. Ocultar menú e iniciar el carrusel y música
    pantallaInicio.style.display = "none";
    carrusel.setAttribute("visible", "true");
    cancion.play();

    // 3. Reloj central: Supervisa cada milisegundo de la canción
    cancion.addEventListener("timeupdate", () => {
      const tiempoActual = cancion.currentTime;

      // Cambio de gesto del Pingüino
      if (tiempoActual >= 5 && tiempoActual < 6) {
        pinguinoGuia.setAttribute("src", "#ping-apunta");
      }

      // Controlador matemático de letras (Giroscopio dirigido)
      lineasLetra.forEach((linea) => {
        const elemento = document.getElementById(linea.id);
        if (tiempoActual >= linea.inicio && tiempoActual <= linea.fin) {
          elemento.setAttribute("visible", "true");
        } else {
          elemento.setAttribute("visible", "false");
        }
      });

      // 4. El Gran Final Inolvidable (Después del segundo 45)
      if (tiempoActual >= 46 && !granFinalMostrado) {
        granFinalMostrado = true;

        // Esconder todo el domo
        carrusel.setAttribute("visible", "false");

        // Anclar la pregunta directo a la vista de la cámara
        const camara = document.querySelector("a-camera");
        const cartelFinal = document.createElement("a-image");
        cartelFinal.setAttribute("src", "#ping-novia");

        // Ajustado para máxima legibilidad justo enfrente
        cartelFinal.setAttribute("position", "0 0 -3");
        cartelFinal.setAttribute("width", "2");
        cartelFinal.setAttribute("height", "2.5");

        camara.appendChild(cartelFinal);
      }
    });
  });
});
