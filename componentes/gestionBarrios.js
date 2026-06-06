class GestionBarriosComponent extends HTMLElement {
  async connectedCallback() {
    // Obtenemos el selector del contenedor principal desde el atributo HTML
    const containerSelector = this.getAttribute("container");
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.error("Contenedor de inyección no encontrado en el DOM");
      return;
    }

    try {
      // 1. Apuntamos a tu archivo HTML que guardaste en el repositorio
      const res = await fetch("view/geolocalizar.html");
      if (!res.ok)
        throw new Error("No se pudo obtener el archivo geolocalizar.html");

      const html = await res.text();

      // 2. Procesamos el HTML de forma aislada mediante un template
      const template = document.createElement("template");
      template.innerHTML = html;

      // 3. Extraemos las etiquetas script internas para que no se autoejecuten mal dentro del DOM virtual
      const scripts = template.content.querySelectorAll("script");
      scripts.forEach((s) => s.remove());

      // 4. Limpiamos el componente e inyectamos la estructura visual (HTML + CSS)
      this.innerHTML = "";
      this.appendChild(template.content.cloneNode(true));

      // 5. Limpiamos scripts dinámicos obsoletos del contenedor principal si ya existían
      container
        .querySelectorAll("script[data-dynamic]")
        .forEach((s) => s.remove());

      // 6. Volvemos a crear y adjuntar los scripts al contenedor real para activar la lógica modular
      scripts.forEach((old) => {
        const s = document.createElement("script");
        s.textContent = old.textContent;
        s.setAttribute("data-dynamic", "true");
        container.appendChild(s);
      });

      // 7. Retardo milimétrico seguro para que el módulo JS se registre en el objeto global windows
      setTimeout(() => {
        if (typeof nsGestionBarrios !== "undefined") {
          // Si deseas que al entrar a la pantalla cargue por defecto una categoría, descomenta la siguiente línea:
          // nsGestionBarrios.consultarServidor("Baja Precision");

          console.log(
            "Componente 'gestion-barrios' e interfaz bajo demanda vinculados con éxito.",
          );
        } else {
          console.error(
            "El espacio de nombres 'nsGestionBarrios' no se ha inicializado correctamente en el DOM global.",
          );
        }
      }, 80); // Subido a 80ms para garantizar lectura asíncrona estable en móviles
    } catch (e) {
      console.error("Error crítico cargando GestionBarriosComponent:", e);
    }
  }
}

// Definimos la nueva etiqueta HTML nativa y personalizada
customElements.define("gestion-barrios", GestionBarriosComponent);
