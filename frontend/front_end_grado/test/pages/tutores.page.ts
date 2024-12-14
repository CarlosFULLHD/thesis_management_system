import { expect, Locator, Page } from '@playwright/test';

export class TutoresPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly clearButton: Locator;
  readonly verMasButton: Locator;
  readonly redesInformaticasButton: Locator;
  readonly tutorResults: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[placeholder="Buscar por nombre..."]');
    this.clearButton = page.locator('input[placeholder="Buscar por nombre..."]');
    this.verMasButton = page.locator('div.flex.flex-wrap.justify-center.gap-4 > div > div > button');
    this.redesInformaticasButton = page.locator(
      'div.flex.flex-wrap.justify-center.gap-4 > div > div > ul > li:nth-child(11) > button'
    );
    this.tutorResults = page.locator('div.flex.flex-wrap.justify-center.gap-4 h1');
    this.pageTitle = page.locator('h1.text-center.bg-clip-text:has-text("Tutores U.C.B.")');
  }

  async validatePageTitle() {
    await expect(this.pageTitle).toBeVisible();
    await this.page.waitForTimeout(1000);
  }

  async searchTutor(query: string) {
    await this.searchInput.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(1000);
    await this.searchInput.fill(query);
    await this.page.keyboard.press('Enter');
    await this.tutorResults.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForTimeout(1000);
  }

  async clearSearch() {
    await this.searchInput.fill('');
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(1000);
  }

  async clickVerMas() {
    await this.verMasButton.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(1000);
    await this.page.waitForTimeout(1000);
  }

  async clickRedesInformaticas() {
    await this.redesInformaticasButton.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(1000);
    await this.redesInformaticasButton.click();
    await this.page.waitForTimeout(1000);
  }

  async validateResultsContain(query: string) {
    const tutorNames = await this.tutorResults.allTextContents();
    const filteredNames = tutorNames.filter(name =>
      name.toLowerCase().includes(query.toLowerCase().trim())
    );
    expect(filteredNames.length).toBeGreaterThan(0);
    console.log('Resultados encontrados:', filteredNames);
    await this.page.waitForTimeout(1000);
  }

  async validateTutorsForRedesInformaticas() {
    const results = await this.page.locator(
      'div.bg-blue-light.dark\\:bg-blue-dark.font-bold.text-white'
    );
    const resultsText = await results.allTextContents();
    const filteredResults = resultsText.filter(text => text.includes('REDES INFORMATICAS'));
    expect(filteredResults.length).toBeGreaterThan(0);
    console.log('Resultados para "REDES INFORMATICAS":', filteredResults);
    await this.page.waitForTimeout(1000);
  }
}
