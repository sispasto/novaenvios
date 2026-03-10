class ConsultaComponent extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const containerSelector = this.getAttribute('container'); // ej: "#App"
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.error(`Contenedor no encontrado: ${containerSelector}`);
      return;
    }

    try {
      const response = await fetch('view/consulta.html');
      const htmlText = await response.text();

      // Crear template para manipular el contenido
      const template = document.createElement('template');
      template.innerHTML = htmlText;

      // Extraer scripts del HTML
      const scripts = template.content.querySelectorAll('script');
      scripts.forEach(script => script.remove());

      // Limpiar el componente
      this.innerHTML = '';
      this.appendChild(template.content.cloneNode(true));
      // Limpiar scripts dinámicos anteriores
      container.querySelectorAll('script[data-dynamic="true"]').forEach(s => s.remove());
      // Insertar scripts dinámicamente
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');

        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }

        newScript.setAttribute('data-dynamic', 'true');
        container.appendChild(newScript);
      });

    } catch (error) {
      console.error('Error al cargar consulta.html:', error);
    }
  }
}

customElements.define('consulta-component', ConsultaComponent);
