// const puppeteer = require('puppeteer');

// puppeteer.launch({
//     headless: false,
//     // adding this to try to snap out of the request that never resolves
//     args: [
//         '--disable-setuid-sandbox',
//         '--no-sandbox',
//         '--ignore-certificate-errors',
//     ],
//     ignoreHTTPSErrors: true,
// }).then(async browser => {
//     const page = await browser.newPage();
//     await page.goto('https://airbnb.com/s/belgrade/homes');

//     await page.setRequestInterception(true);
//     page.on('request', interceptedRequest => {
//         if (interceptedRequest.url().includes('https://www.airbnb.com/api/v2/explore_tabs?_format=for_explore_search')) {
//             console.log("A request was made:", interceptedRequest.url())
//             interceptedRequest.continue();
//         }
//     });
//     await page.goto('https://airbnb.com/s/belgrade/homes');

//     await browser.close();
// });

const puppeteer = require('puppeteer');
var fs = require('fs');

const URL = "https://airbnb.com/s/belgrade/homes";

(async () => {
    const browser = await puppeteer.launch({
        args: ['--enable-features=NetworkService'],
        headless: false,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    let page_number = 0
    let next_btn = "#site-content > div > div > div:nth-child(5) > div > div:nth-child(1) > nav > span > div > ul > li._r4n1gzb > a > div"
    
    do  {
        await page.setRequestInterception(true);
        page.on("request", (request) => {
            if (request.resourceType === "Image") {
                console.log(request.url())
                request.abort();
            } else
                request.continue();
        });
        await page.goto(URL, {
            // timeout: 8000,
            waitUntil: "networkidle0"
        });
        const html = await page.content();

        fs.writeFile('./results/page' + page_number + '.html', html, function (err) {
                if (err) throw err;
                console.log('Saved!');
                page_number+=1
        })
        page.click(next_btn, {waitUntil: 'networkidle0'})
    } while (await page.$(next_btn) !== null);
    //   console.log(html);
    //   await page.close();
    //   await browser.close();
})();