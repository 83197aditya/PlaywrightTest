import {test as base, expect, Locator} from '@playwright/test';
import { Page } from '@playwright/test';

class FormPage{
    public readonly enterName : Locator;
    public readonly enterEmail : Locator;
    public readonly gender : Locator;
    public readonly enterCountry : Locator;

    constructor ( public page: Page){
    this.enterName = this.page.getByPlaceholder('Enter Name');
    this.enterEmail = this.page.getByPlaceholder('Enter EMail');
    this.gender = this.page.getByRole('radio',{ name:"Male", exact: true });
    this.enterCountry = this.page.getByLabel("Country");
    }

    async navigate(){
        await this.page.goto("https://testautomationpractice.blogspot.com/");
    }

    public async inputName(name : string){
        await this.enterName.fill(name);
    }

    public async inputEmail(email : string){
        await this.enterEmail.fill(email);
    }

    public async inputGender(){
        await this.gender.check();
    }

    public async inputDays( days : string[]){
        for(const day of days){
            await this.page.getByLabel(day).check();
            await expect(this.page.getByLabel(day)).toBeChecked();
        }
    }

    public async selectCountry( country: string){
        await this.enterCountry.selectOption(country);
    }

}

type MyFixtures = {
    formPage: FormPage;
}

 export const test = base.extend<MyFixtures>({
    formPage : async ({page}, use) =>{
        const formPage = new FormPage(page);
        await page.goto("https://testautomationpractice.blogspot.com/");
        await use(formPage);
    }
 });


test.describe('Form Validation', () => {
    test('Verify page load successfully', async ({formPage}) => {
        await formPage.navigate();
        await expect(formPage.page).toHaveTitle("Automation Testing Practice");
    });

    test('Verify full name field', async({formPage}) => {
        await formPage.inputName("Test John");
        await expect(formPage.enterName).toHaveValue("Test John");
    });

    test('Verify Email field', async({formPage}) => {
        await formPage.inputEmail("email@email.com");
        await expect(formPage.enterEmail).toHaveValue("email@email.com");    
    });

    test('Verify Select Gender Radio Button', async({formPage}) => {
        await formPage.inputGender();
        await expect(formPage.gender).toBeChecked();
    });

    test('Verify Select Multiple Checkboxes', async ({formPage}) =>{
        const weekdays = ["Sunday", "Monday", "Tuesday"];
        await formPage.inputDays(weekdays);
    });

    test('Verify Select Country from dropdown', async({formPage}) =>{
        await formPage.selectCountry("Canada");
        await expect(formPage.enterCountry).toHaveValue("canada");
    });

    


    
});
