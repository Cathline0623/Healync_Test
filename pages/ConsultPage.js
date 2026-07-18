const { StepHelper } = require('../utils/StepHelper');
class ConsultPage {

    constructor(page) {
        this.page = page;

        this.addNewBtn = page.getByRole('button', { name: 'Add New' });
        this.addConsultBtn = page.getByRole('button', { name: 'Add Consult' });

        this.patientSearchTxt = page.getByRole('textbox', {
            name: 'Search with patient name or'
        });

        this.providerDropdown = page.locator(
            'app-multi-dropdown:nth-child(3) > .multi-dropdown-container > .multi-dropdown-title'
        );

        this.consultTab = page.locator(
            'app-book-appointment-filter-navbar'
        ).getByText('Consult', { exact: true });

        this.proceedBtn = page.getByText('Proceed');
        this.confirmBookingBtn = page.getByText('Confirm Booking');
        this.bookingConfirmMsg = page.getByText('Booking confirm');

        this.addCustomSlotsBtn = page.getByText('Add custom slots').first();
        this.clockIcon = page.locator('.fa-clock').first();
        this.timeOption = page.getByText('10', { exact: true }).first();
        this.setBtn = page.getByRole('button', { name: 'Set' });
        this.updateBtn = page.getByRole('button', { name: 'Update' });
    }

   async clickAddConsult() {

    await StepHelper.step(this.page, 'Click Add New button', async () => {
        await this.addNewBtn.click();
    });

    await StepHelper.step(this.page, 'Click Add Consult button', async () => {
        await this.addConsultBtn.click();
    });
}

    async searchPatient(patientName) {

    await StepHelper.step(this.page, `Search Patient - ${patientName}`, async () => {
        await this.patientSearchTxt.fill(patientName);
    });

    const patient = this.page.locator(
        `//div[@title="${patientName}"]`
    );

    await patient.waitFor({ state: 'visible' });

    await StepHelper.step(this.page, `Select Patient - ${patientName}`, async () => {
        await patient.click();
    });
}

    async selectProvider() {

    await StepHelper.step(this.page, 'Open Provider Dropdown', async () => {
        await this.providerDropdown.click();
    });

    // await this.page.locator(
    //     'div:nth-child(30) > .checkbox'
    // ).click();
}

    async selectConsultSlot(consultSlot, bookingDate) {

    const consultInput = this.page.locator(
        "xpath=//div[@class='search-icon']//following::input[@type='text']"
    );

    await StepHelper.step(this.page, `Enter Consult Slot - ${consultSlot}`, async () => {
        await consultInput.click();
        await consultInput.fill(consultSlot);
    });

    const serviceOption = this.page.locator(
        `xpath=(//div[normalize-space()='${consultSlot}'])[1]`
    );

    await serviceOption.waitFor({
        state: 'visible',
        timeout: 1000
    });

    await StepHelper.step(this.page, `Select Consult Slot - ${consultSlot}`, async () => {
        await serviceOption.click();
    });

    await StepHelper.step(this.page, 'Close Consult Dropdown', async () => {
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

    async selectDoctor(doctorName) {

    await StepHelper.step(this.page, 'Open Doctor Dropdown', async () => {
        await this.page.locator('.multi-dropdown-title').first().click();
    });

    const doctorSearch = this.page.locator("(//input[@type='text'])[2]");

    await doctorSearch.waitFor({ state: 'visible' });

    await StepHelper.step(this.page, `Search Doctor - ${doctorName}`, async () => {
        await doctorSearch.click();
        await doctorSearch.fill(doctorName);
    });

    await this.page.waitForTimeout(1000);

    const doctorOption = this.page.locator("(//div[@class='dropdown-option'])[1]");

    await doctorOption.waitFor({ state: 'visible' });

    await StepHelper.step(this.page, `Select Doctor - ${doctorName}`, async () => {
        await doctorOption.click();
    });

    // await this.page.locator("(//div[@class='multi-dropdown-title'])[1]").click();
}
    
   async confirmConsultBooking() {

    await StepHelper.step(this.page, 'Click Proceed', async () => {
        await this.proceedBtn.click();
    });

    await StepHelper.step(this.page, 'Click Confirm Booking', async () => {
        await this.confirmBookingBtn.click();
    });

    await this.page.waitForLoadState('networkidle');
}
    async addConsult(patientName, doctorName, consultSlot, bookingDate) {

    await this.clickAddConsult();

    await this.searchPatient(patientName);

    await this.selectDoctor(doctorName);

    await this.selectProvider();

    await this.selectConsultSlot(consultSlot, bookingDate);

    // await this.addCustomSlot();

    await this.confirmConsultBooking();

    await StepHelper.step(this.page, 'Reload Page', async () => {
        await this.page.reload({
            waitUntil: 'load'
        });
    });
}
}

module.exports = { ConsultPage };





