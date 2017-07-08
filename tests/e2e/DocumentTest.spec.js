const config = require('../../nightwatch.json');

module.exports = {
  'Document tests': (browser) => {
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
      .click('#createdocument')
      .waitForElementVisible('form', 5000)
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
      .click('button[type=submit]')
      .end();
  }
};
