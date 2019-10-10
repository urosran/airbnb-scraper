const puppeteer = require('puppeteer');
let priceLower = 21
let priceUpper = 22

(async () => {
    // OPTION 1 - Launch new.
    // const browser = await puppeteer.launch({
    //     headless: false // Puppeteer is 'headless' by default.
    // });

    // OPTION 2 - Connect to existing.
    // MAC: /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')
    // PC: start chrome.exe –remote-debugging-port=9222
    // Note: this url changes each time the command is run.
    const wsChromeEndpointUrl = 'ws://127.0.0.1:9222/devtools/page/DA2BC6F0-28CC-4157-B455-951E25C941AF';
    const browser = await puppeteer.connect({
        browserWSEndpoint: wsChromeEndpointUrl,
    });

    const page = await browser.newPage();
    // let pageUrl = 'https://caniuse.com/';
    await page.goto('https://www.airbnb.com/s/Belgrade/homes');
    //   await page.$eval('input[id=Koan-magic-carpet-koan-search-bar__input]', el => el.value = 'Belgrade');
    // await page.focus('input[id=Koan-magic-carpet-koan-search-bar__input]');

    // //   await page.focus('Koan-magic-carpet-koan-search-bar__input')
    // await page.keyboard.type('belgrade')
    // await page.keyboard.press(String.fromCharCode(13));
    // await page.keyboard.press(String.fromCharCode(13));
    // page.waitForSelector('#FMP-target > div > div > div > ul > li:nth-child(1) > div > div > a > div > div > div._10ejfg4u > div', {
    //     timeout: 10000
    // })

    // try {
    //     await page.click('#FMP-target > div > div > div > ul > li:nth-child(1) > div > div > a > div > div > div._10ejfg4u > div');
    // } catch (e) {
    //     console.log('didn\'t render the three buttons')
    // }
    // click price button
    // let price_btn = '#site-content > div > div > div:nth-child(2) > div._jlnmn0l > div > div > div > div._ouyf9j > div > div > div > span:nth-child(5) > div > div > div > button'
    // await page.waitForSelector(price_btn, {
    //     timeout: 10000
    // });
    // await page.click(price_btn);
    // // set prices
    // await page.focus('#price_filter_min')
    // await page.keyboard.type(priceLower)
    // await page.focus('#price_filter_max')
    // await page.keyboard.type(priceUpper)
    // await page.click('body > div:nth-child(18) > div > div > div > div > div > div > div._1u1wbu9v > div._egy8rd > button')

    // await browser.close();
})();

// const puppeteer = require('puppeteer');

// (async () => {
//     const browser = await puppeteer.launch({headless: false});
//     const page = await browser.newPage();
//     await page.goto('https://en.wikipedia.org', {waitUntil: 'networkidle2'});

//     await page.waitFor('input[name=search]');

//     // await page.type('input[name=search]', 'Adenosine triphosphate');
//     await page.$eval('input[name=search]', el => el.value = 'Adenosine triphosphate');
//     await page.click('input[type="submit"]');

//     await page.waitForSelector('#mw-content-text');
//     const text = await page.evaluate(() => {
//         const anchor = document.querySelector('#mw-content-text');
//         return anchor.textContent;
//     });
//     console.log(text);
//     // await browser.close();
// })();