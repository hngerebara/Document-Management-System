const config = require('../../nightwatch.json');

module.exports = {
  'User should be able to edit their profile': (browser) => {
    browser
      .resizeWindow(1280, 800)
      .url('http://localhost:8080/checkin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'hello2@hopez.com')
      .setValue('input[name=password]', 'password')
      .click('button[id="hopez-save"]')
      .pause(5000)
      .assert.urlEquals('http://localhost:8080/documents')
      .pause(1000)
      .waitForElementVisible('#edit-profile', 3000)
      .click('#edit-profile')
      .setValue('input[name="firstName"]', ' Editted')
      .setValue('input[name="lastName"]', ' Editted')
      .assert.value('input[name="firstName"]', 'Hope Editted')
      .assert.value('input[name="lastName"]', 'Ngerebara Editted')
      .click('button[id=edit]')
      .pause(2000)
      .end();
  },
};
