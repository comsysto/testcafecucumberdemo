var { Given, When, Then } = require('cucumber');

var Selector = require('testcafe').Selector;

var testController = null;

Given('Peter is on the TestCafe Example page', function () {
    const parameters = this.parameters;

    return this.waitForTestController().then(function (tc) {
        testController = tc;

        return testController
            .navigateTo(parameters.exampleUrl);
    });
});

When('He types his {string} in the name input filed', function (name) {
    const htmlInputField = Selector('#developer-name').with({ boundTestRun: testController });
    return testController
        .typeText(htmlInputField, name.toString());
});

Then('name input filed should contain {string}', function (name) {
    const htmlInputField = Selector('#developer-name').with({ boundTestRun: testController });
    return testController
        .expect(htmlInputField.value).contains(name);
});

Then('should not contain {string}', function (name) {
    const htmlInputField = Selector('#developer-name').with({ boundTestRun: testController });
    return testController
        .expect(htmlInputField.value).notContains(name);
});

Then('there should be at least {int} checkboxes on the page', function (cboxnumber) {
    const htmlCheckboxes = Selector('input[type="checkbox"]').with({ boundTestRun: testController });

    return testController
        .expect(htmlCheckboxes.count).gte(cboxnumber, 'there are at least six checkboxes on the page');
});

Then('there should be at most {int} radio buttons on the page', function (rbbtnnumbercallback) {
    const htmlRadioButtons = Selector('input[type="radio"]').with({ boundTestRun: testController });

    return testController
        .expect(htmlRadioButtons.count).lte(rbbtnnumbercallback, 'there are at most three radio buttons on the page');
});

Given('The {string} checkbox is not checked', function (string) {
    const htmlCheckbox = Selector('#tried-test-cafe').with({ boundTestRun: testController });

    return testController
        .expect(htmlCheckbox.checked).notOk();
});

When('Peter clicks the {string} checkbox', function (string) {
    const htmlCheckbox = Selector('#tried-test-cafe').with({ boundTestRun: testController });

    return testController
        .click(htmlCheckbox);
});

Then('the {string} should be checked', function (string) {
    const htmlCheckbox = Selector('#tried-test-cafe').with({ boundTestRun: testController });

    return testController
        .expect(htmlCheckbox.checked).ok();
});
