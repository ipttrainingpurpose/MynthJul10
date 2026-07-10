Feature: Login
  As a registered user of Demo Web Shop
  I want to log in with valid credentials
  So that I can access my account and shop

  Scenario: Successful login with valid credentials
    Given I am on the Demo Web Shop login page
    When I log in with valid credentials
    Then I should be logged in successfully
