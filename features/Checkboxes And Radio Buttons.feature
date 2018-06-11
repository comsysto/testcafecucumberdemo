Feature: As Peter Parker I want to check out the TestCafe Example page
  I want to count the checkboxes and radio buttons and try out the "I have tried TestCafe"

  Scenario: How many checkboxes are there?

    Given Peter is on the TestCafe Example page

    Then there should be at least 6 checkboxes on the page
    And there should be at most 3 radio buttons on the page


  Scenario: Have I tried TestCafe?

    Given The "I have tried TestCafe" checkbox is not checked

    When Peter clicks the "I have tried TestCafe" checkbox
    Then the "I have tried TestCafe" should be checked
