const { expect } = require('playwright/test');

exports.CategoriaPage = class CategoriaPage {

  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
  }

  get adicionarButton() {
    return this.page.getByRole('button', { name: /Adicionar/i });
 }

 get popUpTitle() {
    return this.page.locator('[class="mat-dialog-title"]')
 }

 get categoriaField() {
    return this.page.getByPlaceholder('Nombre de categoría')
 }

 get savedCategoryMessage() {
    return this.page.locator("[role='alertdialog']")
 }

 get aceptarButton(){
    return this.page.getByRole('button', { name: /Aceptar/i });
 }

 get subcategoriaCheckbox() {
    return this.page.locator('.text-muted')
 }

 get searchCategory() {
    return this.page.locator("//div[@role='combobox']/input");
 }


  async isCategoriaPage() {
    await this.page.waitForURL('https://club-administration.qa.qubika.com/#/category-type')
    const url = await this.page.url();
    expect(url).toContain('category-type')
  }

  async clickOnAdicionarButton() {
    await this.adicionarButton.click();
  }

  async completeCategoryName(category) {
    const categoryName = this.categoriaField;
    await categoryName.fill(category)
  }

  async clickOnAceptarButton() {
    await this.aceptarButton.click();
  }

  async isCategorySaved() {
    await this.page.waitForSelector("[role='alertdialog']", { hidden: true });
  }

  async clickOnSubCategoriaCheckbox() {
    await this.subcategoriaCheckbox.click();
  }

  async selectCategoriaPadre(category) {
    const searchCategory = this.searchCategory;
    await searchCategory.fill(category)
    const result = this.page.locator("//div[@role='option']/span[text()='"+category+"']")
    await result.click();
  }
};