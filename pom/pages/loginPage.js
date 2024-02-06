const exp = require('constants');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
  }

  get emailField() {
    return this.page.getByPlaceholder('Usuario o correo electrónico')
 }

 get passwordField() {
    return this.page.getByPlaceholder('Contraseña')
 }

 get autenticarButton() {
    return this.page.getByRole('button', { name: /Autenticar/i });
 }

  async goto() {
    await this.page.goto('https://club-administration.qa.qubika.com/#/auth/login');
  }

  async isLoginPage() {
    await this.page.waitForURL('https://club-administration.qa.qubika.com/#/auth/login')
    const url = await this.page.url();
    expect(url).toContain('login')
  }

  async completeEmail(email) {
   const emailField = await this.emailField;
   await emailField.fill(email);
  }
  
  async completePassword(password) {
    const passwordField = await this.passwordField;
    await passwordField.fill(password);
 }

 async clickOnAutenticarButton(){
    const autenticarButton = await this.autenticarButton;
    await autenticarButton.click();
 }

};