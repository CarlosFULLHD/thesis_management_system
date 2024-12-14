import { expect, Locator, Page } from '@playwright/test';

export class AceptarSolicitudUsuarioPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly iniciarSesionButton: Locator;
  readonly administrarButton: Locator;
  readonly solicitudesInscripcionButton: Locator;
  readonly tabla: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.emailInput = page.getByLabel('E-mail');
    this.passwordInput = page.getByLabel('Password');
    this.iniciarSesionButton = page.getByRole('button', { name: 'Iniciar Sesión' });
    this.administrarButton = page.locator('button:has-text("Administrar")');
    this.solicitudesInscripcionButton = page.locator('button:has-text("Solicitudes de Inscripción")');
    this.tabla = page.locator('table');
  }

  async goto() {
    await this.page.goto('http://localhost:3000/');
  }

  async login(email: string, password: string) {
    await this.loginButton.click();
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.iniciarSesionButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  async navigateToSolicitudes(browserName: string) {
    if (browserName === 'chromium') {
      console.log('Chromium detectado, redirigiendo directamente...');
      await this.page.goto('http://localhost:3000/dashboardInformation');
    } else {
      await this.page.addStyleTag({ content: '* { transition: none !important; }' });
      await expect(this.administrarButton).toBeVisible();
      await this.administrarButton.click();
      await this.page.waitForTimeout(1000);

      for (let i = 0; i < 3; i++) {
        if (await this.solicitudesInscripcionButton.isVisible()) break;
        console.log('Reintentando cargar el menú...');
        await this.administrarButton.click();
        await this.page.waitForTimeout(1000);
      }
      await this.solicitudesInscripcionButton.click();
    }

    await expect(this.tabla).toBeVisible();
  }

  async aceptarPrimeraSolicitud() {
    const carnet = await this.tabla.locator('td').nth(0).innerText();
    console.log('Primer carnet encontrado:', carnet);
    const fila = this.page.locator(`text=${carnet}`).locator('xpath=ancestor::tr');
    await fila.locator('button:has-text("Aceptar")').click();
    await this.page.getByRole('button', { name: 'Aceptar' }).click();
    await expect(
      this.page.locator('text=Estudiante aceptado y cuenta creada con éxito.')
    ).toBeVisible();
  }
}
