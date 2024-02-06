const { expect } = require('playwright/test');

exports.DashboardPage = class DashboardPage {

  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
  }

  get tipoCategoriaOption() {
    return this.page.locator("[href='#/category-type']")
 }
  async isDashboardPage() {
    await this.page.waitForURL('https://club-administration.qa.qubika.com/#/dashboard')
    const url = await this.page.url();
    expect(url).toContain('dashboard')
  }

  async clickOnTipoCategoria(){
    const tipoCategoria = await this.tipoCategoriaOption;
    await tipoCategoria.click();
 }
};