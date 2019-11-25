const { Given, When, Then } = require('cucumber');
const { Selector } = require('testcafe');
let testController = null;

// FEATURE 1 BEGIN
Given('Ana wants to apply for a job at Comsysto Reply', callback => {
  callback(null, 'passed');
});

When('she arrives to the job post area', function() {
  return this.waitForTestController().then(function(tc) {
    testController = tc;
    return testController.navigateTo('https://comsystoreply.de/karriere/jobs');
  });
});

Then('she should choose the data engineer job post', async function() {
  const dataEngineerPostElement = Selector('.card-content').nth(1);
  await testController.click(dataEngineerPostElement);
});

When('she arrives on the data engineer job overview', async function() {
  // check if ok here
  const mainHeading = Selector('h1').with({ boundTestRun: testController });
  await testController
    .expect(mainHeading.textContent)
    .contains('Data Engineer (m|w)');
});

Then('she should activate the input form for the job', async function() {
  const applyNowButton = Selector('.btn-centered')
    .child()
    .nth(0);
  await testController.click(applyNowButton);
});
// FEATURE 1 END

// FEATURE 2 BEGIN
Given('Ana is on on the data engineer job input form', callback => {
  callback(null, 'passed');
});

When('she enters the required fields', async function() {
  const email = Selector('#fo_email');
  const firstName = Selector('#fo_firstname');
  const lastName = Selector('#fo_lastname');
  const greeting = Selector('#fo_greeting');

  await testController
    .typeText(email, 't.gajsak@reply.de')
    .typeText(firstName, 'Tommy')
    .typeText(lastName, 'Gajsak')
    .typeText(greeting, 'something to write here');
});

Then('she accepts the terms and conditions', async function() {
  const acceptTermsButton = Selector('.fo-form__checkbox-custom-label')
    .child()
    .nth(0);
  await testController.click(acceptTermsButton);
});
// FEATURE 2 END

//FEATURE 3 BEGIN
Given('Ana has entered all the required data', callback => {
  callback(null, 'passed');
});

When('she clicks on the submit button', async function() {
  const submitInputFormButton = Selector('#test-submit-button');
  await testController.click(submitInputFormButton);
});

Then('she should navigate to the success page', async function() {
  const mainHeading = Selector('h1').with({ boundTestRun: testController });

  await testController.expect(mainHeading.textContent).contains('bewerben');
  // put 3s of waiting to not end abruptly
  await testController.wait(3000);
});
//FEATURE 3 END
