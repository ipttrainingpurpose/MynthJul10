import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  private countryDropdown = () => this.page.locator('#CountryId');
  private zipCodeField = () => this.page.locator('#ZipPostalCode');
  private termsCheckbox = () => this.page.locator('#termsofservice');
  private checkoutButton = () => this.page.locator('#checkout, button[name="checkout"]');

  async selectCountry(countryName: string): Promise<void> {
    await this.countryDropdown().scrollIntoViewIfNeeded();
    await this.countryDropdown().selectOption({ label: countryName });
  }

  async enterZipCode(zipCode: string): Promise<void> {
    await this.zipCodeField().fill(zipCode);
  }

  async agreeToTermsOfService(): Promise<void> {
    if (!(await this.termsCheckbox().isChecked())) {
      await this.termsCheckbox().check();
    }
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton().first().click();
  }

  async proceedToCheckout(country: string, zipCode: string): Promise<void> {
    await this.selectCountry(country);
    await this.enterZipCode(zipCode);
    await this.agreeToTermsOfService();
    await this.clickCheckout();
  }
}
