import { chromium, Locator } from "playwright";

const getArticle = async (article: Locator) => {
  const type = await article.locator("div.cintillo>div").first().allInnerTexts();
  const title = await article.locator("h2").textContent();
  const description = await article.locator("h3").textContent();
  return {
    type: type[0],
    title,
    description
  }
}

const init = async () => {
  const url = "https://eldoce.tv";
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(url);
  await page.locator('#close').click();

  const articlesLocators = await page.locator(".nota-box").all();
  const articles: any[] = [];

  await Promise.all(articlesLocators.map(async (articleLocator) => {
    const article = await getArticle(articleLocator);
    if (article.type)
      articles.push(article);
  }));

  console.log(articles);
  await browser.close();
}

init();