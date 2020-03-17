import {AppiumDriver, createDriver} from 'nativescript-dev-appium';

describe('Routing scenarios', function () {
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

    it('should navigate to home page', async function () {
        const loginButton = await driver.findElementByAccessibilityId('loginFormSubmit');
        await loginButton.click();
        const page = await driver.findElementByAccessibilityId('homePage');
        expect(page).toBeDefined();
    });

    it('should navigate to subscriptions page', async function () {
        const bar = await driver.findElementByAccessibilityId('sideDrawerBar');
        const width = await bar.size();
        await driver.swipe({x: 0, y: 0}, {x: width.x, y: 0});
        const subscriptionButton = await driver.findElementByAccessibilityId('authenticatedSideDrawerContentSubscriptions');
        await subscriptionButton.click();

        const subscriptionsPage = await driver.findElementByAccessibilityId('subscriptionHomePage');
        expect(subscriptionsPage).toBeDefined();
    });

    it('should navigate to subscription settings, then go back to subscriptions page', async function () {
        let btn = await driver.findElementByAccessibilityId('navToSettingsButton');
        await btn.click();

        const page = await driver.findElementByAccessibilityId('subscriptionSettingPage');
        expect(page).toBeDefined();

        btn = await driver.findElementByAccessibilityId('titleNavBarBackButton');
        await btn.click();

        const subscriptionsPage = await driver.findElementByAccessibilityId('subscriptionHomePage');
        expect(subscriptionsPage).toBeDefined();
    });

    it('should navigate to subscribing page, then go back to subscriptions page', async function () {
        let btn = await driver.findElementByAccessibilityId('navToSubscribingButton');
        await btn.click();

        const page = await driver.findElementByAccessibilityId('subscriptionSubscribingPage');
        expect(page).toBeDefined();

        btn = await driver.findElementByAccessibilityId('titleNavBarBackButton');
        await btn.click();

        const subscriptionsPage = await driver.findElementByAccessibilityId('subscriptionHomePage');
        expect(subscriptionsPage).toBeDefined();
    });
});
