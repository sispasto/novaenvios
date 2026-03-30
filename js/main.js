const templateCache = {};
var arrayGlobal = []; //array de promotores
var folderPathIMG = ""; //variable que guarda id de carpeta donde se guardan las imagenes
var versionApp = ""; //La version se debe cambiar en service-worker.js y main.js

function crearPlanilla() {
  let main = document.getElementById("App");
  removeALLChilds(main);
  const frmCrearPlanilla = document.createElement("crear-planilla-component");
  frmCrearPlanilla.setAttribute("container", "#App"); // <-- aquí pasas el parámetro
  main.appendChild(frmCrearPlanilla);
}

function excluirGuias() {
  let main = document.getElementById("App");
  removeALLChilds(main);
  const frmExcluirGuias = document.createElement("excluir-guias-component");
  frmExcluirGuias.setAttribute("container", "#App"); // <-- aquí pasas el parámetro
  main.appendChild(frmExcluirGuias);
}

function cerrarPlanilla() {
  let main = document.getElementById("App");
  removeALLChilds(main);
  const frmCerrarplanilla = document.createElement("cerrar-planilla-component");
  frmCerrarplanilla.setAttribute("container", "#App"); // <-- aquí pasas el parámetro
  main.appendChild(frmCerrarplanilla);
}

function consultarPlanillas() {
  let main = document.getElementById("App");
  removeALLChilds(main);
  const frmConsultarPlanillas = document.createElement(
    "consultar-planillas-component",
  );
  frmConsultarPlanillas.setAttribute("container", "#App"); // <-- aquí pasas el parámetro
  main.appendChild(frmConsultarPlanillas);
}

function anularPlanilla() {
  let main = document.getElementById("App");
  removeALLChilds(main);
  const frmAnularPlanilla = document.createElement("anular-planilla-component");
  frmAnularPlanilla.setAttribute("container", "#App"); // <-- aquí pasas el parámetro
  main.appendChild(frmAnularPlanilla);
}

function getHome() {
  let main = document.getElementById("App");
  removeALLChilds(main);
  const componente = document.createElement("bienvenida-component");
  componente.setAttribute("container", "#App"); // <-- aquí pasas el parámetro
  componente.versionApp = versionApp; // <-- Aquí se pasa la versión antes de renderizar
  main.appendChild(componente);
  /******************************************************** */
}

function acercade() {
  let main = document.getElementById("App");
  removeALLChilds(main);
  const componente = document.createElement("acercade-component");
  componente.setAttribute("container", "#App"); // <-- aquí pasas el parámetro
  componente.versionApp = versionApp; // <-- Aquí se pasa la versión antes de renderizar
  componente.fecInicial = "19/01/2026"; // <-- Aquí se pasa la fecha inicial antes de renderizar
  componente.fecFinal = "19/01/2027"; // <-- Aquí se pasa la fecha final antes de renderizar
  main.appendChild(componente);
  /******************************************************** */
}

function crearLoader() {
  eliminarLoader();
  let containerloader = document.createElement("div");
  containerloader.id = "containerloader";
  let loader = document.createElement("div");
  loader.id = "loader";
  for (let i = 0; i < 4; i++) {
    loader.appendChild(document.createElement("div"));
  }
  loader.classList.add("lds-roller");
  containerloader.appendChild(loader);
  document.body.appendChild(containerloader);
}

function eliminarLoader() {
  let loader = document.getElementById("containerloader");
  if (loader) loader.remove();
}

function cerrarModalesActivos() {
  const allModals = document.querySelectorAll(".modal.show");
  allModals.forEach((modal) => {
    const instance = bootstrap.Modal.getInstance(modal);
    if (instance) instance.hide();
  });
}

// Este código también puede ir en el archivo .js si no requiere esperar a que HTML cargue
function setNavbarCollapse() {
  const navLinks = document.querySelectorAll(".nav-item");
  const menuToggle = document.getElementById("navbarText");
  const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });

  navLinks.forEach((l) => {
    l.addEventListener("click", () => {
      bsCollapse.toggle();
    });
  });
}

function removeALLChilds(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
}

function alertSMS(texto) {
  let myToast = document.querySelector(".toast");
  let smsToast = document.querySelector(".toast-body");
  let toast = new bootstrap.Toast(myToast);
  smsToast.innerHTML = texto;
  toast.show();
}

function actualizarTextoBoton() {
  const btn = document.getElementById("btn-update-app");
  if (btn && versionApp) {
    btn.innerText = `Actualizar a versión ${versionApp}`;
  }
}

function mostrarBotonActualizacion(reg) {
  let btn = document.getElementById("btn-update-app");

  if (!btn) {
    btn = document.createElement("button");
    btn.id = "btn-update-app";

    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.zIndex = "9999";
    btn.style.padding = "10px 15px";
    btn.style.background = "#0d6efd";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "8px";

    document.body.appendChild(btn);
  }

  // texto inicial
  btn.innerText = "Nueva versión disponible";

  btn.onclick = () => {
    if (reg.waiting) {
      reg.waiting.postMessage({ action: "SKIP_WAITING" });
    }
  };
}

document.addEventListener("DOMContentLoaded", async function () {
  /************Para forzar actualizacion de PWA**************/
  // Registrar SW y manejar versión
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/novaenvios/service-worker.js", { scope: "/novaenvios/" })
      .then((reg) => {
        // Detectar nueva versión
        reg.onupdatefound = () => {
          const newSW = reg.installing;
          newSW.onstatechange = () => {
            if (
              newSW.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.log("Nueva versión disponible");
              newSW.postMessage("GET_VERSION");
              mostrarBotonActualizacion(reg);
            }
          };
        };

        // Pedir versión actual al cargar
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage("GET_VERSION");
        }
      })
      .catch((error) => console.error("Error al registrar el SW:", error));

    // Recibir versión desde SW
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data.type === "VERSION") {
        versionApp = event.data.version;

        // Actualizar solo el botón
        actualizarTextoBoton();

        // Actualizar el label dentro del componente
        const label = document.getElementById("version-label");
        if (label) label.textContent = `NovaEnvios v${versionApp}`;
      }
    });

    // Recargar página cuando SW toma control
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
  }
  /************Para forzar actualizacion de PWA**************/
  setNavbarCollapse();
  getHome();
});
