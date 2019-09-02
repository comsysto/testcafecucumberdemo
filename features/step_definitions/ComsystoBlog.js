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

Given('User wants to verify homepage', function () {
  const parameters = this.parameters;

  return this.waitForTestController().then(function (tc) {
    testController = tc;

    return testController
      .navigateTo(parameters.zemogaUrl);
  });
});

When('she clicks the Blog post link', function () {
  const blogButton = page.home.blogButton.with({ boundTestRun: testController }).withText('Blog');

  return testController
    .click(blogButton);
});

Then('she should see the list of all blog posts', function () {
  const htmlBlogListExists = page.blog.frame.with({ boundTestRun: testController }).exists;

  return testController
    .expect(htmlBlogListExists).ok();
});

Given('Ana is on the list of all Comsysto Reply blog posts', function () {
  const parameters = this.parameters;
  const blogButton = page.home.blogButton.with({ boundTestRun: testController }).withText('Blog');

  return this.waitForTestController().then(function (tc) {
    testController = tc;

    return testController
      .navigateTo(parameters.zemogaUrl)
      .click(blogButton);
  });
});

When('she clicks the Open Nebula blog post', function () {
  const link = page.blog.link.with({ boundTestRun: testController }).withText('PRIVATE CLOUD INFRASTRUCTURE WITH OPENNEBULA');

  return testController
    .click(link);
});

Then('she should see the Open Nebula blog post', function () {
  const blogContent = page.blog.frame.with({ boundTestRun: testController }).exists;

  const getLocation = getWindowLocation.with({ boundTestRun: testController });
  getLocation().then(function (locationData) {

    return testController
      .expect(blogContent).ok()
      .expect(locationData.href).contains("private-cloud-infrastructure-with-opennebula");
  });

});
