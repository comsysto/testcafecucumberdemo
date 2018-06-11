Feature: The comment area is blank when first loaded.
  As Peter Parker I want to write a comment to the TestCafe team.

  Scenario: What do you think?

    Given The comment area is blank

    When Peter types "Super!" in the comment area
    Then there should not be "Super" visible as typed text
