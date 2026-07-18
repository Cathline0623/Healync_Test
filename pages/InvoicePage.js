const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
class InvoicePage {

    constructor(page) {
        this.page = page;

        this.generateInvoiceLink =
            page.getByText('Generate invoice').nth(1);

        this.serviceCheckbox1 =
            page.locator('.td-checkbox > .ng-untouched').first();

        this.serviceCheckbox2 =
            page.locator(
                'tr:nth-child(2) > .td-checkbox > .ng-untouched'
            );

        this.addAdjustmentBtn =
            page.getByRole('button', {
                name: 'Add Adjustment'
            });

        this.amountTxt =
            page.getByRole('textbox', {
                name: 'Amount'
            });

        this.adjustmentNameTxt =
            page.locator('input[type="text"]').nth(4);

        this.reasonTxt =
            page.getByRole('textbox', {
                name: 'Enter reason'
            });

        this.finalGenerateInvoiceBtn =
            page.getByRole('button', {
                name: 'Generate invoice'
            });
    }

//    async openAppointment(patientName) {

    

    // const appointment = this.page.locator('a').filter({
    //     hasText: patientName
    // }).first();
    // await page.getByText('Confirm Booking').click();
   

    // await page.getByText('Go to appointment page').click();

    

    // await appointment.waitFor({
    //     state: 'visible',
    //     timeout: 60000
    // });

    // await appointment.click();
// }

   async selectInvoiceServices() {

    await StepHelper.step(this.page, 'Select First Service', async () => {
        await this.serviceCheckbox1.check();
    });

    await StepHelper.step(this.page, 'Select Second Service', async () => {
        await this.serviceCheckbox2.check();
    });
}

    async addAdjustment(
    amount,
    adjustmentName,
    reason
) {

    await StepHelper.step(this.page, 'Click Add Adjustment', async () => {
        await this.addAdjustmentBtn.click();
    });

    await StepHelper.step(this.page, `Enter Amount - ${amount}`, async () => {
        await this.amountTxt.fill(amount);
    });

    await StepHelper.step(this.page, `Enter Adjustment Name - ${adjustmentName}`, async () => {
        await this.adjustmentNameTxt.fill(adjustmentName);
    });

    await StepHelper.step(this.page, `Enter Reason - ${reason}`, async () => {
        await this.reasonTxt.fill(reason);
    });
}

    async clickGenerateInvoice() {

    await StepHelper.step(this.page, 'Click Generate Invoice', async () => {
        await this.generateInvoiceLink.click();
    });

    await StepHelper.step(this.page, 'Confirm Generate Invoice', async () => {
        await this.finalGenerateInvoiceBtn.click();
    });
}

  async generateInvoice(patientName) {

    // await this.openAppointment(patientName);

    await StepHelper.step(this.page, 'Open Generate Invoice', async () => {
        await this.generateInvoiceLink.click();
    });

    await this.selectInvoiceServices();

    await this.addAdjustment(
        '10',
        'Discount',
        'Consult Discount'
    );

    await StepHelper.step(this.page, 'Generate Final Invoice', async () => {
        await this.finalGenerateInvoiceBtn.click();
    });
}

    async verifyInvoiceGenerated() {

    await StepHelper.step(this.page, 'Verify Invoice Generated Successfully', async () => {
        await expect(
            this.page.locator('app-calendar')
        ).toContainText(
            'Payment due'
        );
    });
}
}

module.exports = { InvoicePage };