import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || 'https://demowebshop.tricentis.com',
  loginEmail: process.env.LOGIN_EMAIL || '',
  loginPassword: process.env.LOGIN_PASSWORD || '',
  browser: (process.env.BROWSER || 'chromium') as 'chromium' | 'firefox' | 'webkit',
  headless: process.env.HEADLESS ? process.env.HEADLESS === 'false' : true,
  slowMo: process.env.SLOW_MO ? Number(process.env.SLOW_MO) : 0,
  defaultTimeout: 30000
};
