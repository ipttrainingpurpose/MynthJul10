const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html-report',
  metadata: {
    browser: {
      name: process.env.BROWSER || 'chromium',
      version: 'latest'
    },
    device: 'Local test machine',
    platform: {
      name: process.platform,
      version: process.version
    }
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'Demo Web Shop - Playwright + Cucumber' },
      { label: 'Execution Start Time', value: new Date().toISOString() }
    ]
  }
});
