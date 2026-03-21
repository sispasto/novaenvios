class ConsultarPlanillasComponent extends HTMLElement {
  async connectedCallback() {
    // 1. Obtener el selector del contenedor principal desde el atributo
    const containerSelector = this.getAttribute("container");
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.error(
        "Contenedor no encontrado para ConsultarPlanillasComponent",
      );
      return;
    }

    try {
      // 2. Cargar el archivo HTML de la vista (asegúrate de que el nombre coincida)
      const res = await fetch("view/consultarPlanillas.html");
      if (!res.ok) throw new Error("No se pudo cargar el archivo HTML");

      const html = await res.text();

      const template = document.createElement("template");
      template.innerHTML = html;

      // 3. Separar los scripts para ejecutarlos dinámicamente
      const scripts = template.content.querySelectorAll("script");
      scripts.forEach((s) => s.remove());

      // 4. Limpiar e inyectar el contenido visual
      this.innerHTML = "";
      this.appendChild(template.content.cloneNode(true));

      // 5. Limpiar scripts dinámicos previos en el contenedor
      container
        .querySelectorAll("script[data-dynamic]")
        .forEach((s) => s.remove());

      // 6. Re-inyectar y ejecutar los scripts de la vista
      scripts.forEach((old) => {
        const s = document.createElement("script");
        s.textContent = old.textContent;
        s.setAttribute("data-dynamic", "true");
        container.appendChild(s);
      });

      // 7. Disparar la carga de datos con un pequeño delay
      // Esto asegura que nsConsultarBeneficios esté definido en el DOM
      /*setTimeout(() => {
        if (typeof nsConsultarBeneficios !== 'undefined') {
          nsConsultarBeneficios.cargar();
        } else {
          console.error("El namespace nsConsultarBeneficios no se cargó correctamente");
        }
      }, 100);*/
    } catch (e) {
      console.error("Error cargando ConsultarPlanillasComponent:", e);
      this.innerHTML = `<div class="alert alert-danger">Error al cargar la vista de planillas: ${e.message}</div>`;
    }
  }
}

// Registro del nuevo custom element
customElements.define(
  "consultar-planillas-component",
  ConsultarPlanillasComponent,
);
