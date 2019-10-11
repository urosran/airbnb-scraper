// const puppeteer = require('puppeteer');


const pptr = require('puppeteer-core');
(async () => {
  const browser = await pptr.launch({
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  });

  const page = await browser.newPage();
await page.goto('https://www.airbnb.com/');
console.log(page.url())
})();

// (async () => {
//     // OPTION 1 - Launch new.
//     // const browser = await puppeteer.launch({
//     //     headless: false // Puppeteer is 'headless' by default.
//     // });

//     // OPTION 2 - Connect to existing.
//     // MAC: /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')
//     // PC: start chrome.exe –remote-debugging-port=9222
//     // Note: this url changes each time the command is run.
//     // get the below from http://127.0.0.1:9222/json
//     const wsChromeEndpointUrl = "ws://127.0.0.1:9222/devtools/page/CC0A1DA4-29B7-4898-BD15-646E1C352833";
//     const wsChromeEndpointUrl = 'ws://127.0.0.1:9222/devtools/page/FFF78579-EE01-4D0B-B2EA-21B631B0BC99';
//     console.log("reached")
    
//     const browser = await puppeteer.connect({
//         browserWSEndpoint: wsChromeEndpointUrl,
//     });
    
//     console.log("reached")
//     const page = await browser.newPage();
//     // let pageUrl = 'https://caniuse.com/';
//     await page.goto('https://www.airbnb.com/s/Belgrade/homes');
//     console.log("reached")
//     // await page.goto(pageUrl)
//     // , {
//     //     waitUntil: 'networkidle0' // 'networkidle0' is very useful for SPAs.
//     // });
// })();