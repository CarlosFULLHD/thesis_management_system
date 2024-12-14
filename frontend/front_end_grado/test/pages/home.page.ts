import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly sidebarTutoresButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebarTutoresButton = page.locator('#\\:r6\\: > div > button:nth-child(4)');
  }

  async goto() {
    await this.page.goto('/');
  }

  async navigateToTutores() {
    await this.sidebarTutoresButton.waitFor({ state: 'visible' });
    await this.sidebarTutoresButton.click();
    await expect(this.page).toHaveURL(/.*\/tutors/);
    const tutoresPageTitle = this.page.locator('h1.text-center.bg-clip-text:has-text("Tutores U.C.B.")');
    await expect(tutoresPageTitle).toBeVisible({ timeout: 10000 });
  }
}
