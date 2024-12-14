import { test } from '@playwright/test';
import { AceptarSolicitudUsuarioPage } from '../pages/AceptarSolicitudUsuario.page';

test('Gestionar solicitudes de inscripción', async ({ page, browserName }) => {
  const aceptarSolicitudPage = new AceptarSolicitudUsuarioPage(page);

  // Navegar a la página principal
  await aceptarSolicitudPage.goto();

  // Iniciar sesión
  const email = 'OSWALDO FIGUEROA';
  const password = '1234';
  await aceptarSolicitudPage.login(email, password);

  // Navegar al módulo de solicitudes de inscripción
  await aceptarSolicitudPage.navigateToSolicitudes(browserName);

  // Aceptar la primera solicitud
  await aceptarSolicitudPage.aceptarPrimeraSolicitud();
});
