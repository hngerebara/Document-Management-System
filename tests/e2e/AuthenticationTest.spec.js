const config = require('../../nightwatch.json');

module.exports = {
  'Hopeaz DMS Application': (browser) => {
    browser
      .maximizeWindow()
      .url('http://localhost:8080/signup')
      .waitForElementVisible('body', 5000)
      .assert.title('Hopeaz DMS');
  },
  'User cannot signup with incorrect details': (browser) => {
    browser
      .url('http://localhost:8080/signup')
      .setValue('input[name="username"]', '')
      .setValue('input[name="firstName"]', '')
      .setValue('input[name="lastName"]', '')
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .setValue('input[name=passwordConfirmation]', '')
      .click('button[type=submit]')
      .pause(1000);
  },
  'User can succesfully signed up with correct details': (browser) => {
    browser
      .url('http://localhost:8080/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name="username"]', 'hello2')
      .setValue('input[name="firstName"]', 'Hope')
      .setValue('input[name="lastName"]', 'Ngerebara')
      .setValue('input[name=email]', 'hello2@hopez.com')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordConfirmation]', 'password')
      .click('button[id="hopez-save"]')
      .pause(1000);
  },
  'User cannot checkin with incorrect details': (browser) => {
    browser
      .url('http://localhost:8080/checkin')
      .setValue('input[name=email]', 'wrong@hopez.com')
      .setValue('input[name=password]', 'password')
      .click('button[type=submit]')
      .pause(1000);
  },
  'User can succesfully checkin with correct details': (browser) => {
    browser
      .url('http://localhost:8080/checkin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'hello2@hopez.com')
      .setValue('input[name=password]', 'password')
      .click('button[id="hopez-save"]')
      .pause(5000)
      .assert.urlEquals('http://localhost:8080/documents')
      .pause(1000);
  },
  'User can sign out of application': (browser) => {
    browser
      .url('http://localhost:8080/documents')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('nav', 2000)
      .assert.containsText('nav', 'Hello hello2')
      .assert.attributeEquals('nav', 'className', 'indigo lighten-2')
      .assert.urlEquals(`${'http://localhost:8080/documents'}`)
      // .click('header Link[id="signout"]')
      .pause(2000)
      .end();
  }
};
