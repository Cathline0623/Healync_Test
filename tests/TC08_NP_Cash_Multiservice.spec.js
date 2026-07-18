const { test } = require('@playwright/test');


test.setTimeout(120000);

const { LoginPage } = require('../pages/LoginPage');
const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { ServicePage } = require('../pages/ServicePage');
const { InvoicePage } = require('../pages/InvoicePage');
const { PaymentPage } = require('../pages/PaymentPage');

const { loginData } = require('../testdata/users');
const { patientData } = require('../testdata/patients');
const { paymentData } = require('../testdata/payments');
const { appoinmentData }= require('../testdata/appointmentData');
const { consultData, bookingData } = require('../testdata/consultData');
const { serviceData, DateData } = require('../testdata/serviceData');
const { multiServiceData } = require('../testdata/multiServiceData');

const { generatePatientName } = require('../utils/RandomData');

test('TC08 New Patient Consult With Multi Service', async ({ page }) => {

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

    // Step 1 - Login
    await loginPage.login(
        loginData.username,
        loginData.password
    );

    // Step 2 - Add New Patient
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
 
    await servicePage.MultiService(
    patientName,
    multiServiceData.serviceName
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