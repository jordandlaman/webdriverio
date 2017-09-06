const Register = require('./Register.page.js');

const register = new Register();

describe('Registration Page', function () {

  // Helper variables for creating test data
  var randVal = Math.floor(Math.random() * 20);
  var dateNow = Date.now()
  // Replace with valid email address & password
  const validFirst = 'WebdriverIO';
  const validLast = 'Test';
  const validEmail = dateNow + '@mailinator.com';
  const validConfirm = dateNow + '@mailinator.com';
  const validPhone = '5555555555';
  const validCompany = 'metaltoad'
  const validVin = '1FUGGLDV3GLZZ2539';

  beforeEach(function() {
    browser.url('./');
  });

  /*it('should look nice', function () {
    var results = browser.checkDocument();

    results.forEach(function (result) {
      expect(result.isWithinMisMatchTolerance).to.equal(true, 'screenshot failure');
    });
  });
  */
  it('should let your register with proper credentials', function () {
    register.register(validFirst, validLast, validEmail, validConfirm, validPhone, validCompany, validVin)

    //ensuring that the phone field auto converts entered value to proper
    var phone = $('input[name="phone"]');
    expect(phone.getAttribute('value')).to.equal('(555) 555-5555');

    //switching to the frame which the recaptcha sits in
    browser.frame(0);

    var recaptcha = $('#recaptcha-anchor');
    recaptcha.click();

    browser.pause(3000);

    browser.frameParent();

    var submit = $('input[value="Next"]');
    submit.click();

    browser.waitUntil(function () {
      return browser.getUrl().includes('/signup/submission/thank-you')
    }, 5000, 'Could not find partial match in url to signup page');

    expect(register.isRegistered()).to.be.true;

    //var results = browser.checkDocument();

    //results.forEach(function (result) {
      //expect(result.isWithinMisMatchTolerance).to.equal(true, 'screenshot failure');
    //});
  });

  it('duplicate signup requests', function () {
    register.register(validFirst, validLast, validEmail, validConfirm, validPhone, validCompany, validVin)

    //ensuring that the phone field auto converts entered value to proper
    var phone = $('input[name="phone"]');
    expect(phone.getAttribute('value')).to.equal('(555) 555-5555');

    //switching to the frame which the recaptcha sits in
    browser.frame(0);

    var recaptcha = $('#recaptcha-anchor');
    recaptcha.click();

    browser.pause(3000);

    browser.frameParent();

    var submit = $('input[value="Next"]');
    submit.click();

    browser.waitUntil(function () {
      return browser.getUrl().includes('/signup-already-in-flight')
    }, 5000, 'Could not find partial match in url to duplicate signup page');

    expect(register.isRegistered()).to.be.false;

    //var results = browser.checkDocument();

    //results.forEach(function (result) {
      //expect(result.isWithinMisMatchTolerance).to.equal(true, 'screenshot failure');
    //});
  });

  it('should error on an invalid email', function () {
    register.register(validFirst, validLast, 'invalid', validConfirm, validPhone, validCompany, validVin);

    //switching to the frame which the recaptcha sits in
    browser.frame(0);

    var recaptcha = $('#recaptcha-anchor');
    recaptcha.click();

    browser.pause(3000);

    browser.frameParent();

    var submit = $('input[value="Next"]');
    submit.click();

    browser.waitUntil(function () {
      return browser.getUrl().includes('/Signup#/signup')
    }, 5000, 'Could not find partial match in url to signup page');

    expect(register.isRegistered()).to.be.false;
  });

  it('should error on missing names', function () {
    register.register('', '', validEmail, validConfirm, validPhone, validCompany, validVin);

    //switching to the frame which the recaptcha sits in
    browser.frame(0);

    var recaptcha = $('#recaptcha-anchor');
    recaptcha.click();

    browser.pause(3000);

    browser.frameParent();

    var submit = $('input[value="Next"]');
    submit.click();

    browser.waitUntil(function () {
      return browser.getUrl().includes('/Signup#/signup')
    }, 5000, 'Could not find partial match in url to signup page');

    expect(register.isRegistered()).to.be.false;

    //var results = browser.checkDocument();

    //results.forEach(function (result) {
      //expect(result.isWithinMisMatchTolerance).to.equal(true, 'screenshot failure');
    //});
  });

  it('should error on mismatched emails', function () {
    register.register(validFirst, validLast, validEmail, validConfirm + randVal, validPhone, validCompany, validVin);

    //switching to the frame which the recaptcha sits in
    browser.frame(0);

    var recaptcha = $('#recaptcha-anchor');
    recaptcha.click();

    browser.pause(3000);

    browser.frameParent();

    var submit = $('input[value="Next"]');
    submit.click();

    browser.waitUntil(function () {
      return browser.getUrl().includes('/Signup#/signup')
    }, 5000, 'Could not find partial match in url to signup page');

    expect(register.isRegistered()).to.be.false;

    //var results = browser.checkDocument();

    //results.forEach(function (result) {
      //expect(result.isWithinMisMatchTolerance).to.equal(true, 'screenshot failure');
    //});
  });

  it('should error invalid vin', function () {
    register.register(validFirst, validLast, validEmail, validConfirm, validPhone, validCompany, validVin);

    var vin = $('input[name="vin"]');
    vin.keys("\uE003" + "\uE003" + randVal);

    //switching to the frame which the recaptcha sits in
    browser.frame(0);

    var recaptcha = $('#recaptcha-anchor');
    recaptcha.click();

    browser.pause(3000);

    browser.frameParent();

    var submit = $('input[value="Next"]');
    submit.click();

    browser.pause(5000)

    browser.waitUntil(function () {
      return browser.getUrl().includes('/vin-not-found')
    }, 5000, 'Could not find partial match in url to the vin not found page');

    expect(register.isRegistered()).to.be.false;

    //var results = browser.checkDocument();

    //results.forEach(function (result) {
      //expect(result.isWithinMisMatchTolerance).to.equal(true, 'screenshot failure');
    //});
  });

  it('should let you go back to homepage', function () {
    register.signUpLink.click();

    browser.back();

    expect(browser.getUrl()).to.not.contain('Signup#/signup');
  });

  it('should have form validation for all fields', function () {
    register.register('', '', '', '', '', '', '');

    var firstNameField = $('input[name="firstName"]');
    firstNameField.click();

    var firstNameError = $('div[ng-messages="userSignUp.firstName.$error"]');
    expect(firstNameError.getText()).to.equal('First name is required.');

    var lastNameError = $('div[ng-messages="userSignUp.lastName.$error"]');
    expect(lastNameError.getText()).to.equal('Last name is required.');

    var emailError = $('div[ng-messages="userSignUp.email.$error"]');
    expect(emailError.getText()).to.equal('Business email is required.');

    var confirmEmailError = $('div[ng-messages="userSignUp.confirmEmail.$error"]');
    expect(confirmEmailError.getText()).to.equal('Business email is required.');

    var phoneError = $('div[ng-messages="userSignUp.phone.$error"]');
    expect(phoneError.getText()).to.equal('Business phone number is required.');

    var companyError = $('div[ng-messages="userSignUp.company.$error"]');
    expect(companyError.getText()).to.equal('Company name is required.');

    var vinError = $('div[ng-messages="userSignUp.vin.$error"]');
    expect(vinError.getText()).to.equal('VIN is required.');
  });
});
