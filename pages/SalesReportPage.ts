import { Page, FrameLocator, expect } from '@playwright/test';

export class SalesReportPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login() {
    await this.page.goto('http://release-uat.healync.com.s3-website.ap-south-1.amazonaws.com/dashboard');

    await expect(this.page.locator('app-login')).toContainText('Welcome back,');

    await this.page.getByRole('textbox', { name: 'Enter phone number' }).fill('login_superadmin');
    await this.page.getByRole('textbox', { name: 'Enter password' }).fill('Heal@sync1');
    await this.page.getByRole('button', { name: 'Sign in' }).click();

    await this.page.getByText('Login successful!').click();
  }

  async openSalesReport() {
    await this.page.reload({ waitUntil: 'load' });

    await this.page.locator('#analytics-toggle').click();

    await this.page.reload({ waitUntil: 'load' });

    await this.page.getByText('Sales (Advanced)').click();
  }

  async getFrame() {
    const frame = this.page.locator('iframe').contentFrame();
    await frame.locator('body').waitFor();
    return frame;
  }

  async setDateRange(frame: any) {
    const dateInput1 = frame.locator(
      "xpath=(//input[@aria-description='Enter date in M/d/yyyy format'])[1]"
    );

    await dateInput1.waitFor({ state: 'visible' });
    await dateInput1.fill('4/24/2026');

    const dateInput2 = frame.locator(
      "xpath=(//input[@aria-description='Enter date in M/d/yyyy format'])[2]"
    );

    await dateInput2.waitFor({ state: 'visible' });
    await dateInput2.fill('6/30/2026');
  }

  async selectInvoiceStatus(frame: any) {
    const invoiceStatus = frame.locator("(//div[@class='slicer-dropdown-menu'])[2]");

    const currentValue = await invoiceStatus.textContent();

    if (!currentValue?.includes('Paid')) {
      await invoiceStatus.click();
      await frame.locator("//span[text()='Paid']").click();
      await invoiceStatus.click();
    }
  }

  async selectPatient(frame: any) {
    const patientDropdown = frame.locator("(//div[@class='slicer-dropdown-menu'])[3]");

    await patientDropdown.click();

    const patientValue = await patientDropdown.textContent();

    if (!patientValue?.includes('Mr akash test')) {
      await frame.locator("//span[text()='Mr akash test']").click();
    }

    await patientDropdown.click();
  }

  async getHoverDetails(frame: any) {

    await frame.locator(
      "(//div[@data-query-ref='views PatientProfileMaterialized.Patient_Display'])[2]"
    ).hover();

    await this.page.waitForTimeout(2000);

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

    return {
      popupText1,
      popupText2,
      popupText3
    };
  }
}