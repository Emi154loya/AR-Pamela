document.addEventListener("DOMContentLoaded", () => {
  const btnComenzar = document.getElementById("btn-comenzar");
  const pantallaInicio = document.getElementById("pantalla-inicio");
  const carrusel = document.getElementById("carrusel");
  const cancion = document.getElementById("cancion");
  const pinguinoGuia = document.getElementById("pinguino-guia");
  const videoFondo = document.getElementById("camara-fondo");

  btnComenzar.addEventListener("click", async () => {
    // 1. Encender la cámara del celular con proporciones nativas
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Obliga a usar la cámara trasera
      });
      videoFondo.srcObject = stream;
    } catch (err) {
      console.error("Error al acceder a la cámara: ", err);
      alert("Por favor, permite el acceso a la cámara para continuar.");
      return;
    }

    // 2. Iniciar la magia
    pantallaInicio.style.display = "none";
    cancion.play();
    carrusel.setAttribute("visible", "true");

    // 3. Animación de Lic. Hielos a los 5 segundos
    setTimeout(() => {
      pinguinoGuia.setAttribute("src", "#ping-apunta");
    }, 5000);

    // 4. Pregunta final a los 40 segundos
    setTimeout(() => {
      carrusel.setAttribute("visible", "false");

      const camara = document.querySelector("a-camera");
      const cartelFinal = document.createElement("a-image");
      cartelFinal.setAttribute("src", "#ping-novia");
      cartelFinal.setAttribute("position", "0 0 -3");
      cartelFinal.setAttribute("width", "1");
      cartelFinal.setAttribute("height", "1.25");

      camara.appendChild(cartelFinal);
    }, 40000);
  });
});
