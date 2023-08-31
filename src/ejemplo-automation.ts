import { chromium } from "playwright";
enum TIPO_CONTACTO {
  PRIMER_TIPO = "Primer tipo",
  SEGUNDO_TIPO = "Segundo tipo",
  TERCER_TIPO = "Tercer tipo",
}

const getRandomType = () => {
  const values = Object.values(TIPO_CONTACTO);
  const index = Math.floor(Math.random() * values.length);
  return values[index] as TIPO_CONTACTO;

}



function generateRandomFullName() {
  const firstNames = ['John', 'Mary', 'David', 'Sarah', 'Michael', 'Emily', 'James', 'Emma', 'Christopher', 'Olivia'];
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Miller', 'Anderson', 'Wilson', 'Clark', 'Walker', 'Hall'];
  const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
  const randomLastNameIndex = Math.floor(Math.random() * lastNames.length);
  const randomFirstName = firstNames[randomFirstNameIndex];
  const randomLastName = lastNames[randomLastNameIndex];
  return randomFirstName + ' ' + randomLastName;
}


const init = async () => {
  const url = "https://forms.gle/xR1bQrNDnq3FqHbS6";
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const alienVictim = {
    nombre: generateRandomFullName(),
    tipoContacto: getRandomType(),
  }

  await page.goto(url);
  await page.getByLabel('Nombre del la persona *').fill(alienVictim.nombre);
  await page.getByLabel(alienVictim.tipoContacto).click();
  await page.getByRole('button', { name: 'Enviar' }).click();

  await page.getByText('Se ha registrado tu respuesta');

  await browser.close();
}

init()