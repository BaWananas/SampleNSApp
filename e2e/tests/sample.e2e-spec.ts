import { AppiumDriver, createDriver, SearchOptions } from 'nativescript-dev-appium';

describe('sample scenario', () => {
    let driver: AppiumDriver;

    beforeAll(async () => {
        driver = await createDriver();
    });

    afterAll(async () => {
        await driver.quit();
        console.log('Quit driver!');
    });

    afterEach(async function () {
        await driver.logTestArtifacts('report');
    });

    it('should find an element by text', async () => {
        expect(true).toBe(true);
    });
});
