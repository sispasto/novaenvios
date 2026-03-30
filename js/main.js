const templateCache = {};
var arrayGlobal = []; //array de promotores
var folderPathIMG = ""; //variable que guarda id de carpeta donde se guardan las imagenes
var versionApp = localStorage.getItem("app_version") || ""; //La version se debe cambiar en service-worker.js y main.js
let swRegistration = null; // 🔥 referencia global
let intervalSW = null;
let newVersionAvailable = null;

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
  // 🔥 SIEMPRE leer la versión más reciente
  versionApp = localStorage.getItem("app_version") || "";
  const componente = document.createElement("bienvenida-component");
  componente.setAttribute("container", "#App");
  componente.versionApp = versionApp;

  main.appendChild(componente);
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

/* =========================
   AUTO UPDATE SW
========================= */
function iniciarAutoUpdateSW() {
  if (intervalSW) return;

  intervalSW = setInterval(() => {
    if (swRegistration) {
      //console.log("🔄 Buscando actualización del SW...");
      swRegistration.update();
    }
  }, 1800000); // cada 1 minuto
}

/* =========================
   BOTÓN ACTUALIZACIÓN
========================= */
function mostrarBotonActualizacion() {
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

  btn.innerText = newVersionAvailable
    ? `Actualizar a versión ${newVersionAvailable}`
    : "Nueva versión disponible";

  btn.onclick = () => {
    if (swRegistration && swRegistration.waiting) {
      // 🔥 AQUÍ recién aceptas la nueva versión
      if (newVersionAvailable) {
        localStorage.setItem("app_version", newVersionAvailable);
      }

      swRegistration.waiting.postMessage({ action: "SKIP_WAITING" });
    }
  };
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", async function () {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/novaenvios/service-worker.js", {
        scope: "/novaenvios/",
        updateViaCache: "none",
      })
      .then((reg) => {
        swRegistration = reg;

        // 🔥 iniciar revisión automática
        iniciarAutoUpdateSW();

        // 🔥 SIEMPRE obtener versión (incluye primera carga)
        navigator.serviceWorker.ready.then((regReady) => {
          if (regReady.active) {
            regReady.active.postMessage("GET_VERSION");
          }
        });

        // 🔥 si ya hay una versión en espera
        if (reg.waiting && navigator.serviceWorker.controller) {
          //console.log("SW ya estaba esperando");
          mostrarBotonActualizacion();
        }

        // 🔥 detectar nueva versión
        reg.onupdatefound = () => {
          const newSW = reg.installing;
          if (!newSW) return;

          newSW.onstatechange = () => {
            if (newSW.state === "installed") {
              // Solo si ya hay una app corriendo (no primera instalación)
              if (navigator.serviceWorker.controller) {
                //console.log("Nueva versión disponible");

                // 🔥 pedir versión del NUEVO SW
                newSW.postMessage("GET_VERSION");

                if (reg.waiting) {
                  mostrarBotonActualizacion();
                }
              }
            }
          };
        };
      })
      .catch((error) => console.error("Error al registrar el SW:", error));

    // 🔥 recibir versión
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data.type === "VERSION") {
        if (swRegistration && swRegistration.waiting) {
          // 🔥 nueva versión (NO aplicar aún)
          newVersionAvailable = event.data.version;
          //console.log("Nueva versión detectada:", newVersionAvailable);
          mostrarBotonActualizacion();
        } else {
          // 🔥 versión actual activa
          versionApp = event.data.version;
          localStorage.setItem("app_version", versionApp);

          // 🔥 actualizar UI si estás en home
          const label = document.getElementById("version-label");
          if (label) {
            label.textContent = `NovaEnvios v${versionApp}`;
          }
        }
      }
    });

    // 🔥 recargar SOLO cuando usuario acepta actualización
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });

    // 🔥 revisar actualización al volver a la pestaña
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        if (swRegistration) {
          //console.log("👀 Usuario volvió → revisando SW...");
          swRegistration.update();
        }
      }
    });
  }

  setNavbarCollapse();
  getHome();
});
