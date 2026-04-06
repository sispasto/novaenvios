class BienvenidaComponent extends HTMLElement {
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
      // 1. Cargar la vista
      const response = await fetch("view/bienvenida.html");
      const htmlText = await response.text();

      const template = document.createElement("template");
      template.innerHTML = htmlText;

      // 2. Manejar scripts
      const scripts = template.content.querySelectorAll("script");
      scripts.forEach((script) => script.remove());

      // 3. Renderizar contenido
      this.innerHTML = "";
      this.appendChild(template.content.cloneNode(true));

      // 4. Actualizar versión (ahora solo se encarga de esto)
      if (this.versionApp) {
        const versionLabel = this.querySelector("#version-label");
        if (versionLabel) {
          versionLabel.textContent = `NovaEnvios v${this.versionApp}`;
        }
      }

      // 5. Inyectar scripts dinámicos
      container
        .querySelectorAll('script[data-dynamic="true"]')
        .forEach((s) => s.remove());
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
      console.error("Error al cargar bienvenida.html:", error);
    }
  }

  set versionApp(value) {
    this._versionApp = value;
    // Si el componente ya está montado, actualizamos la etiqueta inmediatamente
    const label = this.querySelector("#version-label");
    if (label) label.textContent = `NovaEnvios v${value}`;
  }

  get versionApp() {
    return this._versionApp;
  }
}

customElements.define("bienvenida-component", BienvenidaComponent);
