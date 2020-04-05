"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nativescript_dev_appium_1 = require("nativescript-dev-appium");
describe('Routing scenarios', function () {
    let driver;
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        driver = yield nativescript_dev_appium_1.createDriver();
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield driver.quit();
    }));
    afterEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.logTestArtifacts('report');
        });
    });
    it('should navigate to home page', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const loginButton = yield driver.findElementByAccessibilityId('loginFormSubmit');
            yield loginButton.click();
            const page = yield driver.findElementByAccessibilityId('homePage');
            expect(page).toBeDefined();
        });
    });
    it('should navigate to subscriptions page', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const bar = yield driver.findElementByAccessibilityId('sideDrawerBar');
            const width = yield bar.size();
            yield driver.swipe({ x: 0, y: 0 }, { x: width.x, y: 0 });
            const subscriptionButton = yield driver.findElementByAccessibilityId('authenticatedSideDrawerContentSubscriptions');
            yield subscriptionButton.click();
            const subscriptionsPage = yield driver.findElementByAccessibilityId('subscriptionHomePage');
            expect(subscriptionsPage).toBeDefined();
        });
    });
    it('should navigate to subscription settings, then go back to subscriptions page', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let btn = yield driver.findElementByAccessibilityId('navToSettingsButton');
            yield btn.click();
            const page = yield driver.findElementByAccessibilityId('subscriptionSettingPage');
            expect(page).toBeDefined();
            btn = yield driver.findElementByAccessibilityId('titleNavBarBackButton');
            yield btn.click();
            const subscriptionsPage = yield driver.findElementByAccessibilityId('subscriptionHomePage');
            expect(subscriptionsPage).toBeDefined();
        });
    });
    it('should navigate to subscribing page, then go back to subscriptions page', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let btn = yield driver.findElementByAccessibilityId('navToSubscribingButton');
            yield btn.click();
            const page = yield driver.findElementByAccessibilityId('subscriptionSubscribingPage');
            expect(page).toBeDefined();
            btn = yield driver.findElementByAccessibilityId('titleNavBarBackButton');
            yield btn.click();
            const subscriptionsPage = yield driver.findElementByAccessibilityId('subscriptionHomePage');
            expect(subscriptionsPage).toBeDefined();
        });
    });
});
//# sourceMappingURL=routing.e2e-spec.js.map