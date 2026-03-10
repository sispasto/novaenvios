class AcercadeComponent extends HTMLElement {
  constructor() {
    super();
    //this.attachShadow({ mode: 'open' }); Encapsula todo independiente todo css y js por eso lo comente
  }

  async connectedCallback() {
    const containerSelector = this.getAttribute('container'); //|| '#App';
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.error(`Contenedor no encontrado: ${containerSelector}`);
      return;
    }

    try {
      const response = await fetch('view/acercade.html');
      const htmlText = await response.text();

      // Crear un template para manipular el contenido
      const template = document.createElement('template');
      template.innerHTML = htmlText;

      // Extraer scripts
      const scripts = template.content.querySelectorAll('script');
      scripts.forEach(script => script.remove()); // Remover antes de clonar

      // Insertar el contenido HTML en el shadow DOM
      //this.shadowRoot.appendChild(template.content.cloneNode(true));Encapsula todo independiente todo css y js por eso lo comente
      this.innerHTML = '';
      this.appendChild(template.content.cloneNode(true));
      /* ========= INSERTAR DATOS ========= */

      if (this.versionApp) {
        const versionLabel = this.querySelector('#version-label');
        if (versionLabel) {
          versionLabel.textContent = `Asist v${this.versionApp}`;
        }
      }

      if (this.fecInicial) {
        const ini = this.querySelector('#fecha-inicio');
        if (ini) ini.textContent = this.fecInicial;
      }

      if (this.fecFinal) {
        const fin = this.querySelector('#fecha-fin');
        if (fin) fin.textContent = this.fecFinal;
      }
      // Limpiar scripts anteriores en el contenedor
      container.querySelectorAll('script[data-dynamic="true"]').forEach(s => s.remove());

      // Insertar los scripts dinámicamente en el contenedor
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        newScript.setAttribute('data-dynamic', 'true'); // para poder eliminarlos luego
        container.appendChild(newScript);
      });

    } catch (error) {
      console.error('Error al cargar bienvenida.html:', error);
    }
  }

  /* ========= PROPIEDADES ========= */

  set versionApp(value) {
    this._versionApp = value;
  }
  get versionApp() {
    return this._versionApp;
  }

  set fecInicial(value) {
    this._fecInicial = value;
  }
  get fecInicial() {
    return this._fecInicial;
  }

  set fecFinal(value) {
    this._fecFinal = value;
  }
  get fecFinal() {
    return this._fecFinal;
  }
  
}

customElements.define('acercade-component', AcercadeComponent);
