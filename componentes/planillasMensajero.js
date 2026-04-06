class PlanillasMensajero extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const containerSelector = this.getAttribute("container");
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.error(`Contenedor no encontrado: ${containerSelector}`);
      return;
    }

    try {
      // Cargamos la vista HTML
      const response = await fetch("view/planillasMensajero.html");
      const htmlText = await response.text();

      const template = document.createElement("template");
      template.innerHTML = htmlText;

      // Extraer scripts para ejecución dinámica (como en tu BienvenidaComponent)
      const scripts = template.content.querySelectorAll("script");
      scripts.forEach((script) => script.remove());

      this.innerHTML = "";
      this.appendChild(template.content.cloneNode(true));

      // Limpiar scripts anteriores en el contenedor para evitar duplicados
      container
        .querySelectorAll('script[data-dynamic="true"]')
        .forEach((s) => s.remove());

      // Insertar los scripts dinámicamente
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
    } catch (error) {
      console.error("Error al cargar planillas_mensajero.html:", error);
    }
  }
}

customElements.define("planillas-mensajero", PlanillasMensajero);
