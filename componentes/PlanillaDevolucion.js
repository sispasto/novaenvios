class PlanillaDevolucionComponent extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const containerSelector = this.getAttribute("container") || "#App";
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.error(`Contenedor no encontrado: ${containerSelector}`);
      return;
    }

    try {
      // Apuntando al nombre de archivo exacto que mencionaste
      const response = await fetch("view/planillaDevolucion.html");

      if (!response.ok)
        throw new Error(`No se pudo cargar el archivo: ${response.statusText}`);

      const htmlText = await response.text();

      // Crear template para manipular el contenido
      const template = document.createElement("template");
      template.innerHTML = htmlText;

      // Extraer scripts del HTML para evitar ejecución duplicada o descontrolada
      const scripts = Array.from(template.content.querySelectorAll("script"));
      scripts.forEach((script) => script.remove());

      // Insertar el HTML limpio en el componente
      this.innerHTML = "";
      this.appendChild(template.content.cloneNode(true));

      // Limpiar scripts dinámicos anteriores del contenedor para liberar memoria
      container
        .querySelectorAll('script[data-dynamic="true"]')
        .forEach((s) => s.remove());

      // Insertar y ejecutar los scripts extraídos
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");

        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }

        // Marcador para limpieza futura
        newScript.setAttribute("data-dynamic", "true");
        container.appendChild(newScript);
      });
    } catch (error) {
      console.error("Error al cargar planillaDevolucion.html:", error);
      this.innerHTML = `<div class="alert alert-danger m-3">Error al cargar la vista de devoluciones.</div>`;
    }
  }
}

// Registro del Custom Element
customElements.define(
  "planilla-devolucion-component",
  PlanillaDevolucionComponent,
);
