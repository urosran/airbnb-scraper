const puppeteer = require('puppeteer');
const fs = require('fs')
const listingIds = loadJsonWithListings()

function loadJsonWithListings(pathToJSONfile) {
    let rawdata = fs.readFileSync(pathToJSONfile);
    let json = JSON.parse(rawdata);
    return json
}

// listingIds.forEach(emailHosts(item))

(async () => {
    //general setup
    const browser = await puppeteer.launch({
        //some attributes to allow for request interceptions if needed 
        args: ['--enable-features=NetworkService'],
        headless: true,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    // loop over listings and construct a URL based on listing ID
    for (i = 0; i <= listingIds.length; i++) {
        let URL = 'https://www.airbnb.com/rooms/' + listingIds[i]
        //go to the given listing
        await page.goto(URL, {
            waitUntil: "networkidle0"
        });
        //contact host
        await page.click('#details > div > div:nth-child(4) > span > span > a')
        //extract host name
        
        //create the message

        //input the message

        //send the message
    }
    
    await browser.close()
})();