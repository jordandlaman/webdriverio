class Switchaccount {
  // Replace these selectors
  get nameSearch () {return $('input[placeholder="NAME"]'); }
  get tanSearch () { return $('input[placeholder="TAN"]'); }
  get radio () { return $('//*[@id="switchAccountModal"]/div/main/div[2]/div[1]/table/tbody/tr/td[1]/div/span'); }
  get profileButton () { return $('.user-info__names'); }
  get switch () { return $('#switchAccountItem'); }
  get continue () { return $('button*=Continue'); }

  switchaccount (name, tan) {

    browser.waitUntil(function () {
      return browser.isVisible('.user-info__names')
    }, 3000, 'Could not find the profile element');

    this.profileButton.click();
    this.switch.click();

    browser.waitUntil(function () {
      return browser.isVisible('#ngdialog1-aria-labelledby')
    }, 3000, 'Could not find the switch account window');

    this.nameSearch.setValue(name);
    this.tanSearch.setValue(tan);

    browser.waitUntil(function () {
      return browser.isVisible('//*[@id="switchAccountModal"]/div/main/div[2]/div[1]/table/tbody/tr/td[1]/div/span')
    }, 10000, 'Could not find the radio button');

    this.radio.click();

    this.continue.click();
  }

  isOnFleet () {
    // Replace this with an Boolean response that identifies if you're logged in
      return browser.element('/html/body/header/div[1]/div/div/div/div[1]/div[1]/span[2]').getText();
  }
}

module.exports = Switchaccount;
