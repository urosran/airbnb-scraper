const fs = require("fs");
let listingIds = []
let city = undefined
// get all JSON files from a single folder
var _getAllFilesFromFolder = function (dir) {
    var results = [];
    console.log(dir)
    fs.readdirSync(dir).forEach(function (file) {

        file = dir + '/' + file;
        var stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file))
        } else results.push(file);

    });

    return results;
};

function writeFileJSON(file, extension = ".json", city="some_city") {
    console.log(file)
    let fileName = '../results/listingIds_' + city + extension
    fs.writeFile(fileName, JSON.stringify(file), function (err) {
        if (err) throw err;
        console.log('Saved to: ' + fileName);
    })
}
//return all listing IDs from locally stored JSONs
function extractListingIds(pathToJSONfile) {
    let rawdata = fs.readFileSync(pathToJSONfile);
    let json = JSON.parse(rawdata);
    console.log(json.bootstrapData.reduxData.exploreTab.response.explore_tabs[0].home_tab_metadata.remarketing_ids)
    console.log(listingIds)
    listingIds = listingIds.concat(json.bootstrapData.reduxData.exploreTab.response.explore_tabs[0].home_tab_metadata.remarketing_ids)
    console.log(listingIds)
    city = json.bootstrapData.reduxData.exploreTab.response.metadata.query
}

//Loop trough each JSON in a given folder and extract AirBnB listing IDs
let files = _getAllFilesFromFolder("C:\\Users\\urosr\\Apps\\storage\\beograd")
files.forEach(extractListingIds)
writeFileJSON(file=listingIds, city=this.city)