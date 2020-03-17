import {AppiumDriver, createDriver, Direction, UIElement} from 'nativescript-dev-appium';

describe('User login scenario.', () => {
    let driver: AppiumDriver;

    beforeAll(async () => {
        driver = await createDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    afterEach(async function () {
        await driver.logTestArtifacts('report');
    });

    it('should login and redirect to home page', async function () {
        const loginButton = await driver.findElementByAccessibilityId('loginFormSubmit');
        await loginButton.click();
        const homePage = await  driver.findElementByAccessibilityId('homePage');
        expect(homePage).toBeDefined();
    });

    it('should logout and redirect to login page', async function () {
        const bar = await driver.findElementByAccessibilityId('sideDrawerBar');
        const width = await bar.size();
        await driver.swipe({x: 0, y: 0}, {x: width.x, y: 0});
        const logout = await driver.findElementByAccessibilityId('authenticatedSideDrawerHeaderLogout');
        await logout.click();
        const loginButton = await driver.findElementByAccessibilityId('loginFormSubmit');
        expect(loginButton).toBeDefined();
    });
});
