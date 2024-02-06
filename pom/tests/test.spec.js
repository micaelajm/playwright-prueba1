import {chromium} from 'playwright';
const { DashboardPage } = require('../pages/dashboardPage');
const {test, expect} = require ('@playwright/test')
const ApiPage = require('../pages/apis');
const { describe, before } = require('node:test');
const {LoginPage} = require('../pages/loginPage');
const {CategoriaPage} = require('../pages/categoriaPage');
let browser;
let page; 
const timestamp = new Date().getTime();

test.describe('Create user via API and Create category and subcategory', () => {
    
    before(async() =>{
        browser = await chromium.launch({headless:false,channel:"chrome"});
        page = await browser.newPage();
    })

    test("Create user via API", async () => {
        const generalURL = 'https://api.club-administration.qa.qubika.com'
        const responseData = await ApiPage.addUserViaAPI('usuario-'+timestamp+'@yopmail.com','123456789',generalURL)
        console.log("Status Code: " + responseData.status)
        expect(responseData.status).toBe(201);
    })

    test("Navigate to Qubika Sports Club management and create a category and subcategory", async({page}) => {
        const loginp = new LoginPage(page);
        await loginp.goto();
        await loginp.completeEmail('test.qubika@qubika.com');
        await loginp.completePassword('12345678');
        await loginp.clickOnAutenticarButton();

        const dashboardp = new DashboardPage(page);
        await dashboardp.isDashboardPage();
        await dashboardp.clickOnTipoCategoria();

        const categoriap = new CategoriaPage(page);
        await categoriap.isCategoriaPage();
        await categoriap.clickOnAdicionarButton();
        await categoriap.completeCategoryName("deporte-"+timestamp);
        await categoriap.clickOnAceptarButton();
        await categoriap.isCategorySaved();

        await categoriap.clickOnAdicionarButton();
        await categoriap.completeCategoryName("deporte-"+timestamp)
        await categoriap.clickOnSubCategoriaCheckbox();
        await categoriap.selectCategoriaPadre("deporte-"+timestamp)
        await categoriap.clickOnAceptarButton();
        await categoriap.isCategorySaved();
    })

})
