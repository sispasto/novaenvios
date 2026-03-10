class ConsultarPersonaComponent extends HTMLElement {

  async connectedCallback() {

    const containerSelector = this.getAttribute("container");
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.error("Contenedor no encontrado");
      return;
    }

    try {
      const res = await fetch("view/consultarPersonas.html");
      const html = await res.text();

      const template = document.createElement("template");
      template.innerHTML = html;

      const scripts = template.content.querySelectorAll("script");
      scripts.forEach(s => s.remove());

      this.innerHTML = "";
      this.appendChild(template.content.cloneNode(true));

      container.querySelectorAll("script[data-dynamic]")
        .forEach(s => s.remove());

      scripts.forEach(old => {
        const s = document.createElement("script");
        s.textContent = old.textContent;
        s.setAttribute("data-dynamic", "true");
        container.appendChild(s);
      });

      setTimeout(() => {
        nsConsultarPersonas.cargar();
      }, 50);

    } catch (e) {
      console.error("Error cargando consultarPersonas", e);
    }
  }
}

customElements.define(
  "consultar-persona",
  ConsultarPersonaComponent
);
