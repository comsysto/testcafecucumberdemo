Feature: Peter asks him self, am I Peter Parker?
 He wishes to type in his name and after that he needs to be presented a valid opinion
	upon the entered data.

	Scenario Outline: Am I Peter Parker?

		Given Peter is on the TestCafe Example page

		When He types his <Name> in the name input filed

		Then name input filed should contain "This must fail"
		And should not contain "Potter"


		Examples:

			| Name 			 |
			| "Peter Parker" |