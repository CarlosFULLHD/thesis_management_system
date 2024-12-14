import { test } from '@playwright/test';
import { formularioRegistroEstudiante } from '../pages/formularioRegistroEstudiante.page';

const generateUniqueData = () => {
  const randomId = Math.floor(Math.random() * 1000000); 
  return {
    ci: `${randomId}`, 
    names: 'Alex Fabricio',
    father_last_name: 'La Fuente',
    mother_last_name: 'Magne',
    email: `user${randomId}@ucb.edu.bo`, 
    phone: `600${randomId.toString().slice(0, 4)}`, 
  };
};

test('Formulario de inscripción estudiante', async ({ page }) => {
  const formRegistroEstudiante = new formularioRegistroEstudiante(page);

  const uniqueData = generateUniqueData();
  await formRegistroEstudiante.navigate();
  await formRegistroEstudiante.fillForm(uniqueData);
  await formRegistroEstudiante.submitForm();
  await formRegistroEstudiante.verifySubmission();
});
