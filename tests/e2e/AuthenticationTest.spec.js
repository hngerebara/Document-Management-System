const config = require('../../nightwatch.json');
const faker = require('faker');
require('dotenv').config();

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
      .assert.containsText('#signupusername span', 'Please enter your username')
      .assert.containsText('#signupemail span', 'Please enter a valid email')
      .assert.containsText('#signuppswd span', 'Please enter your password')
      .setValue('input[name="username"]', 'test')
      .setValue('input[name="firstName"]', 'test')
      .setValue('input[name="lastName"]', 'test')
      .setValue('input[name=email]', 'testing2@gmail.com')
      .setValue('input[name=password]', 'testreal')
      .setValue('input[name=passwordConfirmation]', 'testfake')
      .click('button[type=submit]')
      .assert.containsText('#signupcfpswd span', 'Passwords must match');
  },
  'User can succesfully sign up with correct details': (browser) => {
    browser
      .url('http://localhost:8080/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name="username"]', faker.internet.userName())
      .setValue('input[name="firstName"]', faker.name.firstName())
      .setValue('input[name="lastName"]', faker.name.lastName())
      .setValue('input[name=email]', faker.internet.email())
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordConfirmation]', 'password')
      .click('button[id="hopez-save"]')
      .waitForElementVisible('.toast', 3000)
      .assert.containsText('.toast', 'Signed up succesfully')
      .click('a#signout')
      .waitForElementVisible('.toast', 3000)
      .assert.containsText('.toast', 'You have successfully logged out');
  },
  'User cannot checkin with incorrect details': (browser) => {
    browser
      .url('http://localhost:8080/checkin')
      .setValue('input[name=email]', 'wrong@hopez.com')
      .setValue('input[name=password]', 'password')
      .click('button[type=submit]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Your details are incorrect..Try again');
  },
  'User can succesfully checkin with correct details': (browser) => {
    browser
      .url('http://localhost:8080/checkin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', process.env.ADMIN_EMAIL)
      .setValue('input[name=password]', process.env.ADMIN_PASSWORD)
      .click('button[id="hopez-save"]')
      .waitForElementVisible('.toast', 3000)
      .assert.containsText('.toast', 'Successfully logged in')
      .assert.urlEquals('http://localhost:8080/documents');
  },
  'User can sign out of the application': (browser) => {
    browser
      .url('http://localhost:8080/documents')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('nav', 2000)
      .assert.containsText('nav', 'Hello Admin')
      .assert.attributeEquals('nav', 'className', 'indigo lighten-2')
      .assert.urlEquals(`${'http://localhost:8080/documents'}`)
      .click('a#signout')
      .waitForElementVisible('.toast', 3000)
      .assert.containsText('.toast', 'You have successfully logged out')
      .end();
  }
};
