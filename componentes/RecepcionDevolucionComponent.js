class RecepcionDevolucionComponent extends HTMLElement {
  constructor() {
    super();
    this._planillaSeleccionada = null;
  }

  async connectedCallback() {
    const containerSelector = this.getAttribute("container");
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.error(`Contenedor no encontrado: ${containerSelector}`);
      return;
    }

    try {
      // 1. Cargar el HTML de la vista
      const response = await fetch("view/recepcion_devolucion.html");
      const htmlText = await response.text();

      const template = document.createElement("template");
      template.innerHTML = htmlText;

      // 2. Extraer scripts para ejecución dinámica
      const scripts = template.content.querySelectorAll("script");
      scripts.forEach((script) => script.remove());

      // 3. Renderizar el HTML en el componente
      this.innerHTML = "";
      this.appendChild(template.content.cloneNode(true));

      // 4. Limpiar scripts dinámicos anteriores en el contenedor principal
      container
        .querySelectorAll('script[data-dynamic="true"]')
        .forEach((s) => s.remove());

      // 5. Inyectar los scripts de la vista
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        newScript.setAttribute("data-dynamic", "true");
        container.appendChild(newScript);
      });

      // 6. Inicializar la carga de datos si el namespace existe
      // Esperamos un pequeño delay para asegurar que el script inyectado se procese
      setTimeout(() => {
        if (
          window.nsRecepcionDevolucion &&
          typeof window.nsRecepcionDevolucion.cargarPendientes === "function"
        ) {
          window.nsRecepcionDevolucion.cargarPendientes();
        }
      }, 100);
    } catch (error) {
      console.error("Error al cargar recepcion_devolucion.html:", error);
    }
  }
}

customElements.define(
  "recepcion-devolucion-component",
  RecepcionDevolucionComponent,
);
