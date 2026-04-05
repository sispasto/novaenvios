export const MENUS = {
  // MENU POR DEFECTO (INVITADO)
  DEFAULT: `
    <ul class="navbar-nav flex-grow-1 pe-3">
      <li class="nav-item">
        <a class="nav-link active" href="#" onclick="NovaMenu.ejecutarAccion(getHome)">
          <i class="bi bi-house"></i> Inicio
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" onclick="showLoginModal()">
          <i class="bi bi-person-lock"></i> Login
        </a>
      </li>
    </ul>`,

  // ROL EMPRESA
  EMPRESA: `
    <ul class="navbar-nav flex-grow-1 pe-3 custom-menu">
      <li class="nav-item mb-2">
        <a class="nav-link active d-flex align-items-center gap-2" href="#" onclick="NovaMenu.ejecutarAccion(getHome)">
          <i class="bi bi-speedometer2 text-primary"></i> <span>Panel Principal</span>
        </a>
      </li>
      <li class="nav-item mb-3">
        <a class="nav-link d-flex align-items-center gap-2" href="#" onclick="NovaMenu.ejecutarAccion(registrarPersona)">
          <i class="bi bi-people"></i> <span>Gestión de Mensajeros</span>
        </a>
      </li>

      <li class="nav-item menu-section">
        <a class="nav-link section-header d-flex justify-content-between align-items-center" 
          href="javascript:void(0)" onclick="NovaMenu.toggleSubMenu('catOperaciones', event)">
          <span class="d-flex align-items-center gap-2">
            <i class="bi bi-truck"></i> Gestión de Rutas
          </span>
          <i class="bi bi-chevron-right chevron-icon" style="font-size: 0.7rem;"></i>
        </a>
        <div class="collapse" id="catOperaciones">
          <ul class="list-unstyled submenu-list ms-3 border-start border-secondary-subtle">
            <li><a class="nav-link" href="#" onclick="NovaMenu.ejecutarAccion(crearPlanilla)">Crear Planilla</a></li>
            <li><a class="nav-link" href="#" onclick="NovaMenu.ejecutarAccion(consultarPlanilla)">Consultar Planilla</a></li>
            <li><a class="nav-link" href="#" onclick="NovaMenu.ejecutarAccion(consultarPlanillas)">Consultar Planillas</a></li>
            <li><a class="nav-link" href="#" onclick="NovaMenu.ejecutarAccion(excluirGuias)">Excluir Guías</a></li>
          </ul>
        </div>
      </li>

      <li class="nav-item menu-section mt-2">
        <a class="nav-link section-header d-flex justify-content-between align-items-center" 
          href="javascript:void(0)" onclick="NovaMenu.toggleSubMenu('catDevoluciones', event)">
          <span class="d-flex align-items-center gap-2">
            <i class="bi bi-arrow-left-right"></i> Devoluciones
          </span>
          <i class="bi bi-chevron-right chevron-icon" style="font-size: 0.7rem;"></i>
        </a>
        <div class="collapse" id="catDevoluciones">
          <ul class="list-unstyled submenu-list ms-3 border-start border-secondary-subtle">
            <li><a class="nav-link" href="#" onclick="NovaMenu.ejecutarAccion(crearPlanillaDevolucion)">Crear Planilla</a></li>
            <li><a class="nav-link" href="#" onclick="NovaMenu.ejecutarAccion(entregarDevoluciones)">Entregar Planilla</a></li>
          </ul>
        </div>
      </li>

      <li class="nav-item menu-section mt-2">
        <a class="nav-link section-header d-flex justify-content-between align-items-center" 
          href="javascript:void(0)" onclick="NovaMenu.toggleSubMenu('catCierre', event)">
          <span class="d-flex align-items-center gap-2">
            <i class="bi bi-check2-circle"></i> Cierres y Control
          </span>
          <i class="bi bi-chevron-right chevron-icon" style="font-size: 0.7rem;"></i>
        </a>
        <div class="collapse" id="catCierre">
          <ul class="list-unstyled submenu-list ms-3 border-start border-secondary-subtle">
            <li><a class="nav-link" href="#" onclick="NovaMenu.ejecutarAccion(cerrarPlanilla)">Cierre de planilla</a></li>
            <li><a class="nav-link text-danger-emphasis" href="#" onclick="NovaMenu.ejecutarAccion(anularPlanilla)">Anular Planilla</a></li>
          </ul>
        </div>
      </li>

      <li class="nav-item mt-4 border-top border-secondary pt-3">
        <a class="nav-link d-flex align-items-center gap-2" href="#" onclick="NovaMenu.ejecutarAccion(showChangePasswordModal)">
          <i class="bi bi-shield-lock"></i> Seguridad
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-danger d-flex align-items-center gap-2" href="#" onclick="logout()">
          <i class="bi bi-power"></i> <span>Finalizar Sesión</span>
        </a>
      </li>
    </ul>`,
  // ROL MENSAJERO
  MENSAJERO: `
    <ul class="navbar-nav flex-grow-1 pe-3 custom-menu">
      <li class="nav-item mb-2">
        <a class="nav-link active d-flex align-items-center gap-2" href="#" onclick="NovaMenu.ejecutarAccion(getHome)">
          <i class="bi bi-house-door"></i> <span>Inicio</span>
        </a>
      </li>

      <li class="nav-item mb-2">
        <a class="nav-link d-flex align-items-center gap-2" href="#" onclick="NovaMenu.ejecutarAccion(getPlanillasMensajero)">
          <i class="bi bi-search"></i> <span>Consultar Planillas</span>
        </a>
      </li>

      <li class="nav-item mt-4 border-top border-secondary pt-3">
        <a class="nav-link d-flex align-items-center gap-2" href="#" onclick="NovaMenu.ejecutarAccion(showChangePasswordModal)">
          <i class="bi bi-key"></i> <span>Cambiar Clave</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-danger d-flex align-items-center gap-2" href="#" onclick="logout()">
          <i class="bi bi-box-arrow-right"></i> <span>Salir</span>
        </a>
      </li>
    </ul>`,
  // ROL ADMINISTRADOR
  ADMIN: `
    <ul class="navbar-nav flex-grow-1 pe-3 custom-menu">
      <li class="nav-item mb-2">
        <a class="nav-link active d-flex align-items-center gap-2" href="#" onclick="NovaMenu.ejecutarAccion(getHome)">
          <i class="bi bi-shield-check text-success"></i> <span>Consola de Control</span>
        </a>
      </li>

      <li class="nav-item menu-section">
        <a class="nav-link section-header d-flex justify-content-between align-items-center" 
           href="javascript:void(0)" onclick="NovaMenu.toggleSubMenu('catAdminConfig', event)">
          <span class="d-flex align-items-center gap-2">
            <i class="bi bi-gear-fill"></i> Configuración
          </span>
          <i class="bi bi-chevron-right chevron-icon" style="font-size: 0.7rem;"></i>
        </a>
        <div class="collapse" id="catAdminConfig">
          <ul class="list-unstyled submenu-list ms-3 border-start border-secondary-subtle">
            <li><a class="nav-link" href="#" onclick="NovaMenu.ejecutarAccion(gestionarEmpresas)">Gestionar Empresas</a></li>
            <li><a class="nav-link" href="#" onclick="NovaMenu.ejecutarAccion(configurarTarifas)">Maestro de Tarifas</a></li>
            <li><a class="nav-link" href="#" onclick="NovaMenu.ejecutarAccion(gestionarZonas)">Zonas y Cobertura</a></li>
          </ul>
        </div>
      </li>

      <li class="nav-item menu-section mt-2">
        <a class="nav-link section-header d-flex justify-content-between align-items-center" 
           href="javascript:void(0)" onclick="NovaMenu.toggleSubMenu('catAdminAudit', event)">
          <span class="d-flex align-items-center gap-2">
            <i class="bi bi-journal-text"></i> Auditoría Global
          </span>
          <i class="bi bi-chevron-right chevron-icon" style="font-size: 0.7rem;"></i>
        </a>
        <div class="collapse" id="catAdminAudit">
          <ul class="list-unstyled submenu-list ms-3 border-start border-secondary-subtle">
            <li><a class="nav-link" href="#" onclick="NovaMenu.ejecutarAccion(verLogsSistema)">Logs del Sistema</a></li>
            <li><a class="nav-link" href="#" onclick="NovaMenu.ejecutarAccion(reporteGeneralVentas)">Reporte Consolidado</a></li>
          </ul>
        </div>
      </li>

      <li class="nav-item mt-4 border-top border-secondary pt-3">
        <a class="nav-link d-flex align-items-center gap-2" href="#" onclick="NovaMenu.ejecutarAccion(showChangePasswordModal)">
          <i class="bi bi-lock"></i> Seguridad Admin
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-danger d-flex align-items-center gap-2" href="#" onclick="logout()">
          <i class="bi bi-power"></i> <span>Cerrar Sesión</span>
        </a>
      </li>
    </ul>`,

  // ... (MENSAJERO y ADMIN se mantienen igual, solo verifica que usen NovaMenu.ejecutarAccion)
};

