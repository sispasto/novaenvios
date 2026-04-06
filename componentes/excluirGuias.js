class ExcluirGuiasComponent extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    // Obtenemos el contenedor donde se inyectarán los scripts (ej: #App)
    const containerSelector = this.getAttribute("container") || "#App";
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.error(`Contenedor no encontrado: ${containerSelector}`);
      return;
    }

    try {
      // Cargamos la vista HTML que creamos previamente
      const response = await fetch("view/excluirGuias.html");
      if (!response.ok)
        throw new Error(`No se pudo cargar la vista: ${response.statusText}`);

      const htmlText = await response.text();

      // Crear template para manipular el contenido y separar scripts
      const template = document.createElement("template");
      template.innerHTML = htmlText;

      // Extraer scripts del HTML para ejecutarlos manualmente
      const scripts = template.content.querySelectorAll("script");
      scripts.forEach((script) => script.remove());

      // Limpiar el contenido actual del componente e inyectar el HTML limpio
      this.innerHTML = "";
      this.appendChild(template.content.cloneNode(true));

      // Limpiar scripts dinámicos anteriores para evitar duplicidad de funciones
      container
        .querySelectorAll('script[data-dynamic="true"]')
        .forEach((s) => s.remove());

      // Insertar e inyectar los nuevos scripts en el contenedor principal
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");

        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }

        // Marcamos el script como dinámico para poder limpiarlo después
        newScript.setAttribute("data-dynamic", "true");
        container.appendChild(newScript);
      });

      //console.log('Componente Excluir Guías cargado correctamente.');
    } catch (error) {
      console.error("Error al cargar excluirGuias.html:", error);
      this.innerHTML = `<div class="alert alert-danger">Error al cargar el módulo de exclusión de guías.</div>`;
    }
  }
}

// Definimos el nuevo elemento personalizado
customElements.define("excluir-guias-component", ExcluirGuiasComponent);
