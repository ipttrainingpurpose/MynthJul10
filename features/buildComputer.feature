Feature: Build Your Own Computer - Add to Cart and Checkout
  As a logged-in customer
  I want to configure a custom computer and purchase it
  So that I can complete an order on Demo Web Shop

  Background:
    Given I am on the Demo Web Shop login page
    When I log in with valid credentials
    And I navigate to the "Build your own expensive computer" product page

  Scenario: Add a configured computer to the cart
    When I configure the computer with Fast processor, 8GB RAM, 400GB HDD and Office software
    And I set the quantity to "2"
    And I add the computer to the cart
    Then the item should be added to the cart successfully

  Scenario Outline: Complete checkout for a configured computer
    When I configure the computer with Fast processor, 8GB RAM, 400GB HDD and Office software
    And I set the quantity to "<quantity>"
    And I add the computer to the cart
    And I go to the shopping cart
    And I set delivery country to "<country>" and zip code "<zipCode>"
    And I proceed to checkout
    And I complete the checkout process with cash on delivery
    Then the order should be placed successfully

    Examples:
      | quantity | country | zipCode |
      | 3        | India   | 600120  |
