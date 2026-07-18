const { test } = require('@playwright/test');


test.setTimeout(120000);

const { LoginPage } = require('../pages/LoginPage.js');
const { PatientPage } = require('../pages/PatientPage.js');
const { ConsultPage } = require('../pages/ConsultPage.js');
const { ServicePage } = require('../pages/ServicePage.js');
const { InvoicePage } = require('../pages/InvoicePage.js');
const { PaymentPage } = require('../pages/PaymentPage.js');

const { loginData } = require('../testdata/users.js');
const { paymentData } = require('../testdata/payments.js');
const { existingPatientName } = require('../testdata/existingPatientData.js');

// const { patientName } = require('../testdata/existingPatientData.js');


test('TC05 Existing Patient Cash Payment', async ({ page }) => {

//     page.on('response', async (response) => {
//     try {
//         const status = response.status();

//         // Log only failed APIs
//         if (status >= 400) {
//             console.log('\n========== API FAILURE ==========');
//             console.log('URL:', response.url());
//             console.log('METHOD:', response.request().method());
//             console.log('STATUS:', status);

//             const contentType = response.headers()['content-type'] || '';

//             if (contentType.includes('application/json')) {
//                 console.log('BODY:', await response.json());
//             } else {
//                 console.log('BODY:', await response.text());
//             }

//             console.log('=================================\n');
//         }
//     } catch (e) {
//         console.log('Unable to read response body');
//     }
// });

    // console.log('Patient Name:', patientName);

    const patientName = existingPatientName.patientName;
    
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