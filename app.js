document.addEventListener("DOMContentLoaded", () => {
  const btnComenzar = document.getElementById("btn-comenzar");
  const pantallaInicio = document.getElementById("pantalla-inicio");
  const objetivoFoto = document.getElementById("objetivo-foto");
  const carrusel = document.getElementById("carrusel");
  const cancion = document.getElementById("cancion");
  const escena = document.querySelector("a-scene");
  const pinguinoGuia = document.getElementById("pinguino-guia");

  let magiaIniciada = false;

  btnComenzar.addEventListener("click", () => {
    pantallaInicio.style.display = "none";
    escena.systems["mindar-image-system"].start();
  });

  objetivoFoto.addEventListener("targetFound", () => {
    if (magiaIniciada) return;
    magiaIniciada = true;

    // Inicia música y muestra carrusel
    cancion.play();
    carrusel.setAttribute("visible", "true");

    // A los 5 segundos, el pingüino cambia de saludar a apuntar
    setTimeout(() => {
      pinguinoGuia.setAttribute("src", "#ping-apunta");
    }, 5000);

    // A los 40 segundos, aparece la pregunta final anclada a la cámara
    setTimeout(() => {
      carrusel.setAttribute("visible", "false");

      const camara = document.querySelector("a-camera");
      const cartelFinal = document.createElement("a-image");
      cartelFinal.setAttribute("src", "#ping-novia");
      cartelFinal.setAttribute("position", "0 0 -2");
      cartelFinal.setAttribute("width", "2");
      cartelFinal.setAttribute("height", "2.5");

      camara.appendChild(cartelFinal);
    }, 40000);
  });
});
