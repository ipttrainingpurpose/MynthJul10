import { Page } from '@playwright/test';
import { config } from '../config/env';

export class LoginPage {
  constructor(private page: Page) {}

  private emailField = () => this.page.locator('#Email');
  private passwordField = () => this.page.locator('#Password');
  private loginButton = () => this.page.locator("input[value='Log in']");

  async open(): Promise<void> {
    await this.page.goto(`${config.baseUrl}/login`);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailField().fill(email);
    await this.passwordField().fill(password);
    await this.loginButton().click();
  }
}
