// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from 'nativescript-angular/platform';
import {AppModule} from '@src/app/root/app.module';
import { on, ApplicationEventData } from 'tns-core-modules/application/application';
import * as statusBar from 'nativescript-status-bar';

// A traditional NativeScript application starts by initializing global objects,
// setting up global CSS rules, creating, and navigating to the main page.
// Angular applications need to take care of their own initialization: modules, components, directives, routes, DI providers.
// A NativeScript Angular app needs to make both paradigms work together,
// so we provide a wrapper platform object, platformNativeScriptDynamic,
// that sets up a NativeScript application and can bootstrap the Angular framework.
on('resume', (args: ApplicationEventData) => {
    if (args.android) {
        statusBar.hide();
    }
});
platformNativeScriptDynamic().bootstrapModule(AppModule);
