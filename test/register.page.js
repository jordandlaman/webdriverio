class Register {
  // Replace these selectors
  get first () { return $('input[name="firstName"]'); }
  get last () { return $('input[name="lastName"]'); }
  get email () { return $('input[name="email"]'); }
  get confirm () { return $('input[name="confirmEmail"]'); }
  get company () { return $('input[name="company"]'); }
  get phone () { return $('input[name="phone"]'); }
  get vin () { return $('input[name="vin"]'); }
  get recaptcha () { return $('#recaptcha-anchor')}
  get submit () { return $('input[value="Next"]'); }
  get signUpLink () { return $('button*=Sign Up'); }

  register (first, last, email, confirm, phone, company, vin) {
    confirm = typeof confirm == 'string' ? confirm : email;

    this.signUpLink.click();

    browser.waitUntil(function () {
      return browser.isVisible('input[name="firstName"]')
    }, 5000, 'Could not find the input fields');

    this.first.setValue(first);
    this.last.setValue(last);
    this.email.setValue(email);
    this.confirm.setValue(confirm);
    this.phone.setValue(phone);
    this.company.setValue(company);
    this.vin.setValue(vin);
  }

  isRegistered () {
    // Replace this with a Boolean response that identifies if you've successfully registered
    return browser.getUrl().includes('/signup/submission/thank-you');
  }
}

module.exports = Register;
