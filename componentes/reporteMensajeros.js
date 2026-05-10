class ReporteMensajeroComponent extends HTMLElement {
  async connectedCallback() {
    const containerSelector = this.getAttribute("container");
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.error("Contenedor no encontrado para ReporteMensajeroComponent");
      return;
    }

    try {
      // 1. Cargar el archivo HTML de la vista
      const res = await fetch("view/planillasxfecha.html");
      const html = await res.text();

      const template = document.createElement("template");
      template.innerHTML = html;

      // 2. Extraer scripts para ejecución dinámica
      const scripts = template.content.querySelectorAll("script");
      scripts.forEach((s) => s.remove());

      // 3. Limpiar e inyectar el HTML en el shadow o innerHTML
      this.innerHTML = "";
      this.appendChild(template.content.cloneNode(true));

      // 4. Limpiar scripts dinámicos previos en el contenedor principal
      container
        .querySelectorAll("script[data-dynamic-reporte]")
        .forEach((s) => s.remove());

      // 5. Re-inyectar y ejecutar los scripts de la vista
      scripts.forEach((old) => {
        const s = document.createElement("script");
        s.textContent = old.textContent;
        s.setAttribute("data-dynamic-reporte", "true");
        container.appendChild(s);
      });

      // 6. Inicialización opcional si necesitas fechas por defecto
      setTimeout(() => {
        if (window.nsReporte) {
          // Establecer fechas por defecto (hoy)
          const hoy = new Date().toISOString().split("T")[0];
          const inputInicio = document.getElementById("fecha_inicio_rep");
          const inputFin = document.getElementById("fecha_fin_rep");

          if (inputInicio && inputFin) {
            inputInicio.value = hoy;
            inputFin.value = hoy;
          }
          console.log("Dashboard de Mensajeros listo");
        }
      }, 100);
    } catch (e) {
      console.error("Error cargando reporte de mensajeros:", e);
      this.innerHTML = `<div class="alert alert-danger">Error al cargar la vista de reportes.</div>`;
    }
  }
}

// Registro del custom element
customElements.define("reporte-mensajeros", ReporteMensajeroComponent);
