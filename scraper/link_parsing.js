const puppeteer = require('puppeteer');
var fs = require('fs');
// sample usage for console arguments 
// node link_parsing.js --price_min 20 --price_max 30 --city "belgrade" --checkin "2020-01-20" --checkout "2020-01-26"   
const args = require('minimist')(process.argv.slice(2));
let price_min = 20
let price_max = 30
let city = "belgrade"
let page_number = 0
let section_offset = 4
let items_offset = 0
let checkin = '2020-01-20'
let checkout = '2020-01-26'

if (args.city != undefined) {
    price_min = args.price_min
    price_max = args.price_max
    city = args.city
    checkin = args.checkin
    checkout = args.checkout
}
console.log("Search Criteria: ")
console.log(
    price_min,
    price_max,
    city,
    checkin,
    checkout)
// construct intial URL
let URL = (
    'https://www.airbnb.com/s/' + city + '/homes?refinement_paths%5B%5D=%2Fhomes' +
    '&current_tab_id=home_tab' +
    '&selected_tab_id=home_tab' +
    '&search_type=filter_change' +
    '&screen_size=large' +
    '&hide_dates_and_guests_filters=false' +
    '&place_id=ChIJCYNtxqt6WkcRaN-jmJkN3N8' +
    '&price_max=' + price_max +
    '&price_min=' + price_min +
    '&section_offset=' + section_offset +
    '&items_offset=' + items_offset +
    '&checkin' + '=' + checkin +
    '&checkout' + "=" + checkout)

//accept items offset and move the page to the next
function createNextPage(items_offset_l) {
    return ('https://www.airbnb.com/s/' + city + '/homes?refinement_paths%5B%5D=%2Fhomes' +
        '&current_tab_id=home_tab' +
        '&selected_tab_id=home_tab' +
        '&search_type=filter_change' +
        '&screen_size=large' +
        '&hide_dates_and_guests_filters=false' +
        '&place_id=ChIJCYNtxqt6WkcRaN-jmJkN3N8' +
        '&price_max=' + price_max +
        '&price_min=' + price_min +
        '&section_offset=' + section_offset +
        '&items_offset=' + items_offset_l +
        '&checkin' + '=' + checkin +
        '&checkout' + "=" + checkout)
}

function writeFileJSON(file, extension = ".json") {
    let fileName = '../results/price_range_min_' + price_min + "_max_" + price_max + "_" + page_number + extension
    fs.writeFile(fileName, JSON.stringify(file), function (err) {
        if (err) throw err;
        console.log('Saved to: ' + fileName);
    })
    page_number++;
}

(async () => {
    //general setup
    const browser = await puppeteer.launch({
        //some attributes to allow for request interceptions if needed 
        args: ['--enable-features=NetworkService'],
        headless: true,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    //go to page url and wait until it fully loads
    await page.goto(URL, {
        waitUntil: "networkidle0"
    });

    //get listings from JSON object selector
    let JSONlistings = await page.evaluate(() => {
        return JSON.parse(document.querySelector("#data-state").innerText);
    });
    // if the first page is empty 
    if (JSONlistings.bootstrapData.reduxData.exploreTab.response.explore_tabs[0].home_tab_metadata.remarketing_ids.length != 0) {
        //write JSON to the disk
        writeFileJSON(file = JSONlistings, extension = ".json")
    }

    console.log("number of listings on the first page:",
        JSONlistings.bootstrapData.reduxData.exploreTab.response.explore_tabs[0].home_tab_metadata.remarketing_ids.length)

    // check if there is only one page (default 18 listings per page sometimes 17)
    if (JSONlistings.bootstrapData.reduxData.exploreTab.response.explore_tabs[0].home_tab_metadata.remarketing_ids.length >= 17) {
        //loop trough the pages 2 to 17 by changing item offset
        for (i = 1; i <= 17; i++) {
            //create a new URL by changing offset
            URL = createNextPage(i * 18)
            //visit URL
            await page.goto(URL, {
                waitUntil: "networkidle0"
            });
            //get the listings from the new page
            JSONlistings = await page.evaluate(() => {
                return JSON.parse(document.querySelector("#data-state").innerText);
            });
            //if you put random offset that airbnb does not have the listings 
            // check if the number of listing is less than 17 to know if it's the last page
            console.log(JSONlistings.bootstrapData.reduxData.exploreTab.response.explore_tabs[0].home_tab_metadata.remarketing_ids.length, "json listing pg2")
            if (JSONlistings.bootstrapData.reduxData.exploreTab.response.explore_tabs[0].home_tab_metadata.remarketing_ids.length < 17) {
                writeFileJSON(JSONlistings)
                break
            }else{
                writeFileJSON(JSONlistings)
            }
        }
    }
    await browser.close()
})();