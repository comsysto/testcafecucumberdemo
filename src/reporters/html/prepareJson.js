var osControl = require('os');
var fsControl = require('fs');
var pathFileNameChrome = "reports/chrome.json";
var pathFileNameFirefox = "reports/firefox.json";
var jsonChrome = require('../../../' + pathFileNameChrome);
var jsonFirefox = require('../../../' + pathFileNameFirefox);
var osName = osControl.platform();
var osRelease = osControl.release();

if (osName === 'darwin') {
    osName = 'osx'
}

var device = 'Local test machine';

var platform = {
    name: osName,
    version: osRelease
};

var firefoxVersion = {
    name: 'firefox',
    version: '60.0.2'
};

var chromeVersion = {
    name: 'chrome',
    version: '67.0.33'
};

var metadataFirefox = {
    browser: firefoxVersion,
    device: device,
    platform: platform
};

var metadataChrome = {
    browser: chromeVersion,
    device: device,
    platform: platform
};

function prepareJson() {

    // TODO improve code
    // TODO improve reporter so it checks the browser version
    // TODO check if TestCafe can inject metadata for cucumberJS report

    for (var i = 0; i < jsonChrome.length; i++) {
        jsonChrome[i].metadata = metadataChrome;
    }

    for (var i = 0; i < jsonFirefox.length; i++) {
        jsonFirefox[i].metadata = metadataFirefox;
    }

    fsControl.writeFile(pathFileNameChrome, JSON.stringify(jsonChrome, null, 2), 'utf-8', function (err) {
        if (err) {
            return console.log(err);
        }
    });

    fsControl.writeFile(pathFileNameFirefox, JSON.stringify(jsonFirefox, null, 2), 'utf-8', function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

prepareJson();
