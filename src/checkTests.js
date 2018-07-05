var fs = require('fs');
var jsonpath1 = "./chrome.json";
var jsonpath2 = "./firefox.json";

// fs.readFile('./chrome.json', 'utf8', function(error, data) {
//     var jsonChromeJsonObject = JSON.parse(data);
// });


var jsonChromeData = require('./chrome.json');
// var jsonFirefox = require(jsonpath2);
//var jsonChromeJsonObject = JSON.parse(jsonChromeData);

for (var i = 0; i < jsonChromeData.length; i++) {

    for (var j = 0; j < jsonChromeData[i].elements[0].steps.length; j++) {

        console.log(jsonChromeData[i].elements[0].steps[j].result.status);
        if(jsonChromeData[i].elements[0].steps[j].result.status === 'failed'){
            process.exit(45);
        }
    }

    // console.log(jsonChromeData[i].elements[0].id);
}


// console.log(jsonChromeData[0].description);