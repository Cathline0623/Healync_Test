const { StepHelper } = require('../utils/StepHelper');
const { expect } = require('@playwright/test');
class ServicePage {
 
    constructor(page) {
        this.page = page;
 
        // Buttons
        this.addNewBtn = page.getByRole('button', {
            name: 'Add New'
        }); 
 
        this.addServiceBtn = page.getByRole('button', {
            name: 'Add Service'
        });
 
        this.proceedBtn = page.getByText('Proceed');
 
        this.confirmBookingBtn = page.getByText(
            'Confirm Booking'
        );
 
        this.bookingConfirmMsg = page.getByText(
            'Booking confirm'
        );

        this.addCustomSlotsBtn = page.getByText('Add custom slots').first();
        this.clockIcon = page.locator('.fa-clock').first();
        this.timeOption = page.getByText('10', { exact: true }).first();
        this.setBtn = page.getByRole('button', { name: 'Set' });
        this.updateBtn = page.getByRole('button', { name: 'Update' });
 
        // Search
        this.patientSearchTxt = page.getByRole(
            'textbox',
            {
                name: 'Search with patient name or'
            }
        );
 
        // Provider Dropdown
        this.providerDropdown = page.locator(
            'app-multi-dropdown:nth-child(3) > .multi-dropdown-container > .multi-dropdown-title'
        );
    }
 
    async clickAddService() {
         
         await StepHelper.step(  this.page,`Click addNew button `,async () => {
        await this.addNewBtn.click();
        }
                );

         await StepHelper.step(  this.page,`Click add service button `,async () => {
        await this.addServiceBtn.click();
    }
                );
    }
 

    
   async searchPatient(patientName) {

    await StepHelper.step(this.page, `Search Patient - ${patientName}`, async () => {
        await this.patientSearchTxt.fill(patientName);
    });

    const patient = this.page.locator(
        `//div[@title="${patientName}"]`
    );

    await patient.waitFor({
        state: 'visible'
    });

    await StepHelper.step(this.page, `Select Patient - ${patientName}`, async () => {
        await patient.click();
    });
}
    // async selectDoctor(doctorName) {

    // // Click Doctor dropdown
    // await this.page.locator('.multi-dropdown-title').first().click();

    // // Search doctor
    // const doctorSearch = this.page.locator("(//input[@type='text'])[2]");
    // await doctorSearch.waitFor({ state: 'visible' });
    // await doctorSearch.click();
    // await doctorSearch.fill(doctorName);

    // // Wait for search results
    // await this.page.waitForTimeout(1000);

    // // Select first doctor
    // const doctorOption = this.page.locator("(//div[@class='dropdown-option'])[1]");
    // await doctorOption.waitFor({ state: 'visible' });
    // await doctorOption.click();

