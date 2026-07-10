Feature: Top Menu Navigation
  As a visitor of Demo Web Shop
  I want the top navigation menu to display all category items
  So that I can browse products by category

  Scenario: Verify the top menu items and their count
    Given I am on the Demo Web Shop home page
    When I inspect the top navigation menu
    Then the menu should contain at least 1 item
    And a screenshot of the home page should be captured
