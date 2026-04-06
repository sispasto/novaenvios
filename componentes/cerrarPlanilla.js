class CerrarPlanillaComponent extends HTMLElement {
  async connectedCallback() {
    // 1. Obtener contenedor principal
    const containerSelector = this.getAttribute("container");
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.error("Contenedor no encontrado para CerrarPlanillaComponent");
      return;
    }

    try {
      // 2. Cargar vista HTML
      const res = await fetch("view/cerrarPlanilla.html");

      if (!res.ok) throw new Error("No se pudo cargar cerrarPlanilla.html");

      const html = await res.text();

      const template = document.createElement("template");
      template.innerHTML = html;

      // 3. Extraer scripts
      const scripts = template.content.querySelectorAll("script");
      scripts.forEach((s) => s.remove());

      // 4. Insertar contenido visual
      this.innerHTML = "";
      this.appendChild(template.content.cloneNode(true));

      // 5. Limpiar scripts anteriores
      container
        .querySelectorAll("script[data-dynamic]")
        .forEach((s) => s.remove());

      // 6. Ejecutar scripts de la vista
      scripts.forEach((old) => {
        const s = document.createElement("script");

        s.textContent = old.textContent;

        s.setAttribute("data-dynamic", "true");

        container.appendChild(s);
      });

      //. Inicialización opcional
      /*
      setTimeout(() => {
        if (typeof nsCerrarPlanilla !== "undefined") {
          nsCerrarPlanilla.init();
        }
      }, 100);
      */
    } catch (e) {
      console.error("Error cargando CerrarPlanillaComponent:", e);

      this.innerHTML = `
      <div class="alert alert-danger">
      Error al cargar la vista cerrar planilla: ${e.message}
      </div>
      `;
    }
  }
}

// Registrar el custom element
customElements.define("cerrar-planilla-component", CerrarPlanillaComponent);