const MenuManager = {
  // CORRECCIÓN: Definición limpia de funciones sin prefijos
  toggleSubMenu: (id, event) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const elemento = document.getElementById(id);
    if (elemento) {
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(elemento);
      bsCollapse.toggle();
    }
  },

  ejecutarAccion: (callback) => {
    if (typeof callback === "function") callback();
    const el = document.getElementById("offcanvasDarkNavbar");
    const instance = bootstrap.Offcanvas.getInstance(el);
    if (instance) instance.hide();
  },

  mostrarMenuPorRol: (rol, nombreUsuario = "") => {
    const contenedor = document.querySelector(
      "#offcanvasDarkNavbar .offcanvas-body",
    );
    const tituloMenu = document.getElementById("offcanvasDarkNavbarLabel");
    const textUser = document.getElementById("textUser"); // <--- Seleccionamos el elemento del navbar

    if (!contenedor) return;

    // 1. Actualizar el Navbar Brand (el que querías editar)
    if (textUser) {
      // Si hay nombre lo ponemos, si no, dejamos el nombre de la app
      textUser.textContent = nombreUsuario || "";
      textUser.innerHTML = `<i class="bi bi-person-circle me-2"></i> ${nombreUsuario.toUpperCase()}`;
      textUser.style.fontSize = "1.1rem";
      textUser.style.letterSpacing = "1px";
    }

    // 2. Actualizar el título interno del Offcanvas (opcional, por estética)

    // En mostrarMenuPorRol:
    if (tituloMenu) {
      tituloMenu.innerHTML = `<i class="bi bi-person-circle me-2"></i> ${nombreUsuario.toUpperCase()}`;
      tituloMenu.style.fontSize = "1.1rem";
      tituloMenu.style.letterSpacing = "1px";
    }

    // 3. Inyectar el HTML del menú según el rol
    const r = Number(rol);
    if (r === 1) contenedor.innerHTML = MENUS.EMPRESA;
    else if (r === 2) contenedor.innerHTML = MENUS.MENSAJERO;
    else if (r === 3) contenedor.innerHTML = MENUS.ADMIN;
    else MenuManager.mostrarMenuInvitado();
  },

  mostrarMenuInvitado: () => {
    const contenedor = document.querySelector(
      "#offcanvasDarkNavbar .offcanvas-body",
    );

    const tituloMenu = document.getElementById("offcanvasDarkNavbarLabel");

    if (tituloMenu) {
      tituloMenu.innerHTML = `<i class="bi bi-person-circle me-2"></i> NOVA ENVIOS`;
      tituloMenu.style.fontSize = "1.1rem";
      tituloMenu.style.letterSpacing = "1px";
    }

    if (contenedor) contenedor.innerHTML = MENUS.DEFAULT;

    const textUser = document.getElementById("textUser");
    if (textUser) {
      // Si hay nombre lo ponemos, si no, dejamos el nombre de la app
      textUser.innerHTML = `<i class="bi bi-building-fill me-2"></i> NOVA ENVIOS`;
      textUser.style.fontSize = "1.1rem";
      textUser.style.letterSpacing = "1px";
    }
  },
};

// EXPOSICIÓN GLOBAL
window.NovaMenu = MenuManager;
