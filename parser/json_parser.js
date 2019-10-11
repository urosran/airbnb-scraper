const fs = require("fs");
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

//return all listing IDs from locally stored JSONs
function extractListingIds(pathToJSONfile) {
    let rawdata = fs.readFileSync(pathToJSONfile);
    let json = JSON.parse(rawdata);
    console.log(json);
}

//Loop trough each JSON in a given folder and extract AirBnB listing IDs
let files = _getAllFilesFromFolder("C:\\Users\\urosr\\Apps\\storage\\beograd")
files.forEach(extractListingIds)