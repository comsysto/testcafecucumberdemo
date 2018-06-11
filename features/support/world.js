var { setWorldConstructor } = require('cucumber');
const testControllerHolder = require('./testControllerHolder');

function CustomWorld({ parameters }) {
    this.waitForTestController = testControllerHolder.get;
    this.parameters = parameters;
}

setWorldConstructor(CustomWorld);