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

const { generatePatientName } = require('../utils/RandomData');

test('TC01 New Patient Cash Payment', async ({ page }) => {


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
        'Cash',
        paymentData.amount
    );



    
});