const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');

class PaymentPage {

    constructor(page) {
        this.page = page;

        // Financials
        this.financialsTab = page.getByText('Financials');

        // Buttons
        this.makePaymentBtn = page.getByRole('button', {
            name: 'Make Payment'
        });

        this.recordPaymentBtn = page.getByRole('button', {
            name: 'Record Payment'
        });

        this.completePaymentBtn = page.getByRole('button', {
            name: 'Complete Payment'
        });

        this.recordDepositBtn = page.getByRole('button', {
            name: 'Record Deposit'
        });

        // Payment Types
        this.cashBtn = page.getByText('Cash', {
            exact: true
        });

        this.upiBtn = page.getByText('UPI', {
            exact: true
        });

        this.cardBtn = page.getByText('Card', {
            exact: true
        });

        this.walletBtn = page.getByText('Wallet', {
            exact: true
        });

        // Fields
        this.amountTxt = page.getByPlaceholder('₹ Amount');

        this.transactionIdTxt = page.getByRole('textbox', {
            name: /Transaction ID/i
        });

        // Success Message
        this.paymentSuccessMsg = page.getByText(
            /Payment Success|Payment Successful/i
        );
    }

   async openFinancials(patientName) {

    await this.page.waitForTimeout(3000);

    await this.page
        .locator('.loader-overlay-generate')
        .first()
        .waitFor({
            state: 'hidden',
            timeout: 60000
        });

    await StepHelper.step(this.page, `Open Patient - Mr ${patientName}`, async () => {
        await this.page
            .getByText(`Mr ${patientName}`)
            .nth(1)
            .click();
    });

    await StepHelper.step(this.page, 'Open Financials Tab', async () => {
        await this.financialsTab.click();
    });
}

    async clickMakePayment() {

    await this.makePaymentBtn.waitFor({
        state: 'visible',
        timeout: 60000
    });

    await StepHelper.step(this.page, 'Click Make Payment', async () => {
        await this.makePaymentBtn.click();
    });
}

    async selectPaymentType(paymentType) {

    await StepHelper.step(this.page, `Select Payment Type - ${paymentType}`, async () => {

        switch (paymentType) {

            case 'Cash':
                await this.cashBtn.click();
                break;

            case 'UPI':
                await this.upiBtn.click();
                break;

            case 'Card':
                await this.cardBtn.click();
                break;

            case 'Wallet':
                await this.walletBtn.click();
                break;

            default:
                throw new Error(
                    `Unsupported Payment Type : ${paymentType}`
                );
        }
    });
}
   async enterTransactionId(transactionId) {

    await StepHelper.step(this.page, `Enter Transaction ID - ${transactionId}`, async () => {
        await this.transactionIdTxt.fill(transactionId);
    });
}

    async enterAmount(amount) {

    await StepHelper.step(this.page, `Enter Amount - ${amount}`, async () => {
        await this.amountTxt.fill(amount.toString());
    });
}

   async recordPayment() {

    await StepHelper.step(this.page, 'Click Record Payment', async () => {
        await this.recordPaymentBtn.click();
    });
}

    async completePayment() {

    await StepHelper.step(this.page, 'Click Complete Payment', async () => {
        await this.completePaymentBtn.click();
    });
}

    async verifyPaymentSuccess() {

    await StepHelper.step(this.page, 'Verify Payment Success', async () => {
        await expect(
            this.paymentSuccessMsg
        ).toBeVisible();
    });
}

   async recordWalletDeposit(amount) {

    await expect(this.recordDepositBtn).toBeVisible({
        timeout: 30000
    });

    await StepHelper.step(this.page, 'Click Record Deposit', async () => {
        await this.recordDepositBtn.click();
    });

    await this.enterAmount(amount);

    await StepHelper.step(this.page, 'Confirm Record Deposit', async () => {
        await this.recordDepositBtn.click();
    });

    await this.page.waitForLoadState(
        'networkidle'
    );
}

    async makePayment(
    paymentType,
    amount,
    transactionId = null
) {

    if (paymentType === 'Wallet') {

        // Step 1: Record Deposit
        await this.recordWalletDeposit(amount);

        // Step 2: Open Payment popup
        await this.clickMakePayment();

        // Step 3: Verify Wallet option available
        await StepHelper.step(this.page, 'Verify Wallet Option Available', async () => {
            await expect(this.walletBtn).toBeVisible({
                timeout: 10000
            });
        });

        // Step 4: Select Wallet
        await this.selectPaymentType('Wallet');

        // Step 5: Enter Amount
        await this.enterAmount(amount);

        // Step 6: Record Payment
        await this.recordPayment();

        return;
    }

    await this.clickMakePayment();

    await this.selectPaymentType(paymentType);

    if (
        paymentType === 'UPI' ||
        paymentType === 'Card'
    ) {
        await this.enterTransactionId(transactionId);
    }

    await this.enterAmount(amount);

    await this.recordPayment();
}

    // await this.completePayment();
    // await this.verifyPaymentSuccess();


}

module.exports = { PaymentPage };