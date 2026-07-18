import { test, expect } from '@playwright/test';

test('SalesReport', async ({ page }) => {

//login
await page.goto('http://release-uat.healync.com.s3-website.ap-south-1.amazonaws.com/dashboard');
await expect(page.locator('app-login')).toContainText('Welcome back,');
await page.getByRole('textbox', { name: 'Enter phone number' }).click();
await page.getByRole('textbox', { name: 'Enter phone number' }).fill('login_superadmin');
await page.getByRole('textbox', { name: 'Enter password' }).click();
await page.getByRole('textbox', { name: 'Enter password' }).fill('Heal@sync1');
await page.getByRole('button', { name: 'Sign in' }).click();
await page.getByText('Login successful!').click();

//Sales Report
await page.reload({
  waitUntil: 'load'
});

await page.locator('#analytics-toggle').click();
await page.reload({
  waitUntil: 'load'
});
await page.getByText('Sales (Advanced)').click();

const frame = page.locator('iframe').contentFrame();

await frame.locator("body").waitFor();

const dateInput1 = frame.locator(
    "xpath=(//input[@aria-description='Enter date in M/d/yyyy format'])[1]"
);

await dateInput1.waitFor({ state: 'visible' });
await dateInput1.click();
await dateInput1.fill('4/24/2026');

const dateInput2 = frame.locator(
    "xpath=(//input[@aria-description='Enter date in M/d/yyyy format'])[2]"
);

await dateInput2.waitFor({ state: 'visible' });
await dateInput2.click();
await dateInput2.fill('6/30/2026');


const invoiceStatus = frame.locator("(//div[@class='slicer-dropdown-menu'])[2]");

// Current selected value
const currentValue = await invoiceStatus.textContent();

if (!currentValue.includes('Paid')) {

    await invoiceStatus.click();

    await frame.locator("//span[text()='Paid']").click();

    await invoiceStatus.click();
}

await page.waitForTimeout(2000);

const patientDropdown = frame.locator("(//div[@class='slicer-dropdown-menu'])[3]");

await patientDropdown.click();



const patientValue = await patientDropdown.textContent();

if (!patientValue.includes('Mr akash test')) {
    await frame.locator("//span[text()='Mr akash test']").click();
}

await patientDropdown.click();




await frame.locator(
  "(//div[@data-query-ref='views PatientProfileMaterialized.Patient_Display'])[2]"
).hover();

await page.waitForTimeout(2000);

const popupText1 = await frame
  .getByText('Patient_Display')
  .locator('..')
  .innerText();

const popupText2 = await frame
  .getByText('InvoiceNumber')
  .locator('..')
  .innerText();

const popupText3 = await frame
  .getByText('referrals')
  .locator('..')
  .innerText();

console.log(popupText1);
console.log(popupText2);
console.log(popupText3);

});