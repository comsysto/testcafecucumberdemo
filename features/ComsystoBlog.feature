Feature: Comsysto Reply blog posts
  As Ana I want to view all and specific blog posts

  Scenario: View all blog posts
    Given Ana wants to view the list of all Comsysto Reply blog posts
    When she clicks the Blog post link
    Then she should see the list of all blog posts

  Scenario: View Open Nebula blog post
    Given Ana is on the list of all Comsysto Reply blog posts
    When she clicks the Open Nebula blog post
    Then she should see the Open Nebula blog post

  Scenario: View TestCafe blog post
    Given Ana is on the list of all Comsysto Reply blog posts
    When she clicks the TestCafe blog post
    Then she should see the TestCafe blog post