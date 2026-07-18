const { expect } = require('@playwright/test');

class CancellationPage {

    constructor(page) {
        this.page = page;

        // Buttons
        // this.cancelBtn = page.getByText('Cancel').nth(3);

        this.cancelBtn = page.getByRole('button', {
        name: 'Cancel',
        exact: true
        });

        this.proceedToRefundBtn = page.getByRole('button', {
            name: 'Proceed to Refund'
        });

        this.noRefundBtn = page.getByRole('button', {
            name: 'No Refund'
        });

        this.refundBtn = page.getByRole('button', {
            name: 'Refund',
            exact: true
        });

        this.makePaymentBtn = page.getByRole('button', {
            name: 'Make Payment',
            exact: true
        });

        this.confirmBtn = page.getByRole('button', {
        name: 'Confirm'
        });

        // Reason
        this.reasonDropdown = page.getByText('Choose reason');

        this.cancelledByPatientReason = page.getByText(
            'Cancelled by patient'
        );

        // Refund Thumb
        this.refundThumb = page.locator('.refund-thumb');

        // Payment Modes
        this.cashBtn = page.getByRole('button', {
            name: 'Cash'
        });

        this.upiBtn = page.getByRole('button', {
            name: 'UPI'
        });

        this.cardBtn = page.getByRole('button', {
            name: 'Card'
        });

        this.walletBtn = page.getByRole('button', {
            name: 'Wallet'
        });

        // Fields
        this.amountTxt = page.getByRole('textbox', {
            name: '₹'
        });

        this.transactionIdTxt = page.getByRole('textbox', {
            name: /Transaction ID/i
        });
    }

    async clickCancel() {
        await this.cancelBtn.click();
    }

    async selectReason() {

        await this.refundThumb.click();

        await this.reasonDropdown.click();

        await this.cancelledByPatientReason.click();
    }

    async proceedToRefund() {

        await this.proceedToRefundBtn.click();

    //     await expect(
    //         this.page.locator('app-calendar')
    //     ).toContainText('Refund/Payment Option');

            await expect(
            this.page.getByText('Refund/Payment Option')
            ).toBeVisible();
    }


    async cancelWithNoRefund() {

        await this.clickCancel();

        await this.selectReason();

        await this.proceedToRefund();

        await this.noRefundBtn.click();

        await this.confirmBtn.click();

        // Verify cancellation completed
        await expect(
        this.page.locator('.status')
        ).toContainText('Cancelled');

}

    async cancelWithRefund(
        paymentType,
        amount,
        transactionId = null
    ) {

        await this.clickCancel();

        await this.selectReason();

        await this.proceedToRefund();

        await this.refundBtn.click();

        switch (paymentType) {

            case 'Cash':
                await this.cashBtn.click();
                break;

            case 'UPI':
                await this.upiBtn.click();
                await this.transactionIdTxt.fill(
                    transactionId
                );
                break;

            case 'Card':
                await this.cardBtn.click();
                await this.transactionIdTxt.fill(
                    transactionId
                );
                break;

            case 'Wallet':
                await this.walletBtn.click();
                break;
        }

        await this.amountTxt.fill(
            amount.toString()
        );

        await this.confirmBtn.click();
    }

    async cancelWithMakePayment(
        paymentType,
        amount,
        transactionId = null
    ) {

        await this.clickCancel();

        await this.selectReason();

        await this.proceedToRefund();

        await this.makePaymentBtn.click();

        switch (paymentType) {

            case 'Cash':
                await this.cashBtn.click();
                break;

            case 'UPI':
                await this.upiBtn.click();
                await this.transactionIdTxt.fill(
                    transactionId
                );
                break;

            case 'Card':
                await this.cardBtn.click();
                await this.transactionIdTxt.fill(
                    transactionId
                );
                break;

            case 'Wallet':
            await this.walletBtn.click();
            break;
        }

        await this.amountTxt.fill(
            amount.toString()
        );

        await this.confirmBtn.click();
    }
}

module.exports = { CancellationPage };