const common = [
  'features/**/*.feature',
  '--require-module ts-node/register',
  '--require src/support/**/*.ts',
  '--require src/step-definitions/**/*.ts',
  '--format progress-bar',
  '--format json:reports/cucumber-report.json',
  '--format html:reports/cucumber-report.html',
  '--format allure-cucumberjs/reporter'
].join(' ');

module.exports = {
  default: common
};
