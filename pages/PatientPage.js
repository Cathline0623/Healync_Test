const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');

class PatientPage {

    constructor(page) {
        this.page = page;

        // Buttons
        this.addNewBtn = page.getByRole('button', { name: 'Add New' });
        this.addPatientBtn = page.getByRole('button', { name: 'Add Patient' });
        this.saveBtn = page.getByRole('button', { name: 'Save' });

        // Patient Fields
        this.patientNameTxt = page.getByRole('textbox', {
            name: 'Enter patient name'
        });

        this.phoneTxt = page.getByRole('textbox', {
            name: 'Enter phone number'
        });

        this.notesTxt = page.getByRole('textbox', {
            name: 'Write down',
            exact: true
        });

        this.emailTxt = page.getByRole('textbox', {
            name: 'Write down email address'
        });

        this.ageTxt = page.getByPlaceholder('Enter age');

        this.addressTxt = page.getByRole('textbox', {
            name: 'Write down resident address'
        });

        // Title
        this.titleDropdown = page.getByRole('button', {
            name: 'All',
            exact: true
        });

        this.mrOption = page.locator('div').filter({
            hasText: /^Mr$/
        });

        // Gender
        this.maleBtn = page.getByRole('button', {
            name: 'Male',
            exact: true
        });

        this.femaleBtn = page.getByRole('button', {
            name: 'Female',
            exact: true
        });

        // Success Message
        this.patientSavedMsg = page.getByText(
            'Patient Saved successfully'
        );
    }

    async clickAddNew() {

        await StepHelper.step(this.page, 'Click Add New button', async () => {
            await this.addNewBtn.click();
        });
    }

    async clickAddPatient() {

        await StepHelper.step(this.page, 'Click Add Patient button', async () => {
            await this.addPatientBtn.click();
        });
    }
    async enterPatientName(patientName) {

        await StepHelper.step(this.page, `Enter Patient Name - ${patientName}`, async () => {
            await this.patientNameTxt.fill(patientName);
        });
    }

    async selectTitle(title = 'Mr') {

    await StepHelper.step(this.page, `Select Title - ${title}`, async () => {

        await this.titleDropdown.click();

        switch (title) {

            case 'Mr':
                await this.mrOption.click();
                break;

            default:
                await this.mrOption.click();
                break;
        }
    });
}

    async enterPhoneNumber(phoneNumber) {

    await StepHelper.step(this.page, `Enter Phone Number - ${phoneNumber}`, async () => {
        await this.phoneTxt.fill(phoneNumber);
    });
}

   async enterNotes(notes) {

    await StepHelper.step(this.page, `Enter Notes - ${notes}`, async () => {
        await this.notesTxt.fill(notes);
    });
}

   async enterEmail(email) {

    await StepHelper.step(this.page, `Enter Email - ${email}`, async () => {
        await this.emailTxt.fill(email);
    });
}

   async enterAge(age) {

    await StepHelper.step(this.page, `Enter Age - ${age}`, async () => {
        await this.ageTxt.fill(age.toString());
    });
}

   async selectGender(gender = 'Male') {

    await StepHelper.step(this.page, `Select Gender - ${gender}`, async () => {

        if (gender === 'Male') {
            await this.maleBtn.click();
        }

        if (gender === 'Female') {
            await this.femaleBtn.click();
        }
    });
}

    async enterAddress(address) {

    await StepHelper.step(this.page, `Enter Address - ${address}`, async () => {
        await this.addressTxt.fill(address);
    });
}
   async clickSave() {

    await StepHelper.step(this.page, 'Click Save button', async () => {
        await this.saveBtn.click();
    });
}

 async verifyPatientSaved() {

    await StepHelper.step(this.page, 'Verify Patient Saved Successfully', async () => {
        await expect(this.patientSavedMsg).toBeVisible();
    });
}
    async createPatient(patientName, patientData) {

        await this.clickAddNew();

        await this.clickAddPatient();

        await this.enterPatientName(patientName);

        await this.selectTitle(patientData.title);

        await this.enterPhoneNumber(
            patientData.phoneNumber
        );

        await this.enterNotes(
            patientData.notes
        );

        await this.enterEmail(
            patientData.email
        );

        await this.enterAge(
            patientData.age
        );

        await this.selectGender(
            patientData.gender
        );

        await this.enterAddress(
            patientData.address
        );

        await this.clickSave();

        await this.verifyPatientSaved();
    }

    async searchPatient(patientName) {

    const searchBox = this.page.getByRole(
        'textbox',
        {
            name: 'Search with patient name or'
        }
    );

    await StepHelper.step(this.page, `Search Patient - ${patientName}`, async () => {
        await searchBox.fill(patientName);
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
    // async searchPatient(patientName) {

    //     const searchBox = this.page.getByRole(
    //         'textbox',
    //         {
    //             name: 'Search with patient name or'
    //         }
    //     );

    //     await searchBox.fill(patientName);

    //     const patient = this.page.locator(
    //         `//div[@title="${patientName}"]`
    //     );

    //     await patient.waitFor({
    //         state: 'visible'
    //     });

    //     await patient.click();
    // }

}



module.exports = { PatientPage };