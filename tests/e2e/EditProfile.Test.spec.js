const config = require('../../nightwatch.json');
require('dotenv').config();

module.exports = {
  'User should be able to edit their profile': (browser) => {
    browser
      .resizeWindow(1280, 800)
      .url('http://localhost:8080/checkin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', process.env.ADMIN_EMAIL)
      .setValue('input[name=password]', process.env.ADMIN_PASSWORD)
      .click('button[id="hopez-save"]')
      .pause(5000)
      .assert.urlEquals('http://localhost:8080/documents')
      .pause(1000)
      .waitForElementVisible('#edit-profile', 3000)
      .click('#edit-profile')
      .setValue('input[name="firstName"]', ' Editted')
      .setValue('input[name="lastName"]', ' Editted')
      .assert.value('input[name="firstName"]', 'admin2 Editted')
      .assert.value('input[name="lastName"]', 'admin Editted')
      .click('button[id=edit]')
      .waitForElementVisible('.toast', 3000)
      .assert.containsText('.toast', 'Profile updated successfully')
      .pause(2000)
      .end();
  },
};
