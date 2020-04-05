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
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
        displayPending: true
    }
}));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    yield nativescript_dev_appium_1.startServer();
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () {
    yield nativescript_dev_appium_1.stopServer();
}));
//# sourceMappingURL=setup.js.map