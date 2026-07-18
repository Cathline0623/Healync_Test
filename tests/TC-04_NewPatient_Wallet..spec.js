const { test } = require('@playwright/test');


test.setTimeout(120000);

const { LoginPage } = require('../pages/LoginPage.js');
const { PatientPage } = require('../pages/PatientPage.js');
const { ConsultPage } = require('../pages/ConsultPage.js');
const { ServicePage } = require('../pages/ServicePage.js');
const { InvoicePage } = require('../pages/InvoicePage.js');
const { PaymentPage } = require('../pages/PaymentPage.js');

const { loginData } = require('../testdata/users.js');
const { patientData } = require('../testdata/patients.js');
const { paymentData } = require('../testdata/payments.js');
const { appoinmentData }= require('../testdata/appointmentData');
const { consultData, bookingData } = require('../testdata/consultData');
const { serviceData, DateData } = require('../testdata/serviceData');

const { generatePatientName } = require('../utils/RandomData.js');

test('TC04 New Patient Wallet Payment', async ({ page }) => {

    page.on('response', async (response) => {
    try {
        const status = response.status();

        // Log only failed APIs
        if (status >= 400) {
            console.log('\n========== API FAILURE ==========');
            console.log('URL:', response.url());
            console.log('METHOD:', response.request().method());
            console.log('STATUS:', status);

            const contentType = response.headers()['content-type'] || '';

            if (contentType.includes('application/json')) {
                console.log('BODY:', await response.json());
            } else {
                console.log('BODY:', await response.text());
            }

            console.log('=================================\n');
        }
    } catch (e) {
        console.log('Unable to read response body');
    }
});

    const patientName = generatePatientName();

    const loginPage = new LoginPage(page);
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);

    await loginPage.login(
        loginData.username,
        loginData.password
    );

    await patientPage.createPatient(
        patientName,
        patientData
    );

    await consultPage.addConsult(
        patientName,
        appoinmentData.doctorName,
        consultData.consultSlot,
        bookingData.bookingDate
    );

    await servicePage.addService(
    patientName,
    serviceData.serviceName,
    bookingData.bookingDate
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