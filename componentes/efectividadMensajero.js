class EfectividadMensajeroComponent extends HTMLElement {
  async connectedCallback() {
    const containerSelector = this.getAttribute("container");
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.error(
        "Contenedor no encontrado para EfectividadMensajeroComponent",
      );
      return;
    }

    try {
      // 1. Cargar la vista personalizada para el mensajero
      const res = await fetch("view/efectividadMensajero.html");
      const html = await res.text();

      const template = document.createElement("template");
      template.innerHTML = html;

      // 2. Extraer scripts para ejecución dinámica
      const scripts = template.content.querySelectorAll("script");
      scripts.forEach((s) => s.remove());

      // 3. Inyectar el HTML en el componente
      this.innerHTML = "";
      this.appendChild(template.content.cloneNode(true));

      // 4. Limpiar scripts dinámicos previos en el contenedor principal
      container
        .querySelectorAll("script[data-dynamic-efectividad]")
        .forEach((s) => s.remove());

      // 5. Re-inyectar y ejecutar los scripts de la vista
      scripts.forEach((old) => {
        const s = document.createElement("script");
        s.textContent = old.textContent;
        s.setAttribute("data-dynamic-efectividad", "true");
        container.appendChild(s);
      });

      // 6. Inicialización automática (Carga datos de hoy al entrar)
      setTimeout(() => {
        if (window.nsReporte) {
          const hoy = new Date().toISOString().split("T")[0];
          const inputInicio = document.getElementById("fecha_inicio_rep");
          const inputFin = document.getElementById("fecha_fin_rep");

          if (inputInicio && inputFin) {
            inputInicio.value = hoy;
            inputFin.value = hoy;

            // Disparar consulta automática para que el mensajero vea sus datos de una vez
            window.nsReporte.cargarDashboard();
          }
          console.log("Módulo efectividadMensajero cargado correctamente");
        }
      }, 150);
    } catch (e) {
      console.error("Error cargando efectividadMensajero:", e);
      this.innerHTML = `<div class="alert alert-danger">Error al cargar tu panel de efectividad.</div>`;
    }
  }
}

// Registro del nuevo nombre del componente
customElements.define("efectividad-mensajero", EfectividadMensajeroComponent);
