class Login {
  // Replace these selectors
  get signIn () {return $('#loginLink'); }
  get email () { return $('input[name="login"]'); }
  get password () { return $('input[name="passwd"]'); }
  get submit () { return $('button*=Sign in'); }
  get signUpLink () { return $('button*=Sign Up'); }

  login (email, password) {

    this.signIn.click();

    this.email.setValue(email);
    this.password.setValue(password);

    this.submit.click();
  }

  isLoggedIn () {
    // Replace this with an Boolean response that identifies if you're logged in
      return browser.getUrl().includes('Portal#/vehicles');
  }
}

module.exports = Login;
