// @ts-check
import { test, expect } from '@playwright/test';

test('Healync', async ({ page }) => {

function generateUniqueLastName(length = 6) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let lastName = '';

    for (let i = 0; i < length; i++) {
        lastName += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    return lastName.charAt(0).toUpperCase() + lastName.slice(1);
}
    // Generate patient name once
    const patientName = `Test ${generateUniqueLastName()}`;

    console.log(`Patient Name: ${patientName}`);

    await page.goto('http://frontend-uat.healync.com/login');

await expect(page.locator('app-login')).toContainText('Welcome back,');
await page.getByRole('textbox', { name: 'Enter phone number' }).click();
await page.getByRole('textbox', { name: 'Enter phone number' }).fill('login_superadmin');
await page.getByRole('textbox', { name: 'Enter password' }).click();
await page.getByRole('textbox', { name: 'Enter password' }).fill('Heal@sync1');
await page.getByRole('button', { name: 'Sign in' }).click();
await page.getByText('Login successful!').click();

//Add New patient
await page.getByRole('button', { name: 'Add New' }).click();
await page.getByRole('button', { name: 'Add Patient' }).click();
await page.getByRole('textbox', { name: 'Enter patient name' }).click();
await page.getByRole('textbox', { name: 'Enter patient name' }).fill(patientName);
await page.getByRole('textbox', { name: 'Enter phone number' }).click();
await page.getByRole('button', { name: 'All', exact: true }).click();
await page.locator('div').filter({ hasText: /^Mr$/ }).click();
await page.getByRole('textbox', { name: 'Enter phone number' }).click();
await page.getByRole('textbox', { name: 'Enter phone number' }).fill('1234567890');
await page.getByRole('textbox', { name: 'Write down', exact: true }).click();
await page.getByRole('textbox', { name: 'Write down', exact: true }).fill('Healync');
await page.getByRole('textbox', { name: 'Write down email address' }).click();
await page.getByRole('textbox', { name: 'Write down email address' }).fill('sureshyamini245@gmail.com');
await page.getByPlaceholder('Enter age').click();
await page.getByPlaceholder('Enter age').fill('21');
await page.getByRole('button', { name: 'Male', exact: true }).click();
await page.getByRole('textbox', { name: 'Write down resident address' }).click();
await page.getByRole('textbox', { name: 'Write down resident address' }).fill('Chennai');
await page.getByRole('button', { name: 'Save' }).click();
await expect(page.getByText('Patient Saved successfully')).toBeVisible();

//Add consult
await page.getByRole('button', { name: 'Add New' }).click();
await page.getByRole('button', { name: 'Add Consult' }).click();
await page.getByRole('textbox', { name: 'Search with patient name or' }).click();
await page.getByRole('textbox', { name: 'Search with patient name or' }).fill(patientName);
const patient = page.locator(`//div[@title="${patientName}"]`);
await patient.waitFor({ state: 'visible' });
await patient.click();
await page.locator('app-multi-dropdown:nth-child(3) > .multi-dropdown-container > .multi-dropdown-title').click();
await page.locator('div:nth-child(30) > .checkbox').click();
await page.locator('app-book-appointment-filter-navbar').getByText('Consult', { exact: true }).click();
await page.getByText(':00 - 09:15 AM').first().click();
await page.locator('.slotButton').first().click();
await page.getByText('Proceed').click();
await page.getByText('Confirm Booking').click();
// await page.getByRole('textbox', { name: 'Search with patient name or' }).click();
await page.getByText('Booking confirm').click();
// await page.getByText('Confirm Booking').click();
// await page.getByText('Go to appointment page').click();
await page.reload({
  waitUntil: 'load'
});

//Add Service
await page.getByRole('button', { name: 'Add New' }).click();
await page.getByRole('button', { name: 'Add Service' }).click();
await page.getByRole('textbox', { name: 'Search with patient name or' }).click();
await page.getByRole('textbox', { name: 'Search with patient name or' }).fill(patientName);
const samepatient = page.locator(`//div[@title="${patientName}"]`);
await samepatient.waitFor({ state: 'visible' });
await samepatient.click();
await page.locator('app-multi-dropdown:nth-child(3) > .multi-dropdown-container > .multi-dropdown-title').click();
await page.locator('.bookappointmentBodyRightBottom > div:nth-child(3)').first().click();
await page.getByText(':15 - 09:30 AM').first().click();
await page.locator('.slotButton.selectedSlot').click();
// await page.getByText(':00 - 09:15 AM').first().click();
// await page.locator('.bookappointmentBodyRightBottom > div:nth-child(3)').first().click();
await page.getByText('Proceed').click();
await page.getByText('Confirm Booking').click();
await page.getByText('Booking confirm').click();
await page.reload();

//Generate Invoice
// await page.locator('a').filter({ hasText: 'Consult-1 Appointment PatientName' }).click();
const appointment = page.locator('a').filter({
    hasText: 'Consult-1 Appointment PatientName'
});

while (!(await appointment.isVisible())) {
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(300);
}

await appointment.click();

///////await page.getByText('View details').click();
// ///////await page.getByRole('textbox', { name: 'Enter reason' }).click();
// //////await page.getByRole('button', { name: 'Generate invoice' }).click();

await page.getByText('Generate invoice').nth(1).click();
await page.locator('.td-checkbox > .ng-untouched').first().check();
await page.locator('tr:nth-child(2) > .td-checkbox > .ng-untouched').check();
await page.getByRole('button', { name: 'Add Adjustment' }).click();
await page.getByRole('textbox', { name: 'Amount' }).click();
await page.getByRole('textbox', { name: 'Amount' }).fill('10');
await page.locator('input[type="text"]').nth(4).click();
await page.locator('input[type="text"]').nth(4).fill('Discount');
await page.getByRole('textbox', { name: 'Enter reason' }).dblclick();
await page.getByRole('textbox', { name: 'Enter reason' }).fill('Consult Discount');
await page.getByRole('button', { name: 'Generate invoice' }).click();
await expect(page.locator('app-calendar')).toContainText('Payment due₹2,110.00Not Paid Make payment');

//Make Payment
// await page.locator('a').filter({ hasText: 'Consult-1 Appointment PatientName' }).click();
await page.getByText('Mr PatientName').nth(1).click();
await page.getByText('Financials').click();
await page.getByRole('button', { name: 'Make Payment' }).click();
await expect(page.getByRole('dialog')).toContainText('Select payment modePlease choose a mode of payment and enter the details. Cash UPI Card Others');

let paymentType = "Cash"; 
if (paymentType === "Cash") {
    await page.getByText('Cash', { exact: true }).click();
    await page.getByPlaceholder('₹ Amount').fill('100');
    await page.getByRole('button', { name: 'Record Payment' }).click();
    // wait expect(page.getByText(/Payment Success|Payment Successful/i)).toBeVisible();
    // await page.getByRole('textbox').fill('100');
}
else if (paymentType === "UPI") {
    await page.getByText('UPI', { exact: true }).click();
    await page.getByRole('textbox', { name: /Transaction ID/i }).fill('TXN123456789');
    await page.getByPlaceholder('₹ Amount').fill('100');
    await page.getByRole('button', { name: 'Record Payment' }).click();
}
else if (paymentType === "Card") {
    await page.getByText('Card', { exact: true }).click();
    await page.getByRole('textbox', { name: /Transaction ID/i }).fill('TXN123456789');
    await page.getByPlaceholder('₹ Amount').fill('100');
    await page.getByRole('button', { name: 'Record Payment' }).click();
}

else if (paymentType === "Wallet") {

    // Step 1: Record Deposit
    await page.getByRole('button', { name: 'Record Deposit' }).click();

    await page.getByPlaceholder('₹ Amount').fill('100');

    await page.getByRole('button', { name: 'Record Deposit' }).click();
    
    // Wait until deposit is completed
    await page.waitForLoadState('networkidle');

    // Step 2: Open Payment popup
    await page.getByRole('button', { name: 'Make Payment' }).click();

    // Step 3: Select Wallet (or Others if Wallet is inside Others)
    await page.getByText('Wallet', { exact: true }).click();
     await page.getByPlaceholder('₹ Amount').fill('100');

    // Step 4: Record Payment
    await page.getByRole('button', { name: 'Record Payment' }).click();
}

else {
    throw new Error(`Invalid payment type: ${paymentType}`);
}
await page.getByRole('button', { name: 'Complete Payment' }).click();
await expect(page.getByText(/Payment Success|Payment Successful/i)).toBeVisible();await page.goto('http://frontend-uat.healync.com/dashboard');

//Cancellation & Refund
await page.locator('a').filter({ hasText: 'Consult-1 Appointment PatientName' }).click();
await page.getByText('Cancel').nth(3).click();
await page.locator('.refund-thumb').click();
await page.getByText('Choose reason').click();
await page.getByText('Cancelled by patient').click();
await page.getByRole('button', { name: 'Proceed to Refund' }).click();
await expect(page.locator('app-calendar')).toContainText('Refund/Payment Option');

let refundOption = "Refund"; 

if (refundOption === "No Refund") {
    await page.getByRole('button', { name: 'No Refund' }).click();
}
else if (refundOption === "Refund") {
    await page.getByRole('button', { name: 'Refund', exact: true }).click();
    await expect(page.locator('app-calendar')).toContainText('We are providing PatientName with a ₹ as refund amount.');

    let paymentType = "Cash"; 

    if (paymentType === "Cash") {
        await page.getByRole('button', { name: 'Cash' }).click();
        await page.getByRole('textbox', { name: '₹' }).fill('100');
    }
    else if (paymentType === "UPI") {
        await page.getByRole('button', { name: 'UPI' }).click();
        await page.getByRole('textbox', { name: /Transaction ID/i }).fill('TXN123456789');
        await page.getByRole('textbox', { name: '₹' }).fill('100');
    }
    else if (paymentType === "Card") {
        await page.getByRole('button', { name: 'Card' }).click();
        await page.getByRole('textbox', { name: '₹' }).fill('100');
    }
    else if (paymentType === "Wallet") {
        await page.getByRole('button', { name: 'Wallet' }).click();
        await page.getByRole('textbox', { name: '₹' }).fill('100');
    }
    else {
        throw new Error(`Invalid payment type: ${paymentType}`);
    }
    }

else if (refundOption === "Make Payment") {
    await page.getByRole('button', { name: 'Make Payment', exact: true }).click();
    await expect(page.locator('app-calendar')).toContainText(
        'PatientName is providing with a ₹ as Payment amount.'
    );

    const paymentType = "Cash"; // Cash | UPI | Card | Wallet

    if (paymentType === "Cash") {
        await page.getByRole('button', { name: 'Cash' }).click();
        await page.getByRole('textbox', { name: '₹' }).fill('100');
    }
    else if (paymentType === "UPI") {
        await page.getByRole('button', { name: 'UPI' }).click();
        await page.getByRole('textbox', { name: /Transaction ID/i }).fill('TXN123456789');
        await page.getByRole('textbox', { name: '₹' }).fill('100');
    }
    else if (paymentType === "Card") {
        await page.getByRole('button', { name: 'Card' }).click();
        await page.getByRole('textbox', { name: '₹' }).fill('100');
    }
    else {
        throw new Error(`Invalid payment type: ${paymentType}`);
    }
}

else {
    throw new Error(`Invalid refund option: ${refundOption}`);
}

// await page.getByRole('button', { name: 'Confirm' }).click();




await page.locator('app-multi-dropdown:nth-child(3) > .multi-dropdown-container > .multi-dropdown-title').click();
await page.locator('div:nth-child(25) > .checkbox > .check').click();
await page.locator('app-multi-dropdown:nth-child(3) > .multi-dropdown-container > .multi-dropdown-title').click();
await page.getByText('Add custom slots').first().click();
await page.locator('.fa-regular.fa-xmark').first().click();
await page.getByRole('button', { name: 'Add New' }).click();

await page.locator('app-multi-dropdown:nth-child(3) > .multi-dropdown-container > .multi-dropdown-title').click();
await page.locator('div:nth-child(25) > .checkbox > .check').click();
await page.getByText('Service').nth(2).click();
await page.locator('app-multi-dropdown:nth-child(3) > .multi-dropdown-container > .multi-dropdown-title').click();
await page.locator('app-multi-dropdown:nth-child(3) > .multi-dropdown-container > .multi-dropdown-title > div:nth-child(2) > .fa-solid').click();
await page.locator('app-multi-dropdown:nth-child(3) > .multi-dropdown-container > .multi-dropdown-title').click();
await page.locator('app-multi-dropdown:nth-child(3) > .multi-dropdown-container > .multi-dropdown-title').click();
await page.locator('.bookappointmentBodyRightBottom > div:nth-child(2)').click();
await page.getByText('Proceed').click();








});