    // // Close dropdown
    // // await this.page.locator("(//div[@class='multi-dropdown-title'])[1]").click();
// }
//    async selectProvider() {
 
//     await this.page.waitForTimeout(3000);
 
//     await this.providerDropdown.click();
 
//     // await this.page.locator(
//     //     '.bookappointmentBodyRightBottom > div:nth-child(3)'
//     // ).first().click();

//     const serviceInput = this.page.locator(
//     "xpath=//div[@class='search-icon']//following::input[@type='text']"
//     );

//     await serviceInput.click();

//     await serviceInput.fill('Service-1');

//     const serviceOption = this.page.locator(
//     "xpath=(//div[normalize-space()='Service-1'])[3]"
//     );

//     await serviceOption.waitFor({ state: 'visible', timeout: 2000 });
//     await serviceOption.click();

//     await this.page.keyboard.press('Escape');

//     // await serviceInput.click();

//     await this.page.locator("//div[@class='range-date-container']").click();

//     await this.page.locator("//div[text()='Tomorrow ']").click();

//     await this.page.locator("xpath=//div[@class='range-date-option-footter']//following::div[text()=' Apply ']").click();
 
// }

async selectProvider(serviceName, bookingDate) {

    await this.page.waitForTimeout(3000);

    await StepHelper.step(this.page, 'Open Service Dropdown', async () => {
        await this.providerDropdown.click();
    });

    const serviceInput = this.page.locator(
        "//div[@class='search-icon']//following::input[@type='text']"
    );

    await StepHelper.step(this.page, `Enter Service - ${serviceName}`, async () => {
        await serviceInput.click();
        await serviceInput.fill(serviceName);
    });

    const serviceOption = this.page.locator(
        `xpath=(//div[normalize-space()='${serviceName}'])[3]`
    );

    await serviceOption.waitFor({
        state: 'visible',
        timeout: 1000
    });

    await StepHelper.step(this.page, `Select Service - ${serviceName}`, async () => {
        await serviceOption.click();
    });

    await StepHelper.step(this.page, 'Close Service Dropdown', async () => {
        await this.page.keyboard.press('Escape');
    });

    await StepHelper.step(this.page, 'Open Booking Date', async () => {
        await this.page.locator("//div[@class='range-date-container']").click();
    });

    await StepHelper.step(this.page, `Select Booking Date - ${bookingDate}`, async () => {
        await this.page
            .locator('#currentMonth')
            .getByText(bookingDate, { exact: true })
            .click();
    });

    await StepHelper.step(this.page, 'Apply Booking Date', async () => {
        await this.page.getByText('Apply').nth(1).click();
    });

    await StepHelper.step(this.page, 'Select First Available Slot', async () => {
        await this.page.locator('.slotButton').first().click();
    });
}

// async selectMultipleServices() {

//     await this.page.waitForTimeout(3000);

//     await this.providerDropdown.click();

//     const serviceInput = this.page.locator(
//         "xpath=//div[@class='search-icon']//following::input[@type='text']"
//     );

//     // Select Service-1
//     await serviceInput.click();
//     await serviceInput.fill(service1);

//     let serviceOption = this.page.locator(
//         `xpath=(//div[normalize-space()='${multiServiceData.service1}'])[3]`
//     );

//     await serviceOption.waitFor({ state: 'visible', timeout: 3000 });
//     await serviceOption.click();

//     await this.page.waitForTimeout(1000);

//     // Select Service Test
//     await serviceInput.click();
//     await serviceInput.press('Control+A');
//     await serviceInput.press('Backspace');
//     await serviceInput.fill(multiServiceData.service2);

//     serviceOption = this.page.locator(
//         `xpath=(//div[normalize-space()='${multiServiceData.service2}'])[3]`
//     );

//     await serviceOption.waitFor({ state: 'visible', timeout: 3000 });
//     await serviceOption.click();

//     await this.page.keyboard.press('Escape');

//     await this.page.locator("//div[@class='range-date-container']").click();
//     await this.page.locator("//div[text()='Tomorrow ']").click();
//     await this.page.locator("//div[@class='range-date-option-footter']//following::div[text()=' Apply ']").click();
// }

// const { multiServiceData } = require('../testdata/multiServiceData');

async selectMultipleServices() {

    await this.page.waitForTimeout(3000);

    await StepHelper.step(this.page, 'Open Service Dropdown', async () => {
        await this.providerDropdown.click();
    });

    const serviceInput = this.page.locator(
        "//div[@class='search-icon']//following::input[@type='text']"
    );

    for (const serviceName of multiServiceData.serviceNames) {

        await StepHelper.step(this.page, `Search Service - ${serviceName}`, async () => {
            await serviceInput.click();
            await serviceInput.press('Control+A');
            await serviceInput.press('Backspace');
            await serviceInput.fill(serviceName);
        });

        const serviceOption = this.page.locator(
            `xpath=(//div[normalize-space()='${serviceName}'])[3]`
        );

        await serviceOption.waitFor({
            state: 'visible',
            timeout: 5000
        });

        await StepHelper.step(this.page, `Select Service - ${serviceName}`, async () => {
            await serviceOption.click();
        });

        await this.page.waitForTimeout(1000);
    }

    await StepHelper.step(this.page, 'Close Service Dropdown', async () => {
        await this.page.keyboard.press('Escape');
    });

    await StepHelper.step(this.page, 'Open Booking Date', async () => {
        await this.page.locator("//div[@class='range-date-container']").click();
    });

    await StepHelper.step(this.page, 'Select Tomorrow', async () => {
        await this.page.locator("//div[text()='Tomorrow ']").click();
    });

    await StepHelper.step(this.page, 'Apply Booking Date', async () => {
        await this.page.locator("//div[@class='range-date-option-footter']//following::div[text()=' Apply ']").click();
    });
}
//  async addCustomSlot() {

//     await this.addCustomSlotsBtn.click();

//     await this.clockIcon.click();

//     await this.timeOption.click();

//     await this.setBtn.click();

//     await this.updateBtn.click();
// }

  async confirmServiceBooking() {

    await StepHelper.step(this.page, 'Click Proceed', async () => {
        await this.proceedBtn.click();
    });

    await StepHelper.step(this.page, 'Click Confirm Booking', async () => {
        await this.confirmBookingBtn.click();
    });

    await this.page.waitForTimeout(5000);
}
//    async addService(patientName, serviceName, bookingDate) {

//     await this.clickAddService();

//     await this.searchPatient(patientName);

//     await this.selectProvider(serviceName, bookingDate);

//     await this.confirmServiceBooking();

//     const appointmentBtn = this.page.locator(
//         "//div[text()='Booking confirm']//following::span[text()='Go to appointment page']"
//     );

//     await StepHelper.step(this.page, 'Go To Appointment Page', async () => {
//         await appointmentBtn.click();
//     });
// }

async addService(patientName, serviceName, bookingDate) {

    await this.clickAddService();

    await this.searchPatient(patientName);

    await this.selectProvider(serviceName, bookingDate);

    await this.confirmServiceBooking();

    // const appointmentBtn = this.page.getByRole('button', {
    //     name: 'Go to appointment page'
    // });

    // await StepHelper.step(this.page, 'Go To Appointment Page', async () => {

    //     await appointmentBtn.waitFor({
    //         state: 'visible',
    //         timeout: 60000
    //     });

    //     await appointmentBtn.scrollIntoViewIfNeeded();

    //     await appointmentBtn.click();
    // });

const toast = this.page.locator(".toaster-wrapper.success");
const appointmentBtn = toast.locator("span.action");

await StepHelper.step(this.page, 'Go To Appointment Page', async () => {

    await expect(toast).toBeVisible({
          state: 'visible',
        timeout: 60000
    });

    await expect(appointmentBtn).toBeVisible();

   await appointmentBtn.click({ force: true });
});

}


    async MultiService(patientName, serviceNames) {

    await this.clickAddService();

    await this.searchPatient(patientName);

    await this.selectMultipleServices(serviceNames);

    await this.addCustomSlot();

    await this.confirmServiceBooking();

    const appointmentBtn = this.page.locator(
        "//div[text()='Booking confirm']//following::span[text()='Go to appointment page']"
    );

    await StepHelper.step(this.page, 'Go To Appointment Page', async () => {
        await appointmentBtn.click();
    });
}
}
 
module.exports = { ServicePage };
 