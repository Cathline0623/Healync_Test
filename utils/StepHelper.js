const { test } = require('@playwright/test');

class StepHelper {

    static async step(page, name, action) {

        await test.step(name, async () => {

            await action();

            await test.info().attach(name, {
                body: await page.screenshot(),
                contentType: 'image/png'
            });

        });

    }
}

module.exports = { StepHelper };