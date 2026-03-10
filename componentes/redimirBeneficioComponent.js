class RedimirBeneficioComponent extends HTMLElement {
  async connectedCallback() {
    const containerSelector = this.getAttribute("container");
    const container = document.querySelector(containerSelector);

    try {
      const res = await fetch("view/redimirBeneficio.html");
      const html = await res.text();

      const template = document.createElement("template");
      template.innerHTML = html;

      // Extraer y ejecutar scripts
      const scripts = template.content.querySelectorAll("script");
      scripts.forEach(s => s.remove());

      this.innerHTML = "";
      this.appendChild(template.content.cloneNode(true));

      scripts.forEach(old => {
        const s = document.createElement("script");
        s.textContent = old.textContent;
        s.setAttribute("data-dynamic", "true");
        container.appendChild(s);
      });

      // Iniciar carga de datos
      setTimeout(() => {
        if (window.nsRedimir) nsRedimir.cargarBeneficios();
      }, 200);

    } catch (e) {
      console.error("Error cargando componente de redención", e);
    }
  }
}
customElements.define("redimir-beneficio", RedimirBeneficioComponent);