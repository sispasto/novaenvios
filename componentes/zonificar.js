class ZonificarComponent extends HTMLElement {
  async connectedCallback() {
    const containerSelector = this.getAttribute("container");
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.error("Contenedor de zonificación no encontrado");
      return;
    }

    try {
      // 1. Cargamos el archivo HTML que guardaste como zonificar.html
      const res = await fetch("view/zonificar.html");
      const html = await res.text();

      const template = document.createElement("template");
      template.innerHTML = html;

      // 2. Extraemos y aislamos las etiquetas de script del HTML
      const scripts = template.content.querySelectorAll("script");
      scripts.forEach((s) => s.remove());

      // 3. Limpiamos el Web Component e inyectamos la estructura HTML limpia
      this.innerHTML = "";
      this.appendChild(template.content.cloneNode(true));

      // 4. Limpiamos los scripts dinámicos previos en el contenedor principal
      container
        .querySelectorAll("script[data-dynamic]")
        .forEach((s) => s.remove());

      // 5. Reinyectamos los scripts para que el navegador los ejecute y el objeto 'zonificar' exista globalmente
      scripts.forEach((old) => {
        const s = document.createElement("script");
        s.textContent = old.textContent;
        s.setAttribute("data-dynamic", "true");
        container.appendChild(s);
      });

      // 6. Pequeño delay de ciclo de vida para dar foco automático inicial al lector
      setTimeout(() => {
        const inputGuia = document.getElementById("inputGuia");
        if (inputGuia) {
          inputGuia.focus();
          console.log(
            "Módulo zonificar cargado e inicializado de manera exitosa.",
          );
        }
      }, 50);
    } catch (e) {
      console.error("Error crítico cargando el módulo de zonificación:", e);
    }
  }
}

// Registro del Custom Element para usarlo en el enrutador o layout principal
customElements.define("zonificar-guias", ZonificarComponent);
