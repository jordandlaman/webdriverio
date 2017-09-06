const Login = require('./Login.page.js');

const login = new Login();

describe('Login Page', function () {

  // Replace with valid email address & password
  const validEmail = 'jordan@metaltoad.com';
  const validPass = 'Izilude1234';

  beforeEach(function() {
    // Replace URL with correct login page
    browser.url('./');
  });

  //it('should look nice', function () {
    //let results = browser.checkDocument();

    //results.forEach(function (result) {
      //expect(result.isWithinMisMatchTolerance).to.equal(true, 'screenshot failure');
    //});
  //})

  it('should let you login with valid credentials', function () {

    login.login(validEmail, validPass);

    browser.waitUntil(function () {
      return browser.getUrl().includes('Portal#/vehicles')
    }, 5000, 'Could not find partial match in url to Portal#/vehicles');

    expect(login.isLoggedIn()).to.be.true;
  });

  it('should error on a missing email', function () {

    browser.reload();

    browser.url("./");

    login.login('', validPass);

    expect(login.isLoggedIn()).to.be.false;

    //let results = browser.checkDocument();

    //results.forEach(function (result) {
      //expect(result.isWithinMisMatchTolerance).to.equal(true, 'screenshot failure');
    //});
  });

  it('should error on a invalid email', function () {

    browser.url("./");

    login.login('invalid', validPass);

    expect(login.isLoggedIn()).to.be.false;
  });

  it('should error on missing password', function () {

    browser.url("./");

    login.login(validEmail, '');

    expect(login.isLoggedIn()).to.be.false;

    //let results = browser.checkDocument();

    //results.forEach(function (result) {
      //expect(result.isWithinMisMatchTolerance).to.equal(true, 'screenshot failure');
    //});
  });

  it('should link to the sign up page', function () {

    browser.url("./");

    login.signUpLink.click();

    expect(browser.getUrl()).to.contain('Signup#/signup');
  });
})
