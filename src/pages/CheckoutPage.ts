import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  private billingContinueButton = () => this.page.locator("input[onclick='Billing.save()']");
  private shippingContinueButton = () => this.page.locator("input[onclick='Shipping.save()']");
  private shippingMethodContinueButton = () => this.page.locator("input[onclick='ShippingMethod.save()']");
  private cashOnDeliveryRadio = () => this.page.locator("input[value='Payments.CashOnDelivery']");
  private paymentMethodContinueButton = () => this.page.locator("input[onclick='PaymentMethod.save()']");
  private paymentInfoContinueButton = () => this.page.locator("input[onclick='PaymentInfo.save()']");
  private confirmOrderButton = () => this.page.locator("input[onclick='ConfirmOrder.save()']");
  private orderCompleteContinueButton = () => this.page.locator("input[onclick=\"setLocation('/')\"]");

  async continueBilling(): Promise<void> {
    await this.billingContinueButton().click();
  }

  async continueShipping(): Promise<void> {
    await this.shippingContinueButton().click();
  }

  async continueShippingMethod(): Promise<void> {
    await this.shippingMethodContinueButton().click();
  }

  async selectCashOnDelivery(): Promise<void> {
    if (!(await this.cashOnDeliveryRadio().isChecked())) {
      await this.cashOnDeliveryRadio().check();
    }
  }

  async continuePaymentMethod(): Promise<void> {
    await this.paymentMethodContinueButton().click();
  }

  async continuePaymentInfo(): Promise<void> {
    await this.paymentInfoContinueButton().click();
  }

  async confirmOrder(): Promise<void> {
    await this.confirmOrderButton().click();
  }

  async continueAfterOrderComplete(): Promise<void> {
    await this.orderCompleteContinueButton().click();
  }

  /** Runs the full checkout wizard end to end (mirrors the sequential steps in validloginPOM.java). */
  async completeCheckout(): Promise<void> {
    await this.continueBilling();
    await this.continueShipping();
    await this.continueShippingMethod();
    await this.selectCashOnDelivery();
    await this.continuePaymentMethod();
    await this.continuePaymentInfo();
    await this.confirmOrder();
    await this.continueAfterOrderComplete();
  }
}
