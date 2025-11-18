document.addEventListener("DOMContentLoaded", () => {
  const todosLosBloques = Array.from(document.querySelectorAll(".bloque"));
  const mensaje = document.getElementById("mensaje");

  let aciertos = 0;
  let errores = 0;
  let indice = 0;

  // Barajar todos los bloques (Fisher-Yates)
  for (let i = todosLosBloques.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [todosLosBloques[i], todosLosBloques[j]] = [todosLosBloques[j], todosLosBloques[i]];
  }

  // Seleccionar solo 5 aleatorios
  const bloques = todosLosBloques.slice(0, 5);

  // Ocultar todos los bloques
  todosLosBloques.forEach(b => b.style.display = "none");

  // Función para barajar botones dentro de un bloque
  function barajarBotones(bloque) {
    const botones = Array.from(bloque.querySelectorAll("button"));
    for (let i = botones.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [botones[i], botones[j]] = [botones[j], botones[i]];
    }
    botones.forEach(boton => bloque.appendChild(boton));
  }

  // Mostrar bloque actual
  function mostrarBloque(i) {
    bloques.forEach(b => b.style.display = "none");
    bloques[i].style.display = "block";
    barajarBotones(bloques[i]);
    mensaje.textContent = "";
  }

  // Mostrar el primero
  mostrarBloque(indice);

  // Listener global para respuestas
  document.body.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON" && !e.target.id) { // ignorar botón reinicio
      if (e.target.classList.contains("true")) {
        aciertos++;
        mensaje.textContent = "¡Correcto!";
        mensaje.className = "correcto";
        setTimeout(() => {
          indice++;
          if (indice < bloques.length) {
            mostrarBloque(indice);
          } else {
            mensaje.textContent = `¡Has terminado el juego! ✅ Aciertos: ${aciertos} ❌ Errores: ${errores}`;
            mensaje.className = "final";
          }
        }, 1000);
      } else {
        errores++;
        mensaje.textContent = "Incorrecto, intenta de nuevo.";
        mensaje.className = "incorrecto";
      }
    }
  });

  // Botón de reinicio
  const reiniciarBtn = document.getElementById("reiniciar");
  if (reiniciarBtn) {
    reiniciarBtn.addEventListener("click", () => {
      location.reload();
    });
  }
});
