const { BeforeAll, AfterAll, setDefaultTimeout } = require('cucumber');
const fs = require('fs');
const createTestCafe = require('testcafe');
const qrcode = require('qrcode-terminal');
const testControllerHolder = require('../support/testControllerHolder');

let testcafe = null;
let runner = null;
let DELAY = 5000;

/**
 * Defines how long will TestCafe wait for the remote browser to kick in.
 * For more details: https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/timeouts.md
 */
setDefaultTimeout(60000);

/**
 * TestCafe needs default structure and since we are using cucumber-js, we need to create it on the fly programmatically. After all the tests have run, the test.js will be deleted.
 */
function createTestFile() {
    fs.writeFileSync('test.js',
        'import testControllerHolder from "./features/support/testControllerHolder.js";\n\n' +

        'fixture("fixture")\n' +

        'test("test", testControllerHolder.capture);');
}

/**
 * Runs tests on the host machine.
 *
 * @param {array} browsers list of browsers, e.g. ['chrome']
 * @param {Object} tcOptions options that can be passed to TestCafe. For more details see http://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/runner.html#run
 */
function runTest(browsers, tcOptions) {

    createTestCafe('localhost', 1337, 1338)
        .then(function (tc) {
            testcafe = tc;
            runner = tc.createRunner();

            return runner
                .src('./test.js')
                .browsers(browsers)
                .screenshots('reports/screenshots', true)
                .run(tcOptions)
                .catch(function (error) {
                    console.log(error);
                });
        })
        .then(function (report) {
            console.log(report);
        });
}

/**
 * Exposes url which can be used as entry point for any machine that has access to the machine where tests are running (even mobile device!).
 *
 * @param {Object} tcOptions options that can be passed to TestCafe. For more details see http://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/runner.html#run
 */
function runRemoteTest(tcOptions) {

    createTestCafe('', 42186, 42187)
        .then(function (tc) {
            testcafe = tc;
            runner = testcafe.createRunner();

            return testcafe.createBrowserConnection();
        })
        .then(remoteConnection => {
            /**
             * Outputs remoteConnection.url so that it can be visited from the remote browser.
             */
            console.log(remoteConnection.url);
            qrcode.generate(remoteConnection.url);

            remoteConnection.once('ready', () => {
                runner
                    .src('test.js')
                    .browsers(remoteConnection)
                    .run(tcOptions)
                    .then(failedCount => {
                        console.log(failedCount);
                        testcafe.close();
                    });
            });
        });
}

BeforeAll(function (callback) {
    createTestFile();

    // TODO move config to json file if possible?
    const parameters = JSON.parse(this.process.argv[3]);
    const tcOptions = parameters.options || {};
    const browsers = parameters.browsers || 'chrome';
    tcOptions.remote ? runRemoteTest(tcOptions) : runTest(browsers, parameters);
    setTimeout(callback, DELAY);
});

AfterAll(function (callback) {
    testControllerHolder.free();
    fs.unlinkSync('test.js');
    testcafe.close();
    setTimeout(callback, DELAY);
});
