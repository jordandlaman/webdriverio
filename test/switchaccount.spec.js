const Login = require('./Login.page.js');
const login = new Login();

const Switchaccount = require('./switchaccount.page.js');
const switchaccount = new Switchaccount();

describe('Switch Account', function () {

  // Replace with valid email address & password
  const validEmail = 'jordan@metaltoad.com';
  const validPass = 'Izilude1234';
  const validName = 'DEMO DTNA TRUCKING';
  const validTan = 'T12345';

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
  it('should let you switch fleets', function () {

    switchaccount.switchaccount(validName, validTan);

    browser.waitUntil(function () {
      return browser.isVisible('[ng-bind="tanName"]')
    }, 5000, 'Could not find the fleet name');

    expect(switchaccount.isOnFleet()).to.contain('BLARG')
  });
})
