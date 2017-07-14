const config = require('../../nightwatch.json');

module.exports = {
  'User should be able to see all documents afetr login': (browser) => {
    browser
      .resizeWindow(1280, 800)
      .url('http://localhost:8080/checkin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'hello2@hopez.com')
      .setValue('input[name=password]', 'password')
      .click('button[id="hopez-save"]')
      .pause(5000)
      .assert.urlEquals('http://localhost:8080/documents')
      .pause(1000);
  },
  'User should be able to search for documents': (browser) => {
    browser
    .resizeWindow(1280, 800)
      .waitForElementVisible('#search-input', 3000)
      .click('#search-input')
      .setValue('input[id=search-input]', 'Test')
      .pause(2000)
      .waitForElementVisible('#search-btn', 1000)
      .click('#search-btn')
      .pause(1000);
  },
  'User should be able to create documents': (browser) => {
    browser
      .click('#createdocument')
      .waitForElementVisible('form', 2000)
      .assert.urlEquals('http://localhost:8080/documents/new')
      .waitForElementVisible('iframe', 2000)
      .setValue('input[name=documentName]', 'Test document e2e')
      .assert.value('input', 'Test document e2e')
      .setValue('input[name=description]', 'Description for test Document e2e')
      .assert.value(
        'input[name=description]',
        'Description for test Document e2e'
      )
      .click('select[name=access] option[value=public]')
      .assert.value('select', 'public')
      .waitForElementVisible('iframe', 2000)
      .frame(0)
       .setValue('.mce-content-body', 'dfdfdfdffdfdfdfdfsfdsfsfsdfsdfdfdfdfdfdfdfdfdfdf')
       .frame(null)
      .click('button[type=submit]')
      .pause(2000);
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
      .assert.value('input', 'Test document e2e modified')
      .waitForElementVisible('input[name=description]', 5000)
      .setValue('input[name=description]', ' modified')
      .click('select[name=access] option[value=private]')
      .assert.value('select', 'private')
      .waitForElementVisible('iframe', 2000)
      .frame(0)
       .setValue('.mce-content-body', 'modified document')
       .frame(null)
      .click('button[type=submit]')
      .pause(2000);
  },
  'User should be able to delete documents': (browser) => {
    browser
    .resizeWindow(1280, 800)
      .waitForElementVisible('body', 5000)
      .click('a#user-document')
       .waitForElementVisible('a#delete-link', 5000)
      .click('a#delete-link')
      .pause(2000)
      .end();
  }
};
