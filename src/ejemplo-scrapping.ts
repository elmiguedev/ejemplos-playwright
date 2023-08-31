import { chromium } from "playwright";

const init = async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://eldoce.tv");
  await page.locator('#close').click();

  const notas = await page.locator(".nota-box");
  const elementos = await notas.all();

  const articulos: any[] = [];

  await Promise.all(elementos.map(async (elemento) => {
    const tipo = await elemento.locator("div.cintillo>div").first().allInnerTexts();
    const titulo = await elemento.locator("h2").textContent();
    const descripcion = await elemento.locator("h3").textContent();
    const articulo = {
      tipo: tipo[0],
      titulo,
      descripcion
    };

    if (articulo.tipo)
      articulos.push(articulo);
  }));

  console.log(articulos);
  await browser.close();

}

init();