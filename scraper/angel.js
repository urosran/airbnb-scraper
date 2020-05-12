// const pptr = require('puppeteer-core');

const pptr_full = require("puppeteer");
(async () => {
  const browser = await pptr_full.launch({
    executablePath:
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    headless: false
  });

  const page = await browser.newPage();
  let URL = "https://angel.co/companies?locations[]=1620-Boston";
  await page.goto(URL, {
    waitUntil: "networkidle0"
  });

  console.log(page.url());
  for (i = 1; i <= 10; i++) {
    await page.click(".more", {
      waitUntil: "networkidle0"
    });
  }
 // await page.evaluate(()=>{
  //     let items = document.querySelector('#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results').innerHTML
  //     console.log(items)
  //
  // })

  let result = await page.$$eval(
    ".name",
    names => names.map(name => name.textContent),
    { waitUntil: "networkidle0" }
  );
  console.log(result);
})();
