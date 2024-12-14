import { Locator, Page, expect } from '@playwright/test';

export class formularioRegistroEstudiante {
  readonly page: Page;
  readonly ciInput: Locator;
  readonly namesInput: Locator;
  readonly lastNameInput: Locator;
  readonly maternalLastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ciInput = page.getByLabel('Carnet de Identidad:');
    this.namesInput = page.getByLabel('Nombres:');
    this.lastNameInput = page.getByLabel('Apellido Paterno:');
    this.maternalLastNameInput = page.getByLabel('Apellido Materno:');
    this.emailInput = page.getByPlaceholder('nombre.apellido');
    this.phoneInput = page.getByPlaceholder('7321321');
    this.submitButton = page.getByRole('button', { name: 'Enviar' });
  }

  async navigate() {
    await this.page.goto('http://localhost:3000/');
    await this.page.getByRole('button', { name: 'Inscribirme' }).click();
  }

  async fillForm(data: {
    ci: string;
    names: string;
    father_last_name: string;
    mother_last_name: string;
    email: string;
    phone: string;
  }) {
    await this.ciInput.fill(data.ci);
    await this.namesInput.fill(data.names);
    await this.lastNameInput.fill(data.father_last_name);
    await this.maternalLastNameInput.fill(data.mother_last_name);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async verifySubmission() {
    const confirmationMessage = this.page.getByText('Formulario enviado con éxito'); 
    await expect(confirmationMessage).toBeVisible();
  }
}
