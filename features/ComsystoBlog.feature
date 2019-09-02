Feature: Comsysto Reply blog posts
  As User I want to explore zemoga webpage

  Scenario: View all homepage
    Given User wants to verify homepage
    When she clicks the Blog post link
    Then she should see the list of all blog posts

  Scenario: View jobs oportunities
    Given User wants to verify jobs oportunities
    When clicks the Open Nebula blog post
    Then it should see the Open Nebula blog post

  Scenario: View TestCafe blog post
    Given Ana is on the list of all Comsysto Reply blog posts
    When  clicks the TestCafe blog post
    Then it should see the TestCafe blog post