const config = require('../../nightwatch.json');
require('dotenv').config();

module.exports = {
  'Admin should be able to login successfully': (browser) => {
    browser
      .resizeWindow(1280, 800)
      .url('http://localhost:8080/checkin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', process.env.ADMIN_EMAIL)
      .setValue('input[name=password]', process.env.ADMIN_PASSWORD)
      .click('button[id="hopez-save"]')
      .pause(5000)
      .assert.urlEquals('http://localhost:8080/documents')
      .pause(2000);
  },
  'User should be able to view all users': (browser) => {
    browser
    .resizeWindow(1280, 800)
    .click('#view-users')
      .waitForElementVisible('#users-list', 3000)
      .assert.urlEquals('http://localhost:8080/users')
      .pause(2000);
  },
  'User should be able to search for users': (browser) => {
    browser
    .resizeWindow(1280, 800)
      .waitForElementVisible('#search-input', 3000)
      .click('#search-input')
      .setValue('input[id=search-input]', 'hope')
      .pause(2000)
      .waitForElementVisible('#search-btn', 1000)
      .click('#search-btn')
      .pause(1000)
      .end();
  },
};
