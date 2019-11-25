Feature: Comsysto Reply job application
  As Ana I want to submit an application for a job at Comsysto Reply

  Scenario: Data engineer job application
    Given Ana wants to apply for a job at Comsysto Reply
    When she arrives to the job post area
    Then she should choose the data engineer job post
    When she arrives on the data engineer job overview
    Then she should activate the input form for the job

  Scenario: Data engineer job application form fill
    Given Ana is on on the data engineer job input form
    When she enters the required fields
    Then she accepts the terms and conditions

  Scenario: Submit job application
    Given Ana has entered all the required data
    When she clicks on the submit button
    Then she should navigate to the success page