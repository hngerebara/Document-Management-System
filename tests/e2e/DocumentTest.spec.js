const config = require('../../nightwatch.json');
require('dotenv').config();

module.exports = {
  'User should be able to see all documents after login': (browser) => {
    browser
      .resizeWindow(1280, 800)
      .url('http://localhost:8080/checkin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', process.env.ADMIN_EMAIL)
      .setValue('input[name=password]', process.env.ADMIN_PASSWORD)
      .click('button[id="hopez-save"]')
      .waitForElementVisible('.toast', 3000)
      .assert.containsText('.toast', 'Successfully logged in')
      .assert.urlEquals('http://localhost:8080/documents')
      .waitForElementVisible('.card.small', 3000)
      .assert.elementPresent('.card.small');
  },
  'User should be able to search for documents': (browser) => {
    browser
    .resizeWindow(1280, 800)
      .waitForElementVisible('#search-input', 3000)
      .click('#search-input')
      .setValue('input[id=search-input]', 'hello')
      .pause(5000)
      .waitForElementVisible('.card.small', 3000)
      .assert.elementPresent('.card.small')
      .waitForElementVisible('#search-btn', 3000)
      .click('#search-btn');
  },
  'User should be able to create documents': (browser) => {
    browser
      .click('#createdocument')
      .waitForElementVisible('form', 3000)
      .assert.urlEquals('http://localhost:8080/documents/new')
      .waitForElementVisible('iframe', 3000)
      .setValue('input[name=documentName]', 'Test document e2e')
      .assert.value('input', 'Test document e2e')
      .setValue('input[name=description]', 'Description for test Document e2e')
      .assert.value(
        'input[name=description]',
        'Description for test Document e2e'
      )
      .click('select[name=access] option[value=public]')
      .assert.value('select', 'public')
      .waitForElementVisible('iframe', 3000)
      .frame(0)
      .setValue('.mce-content-body', 'dfdfdfdffdfdfdfdfsfdsfsfsdfsdfdfdfdfdfdfdfdfdfdf')
      .frame(null)
      .click('button[type=submit]')
      .waitForElementVisible('.toast', 3000)
      .assert.containsText('.toast', 'Document saved');
  },
  'User should be able to edit documents': (browser) => {
    browser
    .resizeWindow(1280, 800)
      .waitForElementVisible('body', 5000)
      .click('a#user-document')
      .waitForElementVisible('a#view-link', 5000)
      .click('a#view-link')
      .waitForElementVisible('#modal1', 5000)
      .click('#view-edit')
      .waitForElementVisible('input[name=documentName]', 2000)
      .setValue('input[name=documentName]', ' modified')
      .assert.value('input[name=documentName]',
      'Test document e2e modified')
      .waitForElementVisible('input[name=description]', 5000)
      .setValue('input[name=description]', ' modified')
      .click('select[name=access] option[value=private]')
      .assert.value('select', 'private')
      .waitForElementVisible('iframe', 2000)
      .frame(0)
      .setValue('.mce-content-body', 'modified document')
      .frame(null)
      .click('button[type=submit]')
      .waitForElementVisible('.toast', 3000)
      .assert.containsText('.toast', 'Document saved');
  },
  'User should be able to delete documents': (browser) => {
    browser
    .resizeWindow(1280, 800)
      .waitForElementVisible('body', 5000)
      .click('a#user-document')
      .waitForElementVisible('a#delete-link', 5000)
      .click('a#delete-link')
      .waitForElementVisible('.toast', 3000)
      .assert.containsText('.toast', 'You have succesfully deleted this document')
      .end();
  }
};
