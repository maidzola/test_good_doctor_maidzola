// playwright.config.js
module.exports = {
  testDir: './tests',
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.gooddoctor.co.id/',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
};
