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
      .waitForElementVisible('.toast', 3000)
      .assert.containsText('.toast', 'Successfully logged in')
      .assert.urlEquals('http://localhost:8080/documents');
  },
  'Admin should be able to view all users': (browser) => {
    browser
    .resizeWindow(1280, 800)
    .click('#view-users')
      .waitForElementVisible('#users-list', 3000)
      .assert.elementPresent('ul #single-user')
      .assert.urlEquals('http://localhost:8080/users');
  },
  'Admin should be able to search for users': (browser) => {
    browser
    .resizeWindow(1280, 800)
      .waitForElementVisible('#search-input', 3000)
      .click('#search-input')
      .setValue('input[id=search-input]', 'hope')
      .waitForElementVisible('#search-btn', 5000)
      .click('#search-btn')
      .end();
  },
};
