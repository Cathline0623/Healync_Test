import { test, expect } from "../fixtures/baseTest.js";

// test.setTimeout(120000);

const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { ServicePage } = require('../pages/ServicePage');
const { InvoicePage } = require('../pages/InvoicePage');
const { PaymentPage } = require('../pages/PaymentPage');
const { CancellationPage } = require('../pages/CancellationPage');

const { patientData } = require('../testdata/patients');
const { paymentData } = require('../testdata/payments');
const { generatePatientName } = require('../utils/RandomData');
const { multiServiceData } = require('../testdata/multiServiceData');
const { patientName } = require('../testdata/existingPatientData.js');

test('TC01 New Patient Cash Payment', async ({ page }) => {

    const patientName = generatePatientName();

    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);

    await patientPage.createPatient(
        patientName,
        patientData
    );

    await consultPage.addConsult(
        patientName
    );

    await servicePage.addService(
        patientName
    );

   await invoicePage.generateInvoice(
    patientName
    );

    await paymentPage.openFinancials(
        patientName
    );

    await paymentPage.makePayment(
        'Cash',
        paymentData.amount
    ); 
});

test('TC02 New Patient UPI Payment', async ({ page }) => {

    const patientName = generatePatientName();

    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);


    await patientPage.createPatient(
        patientName,
        patientData
    );

    await consultPage.addConsult(
        patientName
    );

    await servicePage.addService(
        patientName
    );

    await invoicePage.generateInvoice(
        patientName
    );

    await paymentPage.openFinancials(
        patientName
    );

    await paymentPage.makePayment(
    'UPI',
    paymentData.amount,
    paymentData.transactionId
);

});

test('TC03 New Patient Card Payment', async ({ page }) => {

    const patientName = generatePatientName();

    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);

    await patientPage.createPatient(
        patientName,
        patientData
    );

    await consultPage.addConsult(
        patientName
    );

    await servicePage.addService(
        patientName
    );

    await invoicePage.generateInvoice(
        patientName
    );

    await paymentPage.openFinancials(
        patientName
    );

    await paymentPage.makePayment(
    'Card',
    paymentData.amount,
    paymentData.transactionId
);

});

test('TC04 New Patient Wallet Payment', async ({ page }) => {

    const patientName = generatePatientName();

    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);

    await patientPage.createPatient(
        patientName,
        patientData
    );

    await consultPage.addConsult(
        patientName
    );

    await servicePage.addService(
        patientName
    );

    await invoicePage.generateInvoice(
        patientName
    );

    await paymentPage.openFinancials(
        patientName
    );

    await paymentPage.makePayment(
        'Wallet',
        paymentData.amount
    );

});

test('TC05 Existing Patient Cash Payment', async ({ page }) => {

    const patientName = existingPatientName();
    
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);

    // Step 2 - Search Existing Patient
    await patientPage.searchPatient(
        patientName
    );

    // Step 3 - Add Consult
    await consultPage.addConsult(
        patientName
    );

    // Step 4 - Add Service
    await servicePage.addService(
        patientName
    );

    // Step 5 - Generate Invoice
    await invoicePage.generateInvoice(
        patientName
    );

    // Step 6 - Make Payment by Cash
    await paymentPage.openFinancials(
        patientName
    );

    await paymentPage.makePayment(
        'Cash',
        paymentData.amount
    );

});

test('TC06 New Patient Cancel With No Refund with Cash', async ({ page }) => {

    const patientName = generatePatientName();

    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);
    const cancellationPage = new CancellationPage(page);

    // Step 2 - Add New Patient
    await patientPage.createPatient(
        patientName,
        patientData
    );

    // Step 3 - Add Consult
    await consultPage.addConsult(
        patientName
    );

    // Step 4 - Add Service
    await servicePage.addService(
        patientName
    );

    // Step 5 - Generate Invoice
    await invoicePage.generateInvoice(
        patientName
    );

    // Step 6 - Make Payment by Cash
    await paymentPage.openFinancials(
        patientName
    );

    await paymentPage.makePayment(
        'Cash',
        paymentData.amount
    );

    // Step 7 - Cancel With No Refund
    await cancellationPage.cancelWithNoRefund();

});

test('TC07 New Patient Cancel Refund with Cash', async ({ page }) => {

    const patientName = generatePatientName();

    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);
    const cancellationPage = new CancellationPage(page);


    // Step 2 - Add New Patient
    await patientPage.createPatient(
        patientName,
        patientData
    );

    // Step 3 - Add Consult
    await consultPage.addConsult(
        patientName
    );

    // Step 4 - Add Service
    await servicePage.addService(
        patientName
    );

    // Step 5 - Generate Invoice
    await invoicePage.generateInvoice(
        patientName
    );

    // Step 6 - Make Payment by Cash
    await paymentPage.openFinancials(
        patientName
    );

    await paymentPage.makePayment(
        'Cash',
        paymentData.amount
    );

    // Step 7 - Cancel With Refund
    await cancellationPage.cancelWithRefund(
        'Cash',
        paymentData.amount
    );

});

test('TC08 New Patient Consult With Multi Service', async ({ page }) => {

    const patientName = generatePatientName();

    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);

    // Step 2 - Add New Patient
    await patientPage.createPatient(
        patientName,
        patientData
    );

    // Step 3 - Add Consult
    await consultPage.addConsult(
        patientName
    );

    // Step 4 - Add Multi Service
    await servicePage.MultiService(
        patientName
    );

    // Step 5 - Generate Invoice
    await invoicePage.generateInvoice(
        patientName
    );

    // Step 6 - Make Payment by Cash
    await paymentPage.openFinancials(
        patientName
    );

    await paymentPage.makePayment(
        'Cash',
        paymentData.amount
    );

});

test('TC09 New Patient Consult With Multi Service Cancel', async ({ page }) => {
   
    const patientName = generatePatientName();

    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);
    const cancellationPage = new CancellationPage(page);


    // Step 2 - Add New Patient
    await patientPage.createPatient(
        patientName,
        patientData
    );

    // Step 3 - Add Consult
    await consultPage.addConsult(
        patientName
    );

    // Step 4 - Add Multi Service
    await servicePage.MultiService(
        patientName
    );

    // Step 5 - Generate Invoice
    await invoicePage.generateInvoice(
        patientName
    );

    // Step 6 - Make Payment by Cash
    await paymentPage.openFinancials(
        patientName
    );

    await paymentPage.makePayment(
        'Cash',
        paymentData.amount
    );

    // Step 7 - Cancel With No Refund
    await cancellationPage.cancelWithNoRefund();

});

test('TC10 New Patient Cancel With Make Payment', async ({ page }) => {
 
    const patientName = generatePatientName();

    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);
    const cancellationPage = new CancellationPage(page);

    // Step 2 - Add New Patient
    await patientPage.createPatient(
        patientName,
        patientData
    );

    // Step 3 - Add Consult
    await consultPage.addConsult(
        patientName
    );

    // Step 4 - Add Service
    await servicePage.addService(
        patientName
    );

    // Step 5 - Generate Invoice
    await invoicePage.generateInvoice(
        patientName
    );

    // Step 6 - Make Payment by Cash
    await paymentPage.openFinancials(
        patientName
    );

    await paymentPage.makePayment(
        'Cash',
        paymentData.amount
    );

    // Step 7 - Cancel With Make Payment
    await cancellationPage.cancelWithMakePayment(
        'Cash',
        paymentData.amount
    );

});
