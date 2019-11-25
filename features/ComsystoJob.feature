Feature: Comsysto Reply job application
  As Ana I want to submit an application for a job at Comsysto Reply

  Scenario: Ana navigates to data engineer job post
    Given Ana is on job post page
    When she clicks on data engineer job post
    Then she should land on "Data Engineer" page

  Scenario: Ana applies for data engineer job
    Given Ana is on data engineer page
    When she clicks on apply now
    And fulfils all fields except Email
    Then appropriate error message is shown
