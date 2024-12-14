import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { TutoresPage } from '../pages/tutores.page';

test('Buscar tutores y filtrar por Redes Informáticas', async ({ page }) => {
  const homePage = new HomePage(page);
  const tutoresPage = new TutoresPage(page);
  await homePage.goto();
  await homePage.navigateToTutores();
  await tutoresPage.validatePageTitle();
  const searchQuery = 'Tarik';
  await tutoresPage.searchTutor(searchQuery);
  await tutoresPage.validateResultsContain(searchQuery);
  await tutoresPage.clearSearch();
  await tutoresPage.clickVerMas();
  await tutoresPage.clickRedesInformaticas();
  await tutoresPage.validateTutorsForRedesInformaticas();
});
