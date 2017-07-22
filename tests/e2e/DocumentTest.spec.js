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
      .waitForElementVisible('.card.small', 5000)
      .assert.elementPresent('.card.small')
      .pause(10000)
      .assert.elementNotPresent('.toast');
  },
  'User should be able to create documents': (browser) => {
    browser
      .click('#createdocument')
      .waitForElementVisible('form', 5000)
      .assert.urlEquals('http://localhost:8080/documents/new')
      .waitForElementVisible('iframe', 5000)
      .assert.elementPresent('input[name=documentName]')
      .assert.elementPresent('input[name=description]')
      .setValue('input[name=documentName]', 'Test document E2e')
      .assert.value('input[name=documentName]', 'Test document E2e')
      .setValue('input[name=description]', 'Description for test Document e2e')
      .assert.value(
        'input[name=description]',
        'Description for test Document e2e'
      )
      .click('select[name=access] option[value=public]')
      .assert.value('select', 'public')
      .waitForElementVisible('iframe', 5000)
      .frame(0)
      .setValue('.mce-content-body', 'test content for e2e')
      .frame(null)
      .waitForElementVisible('button[type=submit]', 5000)
      .click('button[type=submit]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Document saved')
      .assert.urlEquals('http://localhost:8080/documents')
      .waitForElementVisible('#document-list', 5000)
      .assert.containsText('#document-list :first-child .card-title',
      'Test Document E2e');
  },
  'User should be able to search for documents': (browser) => {
    browser
    .resizeWindow(1280, 800)
      .waitForElementVisible('#search-input', 5000)
      .click('#search-input')
      .setValue('input[id=search-input]', 'helloTest')
      .waitForElementVisible('.card.small', 5000)
      .assert.elementPresent('.card.small')
      .waitForElementVisible('#document-list', 2000)
      .assert.containsText('#document-list :first-child .card-title',
      'helloTest')
      .waitForElementVisible('#search-btn', 3000)
      .click('#search-btn')
      .waitForElementNotPresent('#search-btn', 1000);
  },
  'User should be able to edit documents': (browser) => {
    browser
    .resizeWindow(1280, 800)
      .waitForElementVisible('body', 5000)
      .click('a#user-document')
      .waitForElementVisible('a#view-link', 5000)
      .click('a#view-link')
      .waitForElementVisible('#modal1', 5000)
      .assert.containsText('.modal-content h4',
      'Test document E2e')
      .assert.containsText('.modal-content p',
      'Description for test Document e2e')
      .click('#view-edit')
      .waitForElementVisible('input[name=documentName]', 5000)
      .setValue('input[name=documentName]', ' modified')
      .assert.value('input[name=documentName]',
      'Test document E2e modified')
      .waitForElementVisible('input[name=description]', 5000)
      .setValue('input[name=description]', ' modified')
      .assert.value('input[name=description]',
      'Description for test Document e2e modified')
      .click('select[name=access] option[value=private]')
      .assert.value('select', 'private')
      .waitForElementVisible('iframe', 5000)
      .frame(0)
      .setValue('.mce-content-body', 'modified document')
      .frame(null)
      .click('button[type=submit]')
      .waitForElementVisible('.toast', 3000)
      .assert.containsText('.toast', 'Document saved')
      .assert.urlEquals('http://localhost:8080/users/1/documents')
      .waitForElementVisible('#userdocument-list', 2000)
      .assert.containsText('#userdocument-list .card-title',
      'Test Document E2e modified');
  },
  'User should be able to delete documents': (browser) => {
    browser
    .resizeWindow(1280, 800)
      .waitForElementVisible('body', 5000)
      .click('a#user-document')
      .assert.urlEquals('http://localhost:8080/users/1/documents')
      .waitForElementVisible('#userdocument-list', 2000)
      .waitForElementVisible('.card.small', 3000)
      .assert.elementPresent('.card.small')
      .assert.containsText('#userdocument-list :first-child .card-title',
      'Test')
      .waitForElementVisible('a#delete-link', 5000)
      .click('a#delete-link')
      .waitForElementVisible('.toast', 3000)
      .assert.containsText('.toast', 'You have succesfully deleted this document')
      .end();
  }
};
