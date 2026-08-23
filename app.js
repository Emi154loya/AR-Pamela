document.addEventListener("DOMContentLoaded", () => {
  const btnComenzar = document.getElementById("btn-comenzar");
  const pantallaInicio = document.getElementById("pantalla-inicio");
  const carrusel = document.getElementById("carrusel");
  const cancion = document.getElementById("cancion");
  const pinguinoGuia = document.getElementById("pinguino-guia");

  btnComenzar.addEventListener("click", () => {
    // 1. Quitamos la pantalla de inicio para ver la cámara
    pantallaInicio.style.display = "none";

    // 2. Iniciamos la música inmediatamente
    cancion.play();

    // 3. Mostramos las fotos y a Lic. Hielos en su espacio
    carrusel.setAttribute("visible", "true");

    // 4. A los 5 segundos, el pingüino la invita a voltear
    setTimeout(() => {
      pinguinoGuia.setAttribute("src", "#ping-apunta");
    }, 5000);

    // 5. El gran final a los 40 segundos
    setTimeout(() => {
      // Ocultamos todo lo demás
      carrusel.setAttribute("visible", "false");

      // Creamos el cartel final y lo pegamos directo a la visión de la cámara
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
