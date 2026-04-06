class AnularPlanillaComponent extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const containerSelector = this.getAttribute("container");
    const container = document.querySelector(containerSelector);
    if (!container) return;

    try {
      const response = await fetch("view/anularPlanilla.html");
      const htmlText = await response.text();

      const template = document.createElement("template");
      template.innerHTML = htmlText;

      const scripts = template.content.querySelectorAll("script");
      scripts.forEach((script) => script.remove());

      this.innerHTML = "";
      this.appendChild(template.content.cloneNode(true));

      // CORRECCIÓN AQUÍ: Limpieza de scripts dinámicos previos
      const scriptsDinamicos = container.querySelectorAll(
        'script[data-dynamic="true"]',
      );
      scriptsDinamicos.forEach((scriptElement) => {
        scriptElement.remove();
      });

      // Reinyección de scripts
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

      // Inicializar redes usando el empresaId del sessionStorage
      setTimeout(() => {
        if (window.nsRegistroBeneficio) {
          nsRegistroBeneficio.cargarRedes();
        }
      }, 200);
    } catch (error) {
      console.error("Error en componente:", error);
    }
  }
}

customElements.define("anular-planilla-component", AnularPlanillaComponent);
