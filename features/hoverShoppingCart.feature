Feature: Shopping Cart Hover Navigation
  As a logged-in customer
  I want to hover over the "Shopping cart" link and click "Go to cart"
  So that I can view the contents of my cart

  Scenario: Navigate to the cart page via the hover dropdown
    Given I am on the Demo Web Shop login page
    When I log in with valid credentials
    And I navigate to the "Build your own expensive computer" product page
    And I hover over the shopping cart link and click go to cart
    Then I should be navigated to the shopping cart page
