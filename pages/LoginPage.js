const { StepHelper } = require('../utils/StepHelper');

class LoginPage {

    constructor(page) {
        this.page = page;

        this.userName = page.getByRole('textbox', {
            name: 'Enter phone number'
        });

        this.password = page.getByRole('textbox', {
            name: 'Enter password'
        });

        this.signInBtn = page.getByRole('button', {
            name: 'Sign in'
        });
    }

    async login(username, password) {

     

                await this.page.goto(
                    'http://release-uat.healync.com.s3-website.ap-south-1.amazonaws.com'
                );

                  await StepHelper.step(  this.page,`Enter Username - ${username}`,async () => {
                   await this.userName.fill(username);
                  }
                );

                 await StepHelper.step(  this.page,`Enter password - ${password}`,async () => {
                
                 await this.password.fill(password);
                  }
                );

                 await StepHelper.step(  this.page,`Click signIn button `,async () => {
                await this.signInBtn.click();
                 }
                );
               

            }
        
}

module.exports = { LoginPage };