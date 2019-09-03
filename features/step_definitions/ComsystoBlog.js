const { Given, When, Then } = require('cucumber');
const { ClientFunction } = require('testcafe');
const Page = require('./pageObjects/ComsystoBlog');
const page = new Page();
let testController = null;

const getWindowLocation = ClientFunction(function () {
  return window.location
});

/*
In this section we are testing the Comsysto Reply web page.
 */

Given('User wants to verify free trial', function () {
  const parameters = this.parameters;

  return this.waitForTestController().then(function (tc) {
    testController = tc;

    return testController
      .navigateTo(parameters.zemogaUrl);
  });
});

When('he clicks on free trial', function () {
  const freeTrialButton = page.home.freeTrialButton.with({ boundTestRun: testController }).withText('Start Free Trial');

  return testController
    .click(freeTrialButton);
});

Then('it enters zip code', function () {
  const inputZipCode = page.blog.zipCode.with({ boundTestRun: testController });
  const buttonZipContinue = page.blog.zipButton.with({ boundTestRun: testController });
  return testController
    .typeText(inputZipCode,'10001')
    .click(buttonZipContinue)
});


Then('he should see the plans', function () {
  const planPage = page.blog.plans.with({ boundTestRun: testController });

  return testController
    .expect(planPage).ok('Plan page is being opened')
});