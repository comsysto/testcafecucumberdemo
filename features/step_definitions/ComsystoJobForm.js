const { Given, When, Then } = require('cucumber');
const { Selector } = require('testcafe');
let testController = null;

// FEATURE 1 BEGIN
Given('Ana is on job post page', function() {
  return this.waitForTestController().then(function(tc) {
    testController = tc;
    return testController.navigateTo('https://comsystoreply.de/karriere/jobs');
  });
});

When('she clicks on data engineer job post', async function() {
  const dataEngineerPostElement = Selector('.card-content').nth(1);
  await testController.click(dataEngineerPostElement);
});

Then('she should land on {string} page', async function(string) {
  const mainHeading = Selector('h1').with({ boundTestRun: testController });
  await testController.expect(mainHeading.textContent).contains(string);
});
// FEATURE 1 END

// FEATURE 2 BEGIN
Given('Ana is on data engineer page', function(callback) {
  callback(null, 'passed');
});

When('she clicks on apply now', async function() {
  const applyNowButton = Selector('.btn-centered')
    .child()
    .nth(0);
  await testController.click(applyNowButton);
});

When('fulfils all fields except Email', async function() {
  const firstName = Selector('#fo_firstname');
  const lastName = Selector('#fo_lastname');
  const greeting = Selector('#fo_greeting');
  const github = Selector('#fo_webprofile');
  const submitInputFormButton = Selector('#test-submit-button');

  const acceptTermsButton = Selector('.fo-form__checkbox-custom-label')
    .child()
    .nth(0);

  await testController
    .typeText(firstName, 'Tommy')
    .typeText(lastName, 'Gajsak')
    .typeText(github, 'https://github.com/gajo4256?tab=repositories')
    .typeText(greeting, 'something to write here');

  await testController.click(acceptTermsButton);
  await testController.click(submitInputFormButton);
});

Then('appropriate error message is shown', async function() {
  const mailErrorField = Selector('.fo-form__field-error ').with({
    boundTestRun: testController
  });
  await testController
    .expect(mailErrorField.textContent)
    .contains('Muss angegeben werden');
  await testController.wait(3000);
});
// FEATURE 2 END
