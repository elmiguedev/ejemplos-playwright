import { chromium } from "playwright";

enum CLOSE_ENCOUNTER_TYPE {
  FIRST_TYPE = "Primer tipo",
  SECOND_TYPE = "Segundo tipo",
  THIRD_TYPE = "Tercer tipo",
}

const getRandomType = () => {
  const values = Object.values(CLOSE_ENCOUNTER_TYPE);
  const index = Math.floor(Math.random() * values.length);
  return values[index] as CLOSE_ENCOUNTER_TYPE;
}

const generateRandomFullName = () => {
  const names = [
    "Tom Delonge",
    "Mark Hoppus",
    "Travis Barker",
    "Matt Skiba",
    "Scott Raynor",
  ]
  const randomNameIndex = Math.floor(Math.random() * names.length);
  return names[randomNameIndex]
}

const init = async () => {
  const url = "https://forms.gle/xR1bQrNDnq3FqHbS6";
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const page = await browser.newPage();

  const alienVictim = {
    name: generateRandomFullName(),
    type: getRandomType(),
  }

  await page.goto(url);
  await page.getByLabel('Nombre del la persona').fill(alienVictim.name);
  await page.getByLabel(alienVictim.type).click();
  await page.getByRole('button', { name: 'Enviar' }).click();
  await page.getByText('Se ha registrado tu respuesta');

  await browser.close();
}

init()